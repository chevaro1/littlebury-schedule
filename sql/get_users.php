<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
#echo "entered get schedule";
$barn = $_GET['barn'];
#$date = "2020-12-24";
#echo $date;
/*
#echo "gor date";
$url = parse_url(getenv("mysql://b8e1af19b2b19f:1e770fa5@eu-cdbr-west-03.cleardb.net/heroku_02d9a109da8ad10?reconnect=true"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

$link = new mysqli($server, $username, $password, $db);
*/
$server = "eu-cdbr-west-03.cleardb.net";
$username = "b8e1af19b2b19f";
$password = "1e770fa5";
$db = "heroku_02d9a109da8ad10";

$link = new mysqli($server, $username, $password, $db);

// Check connection
if (!$link) {
  die("Connection failed: " . mysqli_connect_error());
}
#echo "got config";

$sql = "SELECT * FROM users WHERE barn = '$barn'";
#echo $sql;

$result = mysqli_query($link, $sql);

if (!$result) {
    echo "Connection failed: ". mysqli_connect_error();
}

$arr = [];
$count = 0;
#echo "result receivefd";
if (mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        #echo "in while loop";
        
        
        #array_push($arr, $row); 
        #$count += 1;
        $arr[] = $row;
    }
}
#echo $count;

$jsondata = json_encode($arr);
echo $jsondata;
