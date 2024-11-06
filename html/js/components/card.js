const baseURL = "http://localhost";

function initializeCarousel(carouselWrapper) {
  const controls = carouselWrapper.querySelectorAll(".control");
  const carousel = carouselWrapper.querySelector(".carousel");
  const cards = carouselWrapper.querySelectorAll(".card-wrapper");
  const maxCards = cards.length;
  let currentCard = 0;

  function slide(e) {
    const isLeft = e.target.closest(".left");

    if (isLeft) {
      currentCard -= 1;
    } else {
      currentCard += 1;
    }

    if (currentCard >= maxCards) {
      currentCard = 0;
    }

    if (currentCard < 0) {
      currentCard = maxCards - 1;
    }

    cards.forEach((item) => item.classList.remove("current-card"));

    cards[currentCard].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    const cardWidth = cards[currentCard].offsetWidth;
    const scrollPosition = currentCard * cardWidth;

    carousel.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    cards[currentCard].classList.add("current-card");
  }

  controls.forEach((control) => {
    control.addEventListener("click", slide);
  });
}

async function getCards() {
  try {
    const response = await fetch(`${baseURL}/culinariando/php/carousel.php`);

    if (!response.ok) {
      throw new Error("Erro ao buscar o carrossel");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

function card({ nome, imagem, categoria, dificuldade }) {
  const element = `
    <div class="card-wrapper">
      <img src="${imagem}" class="card-img" />
      <div class="card-footer">
        <p class="card-title">${nome}</p>
        <div class="stars">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
        <p class="card-category">${categoria} - ${dificuldade}</p>
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

    const carousels = document.querySelectorAll(".carousel-wrapper");
    carousels.forEach((carousel) => initializeCarousel(carousel));
  });
});
