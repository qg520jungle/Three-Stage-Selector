//预设初显示注册或登陆
var sign='signin';
function initShow(sign){
	$('.tab').removeClass('z-act');
	$('.tab[sign='+sign+']').addClass('z-act');
	$('.tab-box').hide();
	$('.tab-box['+sign+']').show();
}
initShow(sign);
//注册登陆切换
$('.tab').on('click',function(event) {
	var sign=$(this).attr('sign');
	if($('.tab-box['+sign+']:visible').length>0){return false}
	initShow(sign);
});
//注册野狗
var config = {
  authDomain: "qg-mall.wilddog.com",
  syncURL: "https://qg-mall.wilddogio.com"
};
wilddog.initializeApp(config);
//注册用户==>wilddog
function createUser(email,pwd){
	wilddog.auth().createUserWithEmailAndPassword(email, pwd).then(function (user) {
	     console.info("user created.", user);
	 }).catch(function (err, more) { 
	     console.info("create user failed.", err, more);
	 });
}
$('.j-signin').on('click',function(){
	if(checkAll()){}else{return}
	var email=$('#nHost').val();
	var pwd=$('#repsw').val();
	createUser(email,pwd);
})
//登陆用户from wilddog
function logIn(host,pwd){
	wilddog.auth().signInWithEmailAndPassword(host, pwd).then(function(res){
     console.log(res);
 }).catch(function (error) {
     // Handle Errors here.
     console.log(error)
 });
}
$('.j-login').on('click',function(){
	if(checkAllLogin()){}else{return}
	var host=$('#host').val();
	var pwd=$('#password').val();
	logIn(host,pwd);
})