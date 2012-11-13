/**
 * @author gp
 * @datetime 2012-9-17
 * @description index
 */

App.controller = Ambow.extend(App.Controller,{
	
	//模板文件名
	tplName:'tab',
	
	//渲染页面
	render: function(){
		$('#tab1_grid').datagrid({  
			fitColumns:true,
			method:'GET',
			
			//TODO 根据情况修改 url
		    url:G_URL.list,  
		    pagination:true,
		    
		    //TODO 根据情况修改 idField
		    idField:'code',
		
		    columns:[[  
		   		{title:'Code',field:'code',width:100,sortable:true},
		        {field:'name',title:'Name',width:200},  
		        {field:'addr',title:'Address ',width:200}
		       
		    ]]
		}); 
	}
	
});
new App.controller();