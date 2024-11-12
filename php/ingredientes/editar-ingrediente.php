<?php
include('../connect.php');

$dados = $_POST;

$sql = 'UPDATE ingredientes
SET nome = ?
WHERE id = ?';

$nome = $dados["nome"];
$id = $dados["id"];

if (!($conn->connect_error)){
	$stm = $conn->prepare($sql); 

	$stm->bind_param("si", $nome, $id); 

	if ($stm->execute()){
	  echo json_encode(['data' => 'Ingrediente editado com sucesso!']);
  } else {
	  echo json_encode(['data' => 'Erro ao editar ingrediente!']);
	}
} else {
  echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>
