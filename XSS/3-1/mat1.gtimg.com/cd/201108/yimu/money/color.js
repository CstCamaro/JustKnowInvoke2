/*begin:颜色设置*/
(function(){
	__.set('__.app.finance.color');
	var _cookie = 'finance_cfg_fc';
	var cfg = __.cookie.get(_cookie);
	if(cfg != 'cn' && cfg != 'en'){
		cfg = 'cn';
	}
	var domCn,domEn;
	var color = [
		{'cn':'#FF0300','en':'#129800'},//up
		{'en':'#FF0300','cn':'#129800'},//donw
		{'en':'#2C2C2C','cn':'#2C2C2C'},//same
	];
	var set = function(c){
		if(c == 'cn'){
			domCn.checked = true;
			domEn.checked = false;
		}else{
			domCn.checked = false;
			domEn.checked = true;				
		}		
		if(cfg == c) return;		
		cfg = c;
		__.event.fire(__.app.finance.color,'change',cfg);
		__.cookie.set(_cookie,cfg,{
       path:'/',
       domain:'.finance.qq.com',
       expires:(new Date().getTime()+24*3600*1000)
    });
	};
	__.app.finance.color = {
		toString:function(){
			return cfg;
		},
		get:function(num,change,pref,subf){
			if(isNaN(num)){
				return '--';
			}
			if(pref !== false){
				num = num.replace('+','');
				num = num>0?('+'+num):num;
			}
			subf = subf || '';
			var c = change>0?0:(change<0?1:2);
			return '<span style="float:none;color:'+color[c][cfg]+'">'+num+subf+'</span>';
		},
		init:function(cn,en){
			domCn = __.dom.f(cn);
			domEn = __.dom.f(en);
			set(cfg);
			__.event.on(domCn,'click',function(){
				set('cn');	
			});
			__.event.on(domEn,'click',function(){
				set('en');	
			});	
		}
	}
}());
//init
//__.app.finance.color.init('ipt_fc_cn','ipt_fc_en');
/*end:颜色设置*//*  |xGv00|501904ce13327c2eb61287b17bb5abc3 */