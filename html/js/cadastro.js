async function create() {
	const baseURL = "http://localhost";
	

    let nome_cadastro = document.getElementById("nome_cadastro").value;
    let email_cadastro = document.getElementById("email_cadastro").value;
    let senha_cadastro = document.getElementById("senha_cadastro").value;
    let confirmasenha = document.getElementById("confirmasenha").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;
    let sexo = document.getElementById("sexo").value;

    if (!nome_cadastro || !email_cadastro || !senha_cadastro || !confirmasenha || !cpf || !telefone) {
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

	const body = {
        nome_cadastro,
        email_cadastro,
        senha_cadastro,
        confirmasenha,
        cpf,
        telefone,
        sexo,
	}
	
  try {
    const response = await fetch
        (`${baseURL}/culinariando/php/cadastro.php`,
    {
	    method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
	    body: new URLSearchParams(body)
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar");
    }
		
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
