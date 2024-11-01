document.addEventListener("DOMContentLoaded", function () {
  const controls = document.querySelectorAll(".control");
  let currentCard = 0;
  const cards = document.querySelectorAll(".card-wrapper");
  const maxCards = cards.length;

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
    });

    cards[currentCard].classList.add("current-card");
  }

  controls.forEach((control) => {
    control.addEventListener("click", slide);
  });
});
