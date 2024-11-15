// Base URL da API
const baseURL = "http://localhost";

// Função para adicionar uma nova categoria
async function addCategory(event) {
  event.preventDefault(); // Previne o envio do formulário
  
  const nome = document.getElementById("categoryName").value;

  try {
    // Envia a requisição POST para criar a categoria
    const response = await fetch(`${baseURL}/culinariando/php/categoria.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ categoryName: nome }), // Envia o nome da categoria
    });

    // Verifica se a resposta é válida e tenta converter para JSON
    const result = await response.json();

    if (!result.success) {
      // Caso a resposta não seja um sucesso, exibe a mensagem de erro
      alert(result.message || "Erro desconhecido ao criar a categoria.");
      return;
    }

    // Exibe a mensagem de sucesso
    alert(result.data);

    // Se a categoria foi criada com sucesso, atualiza a tabela
    appendCategory({ id: result.id, nome });
    document.getElementById("categoryName").value = ""; // Limpa o campo de entrada
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    alert("Erro ao criar categoria!");
  }
}

// Função para adicionar uma categoria à tabela visualmente
function appendCategory({ id, nome }) {
  const table = document.getElementById("categoryTable");

  // Cria uma nova linha para a tabela
  const row = document.createElement("tr");
  row.id = `category-${id}`; // Adiciona um ID único para a linha, baseado no ID da categoria
  row.innerHTML = `
    <td>${id}</td>
    <td><input type="text" value="${nome}" id="category-${id}" class="category-name"></td>
    <td>
      <button type="button" class="edit-cat" onclick="editCategory(${id})">Editar</button>
      <button type="button" class="delete-cat" onclick="deleteCategory(${id})">Excluir</button>
    </td>
  `;

  // Adiciona a nova linha na tabela
  table.appendChild(row);
}

// Função para remover uma categoria
async function deleteCategory(id) {
  try {
    const response = await fetch(`${baseURL}/culinariando/php/remover-categoria.php?id=${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message || "Erro desconhecido ao remover a categoria.");
      return;
    }

    alert(result.data);

    // Se a categoria foi removida com sucesso, atualiza a tabela
    const row = document.getElementById(`category-${id}`);
    row.remove();
  } catch (error) {
    console.error("Erro ao remover categoria:", error);
    alert("Erro ao remover categoria!");
  }
}

// Função para editar uma categoria

async function editCategory(id) {
    // Cria o campo de input para digitar o novo nome
    const nome = prompt("Digite o novo nome da categoria:");
  
    // Verifica se o nome foi informado
    if (!nome || nome.trim() === "") {
      alert("Por favor, insira um nome válido.");
      return;
    }
  
    try {
      // Envia a requisição para editar a categoria
      const response = await fetch(`${baseURL}/culinariando/php/editar-categoria.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ id, nome }),
      });
  
      const result = await response.json();  // Resposta da API
  
      // Verifica se a edição foi bem-sucedida
      if (!result.success) {
        alert(result.message || "Erro desconhecido ao editar a categoria.");
        return;
      }
  
      alert(result.data);  // Exibe a mensagem de sucesso
      window.location.reload();  // Atualiza a página após a edição
    } catch (error) {
      console.error("Erro ao editar categoria:", error);  // Exibe o erro no console
      alert("Erro ao editar categoria!");  // Exibe o alerta de erro
    }
  }
  

// Função para carregar as categorias ao iniciar
async function getCategories() {
  try {
    const response = await fetch(`${baseURL}/culinariando/php/categoria.php`);
    const result = await response.json();

    // Verifica se a resposta contém categorias
    if (result.success && Array.isArray(result.data)) {
      const categorias = result.data;

      // Adiciona cada categoria à tabela visualmente
      categorias.forEach((categoria) => {
        appendCategory(categoria);
      });
    } else {
      console.error("Erro ao carregar categorias:", result.message || "Nenhuma categoria encontrada.");
    }
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    alert("Erro ao carregar categorias!");
  }
}

// Adiciona evento ao formulário para adicionar uma nova categoria
document.getElementById("categoryForm").addEventListener("submit", addCategory);

// Carrega as categorias ao carregar a página
window.addEventListener("DOMContentLoaded", getCategories);
