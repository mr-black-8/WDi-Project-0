
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

var toggleIcon = function () {
  var $curSquare = $( this );

  if($curSquare.children().attr("class") === undefined || $curSquare.children().attr("class") === ""){
    $curSquare.children().addClass("animated bounceIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass();
    });
  } else {
    $curSquare.children().addClass("animated bounceOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass();
    });
  }
};

$( ".square" ).on( "click", toggleIcon );
