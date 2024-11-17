<?php
include('../connect.php');

header('Content-Type: application/json');

if (isset($_POST['id']) && isset($_POST['nome']) && isset($_POST['tipo']) && isset($_POST['popularidade'])) {
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $tipo = $_POST['tipo'];
    $popularidade = $_POST['popularidade'];

    if (!is_numeric($id)) {
        echo json_encode(['success' => false, 'message' => 'ID inválido']);
        exit;
    }

    $sql = "UPDATE categoria SET nome = ?, tipo = ?, popularidade = ? WHERE id = ?";
    $stm = $conn->prepare($sql);
    $stm->bind_param("ssii", $nome, $tipo, $popularidade, $id);

    if ($stm->execute()) {
        echo json_encode(['success' => true, 'data' => 'Categoria atualizada com sucesso']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao editar categoria']);
    }

    $stm->close();
} else {
    echo json_encode(['success' => false, 'message' => 'ID e nome são necessários']);
}

$conn->close();
?>
