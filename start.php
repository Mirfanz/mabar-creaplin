<?php
if(!isset($_POST['room'])) return;
$room = $_POST['room'];
$timer = time();
$question = '';
for($i=0;$i<50;$i++){
  $question .= rand(0,9).',';
}
$result = mysqli_query(mysqli_connect('localhost','root','','dbgame'), "UPDATE game1 SET timer = '$timer',question = '$question',p1pos = 0,p2pos = 0,p3pos = 0,p1score = 0,p2score = 0,p3score = 0 WHERE link='$room'");
