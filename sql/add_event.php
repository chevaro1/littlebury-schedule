<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
#echo "entered get schedule";
$date = $_GET['date'];
$time = $_GET['time'];
$name = $_GET['name'];
$ftime = $_GET['ftime'];
$barn = $_GET['barn'];
#$date = "2020-12-24";
#echo $date;

#echo "gor date";
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

$sql = "INSERT INTO `bookings` (`id`, `date`, `location`, `start_time`, `end_time`, `name`, `barn`) VALUES (NULL, '$date', '$name', '$time', '$ftime', 'Yard Visit', '$barn');";
echo $sql;

mysqli_query($link, $sql);

