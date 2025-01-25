document.addEventListener('DOMContentLoaded', () => {
  const produtosContainer = document.getElementById('produtos');

  // Carregar o componente HTML
  fetch('components/products.html')
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar o componente de produtos');
      return response.text();
    })
    .then(data => {
      produtosContainer.innerHTML = data;

      // Após carregar o HTML, buscar produtos da API
      fetchProducts();
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));
});

// Função para buscar produtos da API
function fetchProducts() {
  fetch(`${API_URL}produtos`)
    .then(response => {
      if (!response.ok) throw new Error('Erro ao buscar produtos da API');
      return response.json();
    })
    .then(products => {
      renderProducts(products);
    })
    .catch(error => console.error(error));
}

// Função para renderizar produtos
function renderProducts(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = ''; // Limpa o grid antes de renderizar

  products.forEach(product => {
    const productCard = `
      <div class="product-card">
        <img src="${product.imagem}" alt="${product.nome}" class="product-image" />
        <h3 class="product-name">${product.nome}</h3>
        <p class="product-description">${product.descricao}</p>
        <p class="product-price">R$ ${(product.preco / 100).toFixed(2).replace('.', ',')}</p>
        <button class="product-button">Comprar</button>
      </div>
    `;

    grid.insertAdjacentHTML('beforeend', productCard);
  });
}
