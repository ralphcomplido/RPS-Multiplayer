$(document).ready(function() {

 var inputName = $("<input>");
 inputName.addC
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxU-ltr4XyVQhjB7xdCq-92qaxz10zCf0",
    authDomain: "rps-multiplayer-4c13c.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-4c13c.firebaseio.com",
    projectId: "rps-multiplayer-4c13c",
    storageBucket: "",
    messagingSenderId: "888487869526"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref().set({
  	status: "Good"
  })

  database.ref().on("value", function(snapshot) {
      console.log(snapshot.val());
   
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


var rps = ["r", "p", "s"];
function playerOneChoices() {
  
  
  for (var i = 0; i < rps.length; i++) {
    var btn = $("<button>");
  
    btn.attr("data-choice", rps[i]);
    btn.addClass("rps");
    btn.html(rps[i]);
    $(".playerOne-panel").append(btn);
  }



  
}
function playerTwoChoices() {
  
  
  for (var i = 0; i < rps.length; i++) {
    var btn = $("<button>");
  
    btn.attr("data-choice", rps[i]);
    btn.addClass("rps");
    btn.html(rps[i]);
    $(".playerTwo-panel").append(btn);
  }



  
}

playerTwoChoices()
playerOneChoices();

});