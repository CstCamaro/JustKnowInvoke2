(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
var listObj = {};

function _Callback(data){
    if(data.ret != 0){
        alert(data.info);
    }
    listObj.list.show(data);
}

listObj = {
    list:{
        show:function(data){
            //项目列表
            $('#projectList_wrap').tmpl('tpl_project_list',{list:data.plist});
            
            //关键字搜索初始化
            $('#projectSearch_wrap').tmpl('tpl_search_list',{
                search: data.search
            });
            //关键字搜索展示
            if(!!data.search.s_key && data.search.s_key != ''){
                $('#searchResultSummary').tmpl('tpl_ret_key',{page:data.pages,search:data.search});
                $('#searchResultSummary').show();
            }else{
                $('#searchResultSummary').hide();
            }
            //发布者展示
            if((!!data.search.s_puin && data.search.s_puin > 10000) || (!!data.search.s_fid && data.search.s_fid > 0)){
                $('#search-pub-wrap').tmpl('tpl_ret_pub',{page:data.pages,search:data.search});
                $('#search-pub-wrap').show();
            }else{
                $('#search-pub-wrap').hide();
            }
            
            listObj.search.init();
            //分页
            $('#projectPages_wrap').tmpl('tpl_page_list',{
                pages: data.pages
            });
        },
        go:function(page){
            var _parData = listObj.search.getSearchFormData();
            if(!page) page = 1;
            _parData.p = page;
            
            if(!!_parData){
                var _lenPar = _parData.length;
                var _arr = [];var k=0;
                for(var i in _parData){
                    if(!!_parData[i]){
                        _arr[k] = i+'='+_parData[i];
                        k++;
                    }
                }
                var _hashStr = _arr.join('&');
                window.location.hash = _hashStr;
            }else{
                listObj.load();
            }
            var targetOffset = $("#search_wrap").offset().top;
            $('html,body').animate({scrollTop: targetOffset}, 300);
        }
    },
    search:{
        getSearchData:function(){
            var _sear = {};
            //状态
            var _status = decodeAndGetHashStr('s_status');
            _sear.s_status = (!!_status || _status>0)?_status:1;//$("#s_status").val();
            //领域
            _sear.s_tid = decodeAndGetHashStr('s_tid');//$("#s_tid").val();
            //puin
            _sear.s_puin = decodeAndGetHashStr('s_puin');
            //fid
            _sear.s_fid = decodeAndGetHashStr('s_fid');
            //排序
            // _sear.s_sort = decodeAndGetHashStr('s_sort');//$("#s_sort").val();
            //关键字
            _sear.s_key = decodeAndGetHashStr('s_key');//$("#key_words").val();
            _sear.p = decodeAndGetHashStr('p');//$("#key_words").val();
            return _sear;
        },
        getSearchFormData:function(){
            var _sear = {};
            //状态
            _status = $("#s_status").val();
            _sear.s_status = (_status!="" || _status>0)?_status:1;
            //领域
            _sear.s_tid = $("#s_tid").val();
            //发布者
            _sear.s_puin = $("#s_puin").val();
            _sear.s_fid = $("#s_fid").val();
            //排序
            _sear.s_sort = $("#s_sort").val();
            //关键字
            _sear.s_key = decodeURIComponent($("#key_words").val());
            return _sear;
        },
        /*
        getSearchData:function(){
            var _sear = {};
            //状态
            var _status = $.gyUtil.getHashStr('s_status');
            _sear.s_status = (!!_status || _status>0)?_status:1;//$("#s_status").val();
            //领域
            _sear.s_tid = $.gyUtil.getHashStr('s_tid');//$("#s_tid").val();
            //puin
            _sear.s_puin = $.gyUtil.getHashStr('s_puin');
            //fid
            _sear.s_fid = $.gyUtil.getHashStr('s_fid');
            //排序
            // _sear.s_sort = $.gyUtil.getHashStr('s_sort');//$("#s_sort").val();
            //关键字
            _sear.s_key = decodeURIComponent($.gyUtil.getHashStr('s_key'));//$("#key_words").val();
            _sear.p = $.gyUtil.getHashStr('p');//$("#key_words").val();
            return _sear;
        },
        getSearchFormData:function(){
            var _sear = {};
            //状态
            _status = $("#s_status").val();
            _sear.s_status = (_status!="" || _status>0)?_status:1;
            //领域
            _sear.s_tid = $("#s_tid").val();
            //发布者
            _sear.s_puin = $("#s_puin").val();
            _sear.s_fid = $("#s_fid").val();
            //排序
            _sear.s_sort = $("#s_sort").val();
            //关键字
            _sear.s_key = decodeURIComponent($("#key_words").val());
            return _sear;
        },*/
        init:function(){
            $("#s_status_text").html($("#s_status_list li a[selected='selected']").html());
            $("#s_tid_text").html($("#s_tid_list li a[selected='selected']").html());
            $("#s_sort_text").html($("#s_sort_list li a[selected='selected']").html());
            $('.drop-span').mouseover(function(){
                $(this).find('ul').show();
                $(this).find('.d-title2').addClass('d-title2-hover');
            });
            $('.drop-span').mouseout(function(){
                $(this).find('ul').hide();
                $(this).find('.d-title2').removeClass('d-title2-hover');
            });
            
            //下拉筛选绑定
            $(".drop-ul li a").click(
                function(){
                    $(".drop-ul").hide();
                    var _par = $(this).attr('p');
                    var _val = $(this).attr('val');
                    $("#"+_par).val(_val);
                    listObj.list.go();//$("#dropFilter").submit();
                }
            );
            //关键字搜索绑定
            $("#key_btn").click(
                function(){
                    var _key = $("#key_words").val();
                    $("#s_status").val('');
                    $("#s_tid").val('');
                    $("#s_sort").val('');
                    $("#s_puin").val('');
                    listObj.list.go();
                }
            );
            $("#key_words").keyup(function(){
                if(event.keyCode == 13){
                    $("#key_btn").click();
                }
            });
        }
    },
    load:function(_parData){
        if(!_parData) _parData = listObj.search.getSearchData();
        var _url = "//ssl.gongyi.qq.com/cgi-bin/WXSearchCGI?ptype=stat&s_status="+_parData.s_status;
        listObj.search;
        $.ajax({
            'type':'GET',
            'url':_url,
            'dataType':'jsonp',
            'data':_parData,
            'jsonp':'jsoncallback',
            'jsonpCallback':'_CallbackSearch',
            'success':function(data){
                if(data.ret != 0){
                    alert(data);
                }
                data.search = _parData
                data.pages = {
                    page:data.p,
                    total_page:data.totp,
                    total:data.totnum
                }
                listObj.list.show(data);
                
            },
            scriptCharset:'utf-8',
            error:function(data){
            }
        });
    }
}

function toDonate(obj){
    var _this = $(obj);
    var _title = _this.attr('pName');
    var _pid = _this.attr('pid');
    var _fid = _this.attr('fid');
    GyLib.Donate.show(1,_title,_fid,_pid,1,1);
}

listObj.init = function(){
    jQuery(window).bind( 'hashchange', function(e) {
        listLoad();
    });
    listLoad();
    //$(window).bind("hashchange", listLoad), listLoad();
}
function listLoad(){
    listObj.load();
}

function decodeAndGetHashStr(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.hash.substr(1).match(reg);
    if (r!=null) return decodeURIComponent(r[2]).toSafe(); return null;
    // if (r!=null) return unescape(r[2]); return null;
    
}
/*  |xGv00|a8232ccf509fd56bf4848ed93c987b63 */