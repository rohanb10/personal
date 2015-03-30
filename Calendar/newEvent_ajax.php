<?php
    ini_set("session.cookie_httponly", 1);
	session_start();
	require 'database.php';
	header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

	$event_name=(string) $_POST['event_name'];
    $event_date=(string) $_POST['event_date'];
    $event_start_time=(string) $_POST['event_start_time'];
    $event_end_time=(string) $_POST['event_end_time'];
    $username= $_SESSION['username'];
    //if(isset($_SESSION['token'])){
    //    die("Request forgery detected");
    //}

    $stmt=$mysqli->prepare("insert into events(event_name, event_date, event_start_time, event_end_time, username) values (?, ?, ?, ?, ?)");
    
    $stmt->bind_param('sssss', $event_name, $event_date, $event_start_time, $event_end_time, $username);
 
    $stmt->execute();
 
    $stmt->close();

    echo json_encode(array(
		"success" => true
	));
	exit;
?>