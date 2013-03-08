/**
 * @author gp
 * @datetime 2012-9-17
 * @description index
 */

App.controller = Ambow.extend(App.Controller,{
	tplName:'tree',
	
	render:function(){
		this.tree_data={};
		var me = this,hasLoad=false;
		$('#test_tree').tree({
			url:'tree.json',
			loadFilter:function(data){
				if(!hasLoad){
					me.tree_data=data;
					haseLoad=true;
				}
				return data;
			}
		});
	},
	
	control: function(){
		var me=this;
		$('#tree_btn').click(function(){
			var d = me.tree_data;
			console.log(d);
			var dd = [d[0]];
			dd[1]={  
			    "text":"重新加载节点",  
			    "children":[{  
			        "text":"重新加载"  
			    }]  
			};
			$('#test_tree').tree('loadData',dd);
		});
	}
	
	

});
new App.controller();