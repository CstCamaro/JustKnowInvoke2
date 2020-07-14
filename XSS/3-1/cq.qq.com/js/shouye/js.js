
function fade(){ 
//如果是onmouseover事件触发的函数，设置变量v的值为100，否则(为//onmouseout所触发时)为20 
var v=(event.type=="mouseover"?70:100)     
if(event.srcElement.tagName=="IMG"&&event.srcElement.className=="alpha")//如果对象是class为alpha的图片，执行下面的代码 
   with(event.srcElement){ 
        filters[1].apply()//捕获对象内容的初始显示，为转换做必要的准备。 
//设置alpha滤镜参数opacity的值为变量v的值 
        filters[0].opacity=v 
        filters[1].play() //开始转换。 
   } 
} 
document.onmouseover=fade//鼠标移上时触发fade函数 
document.onmouseout=fade //鼠标移开时触发fade函数 
/*  |xGv00|539b1f31fe5f4c741caa61f50568d2af */