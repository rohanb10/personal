<?php
    session_start();
    //gets username from active session and filename to delete from the homepage form
    $username = $_SESSION['username'];
    $file = $_POST['delete'];
    
    //runs through each file and checks if unlinking is successful
    //tells user which files couldn't be deleted and asks them to return to homepage
    foreach($file as $selected){
    	chmod($selected,0777);//change permissions to open
        if (!unlink($selected)){
            echo 'Error deleting '.$selected.'. Please try again';
            echo '<br><a href="homepage.php">Go back</a>';
            exit;
        }
    }
    //redirects to homepage after successfuly deleting files
    header("Location: homepage.php");
    exit;
?>