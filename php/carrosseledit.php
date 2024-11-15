<?php
include("connect.php");


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "culinariando";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}


$request_method = $_SERVER["REQUEST_METHOD"];

// Função para carregar todos os itens do carrossel
function carregarCarrossel($conn) {
    $sql = "SELECT * FROM carrossel";
    $result = $conn->query($sql);
    $carrossel = [];
    
    while ($row = $result->fetch_assoc()) {
        $carrossel[] = $row;
    }
    
    echo json_encode(['data' => $carrossel]);
}

// Função para carregar um item específico do carrossel para edição
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

// Função para adicionar um novo item no carrossel
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

// Função para atualizar um item do carrossel
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

// Função para excluir um item do carrossel
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

// Roteamento de requisições
switch ($request_method) {
    case 'GET':
        if (isset($_GET['id'])) {
            if (isset($_GET['action']) && $_GET['action'] === 'delete') {
                excluirCarrossel($conn); // Exclusão de item do carrossel
            } else {
                carregarCarrosselItem($conn, $_GET['id']); // Carregar item específico para edição
            }
        } else {
            carregarCarrossel($conn); // Carregar todos os itens
        }
        break;
    case 'POST':
        // Adicionar ou atualizar carrossel
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            atualizarCarrossel($conn); // Atualizar carrossel
        } else {
            adicionarCarrossel($conn); // Adicionar novo carrossel
        }
        break;
    default:
        echo json_encode(['data' => 'Método não suportado']);
        break;
}


$conn->close();
?>
