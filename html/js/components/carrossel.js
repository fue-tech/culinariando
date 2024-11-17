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
    const response = await fetch(
      `${baseURL}/culinariando/php/carrossel/carrossel.php`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar o carrossel");
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

function carousel(data) {
  const elemnt = `
    <section class="carousel-wrapper">
      <h1 class="carousel-title text-tertiary">${data.nome}</h1>
      <button class="carousel-shadow left control">
        <svg
          width="70px"
          height="70px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 17L9.5 12L14.5 7"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button type="button" class="carousel-shadow right control">
        <svg
          width="70px"
          height="70px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 7L14.5 12L9.5 17"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="carousel"></div>
    </section>
  `;

  const carouselContainer = document.querySelector(".carousels");

  carouselContainer.appendChild(
    document.createRange().createContextualFragment(elemnt)
  );

  data.receitas.forEach((receita) => card(receita));
}

function card({ receita_id, receita, imagem, categoria, dificuldade }) {
  const element = `
    <a href="/culinariando/receita.html?id=${receita_id}" class="card-wrapper">
      <img src="${imagem}" class="card-img" />
      <div class="card-footer">
        <p class="card-title">${receita}</p>
        <div class="stars">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
        <p class="card-category">${categoria} - ${dificuldade}</p>
      </div>
    </a>
  `;

  const cardsContainer = document.querySelectorAll(".carousel");

  cardsContainer[cardsContainer.length - 1].appendChild(
    document.createRange().createContextualFragment(element)
  );

  const firstCard =
    cardsContainer[cardsContainer.length - 1].querySelector(".card-wrapper");
  firstCard.classList.add("current-card");
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getCards();
  response.forEach((data) => {
    carousel(data);

    const carousels = document.querySelectorAll(".carousel-wrapper");
    carousels.forEach((carousel) => initializeCarousel(carousel));
  });
});
