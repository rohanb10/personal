<?php
	//allows user to upload, verifies uploads
    session_start();
    $username = $_SESSION['username'];
    $dir = '/home/yashdalal/Module2SecureData/Users/'.$username;
    
    // Get the filename and make sure it is valid
    $filename = basename($_FILES['uploadedfile']['name']);
    if( !preg_match('/^[\w_\.\-]+$/', $filename) ){
        echo '<style>
        body{
            text-align: center;
            background-color: #FF7373;
            margin: 10px;
            font: 30px Verdana;
            color: white;
        }
        a{
            text-decoration: none;
        }
        </style>';
        echo "File name invalid. Return to the upload page.";
        echo '<br><a href="upload.php">Go back</a>';
        exit;
    }
    
    $full_path = $dir . '/' . $filename;
    
    if( move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $full_path) ){
        header("Location: homepage.php");
        exit;
    }else{
        echo "File upload failed. Return to the upload page.";
        echo '<br><a href="upload.php">Go back</a>';
        echo '<style>
        body{
            text-align: center;
            background-color: #FF7373;
            margin: 10px;
            font: 30px Verdana;
            color: white;
        }
        a{
            text-decoration: none;
        }
        </style>';
        exit;
    }
   
    
?>