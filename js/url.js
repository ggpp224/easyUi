/**
 *	url统一管理
*/

 G_URL = {};

 //url集中配置
 //@private 请使用G_URL,不要直接使用_urls, 如：G_URL.list
_urls = {
	'menu'			:'menu.json',
	'leftNav'		:'leftNav.json',
	'list'			:'list.json', //列表查询
	'del'			:'del.php', //删除
	'update'		:'update.php' //编辑
	
}
 for(key in _urls){
 	G_URL[key] = G_ROOT+_urls[key];
 }
_urls=null;