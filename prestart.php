<?php
if(!(isset($_POST['room']) || isset($_POST['nama']))) return;
$nama=$_POST['nama'];
$room = $_POST['room'];

$result = mysqli_query(mysqli_connect('localhost','root','','dbgame'), "SELECT timer,question,p1name,p2name,p3name,p1pos,p2pos,p3pos FROM game1 WHERE link='$room'");
$data = mysqli_fetch_assoc($result);

$data['pos'] = '';
// $data['timer'] = time() - $data['timer'];
// if($data['timer'] > 120) $data['timer'] = 120;

if($nama === $data['p1name']){
  $data['pos'] = intval($data['p1pos']);
} else if($nama === $data['p2name']){
  $data['pos'] = intval($data['p2pos']);
} else if($nama === $data['p3name']){
  $data['pos'] = intval($data['p3pos']);
}

echo json_encode($data,true);