const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const btnAdicionar = document.getElementById("btnAdicionar");
const carrosselList = document.getElementById("carrosselList");
const carrosselForm = document.getElementById("carrosselForm");
const carrosselNomeInput = document.getElementById("carrosselNome");
const carrosselTipoInput = document.getElementById("carrosselTipo");
const carrosselDescricaoInput = document.getElementById("carrosselDesc");
let editingCarrosselId = null;

btnAdicionar.addEventListener("click", () => {
  document.getElementById("modalTitle").textContent = "Adicionar Carrossel";
  carrosselNomeInput.value = "";
  editingCarrosselId = null;
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

carrosselForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const carrosselNome = carrosselNomeInput.value;
  const carrosselTipo = carrosselTipoInput.value;
  const carrosselDescricao = carrosselDescricaoInput.value;

  if (editingCarrosselId) {
    updateCarrossel(
      editingCarrosselId,
      carrosselNome,
      carrosselTipo,
      carrosselDescricao
    );
  } else {
    addCarrossel(carrosselNome, carrosselTipo, carrosselDescricao);
  }

  modal.style.display = "none";
});

// Adicionar carrossel
function addCarrossel(nome, tipo, descricao) {
  const data = { nome, tipo, descricao };

  fetch("/culinariando/php/carrossel/carrosseledit.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      loadCarrossel();
    });
}

// Atualizar carrossel
function updateCarrossel(id, nome, tipo, descricao) {
  const data = { id, nome, tipo, descricao };

  fetch("/culinariando/php/carrossel/carrosseledit.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      loadCarrossel();
    });
}

// Carregar carrossel
function loadCarrossel() {
  fetch("/culinariando/php/carrossel/carrosseledit.php")
    .then((response) => response.json())
    .then((data) => {
      const carrossel = data.data;
      carrosselList.innerHTML = "";

      carrossel.forEach((item) => {
        const carrosselItem = document.createElement("div");
        carrosselItem.classList.add("carrossel-item");
        carrosselItem.innerHTML = `
                <h3>${item.nome}</h3>
                <p>${item.tipo}</p>
                <p>${item.descricao}</p>
                <button onclick="editCarrossel(${item.id})" class="edit-btn">Editar</button>
                <button onclick="deleteCarrossel(${item.id})" class="delete-btn">Excluir</button>
            `;
        carrosselList.appendChild(carrosselItem);
      });
    });
}

// Editar carrossel
function editCarrossel(id) {
  fetch(`/culinariando/php/carrossel/carrosseledit.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      const carrossel = data.data;
      if (carrossel && carrossel.nome) {
        carrosselNomeInput.value = carrossel.nome;
        carrosselTipoInput.value = carrossel.tipo;
        carrosselDescricaoInput.value = carrossel.descricao;
        editingCarrosselId = id;
        document.getElementById("modalTitle").textContent = "Editar Carrossel";
        modal.style.display = "flex";
      } else {
        alert("Erro ao carregar o item para edição.");
      }
    });
}

// Excluir carrossel
function deleteCarrossel(id) {
  const confirmDelete = confirm(
    "Tem certeza que deseja excluir este carrossel?"
  );

  if (confirmDelete) {
    fetch(
      `/culinariando/php/carrossel/carrosseledit.php?id=${id}&action=delete`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        loadCarrossel();
      });
  }
}

loadCarrossel();
