<?php
include('../connect.php');

$dados = $_POST;

$sql = 'UPDATE ingredientes
SET nome = ?, unidade = ?, quantidade = ?
WHERE id = ?';

$nome = $dados["nome"];
$unidade = $dados["unidade"];
$quantidade = $dados["quantidade"];
$id = $dados["id"];

if (!($conn->connect_error)){
	$stm = $conn->prepare($sql); 

	$stm->bind_param("sssi", $nome, $unidade, $quantidade, $id); 

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
