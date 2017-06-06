import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });
//
// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });
//
var firstopen=true;
Template.footernavbar.events({
  'click #footer-nav-item'(event, instance) {
    event.preventDefault();
    var target = $(event.target);
    var selected = $(document).find(".selected");
    selected.removeClass("selected");

    if(target.prop("tagName") =="I"){
      target = target.parents("a").closest("a");
    }
    target.closest("a").addClass("selected");
    var container =$(".container");
    var slideDirection;
    if(target.attr("data-order") > selected.attr("data-order")){
      slideDirection="Left";
      container.addClass("animated slideOut" + slideDirection);
    }
    else if(target.attr("data-order") < selected.attr("data-order")){
      slideDirection="Right";
      container.addClass("animated slideOut" + slideDirection);
    }
    else{

    }

    container.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      Router.go($(event.target).closest('a').attr("href"));
    });
  },
});
Template.page.onRendered(function(){
  var page=$(document).find("body");

});
Template.home.onRendered(function () {
  if(firstopen){
    var configContainer=$(document).find(".config-container");
    var machineTitle= $(document).find(".machine-title span");
    var actionsMenu= $(document).find(".actions-holder")
    var actionTitle= $(document).find(".title-holder")
    machineTitle.hide();
    actionsMenu.hide();
    actionTitle.hide();
    configContainer.addClass('animated bounceInDown');
    actionTitle.addClass('animated slideInUp');
    actionTitle.show()
    configContainer.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      machineTitle.addClass('animated bounceIn');
      actionsMenu.addClass('animated slideInLeft');
      machineTitle.show();
      actionsMenu.show();
    });
    firstopen=false;
  }
  else{
    $(document).find(".container").addClass("animated fadeIn")
  }
})
