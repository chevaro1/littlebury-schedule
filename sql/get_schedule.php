<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
#echo "entered get schedule";
$date = $_GET['date'];
$barn = $_GET['barn'];
#$date = "2020-12-24";
#echo $date;
#echo $barn;

#echo "gor date";
require_once '../sql/config.php';
#echo "got config";

$sql = "SELECT * FROM bookings WHERE date = '$date' AND barn = '$barn'";
echo $sql;

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
        $dates = explode("-",$row['date']);
        
        $row['start_year'] = $dates[0];
        $row['start_month'] = $dates[1];
        $row['start_day'] = $dates[2];
        $row['end_year'] = $dates[0];
        $row['end_month'] = $dates[1];   
        $row['end_day'] = $dates[2];
        
        #array_push($arr, $row); 
        #$count += 1;
        $arr[] = $row;
    }
}
#echo $count;

$jsondata = json_encode($arr);
echo $jsondata;
