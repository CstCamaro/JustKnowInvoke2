
	(function() {
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	  // The base Class implementation (does nothing)
	  this.Class = function(){};
	  
	  // Create a new Class that inherits from this class
	  Class.extend = function(prop) {
	    var _super = this.prototype;
	    
	    // Instantiate a base class (but only create the instance,
	    // don't run the init constructor)
	    initializing = true;
	    var prototype = new this();
	    initializing = false;
	    
	    // Copy the properties over onto the new prototype
	    for (var name in prop) {
	      // Check if we're overwriting an existing function
	      prototype[name] = typeof prop[name] == "function" && 
	        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
	        (function(name, fn){
	          return function() {
	            var tmp = this._super;
	            
	            // Add a new ._super() method that is the same method
	            // but on the super-class
	            this._super = _super[name];
	            
	            // The method only need to be bound temporarily, so we
	            // remove it when we're done executing
	            var ret = fn.apply(this, arguments);        
	            this._super = tmp;
	            
	            return ret;
	          };
	        })(name, prop[name]) :
	        prop[name];
	    }
	    
	    // The dummy class constructor
	    function Class() {
	      // All construction is actually done in the init method
	      if ( !initializing && this.init )
	        this.init.apply(this, arguments);
	    }
	    
	    // Populate our constructed prototype object
	    Class.prototype = prototype;
	    
	    // Enforce the constructor to be what we expect
	    Class.constructor = Class;

	    // And make this class extendable
	    Class.extend = arguments.callee;
	    
	    return Class;
	  };
}).call(this);

(function(e, t, n) {
	function i(e) {
        return e;
    }
    function s(e) {
        return decodeURIComponent(e.replace(r, " "));
    }
    var r = /\+/g, o = e.cookie = function(r, u, a) {
        if (u !== n) {
            a = e.extend({}, o.defaults, a), u === null && (a.expires = -1);
            if (typeof a.expires == "number") {
                var f = a.expires, l = a.expires = new Date();
                l.setDate(l.getDate() + f);
            }
            return u = o.json ? JSON.stringify(u) :String(u), t.cookie = [ encodeURIComponent(r), "=", o.raw ? u :encodeURIComponent(u), a.expires ? "; expires=" + a.expires.toUTCString() :"", a.path ? "; path=" + a.path :"", a.domain ? "; domain=" + a.domain :"", a.secure ? "; secure" :"" ].join("");
        }
        var c = o.raw ? i :s, h = t.cookie.split("; ");
        for (var p = 0, d = h.length; p < d; p++) {
            var v = h[p].split("=");
            if (c(v.shift()) === r) {
                var m = c(v.join("="));
                return o.json ? JSON.parse(m) :m;
            }
        }
        return null;
    };
    o.defaults = {}, e.removeCookie = function(t, n) {
        return e.cookie(t) !== null ? (e.cookie(t, null, n), !0) :!1;
    };
})(jQuery, document);

(function($){
	/*
	 * ! artTemplate - Template Engine https://github.com/aui/artTemplate
	 * Released under the MIT, BSD, and GPL Licenses
	 */

	/**
	 * 模板引擎路由函数 若第二个参数类型为 Object 则执行 render 方法, 否则 compile 方法
	 * 
	 * @name template
	 * @param {String}
	 *            模板ID (可选)
	 * @param {Object,
	 *            String} 数据或者模板字符串
	 * @return {String, Function} 渲染好的HTML字符串或者渲染方法
	 */
	var template = function (id, content) {
	    return template[
	    typeof content === 'object' ? 'render' : 'compile'
	    ].apply(template, arguments);
	};

	(function (exports, global) {
	    // 'use strict';
	    exports.version = '2.0.1'; 
	    exports.openTag = '<%';     // 设置逻辑语法开始标签
	    exports.closeTag = '%>';    // 设置逻辑语法结束标签
	    exports.isEscape = true;    // HTML字符编码输出开关
	    exports.isCompress = false; // 剔除渲染后HTML多余的空白开关
	    exports.parser = null;      // 自定义语法插件接口

	/**
	 * 渲染模板
	 * 
	 * @name template.render
	 * @param {String}
	 *            模板ID
	 * @param {Object}
	 *            数据
	 * @return {String} 渲染好的HTML字符串
	 */
	    exports.render = function (id, data) {

	        var cache = _getCache(id);
	    
	        if (cache === undefined) {

	            return _debug({
	                id: id,
	                name: 'Render Error',
	                message: 'No Template'
	            });
	        }
	        return cache(data); 
	    };

	/**
	 * 编译模板 2012-6-6: define 方法名改为 compile, 与 Node Express 保持一致, 感谢 TooBug 提供帮助!
	 * 
	 * @name template.compile
	 * @param {String}
	 *            模板ID (可选)
	 * @param {String}
	 *            模板字符串
	 * @return {Function} 渲染方法
	 */
	    exports.compile = function (id, source) {
	    
	        var params = arguments;
	        var isDebug = params[2];
	        var anonymous = 'anonymous';
	    
	        if (typeof source !== 'string') {
	            isDebug = params[1];
	            source = params[0];
	            id = anonymous;
	        }

	        try {
	        
	            var Render = _compile(source, isDebug);
	        
	        } catch (e) {
	    
	            e.id = id || source;
	            e.name = 'Syntax Error';

	            return _debug(e);
	        }
	    
	        function render (data) {
	        
	            try {
	            
	                return new Render(data) + '';
	            
	            } catch (e) {
	            
	                if (!isDebug) {
	                    return exports.compile(id, source, true)(data);
	                }

	                e.id = id || source;
	                e.name = 'Render Error';
	                e.source = source;
	            
	                return _debug(e);
	            
	            }
	        }
	    

	        render.prototype = Render.prototype;
	        render.toString = function () {
	            return Render.toString();
	        };
	    
	    
	        if (id !== anonymous) {
	            _cache[id] = render;
	        }
	    
	        return render;

	    };


	/**
	 * 添加模板辅助方法
	 * 
	 * @name template.helper
	 * @param {String}
	 *            名称
	 * @param {Function}
	 *            方法
	 */
	    exports.helper = function (name, helper) {
	        exports.prototype[name] = helper;
	    };

	/**
	 * 模板错误事件
	 * 
	 * @name template.onerror
	 * @event
	 */
	    exports.onerror = function (e) {
	        var content = '[template]:\n'
	        + e.id
	        + '\n\n[name]:\n'
	        + e.name;

	        if (e.message) {
	            content += '\n\n[message]:\n'
	            + e.message;
	        }
	    
	        if (e.line) {
	            content += '\n\n[line]:\n'
	            + e.line;
	            content += '\n\n[source]:\n'
	            + e.source.split(/\n/)[e.line - 1].replace(/^[\s\t]+/, '');
	        }
	    
	        if (e.temp) {
	            content += '\n\n[temp]:\n'
	            + e.temp;
	        }
	    
	        if (global.console) {
	            console.error(content);
	        }
	    };

	    /**
     * 判断url是否合法
     * 
     * @param string url 要判断的url
     * @return boolen
     * @author elianlin@tencent.com
     * @time 2013-07-31
     */
    $.isUrl = function(url) {
    	if ($.type(url) !== "string") return false;
    	
    	var urlArr = url.split("?");
    	
    	if(urlArr.length < 1) return false;
    	
        var regexStr = "^(https|http)://"				//协议
                + "("
	                + "([0-9]{1,3}\\.){3}[0-9]{1,3}" 	//IP形式的URL
	                + "|" 
	                + "(([\\w-]+)\\.)+[a-zA-Z]{2,6}" 	//域名
	                + "|" 
	                + "localhost" 						//本机	                
                + ")" 
                + "(:[0-9]{1,4})?" 						//端口
	            + "(/[\\w-]+)*/?"						//路径
	            + "(/[\\w-]+\\.[\\w-]{1,5})?$";			//文件
        
        var reg = new RegExp(regexStr);
        if (!reg.test(urlArr[0])) return false;
        return true;
    };

	    // 编译好的函数缓存
	    var _cache = {};


	    // 获取模板缓存
	    var _getCache = function (id) {

	        var cache = _cache[id];
	    
	        if (cache === undefined && 'document' in global) {
	            var elem = document.getElementById(id);
	        
	            if (elem) {
	                var source = elem.value || elem.innerHTML;
	                return exports.compile(id, source.replace(/^\s*|\s*$/g, ''));
	            }
	        
	        } else if (_cache.hasOwnProperty(id)) {
	    
	            return cache;
	        }
	    };



	    // 模板调试器
	    var _debug = function (e) {

	        exports.onerror(e);
	    
	        function error () {
	            return error + '';
	        }
	    
	        error.toString = function () {
	            return '{Template Error}';
	        };
	    
	        return error;
	    };



	    // 模板编译器
	    var _compile = (function () {


	        // 辅助方法集合
	        exports.prototype = {
	            $render: exports.render,
	            $escape: function (content) {

	                return typeof content === 'string'
	                ? content.replace(/&(?![\w#]+;)|[<>"']/g, function (s) {
	                    return {
	                        "<": "&#60;",
	                        ">": "&#62;",
	                        '"': "&#34;",
	                        "'": "&#39;",
	                        "&": "&#38;"
	                    }
	                    [s];
	                })
	                : content;
	            },
	            $string: function (value) {

	                if (typeof value === 'string' || typeof value === 'number') {

	                    return value;

	                } else if (typeof value === 'function') {

	                    return value();

	                } else {

	                    return '';

	                }

	            }
	        };


	        var arrayforEach = Array.prototype.forEach || function (block, thisObject) {
	            var len = this.length >>> 0;
	        
	            for (var i = 0; i < len; i++) {
	                if (i in this) {
	                    block.call(thisObject, this[i], i, this);
	                }
	            }
	        
	        };


	        // 数组迭代
	        var forEach = function (array, callback) {
	            arrayforEach.call(array, callback);
	        };


	        // 静态分析模板变量
	        var KEYWORDS =
	        // 关键字
	        'break,case,catch,continue,debugger,default,delete,do,else,false'
	        + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
	        + ',throw,true,try,typeof,var,void,while,with'
	        
	        // 保留字
	        + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
	        + ',final,float,goto,implements,import,int,interface,long,native'
	        + ',package,private,protected,public,short,static,super,synchronized'
	        + ',throws,transient,volatile'
	        
	        // ECMA 5 - use strict
	        + ',arguments,let,yield'

	        + ',undefined';
	        var REMOVE_RE = /\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g;
	        var SPLIT_RE = /[^\w$]+/g;
	        var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
	        var NUMBER_RE = /\b\d[^,]*/g;
	        var BOUNDARY_RE = /^,+|,+$/g;
	        var getVariable = function (code) {

	            code = code
	            .replace(REMOVE_RE, '')
	            .replace(SPLIT_RE, ',')
	            .replace(KEYWORDS_RE, '')
	            .replace(NUMBER_RE, '')
	            .replace(BOUNDARY_RE, '');

	            code = code ? code.split(/,+/) : [];

	            return code;
	        };


	        return function (source, isDebug) {
	        
	            var openTag = exports.openTag;
	            var closeTag = exports.closeTag;
	            var parser = exports.parser;

	        
	            var code = source;
	            var tempCode = '';
	            var line = 1;
	            var uniq = {
	                $data:true,
	                $helpers:true,
	                $out:true,
	                $line:true
	            };
	            var helpers = exports.prototype;
	            var prototype = {};

	        
	            var variables = "var $helpers=this,"
	            + (isDebug ? "$line=0," : "");

	            var isNewEngine = ''.trim;// '__proto__' in {}
	            var replaces = isNewEngine
	            ? ["$out='';", "$out+=", ";", "$out"]
	            : ["$out=[];", "$out.push(", ");", "$out.join('')"];

	            var concat = isNewEngine
	            ? "if(content!==undefined){$out+=content;return content}"
	            : "$out.push(content);";
	              
	            var print = "function(content){" + concat + "}";

	            var include = "function(id,data){"
	            +     "if(data===undefined){data=$data}"
	            +     "var content=$helpers.$render(id,data);"
	            +     concat
	            + "}";
	        
	        
	            // html与逻辑语法分离
	            forEach(code.split(openTag), function (code, i) {
	                code = code.split(closeTag);
	            
	                var $0 = code[0];
	                var $1 = code[1];
	            
	                // code: [html]
	                if (code.length === 1) {
	                
	                    tempCode += html($0);
	             
	                // code: [logic, html]
	                } else {
	                
	                    tempCode += logic($0);
	                
	                    if ($1) {
	                        tempCode += html($1);
	                    }
	                }
	            

	            });
	        
	            code = tempCode;
	            // 调试语句
	            if (isDebug) {
	                code = 'try{' + code + '}catch(e){'
	                +       'e.line=$line;'
	                +       'throw e'
	                + '}';
	            }
	        
	            code = "'use strict';"
	            + variables + replaces[0] + code
	            + 'return new String(' + replaces[3] + ')';
	        
	            try {
	                var Render = new Function('$data', code);
	                Render.prototype = prototype;

	                return Render;
	            } catch (e) {
	                e.temp = 'function anonymous($data) {' + code + '}';
	                throw e;
	            }

	        
	            // 处理 HTML 语句
	            function html (code) {
	            
	                // 记录行号
	                line += code.split(/\n/).length - 1;

	                if (exports.isCompress) {
	                    code = code.replace(/[\n\r\t\s]+/g, ' ');
	                }
	            
	                code = code
	                // 单引号与反斜杠转义(因为编译后的函数默认使用单引号，因此双引号无需转义)
	                .replace(/('|\\)/g, '\\$1')
	                // 换行符转义(windows + linux)
	                .replace(/\r/g, '\\r')
	                .replace(/\n/g, '\\n');
	            
	                code = replaces[1] + "'" + code + "'" + replaces[2];
	            
	                return code + '\n';
	            }
	        
	        
	            // 处理逻辑语句
	            function logic (code) {

	                var thisLine = line;
	           
	                if (parser) {
	            
	                    // 语法转换插件钩子
	                    code = parser(code);
	                
	                } else if (isDebug) {
	            
	                    // 记录行号
	                    code = code.replace(/\n/g, function () {
	                        line ++;
	                        return '$line=' + line +  ';';
	                    });
	                
	                }
	            
	            
	                // 输出语句. 转义: <%=value%> 不转义:<%==value%>
	                if (code.indexOf('=') === 0) {

	                    var isEscape = code.indexOf('==') !== 0;

	                    code = code.replace(/^=*|[\s;]*$/g, '');

	                    if (isEscape && exports.isEscape) {
	                        // 转义处理，但排除辅助方法
	                        var name = code.replace(/\s*\([^\)]+\)/, '');
	                        if (
	                            !helpers.hasOwnProperty(name)
	                            && !/^(include|print)$/.test(name)
	                            ) {
	                            code = '$escape($string(' + code + '))';
	                        }
	                    } else {
	                        code = '$string(' + code + ')';
	                    }
	                    code = replaces[1] + code + replaces[2];
	                }
	                if (isDebug) {
	                    code = '$line=' + thisLine + ';' + code;
	                }
	                getKey(code);
	                return code + '\n';
	            }
	            // 提取模板中的变量名
	            function getKey (code) {
	                code = getVariable(code);
	                // 分词
	                forEach(code, function (name) {
	                    // 除重
	                    if (!uniq.hasOwnProperty(name)) {
	                        setValue(name);
	                        uniq[name] = true;
	                    }
	                });
	            }
	            // 声明模板变量
	            // 赋值优先级:
	            // 内置特权方法(include, print) > 私有模板辅助方法 > 数据 > 公用模板辅助方法
	            function setValue (name) {
	                var value;
	                if (name === 'print') {
	                    value = print;
	                } else if (name === 'include') {
	                    prototype['$render'] = helpers['$render'];
	                    value = include;
	                } else {
	                    value = '$data.' + name;
	                    if (helpers.hasOwnProperty(name)) {
	                        prototype[name] = helpers[name];
	                        if (name.indexOf('$') === 0) {
	                            value = '$helpers.' + name;
	                        } else {
	                            value = value
	                            + '===undefined?$helpers.' + name + ':' + value;
	                        }
	                    }
	                }
	                variables += name + '=' + value + ',';
	            }
	        };
	    })();
	})(template, this);


	// RequireJS || SeaJS
	if (typeof define === 'function') {
	    define(function(require, exports, module) {
	        module.exports = template; 
	    });
	// NodeJS
	} else if (typeof exports !== 'undefined') {
	    module.exports = template;
	}
	
    // "use strict";
    $.template = {
        cache: {},
        _render: function(id, data, callback){
            var html = template.render(id, data);
            if (callback && typeof callback == 'function') {
                callback(html);
            }
        },
        _compile: function(tpl, data, callback){
            var render = template.compile(tpl);
            var html = render(data);
            if (callback && typeof callback == 'function') {
                callback(html);
            }
        },
        runURL: function(url, data, callback, async){
            var that = this;
            async = (async === undefined) ? true : async;
            // 请求模板url
            if (!that.cache[url]) {
                that.cache[url] = null;
                $.ajax({
                    url: url,
                    success: function(res){
                        that.cache[url] = res;
                        that._compile(that.cache[url], data, callback);
                    },
                    async : async
                });
            }
            else {
                that._compile(that.cache[url], data, callback);
            }
        },
        runSource: function(source, data, callback){
            this._compile(source,data,callback);
        },
        runId: function(id, data, callback){
            this._render(id,data,callback);
        },
        clearCache: function(){
            this.cache = {};
        },
        artTemplate: template
    };
})(jQuery);

( function($) {
	//"use strict";
	
	$.browserInfo = function(){
		var _getFlashInfo = function(){
			var f = "no flash";
			var n = navigator;
			if (n.plugins && n.plugins.length) {
			  	for (var ii = 0; ii < n.plugins.length; ii++) {
			   		if (n.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
			    		f = n.plugins[ii].description.split('Shockwave Flash ')[1];
			    		break;
			   		}
				}
			}else if (window.ActiveXObject) {
			  	for (var ii = 10; ii >= 2; ii--) {
			   		try {
			    		var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
			    		if (fl) {
			     			f = ii + '.0';
			     			break;
			    		}
			   		} catch (e) {
			   		
			   		}
			 	}
			}
			return f;
		}

		var _getBrowser = function(){
			var b = ['safari', 'opera', 'msie', 'chrome', 'mozilla'];
			for(var i in b){
				if($.browser[b[i]]){
					if(b[i] == 'mozilla') return 'firefox';
					return b[i];
				}
			}
		}
		
		var _getType = function(){
			var type = 'pc';
			var u = navigator.userAgent.toLowerCase();
			if(u.indexOf('mobile') > -1){
				type = 'mobile';
			}else if(u.indexOf('iphone') > -1){
				type = 'mobile';
			}else if(u.indexOf('ipad') > -1){
				type = 'mobile';
			}else if(u.indexOf('phone') > -1){
				type = 'mobile';
			}else if(u.indexOf('blackberry') > -1){
				type = 'mobile';
			}else if(u.indexOf('meego') > -1){
				type = 'mobile';
			}else if(u.indexOf('rim') > -1){
				type = 'mobile';
			}
			return type;			
		}
		
		var _getOs = function(){
			if("mobile" == _getType()){
				var u = navigator.userAgent.toLowerCase();
				if(u.indexOf('android') > -1 || u.indexOf('linux') > -1){
					return 'android';
				}
				if(u.indexOf('iphone') > -1 || u.indexOf('ipad') > -1){
					return 'ios';
				}
				return 'otherMobile';
			}else{
				return navigator.platform;
			}
		}

		return {
			type: _getType(),
			os: _getOs(),
			browser: _getBrowser(),
			version: $.browser.version,
			screen: window.screen.width + "x" + window.screen.height,
			screenWidth: window.screen.width,
			screenHeight: window.screen.height,
			flash: _getFlashInfo()
		}
	};
	
	$.Dialog = Class.extend({
        _$body: null,
        _tplFile: 'tpl.html',
        _isModify: false,
        _reOpen4Limit: 0,

		baseCfg: {
			cls: '',
			overlay: false,
            skin: 'blue',
			padding: 10,
            title: '',
			x: 'center',
			y: 'center',
            posFixed: false,
			rel: '',
			relPos: 'top',
			body: '',
			width: 400,
			height: 300,
            onOpen: null,
            onClose: null,
            autoClose: 0,
            closeBtn: true,
            fadeTime: 100,
            scope: null,
            buttons: [],
            overflow:'auto',
            zIndex: 1001,
            layoutZIndex: 1000,
            crossFrame: false
		},

		init: function(cfg){
			this.cfg = $.extend({}, this.baseCfg, cfg);
            if(this.cfg.rel){
                this.cfg.crossFrame = false;
            }
            this.createSetterMethod();
		},

        createSetterMethod: function(){
            var self = this;
            for(var key in this.baseCfg){
                (function(k){
                    var upperCaseKey = k.substr(0, 1).toUpperCase() + k.substr(1),
                        methodName = 'set' + upperCaseKey;
                    if(typeof self[methodName] != 'function') {
                        self[methodName] = function(val){
                            self.cfg[k] = val;
                            self._isModify = true;
                            return self;
                        };
                    }
                })(key);
            }
        },

        setCfg: function(cfg){
            $.extend(this.cfg, cfg);
            return this;
        },

		open: function(){
            if(!this._$body || this._isModify){
                this.close(true, true);
                this.create();
            }

            if(this.cfg.overlay){
                $.overlay.show({zIndex: this.cfg.layoutZIndex});
            }
            
            if(this.cfg.autoClose){
                this.bindAutoClose();
            }

            this.locate();
            var self = this;
            this._$body.fadeIn(this.cfg.fadeTime,function(){
                if(self.cfg.onOpen){
                    var scope = self.cfg.scope || self;
                    self.cfg.onOpen.call(scope);
                }
            });

            return this;
		},

        refresh: function(){
            this._isModify = true;
            if(this._$body){
                this._$body.remove();
                this._$body = null;
            }
            this.open();
            return this;
        },

        getDialog: function(){
            return this._$body;
        },

        create: function(){
            var self = this;
            this.createStyle();
            $.template.runSource($.Dialog.template(), this.cfg, function(html){
                self._$body = $(html);
                if(self._needCrossFrame()){
                    var $topBody = $(top.document).find('body');
                    // $topBody.append('<link rel="stylesheet" type="text/css" href="http://kuai.qq.com/gallop/res/dialog.css">');
                    $topBody.append(self._$body);
                }else{
                	// self._$body.append('<link rel="stylesheet" type="text/css" href="http://kuai.qq.com/gallop/res/dialog.css">');
                    self._$body.appendTo('body');
                }
            });

            this.bindEvent();
        },

        createStyle: function(){
            var style = {}, styleArr = [], contentStyleArr = [], contentHeight;
            style.display = 'none';
            if(this.cfg.width != 'auto')
                style.width = this.cfg.width + 'px';

            if(this.cfg.height != 'auto'){
                contentHeight = this.cfg.height;
                if(this.cfg.title)
                    contentHeight -= 30;
                if(this.cfg.buttons.length > 0)
                    contentHeight -= 40;
                contentHeight -= (this.cfg.padding * 2);
                contentStyleArr.push('height:' + contentHeight + 'px');
            }else{
                if(this.cfg.buttons.length > 0)
                    contentStyleArr.push('margin-bottom:40px');
            }
            
            if(this.cfg.height != 'auto')
                style.height = this.cfg.height + 'px';

            if(this.cfg.padding)
                contentStyleArr.push('padding:' + this.cfg.padding + 'px');

            if(this.cfg.zIndex)
                style['z-index'] = this.cfg.zIndex;

            for(var item in style){
                styleArr.push(item + ':' + style[item]);
            }
            styleArr.push('position:fixed');
            this.cfg.styleStr = styleArr.join(';');
            this.cfg.contentStyleStr = contentStyleArr.join(';');
        },

        bindEvent: function(){
            var self = this;
            if(!this._$body) return;
            this._$body.find('.dialog-btn-close').click(function(){
                self.close();
            });
            if(this.cfg.buttons.length > 0){
                this._$body.find('.dialog-btn').each(function(index){
                    var btnCfg = self.cfg.buttons[index],
                        clickCallback = btnCfg.click,
                        scope = self.cfg.scope || self;
                    $(this).click(function(e){
                        e.preventDefault();
                        clickCallback.call(scope, this);
                    });
                 });
            }
        },

        bindAutoClose: function(){
            var self = this;
            window.setTimeout(function(){
                self.close(true);
            }, this.cfg.autoClose);
        },

        locate: function(){
            if(!this._$body) return;
            var style = {},
                dialogWidth = this._$body.width();

            if(this.cfg.rel){
                this.locateForRel();
                return;
            }
            if(this._isIE6()) this.cfg.posFixed = false;

            if(this.cfg.posFixed)
                style.position = 'fixed';
            if(this.cfg.x !='center'){
                style.left = this.cfg.x + 'px';
            }else{
                var win = this._needCrossFrame() ? window.top : window;
                var winWidth = this.cfg.posFixed ? $(win).width() : $(win.document).find('body').width(),
                    left = (winWidth - dialogWidth) / 2;
                style.left = left + 'px';
            }
            if(this.cfg.y != 'center'){
                style.top = this.cfg.y + 'px';
            }else{
                var winHeight = $(win).height(),
                    bodyHeight = this._$body.height(),
                    top = (winHeight - bodyHeight) / 2;
                top = top > 0 ? top : 0;
                if(!this.cfg.posFixed)
                    top += $(document).scrollTop();
                style.top = top + 'px';
            }

            this._$body.css(style);
            if(this.cfg.overflow == 'hidden'){
                this._$body.find('.dialog-main').css({
                    overflow:'hidden'
                });
            }
        },

        locateForRel: function(){
            if(!this.cfg.rel) return;
            var $rel = $(this.cfg.rel),
                relWidth = $rel.width(),
                relHeight = $rel.height(),
                offset = $rel.offset(),
                bodyWidth = this._$body.width(),
                bodyHeight = this._$body.height(),
                targetPos = {};

            switch(this.cfg.relPos){
                case 'top':
                    targetPos.left = offset.left - Math.floor((bodyWidth - relWidth)/2);
                    targetPos.top = offset.top - bodyHeight - 12;
                    break;
                case 'bottom':
                    targetPos.left = offset.left - Math.floor((bodyWidth - relWidth)/2);
                    targetPos.top = offset.top + relHeight + 12;
                    break;
                case 'left':
                    targetPos.left = offset.left - bodyWidth - 12;
                    targetPos.top = offset.top - Math.floor((bodyHeight - relHeight)/2);
                    break;
                case 'right':
                    targetPos.left = offset.left + relWidth + 12;
                    targetPos.top = offset.top - Math.floor((bodyHeight - relHeight)/2);
                    break;
            }

            if(!this._checkEdgeLimit(targetPos)) return;

            targetPos.left += 'px';
            targetPos.top += 'px';
            this._$body.css(targetPos);
        },

        _checkEdgeLimit: function(pos){
            var relPos = this.cfg.relPos, 
                width = this._$body.width(),
                height = this._$body.height(),
                winWidth = $(document).width(),
                winHeight = $(document).height(),
                needReopen = false;
            if(relPos == 'top' && pos.top < 0){
                this.cfg.relPos = 'bottom';
                needReopen = true;
            }else if(relPos == 'bottom' && ((pos.top+height)>winHeight)){
                this.cfg.relPos = 'top';
                // needReopen = true;
            }else if(relPos == 'left' && pos.left < 0){
                this.cfg.relPos = 'right';
                needReopen = true; 
            }else if(relPos == 'right' && ((pos.left+width)>winWidth)){
                this.cfg.relPos = 'left';
                needReopen = true;
            }

            if(needReopen && this._reOpen4Limit===0){
                this._reOpen4Limit++;
                console.info(this._reOpen4Limit);
                this.close(true, true);
                this.open();
                return false;
            }else{
                this._reOpen4Limit = 0;
            }
            return true;
        },

        close: function(destroy, direct){
            if(this.cfg.onClose && !direct){
                var scope = this.cfg.scope || this;
                this.cfg.onClose.call(scope);
            }
            if(this.cfg.overlay){
                $.overlay.hide();
            }
            if(!this._$body) return;
            if(direct){
                this._$body.remove();
                this._$body = null;
            }else{
                this._$body.fadeOut(this.cfg.fadeTime);
                if(destroy){
                    var self = this;
                    window.setTimeout(function(){
                        if(self._$body){
                            self._$body.remove();
                            self._$body = null;
                        }
                    }, this.cfg.fadeTime);
                }
            }
        },

        _isIE6: function(){
            return  $.browserInfo.browser == "msie" && $.browserInfo.browser.version == '6.0';
        },

        _needCrossFrame: function(){
            return this.cfg.crossFrame && top !== window;
        }
		
	});	

    $.Dialog.closeAll = function(){
        $('.dialog, .dialog-overlay').hide();
    };

    // 鏂逛究鎷煎瓧绗︿覆鐨勫皬宸ュ叿
    function SimpleTemplate(){ this.parts = []; };
    SimpleTemplate.prototype = {
        _: function() {
            this._pushAll(arguments);
            return this;
        },
        toString: function() {
            return this.parts.join('');
        },
        _pushAll: function(arr) {
            for (var i=0,len=arr.length; i<len; i++) {
                this.parts.push(arr[i]);
            }
        }
    };


    $.Dialog.template = function(){
        var t = new SimpleTemplate();
        t._('<div class="dialog <%if(skin){%>dialog-<%=skin%><%}%> <%=cls%>" style="<%=styleStr%>">')
            ._('<%if(title){%>')
            ._('<div class="dialog-header">')
                ._('<div class="dialog-title"><%=title%></div>')
            ._('</div>')
            ._('<%}%>')
            ._('<div class="dialog-main" style="<%=contentStyleStr%>" >')
                ._('<%==body%>')
            ._('</div>')
            ._('<%if(buttons.length > 0){%>')
            ._('<div class="dialog-footer">')
                ._('<%for(var i=0,len=buttons.length; i<len; i++){%><a href="#" class="dialog-btn <%=buttons[i].cls%>"><%=buttons[i].text%></a><%}%>')
            ._('</div>')
            ._('<%}%>')

            ._('<%if(closeBtn === true){%>')
                ._('<a class="dialog-btn-close"><i></i></a>')
            ._('<%}%>')
            ._('<%if(rel){%>')
                ._('<span class="dialog-arrow-<%=relPos%>"></span>')
            ._('<%}%>')
        ._('</div>');
        return t.toString();
    };

	/**
	 * 判断是否qq.com的域
	 */
	var _checkDomain = function(){
		var domain = document.domain;
		if(domain.indexOf("qq.com") < 0){
			throw new Error('The domain is not "qq.com"!');
		}else{
			document.domain = "qq.com";
		}
	};

	/**
	 * 从cookie里获取skey
	 */
	// var _getSkey = function(LLogin){
	// 	if(LLogin){
	// 		var skey = $.trim($.cookie('skey') || $.cookie('lskey'));
	// 	}else{
	// 		var skey = $.trim($.cookie('skey'));
	// 	}
	//
	// 	if(!skey) return null;
	// 	return skey;
	// };
	var _getSkey = function(LLogin){
		if(LLogin){
			var skey = $.trim($.cookie('101485576_access_token'));
		}else{
			var skey = $.trim($.cookie('101485576_access_token'));
		}

		if(!skey) return null;
		return skey;
	};

	/**
	 * 从cookie里获取uin
	 */
	// var _getUin = function(LLogin){
	// 	if(LLogin){
	// 		var uin = $.cookie('uin') || $.cookie('luin');
	// 	}else{
	// 		var uin = $.trim($.cookie('uin'));
	// 	}
	//
	// 	if(!uin) return 0;
	//
	// 	// 去除首位“o”
	// 	uin = uin.substr(1);
	//
	// 	// 字符串转数字
	// 	uin++;
	// 	uin--;
	// 	if(uin < 10000 || uin > 4294967295) return 0;
	// 	return uin;
	// };
	var _getUin = function(LLogin){
		if(LLogin){
			var uin = $.cookie('101485576_openid');
		}else{
			var uin = $.trim($.cookie('101485576_openid'));
		}

		if(!uin) return 0;
		return uin;
	};

	/**
	 * 退出登录
	 */
	var _removeLogin = function(){
		var _cookieOpt = {domain: "qq.com", path: "/"};
		$.removeCookie("uin", _cookieOpt);
		$.removeCookie("skey", _cookieOpt);
		$.removeCookie("luin", _cookieOpt);
		$.removeCookie("lskey", _cookieOpt);
	}
	
	$.overlay = {
	        cfg: {
	            lockScroll: false,
	            zIndex: 1000
	        },
	        show: function(cfg){
	            $.extend(this.cfg, cfg);
	            if(!this.$overlay){
	                this.$overlay = $('<div class="dialog-overlay"></div>').appendTo('body');
	                if($.browserInfo.browser == "msie" && $.browserInfo.browser.version == '6.0'){
	                    this.$overlay.height($(document).height()-5);

	                    $('.dialog-overlay').bgiframe();
	                }
	            }
	            if(this.cfg.zIndex)
	                this.$overlay.css({
	                	'z-index':this.cfg.zIndex,
	                	'height':' 100%',
	                	'position':'fixed',
	                	'bottom':'0px',
	                	'width':'100%',
	                	'background-color': "rgb(0,0,0)",
	                	'opacity':'0.6',
	                	'filter':'alpha(opacity=60)'
	                });
	            this.$overlay.show();

	            if(this.cfg.lockScroll){
	                this.$body = $('html');
	                var paddingRight = (this.$body[0].scrollHeight > $(window).height()) ? 18 : 0;
	                this.$body.css({
	                    overflow: "hidden",
	                    paddingRight: paddingRight + 'px'
	                });
	            }
	        },

	        hide: function(){
	            this.$overlay && this.$overlay.hide();

	            if(this.cfg.lockScroll){
	                this.$body.css({
	                    overflow: 'auto',
	                    paddingRight: 0
	                });
	            }
	        }
	    };
	
	/** ===== iFrame extends Dialog ============================== */
    $.Iframe = $.Dialog.extend({
        iframeCfg: {
            url: '',
            title: 'iFrame',
            width: 400,
            height: 400,
            maxHeight: 600,
            onlyIframe: false,
            showLoading: false
        },

        init: function(cfg){
            var cfg = this._adjustCfg(cfg);
            this._super(cfg);
            this.cfg.crossFrame = false;
        },

        _adjustCfg: function(cfg){
            var cfg = $.extend({}, this.iframeCfg, cfg),
                self = this;
            if(!cfg.url){
                throw '璇疯緭鍏Frame url';
            }
            if(cfg.onlyIframe){
                cfg.skin = 'empty';
                cfg.title = '';
                cfg.padding = 0;
                cfg.buttons = [];
                cfg.closeBtn = false;
            }
            var id = 'dialog-iframe'+new Date().getTime();
            window.ptlogin2_onResize = window.onloadCallback = function(width,height){
				window.iframe_width = (!!width ? width : '622');
				window.iframe_height = (!!height ? height : '368');
                setTimeout(function(){
                    self.hideIframeLoading();
                    self._$body && self._$body.trigger('iframeloaded');
                },100);
            }
            var iframeStr = '<iframe id="'+id+'" class="dialog-iframe" onload="onloadCallback()" src="' + cfg.url + '#'+ new Date().getTime() +'"  width="' + cfg.width +'" height="' + cfg.height +'" frameborder="0"></iframe>';
            cfg.body = iframeStr;
            
            cfg.padding = 0;
            if(cfg.height != 'auto'){
                cfg.height = parseInt(cfg.height,10);
                cfg.height += 4;
                if(cfg.title)
                    cfg.height += 30;
                if(cfg.buttons && cfg.buttons.length > 0)
                    cfg.height += 40;
            }

            cfg.onOpen = function(){
                if((cfg.width == 'auto' || cfg.height == 'auto') && cfg.showLoading){
                    self.showIframeLoading();
                }

// this._$body.find('#'+id).load(function(){
// self.hideIframeLoading();
// self._$body.trigger('iframeloaded');
// });

                this._$body.bind('iframeloaded', function(){
                    if(cfg.width == 'auto'){
                        self.adjustSize('width');
                    }
                    if(cfg.height == 'auto'){
                        self.adjustSize('height');
                    }
                });
            };
            
            return cfg;
        },

        adjustSize: function(type){
            var type = type || 'height';
            var iframe = this._$body.find('.dialog-iframe')[0];
			//console.log(iframe.contentDocument);
            var iframeDoc = iframe.contentDocument || iframe.Document,
			//	iframeHeight = iframeDoc.body.scrollHeight,  // 涔嬪墠涓嶇煡涓轰綍鍔�40
            //  iframeWidth = $(iframeDoc).width(),
                iframeHeight = window.iframe_height,  // 涔嬪墠涓嶇煡涓轰綍鍔�40
                iframeWidth = window.iframe_width;
                
            if(type == 'height'){
                if(this.cfg.maxHeight && this.cfg.maxHeight < iframeHeight){
                    iframeHeight = this.cfg.maxHeight;
                }
                $(iframe).height(iframeHeight);
            }

            if(type == 'width'){
                if(this.cfg.maxWidth && this.cfg.maxWidth < iframeWidth){
                    iframeWidth = this.cfg.maxWidth;
                }
                $(iframe).width(iframeWidth);
            }
            this.locate();
        },

        showIframeLoading: function(){
            this.$iframeLoading = $('<div class="dialog-iframe-loading"><span>Loading...</span></div>').appendTo(this._$body.find('.dialog-main'));
        },

        hideIframeLoading: function(){
            this.$iframeLoading && this.$iframeLoading.remove();
        }        
    });
    
    $.iframe = function(cfg){
        return new $.Iframe(cfg).open();
    };
	
	/**
	 * QQ登录
	 */
	$.loginQQ = $.qqLogin = function(options){

		_checkDomain();
		_removeLogin();
		var _proxy = "https://appmedia.qq.com/media/act/common/loginsucc.html";
		var _loginType = "dialog";
		var opt = {
			appid: "4007203",
			type: 'auto',
			isMask: true,
			jumpTo: null,
			zIndex: 1000000001,
			callback: null,
            closeCallback: function(){}
		}

		opt = $.extend({}, opt, options || {});

		if(opt.type === "page" || (opt.type === "auto" && $.browserInfo.type === "mobile")){
			_loginType = "page";
		}

		if(_loginType === "dialog"){
			// var loginUrl = "https://ui.ptlogin2.qq.com/cgi-bin/login?" +
			// 			"f_url=loginerroralert&style=0&target=self&appid="  + opt.appid + "&s_url=" + _proxy;

            var loginUrl="/login/auth";
			if(opt.isMask){
				$.overlay.show();
			}
			var loginIframe = $.iframe({
            	url: loginUrl,
            	width: '622',
            	height: '368',
            	zIndex: opt.zIndex,
            	onlyIframe: true
          	})

          	window.ptlogin2_onClose = function(){
          		loginIframe.close(true);
          		$.overlay.hide();
                opt.closeCallback();
          	};

          	window.ptlogin2_callback = function(){
          		
          		
				/* 如果有配置登录后跳转则优先支持链接跳转 */
				if($.type(opt.jumpTo) === "string" && /^http[s]?:\/\//.test(opt.jumpTo)){
					try{
						top.location.href = opt.jumpTo;
					}catch(e){
						window.location.href = opt.jumpTo;
					}			
					return true;
				}

				/* 调用回调 */
				if($.isFunction(opt.callback)){
					opt.callback($.getQQ());
					return true;
				}

				/* 默认刷新页面 */
				try{
					top.location.reload();
				}catch(e){
					window.location.reload();
				}
          	}
		}
		
		if(_loginType === "page"){
			var browser = $.browserInfo;
			var loginUrl = "http://ui.ptlogin2.qq.com/cgi-bin/login";
			var hln_css = "http://appmedia.qq.com/media/jslib/1.5/res/ptlogin/pic_s.png";
			var style = 9;
			var hide_close_icon = 1;			
			var s_url = "";

			if(browser.os == "ios"){
				style = 8;
				hide_close_icon = 0;
			}
			if(browser.os == "android" || browser.os == "otherMobile"){
				style = 9;
				hide_close_icon = 0;
			}

			if($.isUrl(opt.jumpTo)){
				s_url = encodeURIComponent(opt.jumpTo);
			}else{
				try{
					s_url = encodeURIComponent(top.location.href);
				}catch(e){
					s_url = encodeURIComponent(window.location.href);
				}
			}

			loginUrl += '?style=' + style + '&appid=' + opt.appid + '&s_url=' + s_url + '&low_login=0&hln_css=' + hln_css + "&hide_close_icon=" + hide_close_icon;

			try{
				top.location.href = loginUrl;
			}catch(e){
				window.location.href = loginUrl;
			}					
		}		
	};

	/**
	 * 退出QQ登录
	 */
	$.logoutQQ = $.qqLogout = function(options){

		_checkDomain();
		_removeLogin();
		
		var opt = {
			'jumpTo': null,
			'callback': null
		}
		opt = $.extend({}, opt, options || {});

		/* 如果有配置退出后跳转则优先支持链接跳转 */
		if($.isUrl(opt.jumpTo)){
			try{
				top.location.href = opt.jumpTo;
			}catch(e){
				window.location.href = opt.jumpTo;
			}			
			return true;
		}

		/* 调用回调 */
		if($.isFunction(opt.callback)){
			opt.callback();
			return true;
		}

		/* 默认刷新页面 */
		try{
			top.location.reload();
		}catch(e){
			window.location.reload();
		}				
	};

	/**
	 * 判断是否登录，只验强登录
	 */
	$.isLoginQQ = function(){
		
		_checkDomain();
		
		var uin  = _getUin();
		var skey = _getSkey();
		if (uin && skey){
            return true;
		}
		return false;		
	};
	
	/**
	 * 判断是否登录，包括弱登录
	 */
	$.isLLoginQQ = function(){
		
		_checkDomain();
		
		var uin  = _getUin(true);
		var skey = _getSkey(true);
		if (uin > 0 && skey) return true;
		return false;
	}

	/**
	 * 获取当前登录的QQ号
	 */
	$.getQQ = function(){

		_checkDomain();

		return _getUin(true);
	};		

	/**
	 * 获取防csrf的token
	 */
	$.getCSRFToken = function(){

		_checkDomain();
		
		var skey = _getSkey(true);
		
		if(!skey) skey = '';
		
        var hash = 5381;
        for(var i = 0, len = skey.length; i < len; ++i){
            hash += (hash<<5&0x7fffffff) + skey.charAt(i).charCodeAt();
        }
        return hash & 0x7fffffff;
	}
})( window.jQuery );

window.loginQQ = function() {
	$.loginQQ();
}
window.logoutQQ = function(cfg){
	$.logoutQQ(cfg);
}
window.isLoginQQ = function() {
	return $.isLoginQQ();
}