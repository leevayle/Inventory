<?php

require_once("config.php");

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    echo json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error));
    exit();
}

// Check if the database already exists
$checkSql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'leenx_solutions_inventory'";
$checkResult = $conn->query($checkSql);

if ($checkResult->num_rows > 0) {
    // Database already exists, return an error
    echo json_encode(array("success" => false, "message" => "Database already exists"));
    exit();
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE leenx_solutions_inventory";
if ($conn->query($sql) === TRUE) {
    echo json_encode(array("success" => true, "message" => "Database created successfully"));
} else {
    echo json_encode(array("success" => false, "message" => "Error creating database: " . $conn->error));
}

$conn->close();

?>
