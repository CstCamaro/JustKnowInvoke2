String.prototype.realLength = function(){
      return this.replace(/[^\x00-\xff]/g,"**").length;
  };
  String.prototype.cut = function(limit){
      if(this.realLength() <= limit) return this;

      var len = Math.min(this.length, limit);

      var tmp = '';
      for(var i=len; i>=0; --i){
          var tmp = this.substring(0, i);
          if(tmp.realLength() <= limit) return tmp;
      }
      return tmp;
  };
  String.prototype.trim = function(){
      return   this.replace(/(^\s*)|(\s*$)/g,"");
  }
  var Common = {}
  Common.getParameter=function(a){
      var b,c,d,e="",f,g,h=/[^\u4E00-\u9FA5\w\s]/g,i,j;
      b=window.location.href.replace(/&amp;/g,"&");
      d=(c=b.indexOf("?"))>-1?c:b.indexOf("#");
      if(a!=null&&d>-1){
          b=b.substring(d+1);
          b=b.replace(/#/g,"&");
          c=b.split("&");
          for(d=0;d<c.length;d++){
              var f,g;
              f=c[d].split("=")[0];
              g=c[d].substring(c[d].indexOf("=")+1);
              try{
                  i=j="";
                  f=i=decodeURIComponent(f);
                  g=j=decodeURIComponent(g);
                  //f=h.test(i)?f:i;
                  //g=h.test(j)?g:j;
              }catch(ex){}
              f=f.indexOf("%u")>-1?unescape(f):f;
              g=g.indexOf("%u")>-1?unescape(g):g;
              if(f==a){e=g}
          }
      }
      return e
  }
  /*翻页控件*/
  Common.Page = function(config){
      this.refreshCallback = config.refreshCallback;
      this.setPerpageCallback = config.setPerpageCallback;
      this.htmlEl     = $('<div class="page pageArea" ><span class="na">首页</span><span class="na">&lt;&lt;上一页</span><span class="na">下一页&gt;&gt;</span><span class="na">末页</span></div>');

      this.perpageAr  = config.perpageAr || [15, 30, 50];
      this.curPerpage = config.curPerpage || 15;
      this.perpage    = typeof config.perpage == 'undefined'?true:config.perpage;
      this.topage     = typeof config.topage == 'undefined'?true:config.topage;
      this.conEl      = $(config.wrapJel);

      var _this = this;
      this.htmlEl.click(function(e){
          var target = e.target;
          if($(target).hasClass('goprev')){
              _this.prevPage();
          }
          else if($(target).hasClass('gonext')){
              _this.nextPage();
          }
          else if($(target).hasClass('goto')){
              var num = parseInt($(target).attr("num"));
              _this.gotoPage(num);
          }
          else if($(target).hasClass('topage')){
              var val = $(target).siblings('input').val();
              if(!/^\d+$/g.test(val)){
                  alert('页码必须为数字');
                  return;
              }
              var num = parseInt(val);
              if(num>_this.totalPage){
                  alert('没有此页');
                  return;
              }
              _this.gotoPage(num);
          }
      });
      this.totalPage = 0;
      this.currentPage = 1;
      this.conEl.empty().append(this.htmlEl);
      this.pageAreaJel = this.conEl.find(".pageArea");
  }
  Common.Page.prototype.buildPage = function(num,totalPage){
      num = parseInt(num);
      totalPage = parseInt(totalPage);

      this.currentPage = num;
      this.totalPage = totalPage;

      var totalnum = this.totalPage;
      var prevpageEl = '<a href="javascript:void(0)" class="f12 goprev">&lt;&lt;上一页</a>';
      var nextpageEl = '<a href="javascript:void(0)" class="f12 gonext">下一页&gt;&gt;</a>';
      var perpageEl  = this.perpage?this.buildPerPage():'';
      $('select', $(perpageEl)).val(this.curPerpage);
      var topageEl   = this.topage?'<span><label>跳到第</label><input type="text"><label>页/共'+ totalPage +'页</label><button class="topage">GO</button></span>':'';
      var beginEl = '';
      var endEl = '';
      var beginnum = 1;
      var endnum = totalnum + 1;
      var pageitemEl = '';
      if(num == 1){
          prevpageEl = '<span class="na">&lt;&lt;上一页</span>';
      }
      if(num >= totalnum){
          nextpageEl = '<span class="na">下一页&gt;&gt;</span>';
      }
      if(totalnum<=6){
          beginnum = 1;
          endnum = totalnum+1;
      }
      else{
          if(num<4){
              endnum = 6;
              endEl = '<span class="ellipsis">...</span><a href="javascript:void(0)" class="goto" num='+totalnum+'>'+totalnum+'</a>';
              }else if(num>totalnum-3){
              beginnum = totalnum-4;
              beginEl = '<a href="javascript:void(0)" class="goto" num=1>1</a><span class="ellipsis">...</span>';
          }
          else{
              beginnum = num-2;
              endnum = num+3;
              beginEl = '<a href="javascript:void(0)" class="goto" num=1>1</a><span class="ellipsis">...</span>';
              endEl = '<span class="ellipsis">...</span><a href="javascript:void(0)" class="goto" num='+totalnum+'>'+totalnum+'</a>';
          }
      }
      for(var i=beginnum; i<endnum; i++){
          if(i == num) pageitemEl += '<span class="nowPage" title="您正在浏览本页">'+i+'</span>';
          else pageitemEl += '<a href="javascript:void(0)" class="goto" num=' + i + '>' + i + '</a>';
      }

      this.pageAreaJel.html([prevpageEl , beginEl , pageitemEl , endEl , nextpageEl , perpageEl , topageEl].join(''));
      //更新每页n条下拉列表的当前选项
      $('select', this.pageAreaJel).val(parseInt(this.curPerpage,10));
      $('#main').css('height', Math.max($('.listCon').outerHeight(), $('#sideBars').outerHeight()));
      this.bind();
  }
  Common.Page.prototype.buildPerPage = function(){
      var _this = this,
      perpageAr = _this.perpageAr,
      perpageLen = perpageAr.length,
      retHTml = '';
      for(var i=0; i<perpageLen; i++){
          retHTml+='<option value="'+parseInt(perpageAr[i],10)+'">'+ perpageAr[i] +'</option>';
      }
      return '<span><label>每页</label><select>'+ retHTml +'</select><label>条</label></span>'
  }
  Common.Page.prototype.gotoPage = function(num){
      num = parseInt(num);
      if(num<1||num>this.totalPage) return;
      if(this.refreshCallback && typeof(this.refreshCallback)=="function"){
          this.refreshCallback(num); //调用数据刷新回调函数
          this.buildPage(num,this.totalPage);
      }
      else{
          this.buildPage(num,this.totalPage);
      }
      window.scrollTo(0,0);
      registerZone2({'bossZone':'GD_page'},1);
  }
  Common.Page.prototype.set = function(key, value){
      this[key] = value;
  }
  Common.Page.prototype.get = function(key){
      return this[key];
  }
  Common.Page.prototype.prevPage = function(){
      this.currentPage = this.currentPage>1 ? parseInt(this.currentPage) - 1 : 1;
      this.gotoPage(this.currentPage)
  }
  Common.Page.prototype.nextPage = function(){
      this.currentPage = this.currentPage<this.totalPage ? parseInt(this.currentPage) + 1 : this.totalPage;
      this.gotoPage(this.currentPage)
  }
  Common.Page.prototype.setTotalPage = function(num){
      this.totalPage = num;
  }
  Common.Page.prototype.bind = function(num){
      var _this      = this,
      pageJel    = $(_this.pageAreaJel),
      selectJel  = $('select' ,pageJel);

      selectJel.unbind('change').change(function(){
          var perpagenum = $('option:selected' ,$(this)).val();
          if(_this.setPerpageCallback && typeof(_this.setPerpageCallback)=="function"){
              _this.curPerpage = perpagenum;
              _this.setPerpageCallback(perpagenum);
          }
      })
  }
  /**
  * ArticleList 精华文章列表
  */
  var ArticleList = function(listWrap,requireURL){
      this.rowsNumPerPage = TagSetting.PAGE_SIZE;
      this.requireURL     = requireURL;
      this.tagWrapJel     = $('.tag-wrap',$(listWrap));
      this.PAGES_WRAP     = $('.page-wrap',$(listWrap));
      this.emptyTipsJel   = $('.emptyDataTips',$(listWrap));
      this.emptyUrlJel    = $('.emptyTipsSearchByUrl',$(listWrap));
      this.loaddingJel    = $('.loadding',$(listWrap));
      this.maskJel        = $('.mask',$(listWrap));
      this.wrapJel        = $('.bd',$(listWrap));
      this.reuqirePage    = '1';
      this.searchUrl      = '';
      this.searchArts        = false;//是否为搜索文章
      this.LIST_HTML         = '<div class="styleOne {styleTwo}"> <dl class="cf">{imgarea}<dd class="listTitle"><strong><a href="{url}" target="_blank">{stitle}</a></strong></dd><dd>{desc}</dd><dd class="toolBar"><span>{date}</span><span>{time}更新</span>{tags}</dd></dl></div>';
  }
  ArticleList.prototype.init = function(){
      var _this = this;
      _this.wrapJel.empty()
      _this.emptyTipsJel.addClass('undis');
      _this.emptyUrlJel.addClass('undis');
      _this.loaddingJel.removeClass('undis');
      _this.maskJel.removeClass('undis');

      _this.getList();
  }
  ArticleList.prototype.getList = function(){
      var _this  = this;
      var tag = Common.getParameter("tags");
      tag = typeof tag=='undefined'?"":tag;
      var _param      = {};
      _param.p        = _this.reuqirePage;
      _param.l        = _this.rowsNumPerPage;

      _param.tag      = tag;
      //_param.tag        = tag.toLowerCase();

      _param.oe       = 'gbk';
      _param.ie       = 'utf-8';
      _param.source = 'web';
      _param.site     = TagSetting.SITE;

      $.ajax({url:_this.requireURL,data:_param,jsonpCallback:"tagListCb",dataType:'jsonp'}).done(function(resultObj){
          try{
              var response    = resultObj.response;
              var data        = resultObj.data;
              var code        = response.code;
              _this.tagWrapJel.text(tag);
              if(code.toString() === '0'){
                  var total       = data.total;
                  var num = Math.ceil(parseInt(total,10)/_param.l);
                  //_this.tagWrapJel.html(tag+"("+total+")");
                  _this.buildList(data.articles);
                  _this.PAGES_WRAP.removeClass('undis');
                  _this.buildPagesBlock(num>100?100:num);
                  //_this.buildPagesBlock(10);
                  }else if(code.toString() == '-2'){
                  Common.Jump2Login();
                  }else{
                  _this.wrapJel.html('');
                  _this.loaddingJel.addClass('undis');
                  _this.maskJel.addClass('undis');
                  _this.PAGES_WRAP.addClass('undis');
              }
          }catch(e){}
      });
  }
  ArticleList.prototype.buildList = function(listDataAr){
      var _this             = this;
      if(!listDataAr || typeof listDataAr != 'object' || listDataAr.length==0){
          _this.loaddingJel.addClass('undis');
          _this.maskJel.addClass('undis');
          if(_this.searchUrl){
              $("a",_this.emptyUrlJel).attr("url",_this.searchUrl);
              _this.emptyUrlJel.removeClass('undis');
          }
          else{
              _this.emptyTipsJel.removeClass('undis');
          }
          return;
      }

      var perPageItemNum    = _this.rowsNumPerPage;
      var allListHtml       = '';
      var htmlPerPageAr     = [];
      var itemCount         = 0;
      var _poxyWrap         = $('<div></div>');


      for(var i=0; listDataAr[i]&&i<_this.rowsNumPerPage; i++){
          var itemData = listDataAr[i];
          _poxyWrap.append(_this.fillData(itemData,_this.LIST_HTML,i));
      }
      _this.loaddingJel.addClass('undis');
      _this.maskJel.addClass('undis');
      _this.wrapJel.empty().append(_poxyWrap.children());
  }
  ArticleList.prototype.fillData = function(itemObj,listHTML,i){
      var _this = this;
      var title = itemObj.title;
      var desc = itemObj.abstract;
      var stitle = title.realLength()>46?title.cut(46)+'...':title;
      var month = itemObj.pubtime.substr(5,2);
      var day = itemObj.pubtime.substr(8,2);
      var time = itemObj.pubtime.substr(11,5);
      var date = month+"月"+day+"日";
      var tags = "";
      for(var j=0,len=itemObj.tags.length;j<len;j++){
          tags += '<a href="tagsList.htm?tags='+encodeURIComponent(itemObj.tags[j])+'" target="_blank">'+itemObj.tags[j]+'</a>';
      }
      listHTML = listHTML.replace(/\{([^\}]+)\}/gi,function(m,r){
      switch (r)
      {
          case 'styleTwo':
          return itemObj.image?'':'styleTwo';
          case 'stitle':
          return stitle;
          case 'desc':
          return desc;
          case 'url':
          return itemObj.url;
          case 'date':
          return date;
          case 'time':
          return time;
          case 'imgarea':
          return itemObj.image?(itemObj.image=TagSetting.isBigPic?itemObj.image.replace(/_small./g,"."):itemObj.image,'<dt><a href="'+itemObj.url+'" target="_blank"><img onerror="this.src=\'http://mat1.gtimg.com/news/imgcss_article_qq/def_article_pic.jpg\'" src="'+itemObj.image+'" width="140" height="90" alt="'+title+'" /></a></dt>'):'';
          case 'tags':
          return tags?('<span>标签：'+tags+'</span>'):'';
      }
  });
  var trJel = $(listHTML);
  trJel.data('data',itemObj);
  return trJel;
}
ArticleList.prototype.buildPagesBlock = function(allPageNum){
  var _this = this;
  if(_this.Pages == null || typeof _this.Pages != 'object'){
      _this.Pages  = new Common.Page({
          "wrapJel"           :_this.PAGES_WRAP,
          "curPerpage"        :_this.rowsNumPerPage,
          "perpage"           :false,
          "topage"            :false,
          "refreshCallback"   :function(num){
                  _this.reuqirePage = num;
                  _this.init(num);
              },
          "setPerpageCallback":null
      });
      _this.Pages.buildPage(1,allPageNum);
  }
}/*  |xGv00|cd3eda4545d955e995fb02ed51d17fe4 */