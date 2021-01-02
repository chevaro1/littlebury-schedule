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

// Tabs
function openCity(evt, cityName) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var activebtn = document.getElementsByClassName("testbtn");
  for (i = 0; i < x.length; i++) {
    activebtn[i].className = activebtn[i].className.replace(" w3-dark-grey", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-dark-grey";
}

var mybtn = document.getElementsByClassName("testbtn")[0];
//mybtn.click();

// Accordions
function myAccFunc(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}


// Progress Bars
function move() {
  var elem = document.getElementById("myBar");   
  var width = 5;
  var id = setInterval(frame, 10);
  function frame() {
    if (width == 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}

const d = "<?php echo $date ?>";
var cdate = new Date(d);

const barn = "dingle";

$( function() {
    $( "#datepicker" ).datepicker({ dateFormat: 'yy-mm-dd', setDate: new Date()});
} );

$( function() {
    $( "#datepicker-add" ).datepicker({ dateFormat: 'yy-mm-dd', minDate: 0, ignoreReadonly: true,
    allowInputToggle: true });
} );



var timetable = new Timetable();

timetable.setScope(8,22);

//timetable.addLocations(['william', 'molly', 'steph', 'amanda', 'caroline', 'leanne', 'pia', 'charlotte']);

var renderer = new Timetable.Renderer(timetable);
renderer.draw('.timetable');

var modalname = '';
var modalstart = '';

var deletestart = '';
var deletename = '';

getusers();

getdata(d);
document.getElementById("date").innerHTML = reverse(d);


function getusers() {
    
    var xmlhttp = new XMLHttpRequest();
    var url = "get_users.php";
    var param = "?barn=" + barn;

    console.log("GET USERS CALLED");

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        add_users(myArr);
      }
    };
    xmlhttp.open("GET", url+param, false);
    xmlhttp.send();
}

function add_users(arr) {
    var select = document.getElementById('add-name')
    
    for(i = 0; i < arr.length; i++) {
        var opt = document.createElement('option');
        opt.value = arr[i].name;
        opt.innerHTML = arr[i].name;
        select.appendChild(opt);
        
        timetable.addLocations([arr[i].name]);
        
    }
}


function setdate() {
    var date = $.datepicker.formatDate("yy-mm-dd", $("#datepicker").datepicker("getDate"));

    location.href = "schedule.php?date=" + date;
    document.getElementById("date").innerHTML = reverse(date);
}

function incrementdate(val) {
    
    if (val === "plus") {
        cdate.setDate(cdate.getDate()+1);
    } else {
        cdate.setDate(cdate.getDate()-1);
    }
    res = formatDate(cdate);
    
    //console.log("increment date = " + res);

    location.href = "dingle.php?date=" + res;
    //document.getElementById("date").innerHTML = res;
}


function getdata(date){
        
    var xmlhttp = new XMLHttpRequest();
    var url = "get_schedule.php";
    var param = "?date=" + date;

    console.log("GET DATA CALLED");

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        add_dates(myArr);
      }
    };
    xmlhttp.open("GET", url+param, true);
    xmlhttp.send();
  }
  
  
function add_dates(arr){
    console.log("EVENTS ADDED");
    //getusers();

    for(i = 0; i < arr.length; i++) {
        //console.log("getting start dates");
        var syear = arr[i].start_year;
        var smonth = arr[i].start_month;
        var sday = arr[i].start_day;
        var stime = arr[i].start_time;
        var startdate = new Date(syear,smonth,sday,stime,0);

        //console.log("getting end dates");
        var fyear = arr[i].end_year;
        var fmonth = arr[i].end_month;
        var fday = arr[i].end_day;
        var ftime = arr[i].end_time;
        var enddate = new Date(fyear,fmonth,fday,ftime,0);

        //console.log("start" + startdate);
        //console.log("end" + enddate);

        timetable.addEvent(arr[i].name, arr[i].location, new Date(startdate), new Date(enddate), {onClick: function(event) {
               var day = event.startDate + '';
               var time = day.split(" ");
               var tim = time[4].slice(0,-3);
               //document.getElementById("delete").onclick = delete_event(event.location,tim);  
               deletestart = tim.slice(0,-3);
               deletename = event.location;
               document.getElementById("mod").innerHTML = event.location + " will be down at " + tim;
               modal.style.display = "block"; 
        }});
        //console.log("event added");
    }
    renderer.draw('.timetable');
}


function add_event() {
    var date = $.datepicker.formatDate("yy-mm-dd", $("#datepicker-add").datepicker("getDate"));
    var time = document.getElementById("add-time").value;
    var name = document.getElementById("add-name").value;
    var ftime = parseInt(time) + 2;


    var xmlhttp = new XMLHttpRequest();
    var url = "add_event.php";
    var param = "?date=" + date + "&time=" + time + "&name=" + name + "&ftime=" + ftime;

    //console.log("get data script running");

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //var myArr = JSON.parse(this.responseText);
        console.log("refreshing schedule after event added date: " + d);
        getdata(d);
      }
    };
    xmlhttp.open("GET", url+param, true);
    xmlhttp.send();
}



function delete_event() {
    console.log("DELETING EVENT");
    

     var xmlhttp = new XMLHttpRequest();
      var url = "delete_event.php";
      var param = "?date=" + d + "&time=" + deletestart + "&name=" + deletename;

      

      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //var myArr = JSON.parse(this.responseText);
          console.log("refreshing schedule after event deleted date: " + d);
          getdata(d);
          modal.style.display = "none";
          location.reload();
          return false;
          //setdate();
        }
      };
      xmlhttp.open("GET", url+param, true);
      xmlhttp.send();
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
/*
btn.onclick = function() {
  modal.style.display = "block";
}

 */

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    //console.log("outside modal has been clicked, should clsoe now");
  if (event.target == modal) {
      //console.log("modal closed");
    modal.style.display = "none";
  }
}

function reverse(s){
    var s = s.split("-");
    var one = s[0];
    var two = s[1];
    var three = s[2];
    var mid = "-";
    var res = three.concat(mid,two,mid,one);
    return res;
    
}
