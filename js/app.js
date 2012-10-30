/**
 * @author gp
 * @datetime 2012-10-16
 * @description 入口文件
 */
 
 
 //加载菜单
 Ambow.getJSON(G_URL.menu,function(data){
 	var htm = '';
 	Ambow.each(data,function(item){
 		G_MenuData["m_"+item.id]=item.children;
 		htm += '<li><a href="javascript:void(0)" mid="m_'+item.id+'" class="top_menu">'+item.text+'</a></li>';
 	});
	$('#topMenu').html(htm); 
	var leftMenu = $('#leftMenu');
	$('a.top_menu').click(function(e){
		var me = $(this);
		var id = me.attr('mid');
		var m_data = G_MenuData[id];
		var lm_htm = '';
		Ambow.each(m_data,function(rec){
			lm_htm += '<li><a href="#'+rec.url+'">'+rec.text+'</a></li>';
		});
		leftMenu.html(lm_htm);
	});
 });
 
 App.container = $('#content');
 App.container.bind('beforeLoad',function(){
 	//alert('加载前');
 });
 App.container.bind('afterLoad',function(){
 	//alert('加载后');
 });
 Ambow.load('js/controller/index1.js');