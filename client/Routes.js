Router.configure({
  noRoutesTemplate:true
});

CurrentUser = new Ground.Collection('CurrentUser', { connection: null });
CurrentUserMachine = new Ground.Collection('CurrentUserMachine', { connection: null });

Router.route('/', function () {
  if (verifyLogin()){
    this.layout('page')
    this.render('home', {to: 'page'});
  }
});
Router.route('/infos', function () {
  this.layout('page')
  this.render('infos', {to: 'page'});
});
Router.route('/keyboard', function () {
  this.layout('page')
  this.render('keyboard', {to: 'page'});
});

Router.route('/login', function () {
  if (verifyLogin()){
    Router.go("/");}
  else{
    this.layout('login')
  }

});

Router.route('/logout', function () {
  CurrentUser.remove({});
  Router.go('login')
});
//Veririfica se há um usuário conectado
function verifyLogin(){
  if(CurrentUser.find({}).fetch()<=0){
    Router.go("login");
    return false;
  }
  else{
    return true;
  }
}
