let helper_name = prompt("Please enter your Name for security reasons\nYou may cancel if you do not wish to share your Name:", "");
let helper_email = prompt("Please enter your Email Address for security reasons\nYou may cancel if you do not wish to share your Email Address:","");
alert('Location access required to send the Gaurdians of the User the last known location.\nPlease consider allowing access for the safety of the user.\nYour location will be accessed only once.');
var User_Latitude = null;//make this global variable.
var User_Longitude = null;//make this global variable.
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(Position);
    }
}
function Position(position) {
    if (position != null) {
        User_Latitude = position.coords.latitude;
        User_Longitude = position.coords.latitude;
    }
    else{
        User_Latitude = "Person wishes to stay anonymous.";
        User_Longitude = "Person wishes to stay anonymous.";
    }
}
getLocation();
let access_date = new Date();
function sendEmail(helper_name,helper_email,User_Latitude,User_Longitude) { 
    Email.send({ 
      Host: "smtp.gmail.com", 
      Username: "suncorgroup2020@gmail.com", 
      Password: "Enter your password",//Password to email ID
      To: 'gaurdian-a@email,gaurdian-b@email',
      From: "suncorgroup2020@gmail.com", 
      Subject: "User's data has been accessed.", 
      Body: "User's data has been accessed at ${User_Latitude},${User_Latitude} by a person named ${helper_name} and email id ${helper_email}.",//send proper email to the gaurdians
    }) 
      .then(function (message) { 
        alert("A mail has been sent to the Gaurdains of the User letting them know that the User's data has been accessed.") 
    }); 
}
if(helper_email==null){
    helper_email = "Person wishes to stay anonymous."
}
if(helper_email==null){
    helper_email = "Person wishes to stay anonymous."
}
sendEmail(helper_name,helper_email,User_Latitude,User_Longitude);