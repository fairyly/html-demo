<?php
 // var_dump($_POST);
 // exit;
if (isset($_POST['data'])) {
	$base64 = $_POST['data'];
	$filename = time().rand(0,10000).'.jpg';
	$data = explode(',', $base64);
	$type = $data[1];
	if (file_put_contents($filename, base64_decode($type))) {
		echo $filename;
	}

	// unlink($filename);
}
