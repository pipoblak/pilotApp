import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

urlServer = "http://localhost:80";

//Global get current user
getCurrentUser= function(){
    return CurrentUser.find().fetch()[0];
}


//LOGIN TEMPLATE
Template.login.events({
  'click .submit-login' (event){
    $(".login-holder").fadeOut();
    $(".login-loading").fadeIn();
    $.ajax({
      type:"GET",
      url: urlServer + "/login",
      data:{email: $("#email").val(),password: $("#password").val()},
      success:function(result){
        $(".login-holder").fadeIn();
        $(".login-loading").fadeOut();
        var toast = $(document).find(".toast");
        if(result.response=="ok"){
          $(".login-loading").fadeIn();
          $.ajax({
            type:"GET",
            url: urlServer + "/user_machine",
            data:{email: $("#email").val(),api_key:result.api_key},
            success:function(result){
              CurrentUserMachine.remove({});
              _.each(result.machines[0].components, function(doc) { 
                CurrentUserMachine.insert(doc);
              })

              CurrentUser.remove({});
              CurrentUser.insert({email: $("#email").val(),password: $("#password").val(),api_key:result.api_key});
              Router.go("/");
            }});
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
    $(".config-modal").slideUp(200,function(){
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
