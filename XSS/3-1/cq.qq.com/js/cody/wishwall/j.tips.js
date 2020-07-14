
/*
 * created by hobo
 */

try
{
	document.domain = "qq.com";
}
catch (e)
{
}

var Tips = {
	curObject: null,
	maxZIndex: 1,
	scripWidth: 760,
	scripHeight: 500,
	scripX: 0,
	scripY: 0,

	setZIndex: function(o)
	{
		o.style.zIndex = Tips.maxZIndex++;
	},

	Mouse: {
		down: function(o, e)
		{
			Tips.setZIndex(o);
			Tips.curObject = o;

			if (!!document.all)
			{
				Tips.curObject.setCapture();
				Tips.curObject.style.top = Tips.curObject.style.pixelTop - 5 + "px";
				Tips.curObject.style.left = Tips.curObject.style.pixelLeft - 3 + "px";
				Tips.scripX = event.x - Tips.curObject.style.pixelLeft;
				Tips.scripY = event.y - Tips.curObject.style.pixelTop;
			}
			else if (window.captureEvents)
			{
				window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
				Tips.curObject.style.top = parseInt(Tips.curObject.style.top) - 5 + "px";
				Tips.curObject.style.left = parseInt(Tips.curObject.style.left)- 3 + "px";
				Tips.scripX = e.clientX - parseInt(Tips.curObject.style.left);
				Tips.scripY = e.clientY - parseInt(Tips.curObject.style.top);
			}
		},

		move: function(e)
		{
			if (!!Tips.curObject)
			{
				if (!!document.all)
				{
					Tips.curObject.style.left = event.x - Tips.scripX + "px";
					Tips.curObject.style.top = event.y - Tips.scripY + "px";
				}
				else if (window.captureEvents)
				{
					Tips.curObject.style.left = e.clientX - Tips.scripX + "px";
					Tips.curObject.style.top  = e.clientY - Tips.scripY + "px";
				}
			}
		},

		up: function(e)
		{
			if (!!Tips.curObject)
			{
				if (document.all)
				{
					Tips.curObject.releaseCapture();
					Tips.curObject.style.top = Tips.curObject.style.pixelTop + 5 + "px";
					Tips.curObject.style.left = Tips.curObject.style.pixelLeft + 3 + "px";
					Tips.curObject = null;
				}
				else if (window.captureEvents)
				{
					window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
					Tips.curObject.style.top = parseInt(Tips.curObject.style.top) + 5 + "px";
					Tips.curObject.style.left = parseInt(Tips.curObject.style.left)+ 3 + "px";
					Tips.curObject = null;
				}
			}
		}
	},

	Alt: {
		show: function(i)
		{
			Event.stop();

			$("alt_" + i).style.display = "block";
			if (Event.getClientX() + 280 > Page.getBodyWidth())
			{
				$("alt_" + i).style.left = Event.getClientX() - 280 + "px";
			}
			else
			{
				$("alt_" + i).style.left = Event.getClientX() + 5 + "px";
			}

			$("alt_" + i).style.top = Event.getClientY() - 40 + "px";
		},

		hide: function(i)
		{
			$("alt_" + i).style.display = "none";
		}
	},

	closeTip: function(o)
	{
		Event.stop();
		o.parentNode.parentNode.style.display = "none";
	},

	getPosTop: function(n)
	{
		return n>11 ? Math.random(Tips.scripHeight) : Math.floor(n/4)*Tips.scripHeight/2;
	},

	getPosLeft: function(n)
	{
		return n>11 ? Math.random(Tips.scripWidth) : (n%4)*Tips.scripWidth/3;
	},

	Up: {
		currentKey: null,

		getCount: function(sums)
		{
			return parseInt(sums.split("|")[0]);
		},

		up: function(key)
		{
			Event.stop();

			$("post_form").action = "http://input.comment.qq.com/post.cmt";
			$("post_form").r_key.value = key;
			$("post_form").r_type.value = 3;
			$("post_form").submit();

			Tips.Up.currentKey = key;
		},

		done: function()
		{
			if (Tips.Up.currentKey != null)
			{
				$("reply_key_"+Tips.Up.currentKey).innerHTML = parseInt($("reply_key_"+Tips.Up.currentKey).innerHTML) + 1;
			}
			else
			{
				Tips.Up.currentKey = null;
			}
		}
	},

	init: function(site, id, count)
	{
		$("post_form").c_site.value = site;
		$("post_form").c_id.value = id;

		//每页显示30条记录
		Comment.Configure.default_reply_per_page = count;
		//不显示加载信息状态
		Comment.Configure.statusBar = true;
		//开始加载评论 参数：频道，评论id
		Comment.Proxy.Page.load(site, id);
	}
};

document.onmouseup = Tips.Mouse.up;
document.onmousemove = Tips.Mouse.move;/*  |xGv00|0831b01dfb9dffd70de16ffbb596f7d0 */