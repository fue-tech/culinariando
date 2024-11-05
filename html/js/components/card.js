const baseURL = "http://localhost";

async function getCards() {
  try {
    const response = await fetch(`${baseURL}/culinariando/php/carousel.php`);

    console.log("response", response);

    if (!response.ok) {
      throw new Error("Erro ao buscar o carrossel");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

function card({ nome, image, category, difficulty }) {
  const element = `
    <div class="card-wrapper">
      <img src="${image}" class="card-img" />
      <div class="card-footer">
        <p class="card-title">${nome}</p>
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

  cardsContainer.appendChild(
    document.createRange().createContextualFragment(element)
  );

  const firstCard = cardsContainer.querySelector(".card-wrapper");
  firstCard.classList.add("current-card");
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getCards();
  response[0].receitas.forEach((receita) => {
    card(receita);
  });
});
