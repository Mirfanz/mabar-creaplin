<?php

$conn = mysqli_connect('localhost','root','','dbgame');


// $question = '1,4,5,7,4,6,7,4,7,4,3,5,8,2,0,9,6,8,9,3,5,9,2,5,9,6,2,7,9,6,4,5,6,7,5,6,5,2,4,5,6,2';
$link = uniqid('mabar');
$query = "
INSERT INTO `game1` (`id`, `link`, `timer`, `pcount`, `question`, `p1name`, `p2name`, `p3name`)
VALUES (NULL, '$link', '0', '0', '0,', '', '', '')
";
mysqli_query($conn, $query);
if(mysqli_affected_rows($conn)) echo json_encode($link,true);
