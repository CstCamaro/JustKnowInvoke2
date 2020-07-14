;(function(win,$){
	var yxj_detail = {};
	yxj_detail = {
		base:{
			data:{}
			,show:function(data){
				$('#base_content_tpl').tmpl('tpl_base_content', {
					base: data
				});
				$('#team_name').html(data.uname+'：'+data.name);
				if(data.status == 1)
					donateObj.init(data.id);
				else
					$('#btn_donate1').html("募款已结束").addClass('btn-donate-end');
				this.share.init({id:data.id,pic:data.image+'/500'});
				this.teamfengcai(data.roll_img);
			}
			,teamfengcai:function(data){
				$('#team_fengcai_tpl').tmpl('tpl_team_fengcai',data);
				/*$(".pics-ads-list-wrap").jCarouselLite({
				    btnNext: ".btnNext",
				    btnPrev: ".btnPrev",
				    auto:3000
				});*/
			}
			,share:{
				'init':function(data){
					$(".share_btn").click(function(){
						var type = $(this).attr('ctype');
						var info = yxj_detail.base.share._getShareInfo(data);
						$.gyUtil.shareSNS(type,info);
					});
				},
				'_getShareInfo':function(data){
					
					var url = "http://gongyi.qq.com/act/yixingjia/team_detail.htm?id="+data.id;
					var _url = encodeURIComponent(url);
					var _title = '为了乡村孩子的100所益行运动场，我正与中国的青年力量共同努力。快和我一起成为益行家，助力乡村小脚丫幸福跳跃、快乐奔跑！#';//+_url;
					
					var _t = encodeURIComponent(_title);
					_t= _t.replace(/\#/g, "%23");
					var _pic = encodeURIComponent(data.pic);
					var _site = 'http://gongyi.qq.com/act/yixingjia/';			
					return {'url':_url,'title':_t,'pic':_pic,'site':_site};
				}
			}
		}
		,all_ground_list:function(){
				
			var _callback = function(data){
				$('#more_ground_tpl').tmpl('tpl_more_ground', data);					
			}
			var _url = 'http://gongyi.qq.com/js/act/yxj/ground.js?_t='+Math.random();
			$.gyUtil.newGetJSON(_url, _callback,'showGround');
		}
		,hot_team:function(){
			var _callback = function(data){
				$('#r_team_tpl').tmpl('tpl_r_team', {
					list: data
				});
			}
			var _url = 'http://gongyi.qq.com/js/act/yxj/team_top_15.js?_t='+Math.random();
			$.gyUtil.newGetJSON(_url, _callback,'showTeam');
		}
		,loadpage:function(){
			var tid = $.gyUtil.getQueryStr('id');
			if(!tid) return false;
			if(isNaN(tid))
			{
				window.location.href="http://gongyi.qq.com/act/yixingjia";
				return;
			}
			
			
			var _callback = function(data){
				$('#r_team_tpl').tmpl('tpl_r_team', data);
				
				
			}			
			
			try {
				var _callback = function(data){
					if(!data) window.location = 'http://gongyi.qq.com/act/yixingjia/';
					yxj_detail.base.show(data);
					$('#tpl_team_desc_zhengwen').html(data.desc);
				}
				var _jsFilename = 'team_detail_'+tid+'.js';
				var _url = 'http://gongyi.qq.com/js/act/yxj/'+_jsFilename+'?_t='+Math.random();
				//document.write('<script src="'+_url+'"></script>');				
				$.gyUtil.newGetJSON(_url, _callback,'showTeamDetail');
			}catch(e){
				window.location = 'http://gongyi.qq.com/act/yixingjia/';
			}
			
			
			
			
		},
		donate_rank:function(){
			var tid = $.gyUtil.getQueryStr('id');
			if(!tid) return false;
			var _callback = function(data){
				var len = data.length;
				if(len>=1){
					$('#rank-list').empty();
					var css = '';
					for(var i=0;i<len;i++){
						var o = data[i];
						if(i%2==1){
							css="mod2"
						}
						else
							css = '';
						var money = parseFloat(o.f_money).toFixed(2);
						if(money>=10000){
							money/=10000;
							money = money.toFixed(2);
							money=money+"万"
						}
						if(o.name.length<1)
							o.name = '匿名';
						var html = '<li class="'+css+'"><div class="rank-row">'+(i+1)+'</div><div class="rank-name">'+o.name+'</div><div class="rank-money">捐助'+money+'元</div><div class="rank-time">'+o.f_ctime+'</div></li>';

						$(html).appendTo('#rank-list');
					}
				}
			}
			var _url = 'http://gongyi.qq.com/js/act/yxj/team_donate_rank_'+tid+'.js?_t='+Math.random();
			$.gyUtil.newGetJSON(_url, _callback,'showDonateList');
		}
		
	}
	
	
	var donateObj = {};
	donateObj = {
		'form':'donateForm'
		,'btn1':'btn_donate1'
		,'team_id':0
		,init:function(tid){
			this.team_id = tid;
			var $_amountInput = $("#"+this.form+" input[name='amount']");
			$(".marginrg").each(
				function(i){
					$(this).click(function(){
						$(".marginrg").removeClass('on');
						$(this).addClass('on');
						var _amount = $(this).attr('value');
						if(!!_amount && _amount>0){				
							$_amountInput.val(_amount*100);
							$("#money_other_top").val("");
						}else if($(this).attr('ctype') == 'other'){
							var _val = $("#money_other_top").val();						
							$_amountInput.val(_val*100);
							$("#money_other_top").keyup(function(){
								$(this).val($(this).val().replace(/[^0-9\.]*/g,""));
							});
						}
					});
				}
			);
			$_amountInput.val($(".marginrg").eq(0).attr("value")*100);
			$("#money_other_top").keyup(function(){
				var _amount = $(this).val();
				if(!!_amount && _amount>0)
					$_amountInput.val(_amount*100);
				else
					$_amountInput.val("");
			});
			
			var _callback = function(data){
				$("#donateForm input[name='gt']").val(donateObj.team_id+"_"+data.info.id);
			}
			var _url = 'http://npoapp.gongyi.qq.com/yxj/ground/latest?jsoncallback=donatecallback&_t='+Math.random();
			$.gyUtil.newGetJSON(_url,  _callback, 'donatecallback');
			
			$("#"+this.btn1).bind('click',function(){
				donateObj.toDonate();
			});
			
		}
		,'toDonate':function(){
			var _uin = $.gyUser.checkLogin();
			//判断是否登录
			if(!_uin){
				var _money = $("#"+this.form+" input[name='amount']").val();
				var expires = new Date();
				expires.setTime(expires.getTime() + 50 * 60 * 1000); //50分钟有效
				GyLib.Cookie().set("bLoginMoney",_money,expires,"/","gongyi.qq.com");
				ptloginopenfun();
				return false;
			}
			var _amount = $("#"+this.form+" #amount_a").val();	//金额
			if(_amount<=0){
				alert('请输入金额');
				return false;
			}
			
			
			$("#qq").val(_uin);
			//财付通面登陆
			var _skey = GyLib.Cookie().get("skey");
			
			var _url = "https://www.tenpay.com/app/v1.0/communitylogin.cgi?p_uin="+_uin+"&skey="+_skey+"&u1=&appid=113&win=self";
			var _iframe = $('#tenpay_iframe');
			if(_iframe[0]==null)
				$('<iframe id="tenpay_iframe" frameborder="0px" scroll="no" border="0px" src="'+_url+'" width="1px" height="1px"></iframe>').appendTo('body');
			else
				_iframe.attr('src',_url);
			
			
			$("#donateForm").submit();
			
		}
	}
	win.yxjObj = {};
	yxjObj.init = function(){
		yxj_detail.loadpage();
		yxj_detail.hot_team();
		yxj_detail.all_ground_list();
		yxj_detail.donate_rank();
	}
	
})(window,jQuery);

	/*  |xGv00|7a5d1969f0602ccd13326cac2b05e3e2 */