<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
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

*/

$url = parse_url(getenv("mysql://b8e1af19b2b19f:1e770fa5@eu-cdbr-west-03.cleardb.net/heroku_02d9a109da8ad10?reconnect=true"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

$link = new mysqli($server, $username, $password, $db);

// Check connection
if (!$link) {
  die("Connection failed: " . mysqli_connect_error());
}
