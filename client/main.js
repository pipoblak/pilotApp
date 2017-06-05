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
Template.footernavbar.events({
  'click #footer-nav-item'(event, instance) {
    event.preventDefault();
    $(document).find(".selected").removeClass("selected");
    $(event.target).closest("a").addClass("selected");
    $(document).find(".page").fadeOut(function(){
      Router.go($(event.target).closest('a').attr("href"));

    });
  },
});
Template.home.onRendered(function () {
  $(document).find(".page").fadeIn();
  $(document).find(".actions-menu-holder").hide();
  $(document).find(".config-container").hide();
  $(document).find(".config-container").slideDown();
  $(document).find(".actions-menu-holder").animate({width:'toggle'},350);
})
