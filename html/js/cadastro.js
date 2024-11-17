const baseURL = "http://localhost";

async function create() {
  let nome_cadastro = document.getElementById("nome_cadastro").value;
  let email_cadastro = document.getElementById("email_cadastro").value;
  let senha_cadastro = document.getElementById("senha_cadastro").value;
  let confirmasenha = document.getElementById("confirmasenha").value;
  let cpf = document.getElementById("cpf").value;
  let telefone = document.getElementById("telefone").value;
  let sexo = document.getElementById("sexo").value;

  if (
    !nome_cadastro ||
    !email_cadastro ||
    !senha_cadastro ||
    !confirmasenha ||
    !cpf ||
    !telefone
  ) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (senha_cadastro !== confirmasenha) {
    alert("As senhas não coincidem.");
    return;
  }

  const regexCPF = /^\d{11}$/;
  if (!regexCPF.test(cpf)) {
    alert("CPF inválido. Digite apenas os números!");
    return;
  }

  const regexTELEFONE = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  if (!regexTELEFONE.test(telefone)) {
    alert("Número de telefone inválido.");
    return;
  }

  const regexEMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEMAIL.test(email_cadastro)) {
    alert("E-mail inválido.");
    return;
  }

  const body = {
    nome_cadastro,
    email_cadastro,
    senha_cadastro,
    confirmasenha,
    cpf,
    telefone,
    sexo,
  };

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/cadastro/novo-usuario.php`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar");
    }

    const result = await response.json();

    if (result && result.data === "Usuário criado com sucesso!") {
      alert("Usuário criado com sucesso!");
      window.location.reload();
    } else {
      alert(result.data || "Erro ao criar usuário.");
    }
  } catch (error) {
    console.error(error);
  }
}

function appendUser({ id, nome, telefone, email, sexo, senha }) {
  const list = document.getElementById("lista-user");

  const element = `
      <li class="user-item">
        <label> Nome
        <input
          type="text"
          placeholder="${nome}"
          value="${nome}"
          id="user-nome-${id}"
          class="user"
        /></label>

        <label> Email
        <input 
          type="text"
          placeholder="${email}"
          value="${email}"
          id="user-email-${id}"
          class="user"
        /></label>

        <label> Senha
        <input 
          type="password"
          placeholder="${senha}"
          value="${senha}"
          id="user-senha-${id}"
          class="user"
        /></label>

        <label> Telefone
        <input
          type="text"
          placeholder="${telefone}"
          value="${telefone}"
          id="user-telefone-${id}"
          class="user"
          maxlength="11"
        /></label>

        <label>Sexo
          <select name="sexo" id="sexo-${id}" required>
              <option value="Masculino" ${
                sexo === "Masculino" ? "selected" : ""
              }>Masculino</option>
              <option value="Feminino" ${
                sexo === "Feminino" ? "selected" : ""
              }>Feminino</option>
              <option value="Outro" ${
                sexo === "Outro" ? "selected" : ""
              }>Outro</option>
          </select><br/></label>
          <button type="button" class="edit-btn" id="${id}" onclick="editUser(${id})">Editar</button>
          <button type="button" class="delete-btn" id="${id}" onclick="deleteUser(${id})">Excluir</button>
      </li>
  `;

  list.innerHTML += element;
}

async function GetUser() {
  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/cadastro/usuarios.php`
    );

    const result = await response.json();

    const usuario = result.data;

    usuario.forEach((usuario) => {
      appendUser(usuario);
    });
  } catch (error) {
    console.error(error);
  }
}
window.document.addEventListener("DOMContentLoaded", GetUser);

async function deleteUser(id) {
  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/cadastro/remover-usuario.php?id=${id}`
    );

    const result = await response.json();
    if (result.data === "Usuário deletado com sucesso!") {
      alert(result.data);
      window.location.reload();
    } else {
      alert(result.data || "Erro ao excluir usuário.");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao remover usuário!");
  }
}

async function editUser(id) {
  const nome = document.getElementById(`user-nome-${id}`).value;
  const email = document.getElementById(`user-email-${id}`).value;
  const senha = document.getElementById(`user-senha-${id}`).value;
  const telefone = document.getElementById(`user-telefone-${id}`).value;
  const sexo = document.getElementById(`sexo-${id}`).value;

  if (!nome || !email || !senha || !telefone || !sexo) {
    alert("Por favor, preencha todos os campos antes de editar.");
    return;
  }

  try {
    const response = await fetch(
      `${baseURL}/culinariando/php/cadastro/editar-usuario.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          nome,
          email,
          senha,
          telefone,
          sexo,
          id,
        }),
      }
    );

    const result = await response.json();
    alert(result.data);
    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Erro ao editar usuario!");
  }
}
