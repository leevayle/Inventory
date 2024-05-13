<?php

require_once("config.php");

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    // Connection failed, return JSON indicating failure
    echo json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error));
    exit();
}

// Check if the database exists
$result = $conn->query("SHOW DATABASES LIKE '$dbname'");

if ($result->num_rows > 0) {
    // Database exists, return JSON indicating success
    echo json_encode(array("success" => true, "message" => "Database exists"));
} else {
    // Database does not exist, return JSON indicating failure
    echo json_encode(array("success" => false, "message" => "Database does not exist"));
}

$conn->close();

?>