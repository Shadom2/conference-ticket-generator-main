const form = document.getElementById('ticket-form');
const avatarInput = document.getElementById('avatar');
const ticketSection = document.getElementById('ticket');
const nameResult = document.getElementById('name-result');
const emailResult = document.getElementById('email-result');
const githubResult = document.getElementById('github-result');
const ticketAvatar = document.getElementById('ticket-avatar');

// Spans para mostrar errores debajo de los inputs
const nameError = document.getElementById('error-name');
const emailError = document.getElementById('error-email');
const githubError = document.getElementById('error-github');
const avatarError = document.getElementById('error-avatar');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Limpiar mensajes de error anteriores
  nameError.textContent = '';
  emailError.textContent = '';
  githubError.textContent = '';
  avatarError.textContent = '';

  // Limpiar clases de error anteriores
  clearErrorStyles();

  const name = form.fullName.value.trim();
  const email = form.email.value.trim();
  const github = form.github.value.trim();
  const avatarFile = avatarInput.files[0];

  let hasError = false;

  if (!avatarFile) {
    avatarError.textContent = 'Por favor sube tu foto';
    avatarInput.classList.add('input-error');
    hasError = true;
  } else if (!['image/jpeg', 'image/png'].includes(avatarFile.type) || avatarFile.size > 512000) {
    avatarError.textContent = 'Archivo muy grande. Por favor sube una foto menor a 500kb';
    avatarInput.classList.add('input-error');
    hasError = true;
  }

  if (!name) {
    nameError.textContent = 'Requerimos tu nombre.';
    form.fullName.classList.add('input-error');
    hasError = true;
  }

  if (!email) {
    emailError.textContent = 'Tu email es requerido.';
    form.email.classList.add('input-error');
    hasError = true;
  } else if (!validateEmail(email)) {
    emailError.textContent = 'Por favor ingresa un email válido.';
    form.email.classList.add('input-error');
    hasError = true;
  }

  if (!github) {
    githubError.textContent = 'Tu user de GitHub es requerido.';
    form.github.classList.add('input-error');
    hasError = true;
  }

  if (hasError) return;

  const reader = new FileReader();
  reader.onload = function () {
    ticketAvatar.src = reader.result;
    nameResult.textContent = name;
    emailResult.textContent = email;
    githubResult.textContent = github;

    ticketSection.classList.remove('hidden');
    ticketSection.scrollIntoView({ behavior: 'smooth' });

    form.reset(); 
    clearErrorStyles();
  };
  reader.readAsDataURL(avatarFile);
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrorStyles() {
  form.fullName.classList.remove('input-error');
  form.email.classList.remove('input-error');
  form.github.classList.remove('input-error');
  avatarInput.classList.remove('input-error');
}
