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





var cdate = new Date(d);
var modalname = '';
var modalstart = '';

var deletestart = '';
var deletename = '';

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

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

getusers();

getdata(d);
var datedisplay = days[ cdate.getDay() ] + ", " + reverse(d);
document.getElementById("date").innerHTML = datedisplay;


function getusers() {
    
    var xmlhttp = new XMLHttpRequest();
    var url = "sql/get_users.php";
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
    var lowerd = barn.toLowerCase();
    lowerd = lowerd.replace(" ", "-");

    location.href = lowerd + ".php?date=" + res;
    //document.getElementById("date").innerHTML = res;
}


function getdata(date){
        
    var xmlhttp = new XMLHttpRequest();
    var url = "sql/get_schedule.php";
    var param = "?date=" + date + "&barn=" + barn;

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
    var date12 = $.datepicker.formatDate("yy-mm-dd", $("#datepicker-add").datepicker("getDate"));
    var time = document.getElementById("add-time").value;
    var name = document.getElementById("add-name").value;
    var ftime = parseInt(time) + 2;
    
    console.log("date =" + date12 + "hello");
    
    if(date12 === "") {
        alert("please select a valid date");
        return;
    }
    
    var check = checkexists(date12, name, time);
    //console.log("check = :" + check);
    if (check === "1") {
        alert("You have already booked this time slot on this date");
        return;
    }
    
    var c = confirm("Please confirm your booking: \n\
                    Date: " + reverse(date12) + "\n\
                    Start Time: " + time + ":00\n\
                    Name: " + name );
    
    if (c === false) {
        return;
    }
    
    
    

    var xmlhttp = new XMLHttpRequest();
    var url = "sql/add_event.php";
    var param = "?date=" + date12 + "&time=" + time + "&name=" + name + "&ftime=" + ftime + "&barn=" + barn;

    //console.log("get data script running");

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //var myArr = JSON.parse(this.responseText);
        //console.log("refreshing schedule after event added date: " + d);
        getdata(d);
      }
    };
    xmlhttp.open("GET", url+param, true);
    xmlhttp.send();
}



function checkexists(datet, name, start) {
    var xmlhttp = new XMLHttpRequest();
    var url = "sql/check_exists.php";
    var param = "?date=" + datet + "&start=" + start + "&name=" + name + "&barn=" + barn;
    var res = "0";

    //console.log("check exists called");

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        console.log("returned total = " + myArr[0].total);
        
        if (myArr[0].total >= "1"){
            //console.log("breach found");
            res = "1";
            //console.log("breach found res = " + res);
            return;
        }
      }
    };
    xmlhttp.open("GET", url+param, false);
    xmlhttp.send();
    //console.log("in check function res = " + res);
    return res;
}



function delete_event() {
    console.log("DELETING EVENT");
    

     var xmlhttp = new XMLHttpRequest();
      var url = "sql/delete_event.php";
      var param = "?date=" + d + "&time=" + deletestart + "&name=" + deletename + "&barn=" + barn;

      

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
