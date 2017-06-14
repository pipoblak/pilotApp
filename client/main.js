import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var firstopenHome=true;
var firstopenInfos= true;

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
  var page=$(document).find("body");
  page.hide();
  page.fadeIn();
});

//HOME ON RENDERED
Template.home.onRendered(function () {
  var configContainer=$(document).find(".config-container");
  configContainer.perfectScrollbar();
  if(firstopenHome){
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
    firstopenHome=false;
  }
  else{
    $(document).find(".container").addClass("animated fadeIn")
  }
})

//INFOS ON RENDERED
Template.infos.onRendered(function () {
  var coolerInfo = $(document).find(".cooler-info");
  var temperatureCpu= $(document).find(".temperature-icon.cpu").closest(".temperature");
  var temperatureGpu= $(document).find(".temperature-icon.gpu").closest(".temperature");
  var temperatureMb= $(document).find(".temperature-icon.motherboard").closest(".temperature");
  var temperatureChart= $(document).find(".temperature-chart");
  var percentageHolder = $(document).find(".percentage-holder");
  temperatureGpu.hide();
  temperatureMb.hide();
  temperatureChart.hide();
  percentageHolder.addClass("animated slideInUp");
  temperatureCpu.addClass("animated slideInLeft");
  temperatureCpu.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    temperatureGpu.addClass('animated bounceIn');
    temperatureGpu.show();
    temperatureMb.addClass('animated bounceIn');
    temperatureMb.show();
    temperatureMb.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      temperatureChart.addClass("animated zoomIn");
      temperatureChart.show();
    });
  });
  coolerInfo.addClass("animated bounceInDown");
  var container =$(".container");
  //firstopenInfos
  container.addClass("animated fadeIn");
  $(".cooler-input").on("change",function(event){
    if(this.value <=0){
      $(this).parents("div").closest("#cooler").find(".pc-i-cooler").css("animation","0s infinite spin-cooler");
      $(this).parents("div").closest("#cooler").find(".pc-i-cooler").css("animation-timing-function","linear");
    }
    else if(this.value >=0 && this.value < 80){
      $(this).parents("div").closest("#cooler").find(".pc-i-cooler").css("animation","5s infinite spin-cooler");
      $(this).parents("div").closest("#cooler").find(".pc-i-cooler").css("animation-timing-function","linear");
    }
    else if(this.value >=80){
      $(this).parents("div").closest("#cooler").find(".pc-i-cooler").css("animation","1s infinite spin-cooler");
      $(this).parents("div").closest("#cooler").find(".pc-i-cooler").css("animation-timing-function","linear");
    }
  })
  //CHART TEMPERATURE
  var ctx = document.getElementById("chart-temperature").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["CPU","GPU","MOTHERBOARD"],
      datasets: [{
        lineTension: 0,
        label: 'CPU',
        data: [12, 50, 45],
        borderColor: ['#37ff98'],
        backgroundColor:['rgba(0,0,0,0)'],
        borderWidth: 0},
      {
        lineTension: 0,
        label: 'GPU',
        data: [50, 70, 40],
        borderColor: ['#ff3977'],
        backgroundColor:['rgba(0,0,0,0)'],
        borderWidth: 0},
      {
        lineTension: 0,
        label: 'MOTHERBOARD',
        data: [0, 30, 100],
        borderColor: ['#2cc6de'],
        backgroundColor:['rgba(0,0,0,0)'],
        borderWidth: 0}]},
    options: {
      elements: { point: { radius: 0 } },
      scales: {
      xAxes: [{
        display:false,
        gridLines: {
          drawBorder: false,
          display:false}}],
      yAxes: [{
        display:false,
          gridLines: {
            drawBorder: false,
            display:false}}]},
      responsive:true,
      maintainAspectRatio:false,
      legend: {
        display:false},
      title: {
        display: false},
      tooltips:{
        enabled:false
      }
      }
  });
})
Template.keyboard.onRendered(function(){
  $(".range-sound-input").on("change",function(event){
    if(this.value <=0){
      $("#volume-icon").attr('class','fa fa-volume-off');
    }
    else if (this.value>0 && this.value<80){
      $("#volume-icon").attr('class','fa fa-volume-down');
    }
    else if (this.value>=80){
      $("#volume-icon").attr('class','fa fa-volume-up');
    }
  });
  var container =$(".container");
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
});
genConicProgress = function (element,atual,to,color){
  var gradient = new ConicGradient({
    stops: element.css('color') +" " +to + "%, #24242e 0%" , // required
  });
  element.css("background","url('" + gradient.blobURL + "')");
  element.css("background-size","110%");
  element.css("background-position","center");
  return;
}
