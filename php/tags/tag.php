<?php
include('../connect.php');

$id = $_GET["id"] ?? null;

if (!$conn->connect_error) {
    if ($id) {
        $sql = "SELECT * FROM tags WHERE id = ?";
        $stm = $conn->prepare($sql);
        $stm->bind_param("i", $id);

        if ($stm->execute()) {
            $result = $stm->get_result();
            $data = $result->fetch_assoc();
            
            if ($data) {
                echo json_encode(['data' => $data]);
            } else {
                echo json_encode(['data' => 'Nenhuma tag encontrada com esse ID']);
            }
        } else {
            echo json_encode(['data' => 'Erro ao buscar a tag']);
        }
    } else {
        $sql = "SELECT * FROM tags";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $data = [];
            
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

            echo json_encode(['data' => $data]);
        } else {
            echo json_encode(['data' => 'Nenhuma tag encontrada']);
        }
    }
} else {
    echo json_encode(['data' => "Erro ao conectar ao banco de dados."]);
}

$conn->close();
?>
