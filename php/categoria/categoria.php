<?php
include('../connect.php');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dados = $_POST;
    if (empty($dados['categoryName'])) {
        echo json_encode(['success' => false, 'message' => 'Nome da categoria é necessário']);
        exit;
    }

    $nome = $dados['categoryName'];

    $sql = "INSERT INTO categoria (nome) VALUES (?)";
    $stm = $conn->prepare($sql);
    $stm->bind_param("s", $nome);

    if ($stm->execute()) {
        $id = $stm->insert_id;
        echo json_encode(['success' => true, 'id' => $id, 'data' => 'Categoria criada com sucesso']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao criar categoria']);
    }

    $stm->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT id, nome FROM categoria";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $categorias = [];
        while ($row = $result->fetch_assoc()) {
            $categorias[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $categorias]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nenhuma categoria encontrada']);
    }
}

$conn->close();
?>
