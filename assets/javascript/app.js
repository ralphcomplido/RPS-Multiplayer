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
