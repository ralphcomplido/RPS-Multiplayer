$(document).ready(function() {


   // game variables and methods
  var game = {
    // player variables
    playerOne: {
      wins: 0,
      losses: 0,
      name: "",
      choice: false,
    },
    playerTwo: {
      wins: 0,
      losses: 0,
      name: "",
      choice: false,
    },
    // game variables
    turns: 0,
    curPlayer: null,
    isLoaded: false,
    opponentDataKey: undefined,
    
    // show rock paper scissor options
    displayRps: function(isPlayerOne){
      
      var rock = $('<button>').addClass('rps').text('Rock').attr('data-rps','rock')
      .attr('id','r');
      var paper = $('<button>').addClass('rps').text('Paper').attr('data-rps','paper')
      .attr('id','p');
      var scissor = $('<button>').addClass('rps').text('Scissor').attr('data-rps','scissor')
      .attr('id','s');
      var choices = $('<div>').append(rock,paper,scissor);
      if (isPlayerOne) {
        $('.playerOne-panel').html(choices);
      } else {
        $('.playerTwo-panel').html(choices);
      }
      $('.info-well > p').html($('<p>').text('Rock, Paper or Scissor?'));
    },
    // send player updates to database
    updatePlayerData: function(isPlayerOne, playerName, choice) {
      playerName = !playerName || playerName === "" ? this[this.curPlayer].name : playerName;
      choice = choice === undefined ? false : choice;
      if (isPlayerOne) {
        gameData.update({
         p1: {
            wins: this.playerOne.wins,
            losses: this.playerOne.losses,
            name: playerName,
            choice: choice
          }
        });
        $('.playerOne-name > span').text(playerName);
      } else {
        gameData.update({
         p2: {
            wins: this.playerTwo.wins,
            losses: this.playerTwo.losses,
            name: playerName,
            choice: choice
          }
        });
        $('.playerTwo-name > span').text(playerName);  
      }
    },
    // Determine winner
    getWinner: function(isPlayerOne){
      var p1 = this.playerOne;
      var p2 = this.playerTwo;
      var playerOneWins;
      // RPS logic
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
      // if not a tie display result
      if ($('.info-well > p').text() !== "Tie!") {
        
          if (isPlayerOne && playerOneWins) {
          $('.info-well > p').text("You Win!");
        } else if (!isPlayerOne && !playerOneWins) {
          $('.info-well > p').text("You Win!");
        } else {
          $('.info-well > p').text("You Lose!");
        }
      }
      // reset choice & send player result to firebase & display opponent choice
      var opponent = this.curPlayer === "playerOne" ? "playerTwo" : "playerOne";
      $('.'+opponent+'-panel').html($('<p>').addClass('rps-choice').text(this[opponent].choice));
  
      this.updatePlayerData(isPlayerOne, false, false);
      setTimeout(function() {
        $('.info-well > button').remove();
        var isPlayerOne = game.curPlayer === "playerOne" ? true : false;
        game.playerOne.choice = false;
        game.playerTwo.choice = false;
        game.displayRps(isPlayerOne);
        var opponent = game.curPlayer === "playerOne" ? "playerTwo" : "playerOne";
        $('.'+opponent+'-panel').empty();
      }, 5000);
    }
    // animate rock paper scissor and black-bar
    
  }


  
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

  // listen for in game changes and respond accordingly 
  gameData.on("value", function(snapshot) {
    //  game is already loaded do not assign player
    if (game.isLoaded) {
      console.log('Game loaded, Player already assigned');
    } else {
      // assign user to a player
      game.isLoaded = true;
      // If there are no players current player is playerOne
      if (!snapshot.child("p1").exists() && !snapshot.child("p2").exists()) {
        console.log("No one is playing.");
        if (!game.curPlayer) {
          $('.info-well > p').html("Create your username Player 1!");
          game.curPlayer = "playerOne";
          console.log("You are "+game.curPlayer);
          game.opponentDataKey = 'p2';
          game.updatePlayerData(true,"Waiting For Player");
        }
      }
      // If firebase has a player2 and no player1 set currentPlayer to playerOne
      else if (!snapshot.child("p1").exists() && snapshot.child("p2").exists()) {
        console.log("playerTwo is rollin");
        game.playerTwo.name = snapshot.val().p2.name;
        $('.playerTwo-name > span').text(snapshot.val().p2.name);
        console.log(game.playerTwo.name,snapshot.val().p2.name)
        if (!game.curPlayer) {
          $('.info-well > p').html("Create your username Player 1!");
          game.curPlayer = "playerOne";
          console.log("You are "+game.curPlayer);
          game.opponentDataKey = 'p2';
          game.updatePlayerData(true,"Waiting For Player");
        }
      }
      // If firebase has a player1 and no player1 set currentPlayer to playerTwo
      else if (snapshot.child("p1").exists() && !snapshot.child("p2").exists()) {
        console.log("playerOne is rollin");
        game.playerOne.name = snapshot.val().p1.name;
        $('.playerOne-name > span').text(game.playerOne.name);
        if (!game.curPlayer) {
          $('.info-well > p').html("Create your username Player 2!");
          game.curPlayer = "playerTwo";
          console.log("You are "+game.curPlayer);
          game.opponentDataKey = 'p1';
          game.updatePlayerData(false,"Waiting For Player");
        }
      // game is full inform player and disconnect from Firebase
      } else {
        console.log("Full House");
        game.playerOne.name = snapshot.val().p1.name;
        $('.playerOne-name > span').text(game.playerOne.name);
        game.playerTwo.name = snapshot.val().p2.name;
        $('.playerTwo-name > span').text(game.playerTwo.name);
        $('.info-well > p').text('Game is Full');
        $('.info-well > p').append($('<p>').text('Please try again later'));
        Firebase.goOffline();
      }
    }
    // if name has been changed/added update locally
    var opponent = game.curPlayer === "playerOne" ? "playerTwo" : "playerOne";
    var opponentStored = game.curPlayer === "playerOne" ? "p2" : "p1";
    var playerStored = game.curPlayer === "playerOne" ? "p1" : "p2";
    gameData.child(playerStored).onDisconnect().remove();
    if (snapshot.child(opponentStored+'/name').exists() && snapshot.val()[opponentStored].name !== game[opponent].name) {
      game[opponent].name = snapshot.val()[opponentStored].name;
      console.log('Opponent name Stored:',snapshot.val()[opponentStored].name);
      console.log('Opponent name local:',game[opponent].name);
      $('.'+opponent+'-name > span').text(game[opponent].name);
    }
    // listen for opponents RPS choice
    if (snapshot.child(opponentStored).exists() && snapshot.child(playerStored).exists()) {
      if (snapshot.val()[playerStored].choice !== false  && snapshot.val()[opponentStored].choice !== false) {
        var isPlayerOne = game.curPlayer === "playerOne" ? true : false;
        game[opponent].choice = snapshot.val()[opponentStored].choice;
        console.log('Opponent choice Stored:',snapshot.val()[opponentStored].choice);
        console.log('Opponent choice local:',game[opponent].choice);
        game.getWinner(isPlayerOne);
      }
    } 
    
    // listen for score changes
    if (snapshot.child(opponentStored).exists() && snapshot.child(playerStored).exists()) {
      console.log('Opponent losses Stored:',snapshot.val()[opponentStored].losses);
      console.log('Opponent losses local:',game[opponent].losses);
      game.playerOne.wins = snapshot.val().p1.wins;
      game.playerOne.losses = snapshot.val().p1.losses;
      game.playerTwo.wins = snapshot.val().p2.wins;
      game.playerTwo.losses = snapshot.val().p2.losses;
      $('#p1-wins').text(game.playerOne.wins);
      $('#p1-losses').text(game.playerOne.losses);
      $('#p2-wins').text(game.playerTwo.wins);
      $('#p2-losses').text(game.playerTwo.losses);
    }

    // opponent Disconnected, remove score and inform user
    if (!snapshot.child(game.opponentDataKey).exists()
      && game[opponent].name !== "" 
      && game[opponent].name !== "Waiting For Player" 
      && snapshot.child(game.opponentDataKey).name !== "" 
      && snapshot.child(game.opponentDataKey).name !== "Waiting For Player") {

      var isPlayerOne = game.curPlayer === "playerOne" ? true : false;
      var opponent = game.curPlayer === "playerOne" ? "playerTwo" : "playerOne";
      $('.'+opponent+'-name > span').text("Disconnected");
      var $disconnectMsg = $('<p>').text(game[opponent].name+' has disconnected').addClass('msg-disconnect');
      $('#chat-box').append($disconnectMsg);
      game[opponent].name = ""; 
      if (isPlayerOne) {
        console.log('player one score reset')
        game.playerOne.wins = 0;
        game.playerOne.losses = 0;
        $('#p1-wins').text(game.playerOne.wins);
        $('#p1-losses').text(game.playerOne.losses);
        gameData.update({
         p1: {
            wins: game.playerOne.wins,
            losses: game.playerOne.losses,
            name: game.playerOne.name,
            choice: game.playerOne.choice
          }
        });
      } else {
        console.log('player two score reset');
        game.playerTwo.wins = 0;
        game.playerTwo.losses = 0;
        $('#p2-wins').text(game.playerTwo.wins);
        $('#p2-losses').text(game.playerTwo.losses);
        gameData.update({
         p2: {
            wins: game.playerTwo.wins,
            losses: game.playerTwo.losses,
            name: game.playerTwo.name,
            choice: game.playerTwo.choice
          }
        });
      }

    }

  // If any errors are experienced, log them to console. 
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


  // update database with player username & add Rock Paper Scissor choice
  $('.user-submit').on('click', function(){
    // return if full game or textfield is empty
    if ($('#username').val() === "" || !game.curPlayer) {
      return false;
    }  
    var playerName = $('#username').val().trim();    
    $('.'+game.curPlayer+'-name > span').text(playerName);
    var isPlayerOne = game.curPlayer === "playerOne" ? true : false;
    game[game.curPlayer].name = playerName;
    game.updatePlayerData(isPlayerOne,playerName);
    console.log("isPlayerOne", isPlayerOne);
    if (!game[game.curPlayer].choice) {
      game.displayRps(isPlayerOne);
    }
    $('.form-group').empty();
    
    var $greeting = $('<p>').text('Hi '+game[game.curPlayer].name+'! You are '+game.curPlayer+'!')
      .addClass('player-greeting');
    $('.form-group').append($greeting);
    return false;
  })
  

  // made RPS choice, update choice locally and on firebase
  $(document).on('click','.rps', function(){
    console.log('Your choice: ',$(this).data('rps'));
    var choice = $(this).data('rps');
    var isPlayerOne = game.curPlayer === "playerOne" ? true : false;
    var opponent = game.curPlayer === "playerOne" ? "playerTwo" : "playerOne";
    game[game.curPlayer].choice = choice;
    game.updatePlayerData(isPlayerOne, false , choice);
    $('.'+game.curPlayer+'-panel').html($('<p>').addClass('rps-choice').text(choice));
    if (!game[opponent].choice) {
      $('.info-well > p').text('Waiting for opponent');      
    }
  });


   // message database connection
  var messageData = database.ref("/messages");
  messageData.onDisconnect().remove();
  // listen for in new messages 
  messageData.on("value", function(snapshot) {
    
    if (snapshot.child('msg').exists()) {
      console.log(snapshot.val().user,snapshot.val().msg);
      var msgClass = snapshot.val().user === game[game.curPlayer].name ? 'msg-player' : 'msg-opponent';
      let $msg = $('<p>').text(snapshot.val().user+': '+snapshot.val().msg).addClass(msgClass);
      $('#chat-box').append($msg);  
    }
  // If any errors are experienced, log them to console. 
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  // add message to chat area
  $(document).on('click','#chat-submit', function(){
    if ($('#chat-input').val() === "") {
      return false;
    }
    if (game[game.curPlayer].name === "") {
      var $errMsg = $('<p>').text('You need a username to chat with!').addClass('msg-disconnect');
      $('#chat-box').append($errMsg);
      return false;
    }
    var message = $('#chat-input').val();
    console.log(message);
    var username = game[game.curPlayer].name === "" || game[game.curPlayer].name === "Waiting For Player" 
      ? game.curPlayer : game[game.curPlayer].name;
    messageData.update({ user: username, msg: message });
    $('#chat-input').val("");
    return false;
  });


});
