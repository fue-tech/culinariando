<?php
include('../connect.php');

$dados = $_POST; 

$sql = 'INSERT INTO ingredientes (nome, unidade, quantidade)
VALUES(?, ?, ?)';

$nome = $_POST["nome"];
$unidade = $_POST["unidade"];
$quantidade = $_POST["quantidade"];

if (!($conn->connect_error)){
	$stm = $conn->prepare($sql);
	
	$stm->bind_param("ssi", $nome, $unidade, $quantidade); 
																						
	if ($stm->execute()){
    echo json_encode(['data' => "Ingrediente cadastrado com sucesso!"]);
  } else {
    echo json_encode(['data' => "Erro ao cadastrar ingrediente!"]);
	}
} else {
  echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>
