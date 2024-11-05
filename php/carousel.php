<?php
  include('connect.php');

  $sql = "
    SELECT  
        c.id AS carrossel_id,
        c.nome AS titulo,
        r.id AS receita_id,
        r.nome AS receita_nome,
        r.id_dificuldade,
        r.id_categoria
    FROM carrossel AS c
    JOIN receita_carrossel AS rc ON c.id = rc.id_carrossel
    JOIN receita AS r ON rc.id_receita = r.id;
  ";

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
              'id' => $row['receita_id'],
              'nome' => $row['receita_nome'],
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