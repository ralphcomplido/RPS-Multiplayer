# HW -  RPS-Multiplayer

## Live Link
 
  - https://ralphcomplido.github.io/RPS-Multiplayer/



## Description

#### In this homework, we will create a RPS Game Multiplayer using Firebase.


- We have to understand how Firebase is used.
- We have to send the game data on Firebase.

## Technologies Used


- Jquery for Dom Manipulation

- Firebase for Database

-------------


## Code Explaination


### The html has 5 sections:

 - Greeting
 - Player 1
 - Player 2
 - Game Info
 - Chat

### The css is used to style the sections, add colors to buttons, and arrange the position of the sections.

### The javascript does the most work for this code. I used Jquery and Firebase to manipulate the DOM and send data to both players.


### Here are the brief explanations of the codes to achieve the goal:
- To access Firebase, we use this code:

```
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
  
var gameData = database.ref("/game");
```

- This code is for chat via Firebase:
```

  var messageData = database.ref("/messages");
  messageData.onDisconnect().remove();
 
  messageData.on("value", function(snapshot) {
    
    if (snapshot.child('msg').exists()) {
      console.log(snapshot.val().user,snapshot.val().msg);
      var msgClass = snapshot.val().user === game[game.curPlayer].name ? 'msg-player' : 'msg-opponent';
      let $msg = $('<p>').text(snapshot.val().user+': '+snapshot.val().msg).addClass(msgClass);
      $('#chat-box').append($msg);  
    }
  
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
```

- RPS Logic:

```
if (p1.choice == 'rock'){
            if (p2.choice == 'paper'){
                playerOneWins = false;
                p1.losses++;
                p2.wins++;
            } else if (p2.choice == 'scissor'){
                playerOneWins = true;
                p1.wins++;
                p2.losses++;
            } else {
              $('.info-well > p').text("Tie!");
            }
      }
      if (p1.choice == 'paper'){
          if (p2.choice == 'scissor'){
              playerOneWins = false;
              p1.losses++;
              p2.wins++;
          } else if (p2.choice == 'rock'){
              playerOneWins = true;
              p1.wins++;
              p2.losses++;
          } else {
            $('.info-well > p').text("Tie!");
          }
      }
      if (p1.choice == 'scissor'){
          if (p2.choice == 'rock'){
              playerOneWins = false;
              p1.losses++;
              p2.wins++;
          } else if (p2.choice == 'paper'){
              playerOneWins = true;
              p1.wins++;
              p2.losses++;
          } else {
            $('.info-well > p').text("Tie!");
          }
      }
      if ($('.info-well > p').text() !== "Tie!") {
        
          if (isPlayerOne && playerOneWins) {
          $('.info-well > p').text("You Win!");
        } else if (!isPlayerOne && !playerOneWins) {
          $('.info-well > p').text("You Win!");
        } else {
          $('.info-well > p').text("You Lose!");
        }
      }
 ```

