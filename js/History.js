/**
 * @author gp
 * @datetime 2012-10-16
 * @description 控制路由，页面跳转
 */
 
 App.History = {
 	init: function(){
 		 $.history.init(function(hash) {
 		 	App.History.navigate(hash);
         },{ unescape: "," });
 	},
 	
 	navigate: function(token){
 		if(Ambow.isEmpty(token)){
 			return;
 		}
 		
 		switch(token){
 			case 'index':
 			
 			break;
 			default:
 			 Ambow.load('js/controller/'+token+'.js');
 		}
 	},
 	
 	//改变history的hash，从页引起navigate的变化
 	load: function(token){
 		$.history.load(token);
 	}
 	
 }
  App.History.init();
  var hash = window.location.hash;
  hash = hash.substring(1);
  window.location.hash="";
 $.history.load(hash);
 var jumpTo = App.History.load;
 
	
 
