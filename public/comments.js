// public/comments.js  — lista, cria e DELETA comentários via API REST

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = String(text ?? '');
  return div.innerHTML;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email));
}

async function fetchComments(projectId) {
  const res = await fetch(`/api/comments?projectId=${encodeURIComponent(projectId)}`);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Erro ao buscar comentários');
  }
  return data.comments || [];
}

async function postComment({ projectId, name, email, text }) {
  const res = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, name, email, text })
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Erro ao salvar comentário');
  }
  return data.comment;
}

async function deleteCommentById(id) {
  const res = await fetch(`/api/comments/${encodeURIComponent(id)}`, { method: 'DELETE' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || (data.success === false)) {
    throw new Error((data && data.error) || 'Erro ao deletar comentário');
  }
  return true;
}

async function renderComments(projectId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<p class="text-slate-500">Carregando comentários…</p>';

  try {
    const canDelete = String(container.dataset.canDelete || '').toLowerCase() === 'true';
    const comments = await fetchComments(projectId);

    if (!comments.length) {
      container.innerHTML = '<p class="text-slate-500 italic">Nenhum comentário ainda. Seja o primeiro a comentar!</p>';
      return;
    }

    const html = comments.map((c) => {
      const when = new Date(c.created_at).toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
      });
      return `
        <div class="comment-card">
          <div class="flex justify-between items-start mb-2">
            <div>
              <p class="font-semibold">${escapeHtml(c.name)}</p>
              <p class="comment-meta">${when}</p>
            </div>
            ${canDelete
          ? `<button type="button" class="comment-delete btn-comment-delete" data-comment-id="${c.id}" title="Excluir comentário">Deletar</button>`
          : ''
        }
          </div>
          <p class="comment-text">${escapeHtml(c.text)}</p>
        </div>
      `;
    }).join('');

    container.innerHTML = `<div class="space-y-4">${html}</div>`;

    if (canDelete) {
      container.querySelectorAll('.btn-comment-delete').forEach((btn) => {
        btn.addEventListener('click', async (ev) => {
          const id = ev.currentTarget.getAttribute('data-comment-id');
          if (!id) return;
          if (!confirm('Tem certeza que deseja excluir este comentário?')) return;
          try {
            await deleteCommentById(id);
            await renderComments(projectId, containerId);
          } catch (e) {
            alert(e.message || 'Erro ao deletar comentário');
          }
        });
      });
    }
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="text-red-600">Erro ao carregar comentários.</p>';
  }
}

// Chamado no onsubmit do formulário em galeria.html
async function handleCommentSubmit(event, projectId, containerId) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const text = form.querySelector('textarea[name="text"]').value.trim();

  if (!name) return alert('Por favor, insira seu nome');
  if (!isValidEmail(email)) return alert('Por favor, insira um email válido');
  if (!text) return alert('Por favor, insira seu comentário');

  const btn = form.querySelector('button[type="submit"]');
  const successMsg = form.querySelector('.comment-success');

  try {
    btn.disabled = true;
    btn.textContent = 'Enviando…';
    await postComment({ projectId, name, email, text });
    form.reset();
    successMsg?.classList.remove('hidden');
    setTimeout(() => successMsg?.classList.add('hidden'), 3000);
    await renderComments(projectId, containerId);
  } catch (e) {
    console.error(e);
    alert(e.message || 'Erro ao salvar comentário');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar comentário';
  }
}

// Auto-render ao carregar
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('[data-comments-container]');
  containers.forEach((container) => {
    const projectId = container.getAttribute('data-project-id');
    if (projectId && container.id) {
      renderComments(projectId, container.id);
    }
  });
});
