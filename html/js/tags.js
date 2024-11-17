const baseURL = "http://localhost";

async function addTag() {
  const tag = document.getElementById("nome-tag").value;
  const color = document.getElementById("cor-tag").value;
  const status = document.getElementById("status-tag").value;

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/tags/nova-tag.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ tag, color, status }),
      }
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao criar tag!");
  }
}

function appendTag({ id, tag, cor, status }) {
  const list = document.getElementById("lista-tags");

  const element = `
    <form class="tag-item" id="tag-item-${id}">
      <div class="wrapper">
        <label for="tag-${id}">Nome:</label>
        <input
          type="text"
          value="${tag}"
          id="tag-${id}"
          class="tag-name"
        />
      </div>
      <div class="wrapper color">
        <label for="color-${id}">Cor:</label>
        <input
          type="color"
          value="${cor}"
          id="color-${id}"
          class="tag-color"
        />
      </div>
      <div class="wrapper status">
        <label for="status-${id}">Status:</label>
        <select id="status-${id}" class="tag-status">
          <option value="Ativo" ${
            status === "Ativo" ? "selected" : ""
          }>Ativo</option>
          <option value="Inativo" ${
            status === "Inativo" ? "selected" : ""
          }>Inativo</option>
        </select>
      </div>
      <div class="buttons">
        <button type="button" class="btn-edit" onclick="editTag(${id})">EDITAR</button>
        <button type="button" class="btn-delete" onclick="deleteTag(${id})">EXCLUIR</button>
      </div>
    </form>
  `;

  list.innerHTML += element;
}

async function deleteTag(id) {
  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/tags/remover-tag.php?id=${id}`
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
      window.location.reload();
    }

    const tagElement = document.getElementById(`tag-item-${id}`);
    tagElement.remove();
  } catch (error) {
    console.error(error);
    alert("Erro ao remover tag!");
  }
}

async function editTag(id) {
  const tag = document.getElementById(`tag-${id}`).value;
  const color = document.getElementById(`color-${id}`).value;
  const status = document.getElementById(`status-${id}`).value;

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/tags/editar-tag.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ tag, id, color, status }),
      }
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao editar tag!");
  }
}

async function getTags() {
  try {
    const response = await fetch(`${baseURL}/culinariando/php/tags/tag.php`);
    const result = await response.json();
    const tags = result.data;

    tags.forEach((tag) => {
      appendTag(tag);
    });
  } catch (error) {
    console.error(error);
  }
}

function showModal() {
  document.getElementById("tagModal").style.display = "flex";
}

function hideModal() {
  document.getElementById("tagModal").style.display = "none";
}

window.document.addEventListener("DOMContentLoaded", getTags);
