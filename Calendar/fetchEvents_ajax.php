<?php
    ini_set("session.cookie_httponly", 1);
	session_start();
	require 'database.php';

	$username=(string) $_SESSION['username'];


	$stmt=$mysqli->prepare("SELECT event_name, event_date,event_id from events where username='".$username."'");
 
 	if(!$stmt){
        echo json_encode(array(
            "success" => false,
            "message" => "Query Prep Failed"
        ));
        exit;
    }
    $stmt->execute();
 	$stmt->bind_result($event_name, $event_date, $event_id);

 	$nameArray= array();

 	while($stmt->fetch()){
 		array_push($nameArray, ("name=".$event_name."&date=".$event_date."&id=".$event_id));
 	}
 	//foreach ($nameArray as $r) {
	//	echo $r;	
 	//}
 	//$out=array_values($nameArray);

    echo json_encode($nameArray);

    exit;
?>