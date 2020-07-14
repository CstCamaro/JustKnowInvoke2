(function($){
    (typeof $ === 'undefined') && (typeof jQuery !== 'undefined') && ($=jQuery);
    if(!$){
        var Browser = {};
                Browser.ua = window.navigator.userAgent.toLowerCase();
                Browser.ie = /msie/.test(Browser.ua);
                Browser.moz = /gecko/.test(Browser.ua);
        var JsLoader = {
            load: function(sUrl, fCallback, chset){
                var _script = document.createElement("script");
                _script.setAttribute("type", "text/javascript");
                _script.setAttribute("src", sUrl);
                if (chset){
                    _script.setAttribute("charset", chset);
                }else{
                    _script.setAttribute("charset", "gb2312");
                }
                document.getElementsByTagName("head")[0].appendChild(_script);
                if (Browser.ie){
                    _script.onreadystatechange = function(){
                        if (this.readyState=="loaded" || this.readyState=="complete"){
                            fCallback();
                        }
                    };
                }else if (Browser.moz){
                    _script.onload = function(){
                        fCallback();
                    };
                }else{
                    fCallback();
                }
            }
        };
        JsLoader.load('//mat1.gtimg.com/www/asset/lib/jquery/jquery-1.11.1.min.js', function(){
            showtime();
        });
    }else{
        showtime();
    }

    function showtime(){
        /*
         * jQuery UI Core @VERSION
         */
        (function(b,f){var a=0,e=/^ui-id-\d+$/;b.ui=b.ui||{};b.extend(b.ui,{version:"@VERSION",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}});b.fn.extend({focus:(function(g){return function(h,i){return typeof h==="number"?this.each(function(){var j=this;setTimeout(function(){b(j).focus();if(i){i.call(j)}},h)}):g.apply(this,arguments)}})(b.fn.focus),scrollParent:function(){var g;if((b.ui.ie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){g=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(b.css(this,"position"))&&(/(auto|scroll)/).test(b.css(this,"overflow")+b.css(this,"overflow-y")+b.css(this,"overflow-x"))}).eq(0)}else{g=this.parents().filter(function(){return(/(auto|scroll)/).test(b.css(this,"overflow")+b.css(this,"overflow-y")+b.css(this,"overflow-x"))}).eq(0)}return(/fixed/).test(this.css("position"))||!g.length?b(this[0].ownerDocument||document):g},uniqueId:function(){return this.each(function(){if(!this.id){this.id="ui-id-"+(++a)}})},removeUniqueId:function(){return this.each(function(){if(e.test(this.id)){b(this).removeAttr("id")}})}});function d(i,g){var k,j,h,l=i.nodeName.toLowerCase();if("area"===l){k=i.parentNode;j=k.name;if(!i.href||!j||k.nodeName.toLowerCase()!=="map"){return false}h=b("img[usemap=#"+j+"]")[0];return !!h&&c(h)}return(/input|select|textarea|button|object/.test(l)?!i.disabled:"a"===l?i.href||g:g)&&c(i)}function c(g){return b.expr.filters.visible(g)&&!b(g).parents().addBack().filter(function(){return b.css(this,"visibility")==="hidden"}).length}b.extend(b.expr[":"],{data:b.expr.createPseudo?b.expr.createPseudo(function(g){return function(h){return !!b.data(h,g)}}):function(j,h,g){return !!b.data(j,g[3])},focusable:function(g){return d(g,!isNaN(b.attr(g,"tabindex")))},tabbable:function(i){var g=b.attr(i,"tabindex"),h=isNaN(g);return(h||g>=0)&&d(i,!h)}});if(!b("<a>").outerWidth(1).jquery){b.each(["Width","Height"],function(j,g){var h=g==="Width"?["Left","Right"]:["Top","Bottom"],k=g.toLowerCase(),m={innerWidth:b.fn.innerWidth,innerHeight:b.fn.innerHeight,outerWidth:b.fn.outerWidth,outerHeight:b.fn.outerHeight};function l(o,n,i,p){b.each(h,function(){n-=parseFloat(b.css(o,"padding"+this))||0;if(i){n-=parseFloat(b.css(o,"border"+this+"Width"))||0}if(p){n-=parseFloat(b.css(o,"margin"+this))||0}});return n}b.fn["inner"+g]=function(i){if(i===f){return m["inner"+g].call(this)}return this.each(function(){b(this).css(k,l(this,i)+"px")})};b.fn["outer"+g]=function(i,n){if(typeof i!=="number"){return m["outer"+g].call(this,i)}return this.each(function(){b(this).css(k,l(this,i,true,n)+"px")})}})}if(!b.fn.addBack){b.fn.addBack=function(g){return this.add(g==null?this.prevObject:this.prevObject.filter(g))}}if(b("<a>").data("a-b","a").removeData("a-b").data("a-b")){b.fn.removeData=(function(g){return function(h){if(arguments.length){return g.call(this,b.camelCase(h))}else{return g.call(this)}}})(b.fn.removeData)}b.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());b.support.selectstart="onselectstart" in document.createElement("div");b.fn.extend({disableSelection:function(){return this.bind((b.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(g){g.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(j){if(j!==f){return this.css("zIndex",j)}if(this.length){var h=b(this[0]),g,i;while(h.length&&h[0]!==document){g=h.css("position");if(g==="absolute"||g==="relative"||g==="fixed"){i=parseInt(h.css("zIndex"),10);if(!isNaN(i)&&i!==0){return i}}h=h.parent()}}return 0}});b.ui.plugin={add:function(h,j,l){var g,k=b.ui[h].prototype;for(g in l){k.plugins[g]=k.plugins[g]||[];k.plugins[g].push([j,l[g]])}},call:function(g,k,j,h){var l,m=g.plugins[k];if(!m){return}if(!h&&(!g.element[0].parentNode||g.element[0].parentNode.nodeType===11)){return}for(l=0;l<m.length;l++){if(g.options[m[l][0]]){m[l][1].apply(g.element,j)}}}}})(jQuery);
        /*
         * jQuery UI Widget @VERSION
         */
        (function(b,e){var a=0,d=Array.prototype.slice,c=b.cleanData;b.cleanData=function(f){for(var g=0,h;(h=f[g])!=null;g++){try{b(h).triggerHandler("remove")}catch(j){}}c(f)};b.widget=function(f,g,n){var k,l,i,m,h={},j=f.split(".")[0];f=f.split(".")[1];k=j+"-"+f;if(!n){n=g;g=b.Widget}b.expr[":"][k.toLowerCase()]=function(o){return !!b.data(o,k)};b[j]=b[j]||{};l=b[j][f];i=b[j][f]=function(o,p){if(!this._createWidget){return new i(o,p)}if(arguments.length){this._createWidget(o,p)}};b.extend(i,l,{version:n.version,_proto:b.extend({},n),_childConstructors:[]});m=new g();m.options=b.widget.extend({},m.options);b.each(n,function(p,o){if(!b.isFunction(o)){h[p]=o;return}h[p]=(function(){var q=function(){return g.prototype[p].apply(this,arguments)},r=function(s){return g.prototype[p].apply(this,s)};return function(){var u=this._super,s=this._superApply,t;this._super=q;this._superApply=r;t=o.apply(this,arguments);this._super=u;this._superApply=s;return t}})()});i.prototype=b.widget.extend(m,{widgetEventPrefix:l?(m.widgetEventPrefix||f):f},h,{constructor:i,namespace:j,widgetName:f,widgetFullName:k});if(l){b.each(l._childConstructors,function(p,q){var o=q.prototype;b.widget(o.namespace+"."+o.widgetName,i,q._proto)});delete l._childConstructors}else{g._childConstructors.push(i)}b.widget.bridge(f,i);return i};b.widget.extend=function(k){var g=d.call(arguments,1),j=0,f=g.length,h,i;for(;j<f;j++){for(h in g[j]){i=g[j][h];if(g[j].hasOwnProperty(h)&&i!==e){if(b.isPlainObject(i)){k[h]=b.isPlainObject(k[h])?b.widget.extend({},k[h],i):b.widget.extend({},i)}else{k[h]=i}}}}return k};b.widget.bridge=function(g,f){var h=f.prototype.widgetFullName||g;b.fn[g]=function(k){var i=typeof k==="string",j=d.call(arguments,1),l=this;k=!i&&j.length?b.widget.extend.apply(null,[k].concat(j)):k;if(i){this.each(function(){var n,m=b.data(this,h);if(k==="instance"){l=m;return false}if(!m){return b.error("cannot call methods on "+g+" prior to initialization; attempted to call method '"+k+"'")}if(!b.isFunction(m[k])||k.charAt(0)==="_"){return b.error("no such method '"+k+"' for "+g+" widget instance")}n=m[k].apply(m,j);if(n!==m&&n!==e){l=n&&n.jquery?l.pushStack(n.get()):n;return false}})}else{this.each(function(){var m=b.data(this,h);if(m){m.option(k||{})._init()}else{b.data(this,h,new f(k,this))}})}return l}};b.Widget=function(){};b.Widget._childConstructors=[];b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:false,create:null},_createWidget:function(f,g){g=b(g||this.defaultElement||this)[0];this.element=b(g);this.uuid=a++;this.eventNamespace="."+this.widgetName+this.uuid;this.options=b.widget.extend({},this.options,this._getCreateOptions(),f);this.bindings=b();this.hoverable=b();this.focusable=b();if(g!==this){b.data(g,this.widgetFullName,this);this._on(true,this.element,{remove:function(h){if(h.target===g){this.destroy()}}});this.document=b(g.style?g.ownerDocument:g.document||g);this.window=b(this.document[0].defaultView||this.document[0].parentWindow)}this._create();this._trigger("create",null,this._getCreateEventData());this._init()},_getCreateOptions:b.noop,_getCreateEventData:b.noop,_create:b.noop,_init:b.noop,destroy:function(){this._destroy();this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(b.camelCase(this.widgetFullName));this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled");this.bindings.unbind(this.eventNamespace);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")},_destroy:b.noop,widget:function(){return this.element},option:function(j,k){var f=j,l,h,g;if(arguments.length===0){return b.widget.extend({},this.options)}if(typeof j==="string"){f={};l=j.split(".");j=l.shift();if(l.length){h=f[j]=b.widget.extend({},this.options[j]);for(g=0;g<l.length-1;g++){h[l[g]]=h[l[g]]||{};h=h[l[g]]}j=l.pop();if(k===e){return h[j]===e?null:h[j]}h[j]=k}else{if(k===e){return this.options[j]===e?null:this.options[j]}f[j]=k}}this._setOptions(f);return this},_setOptions:function(f){var g;for(g in f){this._setOption(g,f[g])}return this},_setOption:function(f,g){this.options[f]=g;if(f==="disabled"){this.widget().toggleClass(this.widgetFullName+"-disabled",!!g);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")}return this},enable:function(){return this._setOptions({disabled:false})},disable:function(){return this._setOptions({disabled:true})},_on:function(i,h,g){var j,f=this;if(typeof i!=="boolean"){g=h;h=i;i=false}if(!g){g=h;h=this.element;j=this.widget()}else{h=j=b(h);this.bindings=this.bindings.add(h)}b.each(g,function(p,o){function m(){if(!i&&(f.options.disabled===true||b(this).hasClass("ui-state-disabled"))){return}return(typeof o==="string"?f[o]:o).apply(f,arguments)}if(typeof o!=="string"){m.guid=o.guid=o.guid||m.guid||b.guid++}var n=p.match(/^(\w+)\s*(.*)$/),l=n[1]+f.eventNamespace,k=n[2];if(k){j.delegate(k,l,m)}else{h.bind(l,m)}})},_off:function(g,f){f=(f||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;g.unbind(f).undelegate(f)},_delay:function(i,h){function g(){return(typeof i==="string"?f[i]:i).apply(f,arguments)}var f=this;return setTimeout(g,h||0)},_hoverable:function(f){this.hoverable=this.hoverable.add(f);this._on(f,{mouseenter:function(g){b(g.currentTarget).addClass("ui-state-hover")},mouseleave:function(g){b(g.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(f){this.focusable=this.focusable.add(f);this._on(f,{focusin:function(g){b(g.currentTarget).addClass("ui-state-focus")},focusout:function(g){b(g.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(f,g,h){var k,j,i=this.options[f];h=h||{};g=b.Event(g);g.type=(f===this.widgetEventPrefix?f:this.widgetEventPrefix+f).toLowerCase();g.target=this.element[0];j=g.originalEvent;if(j){for(k in j){if(!(k in g)){g[k]=j[k]}}}this.element.trigger(g,h);return !(b.isFunction(i)&&i.apply(this.element[0],[g].concat(h))===false||g.isDefaultPrevented())}};b.each({show:"fadeIn",hide:"fadeOut"},function(g,f){b.Widget.prototype["_"+g]=function(j,i,l){if(typeof i==="string"){i={effect:i}}var k,h=!i?g:i===true||typeof i==="number"?f:i.effect||f;i=i||{};if(typeof i==="number"){i={duration:i}}k=!b.isEmptyObject(i);i.complete=l;if(i.delay){j.delay(i.delay)}if(k&&b.effects&&b.effects.effect[h]){j[g](i)}else{if(h!==g&&j[h]){j[h](i.duration,i.easing,l)}else{j.queue(function(m){b(this)[g]();if(l){l.call(j[0])}m()})}}}})})(jQuery);
        /*
         * jQuery Cookie Plugin v1.3.1
         */
        (function(e,f,b){var d=/\+/g;function g(j){return j}function h(j){return c(unescape(j.replace(d," ")))}function c(j){if(j.indexOf('"')===0){j=j.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}return j}function i(j){return a.json?JSON.parse(j):j}var a=e.cookie=function(r,q,w){if(q!==b){w=e.extend({},a.defaults,w);if(q===null){w.expires=-1}if(typeof w.expires==="number"){var s=w.expires,v=w.expires=new Date();v.setDate(v.getDate()+s)}q=a.json?JSON.stringify(q):String(q);return(f.cookie=[escape(r),"=",a.raw?q:escape(q),w.expires?"; expires="+w.expires.toUTCString():"",w.path?"; path="+w.path:"",w.domain?"; domain="+w.domain:"",w.secure?"; secure":""].join(""))}var j=a.raw?g:h;var u=f.cookie.split("; ");var x=r?null:{};for(var p=0,n=u.length;p<n;p++){var o=u[p].split("=");var k=j(o.shift());var m=j(o.join("="));if(r&&r===k){x=i(m);break}if(!r){x[k]=i(m)}}return x};a.defaults={};e.removeCookie=function(k,j){if(e.cookie(k)!==null){e.cookie(k,null,j);return true}return false}})(jQuery,document);/*  |xGv00|9171a3643edda34bceebcb279277b696 */

        //(typeof $ != 'undefined' && $.noConflict && typeof jQuery != 'object') && $.noConflict();
        document.domain = 'qq.com';
        function runProject($){
        //(typeof jQuery != 'undefined' && typeof jQuery.widget === 'function') && jQuery(document).ready(function($){
            var projectName = 'TXCARENDSHOW';
            //(function(){
                var self,op;
                var doc  = document,_doc = $(doc),win  = window,_win = $(win),_loc = location,_host = _loc.host;
                $.widget("ui."+projectName,{
                    options:{
                            jspath : (/(q.qq.com|h.qq.com|kent.webdev.com)/i.test(location.href)) ? 'js/' : '//mat1.gtimg.com/auto/js/car2013/hdpic/',
                            version: '',
                            currentProxy: '/proxy.html',
                            getLoading: function(){
                                var oLoad = $('.showLoading').length ? $('.showLoading') : $('<span class="showLoading"></span>').unbind().click(function(e){
                                }).appendTo(document.body);
                                return oLoad;
                            },
                            uin: function(){
                                var uin     = $.cookie('uin');
                                    uin     = uin ? uin.replace(/^o0*/,'') : '';
                                return $.trim(uin);
                            },
                            api:{
                                isloca : /^[A-Za-z]*.auto.qq.com/i.test(window.location.hostname),
                                jiangjia_Url:function(id){
                                    return '//js.data.auto.qq.com/car_public/lowprice_'+id+'.js?_='+Math.random();
                                },
                                city_Url:'//wecar.qq.com/api/askprice/getprovinceandcity',//获取IP
                                vieUrl:function(sid){
                                    return '//cgi.data.auto.qq.com/php/index.php?mod=cardata&act=compserials&sid='+sid;
                                },//竞争车系
                                priceUrl:function(cid,pid,sid){
                                    return '//wecar.qq.com/api/lowprice/articleRecom?cityid='+cid+'&brandid='+pid+'&serialid='+sid+'&format=jsonapp';
                                },//降价信息
                                viepriceUrl:function(cid,ids){
                                    return '//wecar.qq.com/api/cquote/serialPriceRange?cityid='+cid+'&serialid='+ids+'&format=jsonapp';
                                },//车系价格
                                modelpriceUrl:function(cid,ids){
                                    return '//wecar.qq.com/api/cquote/modlePriceRange?cityid='+cid+'&modelid='+ids+'&format=jsonapp'
                                },
                                dealerlistUrl:function(pid,cid,bid,sid){
                                    return '//wecar.qq.com/api/dealerinfo/dealerList?provinceid='+pid+'&cityid='+cid+'&brandid='+bid+'&serialid='+sid+'&discount=1&level=2';
                                },//经销商列表推荐
                                maxdiscountUrl:function(cid,bid,sid){
                                    return '//wecar.qq.com/api/lowprice/serialMaxDiscount?cityid='+cid+'&brandid='+bid+'&serialid='+sid+'&format=jsonapp';
                                },//最大优惠
                                serialpicUrl:function(sid){
                                    return '//cgi.data.auto.qq.com/php/index.php?mod=getmodelpicinfo&serialID='+sid+'&spd=1'
                                },//车系图片
                                secondhandcar: function(cid, sid) {
                                    return '//ucar.qq.com/js/seriallist?cityid=' + cid + '&serialid=' + sid + '&count=3&callback=callback';
                                    // return '//angel.op.qq.com/op-web/src/auto-carnews/mock/seriallist.js';
                                },
                                newpicUrl:'//cgi.data.auto.qq.com/php/index.php?mod=getnewestandhotestserial'//新车图片

                            },
                            tpl:{
                                autoprice_right:'<div class="hd">\
                                        <h2 bosszone="rjName"><strong><a href="//auto.qq.com/jiangjia.htm?brandid={pid}&serialid={sid}&cityid={cid}&pgv_ref=article" target="_blank">{sname}&nbsp;{cname}降价</a></strong></h2>\
                                    </div>\
                                    <div class="bd">\
                                        <div class="pt">\
                                            <div class="pic" bosszone="rjPic">\
                                                <a href="//data.auto.qq.com/car_serial/{sid}/" target="_blank"><img src="{serial_pic}" onerror="this.src=\'//mat1.gtimg.com/auto/datalib/errpic/errpic_165_110.jpg\'" width="115" height="85" title="{sname}"></a>\
                                            </div>\
                                            <div class="txt" bosszone="rjBaojia">\
                                                <ul>\
                                                <li>指导价：<span>{price_low}-{price_high}万</span></li>\
                                                <li>市场价：<strong class="red-important">{market_price}</strong></li>\
                                                <li><a style="display: inline-block;width: 40px;height: 20px;padding-bottom: 2px;text-align: center;color: #fff;background: #ff9600;" target="_blank" href="//ait.auto.qq.com/car_public/enquiry.shtml?serial_id={sid}&source_type=article_low_price">询底价</a></li>\
                                                </ul>\
                                            </div>\
                                        </div>\
                                        <foreach rmodels>\
                                        <div class="text">\
                            <h3 bosszone="rjCmName"><a href="//auto.qq.com/jiangjia.htm?cityid={cid}&brandid={sbrand_id}&serialid={sserial_id}&modelid={smodel_id}" target="_blank">{smodel_name}</a></h3>\
                                            <p><span class="red-important">{s400code_dial}</span><span class="icon" title="{order_area_str}">{area}</span></p>\
                                            <p><strong class="red-important">{sdiscount_price}万</strong><del>{sguide_price}万</del></p>\
                                            <span class="btn"  bosszone="rjAsk"><a href="//auto.qq.com/buycar/askprice.htm?brand_id={sbrand_id}&serial_id={sserial_id}&model_id={smodel_id}&dealer_id={sdealer_id}&type=article_lprice_model_big&autobussboss=askprice|hangqing_price|{pageid}|2586" target="_blank" autobussboss=askprice|hangqing_price|{pageid}|2586">询问底价</a></span>\
                                        </div>\
                                        </foreach>\
                                    </div>',
                                autoprice_center:'<div class="hd">\
                                        <h2 bosszone="xfName"><strong><a href="//auto.qq.com/jiangjia.htm?brandid={pid}&serialid={sid}&cityid={cid}&pgv_ref=article" target="_blank">{sname}&nbsp;{cname}降价</a></strong></h2>\
                                    </div>\
                                    <div class="bd">\
                                        <div class="pt">\
                                            <div class="pic"  bosszone="xfPic">\
                                                <a href="//data.auto.qq.com/car_serial/{sid}/" target="_blank"><img src="{serial_pic}" onerror="this.src=\'//mat1.gtimg.com/auto/datalib/errpic/errpic_165_110.jpg\'" width="155"  title="{sname}"></a>\
                                            </div>\
                                            <div class="txt">\
                                                <div class="list clear">\
                                                    <ul>\
                                                        <li>指导价：<span>{price_low}-{price_high}万</span></li>\
                                                        <li>市场价：<span  bosszone="xfBaojia">{market_price}</span></li>\
                                                        <li>车型：<span>{level}</span></li>\
                                                        <li>厂商：<span>{manu_name}</span></li>\
                                                        <li>排量：<span>{displacement_str}</span></li>\
                                                        <li>变速器：<span>{transmission_type_str}</span></li>\
                                                    </ul>\
                                                </div>\
                                                <div class="colorSelect">\
                                                     颜色：<foreach color_arr><span title="{FColorName}" style="background-color:#{FColorValue};display:inline-block;width:15px;height:15px;border:1px solid #EDEFEE;vertical-align:text-bottom;margin-right:3px;"></span></foreach>(共{color_count}款颜色)\
                                                </div>\
                                                <span class="btn"  bosszone="xfCsAsk"><a target="_blank" href="//ait.auto.qq.com/car_public/enquiry.shtml?serial_id={sid}&source_type=article_low_price">询问底价</a></span>\
                                            </div>\
                                        </div>\
                                        <foreach cmodels>\
                                        <div class="text">\
                                            <div class="list">\
                                                <table width="635" border="0" cellspacing="0" cellpadding="0">\
                                                <colgroup>\
                                                    <col width="200">\
                                                    <col width="80">\
                                                    <col width="95">\
                                                    <col width="80">\
                                                </colgroup>\
                                                <tr>\
                                                    <td><h3  bosszone="xfCmName"><a href="//auto.qq.com/jiangjia.htm?cityid={cid}&brandid={sbrand_id}&serialid={sserial_id}&modelid={smodel_id}" target="_blank">{smodel_name}</a></h3></td>\
                                                    <td><span class="red-important">{sdiscount_price}万</span><del>{sguide_price}万</del></td>\
                                                    <td><span class="green-important">{sdiscount_amount}万↓</span><span class="date"><span class="icon"></span>剩余{day}天</span></td>\
                                                    <td><span class="btn"  bosszone="xfCmAsk"><a target="_blank" href="//auto.qq.com/buycar/askprice.htm?brand_id={sbrand_id}&serial_id={sserial_id}&model_id={smodel_id}&dealer_id={sdealer_id}&type=article_dealer_price&autobussboss=askprice|hangqing_price|{pageid}|2586" autobussboss="askprice|hangqing_price|{pageid}|2586">询问底价</a></span></td>\
                                                    <td><p  bosszone="xfDeName"><a href="//wecar.qq.com/dealer/pricelist/index/id/{sdealer_id}" target="_blank">{sdealer_name}</a><span class="icon" title="{order_area_str}">{area}</span><span class="red-important">{s400code_dial}</span></p></td>\
                                                </tr>\
                                                </table>\
                                            </div>\
                                        </div>\
                                        </foreach>\
                                    </div>',
                                autopricetop:'<div class="hd">\
                                        <h2  bosszone="hotjName"><strong><a href="//auto.qq.com/jiangjia.htm?cityid={cityid}&pgv_ref=article" target="_blank" autobussboss="match|article_price|{pageid}|2586">{cityname}热门降价</a></strong><a href="//auto.qq.com/jiangjia.htm?cityid={cityid}&pgv_ref=article" target="_blank" autobussboss="match|article_price|{pageid}|2586">更多</a></h2>\
                                    </div>\
                                    <div class="bd">\
                                        <foreach data>\
                                        <div class="pt">\
                                            <div class="pic"  bosszone="hotjPic" autobussboss="serial|article_price|{pageid}|2586">\
                                                <a href="//auto.qq.com/jiangjia.htm?brandid={sbrand_id}&serialid={sserial_id}&cityid={scity_id}&pgv_ref=article" target="_blank"><img src="{FSerialPic}" width="100" height="72" title="{FName}" onerror="this.src=\'//mat1.gtimg.com/auto/datalib/errpic/errpic_165_110.jpg\'"></a>\
                                            </div>\
                                            <div class="txt">\
                                                <h3  bosszone="hotjCsName"><a href="//auto.qq.com/jiangjia.htm?brandid={sbrand_id}&serialid={sserial_id}&cityid={scity_id}&pgv_ref=article" target="_blank" autobussboss="serial|article_price|{pageid}|2586">{FName}</a></h3>\
                                                <p><strong class="red-important">{sdiscount_price}万</strong><del>{sguide_price}万</del></p>\
                                                <p><strong class="green-important">{sdiscount_amount}万↓</strong></p>\
                                                <span class="btn"  bosszone="hotjAsk"><a target="_blank" href="//ait.auto.qq.com/car_public/enquiry.shtml?serial_id={sserial_id}&source_type=article_low_price" >询价</a></span>\
                                            </div>\
                                        </div>\
                                        </foreach>\
                                    </div><a style="display:none;" autobussboss="exposure|article_price|{pageid}|2733" id="article_price_autoclick" ></a>',
                                autopk:'<div class="hd">\
                                        <h2><strong><a bosszone="jzName" href="//data.auto.qq.com/car_serial/{sid}/" target="_blank">{sname}&nbsp;竞争车系</a></strong></h2>\
                                    </div>\
                                    <div class="bd">\
                                        <div class="pg">\
                                            <ul>\
                                                <foreach data>\
                                                <li><a  bosszone="jzPic" href="//data.auto.qq.com/car_serial/{serialId}/" target="_blank"><img onerror="this.src=\'//mat1.gtimg.com/auto/datalib/errpic/errpic_165_110.jpg\'" src="{serialPic}" width="120" height="86" title="{serialName}"></a>\
                                                    <h3><a  bosszone="jzCsName" href="//data.auto.qq.com/car_serial/{serialId}/" target="_blank">{serialName}</a></h3>\
                                                    <p>指导价：<span>{serialPrice}</span><br />市场价：<strong class="red-important"  bosszone="jzBaojia" >{price}</strong></p>\
                                                    <p><a style="display: inline-block;width: 40px;height: 20px;padding-top: 3px;text-align: center;color: #fff;background: #ff9600;" href="//ait.auto.qq.com/car_public/enquiry.shtml?serial_id={serialId}&source_type=article_low_price" target="_blank">询底价</a></p>\
                                                </li>\
                                                </foreach>\
                                            </ul>\
                                        </div>\
                                    </div>',
                                autodealer:'<div class="hd">\
                                    <h2><strong>{sname}&nbsp;{cityname}经销商</strong></h2>\
                                </div>\
                                <div class="bd">\
                                    <div class="list">\
                                        <table width="635" border="0" cellspacing="0" cellpadding="0">\
                                            <colgroup>\
                                                <col width="225">\
                                                <col width="175">\
                                            </colgroup>\
                                            <foreach data>\
                                            <tr bosszone="dealer">\
                                                <td><span>[{typename}]</span><a href="//wecar.qq.com/{id}" target="_blank">{short_name}</a></td>\
                                                <td><span class="red-important">{num_400_show}</span></td>\
                                                <td><a href="{url}" target="_blank">{title}</a></td>\
                                            </tr>\
                                            </foreach>\
                                        </table>\
                                    </div>\
                                </div>',
                                serialpiclist:'<foreach data><li>\
                                    <a href="//data.auto.qq.com/car_public/1/disp_pic_nl.shtml#sid={sid}&tid={tagid}&pid={id}" target="_blank"><img onerror="this.src=\'//mat1.gtimg.com/auto/datalib/errpic/errpic_165_110.jpg\'" src="//img1.gtimg.com/datalib_img{src}" width="190" height="127" ></a>\
                                    <a href="//data.auto.qq.com/car_public/1/disp_pic_nl.shtml#sid={sid}&tid={tagid}&pid={id}" target="_blank">{tagname}{count}张</a>\
                                </li></foreach>',
                                serialpiclist2:'<div class="hd">\
                                    <h2 bosszone="csPic"><strong><a href="//data.auto.qq.com/piclib/index.shtml#sid={sid}" target="_blank">{sname}&nbsp;图片</a></strong></h2>\
                                </div>\
                                <div class="bd">\
                                    <div class="pg">\
                                        <ul>\
                                        <foreach data>\
                                            <li  bosszone="csPic">\
                                                <a href="//data.auto.qq.com/car_public/1/disp_pic_nl.shtml#sid={sid}&tid={tagid}&pid={id}" target="_blank"><img onerror="this.src=\'//mat1.gtimg.com/auto/datalib/errpic/errpic_165_110.jpg\'"  src="//img1.gtimg.com/datalib_img{src}" width="132" height="88" ></a>\
                                                <a href="//data.auto.qq.com/car_public/1/disp_pic_nl.shtml#sid={sid}&tid={tagid}&pid={id}" target="_blank">{tagname}{count}张</a>\
                                            </li>\
                                        </foreach>\
                                        </ul>\
                                    </div>\
                                </div>',
                                newpiclist:'<div class="hd">\
                                    <h2><strong><a href="//data.auto.qq.com/piclib/index.shtml" target="_blank">最新图片</a></strong></h2>\
                                </div>\
                                <div class="bd">\
                                    <div class="pg">\
                                        <ul>\
                                        <foreach newest>\
                                            <li  bosszone="newPic">\
                                                <a href="//data.auto.qq.com/piclib/index.shtml#sid={serial_id}" target="_blank"><img src="//img1.gtimg.com/datalib_img/{serial_pic}" width="132" height="88" onerror="this.src=\'//mat1.gtimg.com/auto/datalib/errpic/errpic_165_110.jpg\'"></a>\
                                                <a href="//data.auto.qq.com/piclib/index.shtml#sid={serial_id}" target="_blank">{serial_name}</a>\
                                            </li>\
                                        </foreach>\
                                        </ul>\
                                    </div>\
                                </div>',
                                hotserials:'<div class="hd">\
                                        <h2><strong><a href="//data.auto.qq.com/car_brand/index.shtml" target="_blank">热门车系</a></strong></h2>\
                                    </div>\
                                    <div class="bd">\
                                        <div class="pg">\
                                            <ul>\
                                                <foreach hotest>\
                                                <li  bosszone="hotCs"><a href="//data.auto.qq.com/car_serial/{serial_id}/" target="_blank"><img onerror="this.src=\'//mat1.gtimg.com/auto/datalib/errpic/errpic_165_110.jpg\'" src="//img1.gtimg.com/datalib_img/{serial_pic}" width="120" height="86" title="{serial_name}"></a>\
                                                    <h3><a href="//data.auto.qq.com/car_serial/{serial_id}/" target="_blank">{serial_name}</a></h3>\
                                                    <p>指导价：<span>{price_low}-{price_high}万</span><br />市场价：<strong class="red-important">{price}</strong></p>\
                                                </li>\
                                                </foreach>\
                                            </ul>\
                                        </div>\
                                    </div>',
                                secondhandcar: '<div class="hd">\
                                                    <h2><strong><a href="//ucar.qq.com/" target="_blank">超值二手车</a></strong></h2>\
                                                </div>\
                                                <div class="bd">\
                                                    <ul class="clearfix">\
                                                        <foreach data>\
                                                            <li>\
                                                            <a href="{DetailUrl}" target="_blank">\
                                                                <img src="{CoverImg}" alt="">\
                                                            </a>\
                                                            <div class="car-title">\
                                                                <a href="{DetailUrl}" title="{UCarName}" target="_blank">{UCarName}</a>\
                                                            </div>\
                                                            <div class="car-info clearfix">\
                                                                <span class="fr"><i class="icon-mile"></i><span title="{DriveDistance}">{DriveDistance}公里</span></span>\
                                                                <span class="fl"><i class="icon-time"></i>{BuyDate}年上牌</span>\
                                                            </div>\
                                                            {if Discount = 0}\
                                                            <div class="car-price">\
                                                                <span class="price tl"><em>{CarPrice}</em>万</span>\
                                                            </div>\
                                                            {/if}\
                                                            {if Discount != 0}\
                                                            <div class="car-price ">\
                                                                <span class="price" style="text-align: left;font-size: 14px;"><em style="font-size: 20px;">{CarPrice}</em>万</span>\
                                                            </div>\
                                                            {/if}\
                                                        </li>\
                                                        </foreach>\
                                                    </ul>\
                                                </div>'
                            },
                            data:{
                                cityIds:{
                                    '全国':'0',
                                    '北京':'54',
                                    '上海':'321',
                                    '重庆':'55',
                                    '西安':'296',
                                    '武汉':'173',
                                    '长沙':'179',
                                    '南京':'220',
                                    '沈阳':'262',
                                    '郑州':'161',
                                    '成都':'302',
                                    '杭州':'395',
                                    '宁波':'400',
                                    '广州':'68',
                                    '深圳':'78',
                                    '东莞':'66',
                                    '佛山':'67',
                                    '中山':'82',
                                    '福州':'56',
                                    '济南':'337',
                                    '青岛':'342',
                                    '南昌':'235',
                                    '合肥':'46',
                                    '长春':'243',
                                    '大连':'254',
                                    '厦门':'63',
                                    '太原':'328',
                                    '贵阳':'102',
                                    '昆明':'385',
                                    '宜昌':'178',
                                    '中山':'82',
                                    '惠州':'69',
                                    '珠海':'85',
                                    '湛江':'84',
                                    '江门':'72',
                                    '襄阳':'174',
                                    '南宁':'96',
                                    '兰州':'115',
                                    '金华':'398',
                                    '温州':'404',
                                    '湖州':'396',
                                    '嘉兴':'397',
                                    '绍兴':'402',
                                    '台州':'403',
                                    '石家庄':'200',
                                    '哈尔滨':'208'
                                }

                            }
                    },
                    _create:function(){
                        self = this;
                        this.addExtends();
                        op   = this.options;
                        win[this.widgetName] = this;
                        jQuery.extend({widgetName:this.widgetName});
                        this.init();
                    },
                    destroy:function(){
                        win[this.widgetName] = null
                        delete win[this.widgetName];
                    },
                    addExtends:function(){
                        var userAgent = navigator.userAgent.toString().toLowerCase();
                        $.browser = {
                            tt  : /tencenttraveler|qqbrowser/i.test( userAgent ),
                            ie6 : !-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent),
                            ie7 : /msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (doc.documentMode == 7),
                            ie8 : /msie.[8]\.0/i.test(userAgent) || (doc.documentMode == 8),
                            ie67 : ((!-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent)) || (/msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (doc.documentMode == 7))),
                            ie78 : /msie.[7|8]\.0/i.test(userAgent),
                            ie678: !$.support.leadingWhitespace,
                            ie9 : /msie.[7|9]\.0/i.test(userAgent) && /mozilla\/[4|5]\.0/i.test(userAgent) && /trident\/5\.0/i.test(userAgent) || (doc.documentMode == 9),
                            safari: /webkit/i.test( userAgent ),
                            chrome: /chrome/i.test(userAgent) && /mozilla/i.test(userAgent) ,
                            msie  : /msie/i.test(userAgent) && !/opera/.test(userAgent),
                            ff:  /.*(firefox)\/([\w.]+).*/i.test(userAgent)
                        };
                        //$.ajaxSetup({scriptCharset:'utf-8',ifModified:true,cache:true});
                        $.ajaxSetup({scriptCharset:'utf-8',ifModified:false,cache:false});
                        //self.bindResponse();//调取响应式布局
                    },
                    _parseTpl:function(list,tpl){
                        if(!list||!tpl)return '';
                        // var sublist='';
                        // tpl=tpl.replace(/\<foreach (\w+)\>(.+)\<\/foreach\>/g,function(){
                            // sublist=arguments[2]||'';
                            // return '{'+arguments[1]+'}';
                        // });
                        var rs=[];
                        Object.prototype.toString.call(list)!="[object Array]"&&(list=new Array(list));
                        for(var i=0;i<list.length;i++){
                            (typeof list[i].index=='undefined')&&(list[i].index=i+1);
                            rs.push(_make(tpl,list[i]));
                        }
                        return rs.join('');
                        function _make(tpl,data){
                            var subTpl={};
                            tpl=tpl.replace(/\<foreach (\w+)\>(.+?)\<\/foreach\>/g,function(){
                                subTpl[arguments[1]]=arguments[2]||'';
                                return '{'+arguments[1]+'}';
                            });
                            tpl=tpl.replace(/{if (\w+) = ([\w\d.]+)}(.+?){\/if}/g,function(){
                                return data[arguments[1]]==arguments[2]?arguments[3]:''
                            });
                            tpl=tpl.replace(/{if (\w+) != ([\w\d.]+)}(.+?){\/if}/g,function(){
                                return data[arguments[1]]!=arguments[2]?arguments[3]:''
                            });
                            return tpl.replace(/\{(\w+)\}/g,function($1,$2){
                                var rs=typeof data[$2]!='undefined'?data[$2]:'';
                                return typeof rs!='object'?rs:(function(){
                                    var tp='',sTpl=subTpl[$2];
                                    for(var i=0;i<rs.length;i++){
                                        tp+=_make(sTpl,rs[i])
                                    }
                                    return tp;
                                })();
                            });
                        }
                    },
                    _stopEvent:function(event){
                        if(!event){
                            return null;
                        }
                        (event && event.stopPropagation) ? event.stopPropagation() : (event.cancelBubble = true);
                        (event && event.preventDefault) ? event.preventDefault() : (event.returnValue = false);
                    },
                    Boss: function(a,b,c){
                        try{
                            win.g_btrace_boss = [];
                            var rnd = Math.floor(Math.random()*10);
                            win.g_btrace_boss[rnd]=new Image(1,1);
                            function trimUin(uin) {
                                var value = '';
                                if (typeof uin == 'string') {
                                    uin = uin.replace(new RegExp("[^0-9]", "gm"), "");
                                    value = uin.replace(new RegExp("^0+", "gm"), "");
                                    if (value == '') value = '';
                                }
                                return value;
                            }
                            b = typeof b != 'undefined' ? b : 1391;
                            var d = trimUin($.cookie("pt2gguin") || $.cookie("luin") || $.cookie("uin") || $.cookie("o_cookie") || $.cookie("uin_cookie"));
                            var param = '';
                            if(typeof c != 'undefined'){
                                $.each(c,function(key,value){
                                    param += '&'+key+'='+value;
                                });
                            }
                            win.g_btrace_boss[rnd].src="//btrace.qq.com/collect?sIp=&iQQ="+d+"&sBiz=bella&sOp="+a+"&iSta=0&iTy="+b+"&iFlow=0" + param+'&_='+this.getRandom();
                        }catch(d){}
                    },
                    Qoss: function(_name){
                        win.QosSS.c = new Image();
                        var _c = win.QosSS.c;
                        _c.onload = (_c.onerror = function() {delete _c;});
                        var _t = win.QosSS.t;
                        _name = typeof _name != 'undefined' ? _name : win.bellaPages;
                        _c.src="//qos.report.qq.com/collect?type=1&name=bella_"+ _name +"&1="+ (_t[1]- _t[0])+"&2="+ (_t[2]- _t[0])+ "&3="+ (_t[3]- _t[0])+"&4="+ (_t[4]- _t[0])+ "&5="+ (_t[5]- _t[0]);
                    },
                    getParam: function(name){
                        var reg = new RegExp("(^|&|\\?|#)" + name + "=([^&#]*)(&|$|#)", "");
                        var r = arguments[1] ? arguments[1].match(reg) : win.location.hash.match(reg);
                        if (r!=null) return unescape(r[2]); return null;
                    },
                    getRandom: function(o,n){
                        if(arguments.length === 0){
                            return parseInt((new Date).getTime() / 1);
                        }
                        n = n ? ((o && o.length < n) ? o.length : n) : 1;
                        var randomArray = function(oLen){
                            var len = oLen || 100,
                                oldsource = [];
                            for(var j = 0;j < len ;j++){
                                var random = Math.floor(Math.random()*(j+0.9999));
                                oldsource[j] = oldsource[random];
                                oldsource[random] = j+1;
                            }
                            if((typeof o != "undefined")){
                                var out   = [];
                                for (var k = 0,l = oldsource.length; k < l; k++) {
                                    oldsource[k] && out.push(o[oldsource[k]]);
                                }
                                return out;
                            }else{
                                return oldsource;
                            }

                        }
                        return randomArray(n);
                    },
                    formatParam : function( a ) {
                        function buildParams( prefix, obj, add ) {
                            var name;
                            var rbracket = /\[\]$/;
                            var _my      = arguments.callee;
                            if ( $.isArray( obj ) ) {
                                $.each(obj, function(i, v) {
                                    (rbracket.test( prefix )) ? add( prefix, v ) : _my( prefix + "[" + i + "]", v, add );
                                });
                            } else if ( $.type( obj ) === "object" ) {
                                for ( name in obj ) {
                                    _my( prefix + "[" + name + "]", obj[ name ], add );
                                }
                            } else {
                                add( prefix, obj );
                            }
                        }
                        var prefix,
                            s = [],
                            add = function( key, value ) {
                                value = $.isFunction( value ) ? value() : ( value == null ? "" : value );
                                s.push('<textarea name="'+key+'" style="height:0;width:0;">'+value+'</textarea>');
                            };
                        if ( $.isArray( a ) || ( a.jquery && !$.isPlainObject( a ) ) ) {
                            $.each( a, function() {
                                add( this.name, this.value );
                            });
                        } else {
                            for ( prefix in a ) {
                                buildParams( prefix, a[ prefix ], add );
                            }
                        }
                        return s;
                    },
                    getToken: function(){
                         var str=$.cookie('skey')||'';
                         var hash=5381;
                         for(var i=0,len=str.length;i<len;++i){
                            hash+=(hash<<5)+str.charCodeAt(i);
                         }
                         return hash&0x7fffffff;
                    },
                    crossAjax: function(_url,func,options){
                        var _proxy = (!!_url) ? _url : location.href,_data = {},async = true,load = false,_name = '_proxy_iframe',token = op.token,proxy = '';

                        if(options){
                            _data  = options.data ? options.data : _data;
                            async  = options.async ? options.async : async;
                            load   = options.load ? options.load : load;
                            token  = options.token ? options.token : token;
                        }
                        (!op.data.xmlHttp) && (op.data.xmlHttp = {});
                        //load == true && self.pop({load: true});
                        !!token && (_data.token = self.getToken());
                        _data.r = self.getRandom();
                        var Test  = (_proxy && /^(?:(?:[^:\/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(\?(?:[^#]*))?(?:#(.*))?$/.test(_proxy));
                        var _host = (!!RegExp.$1) ? RegExp.$1 : op.pageInfo.host.replace('//','');
                        if(Test && !!_host && location.host != _host){
                            _name  = '_proxy_'+ _host.replace(/(\.|\:|\?|\/)/ig,'');
                            _proxy = (options && !!options.proxy) ? '//' + _host + options.proxy : '//' + _host + op.currentProxy;

                            var oFrame    = $('#'+_name);

                            oFrame.length ? (function(){
                                (oFrame.attr('src') != _proxy || !op.data.xmlHttp[_name]) ? oFrame.unbind('load').load(sendAjax) : sendAjax(oFrame[0]);
                            })() : (function(){
                                oFrame = $('<iframe id="'+_name+'" name="'+_name+'" style="display:none;" src="'+_proxy+'"></iframe>');
                                oFrame.unbind('load').load(sendAjax).appendTo(document.body);
                            })();
                        }else{
                            var ajax = $.ajax({
                                type: (options && options.type ? options.type : 'POST'),
                                url: _url,
                                async: async,
                                data:_data
                            });
                            ajax.always(resultHandler);
                        }
                        function sendAjax(e){
                            var iframe = e;
                            if(iframe && iframe.type == 'load'){
                                iframe = iframe.target || iframe.srcElement;
                            }
                            try{
                                var xmlHttp = op.data.xmlHttp[_name] || iframe.contentWindow.xmlHttp;
                                op.data.xmlHttp[_name] = xmlHttp;
                            }catch(error){
                                var xmlHttp = null;
                            }
                            if(xmlHttp){
                                if($.browser.msie){
                                    $.support.cors = true; //IE下跨域必须设置
                                }
                                var ajax = $.ajax({
                                    type: (options && options.type ? options.type : 'POST'),
                                    url: _url,
                                    async: async,
                                    xhr: xmlHttp,
                                    data: _data
                                });
                                ajax.always(resultHandler);
                            }
                        }
                        function resultHandler(oResult){
                            self.posted = false;
                            delete self.posted;
                            op.data.doQueue = false;
                            delete op.data.doQueue;
                            //load == true && self.pop({hide: true});
                            if(typeof oResult == 'object'){
                                    oResult = {ret:-999,info: '服务器异常!'};
                            }else{
                                try{
                                    oResult = [].slice.call(oResult.split('{"'),1);
                                    oResult = '{"'+oResult.join('{"').replace(/;?<\/+\w+>$/,'');
                                    oResult = $.parseJSON(oResult);
                                }catch(err){
                                    oResult = {ret:-998,info: '服务器错误!'};
                                }
                                if(oResult.ret == -1){
                                    return self.pop({content:'<span class="fail">'+oResult.info+'</span>',autoHide:true,refer: function(){
                                        if(oResult.url){
                                            top.location.href = window.TXCAR_infomation.host + oResult.url;
                                        }
                                    }});
                                }
                            }

                            typeof func == 'function' && func(oResult);
                        }
                    },
                    showSerialMessage: function(){
                        return ({
                            getSetialId: function(){
                                return $('#NEWS_TOP_SID').val();
                            },
                            getSetialName: function(){
                                return $('#NEWS_TOP_SID').attr('name');
                            },
                            getBrandId: function(){
                                return $('#NEWS_TOP_SID').attr('pid');
                            },
                            setSetialList:function(o){
                                var _my = $(o);
                                var _self = this;
                                var oLi = _my.find('.tabTitle .hli');
                                var oCon = _my.find('.tabContent').children();
                                var timer = timer2 =  null;
                                var flag = true;
                                oLi.hover(function(){
                                    var _this = $(this);
                                    flag && _self.getPriceAndMaxDiscount();//优惠价+车型价格
                                    flag = false;
                                    timer = setTimeout(function(){
                                        var index = _this.index()-1;
                                        if(index == 1 && oCon.eq(index).find('li').length == 0){
                                            return;
                                        }
                                        if(index == 1 && oCon.eq(index).find('li').length == 2){
                                            oCon.eq(index).css('margin-left','380px');
                                            oCon.eq(index).find('.pg,ul').css('width','auto');
                                        }
                                        if(index == 2 && oCon.eq(index).find('table').length == 0){
                                            return;
                                        }
                                        if(index == 2 && oCon.eq(index).find('table').length == 1){
                                            oCon.eq(index).css('margin-left','460px');
                                        }
                                        _this.addClass('now').siblings().removeClass('now');
                                        oCon.eq(_this.index()-1).show().siblings().hide();
                                    },500)
                                },function(){
                                    var _this = $(this);
                                    clearTimeout(timer);
                                    timer2 = setTimeout(function(){
                                        _this.removeClass('now');
                                        oCon.eq(_this.index()-1).hide();
                                    },500)
                                })
                                oCon.hover(function(){
                                    clearTimeout(timer2);
                                },function(){
                                    var _this = $(this);
                                    _this.hide();
                                    oLi.eq(_this.index()).removeClass('now');
                                })
                            },
                            showVieList:function(o){
                                var _my = $(o);
                                var _self = this;
                                var sid = _self.getSetialId();
                                var url = op.api.vieUrl(sid);
                                var flag = true;
                                $(window).bind("scroll", function(){
                                    _setScroll();//当滚动条滚动时
                                });
                                _setScroll();

                                function _setScroll(){
                                    if(!flag){
                                        return false;
                                    }
                                    var scrollTop=$(document).scrollTop();
                                    var viewArea=(scrollTop+(document.documentElement.clientHeight || 800 ));
                                    var top = _my.show().offset().top-200;
                                    if((top && top<viewArea && top>scrollTop && !!op.data.priceflag)){
                                        getDataList();
                                        flag = false;
                                    }
                                    _my.hide();
                                    scrollTop = viewArea = top = null;
                                }
                                function getDataList(){
                                    self.crossAjax(url,function(oRet){
                                        if(oRet.status == 0){
                                            oRet.sid = sid;
                                            oRet.sname = oRet.FName || _self.getSetialName();
                                            oRet.data.length > 4 && (oRet.data.length = 4);
                                            oRet.ids = [];
                                            for(var i=0;i<oRet.data.length;i++){
                                                oRet.data[i].serialPic = oRet.data[i].serialPic;
                                                oRet.ids.push(oRet.data[i].serialId);
                                            }
                                            oRet.ids.push(sid);
                                            oRet.ids = oRet.ids.join(',');
                                            if(!!op.data.currentCity){
                                                var cid = op.data.currentCity.cityid;
                                                showlist(cid,oRet.ids,oRet);
                                            }else{
                                                self.crossAjax(op.api.city_Url,function(cRet){
                                                    var cid = cRet.data.cityid;
                                                    op.data.currentCity = cRet.data;
                                                    showlist(cid,oRet.ids,oRet);
                                                })
                                            }
                                        }

                                    },{proxy:'/proxy.html'})
                                }

                                function showlist(cid,ids,data){
                                    var url = op.api.viepriceUrl(cid,ids);
                                    self.crossAjax(url,function(oRet){
                                        //$(document).dequeue('getDataList');
                                        if(oRet.retcode == 0){
                                            $.each(data.data,function(){
                                                this.min = oRet.data[this.serialId].min;
                                                this.max = oRet.data[this.serialId].max;
                                                if(this.min == 0){
                                                    this.price = '暂无报价';
                                                }else{
                                                    this.price = '<a href="//baojia.auto.qq.com/php/baojia_detail.php?info=0&serialID='+this.serialId+'" target="_blank">'+this.min+'-'+this.max+'万</a>';
                                                }
                                            })
                                            var texthtml = self._parseTpl(data,op.tpl.autopk);
                                            _my.html(texthtml).show();
                                            texthtml = null;
                                        }

                                    })
                                }
                            },
                            showAutoPrice:function(){
                                var _self = this;
                                var sid = _self.getSetialId();
                                var sname = _self.getSetialName();
                                var pid = _self.getBrandId();
                                if(!!op.data.currentCity){
                                    var cid = op.data.currentCity.cityid;
                                    showlist(cid,pid,sid);
                                }else{
                                    self.crossAjax(op.api.city_Url,function(oRet){
                                        if(oRet.ret == 0){
                                            var cid = oRet.data.cityid;
                                            op.data.currentCity = oRet.data;
                                            showlist(cid,pid,sid);
                                        }
                                    })

                                }
                                function showlist(cid,pid,sid){
                                    var url = op.api.priceUrl(cid,pid,sid);
                                    var timestamp = Date.parse(new Date())/1000;
                                    self.crossAjax(url,function(oRet){
                                        if(oRet.retcode == 0){
                                            op.data.setialprices = oRet.data.serialInfo.price_market;
                                            var newdata = {};
                                            newdata.sname = sname;
                                            newdata.sid= sid;
                                            newdata.pid= pid;
                                            newdata.cid= cid;
                                            newdata.cname = op.data.currentCity.cityname;
                                            if(oRet.data.serialInfo.price_market.min == 0){
                                                newdata.market_price = '暂无报价';
                                            }else{
                                                newdata.market_price = '<a href="//baojia.auto.qq.com/php/baojia_detail.php?info=0&serialID='+sid+'" target="_blank">'+oRet.data.serialInfo.price_market.min+'-'+oRet.data.serialInfo.price_market.max+'万</a>';
                                            }
                                            for(i in oRet.data.models){
                                                var data = oRet.data.models[i].send_time - timestamp;
                                                data = Math.floor((data / 86400));
                                                oRet.data.models[i].day = data+1;
                                                var n = parseInt(oRet.data.models[i].sorder_area);
                                                switch(n){
                                                case 1:
                                                  oRet.data.models[i].area = '售全国';
                                                  break;
                                                case 2:
                                                   oRet.data.models[i].area = '售本省';
                                                  break;
                                                case 3:
                                                   oRet.data.models[i].area = '售本市';
                                                  break;
                                                case 4:
                                                   oRet.data.models[i].area = '售多地';
                                                  break;
                                                default:
                                                }
                                                if(op.api.isloca){
                                                    oRet.data.models[i].pageid = '15';
                                                }else{
                                                    oRet.data.models[i].pageid = '14';
                                                }
                                                oRet.data.models[i].cid = cid;
                                            }
                                            if(op.api.isloca){
                                                newdata.pageid = '15';
                                            }else{
                                                newdata.pageid = '14';
                                            }
                                            newdata.rmodels = oRet.data.models;
                                            newdata.rmodels.length>2 && (newdata.rmodels.length = 2);
                                            newdata.cmodels = oRet.data.models;
                                            for(i in oRet.data.serialInfo){
                                                newdata[i] = oRet.data.serialInfo[i];
                                            }

                                            var rhtml = self._parseTpl(newdata,op.tpl.autoprice_right);
                                            var chtml = self._parseTpl(newdata,op.tpl.autoprice_center);
                                            $('.right-autoPrice-mod').html(rhtml).show();
                                            $('.center-autoPrice-mod').html(chtml).show();

                                        }
                                        $(document).dequeue('getDataList');

                                    })
                                }
                            },

                            showAutoPriceTop: function(o){
                                var _my = $(o);
                                if(!!op.data.currentCity){
                                    showlist(op.data.currentCity);
                                }else{
                                    self.crossAjax(op.api.city_Url,function(oRet){
                                        showlist(oRet.data);
                                        op.data.currentCity = oRet.data;
                                    })
                                }

                                function showlist(data){
                                    var cityid = data.cityid;
                                    var cityname = data.cityname;
                                    if(op.data.cityIds[cityname] == undefined ){
                                        cityname = '全国';
                                        cityid = 0;
                                    }
                                    var datalist = {};
                                    $.getScript(op.api.jiangjia_Url(cityid),function(){
                                        datalist.data = window.lowprice_list;
                                        if(datalist.data == null || datalist.data.length == 0){
                                            return false;
                                        }
                                        datalist.cityid = cityid;
                                        datalist.cityname = cityname;
                                        datalist.data.length >3 && (datalist.data.length = 3);
                                        for(var i in datalist.data){
                                            if(op.api.isloca){
                                                datalist.data[i].pageid = '15';
                                            }else{
                                                datalist.data[i].pageid = '14';
                                            }
                                        }
                                        if(op.api.isloca){
                                            datalist.pageid = '15';
                                        }else{
                                            datalist.pageid = '14';
                                        }
                                        var showlist = self._parseTpl(datalist,op.tpl.autopricetop);
                                        _my.html(showlist).show();
                                        //添加曝光量
                                        !!document.getElementById('article_price_autoclick')  && document.getElementById('article_price_autoclick').click();
                                    })
                                    $(document).dequeue('getDataList');
                                }
                            },
                            showDealerList:function(o){
                                var _my = $(o);
                                var _self = this;

                                var flag = true;
                                $(window).bind("scroll", function(){
                                    _setScroll();//当滚动条滚动时
                                });
                                _setScroll();

                                function _setScroll(){
                                    if(!flag){
                                        return false;
                                    }
                                    var scrollTop=$(document).scrollTop();
                                    var viewArea=(scrollTop+(document.documentElement.clientHeight || 800 ));
                                    var top = _my.show().offset().top-200;
                                    if((top && top<viewArea && top>scrollTop)){
                                        getDataList();
                                        flag = false;
                                    }
                                    _my.hide();
                                    scrollTop = viewArea = top = null;
                                }

                                function getDataList(){
                                    if(!!op.data.currentCity){
                                        showlist(op.data.currentCity);
                                    }else{
                                        self.crossAjax(op.api.city_Url,function(oRet){
                                            showlist(oRet.data);
                                            op.data.currentCity = oRet.data;
                                        })
                                    }
                                }

                                function showlist(data){
                                    var sid = _self.getSetialId();
                                    var bid = _self.getBrandId();
                                    var sname = _self.getSetialName();
                                    var cid = data.cityid;
                                    var pid = data.provinceid;
                                    var cname = data.cityname;
                                    var datalist = {};
                                    self.crossAjax(op.api.dealerlistUrl(pid,cid,bid,sid),function(oRet){
                                        //$(document).dequeue('getDataList');
                                        if(oRet.code == 0){
                                            if(oRet.data.list.length == 0){return false;}
                                            datalist.data = oRet.data.list;
                                            datalist.cityid = cid;
                                            datalist.cityname = cname;
                                            datalist.sname = sname;
                                            for(var i=0; i<oRet.data.list.length;i++){
                                                oRet.data.list[i].title = oRet.data.list[i].discount_article.title;
                                                oRet.data.list[i].url = oRet.data.list[i].discount_article.url;
                                                oRet.data.list[i].type == 1 ? (oRet.data.list[i].typename='4S店') : (oRet.data.list[i].typename='综合店')
                                            }
                                            var showlist = self._parseTpl(datalist,op.tpl.autodealer);
                                            _my.html(showlist).show();
                                        }

                                    })
                                }
                            },
                            getPriceAndMaxDiscount:function(){
                                var _self = this;
                                var sid = _self.getSetialId();
                                var bid = _self.getBrandId();
                                var _sp = op.data.setialprices;
                                var _my = $('.top-autoTab-mod');
                                _my.find('.serial_price_'+sid).length && ((_sp.min==0) ? _my.find('.serial_price_'+sid).html('暂无报价') : _my.find('.serial_price_'+sid).html('<a href="//baojia.auto.qq.com/php/baojia_detail.php?info=0&serialID='+sid+'" target="_blank">'+_sp.min+'-'+_sp.max+'万</a>'));

                                if(!!op.data.currentCity){

                                    showlist(op.data.currentCity);
                                }else{
                                    self.crossAjax(op.api.city_Url,function(oRet){
                                        showlist(oRet.data);
                                        op.data.currentCity = oRet.data;
                                    })
                                }
                                function showlist(data){

                                    var cid = data.cityid;
                                    var models = _my.find('.model_price');
                                    var ids = [];
                                    $.each(models,function(){
                                        ids.push($(this).attr('mid'))
                                    })
                                    ids = ids.join(',');
                                    self.crossAjax(op.api.maxdiscountUrl(cid,bid,sid),function(oRet){
                                        if(oRet.retcode == 0){
                                            (oRet.data[sid]>0)&& _my.find('.maxdiscount').html('<a href="//auto.qq.com/jiangjia.htm?brandid='+bid+'&serialid='+sid+'" target="_blank">'+oRet.data[sid]+'万</a>');
                                        }
                                        self.crossAjax(op.api.modelpriceUrl(cid,ids),function(oRet){
                                            //$(document).dequeue('getDataList');
                                            if(oRet.retcode == 0){
                                                for(i in oRet.data){
                                                    if(oRet.data[i].min!=0){
                                                        _my.find('.model_price[mid="'+i+'"]').html('<a href="//baojia.auto.qq.com/php/baojia_detail.php?info=1&modelID='+i+'" target="_blank">'+oRet.data[i].min+'-'+oRet.data[i].max+'万</a>');
                                                    }
                                                }

                                            }
                                        })
                                    })

                                }
                            },
                            getSerialPics:function(){
                                var _self = this;
                                var sid = _self.getSetialId();
                                var sname = _self.getSetialName();
                                var datalist = {};
                                self.crossAjax(op.api.serialpicUrl(sid),function(oRet){
                                    $(document).dequeue('getDataList');
                                    if(oRet.result == 0){
                                        datalist.sname = sname;
                                        datalist.sid = sid;
                                        oRet.data.tags.length > 1 && oRet.data.tags.shift();
                                        datalist.data = [];
                                        $.each(oRet.data.tags,function(){
                                            if(this.tagid == 38 && oRet.data.arrPic.waiguan.length > 0){
                                                this.sid  = sid;
                                                this.id  = oRet.data.arrPic.waiguan[0].nID;
                                                this.src = oRet.data.arrPic.waiguan[0].sOriImgUrl.replace('.jpg','5.jpg');
                                                datalist.data.push(this);
                                            }
                                            if(this.tagid == 39 && oRet.data.arrPic.neishi.length > 0){
                                                this.sid  = sid;
                                                this.id = oRet.data.arrPic.neishi[0].nID;
                                                this.src = oRet.data.arrPic.neishi[0].sOriImgUrl.replace('.jpg','5.jpg');
                                                datalist.data.push(this);
                                            }
                                            if(this.tagid == 40 && oRet.data.arrPic.qita.length > 0){
                                                this.sid  = sid;
                                                this.id = oRet.data.arrPic.qita[0].nID;
                                                this.src = oRet.data.arrPic.qita[0].sOriImgUrl.replace('.jpg','5.jpg');
                                                datalist.data.push(this);
                                            }
                                            if(this.tagid == 29 && oRet.data.arrPic.zdtj.length > 0){
                                                this.sid  = sid;
                                                this.id = oRet.data.arrPic.zdtj[0].nID;
                                                this.src = oRet.data.arrPic.zdtj[0].sOriImgUrl.replace('.jpg','5.jpg');
                                                datalist.data.push(this);
                                            }
                                        })
                                        if(datalist.data.length==0){
                                            return;
                                        };
                                        if(datalist.data.length==3){
                                            datalist.data.length = 2;
                                        };
                                        var html = self._parseTpl(datalist,op.tpl.serialpiclist);
                                        var html2 = self._parseTpl(datalist,op.tpl.serialpiclist2);
                                        $('.top-autoTab-mod .contentC ul').html(html);
                                        $('#right-autoPic-mod').html(html2).show();
                                        datalist = html = html2 = null;
                                    }
                                    op.data.priceflag = true;
                                },{proxy:'/proxy.html'})
                            },
                            getNewPics:function(){
                                self.crossAjax(op.api.newpicUrl,function(oRet){
                                    if(oRet.result == 0){
                                        var html = self._parseTpl(oRet.data,op.tpl.newpiclist);
                                        $('#right-autoPic-mod').html(html).show();
                                        oRet.ids = [];
                                        for(var i=0;i<oRet.data.hotest.length;i++){
                                            oRet.ids.push(oRet.data.hotest[i].serial_id);
                                        }
                                        oRet.ids = oRet.ids.join(',');

                                        if(!!op.data.currentCity){
                                            var cid = op.data.currentCity.cityid;
                                            showlist(cid,oRet.ids,oRet);
                                        }else{
                                            self.crossAjax(op.api.city_Url,function(cRet){
                                                var cid = cRet.data.cityid;
                                                op.data.currentCity = cRet.data;
                                                showlist(cid,oRet.ids,oRet);
                                            })
                                        }
                                    }
                                },{proxy:'/proxy.html'})
                                function showlist(cid,ids,data){
                                    var url = op.api.viepriceUrl(cid,ids);
                                    self.crossAjax(url,function(oRet){
                                        if(oRet.retcode == 0){
                                            $.each(data.data.hotest,function(){
                                                this.min = oRet.data[this.serial_id].min;
                                                this.max = oRet.data[this.serial_id].max;
                                                if(this.min == 0){
                                                    this.price = '暂无报价';
                                                }else{
                                                    this.price = '<a href="//baojia.auto.qq.com/php/baojia_detail.php?info=0&serialID='+this.serial_id+'" target="_blank">'+this.min+'-'+this.max+'万</a>';
                                                }
                                            })
                                            var texthtml = self._parseTpl(data.data,op.tpl.hotserials);
                                            $('.right-autoPk-mod').html(texthtml).show();
                                            texthtml = null;
                                        }

                                    })
                                }
                            },
                            showSecondHandCar: function(selector) {
                                var _self = this;
                                var sid = _self.getSetialId();
                                var sname = _self.getSetialName();
                                var pid = _self.getBrandId();
                                if(!!op.data.currentCity){
                                    var cid = op.data.currentCity.cityid;
                                    showlist(cid,sid);
                                }else{
                                    self.crossAjax(op.api.city_Url, function(oRet){
                                        if(oRet.ret == 0){
                                            var cid = oRet.data.cityid;
                                            op.data.currentCity = oRet.data;
                                            showlist(cid,sid);
                                        }
                                    },{proxy:'/proxy.html'});
                                }
                                window.callback = function(data) {
                                    if(data.ret === 0){
                                        var rhtml = "";
                                        if (data.data.length > 3) {
                                            data.data.length = 3;
                                        }
                                        if (data.data.length === 3) {
                                            rhtml = self._parseTpl(data, op.tpl.secondhandcar);
                                            $(selector).html(rhtml).show();
                                        } else {
                                            $(selector).hide();
                                        }
                                    }
                                }
                                function showlist(cid,sid){
                                    var url = op.api.secondhandcar(cid,sid);
                                    var timestamp = Date.parse(new Date())/1000;
                                    $.getScript(url, function(){});
                                    $(document).dequeue('getDataList');
                                }
                            },
                            init:function(){
                                var  _self = this;
                                if(_self.getSetialId() != undefined){
                                    $('.top-autoTab-mod').length && _self.setSetialList('.top-autoTab-mod');

                                    $(document).queue('getDataList',function(){
                                        _self.showAutoPrice();//车系降价信息
                                    });
                                    /*
                                    $(document).queue('getDataList',function(){
                                        $('.center-second-hand').length && _self.showSecondHandCar('.center-second-hand');
                                    });
                                    */
                                    $('.right-autoPk-mod').length && _self.showVieList('.right-autoPk-mod');//竞争车系

                                    $('.center-autoDealer-mod').length && _self.showDealerList('.center-autoDealer-mod');//经销商列表

                                    $(document).queue('getDataList',function(){
                                        _self.getSerialPics();//车系图片
                                    });
                                    $(document).dequeue('getDataList');
                                }else{

                                    $('.right-autoPriceTop-mod').length && $(document).queue('getDataList',function(){
                                        _self.showAutoPriceTop('.right-autoPriceTop-mod');//热门降价
                                    });

                                    $(document).queue('getDataList',function(){
                                        _self.getNewPics();//最新图片+热门车系
                                    });

                                    $(document).dequeue('getDataList');
                                }
                            }
                        }).init();
                    },
                    autoBussBoss: function(ev){
                        var loopTryNum = 10;
                        var autoBossID = 2586;
                        try{
                            var a=document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)'));
                            var iQQ=(a==null?"":unescape(a[2]));
                            var purl='';
                            var autoBussBoss = '';
                            var ev = window.event || ev;
                            var et = ev.srcElement || ev.target;
                            var type=et.tagName;
                            if (type != "A" && type != "IMG" ) {
                                return true;
                            }
                            if (type == "A"){
                                purl = et.href;
                            }else if (type == "IMG"){
                                purl = et.parentNode.href;
                            }

                            for (var i=loopTryNum-1,tagNode=et;i>=0;i--,tagNode=tagNode.parentNode){
                                autoBussBoss = tagNode.getAttribute('autobussboss');
                                if(autoBussBoss) break;
                            }

                            if(!autoBussBoss) return;

                            var localUrl = location.href;

                            if(autoBussBoss){
                                autoBossImg = new Image(1,1);
                                var autoBossData = autoBussBoss.split('|');
                                if(autoBossData[3] == undefined){
                                    autoBossData[3] = autoBossID;
                                }
                                var timestamp = Date.parse(new Date());
                                var autourl = '//btrace.qq.com/kvcollect?ftime=&sIp=&iQQ='+iQQ+'&sBiz=dealerExposure&sOp='+autoBossData[0]+'&iSta=&iTy='+autoBossData[3]+'&iFlow='+timestamp+'&sPageId='+autoBossData[2]+'&sPos='+autoBossData[1]+'&sUrl='+escape(localUrl)+'&sRef='+escape(purl);
                                autoBossImg.src = autourl;
                            }
                        } catch (e) {}
                    },
                    init:function(){
                        self  = this;
                        op    = this.options;
                        self.showSerialMessage();
                        if(!window.autoBussBoss){
                            if(document.addEventListener){
                            document.addEventListener("click", self.autoBussBoss, false);
                            }
                            else if(document.attachEvent){
                                document.attachEvent("onclick", self.autoBussBoss);
                            }
                        }
                    }
                });
            //})();
            (typeof window[projectName] == 'undefined') && $(document)[projectName]();
        //});
        }
        (typeof window.frameElement == 'unknown') ? runProject(jQuery) : ((typeof jQuery != 'undefined' && typeof jQuery.widget === 'function') && jQuery(document).ready(function(){runProject(jQuery);}));

    }

})()
/*  |xGv00|a1ac0dd0f1bbb881b93a3ec05beac7c7 */