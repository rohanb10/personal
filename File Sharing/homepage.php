<?php session_start(); 
	if(isset($_SESSION['username'])==''){
		header("Location: login.php");
		exit;
		}
?>
<!DOCTYPE html>

<html>
<head>
    <title>File Sharing - <?php $_SESSION['username']?></title>
    <link rel="stylesheet" type="text/css" href="homepageStyling.css"/>
</head>

<body>
    <?php
    	//accounts for situation when user has not logged in
        $username = isset($_SESSION['username'])?$_SESSION['username']:'';
        //makes required directory
        $dir = '/home/yashdalal/Module2SecureData/Users/'.$username;
        $files = scandir($dir);
        $files = array_filter($files, create_function('$a','return ($a[0]!=".");'));
    ?>
    <h1>Welcome <?php echo $username; ?></h1>
    <a href="logout.php"><div id="logout">Logout</div></a>
    <div id="form">
        <form name="filelist" id="files" method="post" enctype="multipart/form-data" action="delete.php">
            <table>
                <tr>
                    <th>File Name</th>
                    <th>Open File</th>
                    <th>Delete File</th>
                </tr>
                <?php
                	//goes through files and displays filename and gives user option to open, delete etc
                    foreach($files as $value){
                        echo "<tr>";
                        echo "<td>".$value."</td>";
                        $location = $dir.'/'.$value;
                        echo '<td> <form id="openbutton" method="post" action="open.php">
                        <input type="hidden" name="open" value="'.$location.'">
                        <input type="submit" value="Open File"></form></td>';
                        echo '<td><input type="checkbox" name="delete[]" value="'.$location.'"></td>';
                        echo "</tr>";
                    }
                ?>
            </table>
            <input type="button" value="Upload File" onclick="location.href='upload.php'"/>
            <input type="submit" name="deleteme" value="Delete Selected ">
        </form>
    </div>
</body>
</html>
