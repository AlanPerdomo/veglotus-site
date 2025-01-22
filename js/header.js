document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('header');
  fetch('components/header.html')
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar o cabeçalho');
      return response.text();
    })
    .then(async data => {
      headerContainer.innerHTML = data;
      const token = localStorage.getItem('userToken');
      const userLink = document.getElementById('user-link');
      const dropdownMenu = document.getElementById('dropdown-menu');

      if (token) {
        const user = await fetch('http://localhost:3005/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(response => response.json());
        userLink.textContent = user.name;
        userLink.href = '#';

        userLink.addEventListener('click', e => {
          e.preventDefault();
          dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', e => {
          if (!dropdownMenu.contains(e.target) && e.target !== userLink) {
            dropdownMenu.classList.remove('show');
          }
        });
      }
    })
    .catch(error => console.error(error));
});

document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('register-button');

  if (registerButton) {
    registerButton.addEventListener('click', () => {
      window.location.href = 'register.html';
    });
  }
});
