<?php
include('connect.php');

$id = $_GET['id'];

$sql = "SELECT * FROM receita_detalhada WHERE id = ?";

if (!$conn->connect_error) {
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);

  if ($stmt->execute()) {
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $row['ingredientes'] = json_decode($row['ingredientes'], true);

      header('Content-Type: application/json');
      echo json_encode($row, JSON_PRETTY_PRINT);
    } else {
      echo json_encode(['error' => 'Nenhuma receita encontrada.']);
    }
  } else {
    echo json_encode(['error' => 'Erro ao buscar receita.']);
  }
} else {
  echo json_encode(['error' => 'Erro ao conectar ao banco de dados.']);
}

$conn->close();
?>
