$(document).ready(function(){
    if (jQuery.ui) {
        setInterval( shake, 2000);
    } 
  
});

function shake () {
    $('#button').effect( "bounce", {times:4}, 1000 );
}