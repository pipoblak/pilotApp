import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';



//LOGIN TEMPLATE
Template.login.events({
  'click .submit-login' (event){
    user={email:$("#email").val()}
    CurrentUser.remove({});
    CurrentUser.insert(user);
    Router.go("/");
  },
});

Template.login.onRendered(function(){
  var container =$(".container");
  container.attr("style","opacity:1");
});
//FOOTER NAV-BAR EVENTS
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

//ON RENDERED FOOTERNAVBAR
Template.footernavbar.onRendered(function() {
  var path = window.location.pathname;
  var item = $(document).find("[href='"+path+"']");
  var selected = $(document).find(".selected");
  selected.removeClass("selected");
  item.addClass("selected");
});

//PAGE ON RENDERED
Template.page.onRendered(function(){
  var page=$(document).find(".page");
  page.hide();
  page.fadeIn();
});
