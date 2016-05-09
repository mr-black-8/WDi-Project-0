
// $( ".square" ).on("click", function() {
//   var $curSquare = $( this );
//   if($curSquare.children().css("opacity") == 0){
//     $curSquare.children().animate({
//       opacity: "1"
//     },400);
//   } else {
//     $curSquare.children().animate({
//       opacity: "0"
//     },400);
//   }
// });

var gameboard = [["","",""],["","",""],["","",""]]


$( ".square" ).on( "click", function(){
  // debugger;
  var $curSquare = $( this );
  var $curID = $curSquare.attr("id");
  var i = $curID[0];
  var j = $curID[1];

  if( gameboard[i][j] === "" ) {
    gameboard[i][j] = "1"
    return insertAxe($curID);
  } else {
    return shakeIcon($curID);
  }
});

var insertShield = function (iD) {
  var $curID = $( "#" + iD )
  $curID.children().attr("src", "images/shieldtp.png");
  $curID.children().addClass("animated bounceIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass();
  });
  return;
};

var insertAxe = function (iD) {
  var $curID = $( "#" + iD )
  $curID.children().attr("src", "images/axetp.png");
  $curID.children().addClass("animated bounceIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass();
  });
  return;
};

var shakeIcon = function (iD) {
  var $curID = $( "#" + iD )
  $curID.children().addClass("animated shake").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(this).removeClass();
  });
  return;
};

var computerMove = function () {
  // debugger;
  var i = Math.floor(Math.random() * 3)
  var j = Math.floor(Math.random() * 3)
  var curID = i.toString() + j.toString();

  if( gameboard[i][j] === "" ) {
    gameboard[i][j] = "2";
    return insertShield(curID);
  } else {
    return computerMove();
  }

};
