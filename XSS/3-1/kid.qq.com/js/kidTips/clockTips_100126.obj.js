
try{
	document.execCommand('BackgroundImageCache', false, true);
}catch(e){}

function _$(id)
{
	return document.getElementById(id);
}

var cookieOp_obj=
{
	cookie: function(name, value, opts)
    {
        if (typeof(value)=="undefined")
        {
            var v = new RegExp("(^|; *)"+name+"=([^;]*)(;|$)","gi").exec(document.cookie);
            return v ? decodeURIComponent(v[2]) : '';
        }
        else
        {
            var opts = opts || {};
            var c = name + '=' + encodeURIComponent(value);
            for (var i in opts)
				c +=  '; ' + i + '=' + opts[i];
            document.cookie = c + ';';
        }
    }
	
	
};



var clockTips_obj={
	res:false,
	time_len:kidTips_time_skip_len,
	__getTime:function()
	{
		var time=(new Date()).getTime();
		return parseInt(time/1000);
	},
	
	show:function()
	{
		_$("dingding").style.display="block";
		_$("dingding_ifr").style.display="block";
		var me=this;
		this.UpLTime();
		me.res=setTimeout(function(){me.close();},kidTips_time_show_len*1000);
		
	},
	close:function()
	{
		this.UpLTime();
		_$("dingding").style.display="none";
		_$("dingding_ifr").style.display="none";
		this.run();
	},
	run:function()
	{
		var me=this;
		if(me.res)
		{
			clearTimeout(me.res);
		}
		var nowTime=this.__getTime();
		var lastTime=this.GetLTime();
		var setTime=parseInt(lastTime)+me.time_len-parseInt(nowTime);
		
		if(setTime>0)
		{
			me.res=setTimeout(function(){
				me.show();
				
			},setTime*1000)
		}else
		{
			me.show();
		}
	},
	UpLTime:function(){
		  var a=this.__getTime();
		  var opt={
		  	'path':"/",
			'domain':"qq.com"
		  };
		  cookieOp_obj.cookie("bbs_kid_ltime",a,opt);
		  return a;
	},
	GetLTime:function(){
		 var a=cookieOp_obj.cookie("bbs_kid_ltime");
		  if(a){
		    return a;
		  }else {
		    return this.UpLTime();
		  }
	}
};
clockTips_obj.run();/*  |xGv00|88f105d87eba8531d4489dcea05b4f3c */