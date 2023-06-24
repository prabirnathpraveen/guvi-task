<?php
try {
    $con = mysqli_connect("localhost", "root", "", "registration_db");
    $email = $_POST['email'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM registered_data WHERE email = ? AND password = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $name = $row['first_name'];
        $response = array("status" => true, "message" => "Login successful!","name" => $name);
    } else {
        $response = array("status" => false, "message" => "Invalid email or password!");
    }
    header('Content-Type: application/json');
    echo json_encode($response);
    $con->close();
} catch (Exception $e) {
    if ($e->getCode() == 1049) {
        $response = array("status" => false, "message" => "Database Not Found" );
    } 
    else{
         $response = array("status" => false, "message" => "Error: " . $e->getMessage());
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
