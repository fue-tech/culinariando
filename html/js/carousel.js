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

document.addEventListener("DOMContentLoaded", function () {
  // Inicialize cada carrossel individualmente passando o contêiner de cada um
  const carousels = document.querySelectorAll(".carousel-wrapper");
  carousels.forEach((carousel) => initializeCarousel(carousel));
});
