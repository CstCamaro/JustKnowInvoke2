/**
 * AngelZou
 * yuweizou.cn@gmail.com
 */
var askUrl = "//auto.qq.com/buycar/askprice-test.htm";
var css = ".d-none{display:none!important}\
#car-low-price-box{position:fixed;bottom:0;left:0;right:0;height:70px;width:100%;min-width:1100px;background-color:#4d4d4d;background-color:rgba(0,0,0,.7);z-index:99}\
#car-low-price-box .icon-delete{position:absolute;top:0;right:0;padding:5px;width:30px;height:30px;z-index:100;text-align:center;font-size:24px;color:#fff;cursor:pointer;}\
#car-low-price-box .icon-delete:hover{font-weight:600}\
#car-low-price-box .car-low-price-content{position:relative;margin:0 auto;width:1240px;height:70px}\
@media only screen and (max-width:1300px){#car-low-price-box .car-low-price-content{width:1000px}}\
#car-low-price-box .car-low-price-content #ask-price-box{position:absolute;right:0;height:70px;line-height:70px}\
#car-low-price-box .car-low-price-content #ask-price-box #car-choose{vertical-align:middle;font-size:16px;color:#fff}\
#car-low-price-box .car-low-price-content #ask-price-box #ask-price-btn{width:130px;height:30px;border:0;font-size:18px;vertical-align:middle;background-color:#ff9600;color:#fff;cursor:pointer}\
#car-low-price-box .car-low-price-content #ask-price-box #ask-price-btn:hover{background-color:#da860f}\
#car-low-price-box .car-low-price-content #ask-price-box #car-manufacturer,#car-low-price-box .car-low-price-content #ask-price-box #car-series{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin-right:4px;height:30px;line-height:30px;padding-left:5px;vertical-align:middle;border:none;outline:0;cursor:pointer;font-size:16px;color:#666}\
#car-low-price-box .car-low-price-content #ask-price-box .tips{position:absolute;top:0;right:140px;line-height:20px;color:#ff9600}\
#car-low-price-box img{position:absolute;left:0;bottom:30px;height:84px;width:335px}\
#car-low-price-box .price-daikuan,#car-low-price-box .price-ucar{line-height:30px;height:30px;display:inline-block;text-align:center;padding:0 10px;background:#FF9600;margin-left:10px;font-size:18px;color:#fff;vertical-align: middle;}\
#car-low-price-box .price-daikuan:hover,#car-low-price-box .price-ucar:hover{text-decoration:none;background-color:#da860f}";
/*
var tpl  = '<div id="car-low-price-box">' +
                '<div class="car-low-price-content">' +
                    '<img src="//img1.gtimg.com/auto/pics/hv1/209/123/2125/138209699.png" alt=""> '+
                    '<div id="ask-price-box"> '+
                        '<label id="car-choose" for="">意向车型：</label> '+
                        '<select name="car-manufacturer" id="car-manufacturer"> '+
                            '<option value="">请选择厂商</option> '+
                        '</select>' +
                        '<select name="car-series" id="car-series">' +
                            '<option value="">请选择车系</option>' +
                        '</select>' +
                        '<input type="button" value="询本周最低价" data-href="' + askUrl + '" id="ask-price-btn"><a class="price-daikuan" href="javascript:void(0);">贷款买车</a><a class="price-ucar" href="javascript:void(0);" >二手车</a>' +
                        '<span class="tips d-none"></span>' +
                    '</div><a id="jumpnewwindow" target="_blank"></a>' +
                '</div>' +
                '<div class="icon-delete">×</div>' +
            '</div>';
*/
var tpl  = '<div id="car-low-price-box">' +
                '<div class="car-low-price-content">' +
                    '<img src="//img1.gtimg.com/auto/pics/hv1/209/123/2125/138209699.png" alt=""> '+
                    '<div id="ask-price-box"> '+
                        '<label id="car-choose" for="">意向车型：</label> '+
                        '<select name="car-manufacturer" id="car-manufacturer"> '+
                            '<option value="">请选择厂商</option> '+
                        '</select>' +
                        '<select name="car-series" id="car-series">' +
                            '<option value="">请选择车系</option>' +
                        '</select>' +
                        '<input type="button" value="询本周最低价" data-href="' + askUrl + '" id="ask-price-btn">' +
                        '<span class="tips d-none"></span>' +
                    '</div><a id="jumpnewwindow" target="_blank"></a>' +
                '</div>' +
                '<div class="icon-delete">×</div>' +
            '</div>';

var manuid = $("#NEWS_TOP_SID").attr('mid');
var brandid = $("#NEWS_TOP_SID").attr('pid');
var serialid = $("#NEWS_TOP_SID").val() || 0;
(function($) {
    var askPrice = function() {};
    var addCssRule = (function(){
        var append = function(rule, id){
            if ($("#" + id).length) {
                return;
            }
            $('<style type="text/css" id="' + id + '">' + rule + '</style>').appendTo($('head'));
        };
        return append;
    }());
    if (!$("#car-low-price-box").length) {
        $("body").append(tpl);
    }
    addCssRule(css, "footer-low-price-car");
    askPrice.prototype = {
        init: function() {
            var self = this;
            self.getBrand("#car-manufacturer");
            $("#car-manufacturer").on("change", function() {
                var val = $(this).val();
                if (val === "") {
                    $("#car-series").html('<option value="">请选择车系</option>');
                } else {
                    self.getCarSeries(val, "#car-series");
                }
            });
            $("#car-series").on("change", function() {
                self.isCheck();
            });
            self.askPrice();
            self.del();
			self.addLink();//添加贷款买车
        },
        del: function() {
            $("#car-low-price-box .icon-delete").on('click', function() {
                $("#car-low-price-box").remove();
            });
        },
        isCheck: function() {
            if ($("#car-manufacturer").val() !== "" && $("#car-series").val() !== "") {
                $("#ask-price-box .tips").addClass('d-none');
                return true;
            }
            if ($("#car-manufacturer").val() === "") {
                $("#ask-price-box .tips").removeClass('d-none').text("请选择厂商！");
                return false;
            }
            if ($("#car-series").val() === "") {
                $("#ask-price-box .tips").removeClass('d-none').text("请选择车系！");
                return false;
            }
        },
        getUrl: function(id) {
            return {
                brand: "//js.data.auto.qq.com/manu_list.js",
                carSeries: "//js.data.auto.qq.com/car_brand/" + id + "/serial_list_json.js",
                carModel: "//wecar.qq.com/api/askprice/getcarmodels/serial_id/" + id
            };
        },
        getBrand: function(selector) {
            var self = this;
            var url = this.getUrl().brand;
            $.getScript(url, function() {
                var manus = oManufacturerData.arrManufacturer,
                    html = '<option value="">请选择厂商</option>';
                $.each(manus, function() {
                    if (manuid && manuid === this.ID.toString()) {
                        html += '<option selected="selected" value="' + this.ID + '">' + this.Name + '</option>';
                    } else {
                        html += '<option value="' + this.ID + '">' + this.Name + '</option>';
                    }
                });
                $(selector).hide(); // ie7bug：select重叠问题，先隐藏，在显示即可
                $(selector).html(html);
                $(selector).show();
                if ($(selector).val() !== "") {
                    self.getCarSeries($(selector).val(), "#car-series");
                }
            });
        },
        getCarSeries: function(id, selector) {
            var self = this;
            var url = this.getUrl(id).carSeries;
            $.ajax({
                type: "GET",
                url: url,
                dataType: "script",
                timeout: 1000,
                crossDomain: true,
                error: function() {
                    self.errorCar();
                },
                success: function() {
                    var series = [];
                    try {
                        series = oManufacturerSerialData.arrSerial;
                        if (!series.length) {
                            self.errorCar();
                            return false;
                        }
                    } catch(err) {
                        self.errorCar();
                        return false;
                    }
                    var html = '<option value="">请选择车系</option>';
                    $.each(series, function() {
                        if (serialid && serialid === this.ID.toString()) {
                            html += '<option selected="selected" value="' + this.ID + '">' + this.Name + '</option>';
                        } else {
                            html += '<option value="' + this.ID + '">' + this.Name + '</option>';
                        }
                    });
                    $("#car-series").hide();
                    $("#car-series").html(html);
                    $("#car-series").show();
                    oManufacturerSerialData = null;
                    self.isCheck();
                }
            });
        },
        errorCar: function() {
            html = '<option value="">请选择车系</option>';
            $("#car-series").html(html);
            $("#ask-price-box .tips").removeClass('d-none').text("该厂商没有相关车系，请选择其它厂商，谢谢！");
        },
		addLink: function(){
			$.getScript('//wecar.qq.com/api/askprice/getprovinceandcity?format=jsloader',function(){
				$('#car-low-price-box .price-daikuan').unbind().bind("click", function() {
					serialid = ($("#car-series").val() !='' ? $("#car-series").val() : serialid);
					
					$('#jumpnewwindow').attr('href', '//huodong.auto.qq.com/cardata/common/notice/chg_param_jump?mbid='+brandid+'&serialid='+serialid+'&cityid='+g_location_info.data.cityid+'&from=1717&is_pc=1')[0].click();
				});
				$('#car-low-price-box .price-ucar').unbind().bind("click", function() {
					serialid = ($("#car-series").val() !='' ? $("#car-series").val() : serialid);
					$('#jumpnewwindow').attr('href', '//ucar.qq.com/?filter=b'+brandid+'s'+serialid)[0].click();
				});
			})	
		},
        askPrice: function() {
            var self = this;
            $("#ask-price-btn").unbind().bind("click", function() {
                if(self.isCheck()) {
                    $("#ask-price-box .tips").addClass('d-none');
                    var manuid = $("#car-manufacturer").val(),
                        seriesid = $("#car-series").val(),
                        dest = $(this).attr('data-href');
						$('#jumpnewwindow').attr('href', dest + '?manu_id=' + manuid + '&serial_id=' + seriesid)[0].click();
                }
            });
			
        }
    };
    new askPrice().init();

})(window.jQuery || window.$);
/*  |xGv00|642c41dfabc9f3d04efc40ab7d053751 */