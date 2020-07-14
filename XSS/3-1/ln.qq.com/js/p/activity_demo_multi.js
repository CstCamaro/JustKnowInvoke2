(function($) {
    /**
     * @author leikou@tencent.com
     */

    /**
     * data format as below:
     *    {
     *      'retcode'   : 4001,
     *      'data'      : {},
     *      'msg'       : ['很抱歉，您还没有登录']
     *    }
     */

    // 此处保留reg_host设置是为了兼容旧代码
    reg_host = 'http://webadmin.city.qq.com/clubact2/';
    if(typeof site_domain != 'undefined')
    	reg_host = site_domain;
    
    var cur_actid = 0;
    
    //处理最近页面相关
    $(document).ready(function () {
    	var url = reg_host + 'reg/last/detail/jsonp?callback=loadUserInfo';
    	$.getScript(url, function (data) {});
    });
    function loadUserInfo (data) {
    	if (data && typeof (data) == "string") {
			try {
				data = eval("(" + data + ")");
			} catch (e) {
				alert('服务器正忙，请稍后再试');
			}
		} else {
			var ret_msg = '';
			if(typeof (data.msg) == 'string') {
				ret_msg = data.msg;
			} else {
				for (k in data.msg) {
					ret_msg = ret_msg + data.msg[k] +';';
				}
			}
			if(data.retcode == 0) {
				var u_info = data.data;
				if(u_info) {
					for(var k in u_info) {
						if(u_info[k]) $('input[name=' + k + ']').val(u_info[k]);
					}
				}
				s='';
			} else {
				alert(ret_msg);
			}
		}
    	
    	var s='';
    }
    
    window.loadUserInfo = loadUserInfo;
    
    function parse_reg(res)
    {
        $('#' + cur_actid + '_reg_button').removeAttr('disabled');
        switch (res.retcode)
        {
            case 4001 :
                pop_login_window();
                break;

            case 4002 :
                show_cancel_button(res.msg);
                break;
			case 4003:
				show_error(res.msg);
				break;			
            case 0 :
                reg_success(res);
                break;

            case -1 :
                show_error(res.msg);
                break;

            default :
        }
    }


    function parse_reg_cancel(res)
    {
        $('#' + cur_actid + '_reg_cancel_button').removeAttr('disabled');
        switch (res.retcode)
        {
            case 0 :
                reg_cancel_success(res);
                break;

            case -1 :
                show_error(res.msg);
                break;
        }
    }


    function reg(activity_id)
    {
    	cur_actid = activity_id;
        $('#' + activity_id + '_reg_button').attr('disabled', 'disabled');
        document.charset='utf-8';
        $('#' + activity_id + '_reg_form')
            .attr('accept-charset', 'utf-8')
            .attr('action', reg_host + 'activity/' + activity_id + '/register?callback=parse_reg')
            .submit();
        document.charset='gbk';
       
    }

    function reg_cancel(activity_id)
    {
        $('#' + activity_id + '_reg_cancel_button').attr('disabled', 'disabled');
        document.charset='utf-8';
        $('#' + activity_id + '_reg_form').attr('action', reg_host + 'activity/' + activity_id + '/register/cancel?callback=parse_reg_cancel').submit();
        document.charset='gbk';
    }
    
    function add_img_input(data) {
    	//{"retcode":0,"data":{"image_id":176,"image_url":"http:\/\/p.qpic.cn\/areabbs\/0\/act_176\/0"},"msg":[]}
    	if (data && typeof (data) == "string") {
			try {
				data = eval("(" + data + ")");
			} catch (e) {
				alert('服务器正忙，请稍后再试');
			}
		}
    	if(data.retcode == 0 && data.data) {
    		var url =  data.data['thumb_url'];
    		var url1 = data.data['image_url'];
    		var id = data.data['image_id'];
    		
    		//带删除预览功能
    		//var div = $('<div class="image_item  img"><div class="big_img"><img src="'+url1+'" /></div><img src="'+url+'" style="width:50px;height:50px;position: absolute;" /><div title="delete" class="delete"></div><input type="hidden" name="img_id[]" value="'+id+'" /></div>');
    		
    		var div = $('<div class="image_item  img"><img src="'+url+'" style="width:40px;height:40px;" /><input type="hidden" name="img_id[]" value="'+id+'" /></div>');
    		$('#my_images').append(div);
    		//鼠标划上显示图片功能
    		$('.img').mousemove(function (e) {
    			var div = $(this);
    			var big_img = div.find('.big_img');
    			big_img.show();
    			
    			div.mouseout(function () {
    				big_img.hide();
    			});
    			
    		});
    		$('.delete').click(function () {
    			var el = $(this);
    			var dom = el.parent();
    			dom.remove();
    		});
    	} else {
    		var ret_msg = '';
			if(typeof (data.msg) == 'string') {
				ret_msg = data.msg;
			} else {
				for (k in data.msg) {
					ret_msg = ret_msg + data.msg[k] +';';
				}
			}
                
			if(data.retcode == 4001) {
				 pop_login_window();
			} else {
				alert(ret_msg);
			}
    	}
    	
    	//图片上传其它回调函数,请有需要的前端人员自行定义该函数
		if ( typeof (img_callback) == 'function' ){
			img_callback(data);
		}
		
    }
   
    function checkSize() {
    	var ret = true;
        var f = document.getElementById("userfile");
        if (f.files && f.files[0]) {
            var fv = f.files[0].size; //火狐等标准取值办法
            if(fv > 5033165) { 
            	alert('Picture capacity is too big(less than 4.8M)');
            	ret = false;
            	return ret;
            }
        } else {
            var url = f.value + '?t=' + Math.random();
            var img = new Image();
            img.src = url;
            img.onreadystatechange = function () {
                if (img.readyState == "complete") {
                    if(img.fileSize > 5033165) { 
                    	alert('Picture capacity is too big');
                    	ret = false;
                    	return ret;
                    }
                }
            };
        }
    	return ret;
    }
    
    function wb_callback (msg, data) {
     
    	var ret_msg = '';
		if(typeof (data.msg) == 'string') {
			ret_msg = data.msg;
		} else {
			for (k in data.msg) {
				ret_msg = ret_msg + data.msg[k] +';';
			}
		}
		if(data.retcode == 4001) {
			 pop_login_window();
		} else {
//			if(data.retcode != '5_80024')
//				alert(ret_msg);
		}
    }

	function submit_wb () {
		
		var url = '';
		
		var t_check = $('#' + cur_actid + '_t_check');
		var f_check = $('#' + cur_actid + '_friends_check');
		var t_type = t_check.val();
		var param = {};
		if(t_check.attr('checked')) {
			if(t_type == '1') {
				//url = reg_host + '/activity/' + activity_id + '/t/add';
				setTimeout(function () {
					$('#' + cur_actid + '_f_wb_add').submit();
				},500);
				
			} else {
				param['content'] = $('#' + cur_actid + '_content').val();
				//url = reg_host + '/activity/' + activity_id + '/t/readd';
				
				setTimeout(function () {
					$('#' + cur_actid + '_f_wb_readd').submit();
				},500);
			}
			//myPost(url, param, {}, function(){}, wb_callback);
		}
		if(f_check.attr('checked')) {
//			url = reg_host + '/activity/' + activity_id + '/t/friends/add';
//			myPost(url, param, {}, function(){}, wb_callback);
			
			setTimeout(function () {
				$('#' + cur_actid + '_f_friend_add').submit();
			},1000);
		}
		
	}
	

	//func1 成功时候调用，func2失败时候调用
	//url 为请求地址，param为所带参数，p是自己所传参数，可作为回调函数使用，
	function myPost(url, param, p, func1, func2) {
		$.ajax({
			  type: 'POST',
			  url: url,
			  data: param,
			  dataType: 'json',
			  success: function(data) {
				if (data && typeof (data) == "string") {
					try {
						data = eval("(" + data + ")");
					} catch (e) {
						alert('服务器正忙，请稍后再试');
					}
				} else {
					var ret_msg = '';
					if(typeof (data.msg) == 'string') {
						ret_msg = data.msg;
					} else {
						for (k in data.msg) {
							ret_msg = ret_msg + data.msg[k] +';';
						}
					}
					if(data.retcode == 0) {
						if(func1, typeof(func1) == 'function') {
							func1(ret_msg, data);
						}
					} else {
						if(func2, typeof(func2) == 'function') {
							func2(ret_msg, data, p);
						}
					}
				}
			 }
			});
	}
	
    function up_img(activity_id)
    {
    	var url = reg_host + 'activity/' + activity_id + '/upload/image';
    	
//    	if(document.location.host == 'clubact.qq.com' ) {
//    		url = 'http://shz.qq.com/clubact2/activity/17/upload/image';
//    	}
    	
    	if(checkSize()) {
	    	var cur_img_num = $('.image_item').length;
	    	if(cur_img_num >= img_num) {
	    		alert('most upload ' + img_num + ' pictures');
	    		return ;
	    	} else {
		    	document.charset='utf-8';
		    	var form = $('#formImg');
				var frame = $('#frame_img');
		        if (!frame[0]) {
		            frame = $('<iframe id="frame_img" name="frame_img" style="display:none;" ></iframe>');
		        }
		    	form.append(frame);
		    	form.attr('target', 'frame_img');
		    	form.attr('action', url);
		    	form.submit();
		    	
		    	document.charset='gbk';
	    	}
    	}
//        document.charset='utf-8';
//        $('#reg_form')
//            .attr('accept-charset', 'utf-8')
//            .attr('action', reg_host + '/activity/' + activity_id + '/register?callback=parse_reg')
//            .submit();
//        document.charset='gbk';
    }
   
    window.parse_reg = parse_reg;
    window.parse_reg_cancel = parse_reg_cancel;
    window.reg = reg;
    window.reg_cancel = reg_cancel;
    window.up_img = up_img;
    window.add_img_input = add_img_input;
    
    window.wb_callback = wb_callback;
    window.callback = function() {
    };
    
    // ------------------- private function ------------------
    function reg_success(res)
    {
    	submit_wb();
        if (typeof(custom_reg_success) == 'function')
        {
            custom_reg_success();
        }

        $('#' + cur_actid + '_reg_button').removeAttr('disabled');
    }


    function show_info(msg)
    {
        if (typeof(msg) == 'string')
        {
            alert(msg);
        }
        else
        {
            var info_msg = '';
            $.each(msg, function(k, v) {
                info_msg += v + '\n';
            });
            alert(info_msg);
        }
    }


    function show_error(msg)
    {
        if (typeof(msg) == 'string')
        {
            alert(msg);
        }
        else
        {
            var err_msg = '';
            $.each(msg, function(k, v) {
                err_msg += v + '\n';
            });
            alert(err_msg);
        }
    }


    function pop_login_window()
    {
        // TODO pop login window
        document.domain='qq.com';
//        var url = 'http://q1.city.qq.com/js/T.Login1.js';
//        var id = 'login_js';
//        if ($('#' + id).size())
//        {
//            return;
//        }
//
//        $('<script>')
//            .attr('id', id)
//            .attr('type', 'text/javascript')
//            .attr('src', url)
//            .appendTo('head');

        $.getScript('http://q2.area.qq.com/d/js/D.js', function() {
        	document.domain='qq.com';
        	D.login(function () {
        		D.login.getFace(info.uin);
        	}, function () {
        		D.login.getLogin();
        	});
    	});
        
        $('#' + cur_actid + '_reg_cancel_button').hide();
        $('#' + cur_actid + '_reg_button').show().removeAttr('disabled');
    }


    function show_cancel_button(msg)
    {
        alert(msg);
        $('#' + cur_actid + '_reg_button').hide();
        $('#' + cur_actid + '_reg_cancel_button').show().removeAttr('disabled');
    }


    function reg_cancel_success(res)
    {
        show_info(res.msg);
        $('#' + cur_actid + '_reg_cancel_button').hide();
        $('#' + cur_actid + '_reg_button').show().removeAttr('disabled');
    }

    
})(jQuery);
/*  |xGv00|32cb8bb80d4e566d058ee61fb044cd20 */