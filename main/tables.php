<?php

require_once("config.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Begin transaction
$conn->begin_transaction();

// Initialize success flag
$success = true;
$errors = [];

// Create Biodata table
$sql_biodata = "CREATE TABLE IF NOT EXISTS Biodata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
    status ENUM('yes', 'no') DEFAULT 'no',
    password VARCHAR(255),
    theme ENUM('1', '2', '3', '4') DEFAULT '1',
    profile TEXT,
    admin_id INT,
    dob DATE,
    location VARCHAR(255),
    UNIQUE (admin_id)
)";

if ($conn->query($sql_biodata) !== TRUE) {
    $success = false;
    $errors[] = "Error creating Biodata table: " . $conn->error;
}

// Hash the password
$hashed_password = password_hash("admin", PASSWORD_DEFAULT);

// Add default row to Biodata table
$sql_insert_biodata = "INSERT INTO Biodata (id, fname, lname, role, password, dob, location) 
                       VALUES (123456789, 'admin', 'admin', 'superadmin', '$hashed_password', '1990-01-01', 'Earth')";
if ($conn->query($sql_insert_biodata) !== TRUE) {
    $success = false;
    $errors[] = "Error inserting default row into Biodata table: " . $conn->error;
}

// Create Company table
$sql_company = "CREATE TABLE IF NOT EXISTS Company (
    ref INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    slogan VARCHAR(255),
    hq_pic_url VARCHAR(255),
    email VARCHAR(255),
    logo_url VARCHAR(255),
    hotline VARCHAR(20) DEFAULT ''
)";

if ($conn->query($sql_company) !== TRUE) {
    $success = false;
    $errors[] = "Error creating Company table: " . $conn->error;
} else {
    // Insert default row into Company table
    $sql_insert_company = "INSERT INTO Company (ref) VALUES (1)";
    if ($conn->query($sql_insert_company) !== TRUE) {
        $success = false;
        $errors[] = "Error inserting default row into Company table: " . $conn->error;
    }
}

// Create Leenx table
$sql_leenx = "CREATE TABLE IF NOT EXISTS Leenx (
    ref INT AUTO_INCREMENT PRIMARY KEY,
    version VARCHAR(20) NOT NULL,
    url VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    slogan VARCHAR(255),
    status ENUM('7', '40') DEFAULT '40'
)";

if ($conn->query($sql_leenx) !== TRUE) {
    $success = false;
    $errors[] = "Error creating Leenx table: " . $conn->error;
} else {
    // Insert default row into Leenx table
    $sql_insert_leenx = "INSERT INTO Leenx (ref, status) VALUES (1, '40')";
    if ($conn->query($sql_insert_leenx) !== TRUE) {
        $success = false;
        $errors[] = "Error inserting default row into Leenx table: " . $conn->error;
    }
}

// Check if all queries were successful
if ($success) {
    // Commit transaction if all queries succeeded
    $conn->commit();
    echo json_encode(array("success" => true, "message" => "All tables created and default data inserted successfully"));
} else {
    // Rollback transaction if any query failed
    $conn->rollback();
    echo json_encode(array("success" => false, "errors" => $errors));
}

$conn->close();

?>
