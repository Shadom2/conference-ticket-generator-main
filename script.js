const form = document.getElementById('ticket-form');
const avatarInput = document.getElementById('avatar');
const ticketSection = document.getElementById('ticket');
const nameResult = document.getElementById('name-result');
const emailResult = document.getElementById('email-result');
const githubResult = document.getElementById('github-result');
const ticketAvatar = document.getElementById('ticket-avatar');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.fullName.value.trim();
  const email = form.email.value.trim();
  const github = form.github.value.trim();
  const avatarFile = avatarInput.files[0];

  if (!name || !email || !github || !avatarFile) {
    alert('Please fill out all fields and upload an avatar.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!['image/jpeg', 'image/png'].includes(avatarFile.type) || avatarFile.size > 512000) {
    alert('Avatar must be JPG/PNG and less than 500KB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    ticketAvatar.src = reader.result;
    nameResult.textContent = name;
    emailResult.textContent = email;
    githubResult.textContent = github;

    ticketSection.classList.remove('hidden');
    ticketSection.scrollIntoView({ behavior: 'smooth' });

    form.reset(); // ✅ Vacía el formulario, pero no lo oculta
  };
  reader.readAsDataURL(avatarFile);
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
