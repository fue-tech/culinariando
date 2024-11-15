const baseURL = "http://localhost";

async function addCategory(event) {
  event.preventDefault();

  const nome = document.getElementById("categoryName").value;

  try {
    const response = await fetch(`${baseURL}/culinariando/php/categoria.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ categoryName: nome }),
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message || "Erro desconhecido ao criar a categoria.");
      return;
    }

    alert(result.data);

    // if (!result.data.includes("Erro")) {
    window.location.reload();
    // }
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    alert("Erro ao criar categoria!");
  }
}

function appendCategory({ id, nome }) {
  const table = document.getElementById("categoryTable");

  const row = document.createElement("tr");
  row.id = `category-${id}`;
  row.innerHTML = `
    <td>${id}</td>
    <td>${nome}</td>
    <td>
      <button type="button" class="edit-cat" onclick="editCategory(${id})">Editar</button>
      <button type="button" class="delete-cat" onclick="deleteCategory(${id})">Excluir</button>
    </td>
  `;

  table.appendChild(row);
}

async function deleteCategory(id) {
  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/remover-categoria.php?id=${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message || "Erro desconhecido ao remover a categoria.");
      return;
    }

    alert(result.data);

    window.location.reload();
  } catch (error) {
    console.error("Erro ao remover categoria:", error);
    alert("Erro ao remover categoria!");
  }
}

async function editCategory(id) {
  const nome = prompt("Digite o novo nome da categoria:");

  if (!nome || nome.trim() === "") {
    alert("Por favor, insira um nome válido.");
    return;
  }

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/editar-categoria.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ id, nome }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      alert(result.message || "Erro desconhecido ao editar a categoria.");
      return;
    }

    alert(result.data);
    window.location.reload();
  } catch (error) {
    console.error("Erro ao editar categoria:", error);
    alert("Erro ao editar categoria!");
  }
}

async function getCategories() {
  try {
    const response = await fetch(`${baseURL}/culinariando/php/categoria.php`);
    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      const categorias = result.data;

      categorias.forEach((categoria) => {
        appendCategory(categoria);
      });
    } else {
      console.error(
        "Erro ao carregar categorias:",
        result.message || "Nenhuma categoria encontrada."
      );
    }
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    alert("Erro ao carregar categorias!");
  }
}

document.getElementById("categoryForm").addEventListener("submit", addCategory);

window.addEventListener("DOMContentLoaded", getCategories);
