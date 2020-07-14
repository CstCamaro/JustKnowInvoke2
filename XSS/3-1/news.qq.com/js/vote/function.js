String.prototype.trim=function()
{return this.replace(/(^[\s]*)|([\s]*$)/g,"");}
String.prototype.lTrim=function()
{return this.replace(/(^[\s]*)/g,"");}
String.prototype.rTrim=function()
{return this.replace(/([\s]*$)/g,"");}
function checkIsNotEmpty(str)
{if(str.trim()=="")
return false;else
return true;}
function checkIsInteger(str)
{if(str=="")
return true;if(/^(\-?)(\d+)$/.test(str))
return true;else
return false;}
function checkIntegerMinValue(str,val)
{if(str=="")
return true;if(typeof(val)!="string")
val=val+"";if(checkIsInteger(str)==true)
{if(parseInt(str,10)>=parseInt(val,10))
return true;else
return false;}
else
return false;}
function checkIntegerMaxValue(str,val)
{if(str=="")
return true;if(typeof(val)!="string")
val=val+"";if(checkIsInteger(str)==true)
{if(parseInt(str,10)<=parseInt(val,10))
return true;else
return false;}
else
return false;}
function isNotNegativeInteger(str)
{if(str=="")
return true;if(checkIsInteger(str)==true)
{if(parseInt(str,10)<0)
return false;else
return true;}
else
return false;}
function checkIsDouble(str)
{if(str=="")
return true;if(str.indexOf(".")==-1)
{if(checkIsInteger(str)==true)
return true;else
return false;}
else
{if(/^(\-?)(\d+)(.{1})(\d+)$/g.test(str))
return true;else
return false;}}
function checkDoubleMinValue(str,val)
{if(str=="")
return true;if(typeof(val)!="string")
val=val+"";if(checkIsDouble(str)==true)
{if(parseFloat(str)>=parseFloat(val))
return true;else
return false;}
else
return false;}
function checkDoubleMaxValue(str,val)
{if(str=="")
return true;if(typeof(val)!="string")
val=val+"";if(checkIsDouble(str)==true)
{if(parseFloat(str)<=parseFloat(val))
return true;else
return false;}
else
return false;}
function isNotNegativeDouble(str)
{if(str=="")
return true;if(checkIsDouble(str)==true)
{if(parseFloat(str)<0)
return false;else
return true;}
else
return false;}
function checkIsValidDate(str)
{if(str=="")
return true;var pattern=/^((\d{4})|(\d{2}))-(\d{1,2})-(\d{1,2})$/g;if(!pattern.test(str))
return false;var arrDate=str.split("-");if(parseInt(arrDate[0],10)<100)
arrDate[0]=2000+parseInt(arrDate[0],10)+"";var date=new Date(arrDate[0],(parseInt(arrDate[1],10)-1)+"",arrDate[2]);if(date.getYear()==arrDate[0]&&date.getMonth()==(parseInt(arrDate[1],10)-1)+""&&date.getDate()==arrDate[2])
return true;else
return false;}
function checkDateEarlier(strStart,strEnd)
{if(checkIsValidDate(strStart)==false||checkIsValidDate(strEnd)==false)
return false;if((strStart=="")||(strEnd==""))
return true;var arr1=strStart.split("-");var arr2=strEnd.split("-");var date1=new Date(arr1[0],parseInt(arr1[1].replace(/^0/,""),10)-1,arr1[2]);var date2=new Date(arr2[0],parseInt(arr2[1].replace(/^0/,""),10)-1,arr2[2]);if(arr1[1].length==1)
arr1[1]="0"+arr1[1];if(arr1[2].length==1)
arr1[2]="0"+arr1[2];if(arr2[1].length==1)
arr2[1]="0"+arr2[1];if(arr2[2].length==1)
arr2[2]="0"+arr2[2];var d1=arr1[0]+arr1[1]+arr1[2];var d2=arr2[0]+arr2[1]+arr2[2];if(parseInt(d1,10)>parseInt(d2,10))
return false;else
return true;}
function checkEmail(str)
{if(str=="")
return true;if(str.charAt(0)=="."||str.charAt(0)=="@"||str.indexOf('@',0)==-1||str.indexOf('.',0)==-1||str.lastIndexOf("@")==str.length-1||str.lastIndexOf(".")==str.length-1)
return false;else
return true;}
function checkIsChinese(str)
{if(str=="")
return true;var pattern=/^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;if(pattern.test(str))
return true;else
return false;}
String.prototype.realLength=function()
{return this.replace(/[^\x00-\xff]/g,"**").length;}
function checkMask(str,pat)
{if(str=="")
return true;var pattern=new RegExp(pat,"gi")
if(pattern.test(str))
return true;else
return false;}
function getFilePostfix(oFile)
{if(oFile==null)
return null;var pattern=/(.*)\.(.*)$/gi;if(typeof(oFile)=="object")
{if(oFile.value==null||oFile.value=="")
return null;var arr=pattern.exec(oFile.value);return RegExp.$2;}
else if(typeof(oFile)=="string")
{var arr=pattern.exec(oFile);return RegExp.$2;}
else
return null;}