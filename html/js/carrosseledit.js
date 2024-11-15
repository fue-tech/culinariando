// Configuração do modal e CRUD
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const btnAdicionar = document.getElementById("btnAdicionar");
const carrosselList = document.getElementById("carrosselList");
const carrosselForm = document.getElementById("carrosselForm");
const carrosselNomeInput = document.getElementById("carrosselNome");
let editingCarrosselId = null;

// Exibir o modal
btnAdicionar.addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = "Adicionar Carrossel";
    carrosselNomeInput.value = "";
    editingCarrosselId = null;
    modal.style.display = "flex";
});

// Fechar o modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Salvar ou atualizar o carrossel
carrosselForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const carrosselNome = carrosselNomeInput.value;
    
    if (editingCarrosselId) {
        // Atualizar carrossel
        updateCarrossel(editingCarrosselId, carrosselNome);
    } else {
        // Adicionar novo carrossel
        addCarrossel(carrosselNome);
    }

    modal.style.display = "none";
});

// Adicionar carrossel
function addCarrossel(nome) {
    const data = { nome };

    fetch('/culinariando/php/carrosseledit.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        loadCarrossel(); // Recarregar a lista de carrossel
    });
}

// Atualizar carrossel
function updateCarrossel(id, nome) {
    const data = { id, nome };

    fetch('/culinariando/php/carrosseledit.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        loadCarrossel(); // Recarregar a lista de carrossel
    });
}

// Carregar carrossel
function loadCarrossel() {
    fetch('/culinariando/php/carrosseledit.php')
    .then(response => response.json())
    .then(data => {
        const carrossel = data.data;
        carrosselList.innerHTML = '';

        carrossel.forEach(item => {
            const carrosselItem = document.createElement('div');
            carrosselItem.classList.add('carrossel-item');
            carrosselItem.innerHTML = `
                <h3>${item.nome}</h3>
                <button onclick="editCarrossel(${item.id})">Editar</button>
                <button onclick="deleteCarrossel(${item.id})">Excluir</button>
            `;
            carrosselList.appendChild(carrosselItem);
        });
    });
}

// Editar carrossel
function editCarrossel(id) {
    fetch(`/culinariando/php/carrosseledit.php?id=${id}`)
    .then(response => response.json())
    .then(data => {
        const carrossel = data.data;
        if (carrossel && carrossel.nome) {
            carrosselNomeInput.value = carrossel.nome;
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
    const confirmDelete = confirm("Tem certeza que deseja excluir este carrossel?");
    
    if (confirmDelete) {
        fetch(`/culinariando/php/carrosseledit.php?id=${id}&action=delete`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            loadCarrossel(); // Recarregar a lista de carrossel
        });
    }
}


// Carregar carrossel ao carregar a página
loadCarrossel();
