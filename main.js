// Gameboard array - (x,y) co-ords from top left match array index.
var gameboard = [["","",""],["","",""],["","",""]]

var playerOne = {
  name: "Player 1",
  human: true,
  faction: "Christian",
  icon: "x",
  iconSrc: "images/crosstp.png",
  score: 0
};

var playerTwo = {
  name: "Player 2",
  human: true,
  faction: "Norse",
  icon: "o",
  iconSrc: "images/shieldtp.png",
  score: 0
};

var curPlayer = playerOne;

//Animate Shield image to square based on id paramater given
var insertIcon = function (iD) {
  var $curID = $( "#" + iD )
  $curID.children().attr("src", curPlayer.iconSrc);
  $curID.children().addClass("animated bounceIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass();
  });
  return;
};

//Animate Cross image to square based on id paramater given
var insertCross = function (iD) {
  var $curID = $( "#" + iD )
  $curID.children().attr("src", "images/crosstp.png");
  $curID.children().addClass("animated bounceIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass();
  });
  return;
};

//Shake animation based in id paramater given (call if user clicks on occupyed square)
var shakeIcon = function (iD) {
  var $curID = $( "#" + iD )
  $curID.children().addClass("animated shake").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass();
  });
  return;
};

//Easy setting computer move - random generation of (x,y), Loops until empty square is selected, add curPlayer icon at gameboard[x][y], calls insertIcon, calls winCheck & tieCheck, passes current player back to playerOne
var computerMove = function () {
  // var x = Math.floor(Math.random() * 3)
  // var y = Math.floor(Math.random() * 3)
  // var curID = x.toString() + y.toString();
  var curID = computerMoveHard();
  var x = parseInt(curID[0]);
  var y = parseInt(curID[1]);

  if( gameboard[x][y] === "" ) {
    gameboard[x][y] = curPlayer.icon;
    insertIcon(curID);
  } else {
    computerMove();
  }

  if(winCheck(x,y)) {
    swal({title: "Computer Wins!"},resetBoard);
  } else if(tieCheck()) {
    swal({title: "It's a Tie!"},resetBoard);
  }
  curPlayer = playerOne
};

//Player move, called when square is clicked. id of 'this' square is converted to (x,y), adds curent player icon at gameboard[x][y], calls insertIcon, calls winCheck & tieCheck.
var playerMove = function () {
  var $curSquare = $( this );
  var $curID = $curSquare.attr("id");
  var x = $curID[0];
  var y = $curID[1];

  if( gameboard[x][y] === "" ) {
    gameboard[x][y] = curPlayer.icon
    insertIcon($curID);
  } else {
    shakeIcon($curID);
    return;
  }

  if(winCheck(x,y)) {
    swal({title: curPlayer.name + " Wins!"},resetBoard);
  } else if(tieCheck()) {
    swal({title: "It's a Tie!"},resetBoard);
  } else {
    if(curPlayer === playerOne) {
      curPlayer = playerTwo;
    } else {
      curPlayer = playerOne;
    }
    if(!curPlayer.human){
      window.setTimeout( computerMove, 200 );
    }
  }
};

// check each line for win condition, based on most recent placement of icon (computer || player).
var winCheck = function(x,y) {

  var horString = ""
  var vertString = ""
  var diaString = ""
  var revDiaString = ""

  //Check [x][i] (horizontal line)
  for( var i = 0; i < gameboard.length; i++ ) {
    var j = gameboard[x][i];
    horString += j;
  }

  //Check [i][y] (vertical line)
  for( var i = 0; i < gameboard.length; i++ ) {
    var j = gameboard[i][y]
    vertString += j;
  }

  //Check [i][i] (diagonal line)
  for( var i = 0; i < gameboard.length; i++ ) {
    var j = gameboard[i][i];
    diaString += j;
  }

  //Check [i][.length - 1 - i] (rev. diagonal line)
  for( var i = 0; i < gameboard.length; i++ ) {
    var n = gameboard.length;
    var j = gameboard[i][n - 1 - i];
    revDiaString += j;
  }

  if( (horString === "xxx" || vertString === "xxx" ) || (horString === "ooo" || vertString === "ooo" ) ) {
    return true;
  } else if( (diaString === "xxx" || revDiaString === "xxx" ) || (diaString === "ooo" || revDiaString === "ooo" ) ){
    return true;
  } else {
    return false;
  }
};

// Check gameboard array, if all locations are occupied, return true. Only called after win check.
var tieCheck = function() {
  for( var i = 0; i < gameboard.length; i++ ){
    for( var j = 0; j < gameboard[i].length; j ++ ) {
      if( gameboard[i][j] === "" ) {
        return false
      }
    }
  }
  return true;
};

//Clear gameboard array and img src from .square divs.
var resetBoard = function() {

  // set all values in gameboard array to ""
  for( var i = 0; i < gameboard.length; i++ ){
    for( var j = 0; j < gameboard[i].length; j ++ ) {
      gameboard[i][j] = "";
    }
  }

  //set all src attrbutes to ""
  $( ".square" ).each( function(i) {
    $( this ).children().attr("src", "");
    // $( this ).children().addClass("animated fadeOutUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    //   $( this ).removeClass();
    //   $( this ).children().attr("src", "");
    // });
  });
};

$( ".square" ).on( "click", playerMove );

// Hardmode computer move...
// If any win line has two of the same, play there (functions as a block or win)
// If center is empty play there
// If center is taken play a corner

var computerMoveHard = function() {
  //Loop horizontal lines, if line conatins two of the same icon, return empty square on that line
  for(var i = 0; i < 3; i++){
    var checkStr = "";
    var iD = "";
    for(var j = 0; j < 3; j++){
      checkStr += gameboard[i][j];
      if(gameboard[i][j] === "") {
        iD = "" + i + j;
      }
    }
    if(checkStr.length === 2 && checkStr[0] === checkStr[1]) {
      return iD;
    }
  }

  //Loop Vertical lines, if line conatins two of the same icon, return empty square on that line
  for(var i = 0; i < 3; i++){
    var checkStr = "";
    var iD = "";
    for(var j = 0; j < 3; j++){
      checkStr += gameboard[j][i];
      if(gameboard[j][i] === "") {
        iD = "" + j + i;
      }
    }
    if(checkStr.length === 2 && checkStr[0] === checkStr[1]) {
      return iD;
    }
  }

  //Check diagonals for two of same icon, if true return empty square of that line
  var diaStr = "";
  var iD = "";
  for(var i = 0; i < 3; i++){
    diaStr += gameboard[i][i];
    if(gameboard[i][i] === "") {
      iD = "" + i + i;
    }
  }
  if(diaStr.length === 2 && diaStr[0] === diaStr[1]) {
    return iD;
  }

  var diaStr = "";
  var iD = "";
  for( var i = 0; i < 3; i++ ) {
    var n = (3 - 1 - i)
    diaStr += gameboard[i][n];
    if(gameboard[i][n] === ""){
      iD = "" + i + n;
    }
  }
  if(diaStr.length === 2 && diaStr[0] === diaStr[1]) {
    return iD;
  }

  //return center if empty (always play center if going first)
  if(gameboard[1][1] === ""){
    return "11";
  }

  // Return random if none of the above passe
  var x = Math.floor(Math.random() * 3)
  var y = Math.floor(Math.random() * 3)
  var curID = x.toString() + y.toString();
  return curID;

};


var menuSplash = function() {
  var $bgDiv = $( "<div></div>" )
  var $menuDiv = $( "<div></div>" )

  $bgDiv.attr("class", "menuBG");
  $menuDiv.attr("class", "menu");

  $( ".flexContainer" ).css("-webkit-filter", "blur(5px)")
  $( "body" ).prepend($bgDiv);
  $( ".menuBG" ).prepend($menuDiv);

};
