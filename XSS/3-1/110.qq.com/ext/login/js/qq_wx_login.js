/**KF登录插件**/
"use script";
(function ($, undefined) {
    /**
     *  登录插件
     *  <div id="web_login" style="display:none;"></div>
     *  $("#web_login").login('#button',{},function(){});
     */
    (function (pluginName) {
        var defaults = {
            qqappid:      "", //qq appid
            wxappid:      "", //微信appid
            qqUrl:      "", //跳转url
            wxUrl:    "", //跳转url
            tips_txt:     "", //小标题
            tips_notes:   "", //大标题
            loginCssUrl:  "", //微信登录窗口外部扩展样式地址
            qqLoginSuccess:function(){}
        };
        $.fn[pluginName] = function (targetid, opts, callback) {
            opts = $.extend(true, {}, defaults, opts);
            var $container = $(this);
            if(!$.trim($container.html())){
                //登录窗口页面初始化
                $container.html(initHtml());
                init();
            }

            function init(){
                //默认按钮触发点击打开登录窗口（如果不传需要外部自行写代码打开登录窗口）
                if(typeof(targetid) === 'string'){
                    $(targetid).unbind('click').bind('click', function () {
                        ishow();
                        callbackFunc('btnClick');
                    });
                }else if(typeof(targetid) === 'object'){
                    for(var i in targetid){
                        $(targetid[i]).unbind('click').bind('click', function () {
                            ishow();
                            callbackFunc('btnClick');
                        });
                    }
                }
                $container.find('.btn_close').unbind('click').bind('click', function () {
                    closeDialog()
                    // $container.hide();
                });
                if(opts.tips_txt && opts.tips_notes){
                    $container.find('.login-tips').show().find('.tips-text').html(opts.tips_txt);
                    $container.find('.login-tips .tips-note').html(opts.tips_notes);
                }
                initTabs(opts.qqappid,opts.wxappid);
                //qqInit(opts.qqappid,opts.goToUrl);//初始化时由于登录页面是隐藏的，无法正常获取高度，样式异常。
                wxInit(opts.wxappid,opts.wxUrl);
                callbackFunc('init');
                
            }

            /**
             * 显示登录窗口
             */
            function ishow(){
                var marginTop = '0'
                $container.show();
                var dataType = $container.find('.login-tab').find('.current').attr('data-type');
                if(!opts.tips_txt || !opts.tips_notes ){
                    marginTop = dataType == 'qq' ? "46px" : "84px"
                }
                $container.find('.login-cont').css({"margin-top":marginTop})
                if(dataType == 'qq' && $("#_login_frame_quick_").attr('src') == 'about:blank'){
                    qqInit(opts.qqappid,opts.qqUrl);
                }else if(dataType == 'wx' && $("#_login_frame_wechat_").attr('src') == 'about:blank'){
                    wxInit(opts.wxappid,opts.wxUrl);
                }
            }
            /**
             * 初始化导航菜单
             * @param string qqappid
             * @param string wxappid
             */
            function initTabs(qqappid,wxappid){
                if(!qqappid && !wxappid){
                    alert("登录组件要求qq、微信appid必填一个");
                    return;
                }
                $container.find('.login-tab .tab-item').unbind('click').bind('click', function () {
                    var dataType = $(this).attr('data-type');
                    var marginTop = '0'
                    $(this).addClass('current').siblings().removeClass('current');
                    $container.find('.cont_inner_' + dataType).addClass('cont_inner_in').siblings().removeClass('cont_inner_in');
                    if(!opts.tips_txt || !opts.tips_notes ){
                        marginTop = dataType == 'qq' ? "46px" : "84px"
                    }
                    $container.find('.login-cont').css({"margin-top":marginTop})
                    if(dataType == 'qq' && $("#_login_frame_quick_").attr('src') == 'about:blank'){
                        qqInit(opts.qqappid,opts.qqUrl);
                    }else if(dataType == 'wx' && $("#_login_frame_wechat_").attr('src') == 'about:blank'){
                        wxInit(opts.wxappid,opts.wxUrl);
                    }
                    callbackFunc('tabClick',dataType);
                });
            }
            /**
             * 回调方法
             */
            function callbackFunc(type,data){
                if(typeof callback == 'function'){
                    callback(type,data);
                }
            }

            /** QQ登录相关方法 **/
            /**
             * qq登录插件初始化
             */
            function qqInit(appid,goToUrl){
                if(!appid){
                    return;
                }
                goToUrl = encodeURIComponent(goToUrl);
                var url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + appid + '&state=110&redirect_uri=' + goToUrl
                // url += "xui.ptlogin2.qq.com/cgi-bin/xlogin?pt_pwd=0&link_target=blank&low_login=1&style=20&hln_logo=&hide_close_icon=1&f_url=loginerroralert&qlogin_auto_login=0&appid="+appid+"&s_url="+goToUrl;
                $("#_login_frame_quick_").attr('src',url);
                window.addEventListener('message',handleQQLogin)
                
            }

            function handleQQLogin(event){
                var e = event || window.event;
                var data = e.data;
                var origin = e.origin
                if(data=="qqConnect" && origin == 'https://110.qq.com'){
                    opts.qqLoginSuccess();
                    window.removeEventListener('message',handleQQLogin)
                    closeDialog()
                    // $container.hide();
                }
            }

            /** 微信登录相关方法 **/
            /**
             * 微信登录插件初始化
             */
            function wxInit(appid,goToUrl){
                if(!appid){
                    return;
                }
                var url = 'https://';
                var randNum = Math.random();
                //修改iframe样式
                var cssUrl = "";
                if(opts.loginCssUrl){
                    cssUrl = encodeURIComponent(opts.loginCssUrl);
                }else{
                    cssUrl = encodeURIComponent('https://110.qq.com/ext/login/css/iframe_login_wx.css');
                }
                goToUrl = encodeURIComponent(goToUrl);
                // if (window.location.protocol == 'https:') {
                //     url = "https://";
                // }
                url += "open.weixin.qq.com/connect/qrconnect?appid="+appid+"&redirect_uri="+goToUrl+"&response_type=code&scope=snsapi_login&state="+randNum+"&href="+cssUrl;
                $("#_login_frame_wechat_").attr('src',url);
            }

            /**
             * 登录页面代码
             */
            function initHtml1(){
                var html = '';
                html += '<div id="mask_layer" class="mask_layer"></div>';
                html += ' <div id="login_win" class="login_dialog" style="display: block; width: 622px; height: 418px; top: 50%; left: 50%; margin-left: -311px; margin-top: -209px; position: fixed; z-index: 10001; padding: 0px; background-color: rgb(255, 255, 255);">';
                    html += ' <iframe src="about:blank" frameborder="0" class="iframe_mask"></iframe>';
                     html += '<a href="javascript:void(0)" id="login_close" class="btn_close" title="关闭">';
                         html += '<span class="btn_inner">关闭</span>';
                    html += ' </a>';
                     html += '<div class="login_tab">';
                         html += '<ul class="tab_list">';
                             html += '<li class="list_item _list_item_qq " data-type="qq">';
                                 html += '<a href="javascript:void(0);" class="tab_item tab_item_qq">';
                                    html += ' <i class="ico_loginqq"></i>';
                                     html += '<span class="item_inner">QQ帐号登录</span>';
                                html += ' </a>';
                             html += '</li>';
                             html += '<li class="list_item _list_item_wx current" data-type="wx">';
                                html += ' <a href="javascript:void(0);" class="tab_item tab_item_wx">';
                                    html += ' <i class="ico_loginwx"></i>';
                                     html += '<span class="item_inner">微信帐号登录</span>';
                                 html += '</a>';
                            html += ' </li>';
                        html += '</ul>';
                     html += '</div>';
                    html += ' <div class="login_tips" style="display:none;">';
                         html += '<div class="tips_txt"></div>';
                         html += '<div class="tips_notes"></div>';
                     html += '</div>';
                     html += '<div class="login_cont">';
                        html += ' <div class="cont_inner cont_inner_qq">';
                             html += '<div class="login_iframe login_iframe_qq" id="login_div">';
                                 html += '<iframe name="_login_frame_quick_" id="_login_frame_quick_" frameborder="no" scrolling="no" style="width:626px; height:370px;" src="about:blank"></iframe>';
                             html += '</div>';
                         html += '</div>';
                         html += '<div class="cont_inner cont_inner_wx cont_inner_in">';
                             html += '<div class="login_iframe login_iframe_wx">';
                                 html += '<iframe name="_login_frame_wechat_" id="_login_frame_wechat_" frameborder="no" scrolling="no" style="width:100%; height:215px;" src="about:blank"></iframe>';
                             html += '</div>';
                         html += '</div>';
                     html += '</div>';
                 html += '</div>';
                return html;
            }

            /**
             * 登录页面代码
             */
            function initHtml(){
                var html = '';
                html += '<div id="mask_layer" class="login-mask"></div>';
                html += '<div id="login_win" class="login-dialog">';
                    html += '<div class="m-login">'
                        html += '<i class="btn_close login-font icon-login__close"></i>'
                        html += '<div class="login-tab">';
                            html += '<div class="tab-item weixin current" data-type="wx"><i class="login-font icon-login__weixin"></i>微信帐号登录</div>'
                            html += '<div class="tab-item qq " data-type="qq"><i class="login-font icon-login__qq"></i>QQ帐号登录</div>'
                        html += '</div>';
                        html += ' <div class="login-tips" style="display:none">';
                            html += '<div class="tips-text"></div>';
                            html += '<div class="tips-note"></div>';
                        html += '</div>';
                        html += '<div class="login-cont" style="overflow:hidden;">';
                            html += ' <div class="cont_inner cont_inner_qq">';
                                html += '<div class="login_iframe login_iframe_qq" id="login_div">';
                                    html += '<iframe name="_login_frame_quick_" id="_login_frame_quick_" frameborder="no" scrolling="no" style="width:690px; height:382px;margin-top: -50px;margin-left: -25px;" src="about:blank"></iframe>';
                                html += '</div>';
                            html += '</div>';
                            html += '<div class="cont_inner cont_inner_wx cont_inner_in">';
                                html += '<div class="login_iframe login_iframe_wx">';
                                    html += '<iframe name="_login_frame_wechat_" id="_login_frame_wechat_" frameborder="no" scrolling="no" style="width:100%; height:215px;" src="about:blank"></iframe>';
                                html += '</div>';
                            html += '</div>';
                        html += '</div>';
                    html += '</div>';
                html += '</div>';
                return html;
            }

            function closeDialog(){
                $container.hide();
                $container.find('#_login_frame_quick_').attr('src',"about:blank")
                $container.find('#_login_frame_quick_').attr('src',"about:blank")
            }


            /**
             * 获取当前脚本的url地址
             */
            function scriptPath () {
                var scripts = document.getElementsByTagName('SCRIPT');
                var path = '';
                if(scripts && scripts.length>0) {
                    for(var i in scripts) {
                        if(scripts[i].src && scripts[i].src.match(/qq_wx_login\.js$/)) {
                            path = scripts[i].src.replace(/(.*)qq_wx_login\.js$/, '$1');
                        }
                    }
                }
                return path;
            }
            
        };
    })('login');
})(jQuery);
