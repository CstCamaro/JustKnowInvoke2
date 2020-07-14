/**
 * @author 封凯
 */
var CB = {
		isIE:navigator.userAgent.indexOf('MSIE')!=-1,
		isFirefox:navigator.userAgent.indexOf('Firefox')!=-1,
		isOpera:window.opera!=null
};
var isClose = false;
var getDateString = {
	YY:null,
	mm:null,
	dd:null,
	HH:null,
	ii:null,
	ss:null,
	ww:null,
	td:null,
	obj:null,
	num:19,
	init:function() {
		var arg = arguments[0] ? arguments[0] : null;
		
		if(typeof arg == 'string') {
			var date = new Date(arg);
		} else if(typeof arg == 'object') {
			this.obj = arg;
			var datestr = arg.value;
			if(datestr == '') {
				datestr = arguments[1] ? arguments[1] : '';
			}
			this.num = datestr.length;
			switch(this.num) {
				case 19:
					var ymd = datestr.split(" ");
					var ymd_arr = ymd[0].split("-");
					datestr = ymd_arr[1] + '/' + ymd_arr[2] + '/' + ymd_arr[0] + ' ' + ymd[1];
					var date = new Date(datestr);
					break;
				case 16:
					var ymd = datestr.split(" ");
					var ymd_arr = ymd[0].split("-");
					datestr = ymd_arr[1] + '/' + ymd_arr[2] + '/' + ymd_arr[0] + ' ' + ymd[1] + ':00';
					var date = new Date(datestr);
					break;
				case 10:
					var ymd_arr = datestr.split("-");
					var datestr = ymd_arr[1] + '/' + ymd_arr[2] + '/' + ymd_arr[0] + " 00:00:00";
					var date = new Date(datestr);
					break;
				default:
					var date = new Date();
			}
		} else {
			var date = new Date();
		}
		
		this.YY = date.getFullYear();
		this.mm = date.getMonth() + 1;
		this.dd = date.getDate();
		this.HH = date.getHours();
		this.ii = date.getMinutes();
		this.ss = date.getSeconds();
		
		// 每月1号的星期
		date.setDate(1);
		var week_1 = date.getDay();
		
		var daynum = (new Date(this.YY, this.mm, 0)).getDate();
		
		var html  = '<table width="100%" border="0" cellspacing="0" cellpadding="0">' +
					'<tr><td class="lr d" onclick="getDateString.next(-1)">&laquo;</td><td colspan="5"><select id="date-yy" onchange="getDateString.next(0)"></select><select id="date-mm" onchange="getDateString.next(0)"></select></td><td class="lr d" onclick="getDateString.next(1)">&raquo;</td></tr>' +
					'<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr><tr>';
		var w = 0;
		for(var i = 0; i<week_1; i++) {
			html += '<td></td>';
			w++;
		}
		for(var d=1; d<=daynum; d++) {
			var c = '';
			if(d == this.dd) c = ' c';
			if(this.num < 16) {
				html += '<td class="d'+c+'" onclick="getDateString.get('+d+')">'+d+'</td>';
			} else {
				html += '<td class="d'+c+'" onclick="getDateString.setdd(this)">'+d+'</td>';
			}
			w++;
			if(w == 7) {
				html += '</tr><tr>';
				w = 0;
			}
		}
		for(var i = 1; i<7-w; i++) {
			html += '<td></td>';
		}
		var hide_his = '';
		if (this.num == 10) {
			hide_his = ' style="display:none"';
		}
		html += '</tr><tr><td colspan="7"'+hide_his+'><select id="date-hh"></select><select id="date-ii"></select><select id="date-ss"></select><input type="button" value="确定" onclick="getDateString.get()" class="cancel" /></td></tr></table>';
		if(!document.getElementById('date-box')) {
			var div = document.createElement('div');
			div.id = "date-box";
			div.className = "dateBox";
			div.onclick = function() {
				var a = arguments[0]||window.event;
				if (CB.isIE) //停止事件冒泡
					 a.cancelBubble = true;
				else
					 a.stopPropagation();
			};
			document.body.appendChild(div);
		} else {
			document.getElementById('date-box').style.display = 'block';
		}
		
		var ltwh = getLTWH(this.obj);
		document.getElementById('date-box').style.top = (ltwh.top+ltwh.height)+'px';
		document.getElementById('date-box').style.left = ltwh.left+'px';
		document.getElementById('date-box').innerHTML = html;
		// 初始年份
		for(var i=this.YY-10; i<=this.YY+10; i++) {
			var item = new Option(i,i);
			if(i == this.YY) item.selected = true;
			document.getElementById('date-yy').options.add(item);
		}
		// 初始月份
		for(var i=1; i<=12; i++) {
			if(i<10) i = "0" + i;
			var item = new Option(i,i);
			if(i == this.mm) item.selected = true;
			document.getElementById('date-mm').options.add(item);
		}
		// 初始时分秒
		for(var i=0; i<=23; i++) {
			if(i<10) i = "0" + i;
			var item = new Option(i,i);
			if(i == this.HH) item.selected = true;
			document.getElementById('date-hh').options.add(item);
		}
		for(var i=0; i<=59; i++) {
			if(i<10) i = "0" + i;
			var item = new Option(i,i);
			if(i == this.ii) item.selected = true;
			document.getElementById('date-ii').options.add(item);
		}
		for(var i=0; i<=59; i++) {
			if(i<10) i = "0" + i;
			var item = new Option(i,i);
			if(i == this.ss) item.selected = true;
			document.getElementById('date-ss').options.add(item);
		}
		EventUtil.addEventHandler(document, 'click', mousedownHandle);
	},
	next:function(type) {
		var YY = document.getElementById('date-yy').value;
		var mm = document.getElementById('date-mm').value;
		var HH = document.getElementById('date-hh').value;
		var ii = document.getElementById('date-ii').value;
		var ss = document.getElementById('date-ss').value;
		if(type == 1) {
			if (mm < 12) {
				mm = parseInt(mm, 10) + 1;
			} else {
				mm = 1;
				YY = parseInt(YY) + 1;
			}
		} else if(type == -1) {
			if (mm > 1) {
				mm = parseInt(mm, 10) - 1;
			} else {
				mm = 12;
				YY = parseInt(YY) - 1;
			}
		} else {
			
		}
		this.init(mm + '/' + this.dd + '/' + YY + ' ' + HH + ':' + ii + ':' + ss);
	},
	get:function() {
		var YY = document.getElementById('date-yy').value;
		var mm = document.getElementById('date-mm').value;
		var HH = document.getElementById('date-hh').value;
		var ii = document.getElementById('date-ii').value;
		var ss = document.getElementById('date-ss').value;
		var dd = arguments[0] ? arguments[0] : this.dd;
		dd = parseInt(dd, 10);
		if(dd < 10) dd = "0" + dd;
		switch(this.num) {
			case 10:
				var datetime = YY + '-' + mm + '-' + dd;
				break;
			case 16:
				var datetime = YY + '-' + mm + '-' + dd + ' ' + HH + ':' + ii;
				break;
			default:
				var datetime = YY + '-' + mm + '-' + dd + ' ' + HH + ':' + ii + ':' + ss;
		}
		this.obj.value = datetime;
		document.getElementById('date-box').style.display = 'none';
	},
	setdd:function(o) {
		var dd = o.innerText;
		if(parseInt(dd, 10) < 10) dd = "0" + dd;
		this.dd = dd;
		var td = document.getElementById('date-box').getElementsByTagName('td');
		for(var i=0; i<td.length; i++) {
			if (td[i].className == 'd c') {
				td[i].className = 'd';
				break;
			}
		}
		o.className = "d c";
	},
	close:function() {
		document.getElementById('date-box').style.display = 'none';
		EventUtil.removeEventHandler(document, 'click', mousedownHandle);
		return;
	}
}

function mousedownHandle() {
	var a = arguments[0]||window.event;
	var b = EventUtil.Element(a);
	if(b.id) {
		if(/^date-box/.test(b.id)){
			return;
		}
	} else {
		getDateString.close();
	}
}

var EventUtil = {
	addEventHandler:function(oTarget, sEventType, fnHandler) {
		if(oTarget.addEventListener) {
			oTarget.addEventListener(sEventType, fnHandler, false);
		}
		else if(oTarget.attachEvent) {
			oTarget.attachEvent("on" + sEventType, fnHandler);
		}
		else {
			oTarget["on" + sEventType] = fnHandler;
		}
	},
	removeEventHandler:function(oTarget, sEventType, fnHandler) {
		if(oTarget.removeEventListener) {
			oTarget.removeEventListener(sEventType, fnHandler, false);
		}
		else if(oTarget.detachEvent) {
			oTarget.detachEvent("on" + sEventType, fnHandler);
		}
		else {
			oTarget["on" + sEventType] = null;
		}
	},
	Element:function(event){
		return event.target||event.srcElement
	},
	isLeftClick:function(event){
		return (((event.which)&&(event.which==1))||((event.button)&&(event.button==1)))
	},
	pointerX:function(event){
		return event.pageX||(event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft))
	},
	pointerY:function(event){
		return event.pageY||(event.clientY+(document.documentElement.scrollTop||document.body.scrollTop))
	}
}

function getLTWH(o) {
	
	function getCurrentStyle(style)
	{
		var number=parseInt(o.currentStyle[style]);
		return isNaN(number)?0:number;
	}
	function getComputedStyle(style)
	{
		return parseInt(document.defaultView.getComputedStyle(o,null).getPropertyValue(style));
	}
	var oLTWH=
	{
		"left"  :o.offsetLeft - 75,
		"top"   :o.offsetTop,
		"width" :o.offsetWidth,
		"height":o.offsetHeight
	};
	while(true) {
		o=o.offsetParent;
		if(o==(document.body&&null))break;
		oLTWH.left+=o.offsetLeft;
		oLTWH.top +=o.offsetTop;
		if(CB.isIE) {
			oLTWH.left+=getCurrentStyle("borderLeftWidth");
			oLTWH.top+=getCurrentStyle("borderTopWidth");
		}
		if(CB.isFirefox) {
			oLTWH.left+=getComputedStyle("border-left-width");
			oLTWH.top+=getComputedStyle("border-top-width");
		}
	}
	return oLTWH;
}/*  |xGv00|0bfde684ccdfd7216518761aff815071 */