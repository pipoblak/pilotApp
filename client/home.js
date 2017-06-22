var firstopenHome=true;
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
  //Retorna os componentes da máquina do current user
  component(){
    return CurrentUserMachine.find({}).fetch();
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
  //recupera o usuário atual
  var user = getCurrentUser();
  //Array para guardar as Orders de Computadores
  var arrayOrdersPc=[];
  //Async request de orders do usuário
  $.ajax({
    type:"GET",
    url:urlServer + "/orders",
    data:{email:user.email, api_key: user.api_key},
    success: function(result){
      $(".loading-tip").html("Buscando Informações.");
      //Tratando as orders para pegar só computadores
      for(i=0; i< result.orders.length; i++){
        //Se a order foi entregada  PRECISA DO VERIFICADOR PRA VER SE É UMA MAQUINA COM MODULO
        if(result.orders[i].production_status_code==3){
          //Verifica se  a order é um PC e adiciona ao arrayOrdersPc
          $.ajax({
            async: false,
            type:"GET",
            url:urlServer + "/product",
            data:{product_id:result.orders[i].items[0].product_id, api_key: user.api_key},
            success:function(result2){
              if(result2.product.category_name == "Processador"){
                arrayOrdersPc.push(result.orders[i]);
              }
            }
          });
        }
      }
      //Se há Computadores
      if(arrayOrdersPc.length>=1){
        for(i=0; i< arrayOrdersPc.length; i++){
          $.ajax({
            async: false,
            type:"GET",
            url:urlServer + "/pc_kit",
            data:{order_id:arrayOrdersPc[i].id, api_key: user.api_key},
            success:function(result2){
              arrayOrdersPc[i].name = result2.response.kits[0].name;
            }
          });
        }
        console.log(arrayOrdersPc);
      }
      else{
        $(".loading-holder").hide();
      }
    }
  });

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
