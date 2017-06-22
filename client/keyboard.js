//Método onRender do Template de Keyboard
Template.keyboard.onRendered(function(){
  var container =$(".container");
  $(".key").hide();
  $("#volume-icon").hide();
  $(".range-slider-and-description-holder").hide();
  container.addClass("animated fadeIn");
  container.attr("style","opacity:1");
  container.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(".key").show();
    $("#volume-icon").show();
    $("#volume-icon").addClass("animated zoomIn");
    $(".range-slider-and-description-holder").show();
    $(".range-slider-and-description-holder").addClass("animated zoomIn")
    $(".key").addClass("animated bounceIn");});

});


//Eventos do Template de Keyboard
Template.keyboard.events({
  //Evento que dispara ao mecher no volume
  'change .range-sound-input'(event,instance){
    if(event.target.value <=0){
      $("#volume-icon").attr('class','fa fa-volume-off');
    }
    else if (event.target.value >0 && event.target.value<80){
      $("#volume-icon").attr('class','fa fa-volume-down');
    }
    else if (event.target.value>=80){
      $("#volume-icon").attr('class','fa fa-volume-up');
    }
  },
});
