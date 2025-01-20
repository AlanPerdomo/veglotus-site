document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('header');
  fetch('components/header.html')
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar o cabeçalho');
      return response.text();
    })
    .then(data => {
      headerContainer.innerHTML = data;
    })
    .catch(error => console.error(error));
});
