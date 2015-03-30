<?php
    ini_set("session.cookie_httponly", 1);
	require 'database.php';
	header("Content-Type: application/json");

	$newUser = $_POST['newUser'];
	$newPassword = $_POST['newPassword'];

	$stmt = $mysqli->prepare("insert into users(username,password) values (?, ?)");
    
    if(!$stmt){
    	//printf("Query Prep Failed: %s\n", $mysqli->error);
    	echo json_encode(array(
		"success" => false,
		"message" => "Query Prep Failed"
	));
    	exit;
    }
    
    $stmt->bind_param('ss', $newUser, crypt($newPassword,$newPassword));
    //$stmt->bind_param('ss', $newUser, $newPassword);
 
    $stmt->execute();
 
    $stmt->close();

	echo json_encode(array(
		"success" => true
	));
	exit;
?>