Template.keyboard.onRendered(function(){
  var container =$(".container");
  container.attr("style","opacity:1");

  //firstopenInfos
  $(".key").hide();
  $("#volume-icon").hide();
  $(".range-slider-and-description-holder").hide();
  container.addClass("animated fadeIn");
  container.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $(".key").show();
    $("#volume-icon").show();
    $("#volume-icon").addClass("animated zoomIn");
    $(".range-slider-and-description-holder").show();
    $(".range-slider-and-description-holder").addClass("animated zoomIn")
    $(".key").addClass("animated bounceIn");});
    $(".container").addClass("animated fadeIn");
});


//EVENTS
Template.keyboard.events({
  'change .range-sound-input'(event,instance){
    range=$(document).find(".range-sound-input")[0];
    console.log(range.value);
    if(range.value <=0){
      $("#volume-icon").attr('class','fa fa-volume-off');
    }
    else if (range.value>0 && range.value<80){
      $("#volume-icon").attr('class','fa fa-volume-down');
    }
    else if (range.value>=80){
      $("#volume-icon").attr('class','fa fa-volume-up');
    }
  },
});
