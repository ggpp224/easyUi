/**
 * @author gp
 * @datetime 2012-4-26
 * @description base.js
 */
jQuery.Event.prototype.getTarget = function(selector){
	var target = $(this.target);
	if(target.filter(selector).length>0){
		return target;
	}
	var parent = target.parents(selector);
	if(parent.length>0){
		return parent;
	}
	return null;
};
/**
 * 对dom的简单封装
 * @param {String} id , dom id
 * @return {HTMLDOCUMENT} dom 
 * 
 * var tt =Dom('btn' );
 *	tt.on('click' ,function(e){
 *	     var ss = this;
 *	     alert(tt.value);
 *	     alert(this.value);
 *	});
 * 
 */
var Dom = function (id){
     var dom = document.getElementById(id);
     if(dom){
           dom.on = function( type,fn,flag){
                 if( this.addEventListener){
                      this.addEventListener( type,fn,flag||false);
                } else if( this.attachEvent){
                      this.attachEvent( 'on'+ type,function(){fn.apply( dom, arguments );});
                } else{
                      this[ 'on'+ type]=fn;
                }
           };
           dom.un = function( type,fn,flag){
                 if( this.removeEventListener){
                      this.removeEventListener( type,fn,flag||false);
                } else if( this.detachEvent){
                      this.detachEvent( 'on'+ type,function(){fn.apply( dom, arguments );});
                } else{
                      this[ 'on'+ type]=null;
                }
           };
     }
     return dom;
};


Ambow = {};

/**
 * 将config中的所有属性复制到obj中
 * 
 * @param {Object}
 *            obj The receiver of the properties
 * @param {Object}
 *            config The source of the properties
 * @param {Object}
 *            defaults A different object that will also be applied for default
 *            values
 * @return {Object} returns obj
 * @member Ambow apply
 */
Ambow.apply = function(o, c, defaults) {
	// no "this" reference for friendly out of scope calls
	if (defaults) {
		Ambow.apply(o, defaults);
	}
	if (o && c && typeof c == 'object') {
		for (var p in c) {
			o[p] = c[p];
		}
	}
	return o;
};

(function() {
	var idSeed = 0,
        toString = Object.prototype.toString,
        ua = navigator.userAgent.toLowerCase(),
        check = function(r){
            return r.test(ua);
        },
        DOC = document,
        docMode = DOC.documentMode,
        isStrict = DOC.compatMode == "CSS1Compat",
        isOpera = check(/opera/),
        isChrome = check(/\bchrome\b/),
        isWebKit = check(/webkit/),
        isSafari = !isChrome && check(/safari/),
        isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
        isSafari3 = isSafari && check(/version\/3/),
        isSafari4 = isSafari && check(/version\/4/),
        isIE = !isOpera && check(/msie/),
        isIE7 = isIE && (check(/msie 7/) || docMode == 7),
        isIE8 = isIE && (check(/msie 8/) && docMode != 7),
        isIE9 = isIE && check(/msie 9/),
        isIE6 = isIE && !isIE7 && !isIE8 && !isIE9,
        isGecko = !isWebKit && check(/gecko/),
        isGecko2 = isGecko && check(/rv:1\.8/),
        isGecko3 = isGecko && check(/rv:1\.9/),
        isBorderBox = isIE && !isStrict,
        isWindows = check(/windows|win32/),
        isMac = check(/macintosh|mac os x/),
        isAir = check(/adobeair/),
        isLinux = check(/linux/),
        isSecure = /^https/i.test(window.location.protocol);

    // remove css image flicker
    if(isIE6){
        try{
            DOC.execCommand("BackgroundImageCache", false, true);
        }catch(e){}
    }
	Ambow.apply(Ambow, {

		/**
		 * 把config中在obj中不存在的属性，如果obj中存在相同属性则不复制
		 * 
		 * @param {Object}
		 *            obj The receiver of the properties
		 * @param {Object}
		 *            config The source of the properties
		 * @return {Object} returns obj
		 */
		applyIf : function(o, c) {
			if (o) {
				for (var p in c) {
					if (!Ambow.isDefined(o[p])) {
						o[p] = c[p];
					}
				}
			}
			return o;
		},
		isObject : function(v){
            return !!v && Object.prototype.toString.call(v) === '[object Object]';
        },
		 isString : function(v){
            return typeof v === 'string';
        },

        /**
         * Returns true if the passed value is a boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isBoolean : function(v){
            return typeof v === 'boolean';
        },

		isDefined : function(v) {
			return typeof v !== 'undefined';
		},
		
		isArray : function(v){
            return toString.apply(v) === '[object Array]';
        },
        
        isEmpty : function(v, allowBlank){
            return v === null || v === undefined || (!allowBlank ? v === '' : false);
        },
        
        
        
        isNumber : function(v){
            return typeof v === 'number' && isFinite(v);
        },
        isDate : function(v){
            return toString.apply(v) === '[object Date]';
        },
        
         isPrimitive : function(v){
            return Ambow.isString(v) || Ambow.isNumber(v) || Ambow.isBoolean(v);
        },
        namespace : function(){
            var len1 = arguments.length,
                i = 0,
                len2,
                j,
                main,
                ns,
                sub,
                current;
                
            for(; i < len1; ++i) {
                main = arguments[i];
                ns = arguments[i].split('.');
                current = window[ns[0]];
                if (current === undefined) {
                    current = window[ns[0]] = {};
                }
                sub = ns.slice(1);
                len2 = sub.length;
                for(j = 0; j < len2; ++j) {
                    current = current[sub[j]] = current[sub[j]] || {};
                }
            }
            return current;
        },
         /**
         * 继承一个父类来创建一个子类
         * for example
         * var Panel = Ambow.extend(Ambow.util.Observable,{
				constructor: function(config){
					this.color = config.color;
					this.addEvents('fired');
					Panel.superclass.constructor.call(this,config);
					this.bindListeners();
				},
				
				bindListeners: function(){
					this.on('fired',this.onFired,this);
				},
				
				onFired: function(){
					alert(this.color);
				}
			});
         */
        extend : function(){
            // inline overrides
            var io = function(o){
                for(var m in o){
                    this[m] = o[m];
                }
            };
            var oc = Object.prototype.constructor;

            return function(sb, sp, overrides){
                if(typeof sp == 'object'){
                    overrides = sp;
                    sp = sb;
                    sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
                }
                var F = function(){},
                    sbp,
                    spp = sp.prototype;

                F.prototype = spp;
                sbp = sb.prototype = new F();
                sbp.constructor=sb;
                sb.superclass=spp;
                if(spp.constructor == oc){
                    spp.constructor=sp;
                }
                sb.override = function(o){
                    Ambow.override(sb, o);
                };
                sbp.superclass = sbp.supr = (function(){
                    return spp;
                });
                sbp.override = io;
                Ambow.override(sb, overrides);
                sb.extend = function(o){return Ambow.extend(sb, o);};
                return sb;
            };
        }(),
        
        override : function(origclass, overrides){
            if(overrides){
                var p = origclass.prototype;
                Ambow.apply(p, overrides);
               
            }
        },
         isIterable : function(v){
            //check for array or arguments
            if(Ambow.isArray(v) || v.callee){
                return true;
            }
            //check for node list type
            if(/NodeList|HTMLCollection/.test(toString.call(v))){
                return true;
            }
            //NodeList has an item and length property
            //IXMLDOMNodeList has nextNode method, needs to be checked first.
            return ((typeof v.nextNode != 'undefined' || v.item) && Ambow.isNumber(v.length));
        },
        
         each : function(array, fn, scope){
            if(Ambow.isEmpty(array, true)){
                return;
            }
            if(!Ambow.isIterable(array) || Ambow.isPrimitive(array)){
                array = [array];
            }
            for(var i = 0, len = array.length; i < len; i++){
                if(fn.call(scope || array[i], array[i], i, array) === false){
                    return i;
                };
            }
        },
        
        iterate : function(obj, fn, scope){
            if(Ambow.isEmpty(obj)){
                return;
            }
            if(Ambow.isIterable(obj)){
                Ambow.each(obj, fn, scope);
                return;
            }else if(typeof obj == 'object'){
                for(var prop in obj){
                    if(obj.hasOwnProperty(prop)){
                        if(fn.call(scope || obj, prop, obj[prop], obj) === false){
                            return;
                        };
                    }
                }
            }
        },

       
		
        /**
         * 将表单中数据序列化成url连接符格式
         */
		serializeForm : function(form) {
			var fElements = form.elements || document.forms[form].elements;
			var hasSubmit = false, encoder = encodeURIComponent, name, data = '', type, hasValue;
			for (var i = 0, len = fElements.length; i < len; i++) {
				var element = fElements[i];
				name = element.name;
				type = element.type;

				if (name) {
					if (/select-(one|multiple)/i.test(type)) {
						var opts = element.options;
						var resetFlag = false;
						var getData=function(opt){
							if(!opt){return '';}
							hasValue = opt.hasAttribute ? opt
										.hasAttribute('value') : opt
										.getAttributeNode('value').specified;
								data += encoder(name)
										+ "="
										+ encoder(hasValue
												? opt.value
												: opt.text) + "&";
						};
						for (var j = 0, olen = opts.length; j < olen; j++) {
							var opt = opts[j];
							if (opt.selected) {
								resetFlag=true;
								getData(opt);
							}
						}
						//解决IE下重置表单后，select默认项selected 为false
						if(!resetFlag){
							var opt = opts[0];
							getData(opt);
						}
					} else if (!(/file|undefined|reset|button/i.test(type))) {
						if (!(/radio|checkbox/i.test(type) && !element.checked)
								&& !(type == 'submit' && hasSubmit)) {
							data += encoder(name) + '='
									+ encoder(element.value) + '&';
							hasSubmit = /submit/i.test(type);
						}
					}
				}
			}

			return data.substr(0, data.length - 1);
		},
		
		urlAppend : function(url, s){
            if(!Ambow.isEmpty(s)){
                return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
            }
            return url;
        },

		
		/**
		 * 
		 */
		 urlDecode : function(string, overwrite){
            if(Ambow.isEmpty(string)){
                return {};
            }
            var obj = {},
                pairs = string.split('&'),
                d = decodeURIComponent,
                name,
                value;
                
            for(var i=0,len=pairs.length;i<len;i++){
            	var pair = pairs[i];
            	pair = pair.split('=');
                name = d(pair[0]);
                value = d(pair[1]);
                obj[name] = overwrite || !obj[name] ? value :
                            [].concat(obj[name]).concat(value);
            }
            
            return obj;
        },
        
        urlEncode : function(o, pre){
            var empty,
                buf = [],
                e = encodeURIComponent;

            Ambow.iterate(o, function(key, item){
                empty = Ambow.isEmpty(item);
                Ambow.each(empty ? key : item, function(val){
                    buf.push('&', e(key), '=', (!Ambow.isEmpty(val) && (val != key || !empty)) ? (Ambow.isDate(val) ? Ambow.encode(val).replace(/"/g, '') : e(val)) : '');
                });
            });
            if(!pre){
                buf.shift();
                pre = '';
            }
            return pre + buf.join('');
        }


	});

})();


Ambow.apply(Function.prototype,{
	createDelegate : function(obj, args, appendArgs){
        var method = this;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if (Ambow.isNumber(appendArgs)){
                callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args); // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
            }
            return method.apply(obj || window, callArgs);
        };
    }
});


/////////////////////////
		//类库//
////////////////////////
Ambow.ns = Ambow.namespace;
Ambow.ns('Ambow.util');

/**
 * 操作json 
 */
Ambow.JSON = new (function(){
    var useHasOwn = !!{}.hasOwnProperty,
        isNative = function() {
             return false;
           
        }(),
        pad = function(n) {
            return n < 10 ? "0" + n : n;
        },
        doDecode = function(json){
            return json ? eval("(" + json + ")") : "";   
        },
        doEncode = function(o){
            if(!Ambow.isDefined(o) || o === null){
                return "null";
            }else if(Ambow.isArray(o)){
                return encodeArray(o);
            }else if(Ambow.isDate(o)){
                return Ambow.JSON.encodeDate(o);
            }else if(Ambow.isString(o)){
                return encodeString(o);
            }else if(typeof o == "number"){
                //don't use isNumber here, since finite checks happen inside isNumber
                return isFinite(o) ? String(o) : "null";
            }else if(Ambow.isBoolean(o)){
                return String(o);
            }else {
                var a = ["{"], b, i, v;
                for (i in o) {
                    // don't encode DOM objects
                    if(!o.getElementsByTagName){
                        if(!useHasOwn || o.hasOwnProperty(i)) {
                            v = o[i];
                            switch (typeof v) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                if(b){
                                    a.push(',');
                                }
                                a.push(doEncode(i), ":",
                                        v === null ? "null" : doEncode(v));
                                b = true;
                            }
                        }
                    }
                }
                a.push("}");
                return a.join("");
            }   
        },
        m = {
            "\b": '\\b',
            "\t": '\\t',
            "\n": '\\n',
            "\f": '\\f',
            "\r": '\\r',
            '"' : '\\"',
            "\\": '\\\\'
        },
        encodeString = function(s){
            if (/["\\\x00-\x1f]/.test(s)) {
                return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                    var c = m[b];
                    if(c){
                        return c;
                    }
                    c = b.charCodeAt();
                    return "\\u00" +
                        Math.floor(c / 16).toString(16) +
                        (c % 16).toString(16);
                }) + '"';
            }
            return '"' + s + '"';
        },
        encodeArray = function(o){
            var a = ["["], b, i, l = o.length, v;
                for (i = 0; i < l; i += 1) {
                    v = o[i];
                    switch (typeof v) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            if (b) {
                                a.push(',');
                            }
                            a.push(v === null ? "null" : Ambow.JSON.encode(v));
                            b = true;
                    }
                }
                a.push("]");
                return a.join("");
        };

    /**
     * <p>Encodes a Date. This returns the actual string which is inserted into the JSON string as the literal expression.
     * <b>The returned value includes enclosing double quotation marks.</b></p>
     * <p>The default return format is "yyyy-mm-ddThh:mm:ss".</p>
     * <p>To override this:</p><pre><code>
Ext.util.JSON.encodeDate = function(d) {
    return d.format('"Y-m-d"');
};
</code></pre>
     * @param {Date} d The Date to encode
     * @return {String} The string literal to use in a JSON string.
     */
    this.encodeDate = function(o){
        return '"' + o.getFullYear() + "-" +
                pad(o.getMonth() + 1) + "-" +
                pad(o.getDate()) + "T" +
                pad(o.getHours()) + ":" +
                pad(o.getMinutes()) + ":" +
                pad(o.getSeconds()) + '"';
    };

    /**
     * Encodes an Object, Array or other value
     * @param {Mixed} o The variable to encode
     * @return {String} The JSON string
     */
    this.encode = function() {
        var ec;
        return function(o) {
            if (!ec) {
                // setup encoding function on first access
                ec = isNative ? JSON.stringify : doEncode;
            }
            return ec(o);
        };
    }();


    /**
     * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError unless the safe option is set.
     * @param {String} json The JSON string
     * @return {Object} The resulting object
     */
    this.decode = function() {
        var dc;
        return function(json) {
            if (!dc) {
                // setup decoding function on first access
                dc = isNative ? JSON.parse : doDecode;
            }
            return dc(json);
        };
    }();

})();
/**
* Shorthand for {@link Ext.util.JSON#encode}
* @param {Mixed} o The variable to encode
* @return {String} The JSON string
* @member Ext
* @method encode
*/
Ambow.encode = Ambow.JSON.encode;
/**
* Shorthand for {@link Ext.util.JSON#decode}
* @param {String} json The JSON string
* @param {Boolean} safe (optional) Whether to return null or throw an exception if the JSON is invalid.
* @return {Object} The resulting object
* @member Ext
* @method decode
*/
Ambow.decode = Ambow.JSON.decode;

Ambow.DomHelper = function(){
    var tempTableEl = null,
        emptyTags = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
        tableRe = /^table|tbody|tr|td$/i,
        confRe = /tag|children|cn|html$/i,
        tableElRe = /td|tr|tbody/i,
        cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
        endRe = /end/i,
        pub,
        // kill repeat to save bytes
        afterbegin = 'afterbegin',
        afterend = 'afterend',
        beforebegin = 'beforebegin',
        beforeend = 'beforeend',
        ts = '<table>',
        te = '</table>',
        tbs = ts+'<tbody>',
        tbe = '</tbody>'+te,
        trs = tbs + '<tr>',
        tre = '</tr>'+tbe;

    // private
    function doInsert(el, o, returnElement, pos, sibling, append){
        var newNode = pub.insertHtml(pos, el, createHtml(o));
        return newNode;
    }

    // build as innerHTML where available
    function createHtml(o){
        var b = '',
            attr,
            val,
            key,
            cn;

        if(typeof o == "string"){
            b = o;
        } else if (Ambow.isArray(o)) {
            for (var i=0; i < o.length; i++) {
                if(o[i]) {
                    b += createHtml(o[i]);
                }
            };
        } else {
            b += '<' + (o.tag = o.tag || 'div');
            for (attr in o) {
                val = o[attr];
                if(!confRe.test(attr)){
                    if (typeof val == "object") {
                        b += ' ' + attr + '="';
                        for (key in val) {
                            b += key + ':' + val[key] + ';';
                        };
                        b += '"';
                    }else{
                        b += ' ' + ({cls : 'class', htmlFor : 'for'}[attr] || attr) + '="' + val + '"';
                    }
                }
            };
            // Now either just close the tag or try to add children and close the tag.
            if (emptyTags.test(o.tag)) {
                b += '/>';
            } else {
                b += '>';
                if ((cn = o.children || o.cn)) {
                    b += createHtml(cn);
                } else if(o.html){
                    b += o.html;
                }
                b += '</' + o.tag + '>';
            }
        }
        return b;
    }

    function ieTable(depth, s, h, e){
        tempTableEl.innerHTML = [s, h, e].join('');
        var i = -1,
            el = tempTableEl,
            ns;
        while(++i < depth){
            el = el.firstChild;
        }
//      If the result is multiple siblings, then encapsulate them into one fragment.
        if(ns = el.nextSibling){
            var df = document.createDocumentFragment();
            while(el){
                ns = el.nextSibling;
                df.appendChild(el);
                el = ns;
            }
            el = df;
        }
        return el;
    }

    /**
     * @ignore
     * Nasty code for IE's broken table implementation
     */
    function insertIntoTable(tag, where, el, html) {
        var node,
            before;

        tempTableEl = tempTableEl || document.createElement('div');

        if(tag == 'td' && (where == afterbegin || where == beforeend) ||
           !tableElRe.test(tag) && (where == beforebegin || where == afterend)) {
            return;
        }
        before = where == beforebegin ? el :
                 where == afterend ? el.nextSibling :
                 where == afterbegin ? el.firstChild : null;

        if (where == beforebegin || where == afterend) {
            el = el.parentNode;
        }

        if (tag == 'td' || (tag == 'tr' && (where == beforeend || where == afterbegin))) {
            node = ieTable(4, trs, html, tre);
        } else if ((tag == 'tbody' && (where == beforeend || where == afterbegin)) ||
                   (tag == 'tr' && (where == beforebegin || where == afterend))) {
            node = ieTable(3, tbs, html, tbe);
        } else {
            node = ieTable(2, ts, html, te);
        }
        el.insertBefore(node, before);
        return node;
    }

    /**
     * @ignore
     * Fix for IE9 createContextualFragment missing method
     */   
    function createContextualFragment(html){
        var div = document.createElement("div"),
            fragment = document.createDocumentFragment(),
            i = 0,
            length, childNodes;
        
        div.innerHTML = html;
        childNodes = div.childNodes;
        length = childNodes.length;
        
        for (; i < length; i++) {
            fragment.appendChild(childNodes[i].cloneNode(true));
        }
        
        return fragment;
    }
    
    pub = {
        /**
         * Returns the markup for the passed Element(s) config.
         * @param {Object} o The DOM object spec (and children)
         * @return {String}
         */
        markup : function(o){
            return createHtml(o);
        },

        /**
         * Applies a style specification to an element.
         * @param {String/HTMLElement} el The element to apply styles to
         * @param {String/Object/Function} styles A style specification string e.g. 'width:100px', or object in the form {width:'100px'}, or
         * a function which returns such a specification.
         */
       /* applyStyles : function(el, styles){
            if (styles) {
                var matches;

                el = Ext.fly(el);
                if (typeof styles == "function") {
                    styles = styles.call();
                }
                if (typeof styles == "string") {
                    *//**
                     * Since we're using the g flag on the regex, we need to set the lastIndex.
                     * This automatically happens on some implementations, but not others, see:
                     * http://stackoverflow.com/questions/2645273/javascript-regular-expression-literal-persists-between-function-calls
                     * http://blog.stevenlevithan.com/archives/fixing-javascript-regexp
                     *//*
                    cssRe.lastIndex = 0;
                    while ((matches = cssRe.exec(styles))) {
                        el.setStyle(matches[1], matches[2]);
                    }
                } else if (typeof styles == "object") {
                    el.setStyle(styles);
                }
            }
        },*/
        /**
         * Inserts an HTML fragment into the DOM.
         * @param {String} where Where to insert the html in relation to el - beforeBegin, afterBegin, beforeEnd, afterEnd.
         * @param {HTMLElement} el The context element
         * @param {String} html The HTML fragment
         * @return {HTMLElement} The new node
         */
        insertHtml : function(where, el, html){
            var hash = {},
                hashVal,
                range,
                rangeEl,
                setStart,
                frag,
                rs;

            where = where.toLowerCase();
            // add these here because they are used in both branches of the condition.
            hash[beforebegin] = ['BeforeBegin', 'previousSibling'];
            hash[afterend] = ['AfterEnd', 'nextSibling'];

            if (el.insertAdjacentHTML) {
                if(tableRe.test(el.tagName) && (rs = insertIntoTable(el.tagName.toLowerCase(), where, el, html))){
                    return rs;
                }
                // add these two to the hash.
                hash[afterbegin] = ['AfterBegin', 'firstChild'];
                hash[beforeend] = ['BeforeEnd', 'lastChild'];
                if ((hashVal = hash[where])) {
                    el.insertAdjacentHTML(hashVal[0], html);
                    return el[hashVal[1]];
                }
            } else {
                range = el.ownerDocument.createRange();
                setStart = 'setStart' + (endRe.test(where) ? 'After' : 'Before');
                if (hash[where]) {
                    range[setStart](el);
                    if (!range.createContextualFragment) {
                        frag = createContextualFragment(html);
                    }
                    else {
                        frag = range.createContextualFragment(html);
                    }
                    el.parentNode.insertBefore(frag, where == beforebegin ? el : el.nextSibling);
                    return el[(where == beforebegin ? 'previous' : 'next') + 'Sibling'];
                } else {
                    rangeEl = (where == afterbegin ? 'first' : 'last') + 'Child';
                    if (el.firstChild) {
                        range[setStart](el[rangeEl]);
                        if (!range.createContextualFragment) {
                            frag = createContextualFragment(html);
                        }
                        else {
                            frag = range.createContextualFragment(html);
                        }
                        if(where == afterbegin){
                            el.insertBefore(frag, el.firstChild);
                        }else{
                            el.appendChild(frag);
                        }
                    } else {
                        el.innerHTML = html;
                    }
                    return el[rangeEl];
                }
            }
            throw 'Illegal insertion point -> "' + where + '"';
        },

        /**
         * Creates new DOM element(s) and inserts them before el.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        insertBefore : function(el, o, returnElement){
            return doInsert(el, o, returnElement, beforebegin);
        },

        /**
         * Creates new DOM element(s) and inserts them after el.
         * @param {Mixed} el The context element
         * @param {Object} o The DOM object spec (and children)
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        insertAfter : function(el, o, returnElement){
            return doInsert(el, o, returnElement, afterend, 'nextSibling');
        },

        /**
         * Creates new DOM element(s) and inserts them as the first child of el.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        insertFirst : function(el, o, returnElement){
            return doInsert(el, o, returnElement, afterbegin, 'firstChild');
        },

        /**
         * Creates new DOM element(s) and appends them to el.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        append : function(el, o, returnElement){
            return doInsert(el, o, returnElement, beforeend, '', true);
        },

        /**
         * Creates new DOM element(s) and overwrites the contents of el with them.
         * @param {Mixed} el The context element
         * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
         * @param {Boolean} returnElement (optional) true to return a Ext.Element
         * @return {HTMLElement/Ext.Element} The new node
         */
        overwrite : function(el, o, returnElement){
            //el = Ext.getDom(el);
            el.innerHTML = createHtml(o);
            return el.firstChild;
        },

        createHtml : createHtml
    };
    return pub;
}();
Ambow.util.Format = function() {
    var trimRe         = /^\s+|\s+$/g,
        stripTagsRE    = /<\/?[^>]+>/gi,
        stripScriptsRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        nl2brRe        = /\r?\n/g;

    return {
        /**
         * Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length
         * @param {String} value The string to truncate
         * @param {Number} length The maximum length to allow before truncating
         * @param {Boolean} word True to try to find a common work break
         * @return {String} The converted tYx
         */
        ellipsis : function(value, len, word) {
            if (value && value.length > len) {
                if (word) {
                    var vs    = value.substr(0, len - 2),
                        index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
                    if (index == -1 || index < (len - 15)) {
                        return value.substr(0, len - 3) + "...";
                    } else {
                        return vs.substr(0, index) + "...";
                    }
                } else {
                    return value.substr(0, len - 3) + "...";
                }
            }
            return value;
        },

        /**
         * Checks a reference and converts it to empty string if it is undefined
         * @param {Mixed} value Reference to check
         * @return {Mixed} Empty string if converted, otherwise the original value
         */
        undef : function(value) {
            return value !== undefined ? value : "";
        },

        /**
         * Checks a reference and converts it to the default value if it's empty
         * @param {Mixed} value Reference to check
         * @param {String} defaultValue The value to insert of it's undefined (defaults to "")
         * @return {String}
         */
        defaultValue : function(value, defaultValue) {
            return value !== undefined && value !== '' ? value : defaultValue;
        },

        /**
         * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode
         * @return {String} The encoded tYx
         */
        htmlEncode : function(value) {
            return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        },

        /**
         * Convert certain characters (&, <, >, and ') from their HTML character equivalents.
         * @param {String} value The string to decode
         * @return {String} The decoded tYx
         */
        htmlDecode : function(value) {
            return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        },

        /**
         * Trims any whitespace from either side of a string
         * @param {String} value The tYx to trim
         * @return {String} The trimmed tYx
         */
        trim : function(value) {
            return String(value).replace(trimRe, "");
        },

        /**
         * Returns a substring from within an original string
         * @param {String} value The original tYx
         * @param {Number} start The start index of the substring
         * @param {Number} length The length of the substring
         * @return {String} The substring
         */
        substr : function(value, start, length) {
            return String(value).substr(start, length);
        },

        /**
         * Converts a string to all lower case letters
         * @param {String} value The tYx to convert
         * @return {String} The converted tYx
         */
        lowercase : function(value) {
            return String(value).toLowerCase();
        },

        /**
         * Converts a string to all upper case letters
         * @param {String} value The tYx to convert
         * @return {String} The converted tYx
         */
        uppercase : function(value) {
            return String(value).toUpperCase();
        },

        /**
         * Converts the first character only of a string to upper case
         * @param {String} value The tYx to convert
         * @return {String} The converted tYx
         */
        capitalize : function(value) {
            return !value ? value : value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
        },

        // private
        call : function(value, fn) {
            if (arguments.length > 2) {
                var args = Array.prototype.slice.call(arguments, 2);
                args.unshift(value);
                return eval(fn).apply(window, args);
            } else {
                return eval(fn).call(window, value);
            }
        },

        /**
         * Format a number as US currency
         * @param {Number/String} value The numeric value to format
         * @return {String} The formatted currency string
         */
        usMoney : function(v) {
            v = (Math.round((v-0)*100))/100;
            v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
            v = String(v);
            var ps = v.split('.'),
                whole = ps[0],
                sub = ps[1] ? '.'+ ps[1] : '.00',
                r = /(\d+)(\d{3})/;
            while (r.test(whole)) {
                whole = whole.replace(r, '$1' + ',' + '$2');
            }
            v = whole + sub;
            if (v.charAt(0) == '-') {
                return '-$' + v.substr(1);
            }
            return "$" +  v;
        },

        /**
         * Parse a value into a formatted date using the specified format pattern.
         * @param {String/Date} value The value to format (Strings must conform to the format expected by the javascript Date object's <a href="http://www.w3schools.com/jsref/jsref_parse.asp">parse()</a> method)
         * @param {String} format (optional) Any valid date format string (defaults to 'm/d/Y')
         * @return {String} The formatted date string
         */
        date : function(v, format) {
            if (!v) {
                return "";
            }
            if (!Ambow.isDate(v)) {
                v = new Date(Date.parse(v));
            }
            return v.dateFormat(format || "m/d/Y");
        },

        /**
         * Returns a date rendering function that can be reused to apply a date format multiple times efficiently
         * @param {String} format Any valid date format string
         * @return {Function} The date formatting function
         */
        dateRenderer : function(format) {
            return function(v) {
                return Ambow.util.Format.date(v, format);
            };
        },

        /**
         * Strips all HTML tags
         * @param {Mixed} value The tYx from which to strip tags
         * @return {String} The stripped tYx
         */
        stripTags : function(v) {
            return !v ? v : String(v).replace(stripTagsRE, "");
        },

        /**
         * Strips all script tags
         * @param {Mixed} value The tYx from which to strip script tags
         * @return {String} The stripped tYx
         */
        stripScripts : function(v) {
            return !v ? v : String(v).replace(stripScriptsRe, "");
        },

        /**
         * Simple format for a file size (xxx bytes, xxx KB, xxx MB)
         * @param {Number/String} size The numeric value to format
         * @return {String} The formatted file size
         */
        fileSize : function(size) {
            if (size < 1024) {
                return size + " bytes";
            } else if (size < 1048576) {
                return (Math.round(((size*10) / 1024))/10) + " KB";
            } else {
                return (Math.round(((size*10) / 1048576))/10) + " MB";
            }
        },

        /**
         * It does simple math for use in a template, for example:<pre><code>
         * var tpl = new Ambow.Template('{value} * 10 = {value:math("* 10")}');
         * </code></pre>
         * @return {Function} A function that operates on the passed value.
         */
        math : function(){
            var fns = {};
            
            return function(v, a){
                if (!fns[a]) {
                    fns[a] = new Function('v', 'return v ' + a + ';');
                }
                return fns[a](v);
            };
        }(),

        /**
         * Rounds the passed number to the required decimal precision.
         * @param {Number/String} value The numeric value to round.
         * @param {Number} precision The number of decimal places to which to round the first parameter's value.
         * @return {Number} The rounded value.
         */
        round : function(value, precision) {
            var result = Number(value);
            if (typeof precision == 'number') {
                precision = Math.pow(10, precision);
                result = Math.round(value * precision) / precision;
            }
            return result;
        },

        /**
         * Formats the number according to the format string.
         * <div style="margin-left:40px">examples (123456.789):
         * <div style="margin-left:10px">
         * 0 - (123456) show only digits, no precision<br>
         * 0.00 - (123456.78) show only digits, 2 precision<br>
         * 0.0000 - (123456.7890) show only digits, 4 precision<br>
         * 0,000 - (123,456) show comma and digits, no precision<br>
         * 0,000.00 - (123,456.78) show comma and digits, 2 precision<br>
         * 0,0.00 - (123,456.78) shortcut method, show comma and digits, 2 precision<br>
         * To reverse the grouping (,) and decimal (.) for international numbers, add /i to the end.
         * For example: 0.000,00/i
         * </div></div>
         * @param {Number} v The number to format.
         * @param {String} format The way you would like to format this tYx.
         * @return {String} The formatted number.
         */
        number: function(v, format) {
            if (!format) {
                return v;
            }
            v = Ambow.num(v, NaN);
            if (isNaN(v)) {
                return '';
            }
            var comma = ',',
                dec   = '.',
                i18n  = false,
                neg   = v < 0;

            v = Math.abs(v);
            if (format.substr(format.length - 2) == '/i') {
                format = format.substr(0, format.length - 2);
                i18n   = true;
                comma  = '.';
                dec    = ',';
            }

            var hasComma = format.indexOf(comma) != -1,
                psplit   = (i18n ? format.replace(/[^\d\,]/g, '') : format.replace(/[^\d\.]/g, '')).split(dec);

            if (1 < psplit.length) {
                v = v.toFixed(psplit[1].length);
            } else if(2 < psplit.length) {
                throw ('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
            } else {
                v = v.toFixed(0);
            }

            var fnum = v.toString();

            psplit = fnum.split('.');

            if (hasComma) {
                var cnum = psplit[0], 
                    parr = [], 
                    j    = cnum.length, 
                    m    = Math.floor(j / 3),
                    n    = cnum.length % 3 || 3,
                    i;

                for (i = 0; i < j; i += n) {
                    if (i != 0) {
                        n = 3;
                    }
                    
                    parr[parr.length] = cnum.substr(i, n);
                    m -= 1;
                }
                fnum = parr.join(comma);
                if (psplit[1]) {
                    fnum += dec + psplit[1];
                }
            } else {
                if (psplit[1]) {
                    fnum = psplit[0] + dec + psplit[1];
                }
            }

            return (neg ? '-' : '') + format.replace(/[\d,?\.?]+/, fnum);
        },

        /**
         * Returns a number rendering function that can be reused to apply a number format multiple times efficiently
         * @param {String} format Any valid number format string for {@link #number}
         * @return {Function} The number formatting function
         */
        numberRenderer : function(format) {
            return function(v) {
                return Ambow.util.Format.number(v, format);
            };
        },

        /**
         * Selectively do a plural form of a word based on a numeric value. For example, in a template,
         * {commentCount:plural("Comment")}  would result in "1 Comment" if commentCount was 1 or would be "x Comments"
         * if the value is 0 or greater than 1.
         * @param {Number} value The value to compare against
         * @param {String} singular The singular form of the word
         * @param {String} plural (optional) The plural form of the word (defaults to the singular with an "s")
         */
        plural : function(v, s, p) {
            return v +' ' + (v == 1 ? s : (p ? p : s+'s'));
        },

        /**
         * Converts newline characters to the HTML tag &lt;br/>
         * @param {String} The string value to format.
         * @return {String} The string with embedded &lt;br/> tags in place of newlines.
         */
        nl2br : function(v) {
            return Ambow.isEmpty(v) ? '' : v.replace(nl2brRe, '<br/>');
        }
    };
}();
Ambow.Template = function(html){
    var me = this,
        a = arguments,
        buf = [],
        v;

    if (Ambow.isArray(html)) {
        html = html.join("");
    } else if (a.length > 1) {
        for(var i = 0, len = a.length; i < len; i++){
            v = a[i];
            if(typeof v == 'object'){
                Ambow.apply(me, v);
            } else {
                buf.push(v);
            }
        };
        html = buf.join('');
    }

    /**@private*/
    me.html = html;
    /**
     * @cfg {Boolean} compiled Specify <tt>true</tt> to compile the template
     * immediately (see <code>{@link #compile}</code>).
     * Defaults to <tt>false</tt>.
     */
    if (me.compiled) {
        me.compile();
    }
};
Ambow.Template.prototype = {
    /**
     * @cfg {RegExp} re The regular expression used to match template variables.
     * Defaults to:<pre><code>
     * re : /\{([\w\-]+)\}/g                                     // for Ambow Core
     * re : /\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g      // for Ambow JS
     * </code></pre>
     */
    re : /\{([\w\-]+)\}/g,
    /**
     * See <code>{@link #re}</code>.
     * @type RegExp
     * @property re
     */

    /**
     * Returns an HTML fragment of this template with the specified <code>values</code> applied.
     * @param {Object/Array} values
     * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
     * or an object (i.e. <code>{foo: 'bar'}</code>).
     * @return {String} The HTML fragment
     */
    applyTemplate : function(values){
        var me = this;

        return me.compiled ?
                me.compiled(values) :
                me.html.replace(me.re, function(m, name){
                    return values[name] !== undefined ? values[name] : "";
                });
    },

    /**
     * Sets the HTML used as the template and optionally compiles it.
     * @param {String} html
     * @param {Boolean} compile (optional) True to compile the template (defaults to undefined)
     * @return {Ambow.Template} this
     */
    set : function(html, compile){
        var me = this;
        me.html = html;
        me.compiled = null;
        return compile ? me.compile() : me;
    },

    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ambow.Template} this
     */
    compile : function(){
        var me = this,
            sep = Ambow.isGecko ? "+" : ",";

        function fn(m, name){
            name = "values['" + name + "']";
            return "'"+ sep + '(' + name + " == undefined ? '' : " + name + ')' + sep + "'";
        }

        eval("this.compiled = function(values){ return " + (Ambow.isGecko ? "'" : "['") +
             me.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +
             (Ambow.isGecko ?  "';};" : "'].join('');};"));
        return me;
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) as the first child of el.
     * @param {Mixed} el The contYx element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ambow.Element (defaults to undefined)
     * @return {HTMLElement/Ambow.Element} The new node or Element
     */
    insertFirst: function(el, values){
        return this.doInsert('afterBegin', el, values);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) before el.
     * @param {Mixed} el The contYx element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ambow.Element (defaults to undefined)
     * @return {HTMLElement/Ambow.Element} The new node or Element
     */
    insertBefore: function(el, values){
        return this.doInsert('beforeBegin', el, values);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) after el.
     * @param {Mixed} el The contYx element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ambow.Element (defaults to undefined)
     * @return {HTMLElement/Ambow.Element} The new node or Element
     */
    insertAfter : function(el, values){
        return this.doInsert('afterEnd', el, values);
    },

    /**
     * Applies the supplied <code>values</code> to the template and appends
     * the new node(s) to the specified <code>el</code>.
     * <p>For example usage {@link #Template see the constructor}.</p>
     * @param {Mixed} el The contYx element
     * @param {Object/Array} values
     * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
     * or an object (i.e. <code>{foo: 'bar'}</code>).
     * @param {Boolean} returnElement (optional) true to return an Ambow.Element (defaults to undefined)
     * @return {HTMLElement/Ambow.Element} The new node or Element
     */
    append : function(el, values){
        return this.doInsert('beforeEnd', el, values);
    },

    doInsert : function(where, el, values){
        var newNode = Ambow.DomHelper.insertHtml(where, el, this.applyTemplate(values));
        return newNode;
    },

    /**
     * Applies the supplied values to the template and overwrites the content of el with the new node(s).
     * @param {Mixed} el The contYx element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ambow.Element (defaults to undefined)
     * @return {HTMLElement/Ambow.Element} The new node or Element
     */
    overwrite : function(el, values){
        el.innerHTML = this.applyTemplate(values);
        return el.firstChild;
    }
};
/**
 * Alias for {@link #applyTemplate}
 * Returns an HTML fragment of this template with the specified <code>values</code> applied.
 * @param {Object/Array} values
 * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
 * or an object (i.e. <code>{foo: 'bar'}</code>).
 * @return {String} The HTML fragment
 * @member Ambow.Template
 * @method apply
 */
Ambow.Template.prototype.apply = Ambow.Template.prototype.applyTemplate;

/**
 * Creates a template from the passed element's value (<i>display:none</i> tYxarea, preferred) or innerHTML.
 * @param {String/HTMLElement} el A DOM element or its id
 * @param {Object} config A configuration object
 * @return {Ambow.Template} The created template
 * @static
 */
Ambow.Template.from = function(el, config){
    //el = Ambow.getDom(el);
    return new Ambow.Template(el.value || el.innerHTML, config || '');
};
Ambow.apply(Ambow.Template.prototype, {
    /**
     * @cfg {Boolean} disableFormats Specify <tt>true</tt> to disable format
     * functions in the template. If the template does not contain
     * {@link Ambow.util.Format format functions}, setting <code>disableFormats</code>
     * to true will reduce <code>{@link #apply}</code> time. Defaults to <tt>false</tt>.
     * <pre><code>
var t = new Ambow.Template(
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name} {value}&lt;/span&gt;',
    '&lt;/div&gt;',
    {
        compiled: true,      // {@link #compile} immediately
        disableFormats: true // reduce <code>{@link #apply}</code> time since no formatting
    }
);
     * </code></pre>
     * For a list of available format functions, see {@link Ambow.util.Format}.
     */
    disableFormats : false,
    /**
     * See <code>{@link #disableFormats}</code>.
     * @type Boolean
     * @property disableFormats
     */

    /**
     * The regular expression used to match template variables
     * @type RegExp
     * @property
     * @hide repeat doc
     */
    re : /\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
    argsRe : /^\s*['"](.*)["']\s*$/,
    compileARe : /\\/g,
    compileBRe : /(\r\n|\n)/g,
    compileCRe : /'/g,

    /**
     * Returns an HTML fragment of this template with the specified values applied.
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @return {String} The HTML fragment
     * @hide repeat doc
     */
    applyTemplate : function(values){
        var me = this,
            useF = me.disableFormats !== true,
            fm = Ambow.util.Format,
            tpl = me;

        if(me.compiled){
            return me.compiled(values);
        }
        function fn(m, name, format, args){
            if (format && useF) {
                if (format.substr(0, 5) == "this.") {
                    return tpl.call(format.substr(5), values[name], values);
                } else {
                    if (args) {
                        // quoted values are required for strings in compiled templates,
                        // but for non compiled we need to strip them
                        // quoted reversed for jsmin
                        var re = me.argsRe;
                        args = args.split(',');
                        for(var i = 0, len = args.length; i < len; i++){
                            args[i] = args[i].replace(re, "$1");
                        }
                        args = [values[name]].concat(args);
                    } else {
                        args = [values[name]];
                    }
                    return fm[format].apply(fm, args);
                }
            } else {
                return values[name] !== undefined ? values[name] : "";
            }
        }
        return me.html.replace(me.re, fn);
    },

    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ambow.Template} this
     * @hide repeat doc
     */
    compile : function(){
        var me = this,
            fm = Ambow.util.Format,
            useF = me.disableFormats !== true,
            sep = Ambow.isGecko ? "+" : ",",
            body;

        function fn(m, name, format, args){
            if(format && useF){
                args = args ? ',' + args : "";
                if(format.substr(0, 5) != "this."){
                    format = "fm." + format + '(';
                }else{
                    format = 'this.call("'+ format.substr(5) + '", ';
                    args = ", values";
                }
            }else{
                args= ''; format = "(values['" + name + "'] == undefined ? '' : ";
            }
            return "'"+ sep + format + "values['" + name + "']" + args + ")"+sep+"'";
        }

        // branched to use + in gecko and [].join() in others
        if(Ambow.isGecko){
            body = "this.compiled = function(values){ return '" +
                   me.html.replace(me.compileARe, '\\\\').replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn) +
                    "';};";
        }else{
            body = ["this.compiled = function(values){ return ['"];
            body.push(me.html.replace(me.compileARe, '\\\\').replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn));
            body.push("'].join('');};");
            body = body.join('');
        }
        eval(body);
        return me;
    },

    // private function used to call members
    call : function(fnName, value, allValues){
        return this[fnName](value, allValues);
    }
});
Ambow.Template.prototype.apply = Ambow.Template.prototype.applyTemplate;
Ambow.XTemplate = function(){
    Ambow.XTemplate.superclass.constructor.apply(this, arguments);

    var me = this,
        s = me.html,
        re = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/,
        nameRe = /^<tpl\b[^>]*?for="(.*?)"/,
        ifRe = /^<tpl\b[^>]*?if="(.*?)"/,
        execRe = /^<tpl\b[^>]*?exec="(.*?)"/,
        m,
        id = 0,
        tpls = [],
        VALUES = 'values',
        PARENT = 'parent',
        XINDEX = 'xindex',
        XCOUNT = 'xcount',
        RETURN = 'return ',
        WITHVALUES = 'with(values){ ';

    s = ['<tpl>', s, '</tpl>'].join('');

    while((m = s.match(re))){
        var m2 = m[0].match(nameRe),
            m3 = m[0].match(ifRe),
            m4 = m[0].match(execRe),
            exp = null,
            fn = null,
            exec = null,
            name = m2 && m2[1] ? m2[1] : '';

       if (m3) {
           exp = m3 && m3[1] ? m3[1] : null;
           if(exp){
               fn = new Function(VALUES, PARENT, XINDEX, XCOUNT, WITHVALUES + RETURN +(Ambow.util.Format.htmlDecode(exp))+'; }');
           }
       }
       if (m4) {
           exp = m4 && m4[1] ? m4[1] : null;
           if(exp){
               exec = new Function(VALUES, PARENT, XINDEX, XCOUNT, WITHVALUES +(Ambow.util.Format.htmlDecode(exp))+'; }');
           }
       }
       if(name){
           switch(name){
               case '.': name = new Function(VALUES, PARENT, WITHVALUES + RETURN + VALUES + '; }'); break;
               case '..': name = new Function(VALUES, PARENT, WITHVALUES + RETURN + PARENT + '; }'); break;
               default: name = new Function(VALUES, PARENT, WITHVALUES + RETURN + name + '; }');
           }
       }
       tpls.push({
            id: id,
            target: name,
            exec: exec,
            test: fn,
            body: m[1]||''
        });
       s = s.replace(m[0], '{xtpl'+ id + '}');
       ++id;
    }
    for(var i = tpls.length-1; i >= 0; --i){
        me.compileTpl(tpls[i]);
    }
    me.master = tpls[tpls.length-1];
    me.tpls = tpls;
};
Ambow.extend(Ambow.XTemplate, Ambow.Template, {
    // private
    re : /\{([\w\-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,
    // private
    codeRe : /\{\[((?:\\\]|.|\n)*?)\]\}/g,

    // private
    applySubTemplate : function(id, values, parent, xindex, xcount){
        var me = this,
            len,
            t = me.tpls[id],
            vs,
            buf = [];
        if ((t.test && !t.test.call(me, values, parent, xindex, xcount)) ||
            (t.exec && t.exec.call(me, values, parent, xindex, xcount))) {
            return '';
        }
        vs = t.target ? t.target.call(me, values, parent) : values;
        len = vs.length;
        parent = t.target ? values : parent;
        if(t.target && Ambow.isArray(vs)){
            for(var i = 0, len = vs.length; i < len; i++){
                buf[buf.length] = t.compiled.call(me, vs[i], parent, i+1, len);
            }
            return buf.join('');
        }
        return t.compiled.call(me, vs, parent, xindex, xcount);
    },

    // private
    compileTpl : function(tpl){
        var fm = Ambow.util.Format,
            useF = this.disableFormats !== true,
            sep = Ambow.isGecko ? "+" : ",",
            body;

        function fn(m, name, format, args, math){
            if(name.substr(0, 4) == 'xtpl'){
                return "'"+ sep +'this.applySubTemplate('+name.substr(4)+', values, parent, xindex, xcount)'+sep+"'";
            }
            var v;
            if(name === '.'){
                v = 'values';
            }else if(name === '#'){
                v = 'xindex';
            }else if(name.indexOf('.') != -1){
                v = name;
            }else{
                v = "values['" + name + "']";
            }
            if(math){
                v = '(' + v + math + ')';
            }
            if (format && useF) {
                args = args ? ',' + args : "";
                if(format.substr(0, 5) != "this."){
                    format = "fm." + format + '(';
                }else{
                    format = 'this.call("'+ format.substr(5) + '", ';
                    args = ", values";
                }
            } else {
                args= ''; format = "("+v+" === undefined ? '' : ";
            }
            return "'"+ sep + format + v + args + ")"+sep+"'";
        }

        function codeFn(m, code){
            // Single quotes get escaped when the template is compiled, however we want to undo this when running code.
            return "'" + sep + '(' + code.replace(/\\'/g, "'") + ')' + sep + "'";
        }

        // branched to use + in gecko and [].join() in others
        if(Ambow.isGecko){
            body = "tpl.compiled = function(values, parent, xindex, xcount){ return '" +
                   tpl.body.replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn).replace(this.codeRe, codeFn) +
                    "';};";
        }else{
            body = ["tpl.compiled = function(values, parent, xindex, xcount){ return ['"];
            body.push(tpl.body.replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn).replace(this.codeRe, codeFn));
            body.push("'].join('');};");
            body = body.join('');
        }
        eval(body);
        return this;
    },

    /**
     * Returns an HTML fragment of this template with the specified values applied.
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @return {String} The HTML fragment
     */
    applyTemplate : function(values){
        return this.master.compiled.call(this, values, {}, 1, 1);
    },

    /**
     * Compile the template to a function for optimized performance.  Recommended if the template will be used frequently.
     * @return {Function} The compiled function
     */
    compile : function(){return this;}

    /**
     * @property re
     * @hide
     */
    /**
     * @property disableFormats
     * @hide
     */
    /**
     * @method set
     * @hide
     */

});
/**
 * Alias for {@link #applyTemplate}
 * Returns an HTML fragment of this template with the specified values applied.
 * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
 * @return {String} The HTML fragment
 * @member Ambow.XTemplate
 * @method apply
 */
Ambow.XTemplate.prototype.apply = Ambow.XTemplate.prototype.applyTemplate;

/**
 * Creates a template from the passed element's value (<i>display:none</i> textarea, preferred) or innerHTML.
 * @param {String/HTMLElement} el A DOM element or its id
 * @return {Ambow.Template} The created template
 * @static
 */
Ambow.XTemplate.from = function(el){
    el = Ambow.getDom(el);
    return new Ambow.XTemplate(el.value || el.innerHTML);
};

//获取表单数据返回json格式
Ambow.getFormData = function(form){
	return Ambow.urlDecode(Ambow.serializeForm(form));
};

//ajax拦截
Ambow.Asyn = function(opt){
	if(opt.isGet){
		var params = opt.arg;
		$.get(params[0],params[1],params[2],params[3]);	
		return;
	}else if(opt.isGetJson){
		var params = opt.arg;
		$.getJSON(params[0],params[1],params[2],params[3]);	
		return;
	}
	$.ajax(opt);
}

/**
 * post请求
 * @param {} opt object 包含
 * url, String
 * params ,Object 参数对象
 * 
 * 
 */
Ambow.post = function(opt){
	Ambow.Asyn({
			type:'post',
			data: Ambow.encode(opt.params),
			dataType:"json",
			url:opt.url,
			contentType:'application/json;charset=UTF-8',
			success:opt.success||function(){},
			error:opt.error||function(){}
	})
};

/**
 * ajax请求
 * @param {} opt
 */
Ambow.ajax = function(opt){
	Ambow.Asyn(opt);
}

/**
 * get请求
 */
Ambow.get = function(){
	var opt ={
		isGet:true,
		arg:arguments
	};
	Ambow.Asyn(opt);
},

/**
 * get请求，返回json
 */
Ambow.getJSON = function(){
	var opt ={
		isGetJson:true,
		arg:arguments
	};
	Ambow.Asyn(opt);
}
Ambow.ns('App');
