<?php
	session_start();
	//opens files in browser, asks user to download if not possible
	$fullpath=$_POST['open'];

	// Now we need to get the MIME type (e.g., image/jpeg).  PHP provides a neat little interface to do this called finfo.
	$finfo = new finfo(FILEINFO_MIME_TYPE);
	$mime = $finfo->file($fullpath);
	// Finally, set the Content-Type header to the MIME type of the file, and display the file.
	header("Content-Type: ".$mime);
	readfile($fullpath);
?>