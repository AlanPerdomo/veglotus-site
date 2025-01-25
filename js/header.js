const API_URL = 'http://localhost:3000/';

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
      const logoutButton = document.getElementById('logout-button');

      if (token) {
        const user = await fetch(API_URL + 'user/me', {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            Authorization: `Bearer ${token}`,
          },
        }).then(response => response.json());
        if (user.message === 'Unauthorized') {
          localStorage.removeItem('userToken');
        }
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

        logoutButton.addEventListener('click', handleLogout);
      }
    })
    .catch(error => console.error(error));
});
