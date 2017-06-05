Router.configure({
  noRoutesTemplate:true
});
Router.route('/', function () {
  this.layout('page')
  this.render('home', {to: 'page'});
});
Router.route('/infos', function () {
  this.layout('page')
  this.render('infos', {to: 'page'});
});
Router.route('/keyboard', function () {
  this.layout('page')
  this.render('keyboard', {to: 'page'});
});
