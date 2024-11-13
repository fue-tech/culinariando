function header() {
  return `
    <div class="menu">
      <a href="/culinariando/" class="logo-wrapper">
        <img src="./html/img/logo.png" alt="Logo do site" class="logo" />
      </a>
      <ul class="menu-itens text-secondary">
        <li>
          <a href="/culinariando" class="menu-item">Início</a>
        </li>
        <li>
          <a href="/culinariando/receitas.html" class="menu-item">Receitas</a>
        </li>
        <li>
          <a href="/culinariando/ingredientes.html" class="menu-item">Ingredientes</a>
        </li>
        <li>
          <a href="#" class="menu-item">Carrossel</a>
        </li>
        <li>
          <a href="#" class="menu-item">Categoria</a>
        </li>
        <li>
          <a href="#" class="menu-item">Tags</a>
        </li>
      </ul>
      <div class="welcome">
        <a href="/culinariando/cadastro.html">
          <svg width="35px" height="35px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#fff" />
            <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#fff" />
          </svg>
        </a>
        <div class="welcome-text">
          <p>Bem vindo,</p>
          <p>
            realize o <a href="/culinariando/cadastro.html">cadastro</a> ou faça o
            <a href="#">login</a>
          </p>
        </div>
        <button class="hamburguer" onclick="toggleDrawer()">
        <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      </div>
      <div class="drawer" id="drawer">
        <ul class="drawer-menu">
          <li><a href="/culinariando">Início</a></li>
          <li><a href="/culinariando/nova-receita.html">Nova receita</a></li>
          <li><a href="/culinariando/ingredientes.html">Ingredientes</a></li>
          <li><a href="#">Carrossel</a></li>
          <li><a href="#">Categoria</a></li>
          <li><a href="#">Tags</a></li>
        </ul>
      </div>
    </div>`;
}

function toggleDrawer() {
  const drawer = document.getElementById("drawer");
  drawer.classList.toggle("active");
}

document.addEventListener("click", function (event) {
  const drawer = document.getElementById("drawer");
  const hamburguer = document.querySelector(".hamburguer");

  if (!drawer.contains(event.target) && !hamburguer.contains(event.target)) {
    drawer.classList.remove("active");
  }
});

window.onload = () => {
  const headerElement = document.getElementById("nav");
  headerElement.classList.add("menu", "bg-primary");
  headerElement.innerHTML = header();
};
