<?php
  include('connect.php');

  $sql = "SELECT * FROM receita_detalhada";

  $result = $conn->query($sql);

  $carrosselData = [];

  if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
          $carrosselId = $row['carrossel_id'];
          
          if (!isset($carrosselData[$carrosselId])) {
              $carrosselData[$carrosselId] = [
                  'id' => $carrosselId,
                  'titulo' => $row['titulo'],
                  'receitas' => []
              ];
          }
          
          $carrosselData[$carrosselId]['receitas'][] = [
              'nome' => $row['nome'],
              'imagem' => $row['imagem'],
              'dificuldade' => $row['dificuldade'],
              'categoria' => $row['categoria']
          ];
      }
  }

  $carrosselData = array_values($carrosselData);

  header('Content-Type: application/json');
  echo json_encode($carrosselData, JSON_PRETTY_PRINT);

  $conn->close();
?>