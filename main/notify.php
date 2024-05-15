<?php
// Get IP data from JavaScript
$ipData = json_decode(file_get_contents('php://input'), true);

// Extract relevant information
$ip = $ipData['ip'];
$country = $ipData['country'];

// Email content
$subject = 'A new activation for leenx solution - inventory has been completed';
$message = "IP: $ip\n";
$message .= "Country: $country\n";

// Send email
$to = 'leevayle@protonmail.com';
$from = 'lee254kinanga@gmail.com';
$headers = 'From: ' . $from;
mail($to, $subject, $message, $headers);
?>
