<?php
include('../connect.php');

$dados = $_POST;

$sql = 'UPDATE tags SET tag = ? WHERE id = ?';

$tag = $dados["tag"];
$id = $dados["id"];

if (!($conn->connect_error)){
    $stm = $conn->prepare($sql);
    $stm->bind_param("si", $tag, $id);

    if ($stm->execute()){
        echo json_encode(['data' => 'Tag atualizada com sucesso']);
    } else {
        echo json_encode(['data' => 'Erro ao atualizar a tag']);
    }
} else {
    echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>