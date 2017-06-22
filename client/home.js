var firstopenHome=true;

//Retorna os componentes da máquina do current user
Template.home.component = function(){
  return CurrentUserMachine.find({}).fetch();
}

//Helpers do template HOME
Template.home.helpers({
  //Metodo pra poder fazer o zig zag de direção dos componentes da maquina no CSS
  getFlexDirection(index){
    if((index%2)==0){
      return "flex-end flex-just-end";
    }
    else{
      return "flex-start flex-just-start";
    }
  },
});

//Método de On Render do template HOME que é chamado sempre quando o template é renderizado
Template.home.onRendered(function () {
  //Dando opacidade 1 para o container evitando falha de animações
  $(".container").attr("style","opacity:1");
  //Animação de entrada do container
  $(".container").addClass("animated fadeIn");
  //Mostra a loading bar
  $(".loading-holder").attr("style","opacity:1");

  //Recupera o container de configurações
  var configContainer=$(document).find(".config-container");
  //PerfectScrollbar callback
  configContainer.perfectScrollbar();

  //Se é a primeira vez que este formulário ele irá executar uma sequencia de animações
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
})
