<!DOCTYPE html>
<html>
<title>Home</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-orange.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">
<body>

<!-- Side Navigation -->
<?php include 'blocks/nav-bar.php' ?>

<!-- Header -->
<?php include 'blocks/header.php' ?>

<!-- Modal -->
<div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-animate-top">
      <header class="w3-container w3-theme-l1"> 
        <span onclick="document.getElementById('id01').style.display='none'"
        class="w3-button w3-display-topright">×</span>
        <h4>Oh snap! We just showed you a modal..</h4>
        <h5>Because we can <i class="fa fa-smile-o"></i></h5>
      </header>
      <div class="w3-padding">
        <p>Cool huh? Ok, enough teasing around..</p>
        <p>Go to our <a class="w3-btn" href="/w3css/default.asp">W3.CSS Tutorial</a> to learn more!</p>
      </div>
      <footer class="w3-container w3-theme-l1">
        <p>Modal footer</p>
      </footer>
    </div>
</div>

<div class="w3-row-padding w3-center w3-margin-top">
<div class="w3-third" >
  <div class="w3-card w3-container" style="min-height:460px" onclick="diy()">
  <h3>DIY Barn</h3><br>
  <img src="img/wheelbarrow.png" alt="wheelbarrow"/>
  <p>3 Bookings Maximum per time slot</p>
  <!--<p>Mobile first fluid grid</p>
  <p>Fits any screen sizes</p>
  <p>PC Tablet and Mobile</p> -->
  </div>
</div>

<div class="w3-third">
  <div class="w3-card w3-container" style="min-height:460px" onclick="livery()">
  <h3>Full Livery Barn</h3><br>
  <!--<i class="fa fa-css3 w3-margin-bottom w3-text-theme" style="font-size:120px"></i> -->
  <img src="img/horse.png" alt="wheelbarrow" style="width:200px;height:200px"/>
  <p>2 Bookings Maximum per time slot</p>
  <p></p>
  <p></p>
  <p></p>
  </div>
</div>

<div class="w3-third">
  <div class="w3-card w3-container" style="min-height:460px" onclick="dingle()">
  <h3>Dingle Barn</h3><br>
  <img src="img/bell.png" alt="wheelbarrow" style="width:200px;height:200px">
  <p>2 Bookings Maximum per time slot</p>
  <p></p>
  <p></p>
  <p></p>
  </div>
</div>
</div>
<hr>

<!-- Footer -->
<?php include 'blocks/footer.php' ?>

<!-- Script for Sidebar, Tabs, Accordions, Progress bars and slideshows -->
<script>
// Side navigation
function w3_open() {
  var x = document.getElementById("mySidebar");
  x.style.width = "100%";
  x.style.fontSize = "40px";
  x.style.paddingTop = "10%";
  x.style.display = "block";
}
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}



function dingle() {
    location.href = "dingle.php";
}

function diy() {
    location.href = "diy.php";
}

function livery() {
    location.href = "full-livery.php";
}
</script>

</body>
</html>

