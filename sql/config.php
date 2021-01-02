<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$user = "william";
$pass = "global2020";
$db = "schedule";

#$user = "william";
#$pass = "VUjH2tGs7nL6xy7x";
#$db = "william";

$servername = "localhost";
$username = $user;
$password = $pass;
$database = $db;


$link = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$link) {
  die("Connection failed: " . mysqli_connect_error());
}