// JavaScript Document


//首屏视频播放器通栏
;(function(){
  $ = $j;

  //初始化当前焦点dom
  var slider_wrap= $(".site_focus");
  var FOCUS_WIDTH="1240px";
  
  var slider_dom = $(".focus_item.choice_wrap");
  $(".focus_list_inner").prepend($(".focus_item.interest_wrap").clone());
  $(".focus_list_inner").show();

	jQuery.ajax({
	    url: "http://data.video.qq.com/fcgi-bin/data?tid=165&idlist="+cid+"&appid=10001009&appkey=c5a3e1529a7ba1005&otype=json",
	    dataType: "jsonp",
	    success: function(res){
	        if(res){
				var data = { 
				    results: res.results
			    };	
			    var html=T.render('mod_video_cid_template',data);
			    jQuery("#video_cidList").html(html);
			    return true;  
	        }
	    }
  	})
  var player_list = slider_dom.find('.mod_video_list_content');
  var player_list_data = {};
  setTimeout(function(){
	create_player_list(slider_dom.find('[data-cid]').first().attr('data-cid'));	
  }, 1000);
  
  
  
  //创建播放器的时候会自动清空mod_player的div，所以提前缓存一下缩略图
  var prepic_interest=$(".focus_item.interest_wrap").find(".mod_player").html();
  var prepic_choice=$(".focus_item.choice_wrap").find(".mod_player").html();
  $(".focus_item.interest_wrap").find("li[data-cid]").removeClass("current");
  


  //点击创建播放列表
  slider_wrap.on('click','[data-cid]',function(e){
	slider_wrap.find("li[data-cid]").removeClass("current");
	$(this).addClass("current");
    e.preventDefault();
    create_player_list($(this).attr('data-cid'));
  });
    //手动播放下一个专辑
  slider_wrap.on('click','.btn_item_next',function(e){
	var cur=slider_wrap.find("li[data-cid].current");
	var next=cur.next();
	if(next.length==0){//已经是最后一个了
		return;
	}
	var nextId=next.attr("data-cid");
	cur.removeClass("current");
	next.addClass("current");
    e.preventDefault();
    create_player_list(nextId);
  });
  //点击播放视频
  slider_wrap.on('click','li.item',function(e){
     create_player($(this));
  });

  function switchToChoice(){
		destroy_player();
		hide_player_list();	
		$(".btn_switch_interest").removeClass("current");
		$(".btn_switch_choice").addClass("current");
		var tiptext=$(".btn_switch_interest").html();
		$(".focus_item.interest_wrap").find("li[data-cid]").removeClass("current");
		
		$(".focus_item.choice_wrap").last().remove();
		slider_dom.find(".mod_player").removeAttr("id");
		var backup_slider_dom=slider_dom;
		slider_dom = $(".focus_item.choice_wrap");
		
		$(".focus_list_inner").prepend(backup_slider_dom.clone());
		$(".focus_list_inner").css("left","1240px");
		$(".focus_list_inner").animate({left:"0px"},350);
		slider_wrap.find(".prev_tip").html(tiptext);
		slider_wrap.find(".next_tip").html(tiptext);
		
		player_list = slider_dom.find('.mod_video_list_content');
		slider_dom.find(".mod_player").attr("id","mod_focus_player");
		var cid=slider_dom.find('[data-cid]').first().attr('data-cid');
		slider_dom.find('[data-cid]').first().addClass('current');
		create_player_list(cid);
  }
  function switchToInterest(){
		destroy_player();
		hide_player_list();	
		$(".btn_switch_choice").removeClass("current");
		$(".btn_switch_interest").addClass("current");
		var tiptext=$(".btn_switch_choice").html();
		$(".focus_item.choice_wrap").find("li[data-cid]").removeClass("current");
		
		$(".focus_item.interest_wrap").last().remove();
		slider_dom.find(".mod_player").removeAttr("id");
		var backup_slider_dom=slider_dom;
		slider_dom = $(".focus_item.interest_wrap");	
		
		$(".focus_list_inner").prepend(backup_slider_dom.clone());
		$(".focus_list_inner").css("left","1240px");
		$(".focus_list_inner").animate({left:"0px"},350);
		slider_wrap.find(".prev_tip").html(tiptext);
		slider_wrap.find(".next_tip").html(tiptext);
		
		player_list = slider_dom.find('.mod_video_list_content');
		slider_dom.find(".mod_player").attr("id","mod_focus_player");
		var cid=slider_dom.find('[data-cid]').first().attr('data-cid');
		slider_dom.find('[data-cid]').first().addClass('current');
		create_player_list(cid);
  }
  //关闭播放列表
  slider_wrap.on('click','.btn_close_list',function(){
      //destroy_player();
      slider_dom.find('.mod_video_album_section').hide();
  });
   //展开播放列表
  slider_wrap.on('click','.btn_open_list',function(){
      slider_dom.find('.mod_video_album_section').toggle();
  });
  $('#btn_player_expand').on('click',function(){
	slider_dom.find('.mod_player_section').toggleClass('mod_player_section_wide');
  })

  


  
  //创建播放列表
  function create_player_list(cid){
    //slider.vstop();
    slider_dom.find('.mod_player_section').show();
	//slider_dom.find('.mod_video_album_section').show();
	slider_dom.find('.mod_video_album_section').hide();
    //设置打开
    player_list_shown = true;

    if(!cid) return;
    var fields = player_list_data[cid];
    if(!fields){
      var url = 'http://data.video.qq.com/fcgi-bin/data?tid=109&idlist='+cid+'&appid=20001023&appkey=f32e6ab4af507113&otype=json';
      $.ajax({
        url:url,
        dataType:'jsonp',
        success:function(data){
          if(parseInt(data.errorno) !== 0) return;
          var fields = data.results[0].fields;
          player_list_data[fields.cover_id] = fields;
          render_player_list(fields);
        }
      });
    }else{
      render_player_list(fields);
    }
  }
  //渲染页面
  function render_player_list(fields){
    var title = fields.title;
    slider_dom.find('span.title_text').html(title).attr('title',title);
    for(var i=0;i<fields.video_ids.length;i++){
      fields.video_ids[i].count = add_commas(fields.video_ids[i].view_all_count);
    }
	slider_dom.find(".cover_count").find("em.count_total").html(fields.video_ids.length);
    var html = T.render('mod_video_list_template',fields);
    player_list.html(html);
    //创建播放器
    create_player(player_list.find('li.current'));
  }

  //创建播放器
  var focus_player = null;
  var focus_video = null;
  function create_player(item){
	
    if(!item.hasClass('current')){
      player_list.find('li.current').removeClass('current');
      item.addClass('current');
    }
    if(focus_video && focus_player){
      destroy_player();
    }

    focus_player = null;
    var vid = item.attr('data-vid');
    var video = focus_video = new tvp.VideoInfo();
    video.setVid(vid);
	var vtitle=item.find("a").attr("title");
	slider_dom.find(".player_wrap").find("span.video_title").html(vtitle);
	var vindex=player_list.find("li").index(item)+1;
	slider_dom.find(".cover_count").find("em.count_current").html(vindex);
	
    var player = focus_player =new tvp.Player();

    player.create({
        width:'100%',
        height:380,
        video:video,
        vodFlashSkin:'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf',
        modId:"mod_focus_player", //mod_player是刚刚在页面添加的div容器
        autoplay:true,
        flashWmode:"transparent",
        onallended:function(){
          play_next();
        }
    });
  }
  //播放下一个视频
  function play_next(){
    var current = player_list.find('li.current');
    var item = current.next();
    if(item.length>0){
      current.removeClass('current');
      item.addClass('current');
      create_player(item);
    }
  }
  
  //销毁视频
  function destroy_player(){
    $("#mod_focus_player").html('');
	$(".focus_item.interest_wrap").find(".mod_player").html(prepic_interest);
	$(".focus_item.choice_wrap").find(".mod_player").html(prepic_choice);
    focus_player = null;
    focus_video = null;
  }

  function hide_player_list(){
     //$('.mod_player_section').hide();
	 slider_dom.find('.mod_video_album_section').hide();
     //slider.vstart();
  }

  //给数字变逗号
  function add_commas(nStr){ 
  　nStr += ''; 
  　x = nStr.split('.'); 
  　x1 = x[0]; 
  　x2 = x.length > 1 ? '.' + x[1] : ''; 
  　var rgx = /(\d+)(\d{3})/; 
  　while (rgx.test(x1)) { 
  　　x1 = x1.replace(rgx, '$1' + ',' + '$2'); 
  　} 
  　return x1 + x2; 
  } 

  T = {
    renderer: {},
    render: function(tempalte_selector, data) {
        var template;
        if (!this.renderer[tempalte_selector]) {
          template = document.getElementById(tempalte_selector).innerHTML;
          this.renderer[tempalte_selector] = new Function('tpl_data', "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(tpl_data){p.push('" + template.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        }
        return this.renderer[tempalte_selector](data);
      }
  };
  //"'
})();


/*  |xGv00|9969a12eee2ffd411cb12101c9300d27 */