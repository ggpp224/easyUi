/**
 * @author gp
 * @datetime 2012-9-17
 * @description index
 */

App.controller = Ambow.extend(App.Controller,{
	tplName:'index1',
	//渲染页面
	render: function(){
		Ambow.get('get.php',{a:'ccc'},function(){
			alert(222);
		});
		var me = this;
		$('#search_List').datagrid({  
			fitColumns:true,
			method:'GET',
			
			//TODO 根据情况修改 url
		    url:G_URL.list,  
		    pagination:true,
		    
		    //TODO 根据情况修改 idField
		    idField:'code',
		    
			frozenColumns:[[
                {field:'ck',checkbox:true}
			]],
		    columns:[[  
		   		{title:'Code',field:'code',width:100,sortable:true},
		        {field:'name',title:'Name',width:200},  
		        {field:'addr',title:'Address ',width:200,align:'right'},
		        {
		        	field:'_operate',
		        	title:'操作',
		        	width:200,
		        	formatter:function(value,rec){
						return '<a href="#" class="edit">编辑</a><a href="#" class="del">删除</a>';
					}
		        }
		    ]],
		    
		    toolbar:[{
					id:'btnadd',
					text:'新建',
					iconCls:'icon-add',
					handler:function(){
						me.onToolbarAddBtnClicked();
					}
				},'-',{
					id:'btncut',
					text:'删除',
					iconCls:'icon-cut',
					handler:function(){
						var recs = $('#search_List').datagrid('getChecked');
						me.onToolbarDelBtnClicked(recs);
					}
				}],
				
			onClickRow: function(idx,rec,e){
				//删除
				if(e.getTarget('.del')){
					me.onRowDelClicked(idx,rec,e);
				}else if(e.getTarget('.edit')){  //编辑
					me.onRowEditClicked(idx,rec,e);
				}
			}
		}); 
	},
	
	//监听事件
	control:function(){
		//查询表单
		$('#form_search_btn').bind('click',this.onFormSearchBtnClicked);
		
		//表单重置
		$('#form_reset_btn').bind('click',this.onFormResetBtnClicked);
		
		
	},
	
	//工具栏新增按钮事件
	onToolbarAddBtnClicked:function(){
		alert('新增');
	},
	
	//工具栏删除按钮事件
	onToolbarDelBtnClicked: function(recs){
		if(recs.length==0){
			$.messager.alert('提示','请选择一条记录');
			return;
		}
		var idList=[];
		Ambow.each(recs,function(rec){
			//TODO rec.code 要根据情况修改
			idList.push(rec.code);
		});
		$.messager.confirm('确定','确定要删除选中行记录吗?',function(r){
			if (r){
				Ambow.post({
					url:G_URL.del,
					params:idList,
					success:function(){
						$('#search_List').datagrid('reload');
					},
					error:function(){
						$.messager.alert("错误","删除失败，请稍后重试。");
					}
				});
			}
		 });
	},
	
	//查询表单
	onFormSearchBtnClicked: function(e){
		var params = Ambow.getFormData('search_form');
		$('#search_List').datagrid('load',params); 
	},
	
	//表单重置
	onFormResetBtnClicked:function(e){
		document.getElementById('search_form').reset();
	},
	
	//删除单行记录
	onRowDelClicked: function(idx,rec,e){
		//TODO rec.code要根据情况进行修改
		var params = {id: rec.code};
		 $.messager.confirm('确定','确定要删除选中行记录吗?',function(r){
			if (r){
				Ambow.post({
					url:G_URL.del,
					params:params,
					success:function(){
						$('#search_List').datagrid('reload');
					},
					error:function(){
						$.messager.alert("错误","删除失败，请稍后重试。");
					}
				});
			}
		 }); 
	},
	
	//行编辑
	onRowEditClicked: function(idx,rec,e){
		G_URL_APPEND = {
			model: rec
		}
		App.History.load("index1_edit");
	}
	
});
new App.controller();