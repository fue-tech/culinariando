// const cards = [
//   {
//     name: "Bolo de cenoura",
//     image:
//       "https://www.receitasnestle.com.br/images/default-source/recipes/bolo_de_cenoura.jpg",
//     category: "Bolos",
//     difficulty: "Fácil",
//   },
//   {
//     name: "Pão de queijo",
//     image:
//       "https://www.receitasnestle.com.br/images/default-source/recipes/pao_de_queijo.jpg",
//     category: "Salgados",
//     difficulty: "Fácil",
//   },
//   {
//     name: "Brigadeiro",
//     image:
//       "https://www.receitasnestle.com.br/images/default-source/recipes/brigadeiro.jpg",
//     category: "Doces",
//     difficulty: "Fácil",
//   },
// ];

async function getCards() {
  try {
    const response = await fetch("../php/carousel.php");

    if (!response.ok) {
      throw new Error("Erro ao buscar o carrossel");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

function card({ name, image, category, difficulty }) {
  const element = `
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

  const cardsContainer = document.querySelector(".carousel");

  cardsContainer.innerHTML = element;

  const firstCard = cardsContainer.querySelector(".card-wrapper");
  firstCard.classList.add("current-card");
}

document.addEventListener("DOMContentLoaded", async () => {
  await getCards();
});
