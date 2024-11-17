<?php
include('../connect.php');

$dados = $_POST;

$sql = 'INSERT INTO tags (tag, cor, status) VALUES(?, ?, ?)';

$tag = $dados["tag"];
$cor = $dados["color"];
$status = $dados["status"];

if (!($conn->connect_error)){
    $stm = $conn->prepare($sql);
    $stm->bind_param("sss", $tag, $cor, $status);

    if ($stm->execute()){
        echo json_encode(['data' => 'Tag inserida com sucesso']);
    } else {
        echo json_encode(['data' => 'Erro ao inserir a tag']);
    }
} else {
    echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>