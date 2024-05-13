<?php

require_once("config.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to check status in Leenx table where ref is 1
$sql = "SELECT status FROM Leenx WHERE ref = 1";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch result
    $row = $result->fetch_assoc();
    $status = intval($row["status"]);

    // Return status as integer
    echo $status;
} else {
    // Return 0 if no result found
    echo "0";
}

$conn->close();

?>