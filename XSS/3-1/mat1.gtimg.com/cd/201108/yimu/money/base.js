/**
  //
  __.app.login.init({
    code:g_Code, //parameter1
    appn:'stock',
    active:1  //parameter2
    url:''//登录对话框的URL
  });
  //打开登录框
  __.app.login.open();
  //关闭
  __.app.login.close();
  //检测登录
  //cfg = __.app.recentCode.loginInfo = {"code":0,"msg":"","data":{"stock":"sh600000~sz000043~sz300003~sh601607~sh600824~sh600036~sz002375~sz000008~sz000012~sz200002~sz000001","nickname":"ppdog"}}
  __.app.login.check(fn(cfg),bforce);
 */
//
//v1.1 sethchen __.app.recentCode未加载时存在BUG
/* begin:login*/
(function(){
  var _SELF = __, _SERSION='1.3.0',
  _D = _SELF.Dom, _E = _SELF.Event, _L = _SELF.Lang,
  _C = _SELF.Cookie, _T = _SELF.Table, _WIN = _SELF.config.win,_DOC=_SELF.config.doc;
  _SELF.set('__.app.login');
  __.app.login = (function(){
    var _login_wnd, _mark_wnd,_iframe_wnd,_src = '',_timer,_appn,
    /*
     * fn: function 回调函数
     * b: bool 强制向服务器请求登录信息
     * cfg: object
     * cfg{interval:number} 自动向服务器刷新登录信息的频率，单位秒
     */
    _check=function(fn,b,cfg){
      try{
        if(typeof(__.app.recentCode) == 'undefined'){
          _SELF.set('__.app.recentCode');
        }
        if(!b && __.app.recentCode.loginInfo){ fn(__.app.recentCode.loginInfo); return;}
      }catch(e){_SELF.set('__.app.recentCode');}
      _SELF.load('http://stockapp.finance.qq.com/pstock/view/pstkapi.php?appn='+_appn+'&action=show&'+Math.random(),function(){
        fn(__.app.recentCode.loginInfo);
      });
      //自动更新登录信息
      if(cfg&&cfg['interval']&&cfg['interval']>0){
        var id = setInterval((function(){
            return function(){
                _SELF.load('http://stockapp.finance.qq.com/pstock/view/pstkapi.php?appn='+_appn+'&action=show&'+Math.random(),function(){
                    fn(__.app.recentCode.loginInfo);
                });
            };
        }()),cfg['interval']);
      }
    },
    _change=function(width,height){
      if(_mark_wnd&&_login_wnd){
        var cw = document.documentElement.scrollWidth,
        ch = document.documentElement.clientHeight,
        ch2 = document.documentElement.scrollHeight;
        if(_cfg.mask){
            _mark_wnd.style.height = (ch2 > ch ? ch2: ch) + "px";
            _mark_wnd.style.left = 0 + "px";
        }
        _login_wnd.style.top = document.documentElement.scrollTop + (ch - _login_wnd.clientHeight) / 2 + "px";
        _login_wnd.style.left = (cw - _login_wnd.clientWidth) / 2 + "px";
        if(width && height){
          if (width < 300) {
            width = 371;
            height = 276;
          }
          _login_wnd.style.width = width + "px";
          _login_wnd.style.height = height + "px";
          _login_wnd.style.visibility = "hidden";
          _login_wnd.style.visibility = "visible";
        }        
      }
      if(!_timer) _timer = setInterval(_change, 50);    
    },
    _open=function(cfg){
      if(cfg) _init(cfg);
      if(!_login_wnd){
        _login_wnd=_D.addEl({
          tag:'div',
          css:'display:none;position:absolute;visibility:hidden;width:1px; height:1px;padding:0;margin:0px;z-index:1000;',
          align:'center'
        },_DOC.body);
        _iframe_wnd = _D.addEl({
          tag:'iframe',
          frameBorder:'0',
          scrolling:'auto',
          width:'100%',
          height:'100%'
        },_login_wnd);
        _iframe_wnd.frameBorder = 0;
        _mark_wnd = _D.addEl({
          tag:'div',
          css:'position:absolute;width:100%;height:100%;background:#000;display:none;top:0px;left:0px;z-index:999;filter:alpha(opacity=30);-moz-opacity:0.3;opacity: 0.3;'
        },_DOC.body);
      }
      try{
        _iframe_wnd.src = _src;
        _mark_wnd.style.display =  _cfg.mask?"block":'none';
        _login_wnd.style.display = "block";
        _change();
      }catch(e){}
    },
    _close=function(){
      if(_login_wnd){
        _login_wnd.style.display = "none";
      }
      if(_mark_wnd){
        _mark_wnd.style.display = "none";
      }      
      if(_timer){
        clearTimeout(_timer);
        _timer = 0;
      }
    },
    /*
     * 退出登录
     */
    _logout = function(){
        _C.del('uin', '/', '.qq.com');
        _C.del('skey', '/', '.qq.com');
        _C.del('luin', '/', '.qq.com');
        _C.del('lkey', '/', '.qq.com');                                
        try{
            if(typeof(__.app.recentCode.loginInfo) != 'undefined'){
                __.app.recentCode.loginInfo={code:1,msg:'',data:{stock:'',nickname:''}};
            }
        }catch(e){}        
    },
    /*
     *  cfg {code,appn,active,url}
     */
    _cfg={
        mask:true,          //背景遮挡
        code:null,
        appn:null,          //取自选股列表时的appn
        active:1,
        login_appn:null,    //登录跳转用的appn，或为空则用appn
        url:null,           //统一登陆框的地址，若不指定则会用code,appn,active组合成默认参数
        s_url:null,					//统一登陆框的地址的s_url，若不指定则会用code,appn,active组合成默认参数
        low_login_enable:2, //0 不启用弱登录 1 启用弱登录 2 启用弱登录且默认勾选(default)
        low_login_hour:4320 //弱登录有效期 24(一天) 168(一周) 720(一个月) 4320(半年 default) 8640(一年),
    },
    _load_first = true,
    _init=function(cfg){
        _L.objExtend(_cfg,cfg);
        if(cfg['url']){ 
            _src = cfg['url'];
        }else if(cfg['s_url']){ 
            _src = ['http://ui.ptlogin2.qq.com/cgi-bin/login?qlogin_auto_login=1',_cfg['low_login_enable']>0?'&low_login=1':'',
                 '&appid=5000801&s_url=',encodeURIComponent(cfg['s_url']),
                 '&f_url=loginerroralert'].join('');
        }else{ 
            _src = ['http://ui.ptlogin2.qq.com/cgi-bin/login?qlogin_auto_login=1',_cfg['low_login_enable']>0?'&low_login=1':'',
                 '&qlogin_jumpname=pstk&qlogin_param=',
                 encodeURIComponent(['appn=',_cfg.login_appn || _cfg.appn,'&check=2&parameter1=',_cfg.code,'&parameter2=',_cfg.active,'&action=show&',Math.random()].join('')),
                 '&appid=5000801&s_url=',
                 encodeURIComponent(['http://stockapp.finance.qq.com/pstock/view/pstk.php?appn=',_cfg.login_appn || _cfg.appn,'&check=2&parameter1=',_cfg.code,'&parameter2=',_cfg.active,'&action=show&',Math.random()].join('')),
                 '&f_url=loginerroralert'].join('');
        }
        _appn = cfg.appn;
    };
    _WIN['ptlogin2_onResize']=function(width, height) {
        _change(width,height);
        //其它回调
        if(_load_first){
            _load_first = false;
        try{
            var doc=_iframe_wnd.contentDocument||_iframe_wnd.Document;
            //弱登录
            if(_cfg['low_login_enable']==2){
                var o = doc.getElementById('low_login_enable');
                if(o) o.checked = true;
            }
            //弱登录有效期
            if(_cfg['low_login_enable']&&_cfg['low_login_hour']){
                o = _D.f('select[name="low_login_hour"]',doc);
                if(o) o.value = _cfg['low_login_hour'];
            }
        }catch(e){}      
        }
    };
    _WIN['ptlogin2_onClose']=function() {
      _close();
    };    
    return {
      open:_open,
      init:_init,
      close:_close,
      check:_check,
      logout:_logout
    };
  }());
}());
/* end:login*/	


/*begin:tabSwitch*/
(function(){
	__.set('__.app.finance.TabSwitch');
	__.app.finance.TabSwitch = function(cfg){
		this._cfg = cfg || {};
		var that = this;
		__.each(this._cfg.title,function(o,i){
			__.event.on(o,'mouseover',(function(){
				var index = i;
				return function(e){
					that._tab(index);		
				};
			}()));
		});
		setTimeout(function(){
			that.tab(that._cfg.defIndex||0);
		},0);
	};
	__.app.finance.TabSwitch.prototype._tab = function(index){
		var that = this;
		if(this._tabTimer){
			clearTimeout(this._tabTimer);
		}
		this._tabTimer = setTimeout(function(){
			that._tabTimer = null;
			that.tab(index);
		},100);
	};
	__.app.finance.TabSwitch.prototype.tab = function(index){
		if(this._index == index){
			return;
		}
		this._cfg.titleOn && this._cfg.title[this._index] && __.dom.remClass(this._cfg.title[this._index],this._cfg.titleOn);
		this._cfg.titleOn && this._cfg.title[index] && __.dom.addClass(this._cfg.title[index],this._cfg.titleOn);
		this._cfg.tabOn && this._cfg.tab[this._index] && __.dom.remClass(this._cfg.tab[this._index],this._cfg.tabOn);
		this._cfg.tabOn && this._cfg.tab[index] && __.dom.addClass(this._cfg.tab[index],this._cfg.tabOn);
		this._cfg.titleOff && this._cfg.title[this._index] && __.dom.addClass(this._cfg.title[this._index],this._cfg.titleOff);
		this._cfg.titleOff && this._cfg.title[index] && __.dom.remClass(this._cfg.title[index],this._cfg.titleOff);
		this._cfg.tabOff && this._cfg.tab[this._index] && __.dom.addClass(this._cfg.tab[this._index],this._cfg.tabOff);
		this._cfg.tabOff && this._cfg.tab[index] && __.dom.remClass(this._cfg.tab[index],this._cfg.tabOff);
		__.event.fire(this,'change',{oldIndex:this._index,newIndex:index});
		this._index = index;
	};
}());
/*end:tabSwitch*/


/*begin:Index*/
(function(){
	__.set('__.app.finance.Index');
	var cron = new __.FnCronLoader();
	cron.start();
	var color = __.app.finance.color;
	var fillTr = function(tr,data,list){
		__.fnTable.fill(list,tr,[
			function(o){
				o.type = o.key.substr(0,2);			
				var row = data[o.key] && data[o.key].split(o.type=='hf'?',':'~');
				o.row = row;	
				if(o.name){
					return o.name;
				}				
				if(row){
					if(o.type == 'gz'){
						return row[1];
					}
					return __.fnTable.processors.TITLE(row);
				}
			},
			function(o){
				var row = o.row;
				if(o.type == 'gz'){
					return color.get(Number(row[3]).toFixed(2),row[4],false);
				}else if(o.type == 'fq'){
					return color.get(Number(row[5]).toFixed(2),row[6],false);
				}else if(o.type == 'hf'){
					return color.get(Number(row[0]).toFixed(2),row[0]-row[7],false);
				}else if(o.type == 'wh'){
					return color.get(Number(row[3]).toFixed(4),row[3]-row[6],false);
				}else{
					return color.get(row[3],row[4],false);
				}
			},
			function(o){
				var row = o.row;
				if(o.type == 'gz'){
						return color.get(Number(row[4]).toFixed(2),row[4]);
				}else if(o.type == 'fq'){
					return color.get(Number(row[6]).toFixed(2),row[6]);
				}else if(o.type == 'hf'){
					return color.get((row[0]-row[7]).toFixed(2),row[0]-row[7]);
				}else if(o.type == 'wh'){
					return color.get((row[3]-row[6]).toFixed(4),row[3]-row[6]);
				}else{
					return color.get(row[4],row[4]);
				}
			},
			function(o){
				var row = o.row;
				if(o.type == 'gz'){
						return color.get(Number(row[5]).toFixed(2),row[4],true,'%');
				}else if(o.type == 'fq'){
					return color.get((row[6]*100/(row[5]- row[6])).toFixed(2),row[6],true,'%');
				}else if(o.type == 'hf'){
					return color.get(((row[0]-row[7])*100/row[7]).toFixed(2),row[0]-row[7],true,'%');
				}else if(o.type == 'wh'){
					return color.get(((row[3]-row[6])*100/row[6]).toFixed(4),row[3]-row[6],true,'%');
				}else{
					return color.get(row[5],row[4],true,'%');
				}
			}	
		]);
	};
	//{tr:'tr-id',list:[{key:'s_sz399001'}]}
	__.app.finance.Index = function(cfg){
		this.cfg = cfg || {};
		this.start();
	};
	__.app.finance.Index.prototype.start = function(){
		if(this._cronid){
			cron._doPolling(this._cronid);
			return;
		}
		var that = this;
		var keys = [];
		__.each(this.cfg.list,function(o){
			keys.push(o.key);
		});
		if(keys.length>0){
			this._cronid = cron.addJob({
				type:2,
				keys:keys,
				noWait:true,
				onData:function(data){
					that.set(data);
				}
			});
		}
	};
	__.app.finance.Index.prototype.stop = function(){
		if(this._cronid){
			cron.remJob(this._cronid);
			this._cronid = null;
		}
	};
	__.app.finance.Index.prototype.set = function(data){
		var tr = __.dom.f(this.cfg.tr);
		if(tr){
			fillTr(tr,data,this.cfg.list);
		}else if(__.lang.isFunction(this.cfg.fill)){
			this.cfg.fill(data,this.cfg.list);
		}
	};
}());
/*end:Index*//*  |xGv00|9fd8cad3ff43f964ab9b5d17e417fcc0 */