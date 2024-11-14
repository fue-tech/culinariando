function openPopup(id) {
  const popupOverlay = document.getElementById(`popupOverlay-${id}`);
  popupOverlay.classList.add("active");
}

function closePopup(id) {
  const popupOverlay = document.getElementById(`popupOverlay-${id}`);

  popupOverlay.classList.remove("active");
}

function outsideClick(event) {
  const [_, id] = event.target.id.split("-");

  if (event.target.id === `popupOverlay-${id}`) {
    closePopup(id);
  }
}
