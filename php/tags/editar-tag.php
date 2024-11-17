<?php
include('../connect.php');

$dados = $_POST;

$sql = 'UPDATE tags SET tag = ?, cor = ?, status = ? WHERE id = ?';

$tag = $dados["tag"];
$cor = $dados["color"];
$status = $dados["status"];
$id = $dados["id"];

if (!($conn->connect_error)){
    $stm = $conn->prepare($sql);
    $stm->bind_param("sssi", $tag, $cor, $status, $id);

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