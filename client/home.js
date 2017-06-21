var firstopenHome=true;

//HOME ON RENDERED
Template.home.component = function(){
  return CurrentUserMachine.find({}).fetch();
}

Template.home.helpers({
  getFlexDirection(index){
    if((index%2)==0){
      return "flex-end flex-just-end";
    }
    else{
      return "flex-start flex-just-start";
    }
  },
});

Template.home.onRendered(function () {
  $(".container").attr("style","opacity:1");
  $(".container").addClass("animated fadeIn");
  $(".loading-holder").attr("style","opacity:1");
  var configContainer=$(document).find(".config-container");

  configContainer.perfectScrollbar();
  if(firstopenHome){
    configContainer.hide();
    var machineTitle= $(document).find(".machine-title span");
    var actionsMenu= $(document).find(".actions-holder")
    var actionTitle= $(document).find(".title-holder")
    machineTitle.hide();
    actionsMenu.hide();
    actionTitle.hide();
    configContainer.addClass('animated bounceInDown');
    configContainer.show();
    actionTitle.addClass('animated slideInUp');
    actionTitle.show()
    configContainer.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      machineTitle.addClass('animated bounceIn');
      actionsMenu.addClass('animated slideInLeft');
      machineTitle.show();
      actionsMenu.show();
    });
    firstopenHome=false;
  }
  else{
  }

})
