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

#echo "gor date";
$path = '../config.php';
echo 'path : ' + $path;
require_once $path;
#echo "got config";

$sql = "SELECT * FROM heroku_02d9a109da8ad10.users WHERE barn = '$barn'";
echo $sql;

$result = mysqli_query($link, $sql);

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
