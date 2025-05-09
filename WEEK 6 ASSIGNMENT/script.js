// Button click
document.getElementById('magicButton').addEventListener('click', () => {
  alert('🎉 Button clicked!');
});

// Hover effects
const hoverBox = document.getElementById('hoverBox');
hoverBox.addEventListener('mouseover', () => hoverBox.style.backgroundColor = 'lightgreen');
hoverBox.addEventListener('mouseout', () => hoverBox.style.backgroundColor = 'pink');

// Keypress detection
document.getElementById('keyInput').addEventListener('keypress', (e) => {
  console.log(`Key pressed: ${e.key}`);
});

// Double-click
document.getElementById('secretButton').addEventListener('dblclick', () => {
  alert('🤫 Secret double-click action revealed!');
});

// Color change button
document.getElementById('colorChanger').addEventListener('click', function () {
  this.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
});

// Slideshow
const images = [
  'https://via.placeholder.com/200?text=1',
  'https://via.placeholder.com/200?text=2',
  'https://via.placeholder.com/200?text=3'
];
let currentSlide = 0;
document.getElementById('nextSlide').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % images.length;
  document.getElementById('slide').src = images[currentSlide];
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('hidden'));
    document.getElementById(`tab${tab.dataset.tab}`).classList.remove('hidden');
  });
});

// Form validation
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  let feedback = '';

  if (!name || !email || !password) {
    feedback = 'All fields are required!';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    feedback = 'Invalid email format!';
  } else if (password.length < 8) {
    feedback = 'Password must be at least 8 characters!';
  } else {
    feedback = '✅ Form is valid!';
  }

  document.getElementById('feedback').textContent = feedback;
});

// Real-time password feedback
document.getElementById('password').addEventListener('input', function () {
  const feedback = document.getElementById('feedback');
  if (this.value.length < 8) {
    feedback.textContent = 'Password too short!';
  } else {
    feedback.textContent = 'Looking good!';
  }
});
