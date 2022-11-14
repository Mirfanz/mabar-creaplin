<?php
if(!isset($_POST['room'])) return;

$room = $_POST['room'];

$result = mysqli_query(mysqli_connect('localhost','root','','dbgame'), "SELECT timer,p1pos,p2pos,p3pos,p1score,p2score,p3score FROM game1 WHERE link='$room'");
$data = mysqli_fetch_assoc($result);
$data['timer'] = time() - $data['timer'];

$data['start'] = true;
if($data['timer'] > 120) {
  $data['timer'] = 120;
  $data['start'] = false;
} else if ($data['p1pos'] > 44 && $data['p2pos'] > 44 && $data['p3pos'] > 44) {
  $data['timer'] = 120;
  $data['start'] = false;
}
echo json_encode($data,true);