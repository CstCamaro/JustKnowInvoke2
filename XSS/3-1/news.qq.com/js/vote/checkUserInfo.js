function checkInput(obj,sName)
{if(!checkIsNotEmpty(obj.value))
{s=new String(sName)
s=s.replace(/&nbsp;/g,"");window.alert("请输入"+s+"!");obj.focus();obj.select();return false;}
return true;}
function checkNumberInput(obj,sName)
{if(!checkInput(obj,sName))
return false;if(!checkIntegerMinValue(obj.value,3))
{window.alert("请在"+sName+"中输入合法的数值!");obj.focus();obj.select();return false;}
return true;}
function checkRadio(obj,sName)
{for(i=0;i<obj.length;i++)
{if(obj[i].checked)
return true;}
window.alert("请选择"+sName+"!");return false;}
function checkOtherInput(sbjObj,optObj,sbjName,optId,optName)
{if(sbjObj.length==undefined)
{if(sbjObj.checked&&optObj.value=="")
{window.alert("请填写调查问题 ["+sbjName+"] 中选项 ["+optName+"] 的内容!");optObj.focus();optObj.select();return false;}}
else
{for(i=0;i<sbjObj.length;i++)
{if(sbjObj[i].checked&&sbjObj[i].value==optId&&optObj.value=="")
{window.alert("请填写调查问题 ["+sbjName+"] 中选项 ["+optName+"] 的内容!");optObj.focus();optObj.select();return false;}}}
return true;}
function checkSubject(obj,sTitle)
{if(obj.length==undefined)
{if(obj.checked)
{return true;}}
else
{for(i=0;i<obj.length;i++)
{if(obj[i].checked)
return true;}}
window.alert("调查问题 ["+sTitle+"] 必须填写!");return false;}
function checkQQ()
{if(!checkIsNotEmpty(document.vote.u.value))
{window.alert("请输入QQ号码!");document.vote.u.focus();document.vote.u.select();return false;}
if(!checkIntegerMinValue(document.vote.u.value,10001))
{window.alert("请输入合法的QQ号码!");document.vote.u.focus();document.vote.u.select();return false;}
if(!checkIsNotEmpty(document.vote.p.value))
{window.alert("请输入QQ密码!");document.vote.p.focus();document.vote.p.select();return false;}
if(!checkIsNotEmpty(document.vote.verifycode.value))
{window.alert("请输入验证码!");document.vote.verifycode.focus();document.vote.verifycode.select();return false;}
if(document.vote.verifycode.value.length!=4)
{window.alert("请输入4位验证码!");document.vote.verifycode.focus();document.vote.verifycode.select();return false;}
return true;}