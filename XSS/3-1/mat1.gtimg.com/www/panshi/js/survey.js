String.prototype.realCount = function() {
	return this.replace(/[^\x00-\xff]/g, "rr").length;
};
String.prototype.subTextStr = function(subLen) {
	return this.substr(0, subLen);
};
String.prototype.trim = function() {
	return this.replace(/^(\s|　)*|(\s|　)*$/ig, "");
};
String.prototype.empty = function() {
	return this.trim() == "";
};
Number.prototype.format = function() {
	el = this.toString();
	if (el == '' || el.length <= 3) {
		return el;
	}
	var index = el.length - 1;
	var count = 1;
	var result = '';
	for (; index >= 0; index--) {
		result = el.substr(index, 1) + result;
		if (index > 0 && (count % 3 == 0)) {
			result = ',' + result;
		}
		count++;
	}
	return result;
};
try {
	document.domain = "qq.com";
} catch (e) {}
if (typeof AppPlatform == "undefined") {
	var AppPlatform = new Object();
}
AppPlatform.$ = function(s) {
	return (typeof s == "object") ? s : document.getElementById(s);
};
AppPlatform.Cookie = {
	getCookie: function(b) {
        var filterXSS = function(e) {
            if (!e) return e;
            for (; e != unescape(e);) e = unescape(e);
            for (var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], "gi"), n[a]);
            return e
        };
        var a;
        return filterXSS((a=document.cookie.match(RegExp("(^|;\\s*)"+b+"=([^;]*)(;|$)")))?unescape(a[2]):null)
    }
};
AppPlatform.HashTable = function() {
	this.__construct();
};
AppPlatform.HashTable.prototype = {
	__construct: function() {
		this._hash = new Object();
	},
	set: function(key, value, rewrite) {
		if (rewrite !== false) {
			this._hash[key] = value;
		} else if (this.get(key) != null) {
			this._hash[key] = value;
		}
	},
	get: function(key) {
		if (typeof this._hash[key] != "undefined") {
			return this._hash[key];
		} else {
			return null;
		}
	},
	remove: function(key) {
		delete this._hash[key];
	}
};
AppPlatform.HashTable.getInstance = function() {
	if (!this.__instance__) {
		this.__instance__ = new AppPlatform.HashTable();
	};
	return this.__instance__;
};
AppPlatform.Element = {
	getElementLeft: function(e) {
		return (e == null) ? 0 : (AppPlatform.$(e).offsetLeft + AppPlatform.Element.getElementLeft(AppPlatform.$(e).offsetParent));
	},
	getElementTop: function(e) {
		return (e == null) ? 0 : (AppPlatform.$(e).offsetTop + AppPlatform.Element.getElementTop(AppPlatform.$(e).offsetParent));
	},
	scrollIntoView: function(e) {
		var x = AppPlatform.Element.getElementLeft(e);
		var y = AppPlatform.Element.getElementTop(e);
		window.scrollTo(x, y);
	},
	remove: function() {
		for (var i = 0; i < arguments.length; i++) {
			try {
				AppPlatform.$(arguments[i]).parentNode.removeChild(AppPlatform.$(arguments[i]));
			} catch (e) {}
		}
	}
};
AppPlatform.Page = {
	getPageWidth: function() {
		return document.body.scrollWidth || document.documentElement.scrollWidth || 0;
	},
	getPageHeight: function() {
		return document.body.scrollHeight || document.documentElement.scrollHeight || 0;
	},
	getBodyWidth: function() {
		return document.body.clientWidth || document.documentElement.clientWidth || 0;
	},
	getBodyTop: function() {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	}
};
if (typeof AppPlatform.Survey == "undefined") {
	AppPlatform.Survey = new Object();
}
AppPlatform.Survey.Input = {
	className: "question",
	result: false,
	showResult: true,
	//提交
	check: function() {
		var focus = null;
		for (key in AppPlatform.Survey.Option.list) {
			if (-1 == AppPlatform.Survey.Option.list[key]["isNeed"]) {
				//是必填
				var selNum = 0;
				if ((1 == AppPlatform.Survey.Option.list[key]["type"]) || (2 == AppPlatform.Survey.Option.list[key]["type"])) {
					//选择题
					var checkObjArray = document.getElementsByName("sbj_" + key + "[]");
					for (i = 0; i < checkObjArray.length; i++) {
						if (checkObjArray[i].checked) {
							if (0 == AppPlatform.Survey.Option.list[key][checkObjArray[i].value]["other"]) {
								selNum++;
							} else {
								var OptInput = document.getElementById("opt_text_" + checkObjArray[i].value);
								if (OptInput.value.empty()) {
									checkObjArray[i].checked = false;
								} else {
									selNum++;
								}
							}
							continue;
						}
					}
				} else {
					var checkObjArray = document.getElementsByName("sbj_" + key + "[]");
					if (!checkObjArray[0].value.empty()) {
						for (var key2 in AppPlatform.Survey.Option.list[key]) {
							if (!isNaN(key2)) {
								checkObjArray[0].value = checkObjArray[0].value.trim();
								if (AppPlatform.Survey.Option.list[key][key2].minlen <= checkObjArray[0].value.length) {
									selNum++;
								}
							}
						}
					}
				} if (selNum == 0) {
					AppPlatform.$("question_" + key).className = AppPlatform.Survey.Input.className + " focus";
					if (focus == null) {
						focus = "question_" + key;
					}
				}
			}
		}
		if (focus != null) {
			alert("\u5bf9\u4e0d\u8d77\uff0c\u8bf7\u5b8c\u6210\u5fc5\u9009\u9898\u540e\u518d\u63d0\u4ea4");
			AppPlatform.Element.scrollIntoView(focus);
			return;
		}
    if(!AppPlatform.Cookie.getCookie("qq_client_id")) {
      userLogin();
    } else {
			//获取数据
			data = {};
			select_list = {};
			var values = document.getElementsByTagName("input");
			for (var i = 0; i < values.length; i++) {
				if (values[i].type == "radio" || values[i].type == "checkbox") {
					if (values[i].checked == true) {
						question_id = values[i].name.replace(/^sbj_(\d+)\[\]$/, "$1");
						if (typeof data[question_id] == "undefined") {
							data[question_id] = {};
						}

						if (typeof select_list[question_id] == "undefined") {
							select_list[question_id] = [];
						}
						select_list[question_id].push(values[i].value);

						if (typeof data[question_id]['selected'] == "undefined") {
							data[question_id]['selected'] = [];
						}
						data[question_id]['selected'].push(values[i].value);
					}
				} else if (values[i].type == "hidden" || values[i].type == "text") {
					if (/^sbj_(\d+)\[\]$/.test(values[i].name) && values[i].value != "") {

						question_id = values[i].name.replace(/^sbj_(\d+)\[\]$/, "$1");
						option_id = values[i].id.replace("opt_text_", "");

						if (typeof data[question_id] == "undefined") {
							data[question_id] = {};
						}
						if (typeof data[question_id]['others'] == "undefined") {
							data[question_id]['others'] = {};
						}
						if (typeof data[question_id]['selected'] == "undefined") {
							data[question_id]['selected'] = [];
						}
						if ($.inArray(option_id, data[question_id]['selected']) < 0) {
							data[question_id]['selected'].push(option_id);
						}
						data[question_id]['others'][option_id] = values[i].value;
					}

					if (/PjtID/.test(values[i].name)) {
						var survey_id = values[i].value;
					}
				}
			}

			$("textarea").each(function(index) {

				if ($(this).val() != "undefined" && $(this).val() != "") {
					question_id = $(this).attr("name").replace(/^sbj_(\d+)\[\]$/, "$1");
					option_id = $(this).attr("id").replace("opt_text_", "");

					if (typeof data[question_id] == "undefined") {
						data[question_id] = {};
					}
					if (typeof data[question_id]['others'] == "undefined") {
						data[question_id]['others'] = {};
					}
					if (typeof data[question_id]['selected'] == "undefined") {
						data[question_id]['selected'] = [];
					}
					if ($.inArray(option_id, data[question_id]['selected']) < 0) {
						data[question_id]['selected'].push(option_id);
					}
					data[question_id]['others'][option_id] = $(this).val();
				}
			});

			d = {
				'answer': JSON.stringify(data),
				'login': 1,
				'source': 1,
				// 'g_tk': generateToken(getKey()),
				'g_tk': generateToken(),
				'format': "script",
				'callback': 'parent.AppPlatform.Survey.Input.callback',
				'qq_client_id': AppPlatform.Cookie.getCookie('qq_client_id'),
				'qq_openid': AppPlatform.Cookie.getCookie('qq_openid'),
				'qq_access_token': AppPlatform.Cookie.getCookie('qq_access_token')
			};
			data = d;
			var url = "http://panshi.qq.com/v2/vote/" + survey_id + "/submit";
			form_post(url, data)
			//AppPlatform.Survey.Input.callback(res.code, res.errorMsg);
		}
	},

	callback: function(res) {
    code = res.code;
		// msg = res.errorMsg;
		try {
			window.frames["Ansy_Post"].location.replace("about:blank");
		} catch (e) {}
		var errmsg = "";
		var redo = false;
		switch (code) {
			case 0: //成功

				if (AppPlatform.Survey.Input.showResult) {
					for (var key in AppPlatform.Survey.Option.list) {
            var checkObjArray = document.getElementsByName("sbj_" + key + "[]");
						for (var i = 0; i < checkObjArray.length; i++) {
							checkObjArray[i].disabled = true;
							if ((1 == AppPlatform.Survey.Option.list[key]["type"]) || (2 == AppPlatform.Survey.Option.list[key]["type"])) {
								try {
									if (1 == AppPlatform.Survey.Option.list[key][checkObjArray[i].value]["other"]) {
										document.getElementById("opt_text_" + checkObjArray[i].value).disabled = true;
									}
								} catch (e) {}
							}
						}
            AppPlatform.$("question_" + key).className = "question result";
						for (var key2 in AppPlatform.Survey.Option.list[key]["result"]) {
							try {
								if ((1 == AppPlatform.Survey.Option.list[key]["type"]) || (2 == AppPlatform.Survey.Option.list[key]["type"])) {
									AppPlatform.$("result_bar_" + key + "_" + key2).style.display = "block";
									AppPlatform.$("process_txt_" + key + "_" + key2).style.display = "block";
								}
							} catch (e) {}
						}
					}


					if (AppPlatform.Survey.Input.result) {
						var msgArray = select_list;
						for (var i in msgArray) {
							try {
								var subjId = i;
								var subjArray = msgArray[i];
								for (var j = 0; j < subjArray.length; j++) {
									AppPlatform.Survey.Option.list[subjId]["count"]++;
									AppPlatform.Survey.Option.list[subjId]["result"][subjArray[j].split(":")[0]]["count"]++;
									AppPlatform.$("process_txt_" + subjId + "_" + subjArray[j].split(":")[0]).style.color = "red";
									AppPlatform.$("process_txt_" + subjId + "_" + subjArray[j].split(":")[0]).style.fontWeight = "bold";
								}
							} catch (e) {}
						}
						/*
						var msgArray = msg.split("|");
						for (var i = 0; i < msgArray.length; i++) {
							try {
								var subjId = msgArray[i].split("-")[0];
								var subjArray = msgArray[i].split("-")[1].split(";");
								for (var j = 0; j < subjArray.length; j++) {
									AppPlatform.Survey.Option.list[subjId]["count"]++;
									AppPlatform.Survey.Option.list[subjId]["result"][subjArray[j].split(":")[0]]["count"]++;
									AppPlatform.$("process_txt_" + subjId + "_" + subjArray[j].split(":")[0]).style.color = "red";
									AppPlatform.$("process_txt_" + subjId + "_" + subjArray[j].split(":")[0]).style.fontWeight = "bold";
								}
							} catch (e) {}
						}
						*/
						AppPlatform.Survey.Option.showResult(true);
					} else {
						var msgArray = select_list;
						for (var i in msgArray) {
							try {
								var subjId = i;
								var subjArray = msgArray[i];
								for (var j = 0; j < subjArray.length; j++) {
									AppPlatform.Survey.Option.list[subjId]["count"]++;
									AppPlatform.Survey.Option.list[subjId]["result"][subjArray[j].split(":")[0]]["count"]++;
									AppPlatform.$("process_txt_" + subjId + "_" + subjArray[j].split(":")[0]).style.color = "red";
									AppPlatform.$("process_txt_" + subjId + "_" + subjArray[j].split(":")[0]).style.fontWeight = "bold";
								}
							} catch (e) {}
						}
						/*
						var msgArray = msg.split("|");
						for (var i = 0; i < msgArray.length; i++) {
							try {
								var subjId = msgArray[i].split("-")[0];
								var subjArray = msgArray[i].split("-")[1].split(";");
								for (var j = 0; j < subjArray.length; j++) {
									AppPlatform.Survey.Option.initCount(subjId, subjArray[j].split(":")[0], subjArray[j].split(":")[1], subjArray[j].split(":")[2]);
								}
							} catch (e) {}
						}
						*/
						AppPlatform.Survey.Option.showResult();
						try {
							AppPlatform.$("view_result").style.visibility = "hidden";
						} catch (e) {}
					}
				} else {
					
					for (var key in AppPlatform.Survey.Option.list) {
						var checkObjArray = document.getElementsByName("sbj_" + key + "[]");
						for (var i = 0; i < checkObjArray.length; i++) {

							checkObjArray[i].disabled = true;
							
							/*

							if ((1 == AppPlatform.Survey.Option.list[key]["type"]) || (2 == AppPlatform.Survey.Option.list[key]["type"])) {
								if (1 == AppPlatform.Survey.Option.list[key][checkObjArray[i].value]["other"]) {
									document.getElementById("opt_text_" + checkObjArray[i].value).disabled = true;
								}
							}
							*/
						}
					}
					
				}
				AppPlatform.$("submit_survey").value = "\u63d0\u4ea4\u6210\u529f";
				AppPlatform.$("submit_survey").disabled = true;
				//AppPlatform.$("submit_survey").remove();
				AppPlatform.Survey.Page.resize();
        break;
      case 12:
        // 对不起，该问题不存在
				errmsg = "\u5bf9\u4e0d\u8d77\uff0c\u8be5\u95ee\u9898\u4e0d\u5b58\u5728";
				redo = false;
        break;
			case 8:
      case 20:
				//case 100:
				//AppPlatform.Survey.User.login();
				//redo = false;
				//errmsg = "对不起，您尚未登录，请登陆后提交";
				try {
					userLogin();
				} catch (e) {
          // 对不起，您尚未登录，请登陆后提交
					errmsg = "\u5bf9\u4e0d\u8d77\uff0c\u60a8\u5c1a\u672a\u767b\u5f55\uff0c\u8bf7\u767b\u9646\u540e\u63d0\u4ea4";
				}
				redo = true;
				break;
      default:
        errmsg = res.msg;
        redo = true
				break;
		}
		if (errmsg != "") {
			alert(errmsg);
		}
		if (redo) {
			AppPlatform.$("submit_survey").value = "\u63d0\u0020\u4ea4";
			//提 交
			AppPlatform.$("submit_survey").disabled = false;
		}
	}
};

AppPlatform.Survey.Option = {
	list: [],
	initList: function(subjId, isNeed, subjType) {
		if (2 == isNeed) {
			//必选
			AppPlatform.Survey.Option.list[subjId] = {
				"isNeed": -1,
				"count": 0,
				"result": {
					"count": 0,
					"percent": 0
				},
				"type": subjType
			};
		} else {
			AppPlatform.Survey.Option.list[subjId] = {
				"isNeed": 1,
				"count": 0,
				"result": {
					"count": 0,
					"percent": 0
				},
				"type": subjType
			};
		}
	},

	initOption: function(subjId, optId, optOther, maxLen, minLen) {
		AppPlatform.Survey.Option.list[subjId][optId] = {
			"other": optOther,
			"maxlen": maxLen,
			"minlen": minLen
		};
	},

	initCount: function(subjId, optId, count, percent) {
		try {
			count = count == "" ? 0 : parseInt(count);
			percent = percent == "" ? 0 : parseFloat(percent);
			percent = parseFloat(percent).toFixed(2);
			AppPlatform.Survey.Option.list[subjId]["count"] += count;
			AppPlatform.Survey.Option.list[subjId]["result"][optId] = {
				"count": count,
				"percent": percent
			};
		} catch (e) {}
	},

	showResult: function(account) {
		var total = 0;
		for (key in AppPlatform.Survey.Option.list) {
			for (key2 in AppPlatform.Survey.Option.list[key]["result"]) {
				try {
					if (account) {
						if (AppPlatform.Survey.Option.list[key]["count"] != 0) {
							AppPlatform.Survey.Option.list[key]["result"][key2]["percent"] = parseFloat(AppPlatform.Survey.Option.list[key]["result"][key2]["count"] * 100 / AppPlatform.Survey.Option.list[key]["count"]).toFixed(2);
						}
					}
					AppPlatform.$("process_txt_" + key + "_" + key2).innerHTML = "<nobr>" + AppPlatform.Survey.Option.list[key]["result"][key2]["count"].format() + " (" + parseFloat(AppPlatform.Survey.Option.list[key]["result"][key2]["percent"]).toFixed(2) + "%)</nobr>";
					if ((1 == AppPlatform.Survey.Option.list[key]["type"]) || (2 == AppPlatform.Survey.Option.list[key]["type"])) {
						AppPlatform.$("result_bar_" + key + "_" + key2).style.display = "block";
						AppPlatform.$("process_txt_" + key + "_" + key2).style.display = "block";
					}
					total += AppPlatform.Survey.Option.list[key]["result"][key2]["count"];
				} catch (e) {}
			}
		}
		try {
			AppPlatform.$("hot").style.visibility = "visible";
			//AppPlatform.$("hot_value").innerHTML = total.format();
		} catch (e) {}
		AppPlatform.Survey.Option._processLength = 0;
		AppPlatform.Survey.Option._processTimer = window.setInterval(AppPlatform.Survey.Option.setProcessLength, 10);
	},
	_processTimer: null,
	_processLength: 0,

	setProcessLength: function() {
		AppPlatform.Survey.Option._processLength += 3;
		var flag = 0;
		for (key in AppPlatform.Survey.Option.list) {
			for (key2 in AppPlatform.Survey.Option.list[key]["result"]) {
				try {
					if (AppPlatform.Survey.Option._processLength <= AppPlatform.Survey.Option.list[key]["result"][key2]["percent"] * 1.6 + 3) {
						flag = 1;
						if (AppPlatform.Survey.Option._processLength > AppPlatform.Survey.Option.list[key]["result"][key2]["percent"] * 1.6) {
							AppPlatform.$("process_bar_" + key + "_" + key2).style.width = AppPlatform.Survey.Option.list[key]["result"][key2]["percent"] + "%";
						} else {
							AppPlatform.$("process_bar_" + key + "_" + key2).style.width = AppPlatform.Survey.Option.list[key]["result"][key2]["percent"] + "%";
						}
					}
				} catch (e) {}
			}
		}
		if (flag == 0) {
			window.clearInterval(AppPlatform.Survey.Option._processTimer);
		}
	},

	check: function(checkObj, subjId, checkObjName, maxNum) {
    if(!AppPlatform.Cookie.getCookie("qq_client_id")) {
      userLogin();
      return;
    }
		//最多题目数
		var selNum = 0;
		var checkObjArray = document.getElementsByName(checkObjName);
		for (i = 0; i < checkObjArray.length; i++) {
			if (checkObjArray[i].checked) {
				selNum++;
			}
			try {
				if (checkObjArray[i].checked == false) {
					var id = "opt_text_" + checkObjArray[i].value;
					document.getElementById(id).value = "";
				}
			} catch (e) {}
		}
		if (selNum > maxNum && maxNum != 0) {
			alert("\u5bf9\u4e0d\u8d77\uff0c\u672c\u9898\u6700\u591a\u53ea\u80fd\u9009\u62e9" + maxNum + "\u4e2a\u9009\u9879");
			checkObj.checked = false;
		}
		AppPlatform.$("question_" + subjId).className = AppPlatform.Survey.Input.className;

	},

	checkInput: function(checkObj, subjId, maxNum, optId, maxLen, minLen) {
    if(!AppPlatform.Cookie.getCookie("qq_client_id")) {
      userLogin();
      return;
    }
		if (checkObj.value.empty()) {
			checkObj.value = "";
		}

		//if(/(\s| )(\s| )+$/.test(checkObj.value)){
		//checkObj.value = checkObj.value.replace(/(\s| )(\s| )+$/,"$1");
		//}

		if ((1 == AppPlatform.Survey.Option.list[subjId]["type"]) || (2 == AppPlatform.Survey.Option.list[subjId]["type"])) {
			if (checkObj.value.empty()) {
				document.getElementById("opt_" + optId).checked = false;
			} else {
				document.getElementById("opt_" + optId).checked = true;
				var selNum = 0;
				var checkObjArray = document.getElementsByName("sbj_" + subjId + "[]");
				for (i = 0; i < checkObjArray.length; i++) {
					if (checkObjArray[i].checked) {
						selNum++;
					}
				}
				if (selNum > maxNum && maxNum != 0) {
					alert("\u5bf9\u4e0d\u8d77\uff0c\u672c\u9898\u6700\u591a\u53ea\u80fd\u9009\u62e9" + maxNum + "\u4e2a\u9009\u9879\uff0c\u8bf7\u53d6\u6d88\u5176\u5b83\u9009\u9879\uff0c\u518d\u8f93\u5165\uff0c\u8c22\u8c22\uff01");
					checkObj.value = "";
				} else {
					document.getElementById("opt_" + optId).checked = true;
				} if (checkObj.value.length > maxLen) {
					checkObj.value = checkObj.value.subTextStr(maxLen);
				}
				if (checkObj.value.empty()) {
					document.getElementById("opt_" + optId).checked = false;
				}
				if (document.getElementById("opt_" + optId).checked) {
					AppPlatform.$("question_" + subjId).className = AppPlatform.Survey.Input.className;
				}
			}
		} else {
			if (checkObj.value.length > maxLen) {
				checkObj.value = checkObj.value.subTextStr(maxLen);
			}
			document.getElementById("text_curlen_" + subjId).innerHTML = checkObj.value.length;
			if (checkObj.value.length >= minLen) {
				AppPlatform.$("question_" + subjId).className = AppPlatform.Survey.Input.className;
			}
		}
	},

	setInnerText: function(objId, textValue) {
    if(!AppPlatform.Cookie.getCookie("qq_client_id")) {
      userLogin();
      return;
    }
		try {
			document.getElementById(objId).innerHTML = textValue;
		} catch (e) {}
	}
};

AppPlatform.Survey.Page = {
	type: "index",
	id: 0,
	resize: function(pjtId) {
		if (typeof pjtId != "undefined") {
			AppPlatform.Survey.Page.id = parseInt(pjtId);
		}
		if (AppPlatform.Survey.Page.type == "mini") {
			try {
				window.parent.AppPlatform.Survey.resetIframe(AppPlatform.Page.getPageHeight(), AppPlatform.Survey.Page.id);
			} catch (e) {}
		}
	}

};
AppPlatform.Survey.User = {
	needCheckQQ: false,
	init: function() {
		AppPlatform.Survey.User.needCheckQQ = true;
		if (AppPlatform.Survey.User.getUin() == 0) {
			AppPlatform.$("submit_survey").value = "\u767b\u5f55\u5e76\u63d0\u4ea4";
		}
	},
	getUin: function() {
		if (AppPlatform.Cookie.getCookie("luin") && AppPlatform.Cookie.getCookie("lskey") || (AppPlatform.Cookie.getCookie("uin") && AppPlatform.Cookie.getCookie("skey"))) {
			if (AppPlatform.Cookie.getCookie("luin")) {
				return parseInt(AppPlatform.Cookie.getCookie("luin").replace(/^o0*/, ""));
			} else {
				return parseInt(AppPlatform.Cookie.getCookie("uin").replace(/^o0*/, ""));
			}
		} else {
			return 0;
		}
	},
	login: function(callback) {
		AppPlatform.Survey.User.LoginBox.login(callback);
	},
	LoginBox: {
		show: function(callback) {
			AppPlatform.$("Float").style.width = AppPlatform.Page.getPageWidth() + "px";
			AppPlatform.$("Float").style.height = AppPlatform.Page.getPageHeight() + "px";
			AppPlatform.$("Float").style.display = "block";
			AppPlatform.$("Login_Box").style.left = (AppPlatform.Page.getBodyWidth() - 340) / 2 + "px";
			AppPlatform.$("Login_Box").style.top = AppPlatform.Page.getBodyTop() + 100 + "px";
			AppPlatform.$("Login_Box").style.display = "block";
			AppPlatform.$("Login_Frame").src = "http://xui.ptlogin2.qq.com/cgi-bin/xlogin?style=40&low_login=0&target=self&appid=5000501&s_url=http://www.qq.com/apps/html/login.html";
			AppPlatform.Survey.User.LoginBox.oY = AppPlatform.Page.getBodyTop();
			AppPlatform.Survey.User.LoginBox.oTimer = window.setInterval(AppPlatform.Survey.User.LoginBox.scroll, 1);
		},
		hide: function() {
			AppPlatform.$("Float").style.display = "none";
			AppPlatform.$("Login_Box").style.display = "none";
			AppPlatform.$("Login_Frame").src = "about:blank";
			window.clearInterval(AppPlatform.Survey.User.LoginBox.oTimer);
		},
		oY: 0,
		oTimer: null,
		scroll: function() {
			var winY = AppPlatform.Page.getBodyTop();
			var curY = AppPlatform.Element.getElementTop("Login_Box");
			var percent = 0.2 * (winY - AppPlatform.Survey.User.LoginBox.oY);
			if (percent > 0) {
				percent = Math.ceil(percent);
			} else {
				percent = Math.floor(percent);
			}
			AppPlatform.$("Login_Box").style.top = curY + percent + "px";
			AppPlatform.Survey.User.LoginBox.oY += percent;
			AppPlatform.$("Float").style.width = AppPlatform.Page.getPageWidth() + "px";
			AppPlatform.$("Float").style.height = AppPlatform.Page.getPageHeight() + "px";
			AppPlatform.$("Float").style.display = "block";
		},
		login: function(callback) {
			AppPlatform.HashTable.getInstance().set("login_callback", callback);
			this.show();
		},
		ok: function() {
			if (typeof AppPlatform.HashTable.getInstance().get("login_callback") == "function") {
				AppPlatform.HashTable.getInstance().get("login_callback")();
				AppPlatform.HashTable.getInstance().remove("login_callback");
			} else {
				AppPlatform.Survey.Input.check();
			}
			this.hide();
		},
		cancel: function() {
			AppPlatform.HashTable.getInstance().remove("login_callback");
			this.hide();
		}
	}
};

function createXMLHttpRequest() {
	var xmlHttp;
	if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
		if (xmlHttp.overrideMimeType)
			xmlHttp.overrideMimeType('text/xml');
	} else if (window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	return xmlHttp;
}

function sendPost(url, params) {
	xmlHttp = createXMLHttpRequest();
	xmlHttp.open("POST", url, true);
	xmlHttp.onreadystatechange = getResult;
	xmlHttp.setRequestHeader("Content-Length", params.length);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
	xmlHttp.send(params);
}

function getResult(callback) {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			callback(xmlHttp.responseText); //xmlHttp.responseXML;
		}
	}
}

function generateToken() {
	var key = "";
  var hash = 2013;
  var token = AppPlatform.Cookie.getCookie('qq_access_token');
  if(token){
    key = token;
  }
	if (key) {
		for (var i = 0, len = key.length; i < len; i++) {
			hash += (hash << 5) + key.charCodeAt(i);
		}
	}
	return hash & 0x7fffffff;
}

function getKey() {
	return AppPlatform.Cookie.getCookie('skey') || AppPlatform.Cookie.getCookie('lskey');
}

function form_post(url, data) {
	//create frame

	var _target = 'post_iframe';
	if (!$('#post_iframe').length) {
		$("body").append('<iframe id="post_iframe" name="post_iframe" style="display:none"><script type="text/javascript">document.domain = "qq.com";</script></iframe>');
	}
	var _$form = $('#_messageform').length ?
		$('#_messageform').attr('action', url).empty() :
		$('<form action="' + url + '" method="post" target="' + _target + '" id="_messageform" style="display:none;"></form>').appendTo($("body"));

	for (name in data) {
		_$form.append($('<input name="' + name + '" type="hidden" value="" />').val(data[name]));
	}
	_$form.submit();
}/*  |xGv00|b4a17e7691444ee1857df8e5cf04fde4 */