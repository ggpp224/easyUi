//函数库

Ambow.load = function(url){
	var node = $('#content');
	node.trigger('beforeLoad');
//	$.getScript(url,function(responseText, textStatus, XMLHttpRequest){
//		node.trigger('afterLoad');
//	});
	
//此方法可以让firedebug调试动态载入的js	
 $('body').find('script[src="'+url+'"]').remove();
 var jsEl = document.createElement('script');
 jsEl.setAttribute('type','text/javascript');
 jsEl.src = url;
 document.body.appendChild(jsEl);
 jsEl.onLoad = function(e){
 	node.trigger('afterLoad');
 };
}

/**
 * load一个html，带面包屑的，但不建议使用
 * @param {} tplName
 */
Ambow.loadHtml = function(tplName){
	new App.Controller({tplName:tplName});
	window.location.hash=tplName;
}

//将列表上的checkbox置为非选
function disCheckedHeader(){
	var cx = document.getElementById('checkboxall');
		if(cx){
			cx.checked = false;
		}
}

//获取列表选中id
function getIds(tbody){
		var checks = document.getElementById(tbody).getElementsByTagName("input");
		var ids = [];
		for(var i=0,len=checks.length;i<len;i++){
			var c = checks[i];
			if(c.type=='checkbox'&&c.checked&&!c.disabled)
			ids.push(c.getAttribute("ids"));
		}

		return ids;
}



//格式化日期函数
Date.prototype.format = function(format){
		var o = {
			"M+" : this.getMonth()+1, //month
			"d+" : this.getDate(), //day
			"h+" : this.getHours(), //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth()+3)/3), //quarter
			"S" : this.getMilliseconds() //millisecond
		} ;

		if(/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
		}

		for(var k in o) {
			if(new RegExp("("+ k +")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			}
		}
		return format;
};

/**
     * Checks whether or not the specified object exists in the array.
     * @param {Object} o The object to check for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */


function getQuery(name){
		var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
		var r=window.location.search.substr(1).match(reg);
		return r!=null?r[2]:"";
};

// 过滤html标签
function strip_tags(input, allowed) {
	allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
	commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	return input.replace(commentsAndPhpTags, '').replace(tags,
	function($0, $1) {
		return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0: '';
	});
}


// Cookie操作
var Cookie = {
	getcookie : function (O){var o="",l=O+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(l);if(i!=-1){i+=l.length;var I=document.cookie.indexOf(";",i);if(I==-1)I=document.cookie.length;o=unescape(document.cookie.substring(i,I))}};return o},
	// 植入cookie n->cookieq名,v->cookie值,t->时间(毫秒),p->路径,c->域名
	setcookie : function (n,v,t,p,c){var T="";if(t){T=new Date((new Date).getTime()+t);T="; expires="+T.toGMTString()};document.cookie=n+"="+escape(v)+T+(p?';path='+p:'')+(c?';domain='+c:'')},
	// 删除cookie
	delcookie : function (a){document.cookie=a+"=; "+"domain="+G_domain+"; path="+G_domain+"; "}
};
var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = Base64._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		return output;
	},
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}
		output = Base64._utf8_decode(output);
		return output;
	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {

		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
};

function strSplit(str,len){
	var str=$.trim(str||'');
	var len = len||6;
	if(str.length<=len)return str;
	return str.substr(0,len)+'...';
}

// 过滤Null/undefined
function throwNull(str){
	var re = /null|undefined|无/g;
	return (str+'').replace(re,'');
}

Ambow.createGrid = function(opt){
	//var parentEl = !!opt.parentId?$('#'+opt.parentId):$('body');
	var id = opt.id||'list'+new Date().valueOf();
	//parentEl.html('<table id="'+id+'" class="tablebox"> </table>');
	
	var gridConfig ={};
	Ambow.apply(gridConfig,opt);
	
	delete gridConfig.id;
	
	$('#search_List').datagrid(gridConfig);
}

/**
 * 格式化导航树数据
 * @param {} obj
 * @param {} chain
 */
function getNavData(obj,chain){
 	var chain = chain||[];
 	var noChildrenObj = {children:null};
 	Ambow.applyIf(noChildrenObj,obj);
 	chain.push(noChildrenObj);
 	G_NavData[obj.nav]=chain;
 	if(obj.children&&obj.children.length>0){
 		var arr =obj.children,  len=arr.length;
 		for(var i=0;i<len;i++){
 			var rec = arr[i];
 			var newChain = chain.slice(0);
 			G_NavData[rec.nav]=newChain;
 			getNavData(rec,newChain);
 		}
 	}
 }

 
 //迪生写的form多表单提交
function submitForm(formJson,url,func){			
	var data = {};
	for(var form in formJson){				
		var value = formJson[form];				
		if(Ambow.isArray(value)){		
			data[form] = [];
			for(var i=0;i<value.length;i++){						
				var a = Ambow.getFormData(value[i]);
				data[form][i] = a;						
			}
		}else{
			data[form] = Ambow.getFormData(value);
		}
	}			
	Ambow.post({
		url:url,
		params:data,
		success:func || function(){}
	});
}



