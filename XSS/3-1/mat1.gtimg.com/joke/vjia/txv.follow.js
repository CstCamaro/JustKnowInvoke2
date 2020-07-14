		/**
 * @fileOverview 腾讯视频v+订阅
 * @lastUpdate $Date: 2015-07-10 15:57:18 +0800 (Fri, 10 Jul 2015) $
 * @author QQLiveTeam $LastChangedBy: ronniemeng $
 * @version $Rev: 83666 $
 */
/*
 * @include "./txv.common.js" 
 * @include "../common/live.retcode.js"
 * @include "../common/jquery.extend.util.js"
 * @include "./txv.tips.js"
 */
/**
 * v+订阅服务
 * 
 * @type function
 * @namespace Live.txv.Follow
 * @function isFollowed 某个频道是否被关注
 * @function getFollowNumber 某个频道被关注的总量
 * @function getMyFollowList 获取我的关注列表
 * @function init 绑定关注/取消事件，传入操作成功/失败的回调方法
 */
Live.txv.Follow = function() {
	var conf = {
		/**
		 * 取消时是否显示tips
		 */
		showConfirm : true,
		/**
		 * 是否显示结果提示
		 */
		showTips : true,
		/**
		 * 个人频道的uin的属性
		 */
		uinAttr : "data-vuin",

		/**
		 * 取消订阅按钮的css选择符
		 * 
		 * @type {String}
		 */
		cancelSelector : "[data-act='del']",
		/**
		 * 容器选择符
		 */
		contanerSelector : document,

		/**
		 * 添加订阅按钮的css选择符
		 * 
		 * @type {String}
		 */
		addSelector : "[data-act='set']",
		/**
		 * 添加关注的上报返回码
		 */
		addRetCode : 0,

		/**
		 * 添加成功后的回调
		 * 
		 * @type {Function}
		 */
		addSuccess : Live.emptyFn,

		/**
		 * 添加失败后的回调
		 * 
		 * @type {Function} param uin, code ,msg
		 */
		addError : Live.emptyFn,

		/**
		 * 取消成功后的回调
		 * 
		 * @type {Function}
		 */
		cancelSuccess : Live.emptyFn,

		/**
		 * 取消关注时的上报返回码
		 */
		cancelRetCode : 0,

		/**
		 * 取消失败后的回调
		 * 
		 * @type {Function} param uin, code ,msg
		 */
		cancelError : Live.emptyFn,

		/**
		 * 当前用户为要订阅的用户时，是否需要隐藏订阅按钮
		 */
		isHideSameUser : false
	};
	var OP = ["set", "del", "check", "count"],
		OPMSG = {
			"set" : "添加订阅",
			"del" : "取消订阅",
			"setSuccessMsg" : "添加订阅成功",
			"delSuccessMsg" : "取消订阅成功",
			"confirmTitle" : "确定取消",
			"confirmMsg" : "确定取消吗？"
		},
		cgi = {
			/**
			 * 关注相关操作的cgi地址,添加关注，取消关注，是否被关注，关注量
			 * 
			 * @type {String}
			 */
			follow : "http://c.v.qq.com/follow?otype=json",
			/**
			 * 我的关注列表
			 */
			myfollow : "http://c.v.qq.com/myfollow?otype=json",
			/**
			 * 批量检查是否被关注，参数quin=xxx|xxx|xxx,fields=avatar|count|biz|nick...,返回头像，关注量，是否被关注
			 */
			batchCheck : "http://c.v.qq.com/vuserinfogetlogin?otype=json"
		},
		component = this;
	/**
	 * 向服务器发请求
	 * 
	 * @param {number}
	 *          返回码
	 * @param {object}
	 *          请求的参数
	 * @param {object}
	 *          回调 success:function(uin,json){},
	 *          error:function(uin,errorcode,msg){}
	 */
	function sendToCgi(retCode, data, callback, url) {
		if (data.op) {
            url = cgi.follow;
        }
		var sucCb, errCb,
			retObj = new Live.RetCode(url),
			msg = "其他错误";
		
		if (callback) {
			sucCb = callback.success, errCb = callback.error;
		}
		var showTips = component.showTips;
		$j.ajax({
			    url : url,
			    dataType : "jsonp",
			    CSRF : true,
			    data : data,
			    beforeSend : function() {
				    retObj.begin();
			    },
			    success : function(json) {
				    if (json) {
					    if (json.s == "o") {// success
						    retObj.reprotSuc();
						    typeof sucCb == "function" && sucCb(data.fuin, json);
						    if (conf.showTips && typeof OPMSG[data.op] != "undefined" && OPMSG[data.op + "SuccessMsg"]) {
							    showTips(txv.tips.ConstTipsType.Message, OPMSG[data.op + "SuccessMsg"], OPMSG[data.op]);
						    }
						    return;
					    }
					    else {// failure
						    var msg = "其他错误";
						    switch (json.em) {
							    case 100001 :
								    json.em = -11;
								    msg = "未登陆或登陆已过期";
								    break;
							    case 2506 :
								    msg = "不能识别的命令，请检查操作";
								    break;
							    case 1500 :
								    msg = "未知错误，一般是访问后台服务失败";
								    break;
							    case 3401 :
								    // msg = "超过了可订阅的最大数量";
								    msg = "最多可订阅" + json.max + "个V+认证频道";
								    break;
							    case 3402 :
								    msg = "查询关注服务失败";
								    break;
						    }
						    retObj.reportErr(json.em);
						    typeof errCb == "function" && errCb(json.em, msg, data.fuin);
						    if (conf.showTips && (data.op == "set"||data.op == "del")) {
							    showTips(txv.tips.ConstTipsType.Warning, msg, OPMSG[data.op] || "失败");
						    }
					    }
				    }
				    else {
					    if (conf.showTips && (data.op == "set"||data.op == "del")) {
						    showTips(txv.tips.ConstTipsType.Warning, msg, OPMSG[data.op] || "失败");
					    }
					    typeof errCb == "function" && errCb(500, "cgi出错", data.fuin);
				    }
			    },
			    error : function(a, b) {
				    typeof errCb == "function" && errCb(500, "cgi出错", data.fuin);
                    if(b!="parsererror" && conf.showTips && (data.op == "set"||data.op == "del")){
                        showTips(txv.tips.ConstTipsType.Warning, msg, OPMSG[data.op] || "失败");
                    }
			    }
		    });
	}
	/**
	 * 绑定关注/取消
	 */
	function bindEvent() {
		var $doc = $j(conf.contanerSelector);
		/**
		 * 返回请求cgi的方法
		 */
		function processData(dom, isSet) {// 是否是关注
			var param = isSet ? "add" : "cancel",
				op = isSet ? "set" : "del";
			var me = dom,
				id = $j(dom).attr(conf.uinAttr),
				errCb = conf[param + "Error"],
				sucCb = conf[param + "Success"], callback;
			if (!isValidUin(id)) {
				typeof errCb == "function" && (errCb(404, "qq不合法", id));
				return;
			}
			else if (id == txv.login.getEncUin()) {// 自己不能订阅自己
				return;
			}
			if (sucCb) {
				callback = {
					success : function() {
						sucCb(id, me);
					}
				};
			}
			if (errCb) {
				$j.extend(callback, {
					    error : errCb
				    });
			}
			return function() {
				sendToCgi(conf[param + "RetCode"], {
					    op : op,
					    fuin : id
				    }, callback);
			};
		}
		function confirmProcess(fn) {
			if (conf.showConfirm) {// 取消时需要确认
				component.showTips(txv.tips.ConstTipsType.Warning, OPMSG.confirmMsg, OPMSG.confirmTitle, function() {
					    QZFL.event.preventDefault();
					    fn();
				    });
			}
			else {
				fn();
			}
		}
		$doc.delegate(conf.addSelector, "click", function(event) {// 添加关注
			    event.preventDefault();
			    var fn = processData(this, true),
				    el = this;
			    if (!fn) {
				    return;
			    }
			    if (!Live.login.isLogin()) {
				    Live.login.openLogin({
					        success : function() {
						        fn = processData(el, true);
						        $j.isFunction(fn) && fn();
					        }
				        });
				    return;
			    }
			    fn();
		    }).delegate(conf.cancelSelector, "click", function(event) {// 取消关注
			    event.preventDefault();
			    var getFunction = processData(this, false),
				    el = this;
			    if (!getFunction) {
				    return;
			    }
			    if (!Live.login.isLogin()) {
				    Live.login.openLogin({
					        success : function() {
						        getFunction = processData(el, false);
						        $j.isFunction(getFunction) && confirmProcess(getFunction);
					        }
				        });
				    return;
			    }
			    confirmProcess(getFunction);
		    });
	}
	/**
	 * 是否是合法的uin
	 */
	function isValidUin(uin) {
		if (uin && (uin > 10000 || $j.type(uin) == "string")) {
			return true;
		}
		return false;
	}

	/**
	 * 是否已经被关注
	 * 
	 * @params {object}{retCode:xxx(可不传),uin:xxx,success:function(bool){},error::function(errorcode,msg,uin)}
	 */
	this.isFollowed = function(cfg) {
		if (!cfg) {
			return;
		}
		var targetUin = cfg.uin,
			sucCb = cfg.success,
			errCb = cfg.error,
			callback = {};
		if (!isValidUin(targetUin)) {
			typeof errCb == "function" && (errCb(404, "查询的qq不合法", targetUin));
			return;
		}
		if (typeof sucCb == "function") {
			cfg.success = function(fuin, json) {
				sucCb(json.follow);
			}
		}
		else {// 没有成功的回调，不请求cgi,因为即使请求成功之后也没有下文
			return;
		}
		delete cfg.uin;

		if (!Live.login.isLogin()) {// 没登陆直接返回未关注
			sucCb(false);
			return;
		}
		sendToCgi(cfg.retCode, {
			    op : "check",
			    fuin : targetUin
		    }, cfg);
	};
	/**
	 * 批量检查v+频道是否被关注，公用follow的CGI，差别在于fuin和fuins
	 *
	 * @param {object}
	 *          fuins:xx|xx //查询的uin列表，以“|”链接
	 */
	this.batchIsFollowed_2 = function(cfg) {
		if (!cfg) {
			return;
		}
		var targetUin = cfg.uin,
			sucCb = cfg.success,
			callback = {};
		if (typeof sucCb == "function") {
			cfg.success = function(fuin, json) {
				sucCb(json.follows);
			}
		} else { // 没有成功的回调，不请求cgi,因为即使请求成功之后也没有下文
			return;
		}
		delete cfg.uin;

		if (!Live.login.isLogin()) { // 没登陆直接返回未关注
			sucCb(null);
			return;
		}
		sendToCgi(cfg.retCode, {
			op: "check",
			fuins: targetUin
		}, cfg);
	};
	/**
	 * 批量检查v+频道是否被关注
	 * 
	 * @param {object}
	 *          retCode:xxx,//可空 success:fn, error:fn,//可空 fields:xx|xx|xx,//可空
	 *          uin:xx|xx //查询的uin列表，以“|”链接
	 */
	this.batchIsFollowed = function(cfg) {
		if (!cfg || !cfg.success || !cfg.uin) {
			return;
		}
		var quin = cfg.uin,
			sucCb = cfg.success,
			fields = cfg.fields,
			callback = {
				success : function(fuin, json) {// 返回的json.info批量检查的结果数组
					sucCb(json.info);
				}
			},
			dataset = {
				quin : quin
			};
		dataset.fields = fields || "avatar|count|biz";
		if (!Live.login.isLogin()) {// 没登陆，直接返回空
			sucCb(null);
			return;
		}
		sendToCgi(cfg.retCode, dataset, callback, cgi.batchCheck);

	};
	/**
	 * 获取某个用户被关注的数量
	 * 
	 * @param {object}
	 *          {retCode:xxx,uin:xxx,success:function(number){},error:function(errorcode,msg,uin)}
	 */
	this.getFollowNumber = function(cfg) {
		if (!cfg) {
			return;
		}
		var targetUin = cfg.uin,
			sucCb = cfg.success,
			errCb = cfg.error;
		if (!isValidUin(targetUin)) {
			typeof errCb == "function" && (errCb(404, "查询的qq不合法", targetUin));
			return;
		}
		if (typeof sucCb == "function") {
			cfg.success = function(fuin, json) {// 返回的json.count表示被关注的总数
				sucCb(json.count);
			}
		}
		delete cfg.uin;
		delete cfg.retCode;
		sendToCgi(cfg.retCode, {
			    op : "count",
			    fuin : targetUin
		    }, cfg);
	};
	/**
	 * 获取我关注的v+用户列表
	 * 
	 * @param {object}
	 *          {retCode:xxx,exParam:{},success:function(json){},error:function(errorcode,msg)}
	 */
	this.getMyFollowList = function(cfg) {
		if (!cfg) {
			return;
		}
		var sucCb = cfg.success,
			errCb = cfg.error, callback,
			param = {
				fields : "avatar|nick|count|biz"
			},
			exParam = cfg.exParam;
		if (typeof sucCb != "function") {
			return;
		}
		callback = {
			success : function(fuin, json) {// 返回的json.info关注的列表数组
				sucCb(json.info);
			}
		};
		if (errCb) {
			callback.error = function(fuin, code, msg) {
				errCb(code, msg);
			};
		}
		if (!Live.login.isLogin()) {// 没登陆，直接返回空
			sucCb(null);
			return;
		}
		$j.extend(param, exParam);
		sendToCgi(cfg.retCode || 100102, param, callback, cgi.myfollow);
	};
	/**
	 * 添加或删除关注
	 */
	this.bindAddAndDel = function(_cfg) {
		$j.extend(conf, _cfg);
		bindEvent();
	};
	/**
	 * 设置添加或删除成功后的提示
	 */
	this.setMsg = function(_cfg) {
		$j.extend(OPMSG, _cfg)
	};
};

Live.txv.Follow.prototype.showTips = function(type, msg, title, cb) {
	title = title || "";
	var tipsobj = new txv.tips("个人频道", title, msg);
	tipsobj.SetType(type);
	if (typeof(cb) === "function") {
		tipsobj.SetBtn("确定", "关闭");
		tipsobj.onBtnOk = function() {
			tipsobj.SetHide();
			cb();
		};
	}
	tipsobj.setTipsTitle("");
	tipsobj.FillPage();
};/*  |xGv00|d44fd9dd0ef8bbc98d6734e5a5bc4790 */