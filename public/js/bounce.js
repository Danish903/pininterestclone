$(document).ready(function(){

  $("a").click(function (event) {
    if ($(this).hasClass("disabled")) {
        event.preventDefault();
    }
    $(this).addClass("disabled");
});

    if (jQuery.ui) {
        setInterval( shake, 2000);
    } 
  
});

function shake () {
    $('#button').effect( "bounce", {times:4}, 1000 );
}