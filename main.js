// Gameboard array (x,y) co-ords from top left match array index.
var gameboard = [["","",""],["","",""],["","",""]]

//Animate Shield image to square based on id paramater given
var insertShield = function (iD) {
  var $curID = $( "#" + iD )
  $curID.children().attr("src", "images/shieldtp.png");
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

//Easy setting computer move - random generation of (x,y), Loops until empty square is selected, add 'o' at gameboard[x][y], calls insertShield, calls winCheck
var computerMove = function () {
  var x = Math.floor(Math.random() * 3)
  var y = Math.floor(Math.random() * 3)
  var curID = x.toString() + y.toString();

  if( gameboard[x][y] === "" ) {
    gameboard[x][y] = "o";
    insertShield(curID);
  } else {
    computerMove();
    return;
  }

  if(winCheck(x,y)) {
    swal("Computer Wins!");
    resetBoard();
    return;
  } else {
    return;
  }

};

//Player move, called when square is clicked. id of 'this' square is converted to (x,y), add 'x' at gameboard[x][y], calls insertCross
var playerMove = function () {
  var $curSquare = $( this );
  var $curID = $curSquare.attr("id");
  var x = $curID[0];
  var y = $curID[1];

  if( gameboard[x][y] === "" ) {
    gameboard[x][y] = "x"
    insertCross($curID);
  } else {
    shakeIcon($curID);
    return;
  }

  if(winCheck(x,y)) {
    alert("Player Wins!");
    // swal("Player Wins!");
    resetBoard();
  } else {
    window.setTimeout( computerMove, 200 );
  }

};

// check each line for win condition.
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
