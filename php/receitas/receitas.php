<?php
include('../connect.php');

if (!($conn->connect_error)){
	$sql = "SELECT * FROM receita";
	$result = $conn->query($sql);
	
	if ($result && $result->num_rows > 0) {
    $data = [];
        
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }

	  echo json_encode(['data' => $data]);
  } else {
	  echo json_encode(['data' => 'erro']);
	}
} else {
  echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>