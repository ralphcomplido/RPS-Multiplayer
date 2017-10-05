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

var game = {
  player1: "",
  player2: ""

}
var wins = 0;
var losses = 0;
var ties = 0;
var playerOneDiv = $(".playerOne-panel");
var playerTwoDiv = $(".playerTwo-panel");

var rps = ["r", "p", "s"];

function playerChoices(player, playerID) {
  
  
  for (var i = 0; i < rps.length; i++) {
    var btn = $("<button>");
  
    btn.attr("data-choice", rps[i])
       .attr("id", playerID);
    btn.addClass("rps");

    btn.html(rps[i]);
    player.append(btn);
  }


$(".rps").unbind('click').click( function() {
 
  if($(this).attr("id") === "player-1"){
    game.player1 = $(this).attr("data-choice");
    console.log(game.player1);
  }
  else if ($(this).attr("id") === "player-2"){
    game.player2 = $(this).attr("data-choice");
    console.log(game.player2);
  };
  determineWinner();
});


  
}

playerChoices(playerOneDiv, "player-1");
playerChoices(playerTwoDiv, "player-2");


  
function resetChoice () {
  if (wins + 1 || losses + 1 || ties + 1) {
    game.player1 = "";
    game.player1 = "";
    console.log(game.player1);
  }
  else {console.log(game.player1)};
}






function determineWinner() {
  if ((game.player1 === "r") || (game.player1 === "p") || (game.player1 === "s")) {

        if ((game.player1 === "r") && (game.player2=== "s")) {
          wins++;
        } else if ((game.player1 === "r") && (game.player2=== "p")) {
          losses++;
        } else if ((game.player1 === "s") && (game.player2=== "r")) {
          losses++;
        } else if ((game.player1 === "s") && (game.player2=== "p")) {
          wins++;
        } else if ((game.player1 === "p") && (game.player2=== "r")) {
          wins++;
        } else if ((game.player1 === "p") && (game.player2=== "s")) {
          losses++;
        } else if (game.player1 === game.player2) {
          ties++;
        }
}
console.log("wins: " + wins);
console.log("losses: " + losses);
console.log("ties: " + ties);
resetChoice();
}
 
});