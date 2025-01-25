const token = localStorage.getItem('userToken');

document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('register-button');
  const loginButton = document.getElementById('login-button');
  const logoutButton = document.getElementById('logout-button');

  const errorMessage = document.getElementById('errorMessage');

  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  // Registro de usuário

  if (registerForm) {
    registerForm.addEventListener('submit', async event => {
      event.preventDefault();

      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        cpf: document.getElementById('cpf').value,
      };

      const confirmPassword = document.getElementById('confirm-password').value;

      if (data.password !== confirmPassword) {
        setErrorMessage(errorMessage, 'As senhas devem ser iguais');
        return;
      }

      const error = validateRegisterForm(data);
      if (error) {
        setErrorMessage(errorMessage, error);
        return;
      }

      await register(data);
    });
  }

  // Login de usuário

  if (loginForm) {
    loginForm.addEventListener('submit', async event => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      await login(email, password);
    });
  }

  // Botão para ir para a tela de cadastro

  if (registerButton) {
    registerButton.addEventListener('click', () => {
      window.location.href = 'register.html';
    });
  }

  // Botão para ir para a tela de login

  if (loginButton) {
    loginButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
  }
});

// Utilitário para exibir mensagens de erro
function setErrorMessage(element, message) {
  if (element) {
    element.textContent = message;
  }
}

// Login de usuário

async function handleLogout() {
  const userToken = localStorage.getItem('userToken');

  if (!userToken) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch(API_URL + 'user/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!response.ok) {
      return;
    }

    localStorage.removeItem('userToken');
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
}

// Função de login
async function login(email, password) {
  try {
    const response = await fetch(API_URL + 'user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setErrorMessage(errorMessage, 'Login ou senha incorretos');
      return;
    }
    const data = await response.json();
    localStorage.setItem('userToken', data.access_token);
    window.location.href = 'perfil.html';
  } catch (error) {
    setErrorMessage(errorMessage, error.message);
  }
}

// Função de registro
async function register(data) {
  try {
    const response = await fetch(API_URL + 'user/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData.status) {
      setErrorMessage(errorMessage, responseData.message || 'Erro ao registrar usuário');
      return;
    }
    alert('Usuário registrado com sucesso!');
    await login(data.email, data.password);
  } catch (error) {
    setErrorMessage(errorMessage, error.message);
  }
}

// Validação do formulário de registro
function validateRegisterForm({ name, email, phone, password, cpf }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cpfRegex = /^\d{11}$/;
  const phoneRegex = /^\d{10,11}$/;

  if (!name || !email || !phone || !password) {
    return 'Todos os campos são obrigatórios.';
  }

  if (!emailRegex.test(email)) {
    return 'E-mail inválido.';
  }

  if (cpf) {
    if (!cpfRegex.test(cpf)) {
      return 'CPF deve conter 11 dígitos.';
    }
  }

  if (!phoneRegex.test(phone)) {
    return 'Número de telefone inválido.';
  }

  if (password.length < 6) {
    return 'A senha deve conter no mínimo 6 caracteres.';
  }

  return null;
}
