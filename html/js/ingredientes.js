const baseURL = "http://localhost";

async function addIngredient() {
  const nome = document.getElementById("nome-ingrediente").value;
  const unidade = document.getElementById("unidade-ingrediente").value;
  const quantidade = document.getElementById("quantidade-ingrediente").value;

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/ingredientes/novo-ingrediente.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ nome, unidade, quantidade }),
      }
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao criar ingrediente!");
  }
}

function appendIngredient({ id, nome, unidade, quantidade }) {
  const list = document.getElementById("lista-ingredientes");

  const element = `
    <form class="ingredient-item">
      <input
        type="text"
        value="${nome}"
        id="nome-${id}"
        maxlength="50"
        class="ingredient"
      />
      <input
        type="text"
        value="${unidade}"
        id="unidade-${id}"
        maxlength="20"
        class="ingredient unit"
      />
      <input
        type="number"
        value="${quantidade}"
        id="quantidade-${id}"
        class="ingredient quantity"
      />
      <div>
        <button type="button" class="edit-btn" id="${id}" onclick="editIngredient(${id})">Editar</button>
        <button type="button" class="delete-btn" id="${id}" onclick="deleteIngredient(${id})">Excluir</button>
      </div>
    </form>
  `;

  list.innerHTML += element;
}

async function deleteIngredient(id) {
  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/ingredientes/remover-ingrediente.php?id=${id}`
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao remover ingrediente!");
  }
}

async function editIngredient(id) {
  const nome = document.getElementById(`nome-${id}`).value;
  const unidade = document.getElementById(`unidade-${id}`).value;
  const quantidade = document.getElementById(`quantidade-${id}`).value;

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/ingredientes/editar-ingrediente.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ nome, unidade, quantidade, id }),
      }
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao editar ingrediente!");
  }
}

async function getIngredient() {
  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/ingredientes/ingredientes.php`
    );

    const result = await response.json();

    const ingredientes = result.data;

    ingredientes.forEach((ingrediente) => {
      appendIngredient(ingrediente);
    });
  } catch (error) {
    console.error(error);
  }
}

window.document.addEventListener("DOMContentLoaded", getIngredient);
