/**
 * @author gp
 * @datetime 2012-10-30
 * @description 导航菜单的操作
 */
 
 var Menu = {
 	init : function(){
 		$(document).ready(function(){
 			Ambow.getJSON(G_URL.menu,function(data){
			 	var htm = '';
			 	Ambow.each(data,function(item,idx){
			 		var liClass = "top_menu";
		 			if(idx==0){
		 				liClass = "top_menu current";
		 			}
			 		G_MenuData["m_"+item.id]=item.children;
			 		htm += '<li><a  href="#'+item.url+'" mid="m_'+item.id+'"  class="'+liClass+'">'+item.text+'</a></li>';
			 	});
				$('#topMenu').html(htm); 
				Menu.leftMenu = $('#leftMenu');
				
				//渲染初始菜单
				var firstRec = data[0];
				Menu.renderLeft({
					data:firstRec.children,
					text:firstRec.text
				});
				
				//监听顶级菜单单击事件
				$('a.top_menu').click(function(e){
					var topItems = $('a.top_menu');
					topItems.removeClass('current');
					var me = $(this),
						id = me.attr('mid');
					me.addClass('current');
					Menu.renderLeft({
						data:G_MenuData[id],
						text:me.html()
					});
				});
				
				//监听左侧菜单
				$('li.left_menu').live('click',function(e){
					var topItems = $('li.left_menu');
					topItems.removeClass('current');
					var me = $(this);
					me.addClass('current');
				});
			});
 		
 		});
 		
 	},
 	
 	/**
 	 * 渲染左侧菜单
 	 * @param {Object} opt  data左侧菜单数据， text要显示的顶级菜单名称
 	 */
 	renderLeft: function(opt){
 		$('#nav').panel('setTitle',opt.text);
 		var lm_htm = '';
 		Ambow.each(opt.data,function(rec,idx){
 			var liClass = "left_menu";
 			if(idx==0){
 				liClass = "left_menu current";
 			}
			lm_htm += '<li class="'+liClass+'"><a href="#'+rec.url+'">'+rec.text+'</a></li>';
		});
		
		Menu.leftMenu.html(lm_htm);
 	}
 };