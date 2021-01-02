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
$barn = $_GET['barn'];

#$date = "2020-12-24";
#echo $date;

#echo "gor date";
require_once 'config.php';
#echo "got config";

#$sql = "INSERT INTO `dingle` (`id`, `date`, `location`, `start_time`, `end_time`, `name`) VALUES (NULL, '$date', '$name', '$time', '$ftime', 'Yard Visit');";
$sql = "DELETE FROM `bookings` WHERE date= '$date' AND location= '$name' AND start_time= '$time' AND barn= '$barn'";

mysqli_query($link, $sql);

