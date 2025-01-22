const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('errorMessage');
const API_URL = 'http://localhost:3005/user/login';

loginForm.addEventListener('submit', async event => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login ou senha incorretos');
    }

    const data = await response.json();
    console.log(data);
    localStorage.setItem('userToken', data.access_token);
    window.location.href = 'home.html';
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});
