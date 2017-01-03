<?php
//  var_dump($_POST);
// // var_dump($_FILES);
//  exit;
$base64 = $_POST['data'];
$filename = time().rand(0,100).'.jpg';
$data = explode(',', $base64);
$type = $data[1];
if (file_put_contents($filename, base64_decode($type))) {
	echo $filename;
}
