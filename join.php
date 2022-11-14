<?php
if(!(isset($_POST['room']) && isset($_POST['nama']))) return;
$room = $_POST['room'];
$nama = $_POST['nama'];

$result = mysqli_query(mysqli_connect('localhost','root','','dbgame'), "SELECT pcount,p1name,p2name,p3name,p1pos,p2pos,p3pos FROM game1 WHERE link='$room'");
$data = mysqli_fetch_assoc($result);
$player = [
  'player' => 4,
  'pos' => 0,
];

if($nama === $data['p1name']){
  $player = [
    'player' => 1,
    'pos' => intval($data['p1pos']),
  ];
} else if($nama === $data['p2name']){
  $player = [
    'player' => 2,
    'pos' => intval($data['p2pos']),
  ];
} else if($nama === $data['p3name']){
  $player = [
    'player' => 3,
    'pos' => intval($data['p3pos']),
  ];
} else if($data['pcount'] < 3){
  $id = $data['pcount'] + 1;
  if(mysqli_query(mysqli_connect('localhost','root','','dbgame'), "UPDATE game1 SET pcount = pcount+1, p".$id."name = '$nama' WHERE link='$room'")) $player = [
    'player' => $id,
    'pos' => 0,
  ];
}
// $query "SELECT "

echo json_encode($player);
