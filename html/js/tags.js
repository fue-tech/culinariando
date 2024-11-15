const baseURL = "http://localhost";

async function addTag() {
  const tag = document.getElementById("nome-tag").value;

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/tags/nova-tag.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ tag }),
      }
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
        window.location.reload()
    }

    document.getElementById("nome-tag").value = "";
    hideModal();
  } catch (error) {
    console.error(error);
    alert("Erro ao criar tag!");
  }
}

function appendTag({ id, tag }) {
  const list = document.getElementById("lista-tags");

  const element = `
    <li class="tag-item" id="tag-item-${id}">
      <input
        type="text"
        value="${tag}"
        id="tag-${id}"
        class="tag"
      />
      <div>
        <button type="button" class="btn-edit" onclick="editTag(${id})">EDITAR</button>
        <button type="button" class="btn-delete" onclick="deleteTag(${id})">EXCLUIR</button>
      </div>
    </li>
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
        window.location.reload()
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

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/tags/editar-tag.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ tag, id }),
      }
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
        window.location.reload()
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
console.log(tags)
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
