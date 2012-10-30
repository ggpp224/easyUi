/**
 * @author gp
 * @datetime 2012-9-17
 * @description SearchList
 */

App.SearchList = Ambow.extend(App.Controller,{
	
	constructor:function(config){
		if(!this.btnsConfig){
			this.btnsConfig={}
			
		}
		Ambow.applyIf(this.btnsConfig,{
				createText:'新建',
				deleteText: '删除',
				hasCreate:true,
				hasDelete:true
		});
		
 		App.SearchList.superclass.constructor.call(this);
 	},

	render: function(){
		var me = this;
		var opt = me.opt||{};
		var cfg = {  
			fitColumns:true,
			method:opt.method||'GET',
			
			//TODO 根据情况修改 url
		    url:opt.url,  
		    pagination:opt.pagination||false,
		    
		    //TODO 根据情况修改 idField
		    idField:opt.idField,
		    
			frozenColumns:opt.frozenColumns||[[]],
		    columns:opt.columns||[[]],		    
		    
				
			toolbar:[],
				
			onClickRow: function(idx,rec,e){
				//删除
				if(e.getTarget('.del')){
					me.onRowDelClicked(idx,rec,e);
				}else if(e.getTarget('.edit')){  //编辑
					me.onRowEditClicked(idx,rec,e);
				}
				
				me.onRowClicked(idx,rec,e);
			}
		};
		
		var btnsCfg = this.btnsConfig;
		var tbar = cfg.toolbar;
		if(btnsCfg.hasCreate){
			tbar.push({
					id:'btnadd',
					text:btnsCfg.createText,
					iconCls:'icon-add',
					handler:function(){
						me.onToolbarAddBtnClicked();
					}
			});
		}
		
		if(btnsCfg.hasDelete){
			tbar.push('-');
			tbar.push({
					id:'btncut',
					text:btnsCfg.deleteText,
					iconCls:'icon-cut',
					handler:function(){
						var recs = $('#search_List').datagrid('getChecked');
						me.onToolbarDelBtnClicked(recs);
					}
			});
		}
		
		
		if(this.gridConfig.toolBarExtra){
			cfg.toolbar = cfg.toolbar.concat(this.gridConfig.toolBarExtra);
			delete this.gridConfig.toolBarExtra;
		}
		
		Ambow.apply(cfg,this.gridConfig||{});
		
		Ambow.createGrid(cfg);
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
		this.add();
	},
	
	//工具栏删除按钮事件
	onToolbarDelBtnClicked: function(recs){
		var me = this;
		if(recs.length==0){
			$.messager.alert('提示','请选择一条记录');
			return;
		}
		var idList=[];
		Ambow.each(recs,function(rec){
			//TODO rec.code 要根据情况修改
			idList.push(rec.code);
		});
		$.messager.confirm('确定',me.msg.delConfirm,function(r){
			if (r){
				Ambow.post({
					url:me.batchDelUrl,
					params:idList,
					success:function(){
						$('#search_List').datagrid('reload');
					},
					error:function(){
						$.messager.alert("错误",me.msg.delError);
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
		var me= this;
		//TODO rec.code要根据情况进行修改
		var params = {id: rec.code};
		 $.messager.confirm('确定',me.msg.batchDelComfirm,function(r){
			if (r){
				Ambow.post({
					url:me.delUrl,
					params:params,
					success:function(){
						$('#search_List').datagrid('reload');
					},
					error:function(){
						$.messager.alert("错误",me.msg.batchDelError);
					}
				});
			}
		 }); 
	},
	
	//行编辑
	onRowEditClicked: function(idx,rec,e){
		G_URL_APPEND = {
			model: rec,
			backName:this.tplName
		}
		App.History.load(this.editName);
		return false;
	},
	
	onRowClicked: function(idx,rec,e){
		
	},
	
	add: function(){
		App.History.load(this.createName);
	}

	
});
