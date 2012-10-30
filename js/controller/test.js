/**
 * @author gp
 * @datetime 2012-9-17
 * @description index
 */

App.controller = Ambow.extend(App.SearchList,{
	
	//模板文件名
	tplName:'test',
	
	//编辑页文件名
	editName:'index1_edit',
	
	//新建页文件名
	createName:'index1_edit',
	
	btnsConfig:{
		createText:'新建用户',
		deleteText: '删除用户',
		//hasCreate:false,
		hasDelete:false
	},

	//编译模板需要的数据,没有可以不写，或者配{},不能乱写
	tplData:{
		code:'age',
		ageText:'模板年龄',
		
		sex:'sex',
		sexText:'模板性别'
		
		},
	
	//批量删除的url,POST 参数:idList:[...],
	batchDelUrl:G_URL.del,
	
	//删除url，POST, 参数: id:'...'
	delUrl:G_URL.del,
	
	//操作提示文字
	msg:{
		delConfirm:'确定要删除选中行记录吗?',
		delError:"删除失败，请稍后重试。",
		batchDelComfirm:'确定要删除选中行记录吗?',
		batchDelError:'删除失败，请稍后重试。'
	},
	
	
	
	gridConfig:{
		//grid id必须
		id:'search_List',
		
		fitColumns:true,
		method:'GET',
		
		//TODO 根据情况修改 url
	    url:G_URL.list,  
	    
	    //分页配置
	    pagination:true,
	    
	    //TODO 根据情况修改 idField
	    idField:'code',
	    
		frozenColumns:[[
            {field:'ck',checkbox:true}
		]],
	    columns:[[  
	   		{field:'code',title:'Code',width:100,sortable:true},
	        {
	        	field:'name',
	        	title:'Name',
	        	width:200,
	        	formatter:function(value,rec){
	        		return '<span class="name">名称</span>';
	        	}
	        },  
	        {field:'addr',title:'Address ',width:200,align:'right'},
	        {
	        	field:'_operate',
	        	title:'操作',
	        	width:200,
	        	formatter:function(value,rec){
	        		var tpl = new Ambow.XTemplate(
	        			'<a href="javascript:void(0)" class="edit">编辑</a>',
	        			'<tpl if="G_HASWRITE==true">',
	        			'	<a href="javascript:void(0)" class="del">删除</a>',
	        			'</tpl>'
	        		);
					return tpl.apply({});
				}
	        }
	    ]],
	    
	    //额外自定义工具栏按钮，没有可以不写
	    toolBarExtra:[
	    	{
	    		id:'btntest',
				text:'测试',
				handler:function(){
					alert('ceshi btn');
				}
	    	},
	    	{
	    		id:'btntest2',
				text:'测试2',
				handler:function(){
					App.History.load('test2');
				}
	    	}
	    ]
	},
	
	//重写render,control时需调用父类方法 
	control: function(){
		 App.controller.superclass.control.call(this);
	},
	
	
	//处理自定义点击行，没有可以不写
	onRowClicked:function(idx,rec,e){
		if(e.getTarget('.name')){
			alert('index is :'+idx);
		}
	}
		
	
});
new App.controller();