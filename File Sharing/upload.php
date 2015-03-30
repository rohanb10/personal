<?php session_start(); ?>
<!DOCTYPE html>
<html>
    <head>
        <title>Upload your file</title>
        <link rel="stylesheet" type="text/css" href="uploadStyle.css"/>
    </head>
    <body>
        <form enctype="multipart/form-data" action="verifyUpload.php" method="POST">
            <p>
                <input type="hidden" name="MAX_FILE_SIZE" value="20000000" />
                <!--<input type="text" name="username" value="fixme">-->
                <label for="uploadfile_input">Choose a file to upload:</label><br>
                <input name="uploadedfile" type="file" id="uploadfile_input" />
            </p>
            <p>
                <input type="submit" value="Upload File" onclick="" />
            </p>
        </form>
    </body>
</html>
