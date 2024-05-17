<?php

// Check if ID, password, and dob are set in the POST data
if (isset($_POST['id'], $_POST['password'], $_POST['dob'])) {
    $user_id = $_POST['id'];
    $new_user_password = $_POST['password'];
    $dob = $_POST['dob'];
    
    // Check if dob contains alphabets
    if (preg_match('/[a-zA-Z]/', $dob)) {
        echo json_encode(array("success" => false, "message" => "Date of birth cannot contain alphabets"));
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

    // Get current date
    $current_date = date('Y-m-d');
    
    // Check reset frequency for the current date
    $reset_check_stmt = $conn->prepare("SELECT frequency FROM Reset WHERE user_id = ? AND DATE(date) = ?");
    $reset_check_stmt->bind_param("is", $user_id, $current_date);
    $reset_check_stmt->execute();
    $reset_check_result = $reset_check_stmt->get_result();

    if ($reset_check_result->num_rows > 0) {
        $reset_check_row = $reset_check_result->fetch_assoc();
        if ($reset_check_row['frequency'] >= 3) {
            echo json_encode(array("success" => false, "message" => "Password reset limit reached for today"));
            $reset_check_stmt->close();
            $conn->close();
            exit();
        }
    }
    $reset_check_stmt->close();

    // Begin transaction
    $conn->begin_transaction();

    // Prepare statement to search for ID and date of birth
    $stmt = $conn->prepare("SELECT id, dob, password, old_password FROM Biodata WHERE id = ?");
    $stmt->bind_param("i", $user_id);
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
            // Check if the provided old password matches the current password
            if (!password_verify($new_user_password, $row['old_password'])) {
                // Hash the new user password
                $hashed_password = password_hash($new_user_password, PASSWORD_DEFAULT);

                // Move current password to old password
                $old_password = $row['password'];

                // Prepare statement to update password and old password
                $update_stmt = $conn->prepare("UPDATE Biodata SET password = ?, old_password = ? WHERE id = ?");
                if (!$update_stmt) {
                    echo json_encode(array("success" => false, "message" => "Error preparing update statement: " . $conn->error));
                    exit();
                }
                
                // Bind parameters
                $update_stmt->bind_param("ssi", $hashed_password, $old_password, $user_id);

                // Execute the update statement
                if ($update_stmt->execute()) {
                    // Update reset frequency
                    if ($reset_check_result->num_rows > 0) {
                        $update_reset_stmt = $conn->prepare("UPDATE Reset SET frequency = frequency + 1 WHERE user_id = ? AND DATE(date) = ?");
                        $update_reset_stmt->bind_param("is", $user_id, $current_date);
                    } else {
                        $update_reset_stmt = $conn->prepare("INSERT INTO Reset (user_id, date, frequency) VALUES (?, NOW(), 1)");
                        $update_reset_stmt->bind_param("i", $user_id);
                    }
                    if ($update_reset_stmt->execute()) {
                        // Commit changes
                        $conn->commit();
                        echo json_encode(array("success" => true, "message" => "Password reset successfully"));
                    } else {
                        // Rollback changes
                        $conn->rollback();
                        echo json_encode(array("success" => false, "message" => "Error updating reset frequency: " . $conn->error));
                    }
                    $update_reset_stmt->close();
                } else {
                    // Rollback changes
                    $conn->rollback();
                    echo json_encode(array("success" => false, "message" => "Error updating password: " . $conn->error));
                }

                // Close statement
                $update_stmt->close();
            } else {
                echo json_encode(array("success" => false, "message" => "New password cannot be the same as the old password"));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "Day of birth does not match"));
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
