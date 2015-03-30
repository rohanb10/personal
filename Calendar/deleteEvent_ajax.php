<?php
    ini_set("session.cookie_httponly", 1);
	session_start();
	require 'database.php';
	header("Content-Type: application/json");

	$event_id=(string) $_POST['event_id'];

	$stmt=$mysqli->prepare("delete from events where event_id='".$event_id."'");
 
    $stmt->execute();
 
    $stmt->close();

    echo json_encode(array(
		"success" => true
	));
    exit;
?>