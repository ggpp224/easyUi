/**
 * @author gp
 * @datetime 2012-10-30
 * @description 导航菜单的操作
 */
 
 var LeftNav = {
 	init : function(){
 		$(document).ready(function(){
 			Ambow.getJSON(G_URL.leftNav,function(data){
			 	var htm = '<ul>';
			 	Ambow.each(data,function(item,idx){
			 		var liClass = "left_menu";
		 			if(item.current==1){
		 				G_CURRENT_TERM = item.value;
		 				liClass = "left_menu current";
		 			}
			 		var rec_children = G_MenuData["m_"+item.id]=item.children;
			 		htm += '<li  mid="m_'+item.value+'"  class="'+liClass+'"><a  href="javascript:void(0)">'+item.name+'</a></li>';
			 		;
			 	});
			 	htm += '</ul>';
				$('#leftMenu').html(htm); 
				//监听左侧菜单
				$('li.left_menu').live('click',function(e){
					var topItems = $('li.left_menu');
					topItems.removeClass('current');
					var me = $(this);
					me.addClass('current');
					alert($());
					var val = me.attr("mid").substr(2);
					G_CURRENT_TERM = val;
				});
			});
 		
 		});
 		
 	}
 };