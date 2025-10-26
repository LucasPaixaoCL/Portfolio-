function scrollToContact() {
  const contactSection =
    document.getElementById('contact');
  if (contactSection) contactSection.scrollIntoView({
    behavior: 'smooth'
  });
}

// Handle form submission 
async function handleSubmit(event) {
  event.preventDefault();
  const name =
    document.getElementById('name').value.trim();
  const email =
    document.getElementById('email').value.trim();
  const message =
    document.getElementById('message').value.trim();
  const successMessage =
    document.getElementById('successMessage');
  const errorMessage =
    document.getElementById('errorMessage');
  const errorText =
    document.getElementById('errorText');
  const submitBtn =
    document.getElementById('submitBtn');

  // Hide messages
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');
  // Validation
  if (!name) { showError('Nome é obrigatório'); return; }
  if (!email) { showError('Email é obrigatório'); return; }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Email inválido');
    return;
  }
  if (!message) {
    showError('Mensagem é obrigatória');
    return;
  }

  // Disable button 
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  try {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (data.success) {
      successMessage.classList.remove('hidden');
      document.getElementById('contactForm').reset();
      setTimeout(() =>
        successMessage.classList.add('hidden'), 5000);
    } else {
      showError(data.error || 'Erro ao enviar formulário');
    }

  } catch (error) {
    console.error('Error:', error);
    showError('Erro ao enviar formulário. Tente novamente.');

  } finally {

    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar';
  }
}

function showError(message) {
  const errorMessage =
    document.getElementById('errorMessage');
  const errorText =
    document.getElementById('errorText');
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
}

function toggleMobileMenu() {
  const menu =
    document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('hidden');
}