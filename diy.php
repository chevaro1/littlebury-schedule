<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$barn = "DIY";
$max = "2";

if (isset($_GET["date"])) {
    $date = $_GET["date"];
} else {
    $con = "used else";
    $date = date("Y-m-d");
}


?>

<!DOCTYPE html>
<html>
<title><?php echo $barn ?> Barn</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-orange.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" href="styles/timetablejs.css"> 
<link rel="stylesheet" href="styles/demo.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="styles/popups.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="scripts/timetable.js"></script>
<body>

<!-- Side Navigation -->

<?php include 'blocks/nav-bar.php' ?>

<!-- Header -->
<?php include 'blocks/header.php' ?>


<div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p id="mod"></p>
      <button id="delete" type="button" onclick="delete_event()">Delete</button>
    </div>

</div>


<div class="w3-container">
<hr>

<div class="w3-center">
  <h2><?php echo $barn ?> Barn</h2>
</div>
<div class="w3-row">
  <div class="w3-third">
    <a class="w3-button w3-circle w3-large w3-theme" onclick="incrementdate('minus')"><i class="fa fa-minus"></i></a> 
    
  </div>
  <div class="w3-third" >
      <h3 style="text-align: center" id="date"></h3>
  </div>
  <div class="w3-third" >
      <a class="w3-button w3-circle w3-large w3-theme" style="float: right" onclick="incrementdate('plus')"><i class="fa fa-plus"></i></a> 
      
  </div>
    
    
</div>

<div class="timetable"></div>
<br>
<div class="w3-row-padding">

    <hr>
    
<?php include 'blocks/add-block.php' ?>
</div>
<hr> 
<br>

<?php include 'blocks/footer.php' ?>

<script>
const d = "<?php echo $date ?>";
const barn = "<?php echo $barn ?>";
const maxUsers = "<?php echo $max ?>";
</script>

<script src="scripts/schedule.js"></script>

</body>
</html>
