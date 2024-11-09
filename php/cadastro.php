<?php
include('connect.php');

$dados = $_POST;
$sql = 'INSERT INTO usuario (nome, cpf, telefone, senha, email, cargo, sexo)
VALUES(?, ?, ?, ?, ?, ?, ?)';

$nome = $dados["nome_cadastro"] ?? null;
$cpf = $dados["cpf"] ?? null;
$telefone = $dados["telefone"] ?? null;
$senha = $dados["senha_cadastro"] ?? null;
$email = $dados["email_cadastro"] ?? null;
$sexo = $dados["sexo"] ?? null;
$cargo = "usuario";

if ($nome === null) {
    echo json_encode(['error' => "Nome não foi fornecido."]);
    exit;
}

if ($cpf === null) {
    echo json_encode(['error' => "Nome não foi fornecido."]);
    exit;
}

if ($telefone === null) {
    echo json_encode(['error' => "Nome não foi fornecido."]);
    exit;
}

if ($senha === null) {
    echo json_encode(['error' => "Nome não foi fornecido."]);
    exit;
}

if ($email === null) {
    echo json_encode(['error' => "Nome não foi fornecido."]);
    exit;
}

if ($sexo === null) {
    echo json_encode(['error' => "Nome não foi fornecido."]);
    exit;
}


if (!($conn->connect_error)){
	$stm = $conn->prepare($sql);
	$stm->bind_param("sssssss", $nome, $cpf, $telefone, $senha, $email, $cargo, $sexo); 
	if ($stm->execute()){
        echo json_encode(['data' => "Deu bom"]);
  } else {
		echo json_encode(['data' => "Nn deu bom"]);
	}
} else {
	echo json_encode(['data' => "Nn deu bom1"]);
}
$conn->close();
?>