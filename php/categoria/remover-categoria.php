<?php
include('../connect.php');

header('Content-Type: application/json');

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    if (!is_numeric($id)) {
        echo json_encode(['success' => false, 'message' => 'ID inválido']);
        exit;
    }

    $sql = "DELETE FROM categoria WHERE id = ?";
    $stm = $conn->prepare($sql);
    $stm->bind_param("i", $id);

    if ($stm->execute()) {
        echo json_encode(['success' => true, 'data' => 'Categoria removida com sucesso']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao remover categoria']);
    }

    $stm->close();
} else {
    echo json_encode(['success' => false, 'message' => 'ID da categoria é necessário']);
}

$conn->close();
?>
