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
		 				//liClass = "top_menu current";
		 			}
			 		var rec_children = G_MenuData["m_"+item.id]=item.children;
			 		htm += '<li><a  href="#'+item.url+'" mid="m_'+item.id+'"  class="'+liClass+'">'+item.text+'</a>';
			 		htm += '<ul>';
			 		Ambow.each(rec_children,function(rec,i){
			 			
			 			htm += '<li><a class="top_menu_item" href="#'+rec.url+'">'+rec.text+'</a>';
			 					var threeChildren=rec.children,len=0;
			 					if(threeChildren&&threeChildren.length>0){
			 						htm += '<ul>'
				 					Ambow.each(threeChildren,function(r,j){
				 						htm += '<li><a  href="#'+r.url+'" mid="m_'+r.id+'"  class="'+liClass+'">'+r.text+'</a></li>';
				 					});
				 					htm += '</ul>';
			 					}
			 			htm += '</li>';
			 			
			 		});
			 		htm += '</ul>';
			 		htm +='</li>';
			 	});
				$('#topMenu').html(htm); 
				ddsmoothmenu.init({
					mainmenuid: "smoothmenu1", 
					orientation: 'h', 
					classname: 'ddsmoothmenu',
					//customtheme: ["#1c5a80", "#000000"],
					contentsource: "markup"
				})
				
				
				//渲染初始菜单
				var firstRec = data[0];
				
				
				//监听顶级菜单单击事件
				$('a.top_menu').click(function(e){
					var topItems = $('a.top_menu');
					topItems.removeClass('current');
					var me = $(this),
						id = me.attr('mid');
					
				});
				
				//监听顶级菜单item项单击事件
				$('a.top_menu_item').click(function(e){
					$(this).closest('ul').hide();
					
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