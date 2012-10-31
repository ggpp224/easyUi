/**
 * @author gp
 * @datetime 2012-9-17
 * @description Controller
 */
 
 App.Controller = Ambow.extend(Object,{
 	constructor:function(config){
 		
 		this.required();
 		
 		//模板数据
 		var tplData = this.tplData||{};
 		
 		var me = this;
 		if(!this.tplName){
 			this.tplName=config.tplName;
 		}
 		//请求处理模板
 		$.get(G_ROOT+'htm/'+this.tplName+'.html',function(result){
 			me.tpl = new Ambow.XTemplate(result);
			me.renderContainer(tplData);
	 		G_URL_APPEND={};
		});
 		
 		
 		
 	},
 	
 	renderContainer: function(data,hasInit){
 		var me = this;
 		var htm =  me.tpl.apply(data);
			
			//渲染模板
			App.container.html(htm)
			//渲染面包屑
			me.renderCurmbs();
			
			$.parser.parse();
			
			//处理一些需js添加的dom元素
	 		me.render();
			
	 		if(!hasInit){
	 			me.init();
	 		}
	 		
	 		//this.renderFooter();
	 		
	 		
	 		//绑定一些事件
	 		me.control();
	 		
	 		
 	},
 	
 	reRender: function(data){
 		this.renderContainer(data,true);
 	},
 	
 	//页面渲染,需重写
 	render: function(){
 		
 	},
 	
 	
 	init: function(){
 	},
 	
 	//处理事件监听，需重写
 	control: function(){
 		
 	},
 	
 	renderCurmbs: function(){
 		var navData = G_NavData[this.tplName]||'';
 		this.setCrumbs(navData);
 	},
 	
 	setCrumbs:function(chain){
 		var crumbStr = '';
 		if(Ambow.isString(chain)){
 			crumbStr=chain;
 		}else{
 			var arr=[];
	 		for(var i=0,len=chain.length;i<len;i++){
	 			var rec=chain[i];
	 			arr.push('<a href="#'+rec.nav+'">'+rec.text+'</a>');
	 		}
	 		crumbStr=arr.join('>>');
 		}
 		
		$('#breadcrumb').html(crumbStr);
 	},
 	
 	required: function(){
 		if(this.requires){
 			var js = [];
 			Ambow.each(this.requires,function(rec){
 				js.push('<script  type="text/javascript"  src="'+rec+'"></script>');
 			});
 			document.write(js.join(''));
 		}
 	}
 	
 	
 });