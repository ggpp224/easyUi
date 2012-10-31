/**
 * @author gp
 * @datetime 2012-10-16
 * @description 入口文件
 */
 

 //加载菜单
 Menu.init();
 
 App.container = $('#content');
 App.container.bind('beforeLoad',function(){
 	//alert('加载前');
 });
 App.container.bind('afterLoad',function(){
 	//alert('加载后');
 });
 var hash = window.location.hash;
 hash = hash.replace(/#/g,'');
 if(Ambow.isEmpty(hash)){
 	Ambow.load('js/controller/index1.js');
 }
 

