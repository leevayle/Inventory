<?php
// Include config file for database connection
require_once('config.php');

// Check if POST data is set
if (isset($_POST['id']) && isset($_POST['password'])) {
    // Retrieve form data
    $id = $_POST['id'];
    $userpassword = $_POST['password'];

    // Check if ID contains only numbers
    if (!preg_match('/^[0-9]+$/', $id)) {
        // Invalid ID format
        $response = array("success" => false, "message" => "Please enter a valid ID number");
        echo json_encode($response);
        exit; // Stop further execution
    }

    // Check if ID length exceeds 15 characters
    if (strlen($id) > 15) {
        // ID length exceeds limit
        $response = array("success" => false, "message" => "Invalid ID - too long");
        echo json_encode($response);
        exit; // Stop further execution
    }

    // Connect to database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare statement to fetch user data
    $stmt = $conn->prepare("SELECT * FROM biodata WHERE id = ?");
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        // Verify password
        if (password_verify($userpassword, $hashed_password)) {
            // Password correct
            $role = $row['role'];
            $status = $row['status'];
            $response = array(
                "success" => true,
                "message" => "Login successful",
                "role" => $role,
                "status" => $status
            );
            echo json_encode($response);
        } else {
            // Password incorrect
            $response = array("success" => false, "message" => "Incorrect password");
            echo json_encode($response);
        }
    } else {
        // User not found
        $response = array("success" => false, "message" => "User not found");
        echo json_encode($response);
    }

    // Close database connection
    $stmt->close();
    $conn->close();
} else {
    // Invalid request
    $response = array("success" => false, "message" => "Invalid request");
    echo json_encode($response);
}
?>
