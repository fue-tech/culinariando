const baseURL = "http://localhost";

async function addRecipe() {
  const nome = document.getElementById("nome").value;
  const preparo = document.getElementById("preparo").value;
  const video = document.getElementById("video").value;
  const imagem = document.getElementById("imagem").value;
  const categoria = document.getElementById("categoria").value;
  const dificuldade = document.getElementById("dificuldade").value;

  const body = {
    nome,
    preparo,
    video,
    imagem,
    categoria,
    dificuldade,
  };

  if (!nome || !preparo || !video || !imagem || !categoria || !dificuldade) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/receitas/nova-receita.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body),
      }
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
      window.location.href = "receitas.html";
    }
  } catch (error) {
    alert("Erro ao criar receita!");
  }
}

async function deleteRecipe(id) {
  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/receitas/remover-receita.php?id=${id}`
    );

    const result = await response.json();

    alert(result.data);

    if (!result.data.includes("Erro")) {
      window.location.href = "receitas.html";
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir receita!");
  }
}

function updateEditForm({
  nome,
  preparo,
  video,
  imagem,
  categoria,
  dificuldade,
}) {
  const popup = document.querySelector("#popupOverlay-2");
  if (!popup) return;

  const nomeElement = popup.querySelector("#nome");
  if (nomeElement) nomeElement.value = nome;

  const preparoElement = popup.querySelector("#preparo");
  if (preparoElement) preparoElement.value = preparo;

  const videoElement = popup.querySelector("#video");
  if (videoElement) videoElement.value = video;

  const imagemElement = popup.querySelector("#imagem");
  if (imagemElement) imagemElement.value = imagem;

  const categoriaElement = popup.querySelector("#categoria");
  if (categoriaElement) {
    for (const option of categoriaElement.options) {
      option.selected = option.text === categoria;
    }
  }

  const dificuldadeElement = popup.querySelector("#dificuldade");
  if (dificuldadeElement) {
    for (const option of dificuldadeElement.options) {
      option.selected = option.text === dificuldade;
    }
  }

  openPopup(2);
}

function card({ id, nome, preparo, video, imagem, categoria, dificuldade }) {
  const element = `
    <div class="recipe-card">
      <a href="/culinariando/receita.html?id=${id}" >
        <img src="${imagem}" class="card-img" />
        <div class="card-footer">
          <p class="card-title">${nome}</p>
          <div class="stars">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
          <p class="card-category">${categoria} - ${dificuldade}</p>
        </div>
      </a>
      <div class="card-buttons">
        <button class="edit-btn" onclick="updateEditForm({
          nome: '${nome}',
          preparo: '${preparo}',
          video: '${video}',
          imagem: '${imagem}',
          categoria: '${categoria}',
          dificuldade: '${dificuldade}'
        })">Editar</button>
        <button class="delete-btn" onclick="deleteRecipe(${id})">Excluir</button>
      </div>
    </div>
  `;

  const cardsContainer = document.querySelector(".cards-wrapper");

  cardsContainer.appendChild(
    document.createRange().createContextualFragment(element)
  );
}

async function getRecipes() {
  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/receitas/receitas.php`
    );

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const recipes = await getRecipes();

  recipes.forEach((recipe) => card(recipe));
});
