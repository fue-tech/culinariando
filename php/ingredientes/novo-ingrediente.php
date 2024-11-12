<?php
include('../connect.php');

$dados = $_POST; 

$sql = 'INSERT INTO ingredientes (nome)
VALUES(?)';

$nome = $_POST["nome"];

if (!($conn->connect_error)){
	$stm = $conn->prepare($sql);
	
	$stm->bind_param("s", $nome); 
																						
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
