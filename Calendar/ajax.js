/*global $:false */
/*global Month:false */


function loginAjax(){ //LOGIN
	var username = document.getElementById("loginUser").value;
	var password = document.getElementById("loginPass").value;
 
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
 
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "login_ajax.php", false);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			document.getElementById("isLoggedIn").innerHTML=username+'<br><input type="button" value="Logout" onclick="logoutAjax()">';
			alert("You were logged in");
		    showEvent();
    		updateCalendar();
		}else{
			alert("You were not logged in.  "+jsonData.message);
		}
	}, false);
	xmlHttp.send(dataString);
	//document.getElementById("isLoggedIn").innerHTML="Logged in now";
	//alert(dataString);
}
document.getElementById("loginButton").addEventListener("click", loginAjax, false);

function logoutAjax(){ //LOGOUT
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET","logout_ajax.php",false);
    xmlHttp.send();
    document.getElementById("loginUser").value="";
    document.getElementById("loginPass").value="";
    document.getElementById("isLoggedIn").innerHTML='<input type="button" value="Login" onclick="showLoginPopup()">'; 
    alert("You were logged out");
    clearCalendar();
}
document.getElementById("logoutButton").addEventListener("click", logoutAjax, false);

function newUserAjax(){ //CREATE NEW USER
    var newUser = document.getElementById("newUsername").value;
    var newPassword = document.getElementById("newPassword").value;
    var dataString = "newUser=" + encodeURIComponent(newUser) + "&newPassword=" + encodeURIComponent(newPassword);

    var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "createUser_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			alert("A new user has been added to the database");
		}
		else{
			alert("A new user was not created.");
		}
	}, false);
	xmlHttp.send(dataString);
}
document.getElementById("createNewUserAjax").addEventListener("click", newUserAjax, false);

function showLoginPopup(){ //LOGIN POPUP
    $("#loginPopup").dialog();
}
document.getElementById("showLoginPopupButton").addEventListener("click", showLoginPopup, false);

function hideLoginPopup(){ //LOGIN POPUP
    $("#loginPopup").dialog('close');
}
document.getElementById("loginButton").addEventListener("click", hideLoginPopup, false);

function showCreateEventPopup(){ //LOGIN POPUP
    $("#newEventPopup").dialog();
}
document.getElementById("showCreateEventPopup").addEventListener("click", showCreateEventPopup, false);

function hideCreateEventPopup(){ //LOGIN POPUP
    $("#newEventPopup").dialog('close');
}
document.getElementById("createNewEventAjax").addEventListener("click", hideCreateEventPopup, false);

function showEventPopup(){ //EVENT POPUP
    $("#editEventPopup").dialog();
}
document.getElementById("showEditPopup").addEventListener("click", showEventPopup, false);
function hideEventPopup(){ //EVENT POPUP
    $("#editEventPopup").dialog('close');
}
document.getElementById("updateEventButton").addEventListener("click", hideEventPopup, false);
document.getElementById("deleteEventButton").addEventListener("click", hideEventPopup, false);

function newEventAjax(){ //CREATE NEW EVENT
	var event_name = document.getElementById("event_name").value;
	var event_date = document.getElementById("event_date").value;
	var event_start_time = document.getElementById("event_start_time").value;
	var event_end_time = document.getElementById("event_end_time").value;
 
	var dataString = "event_name=" + encodeURIComponent(event_name) + "&event_date=" + encodeURIComponent(event_date) + "&event_start_time=" + encodeURIComponent(event_start_time) + "&event_end_time=" + encodeURIComponent(event_end_time);
 
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "newEvent_ajax.php", false);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		console.log(event.target.responseText);
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			alert("The event has been added to your calendar");
			document.getElementById("event_name").value="";
    		document.getElementById("event_date").value="";
    		document.getElementById("event_start_time").value="";
    		document.getElementById("event_end_time").value="";
    		showEvent();
    		updateCalendar();
		}
		else{
			alert("The event was not added to your calendar");
		}
	}, false);
	xmlHttp.send(dataString);
}

document.getElementById("createNewEventAjax").addEventListener("click", newEventAjax, false);

function editEventAjax(){ //EDIT EVENT
	var edit_name = document.getElementById("edit_name").value;
	var edit_date = document.getElementById("edit_date").value;
	var edit_start_time = document.getElementById("edit_start_time").value;
	var edit_end_time = document.getElementById("edit_end_time").value;
 
	var dataString = "edit_name=" + encodeURIComponent(edit_name) + "&edit_date=" + encodeURIComponent(edit_date) + "&edit_start_time=" + encodeURIComponent(edit_start_time) + "&edit_end_time=" + encodeURIComponent(edit_end_time);
 
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "editEvent_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			alert("The event was edited");
    		showEvent();
    		updateCalendar();
		}
		else{
			alert("The event was not able to be updated");
		}
	}, false);
	xmlHttp.send(dataString);
}
document.getElementById("updateEventButton").addEventListener("click", editEventAjax, false);

function deleteAjax(){
	var event_id= document.getElementById("event_id").value;
	var dataString="event_id=" + encodeURIComponent(event_id);
	var xmlHttp= new XMLHttpRequest();
	xmlHttp.open("POST", "deleteEvent_ajax.php", true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText);
		if(jsonData.success){
			alert("The event was deleted");
    		showEvent();
    		updateCalendar();
		}
		else{
			alert("The event was not able to delete");
		}
	}, false);
	xmlHttp.send(dataString);
}
document.getElementById("deleteEventButton").addEventListener("click", deleteAjax, false);

var jsonData="";
function showEvent(){
	var xmlHttp= new XMLHttpRequest();
	xmlHttp.open("POST","fetchEvents_ajax.php",false);

	xmlHttp.addEventListener("load", function(event){
		//console.log(event.target.responseText);
		jsonData = JSON.parse(event.target.responseText);
		
		processEvents(jsonData);
	},false);

    xmlHttp.send();
}
var event_list=[];

function processEvents(jsonData){
	for(var i=0;i<jsonData.length;i++){
		event_list[i]=[];
		// String being tested
		var str = jsonData[i];
		var regex = /name=([^&]+)&date=(\d{4}-\d\d-\d\d)/;
		var regex2 = /((19|20)\d\d)-(\d\d)-(\d\d)/;
		var result = str.match(regex);
		var event_list_name = result[1]; //Name of event
		var event_list_date = result[2].match(regex2); //Date in format 2014-10-27

		var event_list_year = event_list_date[1];
		var event_list_month = event_list_date[3];
		event_list_month= parseInt(event_list_month, 10); //removing 0 prefix
		var event_list_day=event_list_date[4];
		event_list_day=parseInt(event_list_day,10);

		event_list[i][0]=event_list_year;
		event_list[i][1]=event_list_month;
		event_list[i][2]=event_list_day;
		event_list[i][3]=event_list_name;
		//console.log("Year= "+event_list[i][0]+ "Month= "+event_list[i][1]+" Day="+event_list[i][2]);
	}
}

function eventsForThisMonth(qMonth,qYear){
	var dayValues=[];
	
	for(var i=0;i<event_list.length;i++){
		var cDay=event_list[i][2];
		var cYear=event_list[i][0];
		var cMonth=event_list[i][1];

		if((qMonth+1)==cMonth && qYear==cYear){
			dayValues[cDay] = event_list[i][3];
			//console.log(dayValues[cDay]);
		}
	}
	return dayValues;
}
document.getElementById("testme").addEventListener("click", showEvent, false);

//
// FRONT END CODE. DO NOT TOUCH
//
var currentMonth = new Month(2014, 9);
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.getElementById("next_month_btn").addEventListener("click", function(){
    currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
    updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
    //alert("The new month is "+currentMonth.month+" "+currentMonth.year);
}, false);

document.getElementById("prev_month_btn").addEventListener("click", function(){
    currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
    updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
    //alert("The new month is "+currentMonth.month+" "+currentMonth.year);
}, false);

document.addEventListener("DOMContentLoaded", updateCalendar, false);

function updateCalendar() {
    var weeks = currentMonth.getWeeks();
    var table = document.getElementById("calendar");
    var rowcount = 1;
    var year = currentMonth.year;
    var month = months[currentMonth.month];
    document.getElementById("caption").innerHTML = month + ", " + year;
    
    while (table.rows.length>1) {
        table.deleteRow(-1);
    }
    
    for(var w in weeks){
    	if(weeks.hasOwnProperty(w)){
	        var days = weeks[w].getDates();
	        var x = table.insertRow(rowcount);
	        var row = table.rows[rowcount];
	        var colcount = 0;
	        var ev_month = [];
	        ev_month = eventsForThisMonth(parseInt(currentMonth.month),year);

	        for(var d in days){
	        	if(days.hasOwnProperty(d)){
	            x.insertCell(colcount);
		            var text = days[d].getDate();
		            if (currentMonth.month == days[d].getMonth()) {
		                row.cells[colcount].innerHTML = text;
		                var check = ev_month[parseInt(text)];
		                if(check){
		                	row.cells[colcount].innerHTML = text+"<br>"+check;
		                }
		                //eventsForThisDay(parseInt(text),parseInt(currentMonth.month),year);
		            }
		            colcount++;
		        }
	        }
	        rowcount++;
	    }
    }
}

function clearCalendar() {
    var weeks = currentMonth.getWeeks();
    var table = document.getElementById("calendar");
    var rowcount = 1;
    var year = currentMonth.year;
    var month = months[currentMonth.month];
    document.getElementById("caption").innerHTML = month + ", " + year;
    
    while (table.rows.length>1) {
        table.deleteRow(-1);
    }
    
    for(var w in weeks){
    	if(weeks.hasOwnProperty(w)){

	        var days = weeks[w].getDates();
	        var x = table.insertRow(rowcount);
	        var row = table.rows[rowcount];
	        var colcount = 0;
	        var ev_month = [];
	        ev_month = eventsForThisMonth(parseInt(currentMonth.month),year);

	        for(var d in days){
	        	if(days.hasOwnProperty(d)){
		            x.insertCell(colcount);
		            var text = days[d].getDate();
		            if (currentMonth.month == days[d].getMonth()) {
		                row.cells[colcount].innerHTML = text;
		            }
		            colcount++;
		        }
	        }
	        rowcount++;
	    }
    }
}