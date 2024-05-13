<?php

require_once("config.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Update status in Leenx table where ref is 1 to 7
$sql = "UPDATE Leenx SET status = '7' WHERE ref = 1";

if ($conn->query($sql) === TRUE) {
    // Return success message
    echo json_encode(array("success" => true, "message" => "Leenx status updated successfully"));
} else {
    // Return error message
    echo json_encode(array("success" => false, "message" => "Error updating Leenx status: " . $conn->error));
}

$conn->close();

?>
