
//INFOS ON RENDERED
Template.infos.onRendered(function () {
  var container =$(".container");
  container.attr("style","opacity:1");
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
  $(".container").addClass("animated fadeIn");
  //firstopenInfos
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
genConicProgress = function (element,atual,to,color){
  var gradient = new ConicGradient({
    stops: element.css('color') +" " +to + "%, #24242e 0%" , // required
  });
  element.css("background","url('" + gradient.blobURL + "')");
  element.css("background-size","110%");
  element.css("background-position","center");
  return;
}
