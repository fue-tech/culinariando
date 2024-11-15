<?php
include('./connect.php');

$dados = $_GET;

$sql = "DELETE FROM usuario WHERE id = ?";

$id = $dados["id"];

if (!($conn->connect_error)){
	$stm = $conn->prepare($sql);
	$stm->bind_param('i', $id);
																						
	if ($stm->execute()){
	  echo json_encode(['data' => 'Usuario deletado com sucesso!']);
  } else {
	  echo json_encode(['data' => 'Erro ao deletar usuario!']);
	}
} else {
  echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>