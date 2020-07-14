if (typeof AppPlatform == "undefined")
{
	var AppPlatform = new Object();
}

AppPlatform.Browser = new Object();
AppPlatform.Browser.ua = window.navigator.userAgent.toLowerCase();
AppPlatform.Browser.ie = /msie/.test(AppPlatform.Browser.ua);
AppPlatform.Browser.moz = /gecko/.test(AppPlatform.Browser.ua);

AppPlatform.$ = function(s)
{
	return (typeof s == "object") ? s: document.getElementById(s);
};

AppPlatform.Element = {
	getElementLeft: function(e)
	{
		return (e==null) ? 0 :
			(AppPlatform.$(e).offsetLeft + AppPlatform.Element.getElementLeft(AppPlatform.$(e).offsetParent));
	},

	getElementTop: function(e)
	{
		return (e==null) ? 0 :
			(AppPlatform.$(e).offsetTop + AppPlatform.Element.getElementTop(AppPlatform.$(e).offsetParent));
	},

	scrollIntoView: function(e)
	{
		var x = AppPlatform.Element.getElementLeft(e);
		var y = AppPlatform.Element.getElementTop(e);
		window.scrollTo(x, y);
	},

	remove: function()
	{
		for (var i=0; i<arguments.length; i++)
		{
			try
			{
				AppPlatform.$(arguments[i]).parentNode.removeChild(AppPlatform.$(arguments[i]));
			}
			catch (e)
			{
			}
		}
	}
};

AppPlatform.JsLoader = {
	PrjId: 0,
	load: function(sId, sUrl, fCallback)
	{
		AppPlatform.Element.remove(sId);

		var _script = document.createElement("script");
		_script.setAttribute("id", sId);
		_script.setAttribute("type", "text/javascript");
		_script.setAttribute("src", sUrl);

		if (AppPlatform.Browser.ie)
		{
			_script.onreadystatechange = function()
			{
				if (this.readyState=="loaded" || this.readyState=="complete")
				{
					AppPlatform.Element.remove(_script);
					fCallback();
				}
			};
		}
		else if (AppPlatform.Browser.moz)
		{
			_script.onload = function()
			{
				AppPlatform.Element.remove(_script);
				fCallback();
			};
		}
		else
		{
			AppPlatform.Element.remove(_script);
			fCallback();
		}

		document.getElementsByTagName("head")[0].appendChild(_script);
	}
};

if (typeof AppPlatform.Survey == "undefined")
{
	AppPlatform.Survey = new Object();
}

AppPlatform.Survey.Digg = {
	ProjectId: 0,
	SubjectId: 0,
	SingleMode: 0,
	IsFeelingClick: 0,
	IsShowResult: 0,
	OptIdArray: [],
	OptIdObject: [],
	OptListCount: [],

	loadDiggResult: function()
	{
		var OptIdList = "";
		for (i=0; i<AppPlatform.Survey.Digg.OptIdArray.length; i++)
		{
			if (0 != i)
			{
				OptIdList += "|";
			}

			OptIdList += AppPlatform.Survey.Digg.OptIdArray[i];
		}

		var LoadUrl = "http://page.vote.qq.com/api.php?id=" + AppPlatform.Survey.Digg.ProjectId;
		LoadUrl += "&subjid=";
		LoadUrl += AppPlatform.Survey.Digg.SubjectId;

		if ("" != OptIdList)
		{
			LoadUrl += "&optidlist=";
			LoadUrl += OptIdList;
		}

		LoadUrl += "&type=result";
		LoadUrl += "&rdm=" + Math.random();

		AppPlatform.JsLoader.load(AppPlatform.Survey.Digg.ProjectId, LoadUrl, AppPlatform.Survey.Digg.showDiggResult);
	},

	init: function(surveyObj)
	{
		AppPlatform.Survey.Digg.ProjectId = surveyObj.PrjId;
		AppPlatform.Survey.Digg.SubjectId = surveyObj.SubjId;
		AppPlatform.Survey.Digg.SingleMode = surveyObj.SingleMode;
		AppPlatform.Survey.Digg.IsShowResult = surveyObj.ShowResult;
		AppPlatform.Survey.Digg.OptIdObject = surveyObj.OptIdObject;
		AppPlatform.Survey.Digg.OptIdArray= new Array();
		for (var o in surveyObj.OptIdObject)
		{
			AppPlatform.Survey.Digg.OptIdArray.push(o);
		}

		if (AppPlatform.Survey.Digg.IsShowResult)
		{
			AppPlatform.Survey.Digg.loadDiggResult();
		}
	},

	showDiggResult: function()
	{
		var VariableStr =  "survey_result_" + AppPlatform.Survey.Digg.ProjectId;
		if (0 != eval(VariableStr).errcode)
		{
			return false;
		}

		var ResultStr = eval(VariableStr).result;
		var ResultArray = ResultStr.split("-");
		var SubjId = ResultArray[0];

		if (AppPlatform.Survey.Digg.SubjectId != SubjId)
		{
			return;
		}

		var OptTmpArray = ResultArray[1].split(";");
		for (i=0; i<OptTmpArray.length; i++)
		{
			var TmpArray = OptTmpArray[i].split(":");
			if (TmpArray.length < 3)
			{
				continue;
			}

			var OptId = TmpArray[0];
			AppPlatform.Survey.Digg.OptListCount[OptId] = {"count":TmpArray[1], "percent":TmpArray[2]};

		}

		for (i=0; i<AppPlatform.Survey.Digg.OptIdArray.length; i++)
		{
			var IndexId = AppPlatform.Survey.Digg.OptIdObject[AppPlatform.Survey.Digg.OptIdArray[i]];
			var OptId = AppPlatform.Survey.Digg.OptIdArray[i];
			try
			{
				AppPlatform.$('apps_svy_opt_count_' + IndexId).innerHTML = AppPlatform.Survey.Digg.OptListCount[OptId].count;
				AppPlatform.$('apps_svy_opt_title_' + IndexId).innerHTML = 
					'<a href="javascript:AppPlatform.Survey.Digg.digg(this, ' +
					AppPlatform.Survey.Digg.SubjectId + ', '+OptId+');" target=\"_self\">' +
					AppPlatform.$('apps_svy_opt_title_' + IndexId).innerHTML + '</a>';
			}
			catch (e)
			{
			}
		}
	},

	ReceiveDiggResult: function()
	{
		return;
	},

	digg: function(obj, subjId, optId)
	{
		var IndexId = AppPlatform.Survey.Digg.OptIdObject[optId];
		AppPlatform.Survey.Digg.OptListCount[optId].count++;
		AppPlatform.$('apps_svy_opt_count_' + IndexId).innerHTML = AppPlatform.Survey.Digg.OptListCount[optId].count;
		AppPlatform.$('apps_svy_opt_title_' + IndexId).oldHTML = AppPlatform.$('apps_svy_opt_title_' + IndexId).innerHTML;
		AppPlatform.$('apps_svy_opt_title_' + IndexId).innerHTML = AppPlatform.$('apps_svy_opt_title_' + IndexId).getAttribute("doneText");
		/*if (AppPlatform.Survey.Digg.SingleMode == 1)
		{
			for (i=0; i<AppPlatform.Survey.Digg.OptIdArray.length; i++)
			{
				var IndexId = AppPlatform.Survey.Digg.OptIdObject[AppPlatform.Survey.Digg.OptIdArray[i]];
				var OptId = AppPlatform.Survey.Digg.OptIdArray[i];
				try
				{
					AppPlatform.$('apps_svy_opt_title_' + IndexId).innerHTML =
						AppPlatform.$('apps_svy_opt_title_' + IndexId).innerHTML;
				}
				catch (e)
				{
				}
			}
		}*/

		var SubmitUrl = "http://page.vote.qq.com/survey.php?PjtID=" + AppPlatform.Survey.Digg.ProjectId;
		SubmitUrl += "&SubjID=";
		SubmitUrl += subjId;
		SubmitUrl += "&OptID=";
		SubmitUrl += optId;
		SubmitUrl += "&fmt=json";
		SubmitUrl += "&result=0";
		SubmitUrl += "&rdm=" + Math.random();

		//AppPlatform.JsLoader.load(AppPlatform.Survey.Digg.ProjectId, SubmitUrl, AppPlatform.Survey.Digg.ReceiveDiggResult);
		AppPlatform.JsLoader.load(AppPlatform.Survey.Digg.ProjectId, SubmitUrl, function()
		{
			window.setTimeout(function()
			{
				AppPlatform.$('apps_svy_opt_title_' + IndexId).innerHTML =
					AppPlatform.$('apps_svy_opt_title_' + IndexId).oldHTML;
			}, 30000);
		});
	}
};/*  |xGv00|e2b7498f77fa50e7e73ea1e97b333c64 */