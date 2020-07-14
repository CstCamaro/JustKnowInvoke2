function internal_library() { };
internal_library.prototype.OnLoadCompleted = UserInfoCallBack;

function ie_callback() {
	if(this.readyState == 'loaded' && this.WooObj.OnLoadCompleted != null)
		this.WooObj.OnLoadCompleted();
};

function netscape_callback() {
	if(this.WooObj.OnLoadCompleted != null)
		this.WooObj.OnLoadCompleted();
};

internal_library.prototype.Load = function(url) {						
	var scriptBlock = document.createElement("script");
	scriptBlock.setAttribute("type", "text/javascript");
	scriptBlock.setAttribute("src", url);
	scriptBlock.WooObj = this;
	// set callback function		
	if(scriptBlock.readyState!='') {
		scriptBlock.onreadystatechange = ie_callback;
	}
	else if(scriptBlock.onload) {
		scriptBlock.onload = netscape_callback;
	}
	else {
		setTimeout(UserInfoCallBack,300);
	}
	document.getElementsByTagName('head')[0].appendChild(scriptBlock);
};
//base tools
var OFLbs = {
	//按className获取EL
	getCN:function(etType,cn){
		var aEl=etType;
		var aElLen=aEl.length;
		var reg=new RegExp('^|'+cn+'|&');
		var ar=[];
		for(var i=aElLen;i--;){
			if(aEl[i].className && reg.test(aEl[i].className)){
				ar.push(aEl[i]);
			}
		};
		return ar;
	},
	//获取元素的纵坐标 
	getTop:function (e){ 
		var offset=e.offsetTop; 
		if(e.offsetParent!=null) offset+=OFLbs.getTop(e.offsetParent); 
		return offset; 
	},
	//获取元素的横坐标 
	getLeft:function (e){ 
		var offset=e.offsetLeft; 
		if(e.offsetParent!=null) offset+=OFLbs.getLeft(e.offsetParent); 
		return offset; 
	}
}
function oneFollowLayer(ulId){
	this.ulId = ulId;
	this.init();
}
oneFollowLayer.g_hover = false;
oneFollowLayer.g_stMouseover = oneFollowLayer.g_stMouseover || 0;
oneFollowLayer.g_disBoard=[];
oneFollowLayer.g_board={};
oneFollowLayer.prototype.init = function(){
	var _this = this;
	var onekey_ulEl = document.getElementById('selectbt'+this.ulId);						
	var a_aEl=onekey_ulEl.getElementsByTagName('a');
	a_aEl = OFLbs.getCN(a_aEl, 'anchor');
	_this.bindE(a_aEl);
	ret=null;
}
oneFollowLayer.prototype.bindE = function(a_aEl){
	var _this = this;
	var len=a_aEl.length;
	for(var i=0; i<len;i++){								
		_this.addE(a_aEl[i],'mouseover',oneFollowLayer.mov);
		_this.addE(a_aEl[i],'mouseout',oneFollowLayer.mou);								
	}
}
oneFollowLayer.mov = function(el){
	oneFollowLayer.g_hover=true;
	var liEl=el.parentNode;
	var boardEl=liEl.getElementsByTagName('div')[0];
	if(boardEl.style.display=='none'){							
		var name=(el.href).split('/');
		var offst=name.length-2;
		name=name[offst];
		if(boardEl.get&&boardEl.get=="1"){									
			
			//鼠标没有在任何头像上
			if(!oneFollowLayer.g_hover){
				boardEl.style.display='none';
			}else{
				boardEl.style.display='block';
			}

			oneFollowLayer.g_disBoard.push(boardEl);
			if(oneFollowLayer.g_disBoard.length>1){
				oneFollowLayer.undisBoard();
			}
			if(boardEl.id){
				new MI.FollowOne({
					listId: boardEl.id,
					pref: 'qqcom.followone'
				});
			}
			
			return
		};
		var Library =new internal_library();
		Library.Load('http://radio.t.qq.com/api/user/info.php?u='+name+'&r='+new Date().getTime());								
		oneFollowLayer.g_board=boardEl;	

	}
}
oneFollowLayer.mou = function(el){
	var liEl=el.parentNode;
	var boardEl=liEl.getElementsByTagName('div')[0];							
	//如果鼠标在浮层上
	if(boardEl.hv==1){
		return;
	}

	if(boardEl.style.display=='block'&&boardEl.get=="1"){
		boardEl.style.display='none';
	}
}
oneFollowLayer.prototype.addE = function(el,etp,cb){
	if(el.addEventListener){
		el.addEventListener(etp,function(){clearTimeout(oneFollowLayer.g_stMouseover); oneFollowLayer.g_stMouseover=null; oneFollowLayer.g_stMouseover = setTimeout(function(){cb(el)},300)},false)
	}else if(el.attachEvent){
		el.attachEvent('on'+etp,function(){ clearTimeout(oneFollowLayer.g_stMouseover);oneFollowLayer.g_stMouseover=0; oneFollowLayer.g_stMouseover = setTimeout(function(){cb(el)},300)})
	}
}
oneFollowLayer.undisBoard = function(){
	var len=oneFollowLayer.g_disBoard.length;
	if(len<2){
		return;
	}
	for(var i=0;i<len-1;i++){
		oneFollowLayer.g_disBoard[i].style.display='none';
	}
	//鼠标没有在任何头像上
	if(!oneFollowLayer.g_hover){
		oneFollowLayer.g_disBoard[len-1].style.display='none';
	}else{
		oneFollowLayer.g_disBoard[len-1].style.display='block';
	}
	
	oneFollowLayer.g_disBoard=[oneFollowLayer.g_disBoard.pop()];
}	



function UserInfoCallBack(ret){
	if(typeof ret=='undefined'){
		return;
	}		
	var boardEl=oneFollowLayer.g_board;
	boardEl.f_type=0;
	var htmlText='<div class="tip">这是你自己</div>'+
				'<div class="tip" style="display: none;"></div>'+
				'<div class="userPic">'+
					'<a href="http://t.qq.com/{namet}/" target="_blank"><img src="{imgurl}" style="height:50px; width:50px;"/></a>'+				
				'</div>'+
				'<div class="uCardcnt">'+
					'<p class="userName">'+
						'<a href="http://t.qq.com/{namet}/" target="_blank">{nickt}</a>'+
						'{vip}'+												
					'</p>'+
					'<p class="nums">广播{press}条<span>|</span>听众{follow}人</p>'+
					'<p class="btn" id="btn{namet}"><input type="button" val="{namet}" class="addAttention" style="display: block;" id="follow{namet}"/><span class="delAttention" id="unfollow{value}"  style="none" >取消</span></p>'+
					'<div class="uInfobox " style="display:{dis}">'+
						'<div class="sepline"></div>'+
						'<p class="uIntro">{intro}</p>'+
					'</div>'+
				'</div>'+
				'<div class="uloadBox"><em class="loading"></em>资料卡加载中'+
				'</div>'+
				'<div class="SA"><em>◆</em><span>◆</span><b>◆</b></div>'							
	if(ret.info){
		var info=ret.info;
	}
	var rstHtml=htmlText.replace(/\{([^\}]*)\}/g,function(match,point,position){
		switch(point){
			case 'namet':
			return info.account.name?info.account.name:'腾讯网友';
			case 'nickt':
			return info.account.nick?info.account.nick:'腾讯网友';
			case 'imgurl':
			return info.mini.head==''?'http://mat1.gtimg.com/www/mb/images/head_50.jpg':info.mini.head+'/50';
			case 'press':
			return info.messageTotal;
			case 'follow':
			return info.count.follower;									
			case 'vip':
			return info.account.vip?'<a title="腾讯认证" class="vip" target="_blank" href="http://t.qq.com/certification"></a><br/>':'';
			case 'dis':
			if(!(/\S+/g.test(info.mini.intro))){
				return 'none';
				break;
			}else{
				return 'block';
			}
			case 'intro':									
			return info.mini.intro;
			case 'value':
			return info.account.uin;
			
		}
	});
	//返回数据与对应浮层相符
	if(boardEl.id.indexOf(info.account.name)>-1||boardEl.id.indexOf(info.account.uin)>-1){
		boardEl.innerHTML=rstHtml;				
		
		if(!oneFollowLayer.g_hover){
			boardEl.style.display='none';
		}else{
			boardEl.style.display='block';
		}
		
		oneFollowLayer.boardPositon(boardEl);
		//浮层的鼠标效果
		boardEl.onmouseover=function(e){
			oneFollowLayer.g_hover=true;
			boardEl.hv=1;									
			//鼠标没有在任何头像上
			if(!oneFollowLayer.g_hover){
				boardEl.style.display='none';
			}else{
				boardEl.style.display='block';
			};
		}
		boardEl.onmouseout=function(){
			oneFollowLayer.g_hover=false;
			if(typeof boardEl.hv=='undefined'){
				return;
			}
			boardEl.hv=0;
			var el=boardEl.parentNode.getElementsByTagName('a')[0];
			oneFollowLayer.mou(el);

		}	
		//避免多个浮层同时显示
		oneFollowLayer.g_disBoard.push(boardEl);
		if(oneFollowLayer.g_disBoard.length>1){
			oneFollowLayer.undisBoard();
		}

		//数据成功返回并添加成功，失败为'0'
		boardEl.get='1';
		//添加单个收听
		boardEl.id=info.account.uin;
		new MI.FollowOne({
				listId : info.account.uin,
				pref : 'followone'
		});
		//清除jsonp请求
		var head=document.getElementsByTagName('head')[0];
		var jsonpEl=head.getElementsByTagName('script');
		var jsonLen=jsonpEl.length;
		for(var i=0; i<jsonLen; i++){
			if(jsonpEl[i].src.indexOf('/api/user/info.php')>-1){
				head.removeChild(jsonpEl[i]);
			}
		}
	}else{//返回数据与对应浮层不符							
		boardEl.get='0';
		return;
	}	
}
oneFollowLayer.boardPositon = function(boardEl){
	var coner=boardEl.getElementsByTagName('div');
	var _coner=coner[coner.length-1];
	var bdParentEl=boardEl.parentNode;
	var bdParentW=bdParentEl.clientWidth;
	var bdW=boardEl.clientWidth;
	
	boardEl.style.top=OFLbs.getTop(bdParentEl)+10+'px';
	if(OFLbs.getLeft(boardEl)<320){
		_coner.className='SA1';
		boardEl.style.left=OFLbs.getLeft(bdParentEl)+bdParentW+15+'px';
	}else{
		_coner.className='SA';
		boardEl.style.left=OFLbs.getLeft(bdParentEl)-bdW+'px';
	}

}
/*  |xGv00|40af1c01b0f8b83ef6476e6ca89f5c9d */