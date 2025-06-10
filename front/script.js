// Utilitários para navegação SPA simples
const main = document.getElementById('main-content');
const navLinks = {
  home: document.getElementById('nav-home'),
  dashboard: document.getElementById('nav-dashboard'),
  products: document.getElementById('nav-products'),
  login: document.getElementById('nav-login'),
  register: document.getElementById('nav-register')
};

// Componentes reutilizáveis
function Button({ text, onClick, className = '' }) {
  return `<button class="btn btn-tech ${className}" onclick="${onClick}">${text}</button>`;
}

function Card({ id, title, image, price, description, onDetails }) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card card-tech h-100">
        <img src="${image}" class="card-img-top p-3" alt="${title}" style="height:220px;object-fit:contain;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${title}</h5>
          <p class="card-text text-truncate">${description}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <span class="fw-bold text-primary">R$ ${price.toFixed(2)}</span>
            <button class="btn btn-tech btn-sm" onclick="showProductDetails(${id})">Detalhes</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Páginas
function renderHome() {
  main.innerHTML = `
    <div class="text-center py-5">
      <h1 class="display-4 mb-3">Bem-vindo à <span class="text-primary">TecStore</span></h1>
      <p class="lead mb-4">Sua loja online de tecnologia: smartphones, notebooks, acessórios e muito mais!</p>
      <a href="#" class="btn btn-tech btn-lg" id="explore-btn">Explorar Produtos</a>
    </div>
  `;
  document.getElementById('explore-btn').onclick = () => renderProducts();
}

function renderLogin() {
  main.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card card-tech p-4">
          <h3 class="mb-3 text-center">Login</h3>
          <form>
            <div class="mb-3">
              <label for="loginEmail" class="form-label">E-mail</label>
              <input type="email" class="form-control" id="loginEmail" required>
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Senha</label>
              <input type="password" class="form-control" id="loginPassword" required>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-tech">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

function renderRegister() {
  main.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card card-tech p-4">
          <h3 class="mb-3 text-center">Cadastro</h3>
          <form>
            <div class="mb-3">
              <label for="registerName" class="form-label">Nome</label>
              <input type="text" class="form-control" id="registerName" required>
            </div>
            <div class="mb-3">
              <label for="registerEmail" class="form-label">E-mail</label>
              <input type="email" class="form-control" id="registerEmail" required>
            </div>
            <div class="mb-3">
              <label for="registerPassword" class="form-label">Senha</label>
              <input type="password" class="form-control" id="registerPassword" required>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-tech">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

function renderDashboard() {
  main.innerHTML = `
    <div class="py-4">
      <h2 class="mb-4">Dashboard</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card card-tech text-center p-4">
            <h5>Produtos</h5>
            <p class="display-6 fw-bold" id="dashboard-products">...</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-tech text-center p-4">
            <h5>Usuários</h5>
            <p class="display-6 fw-bold">+100</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-tech text-center p-4">
            <h5>Pedidos</h5>
            <p class="display-6 fw-bold">+50</p>
          </div>
        </div>
      </div>
    </div>
  `;
  // Atualiza número de produtos via API
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      document.getElementById('dashboard-products').textContent = data.length;
    });
}

function renderProducts() {
  main.innerHTML = `
    <div class="py-4">
      <h2 class="mb-4">Produtos em Destaque</h2>
      <div class="row" id="products-list">
        <div class="text-center">Carregando produtos...</div>
      </div>
    </div>
  `;
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
      const list = document.getElementById('products-list');
      list.innerHTML = products.map(prod =>
        Card({
          id: prod.id,
          title: prod.title,
          image: prod.image,
          price: prod.price,
          description: prod.description,
          onDetails: `showProductDetails(${prod.id})`
        })
      ).join('');
    });
}

// Modal de detalhes do produto
window.showProductDetails = function(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(prod => {
      document.getElementById('modal-product-body').innerHTML = `
        <div class="row">
          <div class="col-md-5 text-center">
            <img src="${prod.image}" alt="${prod.title}" class="img-fluid mb-3" style="max-height:260px;object-fit:contain;">
          </div>
          <div class="col-md-7">
            <h4>${prod.title}</h4>
            <p>${prod.description}</p>
            <p class="fw-bold text-primary fs-4">R$ ${prod.price.toFixed(2)}</p>
            <span class="badge bg-success mb-2">Categoria: ${prod.category}</span>
            <div>
              <button class="btn btn-tech mt-2" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      `;
      new bootstrap.Modal(document.getElementById('productModal')).show();
    });
};

// Navegação SPA
navLinks.home.onclick = (e) => { e.preventDefault(); renderHome(); };
navLinks.dashboard.onclick = (e) => { e.preventDefault(); renderDashboard(); };
navLinks.products.onclick = (e) => { e.preventDefault(); renderProducts(); };
navLinks.login.onclick = (e) => { e.preventDefault(); renderLogin(); };
navLinks.register.onclick = (e) => { e.preventDefault(); renderRegister(); };

// Página inicial ao carregar
renderHome();