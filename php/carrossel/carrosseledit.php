<?php
include("../connect.php");


$request_method = $_SERVER["REQUEST_METHOD"];

function carregarCarrossel($conn) {
    $sql = "SELECT * FROM carrossel";
    $result = $conn->query($sql);
    $carrossel = [];
    
    while ($row = $result->fetch_assoc()) {
        $carrossel[] = $row;
    }
    
    echo json_encode(['data' => $carrossel]);
}

function carregarCarrosselItem($conn, $id) {
    $sql = "SELECT * FROM carrossel WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode(['data' => $row]);
    } else {
        echo json_encode(['data' => 'Item não encontrado']);
    }
}

function adicionarCarrossel($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $nome = $data['nome'];
    
    $sql = "INSERT INTO carrossel (nome) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nome);
    
    if ($stmt->execute()) {
        echo json_encode(['data' => 'Carrossel adicionado com sucesso']);
    } else {
        echo json_encode(['data' => 'Erro ao adicionar carrossel']);
    }
}

function atualizarCarrossel($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $nome = $data['nome'];
    
    $sql = "UPDATE carrossel SET nome = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $nome, $id);
    
    if ($stmt->execute()) {
        echo json_encode(['data' => 'Carrossel atualizado com sucesso']);
    } else {
        echo json_encode(['data' => 'Erro ao atualizar carrossel']);
    }
}

function excluirCarrossel($conn) {
    $id = $_GET['id'];
    
    
    $sqlDeleteAssociations = "DELETE FROM receita_carrossel WHERE id_carrossel = ?";
    $stmtDeleteAssociations = $conn->prepare($sqlDeleteAssociations);
    $stmtDeleteAssociations->bind_param("i", $id);
    
    if (!$stmtDeleteAssociations->execute()) {
        echo json_encode(['data' => 'Erro ao excluir associações relacionadas']);
        return;
    }
    
    
    $sql = "DELETE FROM carrossel WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        echo json_encode(['data' => 'Carrossel excluído com sucesso']);
    } else {
        echo json_encode(['data' => 'Erro ao excluir carrossel']);
    }
}

switch ($request_method) {
    case 'GET':
        if (isset($_GET['id'])) {
            if (isset($_GET['action']) && $_GET['action'] === 'delete') {
                excluirCarrossel($conn);
            } else {
                carregarCarrosselItem($conn, $_GET['id']);
            }
        } else {
            carregarCarrossel($conn);
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            atualizarCarrossel($conn);
        } else {
            adicionarCarrossel($conn);
        }
        break;
    default:
        echo json_encode(['data' => 'Método não suportado']);
        break;
}


$conn->close();
?>
