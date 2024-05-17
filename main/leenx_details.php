<?php

// Include database configuration
require_once("config.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error));
    exit();
}

// Prepare statement to fetch data from Leenx table
$stmt = $conn->prepare("SELECT version, url, slogan, name FROM Leenx WHERE ref = 1");
$stmt->execute();
$result = $stmt->get_result();

// Check if data exists
if ($result->num_rows > 0) {
    // Fetch the result
    $row = $result->fetch_assoc();

    // Create JSON response
    $response = array(
        "success" => true,
        "data" => array(
            "version" => $row['version'],
            "url" => $row['url'],
            "slogan" => $row['slogan'],
            "name" => $row['name']
        )
    );

    // Send JSON response
    echo json_encode($response);
} else {
    // No data found
    echo json_encode(array("success" => false, "message" => "No data found in Leenx table"));
}

// Close statement and connection
$stmt->close();
$conn->close();

?>
