<?php
include('../connect.php');

$dados = $_POST;

$sql = 'INSERT INTO tags (tag) VALUES(?)';

$tag = $dados["tag"];

if (!($conn->connect_error)){
    $stm = $conn->prepare($sql);
    $stm->bind_param("s", $tag);

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