<?php
    ini_set("session.cookie_httponly", 1);
    session_start();
    require 'database.php';
    
?>
<!DOCTYPE html>

<html>
<head>
    <title>Calendar</title>

    <link href="calendar.css" type="text/css" rel="Stylesheet"/>
    <link rel="stylesheet" type="text/css" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css"/>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
    <script type="text/javascript" src="http://classes.engineering.wustl.edu/cse330/content/calendar.js"></script>
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>-->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js"></script>
</head>
    
<body>
    <div id="isLoggedIn"><input type="button" id="showLoginPopupButton" value="Login">
    <input type="hidden" value="Logout" id="logoutButton"></div>
    <div id="loginPopup" title="Login to your calendar">
        <input type="text" name="loginUser" id="loginUser" placeholder="Username" />
        <input type="password" name="loginPass" id="loginPass" placeholder="password" />
        <button id="loginButton">Log In</button>
    </div>
    <input type="button" value="Edit Event" id="showEditPopup">
    <div id="editEventPopup" title="Edit your event">
        <input type="hidden" name="event_id" id="event_id"/>
        <input type="text" name="edit_name" id="edit_name" required/>
        <input type="date" name="edit_date" id="edit_date" required/>
        <input type="time" name="edit_start_time" id="edit_start_time" required/>
        <input type="time" name="edit_end_time" id="edit_end_time" required/> 
        <button id="updateEventButton">Update Event</button><br><br><!-- fixme -->
        <button id="deleteEventButton">Delete This Event</button><!-- fixme -->
    </div>
    <input type="button" value="Create New Event" id="showCreateEventPopup">
    <div id="newEventPopup">
        <input type="text" name="event_name" id="event_name" required/>
        <input type="date" name="event_date" id="event_date" required/>
        <input type="time" name="event_start_time" id="event_start_time" required/>
        <input type="time" name="event_end_time" id="event_end_time" required/>
        <button id="createNewEventAjax">Create New Event</button>
    </div>
    <form id="newUser" method="POST">
        <input type="text" name="newUsername" id="newUsername" required/>
        <input type="password" name="newPassword" id="newPassword" required/>
        <button id="createNewUserAjax">Create New User</button>
    </form><br>
    <button id="testme">test</button>
                
    <table id="calendar">
        <caption id="caption"></caption>
        <thead>
            <tr>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
            </tr>
        </thead>
    </table>
    <button id="prev_month_btn">Previous Month</button>
    <button id="next_month_btn">Next Month</button>

<script type="text/javascript" src="ajax.js"> </script>
<script>
</script>
</body>
</html>
