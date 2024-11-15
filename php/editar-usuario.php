<?php
include('./connect.php');

$dados = $_POST;

$sql = 'UPDATE usuario
SET nome = ?, email = ?, senha = ?, telefone = ?, sexo = ?
WHERE id = ?';


$nome = $dados["nome"] ?? null;
$email = $dados["email"] ?? null;
$senha = $dados["senha"] ?? null;
$telefone = $dados["telefone"] ?? null;
$sexo = $dados["sexo"] ?? null;
$id = $dados["id"] ?? null;


if (!($conn->connect_error)){
	$stm = $conn->prepare($sql); 

	$stm->bind_param("sssssi", $nome, $email, $senha, $telefone, $sexo, $id);

	if ($stm->execute()){
	  echo json_encode(['data' => 'usuario editado com sucesso!']);
  } else {
	  echo json_encode(['data' => 'Erro ao editar usuario!']);
	}
} else {
  echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>
