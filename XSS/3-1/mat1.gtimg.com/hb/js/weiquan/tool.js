(function (win){
'use strict'
	var listen = (function(){

		if(win.addEventListener){
			return function(ele,type,handler){
				ele.addEventListener(type,handler);
			};
		}else if(win.attachEvent){
			return function(ele,type,handler){
				ele.attachEvent('on'+type,handler);
			};
		}else{
			return function(ele,type,handler){
				ele['on'+type] = handler;
			};
		}

	})(),
		unlisten = (function(){
			if(win.removeEventListener){
				return function(ele,type,handler){
					ele.removeEventListener(type,handler);
				};
			}else if(win.detachEvent){
				return function(ele,type,handler){
					ele.detachEvent('on'+type,handler);
				};
			}else{
				return function(ele,type,handler){
					ele['on'+type] = null;
				}
			}
		})();

	function trim(str){
		return str.toString().replace(/(^\s+)|(\s+$)/ig,'');
	}
	function checkTel(tel){
		return /^1[34578]\d{9}$/ig.test(String(tel));
	}

	function contains(str,singleName){
		singleName = trim(singleName);
		var reg = new RegExp('(^'+singleName+'\\s+)|(\\s+'+singleName+'\\s+)|(\\s+'+singleName+'$)','g');
		return reg.test(str);
	}

	function remove(str,singleName){
		singleName = trim(singleName);
		var reg = new RegExp('(^'+singleName+'\\s+)|(\\s+'+singleName+'\\s+)|(\\s+'+singleName+'$)','g');
		return str.replace(reg,' ');
	}

	(function(){

		if('classList' in document.createElement('div')){
			win.containClass = function(ele,names){
				var list = ele.classList;
				return list.contains.apply(list,trim(names).split(/\s+/g));
			};
			win.addClass = function(ele,names){
				var list = ele.classList;
				list.add.apply(list,trim(names).split(/\s+/g));
			};
			win.removeClass = function(ele,names){
				var list = ele.classList;
				list.remove.apply(list,trim(names).split(/\s+/g));
			};
			win.toggleClass = function(ele,names){
				var list = ele.classList,
					nameArr = names.split(/\s+/g);
				for(var i = 0,len = nameArr.length; i < len; i++){
					if(!nameArr[i]){
						continue ;
					}
					list.toggle(nameArr[i]);
				}
			};
		}else{

			win.containClass = function(ele,names){
				var nameArr = names.split(/\s+/g),
					className = ele.className;
				for(var i = 0,len = nameArr.length; i < len; i++){
					if(!nameArr[i]){continue ;}
					if(!contains(className,nameArr[i])){
						return false;
					}
				}
				return true;
			};
			win.addClass = function(ele,names){
				var nameArr = names.split(/\s+/g),
					className = ele.className;
				for(var i = 0, len = nameArr.length; i < len; i++){
					var tmp = nameArr[i];
					if(!tmp || contains(className,tmp)){continue ;}
					className += " " + tmp;
				}
				ele.className = className;
			}

			win.removeClass = function(ele,names){
				var nameArr = names.split(/\s+/g),
					className = ele.className;
				for(var i = 0, len = nameArr.length; i < len; i++){
					if(!nameArr[i]){continue ;}
					className = remove(className,nameArr[i]);
				}
				ele.className = className;
			}

			win.toggleClass = function(ele,names){
				if(containClass(ele,names)){
					removeClass(ele,names);
				}else{
					addClass(ele,names);
				}
			}
		}

	})();

	/*
	*create unique function when server return back data to execute it,
	*and when it execute remove the script(create to send resuest) and this function
	*@params Function successFunction;callback when success to get data from server
	*/
	function createUniqueFunction(successFunction){
		do{
			var rdFuncName = 'jsonpUniqueCallBackFunction'+Math.floor(Math.random()*999999+100000);
			if(win[rdFuncName]){
				continue ;
			}
			win[rdFuncName] = function(data){//execute wher server return data
				var script = document.getElementById(rdFuncName);
				if(script && script.parentNode){
					script.parentNode.removeChild(script);
				}
				successFunction && successFunction(data);//success
				win[rdFuncName] = script = null;
			};
			break;
		}while(true);

		return rdFuncName;
	}

	/*
	*format the data to url params module,if has url then append it
	*@params Object data;
	*@params String url;
	*/
	function getParams(data,url){
		if(!data || Object.prototype.toString.call(data) !== '[object Object]'){
			return url;
		}

		var arr = [];
		for(var k in data){//params only for null,string and number types
			var tmp = data[k] === null ? 0 : data[k];
			if(!data.hasOwnProperty(k)){
				continue ;
			}
			if(typeof tmp == 'number' || typeof tmp == 'string'){
				arr.push(encodeURIComponent(k)+'='+encodeURIComponent(data[k]));
			}
		}

		var str = arr.join('&');
		if(url){//check the url and append the params
			return url.indexOf('?') > -1 
				? url + '&' + str
				: url + '?' + str;
			if(url.indexOf('?') > -1){
				return url.slice(-1) == '&' 
					? url + str 
					: url + '&' +str;
			}else{
				return url + '?' +str;
			}
		}else{
			return str;
		}
	}

	/*
	*get data to cross domain site and show the result
	*@params Object opt
	*	@params Object opt.data;The data send to the server
	*	@params String opt.url;The url to request,required
	*	@params String opt.jsonpcallback;The name of callback function server execute
	*	@params Function success;Execute when get data from the url
	*/
	win.jsonp = function(opt){
		if(!opt.url){
			throw new Error('The url must be require');
		}

		var url = getParams(opt.data,opt.url),
			uniqueFunc = createUniqueFunction(opt.success);
		url = getParams({
			'callback': opt.jsonpcallback || uniqueFunc
		},url);

		var script = document.createElement('script');//create the script to send cross domain request
		script.type = 'text/javascript';
		script.src = url;
		script.async = 'async';
		script.id = uniqueFunc;
		document.body.appendChild(script);
	}

	win.formatNumber = function(num){
		return num > 10000 ? Math.round(num/10000).toFixed(2) + '万' : num + '';
	}

	win.listen = listen;
	win.unlisten = unlisten;
	win.trim = trim;
	win.checkTel = checkTel;
	listen = unlisten = null;

})(window);/*  |xGv00|6c2e1569e2b14999d06719007813073a */