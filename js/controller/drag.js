/**
 * @author gp
 * @datetime 2012-9-17
 * @description index
 */

App.controller = Ambow.extend(App.Controller,{
	tplName:'drag',
	
	render: function(){
		$('#list1').datagrid({  
			fitColumns:true,
			method:'GET',
			//TODO 根据情况修改 url
		    url:G_URL.list,  
		    //TODO 根据情况修改 idField
		    idField:'code',
		    columns:[[  		   
		        {field:'name',title:'Name',width:200},
		        {field:'addr',title:'Address ',width:200,align:'right'}
		    ]],

			onLoadSuccess:function(data){
				$('#list1_content tr.datagrid-row').draggable({
					revert:true,
					proxy:'clone',
					onStartDrag:function(){
						$(this).draggable('proxy').css('z-index',9999);
					},
					onStopDrag:function(){
						
					}
				});
				
				$('#list2_content').droppable({  
					accept:'#list1_content tr', 
	                onDragEnter:function(e,source){  
	                    $(source).draggable('options').cursor='auto';  
	                },  
	                onDragLeave:function(e,source){  
	                   // $(source).draggable('options').cursor='not-allowed';  
	                },  
	                onDrop:function(e,source){  
	                	var me=$(this);
	                	var target=$(source);
	                	var idx = parseInt(target.attr('datagrid-row-index'));
	                	var rec = $('#list1').datagrid('getRows')[idx];
	                	$('#list1').datagrid('deleteRow',idx);
	                	$('#list2').datagrid('appendRow',rec);
	                	$('#list2_content tr.datagrid-row').draggable({
							revert:true,
							proxy:'clone',
							onStartDrag:function(){
								$(this).draggable('proxy').css('z-index',9999);
							},
							onStopDrag:function(){
								
							}
						});
	                }  
	            });  
			}
		}); 
		
		$('#list2').datagrid({  
			fitColumns:true,
			method:'GET',
			//TODO 根据情况修改 url
		    url:G_URL.list,  
		    //TODO 根据情况修改 idField
		    idField:'code',
		    columns:[[  		   
		        {field:'name',title:'Name',width:200}
		    ]],
			onClickRow: function(idx,rec,e){
				//删除
				if(e.getTarget('.del')){
					me.onRowDelClicked(idx,rec,e);
				}else if(e.getTarget('.edit')){  //编辑
					me.onRowEditClicked(idx,rec,e);
				}
			},
			onLoadSuccess:function(data){
				$('#list2_content tr.datagrid-row').draggable({
					revert:true,
					proxy:'clone',
					onStartDrag:function(){
						$(this).draggable('proxy').css('z-index',9999);
					},
					onStopDrag:function(){
						
					}
				});
				
				$('#list1_content').droppable({  
					accept:'#list2_content tr', 
	                onDragEnter:function(e,source){  
	                    $(source).draggable('options').cursor='auto';  
	                },  
	                onDragLeave:function(e,source){  
	                  //  $(source).draggable('options').cursor='not-allowed';  
	                },  
	                onDrop:function(e,source){  
	                	var me=$(this);
	                	var target=$(source);
	                	var idx = parseInt(target.attr('datagrid-row-index'));
	                	var rec = $('#list2').datagrid('getRows')[idx];
	                	$('#list2').datagrid('deleteRow',idx);
	                	$('#list1').datagrid('appendRow',rec);
	                	$('#list1_content tr.datagrid-row').draggable({
							revert:true,
							proxy:'clone',
							onStartDrag:function(){
								$(this).draggable('proxy').css('z-index',9999);
							},
							onStopDrag:function(){
								
							}
						});
	                }  
	            });  
			}
		}); 
		
		
		
	},
	control: function(){
		
	}
	
	

});
new App.controller();