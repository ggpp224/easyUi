/**
 * @author gp
 * @datetime 2012-9-17
 * @description index
 */

App.controller = Ambow.extend(App.Controller,{
	tplName:'index1_edit',
	//模板数据
	tplData:G_URL_APPEND.model,
	
	
	//渲染页面
	render: function(){
		
		//取出编辑时传递过来的参数
		if(!this.params){
			this.params = {};
			Ambow.apply(this.params,G_URL_APPEND);
		}
		

	},
	
	init: function(){
		var me = this;
		//请求数据然后编译渲染模板
		Ambow.getJSON('model.json',function(data){
			me.reRender(data);
		});
	},
	
	//监听事件
	control:function(){
		//查询表单
		$('#form_save_btn').bind('click',{scope:this},this.onFormSaveBtnClicked);
		
		//表单重置
		$('#form_reset_btn').bind('click',{scope:this},this.onFormResetBtnClicked);
		
		//返回
		$('#form_back_btn').bind('click',{scope:this},this.onFormBackBtnClicked);
		
	},
	
	
	//返回
	onFormBackBtnClicked: function(e){
		var scope = e.data.scope;
		App.History.load(scope.params.backName);
	},
	
	//提交表单
	onFormSaveBtnClicked: function(e){
		if(!$('#search_form').form('validate')){
			return false;
		}
		alert(1);
		var params = Ambow.getFormData('search_form');
		Ambow.post({
			url:'submit.php',
			params:params,
			success:function(){
				alert('suc');
			},
			error: function(){
				alert('error');
			}
		});
	},
	
	//表单重置
	onFormResetBtnClicked:function(e){
		document.getElementById('search_form').reset();
	}
	
	
	
});
new App.controller();