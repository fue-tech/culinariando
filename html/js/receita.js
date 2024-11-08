const baseURL = "http://localhost";

function appendRecipe({ nome, video, preparo, ingredientes }) {
  const element = `
    <section class="col1">
      <iframe
        width="600"
        height="330"
        src="${video}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </section>
    <section class="col2">
      <h1 class="title text-primary">${nome}</h1>
      <div class="instrunction">
      <h4 class="subtitle">Modo de preparo</h4>
      <p>${preparo}</p>
      </div>
      <div class="instrunction">
      <h4 class="subtitle">Ingredientes</h4>
      <ul class="list"></ul>
      </div>
    </section>
  `;

  const recipeContainer = document.querySelector(".container");

  recipeContainer.appendChild(
    document.createRange().createContextualFragment(element)
  );

  const checkbox = ingredientes.map((ingrediente, index) => {
    return `
      <li>
        <input type="checkbox" id="${index}" class="checkbox" />
        <label id="ingredient-${index}" for="${index}">${ingrediente}</label>
      </li>
    `;
  });

  const ingredientList = document.querySelector(".list");
  ingredientList.innerHTML = checkbox.join("");
}

async function getReceita(id) {
  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/receita.php?id=${id}`
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(result.error);
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}

function dashedText(id) {
  const text = document.getElementById(`ingredient-${id}`);

  if (text.style.textDecoration === "line-through") {
    text.style.textDecoration = "none";
  } else {
    text.style.textDecoration = "line-through";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const receita = await getReceita(id);

  appendRecipe(receita);

  const checkbox = document.querySelectorAll(".checkbox");

  checkbox.forEach((element) => {
    element.addEventListener("change", () => {
      dashedText(element.id);
    });
  });
});
