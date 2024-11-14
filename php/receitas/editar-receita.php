<?php
include('../connect.php');

$dados = $_POST;

$sql = 'UPDATE receita
SET nome = ?, video = ?, imagem = ?, preparo = ?, id_categoria = ?, id_dificuldade = ?
WHERE id = ?';

$nome = $dados["nome"];
$video = $dados["video"];
$imagem = $dados["imagem"];
$preparo = $dados["preparo"];
$id_categoria = $dados["categoria"];
$id_dificuldade = $dados["dificuldade"];
$id = $dados["id"];

if (!($conn->connect_error)){
	$stm = $conn->prepare($sql); 

	$stm->bind_param("ssssiii", $nome, $video, $imagem, $preparo, $id_categoria, $id_dificuldade, $id); 

	if ($stm->execute()){
	  echo json_encode(['data' => 'Receita editada com sucesso!']);
  } else {
	  echo json_encode(['data' => 'Erro ao editar receita!']);
	}
} else {
  echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>
