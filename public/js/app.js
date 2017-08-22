
 // external js: masonry.pkgd.js
// setTimeout(function() {
    $('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 200
    });

// }, 1000);


//AJAX Call on like
$(document).one("click", ".like", function (e) {
        if(e.target === this) return;
       var pinId = $(this).data('id');
       var likeCount = $(this).data('count')+1;
       $(this).empty().append("<p><i class=\"fa fa-thumbs-o-up fa-2x\" aria-hidden=\"true\"></i><span id=\"countLike\">&nbsp;"+ likeCount+"</span></p>");
    //   var url = 'https://shoppingcart-danish903.c9users.io/pins/add/' + pinId;
        var url = 'https://whispering-brook-21854.herokuapp.com/pins/add/' + pinId;
        $.post(url,
        {
          data: likeCount
        },
        function(data, status){
         
        });
});

//DELETE MODAL JS

$(document).on("click", ".delete", function () {
     var pinId = $(this).data('id');
     $(".modal-body #pinId").val( pinId);
   
});

//EDIT MODAL JS
$(document).on("click", ".edit", function() {
        var pinId = $(this).data('id');
        var pinImage = $(this).data('image');
        var pinDesc = $(this).data('desc');
        $(".modal-body #image").val( pinImage);
        $(".modal-body #title").val( pinDesc);
        $(".modal-body #pinIdEdit").val(pinId);
        
});
