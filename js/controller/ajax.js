/**
 * @author gp
 * @datetime 2012-9-17
 * @description index
 */

App.controller = Ambow.extend(App.Controller,{
	tplName:'ajax',
	
	control: function(){
		$('#getBtn').click(function(){
			Ambow.get('footer.html',{a:'111',b:'222'},function(data){
				alert(data);
			});
		});
		$('#postBtn').click(function(){
			Ambow.post({
				url:G_URL.list,
				params:{
					a:'111',
					b:'222'
				},
				success:function(data){
					alert(data.total);
				},
				error:function(){
					//如果返回的不是json格式会error
					alert('error');
				}
			});
		});
		
		$('#getJsonBtn').click(function(){
			Ambow.getJSON(G_URL.list,{a:'1111'},function(data){
				alert(Ambow.encode(data));
			});
		});
		
		$('#ajaxBtn').click(function(){
				Ambow.ajax({
				url:G_URL.list,
				method:'post',
				params:{
					a:'111',
					b:'222'
				},
				success:function(data){
					alert(data.total);
				},
				error:function(){
					alert('error');
				}
			});
		});
		
	}
	
	

});
new App.controller();