import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';



//LOGIN TEMPLATE
Template.login.events({
  'click .submit-login' (event){
    $(".login-holder").fadeOut();
    $(".login-loading").fadeIn();
    $.ajax({
      type:"GET",
      url:"http://localhost:80/login",
      data:{email: $("#email").val(),password: $("#password").val()},
      success:function(result){
        $(".login-holder").fadeIn();
        $(".login-loading").fadeOut();
        var toast = $(document).find(".toast");
        if(result.response=="ok"){
          CurrentUser.remove({});
          CurrentUser.insert({email: $("#email").val(),password: $("#password").val(),apikey:result.apikey});
          Router.go("/");
        }
        else if(result.response=="fail"){
          toast.html("<span> Email ou senha incorretos.</span>");
        }
        else{
          toast.html("<span> Erro de conexão com o servidor, verifique se você está conectado à Internet e se o Email e Senha estão corretos.</span>");
        }
        toast.show();
        setTimeout(function(){ toast.fadeOut(); }, 5000);
      },
      error:function(result){
        $(".login-holder").fadeIn();
        $(".login-loading").fadeOut();
      }
    });

  },
});

Template.login.onRendered(function(){
  var container =$(".container");
  $(document).find(".login-loading").hide();
  $(document).find(".toast").hide();
  container.attr("style","opacity:1");
});

//TEMPLATE app-bar
Template.appbar.onRendered(function(){
  $(".config-modal").attr('style','opacity:1');
  $(".config-modal").hide();
  $(".config-modal-option").hide();
});
Template.appbar.events({
  'click .close-modal' (event, instance){
    $(".config-modal").slideUp(function(){
      $(".config-modal-option").hide();
    });
  },
  'click .svg-logo' (event, instance){
    $(".config-modal").show();
    $(".config-modal").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(".config-modal-option").show();
    });
  }
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
