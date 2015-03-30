<?php
	//verifies login, prevents bad username, gives user option to retry login
    session_start();
    $_SESSION['username']=(String) trim(htmlentities($_POST["username"]));
    
    $userFile=fopen("/home/yashdalal/Module2SecureData/users.txt","r");
    
    while(!feof($userFile)){
        $username = trim(fgets($userFile));
        $equal = (strcmp($_SESSION['username'],$username));
        if ($equal === 0){
            //echo 'welcome'.$username;
            header("Location: homepage.php");
            //echo "end of header";
            exit;
        }
    }
    
    fclose($userFile);
    echo "Username not found. Please try logging in again.";
    echo '<br><a href="login.php">Retry login</a>';
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
?>