// Scroll to contact section
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle form submission
async function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  const submitBtn = document.getElementById('submitBtn');

  // Hide messages
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');

  // Validation
  if (!name) {
    showError('Nome é obrigatório');
    return;
  }

  if (!email) {
    showError('Email é obrigatório');
    return;
  }

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (data.success) {
      // Show success message
      successMessage.classList.remove('hidden');

      // Reset form
      document.getElementById('contactForm').reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 5000);
    } else {
      showError(data.error || 'Erro ao enviar formulário');
    }
  } catch (error) {
    console.error('Error:', error);
    showError('Erro ao enviar formulário. Tente novamente.');
  } finally {
    // Enable button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar';
  }
}

// Show error message
function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');

  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// Toggle theme (light/dark)
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  document.body.className = newTheme;
  localStorage.setItem('theme', newTheme);
  
  // Update button text
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (newTheme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Modo Claro';
      } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Modo Escuro';
      }
    }
  }
}

// Initialize theme on page load
window.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const html = document.documentElement;
  html.setAttribute('data-theme', savedTheme);
  document.body.className = savedTheme;
  
  // Update button icon
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (savedTheme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Modo Claro';
      } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Modo Escuro';
      }
    }
  }
})

