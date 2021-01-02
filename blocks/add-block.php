<div class="w3-half">
<form class="w3-container w3-card-4">
  <h2>Book Time Slot</h2>
  <div class="w3-section">    
    <label>Date</label>
    <input type="text" class="w3-input" id="datepicker-add" readonly="true">
    
  </div>
  <div class="w3-section">      
    <label>Time</label>
    <select id="add-time" class="w3-input">
           <option value="8">8am - 10am</option>
           <option value="10">10am - 12pm</option>
           <option value="12">12pm - 2pm</option>
           <option value="14">2pm - 4pm</option>
           <option value="16">4pm - 6pm</option>
           <option value="18">6pm - 8pm</option>
           <option value="20">8pm - 10pm</option>
       </select>
  </div>
  <div class="w3-section">      
    <label>Name</label>
    <select id="add-name" class="w3-input">

        
    </select>
  </div>
  
  <div class="w3-row">
      <div class="w3-center">
          <a class="w3-button w3-theme" onclick="add_event()">Book</a>
      </div>
  </div>
  <br>
</form>
</div>