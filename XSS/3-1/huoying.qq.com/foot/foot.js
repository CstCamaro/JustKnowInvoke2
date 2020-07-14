 var loaderHY = function(url, callback) {
     var head = document.getElementsByTagName("head")[0];
     var type = url.split("."),
         file = type[type.length - 1];
     if (file == "css") {
         var link = head.appendChild(
             document.createElement("link")
         );
         link.href = url;
         link.rel = 'stylesheet';
         if (callback) {
             callback.call(this, true);
         }
     }
     else {
         var script = document.createElement("script");
         script.type = "text/javascript";
         script.src = url;
         head.appendChild(script);
         if (callback) {
             script.onload = script.onreadystatechange = function() {
                 if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                     callback.call(this, true);
                 }
             }
         }
     }
 };
(function(){function dealData(data){if(data.txt.lastIndexOf('粤网文')==0){data.txt='粤网文[2014]0633-233号';data.url&&(data.url='//www.qq.com/culture.shtml')}
return data;};var addEvent=function(dom,actType,func){if(dom.addEventListener){dom.addEventListener(actType,func,false);}else if(dom.attachEvent){dom.attachEvent('on'+actType,func);}else{dom['on'+actType]=func;}}
window.gw_footer=function(element1,element2,logo_css){var g=function(obj){return document.getElementById(obj)};var _bodyAppendChild=function(obj,cb){document.body.appendChild(obj);if(document.readyState==='complete'){cb()}else{addEvent(window,'load',cb)}};var loadsrc=function(url){var type=url.split("."),file=type[type.length-1];if(file=="css"){var obj=document.createElement("link"),lnk="href",tp="text/css";obj.setAttribute("rel","stylesheet");obj.setAttribute(lnk,url);document.getElementsByTagName("head")[0].appendChild(obj);}
else{var obj=document.createElement("script"),lnk="src",tp="text/javascript";obj.setAttribute(lnk,url);obj.setAttribute("type",tp);};};loadsrc('//ossweb-img.qq.com/images/js/foot_js/images/gw_footer.css');loadsrc('//ossweb-img.qq.com/images/js/dr/dr.js');var tpl=document.createElement('div');tpl.className="footer_bg";tpl.innerHTML='<div id="gw_ft" class="gw_footer"><div class="fl foot_l_p" id="foot_l_p"><p class="fl foot_logo"><a class="glogo tn '+logo_css+'" id="glogo" href="http://ieg.tencent.com/" target="_blank" title="腾讯互动娱乐">腾讯互动娱乐</a></p><div class="fl other_logo" id="other_logo"></div></div><div class="fr foot_r_p"><p><a href="http://ieg.tencent.com/" target="_blank">腾讯互动娱乐</a><span>|</span><a href="//game.qq.com/contract.shtml" target="_blank">服务条款</a><span>|</span><a href="//adver.qq.com/" target="_blank">广告服务</a><span>|</span><a href="//game.qq.com/hr/" target="_blank">腾讯招聘</a><span>|</span><a href="//service.qq.com/" target="_blank">腾讯游戏客服</a><span>|</span><a href="//game.qq.com/gnav/" target="_blank">游戏地图</a> <span>|</span><a href="//tgact.qq.com/" target="_blank">游戏活动</a><span>|</span><a href="//game.qq.com/portal2010/business.htm" target="_blank">商务合作</a><span>|</span><a href="//www.qq.com/" target="_blank">腾讯网</a><span>|</span><a href="//www.qq.com/map/" target="_blank">网站导航</a></p><div class="e"><p class="fl">COPYRIGHT &copy;2015 TENCENT. ALL RIGHTS RESERVED.</p><p class="fr"><a href="//www.tencent.com/law/mo_law.shtml?/law/copyright.htm" target="_blank">腾讯公司版权所有</a></p></div><div class="pal" id="wg_list"></div></div></div>';var afterInert=function(){var logo_arr=element1,icp_arr=element2,lg_width=0,logo_sum_width=0;if(!element1==""){for(var i=0;i<logo_arr.length;i++)
{lg_width=lg_width+parseInt(logo_arr[i].logoWidth);var logo_sum_width=lg_width+(logo_arr.length*10);if(logo_arr[i].url==""||!logo_arr[i].url){g("other_logo").innerHTML+="<span class='ft_spr fl gw_logo"+i+"' style=width:"+logo_arr[i].logoWidth+"px title="+logo_arr[i].title+"></span>";}
else{g("other_logo").innerHTML+="<a class='ft_spr fl gw_logo"+i+"' href="+logo_arr[i].url+" style=width:"+logo_arr[i].logoWidth+"px target='_blank' title="+logo_arr[i].title+"></a>";}};};if(!element2==""){for(j=0;j<icp_arr.length;j++)
{if(dealData(icp_arr[j]).url&&icp_arr[j].url)
{g("wg_list").innerHTML+="<p><a href="+icp_arr[j].url+" target='_blank'>"+icp_arr[j].txt+"</a></p>";}
else{g("wg_list").innerHTML+="<p>"+icp_arr[j].txt+"</p>";}}};var ft_left_w=176+logo_sum_width;var foot_width=632+ft_left_w;g("other_logo").style.width=logo_sum_width+"px";g("foot_l_p").style.width=ft_left_w+"px";g("gw_ft").style.width=foot_width+"px";}
_bodyAppendChild(tpl,afterInert);};})();
loaderHY("//huoying.qq.com/foot/style_foot.css", "");
        gw_footer(
            [{
                logoWidth: 107,
                title: "魔方工作室",
                url: ""

            },
                {
                    logoWidth: 40,
                    title: "NBGI",
                    url: "//www.bandainamcogames.co.jp/"

                }],
            [{
                txt: "&copy; 2002 MASASHI KISHIMOTO/2007 SHIPPUDEN All Rights Reserved.",
                url: ""

            },
                {
                    txt: "&copy; BANDAI NAMCO Entertainment Inc.",
                    url: ""

                },
                {
                    txt: "ISBN号：ISBN 978-7-89988-173-6",
                    url: ""

                },
                {
                    txt: "审批文号：新广出审【2014】1452号",
                    url: ""

                }],
            'glogoq'
        );/*  |xGv00|ca96da08d68bbe74af2b89df87563e1c */
