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
 
 
 //面包屑配置，nav为文件名，注意不能重复
 _navData = {
 		text:'首页guide',
 		nav:'default',
 		children:[
 			{text:'用户管理',nav:'user'},
 			{
 				text:'系统管理',
 				nav:'sys',
 				children:[
 					{text:'未封装查询列表页',nav:'index1'},
 					{text:'Index1_edit',nav:'index1_edit'},
 					{text:'查询列表页',nav:'test'},
 					{text:'TEST2',nav:'test2'},
 					{text:'面包屑',nav:'brumbs'}
 				]
 			}
 		]
 }
 
 G_NavData = {};
 getNavData(_navData,[]);
 _navData=null;


 
 
 
