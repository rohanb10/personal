<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
    <title>Share yo files</title>
    <link rel="stylesheet" type="text/css" href="loginStyling.css"/>
</head>

<body>
    <h1>File Sharing</h1>
    <div id="loginform">
        <form name="userlogin" id="form" action="verify.php" method="post">
            <input type="text" name="username" placeholder="Username"/><br>
            <input type="submit" value="Login" onClick="return verify()" />
        </form>
    </div>

    <script>
        function verify(){
        	//prevents blank entry for username
            var x=document.forms["userlogin"]["username"].value;
            if (x==null||x==""){
                alert("Please do not leave Username field blank");
                return false;
            }
            else{
                return true;
            }
        }
    </script>
</body>
</html>
