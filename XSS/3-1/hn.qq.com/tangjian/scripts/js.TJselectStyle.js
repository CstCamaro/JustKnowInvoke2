// TJselectStyle


// 获取class
function getClass(sClass, oParent)
{
	var aClass = [];	
	var reClass = new RegExp("(^| )" + sClass + "( |$)");
	var aElem = (oParent || document).getElementsByTagName("*");
	for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
	return aClass
}
// class是否存在
function hasClass(obj, sClass)
{
	var reg = new RegExp("(^|\\s)" + sClass + "(\\s|$)");
	return reg.test(obj.className)
}
// 添加class
function addClass(obj, sClass)
{
	hasClass(obj, sClass) || (obj.className += " "+sClass)
}
// 删除class
function removeClass(obj, sClass)
{
	if (hasClass(obj, sClass))
	{
		var reg = new RegExp("(^|\\s)" + sClass + "(\\s|$)");
		obj.className = obj.className.replace(reg, "");
	}
}
// 上一个元素
function prevElement(obj)
{
	return obj.previousSibling || obj.previousElementSibling || null	
}
// 下一个元素
function nextElement(obj)
{
	return obj.nextSibling || obj.nextElementSibling || null	
}
// 自定义表单函数
function TJselectFrom(form)
{
	var i = 0;
	var zIndex = 1;
	var aInput = form.getElementsByTagName("input");	
	var aSelect = form.getElementsByTagName("select");
	var aTextArea = form.getElementsByTagName("textarea");
	form.className = "TJselectFrom";	

	/* 下拉菜单 */
	for (i = 0; i < aSelect.length; i++)
	{
		var oFragment = document.createDocumentFragment();
		//var oSelectL = document.createElement("div");
		//var oSelectR = document.createElement("div");
		var oTJselect = document.createElement("div");
		var oEm = document.createElement("em");
		var oUl = document.createElement("ul");
		//oSelectL.className = "SelectL";
		//oSelectR.className = "SelectR";
		oTJselect.className = "tjSelect";		
		//插入结构
		//aSelect[i].parentNode.insertBefore(oSelectL, aSelect[i]);
		//aSelect[i].parentNode.insertBefore(oSelectR, nextElement(aSelect[i]));
		oUl.style.width = oTJselect.style.width =  aSelect[i].offsetWidth/ 2 + "px";		
		
		for (var j = 0; j < aSelect[i].options.length; j++)
		{
			var oLi = document.createElement("li");
			oLi.innerHTML = aSelect[i].options[j].text;
			oLi["sValue"] = aSelect[i].options[j].value;
			oFragment.appendChild(oLi);
			aSelect[i].options[j].selected && (oEm.innerHTML = aSelect[i].options[j].text)
		}
		oUl.appendChild(oFragment);
		oTJselect.appendChild(oEm);
		oTJselect.appendChild(oUl);
		aSelect[i].parentNode.insertBefore(oTJselect, aSelect[i]);
		oTJselect.appendChild(aSelect[i]);
		
		oTJselect.onclick = function (event)
		{
			var o = this.getElementsByTagName("ul")[0] || prevElement(this).getElementsByTagName("ul")[0];
			var aUl = form.getElementsByTagName("ul");
			this.parentNode.style.position = "relative";
			this.parentNode.style.zIndex = zIndex++;
			o.style.display = o.style.display == "block" ? "none" : "block";
			for (i = 0; i < aUl.length; i++)
			{
				if (o == aUl[i]) continue;
				aUl[i].style.display = "none";
			}
			var aLi = o.getElementsByTagName("li");
			
			for (i = 0; i < aLi.length; i++)
			{
				aLi[i].onmouseover = function ()
				{
					this.className = "hover"	
				};
				aLi[i].onmouseout = function ()
				{
					this.className = ""	
				};
				aLi[i].onclick = function ()
				{
					prevElement(this.parentNode).innerHTML = this.innerHTML;
					nextElement(this.parentNode).value = this.sValue;
					window.open(this.sValue); 
				}
			}
			
			(event || window.event).cancelBubble = true;
			
			document.onclick = function ()
			{
				o.style.display = "none"	
			}
		}
	}
}/*  |xGv00|6b2a04faa1723744d66eaa20cdddd7d6 */