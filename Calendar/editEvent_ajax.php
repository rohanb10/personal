<?php
    ini_set("session.cookie_httponly", 1);
	session_start();
	require 'database.php';
    header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

	
	$edit_name=(string) $_POST['edit_name'];
    $edit_date=(string) $_POST['edit_date'];
    $edit_start_time=(string) $_POST['edit_start_time'];
    $edit_end_time=(string) $_POST['edit_end_time'];
    $username= $_SESSION['username'];
    if(isset($_SESSION['token'])){
        die("Request forgery detected");
    }

    $stmt=$mysqli->prepare("insert into events(event_name, evt_date, event_start_time, event_end_time, username) values (?, ?, ?, ?, ?)");
    
    $stmt->bind_param('sssss', $edit_name, $edit_date, $edit_start_time, $edit_end_time, $username);
 
    $stmt->execute();
 
    $stmt->close();

    echo json_encode(array(
		"success" => true
	));
	exit;
?>