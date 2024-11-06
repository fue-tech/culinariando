<?php
include('connect.php');

$sql = "SELECT * FROM carrossel_receitas";
$result = $conn->query($sql);

$carrosselData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $carrosselId = $row['carrossel_id'];
        
        if (!isset($carrosselData[$carrosselId])) {
            $carrosselData[$carrosselId] = [
                'id' => $carrosselId,
                'nome' => $row['carrossel_nome'],
                'receitas' => []  
            ];
        }

        $receitas = json_decode($row['receitas'], true);

        if (is_array($receitas)) {
            $carrosselData[$carrosselId]['receitas'] = array_merge($carrosselData[$carrosselId]['receitas'], $receitas);
        }
    }
}

// Transforma o array em uma lista indexada
$carrosselData = array_values($carrosselData);

header('Content-Type: application/json');
echo json_encode($carrosselData, JSON_PRETTY_PRINT);

$conn->close();
?>
