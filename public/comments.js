// Comments management system
const COMMENTS_KEY = 'kittyhub-comments';

// Get all comments for a project
function getProjectComments(projectId) {
  const allComments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');
  return allComments[projectId] || [];
}

// Save comment for a project
function saveComment(projectId, name, email, text) {
  const allComments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');
  
  if (!allComments[projectId]) {
    allComments[projectId] = [];
  }
  
  const comment = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    text: text.trim(),
    date: new Date().toLocaleDateString('pt-BR'),
    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  };
  
  allComments[projectId].push(comment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  
  return comment;
}

// Delete comment
function deleteComment(projectId, commentId) {
  const allComments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');
  
  if (allComments[projectId]) {
    allComments[projectId] = allComments[projectId].filter(c => c.id !== commentId);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  }
}

// Render comments for a project
function renderComments(projectId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const comments = getProjectComments(projectId);
  
  let html = '<div class="space-y-4">';
  
  if (comments.length === 0) {
    html += '<p class="text-slate-500 italic">Nenhum comentário ainda. Seja o primeiro a comentar!</p>';
  } else {
    comments.forEach(comment => {
      html += `
        <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
          <div class="flex justify-between items-start mb-2">
            <div>
              <p class="font-semibold text-slate-900 dark:text-white">${escapeHtml(comment.name)}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">${comment.date} às ${comment.time}</p>
            </div>
            <button onclick="deleteComment('${projectId}', ${comment.id}); renderComments('${projectId}', '${containerId}')" 
                    class="text-red-500 hover:text-red-700 text-sm">
              Deletar
            </button>
          </div>
          <p class="text-slate-700 dark:text-slate-300">${escapeHtml(comment.text)}</p>
        </div>
      `;
    });
  }
  
  html += '</div>';
  container.innerHTML = html;
}

// Handle comment form submission
function handleCommentSubmit(event, projectId, containerId) {
  event.preventDefault();
  
  const form = event.target;
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const text = form.querySelector('textarea[name="text"]').value;
  
  // Validation
  if (!name.trim()) {
    alert('Por favor, insira seu nome');
    return;
  }
  
  if (!email.trim() || !isValidEmail(email)) {
    alert('Por favor, insira um email válido');
    return;
  }
  
  if (!text.trim()) {
    alert('Por favor, insira seu comentário');
    return;
  }
  
  // Save comment
  saveComment(projectId, name, email, text);
  
  // Reset form
  form.reset();
  
  // Re-render comments
  renderComments(projectId, containerId);
  
  // Show success message
  const successMsg = form.querySelector('.comment-success');
  if (successMsg) {
    successMsg.classList.remove('hidden');
    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 3000);
  }
}

// Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize comments on page load
document.addEventListener('DOMContentLoaded', function() {
  // Find all comment containers and render them
  const commentContainers = document.querySelectorAll('[data-comments-container]');
  commentContainers.forEach(container => {
    const projectId = container.getAttribute('data-project-id');
    renderComments(projectId, container.id);
  });
});

