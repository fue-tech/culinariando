<?php
include('../connect.php');

$id = $_GET["id"];

if (!($conn->connect_error)){
    $sql = "DELETE FROM tags WHERE id = ?";
    $stm = $conn->prepare($sql);
    $stm->bind_param("i", $id);

    if ($stm->execute()){
        echo json_encode(['data' => 'Tag deletada com sucesso']);
    } else {
        echo json_encode(['data' => 'Erro ao deletar a tag']);
    }
} else {
    echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>
