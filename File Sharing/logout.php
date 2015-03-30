<?php
    session_start();
    session_destroy();	//kills session on logout preventing reaccess without providing username
    header("Location: login.php");
    exit;
?>