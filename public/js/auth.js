// API Base URL
const API_URL = '/api/auth';

// Toggle between login and register forms
function toggleForms() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const successForm = document.getElementById('successForm');

  loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
  registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
  successForm.style.display = 'none';

  // Clear forms
  document.getElementById('loginFormElement').reset();
  document.getElementById('registerFormElement').reset();
}

// Show alert message
function showAlert(message, type = 'info') {
  const alert = document.getElementById('alert');
  alert.textContent = message;
  alert.className = `alert ${type}`;
  alert.style.display = 'block';

  setTimeout(() => {
    alert.style.display = 'none';
  }, 4000);
}

// Handle Login
document.getElementById('loginFormElement')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const btn = e.target.querySelector('.btn');

  if (!email || !password) {
    showAlert('Email and password are required', 'error');
    return;
  }

  btn.classList.add('loading');
  btn.disabled = true;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Save token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      showAlert('Login successful!', 'success');

      // Show success message
      setTimeout(() => {
        showSuccessMessage(data.user);
      }, 500);
    } else {
      showAlert(data.message || 'Login failed', 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
});

// Handle Register
document.getElementById('registerFormElement')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value.trim();
  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const btn = e.target.querySelector('.btn');

  if (!email || !username || !password || !confirmPassword) {
    showAlert('All fields are required', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showAlert('Passwords do not match', 'error');
    return;
  }

  if (password.length < 6) {
    showAlert('Password must be at least 6 characters', 'error');
    return;
  }

  btn.classList.add('loading');
  btn.disabled = true;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, password, confirmPassword })
    });

    const data = await response.json();

    if (response.ok) {
      // Save token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      showAlert('Registration successful!', 'success');

      // Show success message
      setTimeout(() => {
        showSuccessMessage(data.user);
      }, 500);
    } else {
      showAlert(data.message || 'Registration failed', 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
});

// Show success message
function showSuccessMessage(user) {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('successForm').style.display = 'block';

  document.getElementById('displayEmail').textContent = user.email;
  document.getElementById('displayUsername').textContent = user.username;
}

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  document.getElementById('successForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('loginFormElement').reset();
  showAlert('Logged out successfully', 'info');
}

// Check if user is already logged in
window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    showSuccessMessage(JSON.parse(user));
  }
});