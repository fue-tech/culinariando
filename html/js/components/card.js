const cards = [
  {
    name: "Bolo de cenoura",
    image:
      "https://www.receitasnestle.com.br/images/default-source/recipes/bolo_de_cenoura.jpg",
    category: "Bolos",
    difficulty: "Fácil",
  },
  {
    name: "Pão de queijo",
    image:
      "https://www.receitasnestle.com.br/images/default-source/recipes/pao_de_queijo.jpg",
    category: "Salgados",
    difficulty: "Fácil",
  },
  {
    name: "Brigadeiro",
    image:
      "https://www.receitasnestle.com.br/images/default-source/recipes/brigadeiro.jpg",
    category: "Doces",
    difficulty: "Fácil",
  },
];

function card({ name, image, category, difficulty }) {
  return `
    <div class="card-wrapper">
      <img src="${image}" class="card-img" />
      <div class="card-footer">
        <p class="card-title">${name}</p>
        <div class="stars">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
        <p class="card-category">${category} - ${difficulty}</p>
      </div>
    </div>
  `;
}

function initializeCards() {
  const cardsContainer = document.querySelector(".carousel");

  cardsContainer.innerHTML = cards.map(card).join("");

  const firstCard = cardsContainer.querySelector(".card-wrapper");
  firstCard.classList.add("current-card");
}

document.addEventListener("DOMContentLoaded", initializeCards);
