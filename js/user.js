const API_URL = 'https://winning-lately-dodo.ngrok-free.app/user/';
const token = localStorage.getItem('userToken');

// Login

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('errorMessage');

if (loginForm) {
  loginForm.addEventListener('submit', async event => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(API_URL + 'login', {
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
      localStorage.setItem('userToken', data.access_token);
      window.location.href = 'perfil.html';
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });
}

// Auth check

document.addEventListener('DOMContentLoaded', () => {
  if (!loginForm) {
    if (!token) {
      window.location.href = 'login.html';
    }
  }
});

// Logout

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      const userToken = localStorage.getItem('userToken');

      if (userToken) {
        try {
          const response = await fetch(API_URL + 'logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          if (!response.ok) {
            throw new Error('Erro ao fazer logout');
          }

          localStorage.removeItem('userToken');

          window.location.href = 'login.html';
        } catch (error) {
          console.error('Erro no logout:', error);
          alert('Erro ao fazer logout. Tente novamente.');
        }
      } else {
        console.warn('Nenhum token encontrado.');
        window.location.href = 'login.html';
      }
    });
  }
});
