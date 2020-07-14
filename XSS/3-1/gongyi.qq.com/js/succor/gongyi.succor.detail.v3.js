var succorObj = {};
succorObj = {
    //拉取详情数据
    //start detail
    "detail": {
        //公益组织信息
        "fundInfo": {
            'data': {},
            'show': function (data) {
                $("#fund_info_wrap").tmpl('tpl_fund_info', {vo: data});
            }
        },
        //多图幻灯片
        "imgFlash": {
            'data': {},
            'slideObj': {},
            'slideOriginalObj': {},
            'isShowOriginal': false,
            'show': function (data) {
                if (!data || data.length <= 0) return;
                this.data = data;
                $("#pj_attach_imgs").tmpl('tpl_attach_imgs', {'list': data});
                //var _url = 'http://gongyi.qq.com/js/pack/slide.v1.js';
                //$.getScript(_url,function(){
                this.slideObj = new slider({'auto': false});
                $('#' + this.slideObj.bigList + '').click(function () {
                    succorObj.detail.imgFlash.showOriginal();
                });
                //});
            },
            'showOriginal': function () {
                //alert('大图显示第'+this.slideObj.currentSlide+'张');
                var _o = $.extend({'contentId': 'floatDiv', 'maskId': 'tipsMask', 'opacity': 0.9});
                //创建遮罩层
                _maskObj = GyLib.Effect.Mask({id: _o.maskId, opacity: _o.opacity});
                _maskObj.create();
                _maskObj.show();

                //已有数据，无需重新加载
                if (this.isShowOriginal) {
                    this.slideOriginalObj.go(this.slideObj.currentSlide);
                    $("#album-dialog").show();
                    return;
                }
                //算页面高度和宽度
                var win = GyLib.Window().viewSize();
                $ww = win.width;		//window宽度
                $wh = win.height;		//window高度
                var dWidth = Math.ceil($ww * 0.9);	//窗口宽度
                var dHeight = Math.ceil($wh * 0.96);	//窗口高度
                var x = ($ww - dWidth) / 2;
                var y = ($wh - dHeight) / 2;

                $("#album-dialog").tmpl('tpl_attach_Original', {'list': this.data});
                $(".album-close-btn").click(function () {
                    $("#album-dialog").hide();
                    $('#' + GyLib.Effect.Mask.handlerID).hide();
                });
                $("#album-dialog").height(dHeight).width(dWidth);
                $("#album-big-frame").height(dHeight - 20).width(dWidth);
                $("#album-small-frame").css('left', (dWidth - $("#album-small-frame").width()) / 2);
                $('.album-big-list li').width(dWidth).height(parseInt(dHeight - 150));
                $(".album-ht").css('top', (dHeight - $(".album-ht").height()) / 2);
                this.slideOriginalObj = new slider({
                    id: 'album-slide-group',
                    action: 'left',
                    bigFrame: 'album-big-frame',
                    bigList: 'album-big-list',
                    bigDirection: 'left',
                    smallFrame: 'album-small-frame',
                    smallList: 'album-small-list',
                    smallDirection: 'left',
                    prevBtn: 'album-slide-prev',
                    nextBtn: 'album-slide-next',
                    //arrow:'album-arrow-up',
                    auto: false,
                    bigStyle: 2
                });
                this.isShowOriginal = true;
                this.slideOriginalObj.currentSlide = this.slideObj.currentSlide;
                this.slideOriginalObj.go(this.slideObj.currentSlide);
                $("#album-dialog").PositionFixed({x: x, y: y}).show();
                //showDialog.show({id:'album-dialog3',bgcolor:"#000000",opacity:70});
            }
        },
        //详情内容展示
        "content": {
            'data': {},
            'show': function (cData, isAttach) {
                this.data = cData;
                cData = cData.replace(/&lt;(?:(?!&gt;).)+&gt;/g,'');
                $("#pj_content").append(cData);
                $("#pj_content h3").eq(0).css('padding-top', '30px');
                if ($("#pj_content h3").length > 1 && !!isAttach) {
                    $("#pj_content h3").eq(1).before('<div id="pj_attach_imgs"></div>');
                } else {
                    $("#pj_content").append('<div id="pj_attach_imgs"></div>');
                }
            }
        }
        //二维码展示
        , "showQr": function (pid) {
            if (!pid || pid <= 0) return;
            var _qrContent = 'http://gongyi.qq.com/succor/detail.htm?id=' + pid;
            var _qr = qrcode(3, 'L');
            _qr.addData(_qrContent);
            _qr.make();
            $(".img_qrcode").html(_qr.createImgTag());
            //$(".img_qrcode").attr("src","http://chart.apis.google.com/chart?chs=75x75&cht=qr&chld=L|0&chl=http%3A%2F%2Fgongyi.qq.com%2Fsuccor%2Fdetail.htm%3Fid%3D"+pid);
            $("#weixin_qrcode").show();
        }
        //基本信息展示
        , "base": {
            'data': {},
            'show': function (baseData) {
                if (!baseData) return;
                //succorObj.detail.base.data = baseData;
                $("#pj_name").html(baseData.title);
                //计算百分比

                baseData.donate.needMoney = parseInt(baseData.donate.needMoney / 100);
                baseData.donate.obtainMoney = parseInt(baseData.base.obtainMoney);
                if (baseData.donate.needMoney > 0) {
                    baseData.donate.percentage = parseInt(baseData.donate.obtainMoney / baseData.donate.needMoney * 100);
                }
                /*if(baseData.base.obtainMoney > 0){
                    baseData.donate.obtainMoney = parseInt(baseData.base.obtainMoney);
                    console.log(baseData.base.obtainMoney)
                    if (baseData.donate.needMoney > 0) {
                        baseData.donate.percentage = parseInt(baseData.donate.obtainMoney / baseData.donate.needMoney * 100);
                    }
                }else{
                    baseData.donate.obtainMoney = 0
                    baseData.donate.percentage = 0;

                }*/
                //填充模板
                $("#top_info_wrap").tmpl("tpl_top_base_info", {
                    vo: baseData
                });
            }
        },
        //初始化详情页数据
        "init": function (pid) {
            pid = parseInt(pid);
            if (!pid) return false;
            if (isNaN(pid)) {
                window.location.href = "//gongyi.qq.com/succor";
                return;
            }

            window['_cb_fn_proj_'+pid] = function (data) {
                if (data.code != 0) {
                    alert(data.info);
                    return false;
                }
                //是否特殊跳转
                if (!!data.base.r_url && data.base.r_url != "" && data.base.id == 1212) {
                    window.location = data.base.r_url;
                    return;
                }

                var _showCallback = function () {
                    //end
                    //判断是否为预览结项报告
                    var _pType = $.gyUtil.getQueryStr("ptype")
                        , _gtk = $.gyUtil.getQueryStr("tk");
                    if (_pType == 'preViewERP' && _gtk == $.gyUtil.getToken()) {
                        data.base.status = 3;
                    }
                    //end
                    var pid = data.base.id;
                    var eUin = data.base.eOrgUin;
                    //焦点图片图片
                    // data.base.img_500 = data.base.focusImg.syn_url + '/500';
                    if(!!data.base.focusImg){
                        data.base.img_500 = data.base.focusImg.syn_url + '/500';
                    }else if(!!data.base.img_mob_list){
                        data.base.img_500 = data.base.img_mob_list[0] + '/500';
                    }else if(!!data.base.img_list){
                        data.base.img_500 = data.base.img_list[0] + '/500';
                    }else{
                        console.log('焦点图片缺失');
                    }

                    //项目开始的时间戳
                    var _date = new Date()
                    var _uStartTime = Date.parse(data.base.startTime.replace('-', '/').replace('-', '/'));
                    var _curTime = _date.getTime();
                    if (_curTime < _uStartTime) data.base.status = 5;

                    //没有微博ID，隐藏祝福框
                    //if(data.base.weiboID == "0") $('.main_bottom_left_bless').hide();
                    //基本信息

                    succorObj.detail.base.data = data.base;
                    succorObj.detail.base.show(data.base);
                    succorObj.statusTipsInit();
                    //分享内容初始化
                    succorObj.shareSNS.init(data.base);
                    if (!!data.detail.process && (data.base.status == 2 || data.base.status == 1)){
                        succorObj.process.firstShow(data.detail.process[0]);
                    }

                    //start判断是否为新版结项报告
                    var _isNewReport = 0;
                    if (!!data.detail.endReport && !!data.detail.endReport.desc) {
                        _isNewReport = 1;
                    }
                    //if(!!data.detail.desc.endReport && data.base.status == 3 && _isNewReport == 1) succorObj.endReport.firstShow(data.detail.desc.endReport);
                    //end
                    //详细信息
                    var _boolAttach = false;
                    var _descModuleTitle = {
                        'proj_budget':'<h3 class="title">项目预算</h3>',
                        'proj_exe_plan':'<h3 class="title">执行计划</h3>',
                        'proj_implement_res':'<h3 class="title">项目效果</h3>',
                        'proj_exe_content':'<h3 class="title">执行能力说明</h3>',
                        'proj_team_info':'<h3 class="title">关于我们</h3>',
                        'proj_donate_feedback':'<h3 class="title">捐赠回馈</h3>',
                        'proj_invoice':'<h3 class="title">发票说明</h3>'
                    };

                    if(!!data.detail.desc_module){
                        var _detailContent = '<h3 class="title">项目介绍</h3>' + data.detail.desc;
                        var _descModule = {
                            'proj_budget':'',
                            'proj_exe_plan':'',
                            'proj_implement_res':'',
                            'proj_exe_content':'',
                            'proj_team_info':'',
                            'proj_donate_feedback':'',
                            'proj_invoice':''
                        };
                        for( var i  in _descModule){
                            if(!!data.detail.desc_module[i]){
                                _descModule[i] =_descModuleTitle[i] + data.detail.desc_module[i];
                                _detailContent +=_descModule[i];

                            }
                        }

                        /* var _detailContent = data.detail.desc
                             + '<h3>项目预算</h3>' + data.detail.desc_module.proj_budget + '<br>'
                             + '<h3>执行计划</h3>' + data.detail.desc_module.proj_exe_plan + '<br>'
                             + '<h3>执行能力说明</h3>' + data.detail.desc_module.proj_exe_content + '<br>'
                             + '<h3>团队介绍</h3>' + data.detail.desc_module.proj_team_info + '<br>'
                             + '<h3>捐赠回馈</h3>' + data.detail.desc_module.proj_donate_feedback + '<br>'
                             + '<h3>发票说明</h3>' + data.detail.desc_module.proj_invoice + '<br>';*/
                    }else{
                        var _detailContent = '<h3 class="title">项目介绍</h3>' + data.detail.desc;
                    }

                    if (!!data.detail.attach && data.detail.attach.length > 0) _boolAttach = true;
                    succorObj.detail.content.show(_detailContent, _boolAttach);
                    //二维码展示
                    succorObj.detail.showQr(pid);
                    //多图轮换
                    if (!!data.detail.attach) succorObj.detail.imgFlash.show(data.detail.attach);
                    //组织信息
                    succorObj.detail.fundInfo.show(data.base);
                    if (data.base.hide_donate == 1) {
                        $(".main-donate-wrap").remove();
                    }

                    //状态1时初始化捐赠框
                    if (data.base.status == 1) {
                        if (typeof(data.base.hide_donate) == "undefined" || data.base.hide_donate != 1) {
                            succorDonate.succorData = {
                                'fid': data.base.fundID,
                                'pid': data.base.id,
                                'title': data.base.title
                            };
                            succorDonate.init();
                        }
                    } else if (data.base.status == 3 && _pType != 'preViewERP') {
                        $("#middle_avi li").removeClass('current');
                        $("#m_menu_report").addClass('current').show();
                        $(".jzsm_info").hide();
                        //var _endReport = (!!data.detail.desc.report && !!data.detail.desc.report[0])?data.detail.desc.report[0]:'项目报告等待中！';
                        var _endReport = (_isNewReport == 1) ? data.detail.endReport.desc : (!!data.detail.report && !!data.detail.report[0]) ? data.detail.report[0] : '项目报告等待中！';
                        $("#process_end_report_desc").show().html(_endReport);
                        if (_isNewReport == 1) {
							$("#process_end_report_desc").show().html(_endReport);
                            
                            $("#process_end_report_desc h3").eq(0).css('padding-top', '10px');
                            $("#processListTop").prepend('<div id="endReportSummaryForProcess"></div>');
                            $("#endReportSummaryForProcess").tmpl('tpl_end_report_summary_for_process_list', {
                                vo: data.detail.desc.endReport,
                                process: data.detail.desc.process
                            });
                        }
						
                    } else if (data.base.status == 3 && _pType == 'preViewERP') {
                        $("#middle_avi li").removeClass('current');
                        $("#m_menu_report").addClass('current').show();
                        $(".jzsm_info").hide();
                        $.ajax({
                            type: 'post',
                            dataType: 'jsonp',
                            jsonp: 'jsoncallback',
                            url: 'http://npoapp.gongyi.qq.com/mp/project/end_report/preView/' + pid + '?g_tk=' + $.gyUtil.getToken() + "&pid=" + pid,
                            success: function (data) {
                                if (data.code != 0) window.location = '//gongyi.qq.com/succor';
								$("#process_end_report_desc").show().html(data.detail.desc);
                                
                                $("#process_end_report_desc h3").eq(0).css('padding-top', '10px');
                                //$("#processListTop").css('margin-top','0');
                                $("#process_desc").prepend('<div class="end-report-summary" id="endReportSummary"></div>');
                                $("#endReportSummary").tmpl('tpl_end_report_summary', {
                                    vo: data.detail
                                });
								
                            }
                        });
                    }
					
                    //捐赠列表
                    succorObj.donateLastList.show(data.detail.donateTopList);
                    //微博支持列表
                    //					succorObj.weiboList.weibo_id = data.base.weiboID;
                    //					succorObj.weiboList.show(data.detail.weiboTopList);
                    //发微博框初始化
                    //					$("#sendWeiboW").succor_weibo({'type':4,'pid':pid,'buin':buin,weibo_title:'腾讯乐捐'});
                    //初始化顶部祝福
                    //					succorObj.topZhufu.init(pid,buin);
                }

                //调查询项目的基础数据
                //http://ssl.gongyi.qq.com/cgi-bin/WXQueryOrder?jsoncallback=Zepto1473306628430&transcode=415&type=proj_base&_=1473306628525
                var _reqPar = {
                    id: pid
                    , type: "proj_base"
                }
                $.ajax({
                    type: 'get',
                    dataType: 'jsonp',
                    data: _reqPar,
                    jsonp: 'jsoncallback',
                    jsoncallback: "_cb_fn_proj_"+pid,
                    url: '//ssl.gongyi.qq.com/cgi-bin/ProjInfoQuery.fcgi',
                    success: function (baseData) {
                        if (baseData.code != 0) {
                            alert("参数错误");
                            return;
                        }
                        if(!!baseData.msg.stat && !!baseData.msg.stat.children_money){
                            baseData.msg.stat.recvedMoney = baseData.msg.stat.recvedMoney + baseData.msg.stat.children_money
                            baseData.msg.stat.donateNum = baseData.msg.stat.donateNum + baseData.msg.stat.children_times
                        }

                        if (!!baseData.msg.stat && !!baseData.msg.stat.recvedMoney) {
                            baseData.msg.base.obtainMoney = (baseData.msg.stat.recvedMoney) / 100;
                        }else if(baseData.msg.stat.recvedMoney ==0){
                            baseData.msg.base.obtainMoney = (baseData.msg.stat.recvedMoney) / 100;
                        }
                        var _rankPar = {
                            pid: pid
                        }
                        $.ajax({
                            type:'get',
                            dataType:'jsonp',
                            data: _rankPar,
                            jsonp: 'jsoncallback',
                            url: '//ssl.gongyi.qq.com/cgi-bin/gywcom_proj_ent_rank.fcgi',
                            success:function (res) {
                                baseData.msg.base.quotaMoney = (parseInt(res.data.sum) + parseInt(res.data.un_sum)) / 100;
                                data.base = $.extend(data.base, baseData.msg.base, baseData.msg);
                                _showCallback();
                            }

                        })
                    }
                });

            }
            /*var _jsFilename = 'pc.detail.' + pid + '.js';
            var url = 'http://gongyi.qq.com/js/succor_data/pcdetail/' + _jsFilename + '?_t=' + Math.random();*/
            /*使用移动端详情接口*/
            // var _jsFilename = 'pc.detail.' + pid + '.js';
            var url = '//scdn.gongyi.qq.com/json_data/data_detail/'+pid % 100+'/detail.'+pid+'.js';
            document.write('<script src="' + url + '"></script>');
            /*$.ajax({
                'type': 'GET',
                'url': url,
                'dataType': 'jsonp',
                'jsonp': 'jsoncallback',
                'jsonpCallback': "_cb_fn_proj_"+pid,
                'timeout':2000,
                success:function () {
                    console.log('success')
                },
                error : function(xhr,textStatus){
                    console.log('error:'+textStatus);
                    if(textStatus == 'timeout'){
                        $.ajax({
                            'type': 'GET',
                            'url':'//ssl.gongyi.qq.com/cgi-bin/ProjInfoQuery.fcgi',
                            'dataType': 'jsonp',
                            'jsonp': 'jsoncallback',
                            'jsonpCallback': "_cb_fn_proj_"+pid
                        })
                    }
                }
            })*/
        }

    },
    //end detail
    //项目进展
    "process": {
        'isload': false,
        'curPage': 1,
        'buin': 0,
        'pid': 0,
        'isExeOrg': false,
        'isAddInit': false,
        'load': function (page) {
            if (!this.isAddInit && this.isExeOrg == true) {
                this.isAddInit = true;
                succorObj.process.addInit();
            }
            if (!!page) {
                var targetOffset = $("#processListTop").offset().top;
                $('html,body').animate({scrollTop: targetOffset}, 300);
            } else {
                page = succorObj.process.curPage;
            }

            if (this.isload && page == succorObj.process.curPage) return;
            succorObj.process.curPage = page;
            this.isload = true;
            var pid = succorObj.detail.base.data.id;
            var uin = succorObj.detail.base.data.exeOrganizerUin;
            // var curl = 'http://npoapp.gongyi.qq.com/succorv2/unprocess/getlist/' + pid + '/' + page;
            var curl = '//ssl.gongyi.qq.com/cgi-bin/WXUnprocessV2?pid=' + pid + '&row=10&curr=' + page;
            //https://ssl.gongyi.qq.com/cgi-bin/WXUnprocessV2?pid=1783&row=10&curr=2&soid=oproJj3AzstI7pJeJqsoiyKfgo6I&jsoncallback=_cb_fn_10&_=1508207707725&callback=_cb_fn_10
            try {
                $.getJSON(curl + '&g_tk=' + $.gyUtil.getToken() + '&jsoncallback=?&r=' + Math.random(), function (data) {
                    if (data.ret != 0) {
                        $.gyUtil.showDialog1({content: data.info, flag: 2});
                        return false;
                    }
                    var tempHtml = $('#endReportSummaryForProcess').html();
                    $('#processListTop').tmpl('tpl_process_list', data.info);
                    $(tempHtml).prependTo($('#processListTop'));
                });
            } catch (e) {
            }
        },
        'changeImg': function (obj) {
            var originalSrc = $(obj).attr('src');//('smallSrc');
            var _this = $(obj);
            if (_this.hasClass('beBig')) {
                $(obj).attr('src', originalSrc.replace(/\/180$/, '/0') + "").attr('title', '缩小');
                _this.removeClass("beBig").addClass("beSmall");
            } else if (_this.hasClass('beSmall')) {
                $(obj).attr('src', originalSrc.replace(/\/0$/, '/180')).attr('title', '放大');
                _this.removeClass("beSmall").addClass("beBig");
            }
        },
        firstShow: function (data) {
            if (data.desc != undefined) {
                $("#pj_content").tmpl('tpl_firstProcess', {
                    vo: data
                });
            }

        },
        getMore: function () {
            $("#middle_avi li").eq(1).click();
        },
        gotoLongDesc:function (id) {
            var pid = succorObj.detail.base.data.id;
            window.location.href = '//gongyi.qq.com/succor/proj_proc_detail.html?pid='+pid+'&id='+id;
        }
    },
    endReport: {
        getMore: function () {
            $("#middle_avi li").eq(2).click();
        }
        , firstShow: function (data) {
            $("#pj_content").tmpl('tpl_firstEndReport', {
                vo: data
            });
        }
    }
    //最新捐赠列表
    , "donateLastList": {
        'show': function (data) {
            if (!data) {
                $('#donate_toplist_wrap').remove();
                return;
            }
            $("#donate_last_wrap").tmpl('tpl_donate_top_list', {list: data});
        }
    },
    //分享
    "shareSNS": {
        'init': function (data) {
            this._getShareInfo(data);
            $(".share_btn").click(function () {
                var type = $(this).attr('ctype');
                var info = succorObj.shareSNS._getShareInfo(data);
                $.gyUtil.shareSNS(type, info);
            });
        },
        '_getShareInfo': function (data) {
            if (data.status == 1) {
                var url = "//gongyi.qq.com/succor/detail.htm?id=" + data.id;
                var _url = encodeURI(url);
                var _title = '请关注#腾讯乐捐-' + data.title + '#' + _url;
            }
            else {
                var url = "//gongyi.qq.com/succor";
                var _url = encodeURI(url);
                var _title = '由@' + data.exeOrganizer + '发起的#腾讯乐捐-' + data.title + '#项目整体募款已圆满完成，进入执行阶段！感谢网友的大爱' + _url;
            }
            var _t = encodeURI(_title);
            _t = _t.replace(/\#/g, "%23");
            var _pic = encodeURI(data.img);
            var _site = '//gongyi.qq.com/succor/';
            return {'url': _url, 'title': _t, 'pic': _pic, 'site': _site};
        }

    },
    //推荐项目
    "tjProject": {
        'data': {},
        'show': function (type) {
            if (!type) type = 2;
            var _url = '//scdn.gongyi.qq.com/js/succor_data/pclist/succor.p.hot.cate.' + type + '.js';
            $.ajax({
                'type': 'GET',
                'url': _url,
                'dataType': 'jsonp',
                'jsonp': 'jsoncallback',
                'jsonpCallback': '_CallbackHotP',
                'success': function (data) {
                    if (data.code == 0) {
                        succorObj.tjProject.data = data.info;
                        $("#other_hot_project_wrap").tmpl('tpl_hot_project', {
                            list: data
                        });
                    }
                }
            });
        }
    },
    //初始化tab
    "tabClick": {
        'init': function () {
            $("#middle_avi li").each(function (i) {
                $(this).click(function (evt) {
                    $("#middle_avi li").removeClass('current');
                    $(this).addClass('current');
                    var _id = $(this).attr('wrapId');
                    $(".jzsm_info").hide();
                    $("#" + _id).show();
                    if (_id == "project_mdesc") {

                    } else if (_id == "process_desc") {	//项目反馈报告
                        succorObj.process.load();
                        evt.preventDefault();
                    } else if (_id == "process_end_report_desc") {	//结项报告

                    }
                });
            });

        }

    },
    //项目状态tips
    'statusTipsInit': function () {
        $("#status_tips li").each(function (i) {
            $(this).hover(function () {
                var _id = $(this).attr('id');
                $("." + _id).show();
            }, function () {
                var _id = $(this).attr('id');
                $("." + _id).hide();
            });
        });
    },
    //微博祝福
    "topZhufu": {
        'init': function (pid, uin) {
            //祝福并发微博
            $("#zhufu2Tips").click(function () {
                if ($("#zhufuTips2").css('display') == 'none') {
                    $("#zhufuTips2").show();
                } else {
                    $("#zhufuTips2").hide();
                }
            });
            $("#zhufuTips2 .closets").click(function () {
                $("#zhufuTips2").hide();
            });
            $("#zhufuTips2").succor_weibo({
                type: 4, pid: pid, buin: uin, callback: function () {
                    $("#zhufuTips2").hide()
                }
            });
        }
    },
    //初始化
    "init": function () {
        //解析id
        var pid = $.gyUtil.getQueryStr("id");
        this.tabClick.init();
        this.detail.init(pid);
        //推荐项目
        this.tjProject.show();
    }

}

//捐款页面片
var succorDonate = {
    'form': 'donateForm',
    'btn1': 'btn_donate1',
    'succorData': {},
    'init': function () {
        //金额切换
        var $_amountInput = $("#" + succorDonate.form + " input[name='amount']");
        $(".marginrg").each(
            function (i) {
                $(this).click(function () {
                    $(".marginrg").removeClass('on');
                    $(this).addClass('on');
                    var _amount = $(this).attr('value');
                    if (!!_amount && _amount > 0) {
                        $_amountInput.val(_amount * 100);
                        $("#money_other_top").val("");
                    } else if ($(this).attr('ctype') == 'other') {
                        var _val = $("#money_other_top").val();
                        $_amountInput.val(_val * 100);
                        $("#money_other_top").keyup(function () {
                            $(this).val($(this).val().replace(/[^0-9\.]*/g, ""));
                        });
                    }
                });
            }
        );
        $("#" + succorDonate.form + " input[name='Fund_Id']").val(this.succorData.fid);
        $("#" + succorDonate.form + " input[name='Even_Name']").val(this.succorData.title);
        $("#" + succorDonate.form + " input[name='Prog_id']").val(this.succorData.pid);
        $_amountInput.val($(".marginrg").eq(0).attr("value") * 100);

        $("#money_other_top").keyup(function () {
            var _amount = $(this).val();
            if (!!_amount && _amount > 0)
                $_amountInput.val(_amount * 100);
            else
                $_amountInput.val("");
        });
        $("#" + this.btn1).bind('click', function () {
            succorDonate.toDonate();
        });
        //微信支付
        $("#btn_donate_wx").bind('click', function () {
            succorDonate.toDonate('wx');
        });

        //判断是否登录后回来捐款
        var _bLoginMoney = GyLib.Cookie().get("bLoginMoney");
        if (!!_bLoginMoney && _bLoginMoney > 0) {
            $_amountInput.val(_bLoginMoney);
            GyLib.Cookie().clear("bLoginMoney", "", "/", "gongyi.qq.com");
            //succorDonate.toDonate();
        }
        //来源统计
        var _et = $.gyUtil.getQueryStr("et");
        if (_et != "") $("#" + succorDonate.form + " input[name='entry_type']").val(_et);
        //99期间关闭pc支付
        // $("#pj_attach_imgs").after('<a href="javascript:GyLib.Donate.show(1,\'' + this.succorData.title + '\',' + this.succorData.fid + ',' + this.succorData.pid + ',1);" class="donate_btn_b"></a>');
    }
    , 'toDonate': function (dtype) {
        var _uin = $.gyUser.checkLogin();
        //判断是否登录
        if (!!dtype && dtype == 'wx') {

        } else if (!_uin) {
            var _money = $("#" + succorDonate.form + " input[name='amount']").val();
            var expires = new Date();
            expires.setTime(expires.getTime() + 50 * 60 * 1000); //50分钟有效
            GyLib.Cookie().set("bLoginMoney", _money, expires, "/", "gongyi.qq.com");
            ptloginopenfun();
            return false;
        }
        var _amount = $("#" + this.form + " #amount_a").val();	//金额
        if (_amount <= 0) {
            alert('请输入金额');
            return false;
        }
        //token赋值
        var gy_key = $.gyUtil.getToken();
        $("#g_tk").val(gy_key);
        $("#qq").val(_uin);


        //977项目需要增加特殊的参数
        if (this.succorData.pid == 977) {
            var _addressVal = $('#selAddress').val();
            if (!_addressVal || _addressVal == 0) {
                alert('请选择省份');
                return false;
            }
            $("#" + succorDonate.form + " input[name='entry_type']").val('qz2');
            $("#" + succorDonate.form + " input[name='gf']").val('loc');
            $("#" + succorDonate.form + " input[name='gt']").val(_addressVal);
        }

        if (!!dtype && dtype == 'wx') {
            this.toWXDonate();
        } else {
            //财付通面登陆
            var _skey = GyLib.Cookie().get("skey");

            var _url = "https://www.tenpay.com/app/v1.0/communitylogin.cgi?p_uin=" + _uin + "&skey=" + _skey + "&u1=&appid=113&win=self";
            var _iframe = $('#tenpay_iframe');
            if (_iframe[0] == null)
                $('<iframe id="tenpay_iframe" frameborder="0px" scroll="no" border="0px" src="' + _url + '" width="1px" height="1px"></iframe>').appendTo('body');
            else
                _iframe.attr('src', _url);
            $("#" + this.form).submit();
        }

    }
    , 'dialog': function (obj) {
        var title = succorObj.detail.base.data.title;
        var pid = succorObj.detail.base.data.id;
        var fundid = succorObj.detail.base.data.fundID;
        GyLib.Donate.show(1, title, fundid, pid, 1, 1);
    }
    //微信支付
    , toWXDonate: function () {
        var _oldAction = $("#" + this.form).attr('action');
        $("#" + this.form).attr('action', 'http://gongyi.qq.com/succor/wxpay.v2.htm');
        $("#" + this.form).submit();
        $("#" + this.form).attr('action', _oldAction);
    }
}


//关闭微博Tips
function closeWeiboLayer() {
    $("div#replyWrap").remove();
}
function ptloginopenfun() {
    GyLib.Login.on();
}

var listenWeibo = function (obj) {
    var _u = $(obj).attr('account');
    $.gyUtil.listenWeibo(_u);
}

//qzone act
function selQzAddress(val) {
    if (!document.getElementById('donate_province_id')) {
        var _provinceNode = document.createElement('input');
        _provinceNode.id = "donate_province_id";
        _provinceNode.name = "donate_province_id";
        _provinceNode.type = 'hidden';
        _provinceNode.value = val;
        document.getElementById('donateForm').appendChild(_provinceNode);
    } else {
        document.getElementById('donate_province_id').value = val;
    }


}
/*  |xGv00|b48d647d2311bb9a303fc282b89789b3 */