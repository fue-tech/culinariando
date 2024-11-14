<?php
include('../connect.php');

$dados = $_POST;

$sql = 'INSERT INTO receita (nome, preparo, video, imagem, data_criacao, id_categoria, id_dificuldade, id_usuario)
VALUES(?, ?, ?, ?, ?, ?, ?, 1)';

$nome = $dados["nome"];
$preparo = $dados["preparo"];
$video = $dados["video"];
$imagem = $dados["imagem"];
$categoria = $dados["categoria"];
$dificuldade = $dados["dificuldade"];
$data = date('Y-m-d H:i:s');

if (!($conn->connect_error)){
	$stm = $conn->prepare($sql);
	
	$stm->bind_param("sssssss", $nome, $preparo, $video, $imagem, $data, $categoria, $dificuldade); 
																						
	// executa a query e já valida se foi bem sucedido
	if ($stm->execute()){
	  echo json_encode(['data' => 'Receita cadastrada com sucesso']);
  } else {
	  // lógica caso não tenha sido inserido corretamente, troque "mensagem
	  // pelo retorno ou texto desejado
	  echo json_encode(['data' => 'Erro ao cadastrar receita']);
	}
} else {
  echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>
