<?php
	try
	{
		$myFile = $_POST['username']+".json";

		$jsondata = file_get_contents($myFile);
		echo jsondata;
	}
	catch (Exception $e) {
		echo 'Caught Exception: ', $e->getMessage(), "\n";
	}
?>