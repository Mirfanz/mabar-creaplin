<?php
if(!(isset($_POST['room']) && isset($_POST['id']) && isset($_POST['aidi']) && isset($_POST['time']))) return;
$room = $_POST['room'];
$player = $_POST['id'] + 1;
$pos = $_POST['aidi'];
$waktu = $_POST['time'];

$score = floor($pos ** 3 / ($waktu/10));

$conn = mysqli_connect('localhost','root','','dbgame');
$query = "UPDATE game1 SET p".$player."pos = '$pos',p".$player."score = '$score'  WHERE link='$room'";
if(mysqli_query($conn, $query)) echo 'success';

