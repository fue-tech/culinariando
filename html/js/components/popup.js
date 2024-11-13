function openPopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.classList.add("active");
}

function closePopup() {
  const popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.classList.remove("active");
}

function outsideClick(event) {
  const popupContent = document.querySelector(".popup-content");
  if (!popupContent.contains(event.target)) {
    closePopup();
  }
}
