function header() {
  return `
      <a href="/culinariando/" class="logo-wrapper">
        <img src="./html/img/logo.png" alt="Logo do site" class="logo" />
      </a>
      <ul class="menu-itens text-secondary">
        <a href="/culinariando" class="menu-item">
          <li>Início</li>
        </a>
        <a href="/culinariando/receitas.html" class="menu-item">
          <li>Receitas</li>
        </a>
        <a href="/culinariando/favoritos.html" class="menu-item">
          <li>Favoritos</li>
        </a>
      </ul>
      <div class="welcome">
        <svg
          width="35px"
          height="35px"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
            fill="#fff"
          />
          <path
            d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
            fill="#fff"
          />
        </svg>
        <div class="welcome-text">
          <p>Bem vindo,</p>
          <p>
            realize o <a href="/culinariando/cadastro.html">cadastro</a> ou faça o
            <a href="/culinariando/login">login</a>
          </p>
        </div>
      </div>
  `;
}

window.onload = () => {
  const headerElement = document.getElementById("nav");
  headerElement.classList.add("menu", "bg-primary");
  headerElement.innerHTML = header();
};
