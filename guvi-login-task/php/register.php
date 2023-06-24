<?php
try {
    $con = mysqli_connect("localhost", "root", "", "registration_db");

    $sql = "INSERT INTO registered_data (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
    $stmt = $con->prepare($sql);

    $stmt->bind_param("ssss",$first_name, $last_name, $email, $password);

    $first_name = $_POST['firstname'];
    $last_name = $_POST['lastname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($stmt->execute()) {
        $response = array("status" => true, "message" => "Data inserted successfully!");
    } else {
        $response = array("status" => false, "message" => "Data insertion failed!");
    }

    header('Content-Type: application/json');
    echo json_encode($response);
    $con->close();
    } catch (Exception $e) {
    if ($e->getCode() == 1062) {
        $response = array("status" => false, "message" => "Mail Already Registered");
    }
    elseif ($e->getCode() == 1049) {
        $response = array("status" => false, "message" => "Database Not Found" );
    } 
    else{
    $response = array("status" => false, "message" => "Error: " . $e->getMessage());
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
