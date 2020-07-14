var phone = {
	_style: 11,
	callback_url: 'http://cq.qq.com',
	appid: 5000701,
	daid: 108,
	low_login: 0,
	logo: '//mat1.gtimg.com/cq/cody/2013/smm/244x100.png',
	make_url: function(){
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		if(bIsIpad || bIsIphoneOs){
			_style = 8;
		}else{
			_style = 9;
		}
		if(this.getUin() === 0){
			window.location.href = 'http://ptlogin2.qq.com/cgi-bin/login?style='+ this._style +'&appid='+ this.appid +'&daid='+ this.daid +'&s_url='+ this.callback_url +'&low_login='+this.low_login+'&hln_css='+this.logo;
		}
	},
	getUin: function () {
		var uin = this.cookie('uin');
		if (uin) {
			return this.trim(uin.replace(/^[o0]*/i, ''));
		}
		return 0;
	},
	cookie:function (name, value, seconds, domain) {
		if (!value) {
			name += '=';
			value = document.cookie.split(';');
			for (var e = 0; e < value.length; e++) {
				var k = this.trim(value[e]);
				if (k.indexOf(name) == 0) {
					return unescape(k.substring(name.length, k.length));
				}
			}
			return null;
		}
		if (seconds) {
			var expires = new Date();
				expires.setTime(expires.getTime() + seconds * 1000);
			seconds = "; expires=" + expires.toGMTString();
		} else {
			seconds = '';
		}
		document.cookie = name + "=" + escape(value) + seconds + "; path=/" + (domain ? ";domain=" + domain : '');
	},
	trim:function(str) {
		return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
	}
}

var ACT = {
	actid : 0,
	voteid: 0,
	catagory: 'image',
	
	vote: function (actid, voteid, catagory) {
		if (actid == '' || voteid == '') {
			alert('\u53c2\u6570\u4e22\u5931'); return;
		};
		if (ACT.voteid) {
			alert('\u8bf7\u64cd\u4f5c\u9891\u7387\u4e0d\u8981\u592a\u5feb\uff0c\u8c22\u8c22'); return;
		}
		ACT.actid  = actid;
		ACT.voteid = voteid;
		
		if (catagory) {
			ACT.catagory = catagory;
		}
		$.post('http://ud.cq.qq.com/api/activity/'+actid+'/vote/'+ACT.catagory+'/'+voteid+'/iframe', {callback:'ACT.voteback'});
	},
	
	voteback: function (ret) {
		var errcode = parseInt(ret.retcode);
		switch(errcode) {
			case 0:
				var wid = '#'+ACT.catagory+'_vote_weight_'+ACT.voteid,
					vid = '#'+ACT.catagory+'_vote_'+ACT.voteid;
				var vote_weight = parseInt($(wid).text()) + parseInt(ret.data.vote_weight),
					vote        = parseInt($(vid).text()) + 1;
				$(wid).text(vote_weight);
				$(vid).text(vote);
				//增加本地存储
				richStorage.set('clubactv2_' + wid, vote_weight);
				richStorage.set('clubactv2_' + vid, vote);
				
				break;
				
			case 4005:
				var actid  = ACT.actid;
				var voteid = ACT.voteid;
				D.login.getLogin(function() {
					ACT.vote(actid, voteid);
				});
				break;
				
			default:
				var msg = {
					3001: '\u5bf9\u4e0d\u8d77\uff0c\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458',//对不起，系统错误，请联系管理员
					4001: '\u5bf9\u4e0d\u8d77\uff0c\u6295\u7968\u7c7b\u522b\u4e0d\u6b63\u786e',//对不起，投票类别不正确
					4002: '\u5bf9\u4e0d\u8d77\uff0c\u60a8\u6295\u7968\u7684\u9891\u7387\u8fc7\u5feb\uff0c\u8bf7\u559d\u676f\u8336\u518d\u6765',//对不起，您投票的频率过快，请喝杯茶再来
					4003: '\u5bf9\u4e0d\u8d77\uff0c\u60a8\u6240\u5728IP\u7684\u6295\u7968\u6570\u5df2\u5230\u8fbe\u6d3b\u52a8\u89c4\u5219\u9650\u5236',//对不起，您所在IP的投票数已到达活动规则限制
					4004: '\u5bf9\u4e0d\u8d77\uff0c\u5df2\u7ecf\u8fc7\u4e86\u6295\u7968\u65f6\u9650',//对不起，已经过了投票时限
					4006: '\u5bf9\u4e0d\u8d77\uff0c\u6b64\u6d3b\u52a8\u6ca1\u6709\u542f\u7528\u6295\u7968\u529f\u80fd',//对不起，此活动没有启用投票功能
					4007: '\u5bf9\u4e0d\u8d77\uff0c\u88ab\u6295\u7968\u4f5c\u54c1\u6216\u7528\u6237\u4e0d\u5b58\u5728\u6216\u672a\u901a\u8fc7\u5ba1\u6838',//对不起，被投票作品或用户不存在或未通过审核
					4008: '\u5bf9\u4e0d\u8d77\uff0c\u6295\u7968\u5df2\u7ecf\u5173\u95ed'//对不起，投票已经关闭
				};//4009 单独有提醒,不在这里定义提示
				if (msg[errcode]) {
					alert(msg[errcode]);
				} else {
					alert(ret.msg);
				}
		}
		ACT.voteid = 0;
	}
};
function vote(t,a,b){
	var now_num = $(t).parent('.hst_titleCon').find('.total').text() === '' ? 0 : parseInt($(t).parent('.hst_titleCon').find('.total').text());
	var _num = now_num + 1;
	var url_links = 'http://ud.cq.qq.com/api/activity/'+a+'/vote/user/'+b+'/iframe';
	
	if(!$("#voteform").length) {
		$("body").append('<form id="voteform" name="voteform" target="voteframe" method="post" action="'+url_links+'" style="display:none"></form><iframe name="voteframe" id="voteframe" style="display:none"></iframe>');
	}
	$("#voteform").submit();

	parent.callback = function(a){
		if(a.retcode == '0'){
			$(t).parent('.hst_titleCon').find('.total').text(_num);
			alert('\u6295\u7968\u6210\u529f!');
		}else if (a.retcode == '4004'){
			alert('\u5bf9\u4e0d\u8d77\uff0c\u5df2\u7ecf\u8fc7\u4e86\u6295\u7968\u65f6\u9650!');
		}else{
			alert('\u5bf9\u4e0d\u8d77\uff0c\u60a8\u6240\u5728IP\u7684\u6295\u7968\u6570\u5df2\u5230\u8fbe\u6d3b\u52a8\u89c4\u5219\u9650\u5236');
		}
	};

}/*  |xGv00|9df61ff1455fba4814c26cdee8de2ac5 */