/**
 * @author gp
 * @datetime 2012-10-16
 * @description 入口文件
 */
 

 //加载菜单
 LeftNav.init();
 Menu.init();
 
 
  /**
  * @param {Object} config
  * {
  * 	logoPath:'北京图片路径',
  * 	logoAlt:'图片提示',
  * 	userName:'用户名',
  * 	backText:'返回文字显示',
  * 	onBackClicked:function(e){
  * 		//点返回时处理事件
  * 		//window.location.href="aa.html";
  * 	},
  * 	onLogoutClicked:function(e){
  * 		//点退出时处理事件
  * 	}
  * }
  */
 new Header({
 	logoPath:'http://localhost/easyUi/js/lib/eui/themes/default/images/layout_arrows.png',
   	logoAlt:'图片提示',
   	backText:'返回文字显示',
   	userName:'用户名',
   	onBackClicked:function(e){
   		window.location.href="www.baidu.com";
   	},
   	onLogoutClicked:function(e){
   		//点退出时处理事件
   		alert('退出');
   	}
 });
 
 App.container = $('#content');
 App.container.bind('beforeLoad',function(){
 	//alert('加载前');
 });
 App.container.bind('afterLoad',function(){
 	//alert('加载后');
 });
 var hash = window.location.hash;
 hash = hash.replace(/#/g,'');
 
 //如果hash为空
 if(Ambow.isEmpty(hash)){
 	Ambow.load('js/controller/index1.js');
 }
 

