<?php
// Incluindo o arquivo de conexão com o banco de dados
include('connect.php');

// Definindo o cabeçalho para o JSON
header('Content-Type: application/json');

// Verifica se os dados necessários foram enviados via POST
if (isset($_POST['id']) && isset($_POST['nome'])) {
    $id = $_POST['id'];
    $nome = $_POST['nome'];

    // Verifica se o ID é um número válido
    if (!is_numeric($id)) {
        echo json_encode(['success' => false, 'message' => 'ID inválido']);
        exit;
    }

    $sql = "UPDATE categoria SET nome = ? WHERE id = ?";
    $stm = $conn->prepare($sql);
    $stm->bind_param("si", $nome, $id);

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
