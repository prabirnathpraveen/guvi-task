<?php
try {
    $con = mysqli_connect("localhost", "root", "", "registration_db");
    $email = $_POST['email'];
    $name = $_POST['name'];
    $dob = $_POST['dob'];
    $age = $_POST['age'];
    $mobileNumber = $_POST['mobileNumber'];
    $checkQuery = "SELECT * FROM profile_data WHERE email = '$email'";
    $checkResult = mysqli_query($con, $checkQuery);

    if (mysqli_num_rows($checkResult) > 0) {
        $sql = "UPDATE profile_data SET name = ?, dob = ?, age = ?, mobileNumber = ? WHERE email = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("sssss", $name, $dob, $age, $mobileNumber, $email);
    } else {
        $sql = "INSERT INTO profile_data (email, name, dob, age, mobileNumber) VALUES (?, ?, ?, ?, ?)";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("sssss", $email, $name, $dob, $age, $mobileNumber);
    }

    if ($stmt->execute()) {
        $response = array("status" => true, "message" => "Data inserted successfully!");
    } else {
        $response = array("status" => false, "message" => "Data insertion failed!");
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
