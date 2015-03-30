<?php
// login_ajax.php
    ini_set("session.cookie_httponly", 1);
	require 'database.php';
	header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
	 
	$username = $_POST['username'];
	$password = $_POST['password'];
	 
	// Check to see if the username and password are valid.
	$stmt= $mysqli->prepare("SELECT username, password FROM users where username='".$username."'");
	if(!$stmt){
		echo json_encode(array(
			"success" => false,
			"message" => "Query Prep Failed"
		));
		exit;
	}
	$stmt->execute();
	$stmt->bind_result($usernameAtt, $passwordAtt);
	$stmt->fetch();
	$stmt->close();
	if($passwordAtt==crypt($password, $passwordAtt)){
	//if($password==$passwordAtt){
		session_start();
		$_SESSION['username'] = $username;
		$_SESSION['token'] = substr(md5(rand()), 0, 10);
	 
		echo json_encode(array(
			"success" => true
		));
		exit;
	}
	else{
		echo json_encode(array(
			"success" => false,
			"message" => "Incorrect Username or Password"
		));
		exit;
	}
?>