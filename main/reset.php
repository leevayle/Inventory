<?php
// Check if ID, password, and dob are set in the POST data
if (isset($_POST['id'], $_POST['password'], $_POST['dob'])) {
    $id = $_POST['id'];
    $new_user_password = $_POST['password'];
    $dob = $_POST['dob'];
    
    // Check if dob contains alphabets
    if (preg_match('/[a-zA-Z]/', $dob)) {
        echo json_encode(array("success" => false, "message" => "Day of birth cannot contain alphabets"));
        exit();
    }

    // Remove leading zeros from dob
    $dob = ltrim($dob, '0');

    // Check if day of birth exceeds 31
    if ($dob > 31) {
        echo json_encode(array("success" => false, "message" => "Invalid day of birth"));
        exit();
    }

    // Include database configuration
    require_once("config.php");

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        echo json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error));
        exit();
    }

    // Begin transaction
    $conn->begin_transaction();

    // Prepare statement to search for ID and date of birth
    $stmt = $conn->prepare("SELECT id, dob FROM Biodata WHERE id = ?");
    if (!$stmt) {
        echo json_encode(array("success" => false, "message" => "Error preparing select statement: " . $conn->error));
        exit();
    }
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if ID exists in database
    if ($result->num_rows > 0) {
        // Fetch the result
        $row = $result->fetch_assoc();

        // Extract day from database date of birth
        $db_dob_numeric = intval(date('d', strtotime($row['dob'])));

        // Extract day from received date of birth
        $received_dob_numeric = intval($dob);

        // Check if numeric values of dates match
        if ($db_dob_numeric == $received_dob_numeric) {
            // Hash the new user password
            $hashed_password = password_hash($new_user_password, PASSWORD_DEFAULT);

            // Prepare statement to update password
            $update_stmt = $conn->prepare("UPDATE Biodata SET password = ? WHERE id = ?");
            if (!$update_stmt) {
                echo json_encode(array("success" => false, "message" => "Error preparing update statement: " . $conn->error));
                exit();
            }
            
            // Bind parameters
            $update_stmt->bind_param("si", $hashed_password, $id);

            // Execute the update statement
            if ($update_stmt->execute()) {
                // Commit changes
                $conn->commit();
                echo json_encode(array("success" => true, "message" => "Password reset was successful"));
            } else {
                // Rollback changes
                $conn->rollback();
                echo json_encode(array("success" => false, "message" => "Error updating password: " . $conn->error));
            }

            // Close statement
            $update_stmt->close();
        } else {
            echo json_encode(array("success" => false, "message" => "Incorrect Day of birth"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "ID not found"));
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array("success" => false, "message" => "Missing parameters"));
}
?>
