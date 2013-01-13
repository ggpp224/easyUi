/**
 * @author gp
 * @datetime 2012-10-16
 * @description 全局变量
 */
 
 G_ROOT = '/easyUi/'; //虚拟根路径
 
 G_UID = 'aa'; //用户id
 G_UNAME='Admin'; //用户名
 
 G_PAGESIZE=10; //分页每页记录数
 G_URL_APPEND = ''; //地址栏附加参数
 
 G_HASWRITE = true, //可操作权限
 
 G_CURRENT_TERM = '';
 
 G_MenuData = {};
 
 
 //面包屑配置，nav为文件名，注意不能重复
 _navData = {
 		text:'首页',
 		nav:'home',
 		children:[
 			{
 				text:'页面演示',
 				nav:'default',
 				children:[
 					{"text":"guid","nav":"default"},
					{"text":"未封装查询列表页","nav":"index1"},
					{
						"text":"已封装查询列表页",
						"nav":"test",
						children:[
							{text:'Index1_edit',nav:'index1_edit'}
						]
					},
					{"text":"面包屑","nav":"brumbs"},
					{"text":"tab","nav":"tab"},
					{"text":"已封装的tab列表页","nav":"tab2"}
 				]
 			},
 			{
 				text:'框架使用',
 				nav:'ajax',
 				children:[
 					{"text":"Ajax","nav":"ajax"}
 				]
 			},
 			{
 				text:'额外功能',
 				nav:'swf_upload',
 				children:[
 					{"text":"SWFUpload","nav":"swf_upload"},
					{"text":"HighCharts","nav":"highCharts"}
 				]
 			}
 		]
 }
 
 G_NavData = {};
 getNavData(_navData,[]);
 _navData=null;


 
 
 
