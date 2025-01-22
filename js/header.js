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
      if (token) {
        const user = await fetch('http://localhost:3005/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(response => response.json());
        const loginLink = headerContainer.querySelector('a[href="login.html"]');
        if (loginLink) {
          loginLink.href = 'perfil.html';
          loginLink.textContent = user.name;
        }
      }
    })
    .catch(error => console.error(error));
});
