document.addEventListener('DOMContentLoaded', () => {
  const produtosContainer = document.getElementById('produtos');
  fetch('components/produtos.html')
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar os produtos');
      return response.text();
    })
    .then(data => {
      produtosContainer.innerHTML = data;
    })
    .catch(error => console.error(error));
});
