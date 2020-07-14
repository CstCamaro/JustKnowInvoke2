(function ($) {
    /* ajax 分页 */
    $.fn.extend({
        getPageContent: function (options) {
            //参数和默认值
            var defaults = {
                url: "",
                contBox: ".con",
                pageBox: ".mPage"
            };
            var options = $.extend(defaults, options);

            return this.each(function () {
                var o = options,
                    obj = $(this),
                    url = o.url,
                    contBox = $(o.contBox, obj),
                    pageBox = $(o.pageBox, obj),
                    pageCur = 1,
                    pageNum = 0,
                    type = o.type;

                function loadMe(n){
                    var n = n||1;
                    var url = o.url + '_' + n + '.htm?' + Math.random(999);
                    try{
                        $.get(url, function(data) {
                            var con = $(data);
                            if(pageNum == 0){
                                var page = parseInt(data.split("getString.pageCount =")[1]) || 1;
                                pageNum = Math.ceil(page/2);
                            }
                            if(type == 1){
                                $("span.state", con).each(function(){
                                    var _ = $(this);
                                    if(_.text() == '专家已解答') _.addClass("brown");
                                    if(_.text() == '网友已回复') _.addClass("black");
                                });
                            }
                            if(pageNum == 0 || isNaN(pageNum)) return;
                            contBox.html(con.html());
                            pageBox.html(pageInit(n,pageNum));
                        });
                    } catch(e){}
                }

                function pageInit(curPage,countPage){
                    var strHtml = '',
                        prevPage = curPage - 1,
                        nextPage = curPage + 1;
                    strHtml += '<span class="count">' + curPage + '/' + countPage + '</span>';
                    if (prevPage < 1) {
                        strHtml += ' <span class="disabled">上一页</span> ';
                    } else {
                        strHtml += ' <span title="转到上一页"><a rel='+ prevPage +' href="javascript:void(0);">上一页</a></span> ';
                    }
                    if (curPage != 1) strHtml += '<span title="第1页"><a rel="1" href="javascript:void(0);">1</a></span>';
                    if (curPage >= 5) strHtml += '<span>...</span>';
                    if (countPage > curPage + 2) {
                        var endPage = curPage + 2;
                    } else {
                        var endPage = countPage;
                    }
                    for (var i = curPage - 2; i <= endPage; i++) {
                        if (i > 0) {
                            if (i == curPage) {
                                strHtml += '<span title="您正在浏本页" class="current">' + i + '</span>';
                            } else {
                                if (i != 1 && i != countPage) {
                                    strHtml += '<span title="第' + i + '页"><a rel='+ i +' href="javascript:void(0);">' + i + '</a></span>';
                                }
                            }
                        }
                    }
                    if (curPage + 3 < countPage) strHtml += '<span>...</span>';
                    if (curPage != countPage) strHtml += '<span title="第' + countPage + '页"><a rel='+ countPage +' href="javascript:void(0);">' + countPage + '</a></span>';
                    if (nextPage > countPage) {
                        strHtml += ' <span class="disabled">下一页</span> ';
                    } else {
                        strHtml += ' <span title="转到下一页"><a rel='+ nextPage +' href="javascript:void(0);">下一页</a></span> ';
                    }

                    return strHtml;
                }
                function changePage(){
                    pageBox.delegate("a", "click", function(){
                        var page =  parseInt($(this).attr('rel'));
                        loadMe(page);
                    });
                }
                //初始化
                loadMe();
                changePage();
            });
        }
    });


    /* 一次性加载分页 */
    $.fn.extend({
        getPageList: function (options) {
            //参数和默认值
            var defaults = {
                url: "",
                pagePer: 10,
                contBox: ".con",
                pageBox: ".mPage"
            };
            var options = $.extend(defaults, options);
            return this.each(function () {
                var o = options,
                    obj = $(this),
                    url = o.url,
                    contBox = $(o.contBox, obj),
                    pageBox = $(o.pageBox, obj),
                    pagePer = o.pagePer,
                    pageCur = 1,
                    pageNum = 0,
                    dataCon = new Array();

                function init(){
                    $.get(url, function(data) {
                        dataCon = data.split("</li>");
                        var len = dataCon.length - 1;
                        if(len > 0){
                            pageNum = Math.ceil(len / pagePer);
                            setData();
                        }
                        if(pageNum > 1){
                            setPage();
                            changePage();
                        }
                    });
                }
                function setData(){
                    var arrStart = (pageCur - 1) * pagePer,
                        arrEnd = arrStart + pagePer,
                        content = dataCon.slice(arrStart, arrEnd);
                    contBox.html('<ul>'+content.join("")+'</ul>');
                }
                function setPage(){
                    var strHtml = '<span class="page">',
                        prevPage = pageCur - 1,
                        nextPage = pageCur + 1;

                    strHtml += '<span class="count">' + pageCur + '/' + pageNum + '</span>';
                    if (prevPage < 1) {
                        strHtml += ' <span class="disabled">上一页</span> ';
                    } else {
                        strHtml += ' <span title="转到上一页"><a rel="'+ prevPage +'" href="javascript:void(0);">上一页</a></span>';
                    }

                    if (pageCur != 1) strHtml += '<span title="第1页"><a rel="1" href="javascript:void(0);">1</a></span>';
                    if (pageCur >= 5) strHtml += '<span class="ellipsis">...</span>';
                    if (pageNum > pageCur + 2) {
                        var endPage = pageCur + 2;
                    } else {
                        var endPage = pageNum;
                    }
                    for (var i = pageCur - 2; i <= endPage; i++) {
                        if (i > 0) {
                            if (i == pageCur) {
                                strHtml += '<span title="您正在浏本页" class="current">' + i + '</span>';
                            } else {
                                if (i != 1 && i != pageNum) {
                                    strHtml += '<span title="第' + i + '页"><a rel='+ i +' href="javascript:void(0);">' + i + '</a></span>';
                                }
                            }
                        }
                    }
                    if (pageCur + 3 < pageNum) strHtml += '<span class="ellipsis">...</span>';
                    if (pageCur != pageNum) strHtml += '<span title="第' + pageNum + '页"><a rel='+ pageNum +' href="javascript:void(0);">' + pageNum + '</a></span>';

                    if (nextPage > pageNum) {
                        strHtml += ' <span class="disabled">下一页</span>';
                    } else {
                        strHtml += ' <span title="转到下一页"><a rel="'+ nextPage +'" href="javascript:void(0);">下一页</a></span>';
                    }
                    strHtml += '</span>';
                    // strHtml += '</span><span class="page_turn">跳转到:<input maxlength="2" id="toPage" class="to_page"><a href="javascript:void(0)">GO</a></span>';

                    pageBox.html(strHtml);
                }
                function jumpPage(){
                    var p = $("#toPage").val();
                    p = parseInt(p);
                    if( isNaN(p) || p==0 ){
                        $("#toPage")[0].select();
                        return false;
                    }
                    if( p>0 ){
                        pageCur = p>pageNum ? pageNum : p;
                        setData();
                        setPage();
                    }
                }
                function toPage(){
                    pageBox.delegate("#toPage", "keydown", function(){
                        if (event.keyCode == 13){
                            jumpPage();
                        }
                    });
                    pageBox.delegate(".page_turn a", "click", function(){
                        jumpPage();
                    });
                }
                function changePage(){
                    pageBox.delegate(".page a", "click", function(){
                        var page =  $(this).attr('rel');
                        pageCur = parseInt(page);
                        setData();
                        setPage();
                        /*  $(window).scrollTop(contBox.offset().top); */
                    });
                    toPage();
                }
                //初始化
                init();
            });
        }
    });
})(jQuery);



$(function(){
    $("#zixunNew").getPageContent({url:'/c/consult/zixun-new',type:1});
    $("#zixunHot").getPageContent({url:'/c/consult/zixun-hot',type:1});
})



//返回顶部
$(function() {
    $(".mod_back_top").hide();
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $(".mod_back_top").fadeIn(500);
        } else {
            $(".mod_back_top").fadeOut(500);
        }
    });

    $(".mod_back_top").click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
})


function addBookmark(title) {
    var url=parent.location.href;
    if (window.sidebar) {
        window.sidebar.addPanel(title, url,"");
    } else if( document.all ) {
        window.external.AddFavorite( url, title);
    } else if( window.opera && window.print ) {
        return true;
    }
}
function SetHome(obj,vrl){
    try{
        obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
    }
    catch(e){
        if(window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert('抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入"about:config"并回车然后将[signed.applets.codebase_principal_support]设置为"true"，点击"加入收藏"后忽略安全提示，即可设置成功。');
            }
        }
    }
}
/* --*//*  |xGv00|9e921c0f32b7d6a9f2c87362e8d6574d */