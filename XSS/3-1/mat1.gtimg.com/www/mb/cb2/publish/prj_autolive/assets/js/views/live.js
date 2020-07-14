define('template/template',[],function() {
    var html = {
        img: '<fieldset data-type="img"><div class="field-title"><label>图片</label><label>选择所处分页</label><select name="tabset" class="tabset"><option value="default" selected="">主页</option><option value="tab0">页卡1</option><option value="tab1">页卡2</option><option value="tab2">页卡3</option></select><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input"><label>图片地址</label><button class="uploadpic" limitwidth="no" limitheight="no">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://mat1.gtimg.com/news/2016/zt/autolive/img/wzb.jpg" class="elemsrc"></div></div><div class="sec-input"><label>图片链接</label><div class="long-style"><input type="text" value="" placeholder="无需跳转就不需要填链接" class="elemlink"></div></div></section><button class="set-toggle">高级选项 <i></i></button><div class="setting" style="display: none;"><section><div class="sec-input"><label>上边距</label><div class="short-style"><input type="number" value="10" class="offsetT"></div><label>下边距</label><div class="short-style"><input type="number" value="0" class="offsetB"></div></div><div class="sec-input"><label>左边距</label><div class="short-style"><input type="number" value="10" class="offsetL"></div><label>右边距</label><div class="short-style"><input type="number" value="10" class="offsetR"></div></div><div class="sec-input"><label>宽度</label><div class="short-style"><input type="text" value="100%" class="elemWidth"></div></div></section></div></div></fieldset>',
        imgLogo: '<fieldset data-type="imgLogo"><div class="field-title"><label>底部Logo</label><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input"><label>图片地址</label><button class="uploadpic" limitwidth="no" limitheight="no">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/44/72/2060/133969904.png" class="elemsrc"></div></div><div class="sec-input"><label>跳转链接</label><div class="long-style"><input type="text" value="" placeholder="无需跳转就不需要填链接" class="elemlink"></div></div><div class="sec-input"><label>图片宽度</label><div class="short-style"><input type="text" value="75%" class="elemWidth"></div></div></section><button class="set-toggle">高级选项 <i></i></button><div class="setting" style="display: none;"><section><div class="sec-input"><label>上边距</label><div class="short-style"><input type="number" value="25" class="offsetT"></div><label>下边距</label><div class="short-style"><input type="number" value="25" class="offsetB"></div></div><div class="sec-input"><label>左边距</label><div class="short-style"><input type="number" value="0" class="offsetL"></div><label>右边距</label><div class="short-style"><input type="number" value="0" class="offsetR"></div></div></section></div></div></fieldset>',
        tabs: '<fieldset data-type="tabs"><div class="field-title"><label>分页卡</label><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input"><label class="short">页卡1</label><div class="mid-style"><input type="text" value="多视角直播" class="tabs1"></div><label class="short">页卡2</label><div class="mid-style"><input type="text" value="边看边聊" class="tabs2"></div><label class="short">页卡3</label><div class="mid-style"><input type="text" placeholder="不填写名称则表示不启用" class="tabs3"></div></div></section><h3 class="sec-title">外边距</h3><section><div class="sec-input"><label class="short">上边距</label><div class="mid-style"><input type="number" value="0" class="offsetT"></div><label class="short">下边距</label><div class="mid-style"><input type="number" value="0" class="offsetB"></div></div><div class="sec-input"><label class="short">左边距</label><div class="mid-style"><input type="number" value="0" class="offsetL"></div><label class="short">右边距</label><div class="mid-style"><input type="number" value="0" class="offsetR"></div></div></section><section><div class="sec-input"><label>插入位置</label><input class="setposition" type="radio" name="pos" checked value="true"><span>视频列表上方</span><input class="setposition" type="radio" name="pos" value="false"><span>视频列表下方</span></div></section></div></fieldset>',
        text: '<fieldset data-type="text" id="text0"><div class="field-title"><label>文本</label><button class="addtitle">添加标题</button><button class="addparagraph">添加段落</button><label>选择所处分页</label><select name="tabset" class="tabset"><option value="default" selected="">主页</option><option value="tab0">页卡1</option><option value="tab1">页卡2</option><option value="tab2">页卡3</option></select><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input"><label>上边距</label><div class="short-style"><input type="number" value="10" class="offsetT"></div><label>下边距</label><div class="short-style"><input type="number" value="0" class="offsetB"></div></div><div class="sec-input"><label>左边距</label><div class="short-style"><input type="number" value="10" class="offsetL"></div><label>右边距</label><div class="short-style"><input type="number" value="10" class="offsetR"></div></div></section><section class="text title" type="title"><div class="sec-input"><label>标题文本</label><i class="elemhide" title="收起"></i><i class=" textdel" title="删除"></i></div><div><div class="sec-input"><label>输入内容</label><div class="long-style"><input type="text" value="" placeholder="标题" class="elemtext"></div></div><button class="set-toggle">高级选项 <i></i></button><div class="setting" style="display: none;"><div class="sec-input"><label>标题链接</label><div class="long-style"><input type="text" value="" placeholder="无需跳转就不需要填链接" class="elemlink"></div></div><div class="sec-input"><label>背景颜色</label><div class="long-style"><input type="text" value="" placeholder="不填写则使用默认样式" class="background"></div></div><p class="reminder">输入颜色（#ffddcc）或图片地址（http://……）</p><div class="sec-input"><label>内上边距</label><div class="short-style"><input type="number" value="0" class="offsetNT"></div><label>内下边距</label><div class="short-style"><input type="number" value="0" class="offsetNB"></div></div><div class="sec-input"><label>内左边距</label><div class="short-style"><input type="number" value="30" class="offsetNL"></div><label>内右边距</label><div class="short-style"><input type="number" value="0" class="offsetNR"></div></div><div class="sec-input"><label>行高</label><div class="short-style"><input type="number" value="1.5" class="elemlineheight"></div><label>字体大小</label><div class="short-style"><input type="number" value="15" class="fontsize"></div></div><div class="sec-input"><label>字体颜色</label><div class="short-style"><input type="text" value="" placeholder="#145aab" class="fontcolor"></div><label>对齐方式</label><select class="textalign"><option value="left" selected="">左</option><option value="center">中</option><option value="right">右</option></select></div></div></div></section><section class="text paragraph" type="paragraph"><div class="sec-input"><label>段落文本</label><i class="elemhide" title="收起"></i><i class="textdel" title="删除"></i></div><div><div><label>输入内容</label><div class="right"><textarea type="text" rows="3" class="elemtext">我是一个段落，我是一个段落，我是一个段落，我是一个段落，我是一个段落。</textarea></div><button class="set-toggle">高级选项 <i></i></button><div class="setting" style="display: none;"><div class="sec-input"><label>段落链接</label><div class="long-style"><input type="text" value="" placeholder="无需跳转就不需要填链接" class="elemlink"></div></div><div class="sec-input"><label>行高</label><div class="short-style"><input type="number" value="1.5" class="elemlineheight"></div><label>字体大小</label><div class="short-style"><input type="number" value="15" class="fontsize"></div></div><div class="sec-input"><label>字体颜色</label><div class="short-style"><input type="text" value="" placeholder="#000000" class="fontcolor"></div><label>对齐方式</label><select class="textalign"><option value="left" selected="">左</option><option value="center">中</option><option value="right">右</option></select></div></div></div></div></section></div></fieldset>',
        textDemo: '<fieldset data-type="textDemo"> <div class="field-title"> <label>文本Demo</label> <button class="addtitleDemo">添加标题</button> <label>选择所处分页</label> <select name="tabset" class="tabset"> <option value="default" selected="">主页</option> <option value="tab0">页卡1</option> <option value="tab1">页卡2</option> <option value="tab2">页卡3</option> </select> <i class="move" title="移动"></i> <i class="elemhide" title="收起"></i> <i class="elemcopy" title="复制"></i> <i class="elemdel" title="删除"></i> <div class="toggle ishide" value="false"> <div>是</div> <div>否</div> <span></span> </div> <label class="fr">隐藏</label> </div> <div class="wrap"> <section> <div class="sec-input"> <label>上边距</label> <div class="short-style"> <input type="number" value="-5" class="offsetT"> </div> <label>下边距</label> <div class="short-style"> <input type="number" value="0" class="offsetB"> </div> </div> <div class="sec-input"> <label>左边距</label> <div class="short-style"> <input type="number" value="10" class="offsetL"> </div> <label>右边距</label> <div class="short-style"> <input type="number" value="10" class="offsetR"> </div> </div> </section> <section class="text title" type="title"> <div class="sec-input"> <label>标题文本</label> <i class="elemhide" title="收起"></i> <i class=" textdel" title="删除"></i> </div> <div> <div class="sec-input"> <label>输入内容</label> <div class="long-style"> <input type="text" value="" placeholder="标题" class="elemtext"> </div> </div> <button class="set-toggle">高级选项 <i></i></button> <div class="setting" style="display: none;"> <div class="sec-input"> <label>标题链接</label> <div class="long-style"> <input type="text" value="" placeholder="无需跳转就不需要填链接" class="elemlink"> </div> </div> <div class="sec-input"> <label>背景颜色</label> <div class="long-style"> <input type="text" value="" placeholder="不填写则使用默认样式" class="background"> </div> </div> <p class="reminder">输入颜色或图片地址</p> <div class="sec-input"> <label>内上边距</label> <div class="short-style"> <input type="number" value="0" class="offsetNT"> </div> <label>内下边距</label> <div class="short-style"> <input type="number" value="0" class="offsetNB"> </div> </div> <div class="sec-input"> <label>内左边距</label> <div class="short-style"> <input type="number" value="30" class="offsetNL"> </div> <label>内右边距</label> <div class="short-style"> <input type="number" value="0" class="offsetNR"> </div> </div> <div class="sec-input"> <label>行高</label> <div class="short-style"><input type="number" value="1.5" class="elemlineheight"></div> <label>字体大小</label> <div class="short-style"><input type="number" value="15" class="fontsize"></div> </div> <div class="sec-input"> <label>字体颜色</label> <div class="short-style"><input type="text" value="" placeholder="#145aab" class="fontcolor"></div> <label>对齐方式</label> <select class="textalign"> <option value="left" selected="">左</option> <option value="center">中</option> <option value="right">右</option> </select> </div> </div> </div> </section> </div> </fieldset>',
        paragraph: '<section class="text paragraph" type="paragraph"><div class="sec-input"><label>段落文本</label><i class="elemhide" title="收起"></i><i class="textdel" title="删除"></i></div><div><label>输入内容</label><div class="right"><textarea type="text" rows="3" class="elemtext">我是一个段落，我是一个段落，我是一个段落，我是一个段落，我是一个段落。</textarea></div><button class="set-toggle">高级选项 <i></i></button><div class="setting" style="display: none;"><div class="sec-input"><label>段落链接</label><div class="long-style"><input type="text" value="" placeholder="无需跳转就不需要填链接" class="elemlink"></div></div><div class="sec-input"><label>行高</label><div class="short-style"><input type="number" value="1.5" class="elemlineheight"></div><label>字体大小</label><div class="short-style"><input type="number" value="15" class="fontsize"></div></div><div class="sec-input"><label>字体颜色</label><div class="short-style"><input type="text" value="" placeholder="#000000" class="fontcolor"></div><label>对齐方式</label><select class="textalign"><option value="left" selected="">左</option><option value="center">中</option><option value="right">右</option></select></div></div></div></section>',
        title: '<section class="text title" type="title"><div class="sec-input"><label>标题文本</label><i class="elemhide" title="收起"></i><i class=" textdel" title="删除"></i></div></div><div class="sec-input"><label>输入内容</label><div class="long-style"><input type="text" value="" placeholder="标题" class="elemtext"></div></div><button class="set-toggle">高级选项 <i></i></button><div class="setting" style="display: none;"><div class="sec-input"><label>标题链接</label><div class="long-style"><input type="text" value="" placeholder="无需跳转就不需要填链接" class="elemlink"></div></div><div class="sec-input"><label>背景颜色</label><div class="long-style"><input type="text" value="" placeholder="不填写则使用默认样式" class="background"></div></div><p class="reminder">输入颜色（#ffddcc）或图片地址（http://……）</p><div class="sec-input"><label>内上边距</label><div class="short-style"><input type="number" value="0" class="offsetNT"></div><label>内下边距</label><div class="short-style"><input type="number" value="0" class="offsetNB"></div></div><div class="sec-input"><label>内左边距</label><div class="short-style"><input type="number" value="30" class="offsetNL"></div><label>内右边距</label><div class="short-style"><input type="number" value="0" class="offsetNR"></div></div><div class="sec-input"><label>行高</label><div class="short-style"><input type="number" value="1.5" class="elemlineheight"></div><label>字体大小</label><div class="short-style"><input type="number" value="15" class="fontsize"></div></div><div class="sec-input"><label>字体颜色</label><div class="short-style"><input type="text" value="" placeholder="#145aab" class="fontcolor"></div><label>对齐方式</label><select class="textalign"><option value="left" selected="">左</option><option value="center">中</option><option value="right">右</option></select></div></div></div></section>',
        videos_watchlive: '<section type="watchlive"><div class="sec-input"><label>看直播pid</label><div class="short-style"><input type="text" value="" placeholder="2000348835" class="elemid"></div><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="videodel" title="删除"></i><div class="open_trailer"><label class="ListLabel">开启预告</label><div class="watch_trailer active toggle" value="true"><div>是</div><div>否</div><span></span></div></div><div class="isListHide toggle" value="false"><div>是</div><div>否</div><span></span></div><label class="ListLabel">隐藏</label></div><div class="sec-input"><label>直播标题</label><div class="long-style"><input type="text" value="" placeholder="看直播标题" class="elemtitle" maxlength="20"></div></div><p class="reminder">不超过20字</p><div class="sec-input"><label>直播图片</label><button class="uploadpic" limitwidth="320" limitheight="180">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/227/14/2016/131094197.jpg" class="elemsrc"></div></div><p class="reminder">直播列表中展示图片，320x180px</p><div class="sec-input"><label>视频封面</label><button class="uploadpic" limitwidth="640" limitheight="360">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="视频播放器开始播放前展示图片，640x360px" class="videopicsrc"></div></div><div class="sec-input"><label>预告片id</label><div class="short-style"><input type="text" value="" placeholder="无预告片无需填写" class="watch_trailerid" style="width:160px;"></div></div><div class="albumshow"><div class="sec-input"><label>标签</label><div class="mid-style"><input type="text" class="elemtag" value="看直播" maxlength="4"></div></div><p class="reminder">横向列表中，右上角的标签，最多4字</p><div class="sec-input"><label>短标题</label><div class="mid-style"><input type="text" class="elemstitle" value="短标题" maxlength="10"></div></div><p class="reminder">横向列表中，展示图片上显示的标题，最多10字</p></div></section>',
        videos_live: '<section type="live"><div class="sec-input"><label>直播流id</label><div class="short-style"><input type="text" value="" placeholder="106107201" class="elemid"></div><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="videodel" title="删除"></i><div class="open_trailer"><label class="ListLabel">开启预告</label><div class="live_trailer active toggle" value="true"><div>是</div><div>否</div><span></span></div></div><div class="isListHide toggle" value="false"><div>是</div><div>否</div><span></span></div><label class="ListLabel">隐藏</label></div><div class="sec-input"><label>直播pid</label><div class="short-style"><input type="text" value="" placeholder="4113" class="elempid"></div></div><div class="sec-input"><label>直播标题</label><div class="long-style"><input type="text" value="" placeholder="直播标题" class="elemtitle" maxlength="20"></div></div><p class="reminder">不超过20字</p><div class="sec-input"><label>直播图片</label><button class="uploadpic" limitwidth="320" limitheight="180">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/227/14/2016/131094197.jpg" class="elemsrc"></div></div><p class="reminder">直播列表中展示图片，320x180px</p><div class="sec-input"><label>视频封面</label><button class="uploadpic" limitwidth="640" limitheight="360">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="视频播放器开始播放前展示图片，640x360px" class="videopicsrc"></div></div><div class="sec-input"><label>预告片id</label><div class="short-style"><input type="text" value="" placeholder="无预告片无需填写" class="live_trailerid" style="width:160px;"></div></div><div class="albumshow"><div class="sec-input"><label>标签</label><div class="mid-style"><input type="text" class="elemtag" value="直播" maxlength="4"></div></div><p class="reminder">横向列表中，右上角的标签，最多4字</p><div class="sec-input"><label>短标题</label><div class="mid-style"><input type="text" class="elemstitle" maxlength="10" value="短标题"></div></div><p class="reminder">横向列表中，展示图片上显示的标题，最多10字</p></div></section>',
        videos_vod: '<section type="vod"><div class="sec-input"><label>点播vid</label><div class="short-style"><input type="text" value="" placeholder="y0019sps4bs" class="elemid"></div><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="videodel" title="删除"></i><div class="isListHide toggle" value="false"><div>是</div><div>否</div><span></span></div><label class="ListLabel">隐藏</label></div><div class="sec-input"><label>点播标题</label><div class="long-style"><input type="text" value="" placeholder="点播标题" class="elemtitle" maxlength="20"></div></div><p class="reminder">不超过20字</p><div class="sec-input"><label>点播图片</label><button class="uploadpic" limitwidth="320" limitheight="180">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/227/14/2016/131094197.jpg" class="elemsrc"></div></div><p class="reminder">直播列表中展示图片，320x180px</p><div class="sec-input"><label>视频封面</label><button class="uploadpic" limitwidth="640" limitheight="360">上传图片</button><div class="long-style pic"><input type="text" placeholder="视频播放器开始播放前展示图片，640x360px" value="" class="videopicsrc"></div></div><div class="albumshow"><div class="sec-input"><label>标签</label><div class="mid-style"><input type="text" class="elemtag" value="精彩回放" maxlength="4"></div></div><p class="reminder">横向列表中，右上角的标签，最多4字</p><div class="sec-input"><label>短标题</label><div class="mid-style"><input type="text" class="elemstitle" maxlength="10" value="短标题"></div></div><p class="reminder">横向列表中，展示图片上显示的标题，最多10字</p></div></section>',
        videos: '<fieldset data-type="videos"><div class="field-title"><label>视频</label><button class="addwatchlive">增加看直播</button><button class="addlive">增加直播</button><button class="addvod">增加点播</button><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input"><label>列表模式</label><input class="mode" type="radio" checked="" name="mode" value="list" id="list"><span>默认列表</span><input class="mode" type="radio" name="mode" value="album" id="album"><span>横向专辑  <span class="warning">若启用横向专辑，新闻app发文需勾选“禁止左滑”</span></span></div><div class="sec-input"><label>列表分页卡</label><select name="tabset" class="tabset"><option value="default" selected="">主页</option><option value="tab0">页卡1</option><option value="tab1">页卡2</option><option value="tab2">页卡3</option></select></div><div class="albumsetting" style="display: none;"><div class="sec-input"><label>返回按钮</label><div class="mid-style"><input type="text" value="返回直播" class="retext"></div></div><p class="reminder">若不需要返回按钮，删除文字即可</p><div class="sec-input"><label>标题栏标题</label><div class="mid-style"><input type="text" value="视频专辑"  class="sectitle"></div></div><p class="reminder">若不需要标题栏，删除文字即可</p></div><div class="sec-input"><label>开启弹幕</label><div class="toggle danmu" value="false"><div>是</div><div>否</div><span></span></div><div class="danmu-setting" style="display: block;"><label>弹幕评论id</label><div class="short-style"><input type="text" class="danmu-id" value="1363064521"></div></div></div><div class="sec-input"><label>开启置顶</label><div class="zhiding" value="false"><div>是</div><div>否</div><span></span></div><span class="warning">仅当视频之前无其他组件时生效</span></div></section><h3 class="sec-title">视频列表</h3><div class="vWrap"></div></div></fieldset>',
        videoList_watchliveList: '<section type="watchliveList"><div class="sec-input"><label>看直播pid</label><div class="short-style"><input type="text" value="" placeholder="2000348835" class="elemid"></div><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="videodel" title="删除"></i><div class="isListHide toggle" value="false"><div>是</div><div>否</div><span></span></div><label class="ListLabel">隐藏</label></div><div class="sec-input"><label>直播标题</label><div class="long-style"><input type="text" value="" placeholder="看直播标题" class="elemtitle" maxlength="20"></div></div><p class="reminder">不超过20字</p><div class="sec-input"><label>直播图片</label><button class="uploadpic" limitwidth="320" limitheight="180">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/227/14/2016/131094197.jpg" class="elemsrc"></div></div><p class="reminder">直播列表中展示图片，320x180px</p><div class="sec-input"><label>视频封面</label><button class="uploadpic" limitwidth="640" limitheight="360">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="视频播放器开始播放前展示图片，640x360px" class="videopicsrc"></div></div><div class="albumshowlist"><div class="sec-input"><label>标签</label><div class="mid-style"><input type="text" class="elemtag" value="看直播" maxlength="4"></div></div><p class="reminder">右上角的标签，最多4字</p><div class="sec-input"><label>短标题</label><div class="mid-style"><input type="text" class="elemstitle" value="短标题" maxlength="10"></div></div><p class="reminder">展示图片上显示的标题，最多10字</p></div></section>',
        videoList_liveList: '<section type="liveList"><div class="sec-input"><label>直播流id</label><div class="short-style"><input type="text" value="" placeholder="106107201" class="elemid"></div><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="videodel" title="删除"></i><div class="isListHide toggle" value="false"><div>是</div><div>否</div><span></span></div><label class="ListLabel">隐藏</label></div><div class="sec-input"><label>直播标题</label><div class="long-style"><input type="text" value="" placeholder="直播标题" class="elemtitle" maxlength="20"></div></div><p class="reminder">不超过20字</p><div class="sec-input"><label>直播图片</label><button class="uploadpic" limitwidth="320" limitheight="180">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/227/14/2016/131094197.jpg" class="elemsrc"></div></div><p class="reminder">直播列表中展示图片，320x180px</p><div class="sec-input"><label>视频封面</label><button class="uploadpic" limitwidth="640" limitheight="360">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="视频播放器开始播放前展示图片，640x360px" class="videopicsrc"></div></div><div class="albumshowlist"><div class="sec-input"><label>标签</label><div class="mid-style"><input type="text" class="elemtag" value="直播" maxlength="4"></div></div><p class="reminder">右上角的标签，最多4字</p><div class="sec-input"><label>短标题</label><div class="mid-style"><input type="text" class="elemstitle" maxlength="10" value="短标题"></div></div><p class="reminder">展示图片上显示的标题，最多10字</p></div></section>',
        videoList_vodList: '<section type="vodList"><div class="sec-input"><label>点播vid</label><div class="short-style"><input type="text" value="" placeholder="y0019sps4bs" class="elemid"></div><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="videodel" title="删除"></i><div class="isListHide toggle" value="false"><div>是</div><div>否</div><span></span></div><label class="ListLabel">隐藏</label></div><div class="sec-input"><label>点播标题</label><div class="long-style"><input type="text" value="" placeholder="点播标题" class="elemtitle" maxlength="20"></div></div><p class="reminder">不超过20字</p><div class="sec-input"><label>点播图片</label><button class="uploadpic" limitwidth="320" limitheight="180">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/227/14/2016/131094197.jpg" class="elemsrc"></div></div><p class="reminder">直播列表中展示图片，320x180px</p><div class="sec-input"><label>视频封面</label><button class="uploadpic" limitwidth="640" limitheight="360">上传图片</button><div class="long-style pic"><input type="text" placeholder="视频播放器开始播放前展示图片，640x360px" value="" class="videopicsrc"></div></div><div class="albumshowlist"><div class="sec-input"><label>标签</label><div class="mid-style"><input type="text" class="elemtag" value="精彩回放" maxlength="4"></div></div><p class="reminder">右上角的标签，最多4字</p><div class="sec-input"><label>短标题</label><div class="mid-style"><input type="text" class="elemstitle" maxlength="10" value="短标题"></div></div><p class="reminder">展示图片上显示的标题，最多10字</p></div></section>',
        videoList:'<fieldset data-type="videoList"><div class="field-title"><label>视频列表</label><button class="watchliveList">增加看直播</button><button class="liveList">增加直播</button><button class="vodList">增加点播</button><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input mode_style"><label>列表模式</label><input class="modelist" type="radio" checked="" name="modelist" value="list"><span>默认列表</span><input class="modelist" type="radio" name="modelist" value="album"><span>横向专辑  <span class="warning">若启用横向专辑，新闻app发文需勾选“禁止左滑”</span></span></div><div class="sec-input"><label>列表分页卡</label><select name="tabset" class="tabset"><option value="default" selected="">主页</option><option value="tab0">页卡1</option><option value="tab1">页卡2</option><option value="tab2">页卡3</option></select></div><div class="albumsetting"><div class="sec-input"><label>标题栏标题</label><div class="mid-style"><input type="text" value="视频专辑"  class="sectitle"></div></div><p class="reminder">若不需要标题栏，删除文字即可</p></div></section><h3 class="sec-title">视频列表</h3><div class="vListWrap"></div></div></fieldset>',
        comment: '<fieldset data-type="comment"><div class="field-title"><label>评论</label><label>选择所处分页</label><select name="tabset" class="tabset"><option value="default" selected="">主页</option><option value="tab0">页卡1</option><option value="tab1">页卡2</option><option value="tab2">页卡3</option></select><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input"><label>评论标题</label><div class="mid-style"><input type="text" value="大家说" class="elemtitle"></div></div><p class="reminder">若不需要标题栏，删除文字即可</p><div class="sec-input"><label>评论id</label><div class="long-style"><input type="text" value="" placeholder="1363064521" class="elemid"></div></div><p class="reminder">与新闻客户端中评论保持一致</p><div class="sec-input"><label>初始评论数</label><div class="short-style"><input type="text" value="" placeholder="15" class="number"></div></div><div class="sec-input"><label class="auto">客户端显示</label><div class="toggle isNewsappShow active" value="true"><div>是</div><div>否</div><span></span></div></div><p class="reminder warning">若选择不显示，需在发稿时打开新闻客户端评论。若选择显示，建议关闭新闻客户端评论</p></section><button class="set-toggle">高级选项<i></i></button><div class="setting" style="display: none;"><section><div class="sec-input"><label>上边距</label><div class="short-style"><input type="number" value="10" class="offsetT"></div><label>下边距</label><div class="short-style"><input type="number" value="0" class="offsetB"></div></div><div class="sec-input"><label>左边距</label><div class="short-style"><input type="number" value="0" class="offsetL"></div><label>右边距</label><div class="short-style"><input type="number" value="0" class="offsetR"></div></div></section></div></div></fieldset>',
        textImgLive: '<fieldset data-type="textImgLive"><div class="field-title"><label>图文直播</label><label>选择所处分页</label><select name="tabset" class="tabset"><option value="default" selected="">主页</option><option value="tab0">页卡1</option><option value="tab1">页卡2</option><option value="tab2">页卡3</option></select><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input"><label>直播标题</label><div class="short-style"><input type="text" value="图文直播" class="elemtitle"></div><label>图文直播id</label><div class="short-style"><input type="text" value="" placeholder="10006450" class="elemid"></div></div></section><button class="set-toggle">高级选项<i></i></button><div class="setting" style="display: none;"><section><div class="sec-input"><label>上边距</label><div class="short-style"><input type="number" value="10" class="offsetT"></div><label>下边距</label><div class="short-style"><input type="number" value="0" class="offsetB"></div></div><div class="sec-input"><label>左边距</label><div class="short-style"><input type="number" value="0" class="offsetL"></div><label>右边距</label><div class="short-style"><input type="number" value="0" class="offsetR"></div></div><div class="sec-input"><label>更新时间</label><div class="short-style"><input type="number" value="60" class="elemdur"></div><label>显示个数</label><div class="short-style"><input type="number" value="20" class="number"></div></div></section></div></div></fieldset>',
        sharebtn: '<fieldset data-type="sharebtn"><div class="field-title"><label>分享按钮</label><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input"><label>按钮图片</label><button class="uploadpic" limitwidth="no" limitheight="no">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/19/68/2060/133968859.png" class="elemsrc"></div></div><div class="sec-input"><label>按钮宽度</label><div class="short-style"><input type="text" value="" placeholder="75%" class="elemWidth"></div></div></section><button class="set-toggle">高级选项<i></i></button><div class="setting" style="display: none;"><section><div class="sec-input"><label>上边距</label><div class="short-style"><input type="number" value="25" class="offsetT"></div><label>下边距</label><div class="short-style"><input type="number" value="25" class="offsetB"></div></div><div class="sec-input"><label>左边距</label><div class="short-style"><input type="number" value="0" class="offsetL"></div><label>右边距</label><div class="short-style"><input type="number" value="0" class="offsetR"></div></div></section></div></div></fieldset>',
        map: '<fieldset data-type="map"><div class="field-title"><label>位置地图</label><label>选择所处分页</label><select name="tabset" class="tabset"><option value="default" selected="">主页</option><option value="tab0">页卡1</option><option value="tab1">页卡2</option><option value="tab2">页卡3</option></select><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><div class="wrapper"><div id="container"></div></div><section class="mt"><div class="sec-input"><label>位置搜索</label><div class="long-style"><input type="text" value="北京天安门" class="center" placeholder="请输入位置的名称(北京)或坐标(39.908823,116.397496)"></div></div><p class="reminder">推荐输入示例的详细地址，搜索更精准。也可以输入位置坐标。</p><div class="sec-input"><label>显示地名</label><div class="long-style"><input type="text" value="北京天安门" class="namecenter" placeholder="请输入要显示的地名"></div></div><p class="reminder">用户界面展示的地名</p></section><button class="set-toggle">高级选项<i></i></button><div class="setting" style="display: none;"><section><div class="sec-input"><label class="auto">显示距离按钮</label><div class="toggle active" id="distance" value="true"><div>是</div><div>否</div><span></span></div><label class="auto">点击地图查看详情</label><div class="toggle active" id="maplink" value="true"><div>是</div><div>否</div><span></span></div></div><div class="sec-input"><label>地图宽度</label><div class="short-style"><input type="text" value="640" class="width" placeholder="图片宽度"></div><label>地图高度</label><div class="short-style"><input type="text" value="180" class="height" placeholder="图片高度"></div></div><div class="sec-input"><label>坐标图片</label><div class="long-style"><input type="text" value="http://mat1.gtimg.com/news/zhangmengceshi/marker-icon_03.png" class="markers" placeholder="请输入图标url"></div></div><div class="sec-input"><label>自定义图片</label><button class="uploadpic" limitwidth="no" limitheight="no">上传图片</button><div class="long-style pic"><input type="text" placeholder="若需自定义地图则填写地图图片链接" class="map-img-input"></div></div><p class="reminder warning">输入自定义地图图片地址，若同时开启距离计算或查看详情，请在位置搜索输入位置坐标</p></section></div></div></fieldset>',
        downLoadNewsapp: '<fieldset data-type="downLoadNewsapp"><div class="field-title"><label style="width: auto">下载/打开客户端</label><i class="move" title="移动"></i><i class="elemhide" title="收起"></i><i class="elemcopy" title="复制"></i><i class="elemdel" title="删除"></i><div class="toggle ishide" value="false"><div>是</div><div>否</div><span></span></div><label class="fr">隐藏</label></div><div class="wrap"><section><div class="sec-input"><label>下载按钮图</label><button class="uploadpic" limitwidth="no" limitheight="no">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/21/68/2060/133968861.png" class="elemdownsrc"></div></div><div class="sec-input"><label>打开按钮图</label><button class="uploadpic" limitwidth="no" limitheight="no">上传图片</button><div class="long-style pic"><input type="text" value="" placeholder="http://img1.gtimg.com/news/pics/hv1/22/68/2060/133968862.png" class="elemopensrc"></div></div><div class="sec-input"><label>按钮宽度</label><div class="short-style"><input type="text" value="" placeholder="75%" class="elemWidth"></div></div></section><button class="set-toggle">高级选项<i></i></button><div class="setting" style="display: none;"><section><div class="sec-input"><label>上边距</label><div class="short-style"><input type="number" value="25" class="offsetT"></div><label>下边距</label><div class="short-style"><input type="number" value="25" class="offsetB"></div></div><div class="sec-input"><label>左边距</label><div class="short-style"><input type="number" value="0" class="offsetL"></div><label>右边距</label><div class="short-style"><input type="number" value="0" class="offsetR"></div></div></section></div></div></fieldset>',
        iframe: '<fieldset data-type="iframe"><legend>添加iframe</legend><button class="elemdel">删除</button><button class="move">拖住调整顺序</button>选择所处分页：<select name="tabset" class="tabset"><option value="default" selected>主页</option><option value="tab0">页卡1</option><option value="tab1">页卡2</option><option value="tab2">页卡3</option></select><button class="toggle" value="false">点击展开/收起</button><div><p>iframe地址：<input type="text" value="https://www.google.com.hk/" class="iframesrc"></p><button class="set-toggle">展开/收起高级选项</button><section class="setting"><h2>边距：(单位px)</h2><p>上边距：<input type="number"value="10"class="offsetT">下边距：<input type="number"value="0"class="offsetB"></p><p>左边距：<input type="number"value="0"class="offsetL">右边距：<input type="number"value="0"class="offsetR"></p><p>高度：<input type="text"value="100%"class="elemHeight"></p></section></div></fieldset>',
        render: {
            line: '<div class="mod_bar"><div class="onlineWrap"><div class="online h2"><span id="online"></span></div></div><span class="js-share share_s"></span></div></div>',
            comment: '<div class="commentWrap"><h3><span class="reminder"></span></h3><div id="" class="comments_list_wrap mod_chatroom"></div><div class="mod_add_comment"><div class="add_comment" id="addComment"><input style="visibility: visible;" type="text" placeholder="点击评论回复TA" class="inp_text" data-nick="" data-pid=""></div><span class="btn_submit">发送</span></div></div></div>',
            textImgLive: '<div class="pic" id="textImgLive"><h3 class="title"><span class="reminder"></span></h3><div class="btn"><a class="update_message" href="javascript:viod(0);">有最新消息，请点击查看</a></div><div id="zb_tishi_title" class="zh_tishi"></div><div id="zb_content" class="zb_zhibo1" ><ul class="live_list" id="zb_table0"></ul><div class="btn"><a clas' +
            's="more_message">点击查看更多</a></div></div></div>'
        }
    }
    return html
})
;
/*
 * @Author: v_mmmzzhang
 * @Date:   2016-07-14 12:12:47
 * @Last Modified by:   v_mmmzzhang
 * @Last Modified time: 2016-07-14 16:01:01
 */

define('views/util',[], function() {
  'use strict'

  /**
   * 获取ua
   */
  var UA = function() {
    var userAgent = navigator.userAgent.toLowerCase()
    return {
      ipad: /ipad/.test(userAgent),
      iphone: /iphone/.test(userAgent),
      android: /android/.test(userAgent),
      qqnews: /qqnews/.test(userAgent),
      weixin: /micromessenger/.test(userAgent),
      qqnews_version: userAgent.match(/qqnews/i) == "qqnews" ? userAgent.split('qqnews/')[1] : ''
    }
  }
  var ua = UA()

  /**
   * 去除首尾空格
   * @param  {string} str 所需处理的字符串
   * @return {string}     返回的处理后的字符串
   */
  var itrim = function(str) {
    if (str) {
      return str.replace(/(^\s+)|(\s+$)/g, "");
    } else {
      return "";
    }
  }

  /**
   * 统一返回设置内容
   * @param  {obj} data 原始设置
   * @return {obj}      所有的设置内容
   */
  var setting = function(data) {
    var margin, padding, fontsize, width, src, link, title, pos, content, voteid, mode, danmaku, id, height, downsrc, opensrc,vote_eleid,isshow,zhiding;
    var tabPos = 'set' + (data.tab || "default")

    if (data.offset) {
      margin = data.offset[0] + 'px ' + data.offset[1] + 'px ' + data.offset[2] + 'px ' + data.offset[3] + 'px'
    }
    if (data.offsetN) {
      padding = data.offsetN[0] + 'px ' + data.offsetN[1] + 'px ' + data.offsetN[2] + 'px ' + data.offsetN[3] + 'px'
    }
    if (data.fontsize) {
      fontsize = data.fontsize / 10 + "rem"
    }
    return {
      margin: margin,
      padding: padding,
      fontsize: fontsize,
      width: data.width,
      src: data.src,
      link: itrim(data.link),
      title: data.title,
      pos: data.pos,
      content: data.content,
      voteid: data.voteid,
      mode: data.mode,
      danmaku: data.danmaku,
      id: data.id,
      height: data.height,
      retext: data.retext,
      downsrc: data.downsrc,
      opensrc: data.opensrc,
      tabPos: tabPos,
	  vote_eleid:data.vote_eleid,
      ishide:data.ishide,
    }
  }
  return {
    ua: ua,
    itrim: itrim,
    getOpt: setting
  }
})
;
/*
 * @Author: v_mmmzzhang
 * @Date:   2016-07-14 12:17:26
 * @Last Modified by:   v_mmmzzhang
 * @Last Modified time: 2016-07-18 10:30:33
 */

define('view/image',[
  'views/util'
], function(util) {
  'use strict';

  /**
   * 视图生成函数
   * @param  {object} data 传入的设置参数
   * @param  {jq obj} wrap 所需添加到的位置
   */
  var init = function(data,wrap) {
    var h,opt = util.getOpt(data);
    var ishide = opt.ishide == "true" ? " hide" : "",
    h = '<div class="imgWrap ' + ishide + '" style="margin:' + opt.margin + '">'
    if (opt.link != "" && opt.link != "#") {
      h += '<a target="_blank" href="' + opt.link + '"><img style="width:' + opt.width + ';" src="' + opt.src + '"></a>'
    } else {
      h += '<img style="width:' + opt.width + ';" src="' + opt.src + '">'
    }
    h += '</div>'
    wrap.append(h)

    // 设置分页卡
    $('.imgWrap').last().removeClass('settab0 settab1 settab2 setdefault').addClass(opt.tabPos)
  }

  return init
})
;
/*
 * @Author: v_mmmzzhang
 * @Date:   2016-07-14 12:48:28
 * @Last Modified by:   v_mmmzzhang
 * @Last Modified time: 2016-07-18 10:30:18
 */

define('view/tabbar',[
    'views/util'
], function (util) {
    'use strict';

    /**
     * 视图生成函数
     * @param  {object} data 传入的设置参数
     * @param  {jq obj} wrap 所需添加到的位置
     */
    var init = function (data, wrap) {
        var h, opt = util.getOpt(data);
        var ishide = opt.ishide == "true" ? " hide" : "",
            h = '<div class="tab-bar clearfix' + ishide + '" style="margin:' + opt.margin + '">';
        var pos = opt.pos;
        var tabTitle = opt.title.map(function (elem) {
            if (elem !== '') return '<div><span>' + elem + '</span></div>';
            else return ''
        });
        h += tabTitle.join('') + '</div>'

        if (pos == 'true' && $('#album-list').length) {
            $('#album-list').before(h);
            wrap.append('<div></div>')
        } else if (pos == 'true' && $('.videolist').length) {
            $('.videolist').before(h);
            wrap.append('<div></div>')
        } else {
            wrap.append(h)
        }

        $('.autoinner .tab-bar span').eq(0).addClass('on')
        var num = $('.autoinner .tab-bar>div').length;
        if (num === 3) {
            $('.autoinner .tab-bar>div').addClass('colum-4');
        } else if (num === 2) {
            $('.autoinner .tab-bar>div').addClass('colum-6');
        }
        $('.autoinner').addClass('tab0 tabon');


        // 事件绑定
        $('.autoinner .tab-bar span').on('click', function (event) {
            event.preventDefault()
            var index = $(this).parent('div').index()
            $('.autoinner .tab-bar span').removeClass('on')
            $('.autoinner .tab-bar div').eq(index).find('span').addClass('on')
            $('.autoinner').removeClass('tab0 tab1 tab2').addClass('tab' + index)
        })

    }

    return init
})
;
define('view/text',[
  'views/util'
], function(util) {
  'use strict';

  /**
   * 视图生成函数
   * @param  {object} data 传入的设置参数
   * @param  {jq obj} wrap 所需添加到的位置
   */
  var init = function(data,wrap) {
    var h,opt = util.getOpt(data)

    var list = opt.content;
    var hasHead = 0;
    var ishide = opt.ishide == "true" ? " hide" : "",
    h = '<div class="text-wrap' + ishide + '" style="margin:' + (/undefined/g.test(opt.margin) ? '10px 10px 0' : opt.margin) + ';">';
    $.each(list, function(index, val) {
      if (val.type == 'title') {
        var link = val.link,
          fontsize = val.fontsize / 10 + 'rem',
          bg = '',
          padding = val.offsetN[0] + 'px ' + val.offsetN[1] + 'px ' + val.offsetN[2] + 'px ' + val.offsetN[3] + 'px',
          height = val.text ? '' : ';height:13px';
        if (!val.background) {
          bg = '';
        } else if (val.background.indexOf("http://") >= 0) {
          bg = 'background-color:"none";background:url(' + val.background + ') no-repeat center center; background-size:100% 100%;';
        } else {
          bg = 'background-color:' + val.background + ';background-image:none;';
        };
        h += '<h2 style="padding:' + padding + '; line-height:' + val.lineheight + height + '; font-size:' + fontsize + '; color:' + val.color + '; text-align:' + val.textalign + '; ' + bg + '";>';
        if (link != "" && link != "#") {
          h += '<a target="_blank" href="' + link + '">' + (val.text ? val.text : '') + '</a></h2>';
        } else {
          h += (val.text ? val.text : '') + '</h2>';
        };
        hasHead = 1;
      } else if (val.type == 'paragraph') {
        var link = val.link,
          fontsize = val.fontsize / 10 + 'rem';
        if (hasHead == 0) {
          h += '<h2 style="padding-left:30px;height:13px;"></h2><p style="line-height:' + val.lineheight + '; font-size:' + fontsize + '; color:' + val.color + '; text-align:' + val.textalign + ';";>';
        } else {
          h += '<p style="line-height:' + val.lineheight + '; font-size:' + fontsize + '; color:' + val.color + '; text-align:' + val.textalign + ';";>';
        }
        if (link != "" && link != "#") {
          h += '<a target="_blank" href="' + link + '">' + (val.text ? val.text : '') + '</a></p>';
        } else {
          h += (val.text ? val.text : '') + '</p>';
        }
        hasHead = 1;
      }
    });
    h += '</div>';
    wrap.append(h);
    $('.text-wrap').last().removeClass('settab0 settab1 settab2 setdefault').addClass(opt.tabPos);
  }

  return init
})
;
define('view/textDemo',[
  'views/util'
], function(util) {
  'use strict';

  /**
   * 视图生成函数
   * @param  {object} data 传入的设置参数
   * @param  {jq obj} wrap 所需添加到的位置
   */
  var init = function(data,wrap) {
    var h,opt = util.getOpt(data)

    var list = opt.content;
    var hasHead = 0;
    var ishide = opt.ishide == "true" ? " hide" : "",
    h = '<div class="text-wrap' + ishide + '" style="margin:' + (/undefined/g.test(opt.margin) ? '10px 10px 0' : opt.margin) + ';">';
    $.each(list, function(index, val) {
      if (val.type == 'title') {
        var link = val.link,
          fontsize = val.fontsize / 10 + 'rem',
          bg = '',
          padding = val.offsetN[0] + 'px ' + val.offsetN[1] + 'px ' + val.offsetN[2] + 'px ' + val.offsetN[3] + 'px',
          height = val.text ? '' : ';height:13px';
        if (!val.background) {
          bg = '';
        } else if (val.background.indexOf("http://") >= 0) {
          bg = 'background-color:"none";background:url(' + val.background + ') no-repeat center center; background-size:100% 100%;';
        } else {
          bg = 'background-color:' + val.background + ';background-image:none;';
        };
        h += '<h2 style="font-weight:bold; padding:' + padding + '; line-height:' + val.lineheight + height + '; font-size:' + fontsize + '; color:' + val.color + '; text-align:' + val.textalign + '; ' + bg + '";>';
        if (link != "" && link != "#") {
          h += '<a target="_blank" href="' + link + '">' + (val.text ? val.text : '') + '</a></h2>';
        } else {
          h += (val.text ? val.text : '') + '</h2>';
        };
        hasHead = 1;
      }
    });
    h += '</div>';
    wrap.append(h);
    $('.text-wrap').last().removeClass('settab0 settab1 settab2 setdefault').addClass(opt.tabPos);
  }

  return init
})
;
/*
* @Author: v_mmmzzhang
* @Date:   2016-07-14 15:47:13
* @Last Modified by:   v_mmmzzhang
* @Last Modified time: 2016-07-18 10:30:22
*/

define('view/sharebtn',[
  'views/util'
], function(util) {
  'use strict';

  /**
   * 视图生成函数
   * @param  {object} data 传入的设置参数
   * @param  {jq obj} wrap 所需添加到的位置
   */
  var init = function(data,wrap) {
    var h,opt = util.getOpt(data);
    var ishide = opt.ishide == "true" ? " hide" : "",
    h = '<div class="btnWrap' + ishide + '" style="margin:' + opt.margin + ';"><img style="width:' + opt.width + ";" + '" src="' + opt.src + '" class="js-share"></div>';
    wrap.append(h);
  }

  return init
})
;
/*
* @Author: v_mmmzzhang
* @Date:   2016-07-14 15:48:35
* @Last Modified by:   v_mmmzzhang
* @Last Modified time: 2016-07-18 10:30:37
*/

define('view/download',[
  'views/util'
], function(util) {
  'use strict';
  /**
   * 视图生成函数
   * @param  {object} data 传入的设置参数
   * @param  {jq obj} wrap 所需添加到的位置
   */
  var init = function(data,wrap) {
    var h,opt = util.getOpt(data);
    var ishide = opt.ishide == "true" ? " hide" : "",
    h = '<div class="btnWrap' + ishide + '" id="download_qqnews" style="margin:' + opt.margin + ';";><img style="width:' + opt.width + ";" + '" class="down" src="' + opt.downsrc + '"><img style="width:' + opt.width + ";" + '" class="open" src="' + opt.opensrc + '"></div>';
    wrap.append(h);
  }

  return init
})
;
// console.debug('debug android - 1.0.1');
var querySelector = !document.querySelector || !document.querySelectorAll;
var kTime, lTime, vTime;

//* 直播在线人数
var line = {
    getUrl: "//union.video.qq.com/fcgi-bin/data",
    timeout: 1000,
    animation: "count",
    theme: "default",
    format: "(ddd)",
    odometerDur: 2000,
    isStart: false,
    init: function (data) {
        var _this = this;
        _this.pid = data.pid;
        _this.duration = data.duration || 60000;
        _this.o = document.getElementById("online");
        line.getline();
        lTime = setInterval(line.getline, line.duration);
    },
    start: function () {
        var _this = this;
        if (!querySelector) {
            line.od = new Odometer({
                el: line.o,
                value: line.startNum,
                duration: line.duration,
                format: line.format,
                theme: line.theme,
                animation: line.animation
            });
            line.od.render();
        } else {
            line.o.innerHTML = line.startNum;
        }
    },
    upLine: function (num) {
        var _this = this;
        clearInterval(kTime);
        if (num > line.endNum) {
            var time = line.duration / line.odometerDur;
            var oneNum = parseInt((num - line.endNum) / time);
            line.endNum += oneNum;
            line.od.update(line.endNum);
            var d = new Date();
            kTime = setInterval(function () {
                line.endNum += oneNum;
                line.od.update(line.endNum);
                var d = new Date();
            }, line.odometerDur);
        }
    },
    upLineCount: function (num) {
        if (num > line.endNum) {
            line.endNum = num;
            if (!querySelector) {
                line.od.update(line.endNum);
            } else {
                line.o.innerHTML = line.endNum;
            }
        }
    },
    getline: function () {
        var _this = this;
        $.ajax({
            url: line.getUrl,
            data: {
                tid: 918,
                appid: 20001395,
                appkey: "8b8b27900a212c20",
                otype: "json",
                idlist: line.pid
            },
            timeout: line.timeout,
            dataType: "jsonp",
            success: function (c) {
                if (!c.results[0].fields) { return }
                c.lnum = c.results[0].fields.play_cnt;
                c.num = c.results[0].fields.play_cnt;
                if (!line.isStart) {
                    line.startNum = line.endNum = c.lnum || 0;
                    line.start();
                    line.isStart = true;
                }
                if (c.errorno == 0) {
                    c.num = c.num;
                    if (line.animation == "count") {
                        line.upLineCount(c.num);
                    } else {
                        line.upLine(c.num);
                    }
                } else {
                    clearInterval(lTime);
                }
            }
        });
    }
};
//* 看直播在线人数
var watchline = {
    timeout: 2000,
    liveStatus: true,
    init: function (data) {
        // console.debug('version:1.0.0.7');
        var _this = this;
        _this.pid = data.pid;
        _this.duration = data.duration || 30000;
        _this.getline();
        $.ajax({
            url: 'http://like.video.qq.com/fcgi-bin/live_count?cmd=5&pid=' + _this.pid + '&otype=json',
            dataType: 'jsonp',
        });
    },
    getline: function () {
        var isTestMode = testcaseObj.isMatchTestUrl()
        var _this = this;
        if (isTestMode) {
            alert('liveVideo.js :: getline')
            console.debug(window.location.protocol)
        }
        var livePollUrl = 'http://live.mobile.video.qq.com/fcgi-bin/live_poll';
        if (window.location.protocol == 'https:') {
            livePollUrl = 'https://livemobile.video.qq.com/fcgi-bin/live_poll'
        }
        console.debug('livePollUrl:' + livePollUrl)
        //http://live.mobile.video.qq.com/fcgi-bin/live_poll?otype=json&guid=asdfadfas232123432&pollDataKey=pid%3D69850%26type=fans&_=1561607137473&callback=jsonp1
        //https://live.mobile.video.qq.com/fcgi-bin/live_poll?otype=json&guid=asdfadfas232123432&pollDataKey=pid%3D69850%26type=fans&_=1561607353197&callback=jsonp1
        //必须为 http ，https 为无效链接
        $.ajax({
            url: livePollUrl + '?otype=json&guid=asdfadfas232123432&pollDataKey=pid' + encodeURIComponent('=' + _this.pid + '&') + 'type=fans',
            timeout: _this.timeout,
            dataType: "jsonp",
            // jsonp:"callback",
            // jsonpCallback:"getline.jsonpCallback",
            success: function (d) {
                if (d.liveStatus == 1 || d.liveStatus == 2) {
                    _this.liveStatus = true;
                } else {
                    _this.liveStatus = false;
                }
                if (isTestMode) {
                    alert('d.playCount:', d.playCount)
                }
                $("#online").html(d.playCount);
            },
            error: function (err, text, sss) {
                if (isTestMode) {
                    alert('err:' + err, text)
                    console.debug('err:', err, text)
                }
            }
        });
        _this.liveStatus && setTimeout(function () {
            _this.getline();
        }, _this.duration);
    },

    jsonpCallback: function (data) {
        alert(data)
    }
}

var testcaseObj = {
    isMatchTestUrl: function () {
        var isMatch = false
        var url_string = window.location.href
        var url = new URL(url_string)
        var c = url.searchParams.get("testmode")
        if (c == 'true') { isMatch = true }
        //
        return isMatch
    }
}

//* 视频播放相关功能
var video = new tvp.VideoInfo();
var myplayer = new tvp.Player();
var live = {
    traTimer: null,
    init: function () {
        var _this = this;
        _this.resetWatch();

        _this.resize();
        _this.active();
    },
    /** resetWatch() - 初始化：
     * 1.区分 “看直播” 与 “直播或点播” 
     * 2.“看直播” 处理：根据 playing_status 分成三类
     *  - 正在 playing , set li (addClass(live) vid)
     *  - 未开始倒计时状态, set li (addClass(live) vid starttime) 
     *  - 已经结束, set li(addClass(vod) vid)
     **/
    resetWatch: function () {
        var _this = this;
        var pids = [];
        $(".watchlive").each(function () {
            console.debug('resetWatch', $(this).attr("vid"))
            pids.push($(this).attr("vid"));
        });

        //case : “看直播”
        if (pids.length > 0) {
            $.ajax({
                url: "//data.video.qq.com/fcgi-bin/data?tid=506&appid=10001009&otype=json&appkey=c5a3e1529a7ba805&idlist=" + pids.join(","),
                timeout: 1000,
                dataType: "jsonp",
                success: function (d) {
                    console.debug('看直播 resetWatch:', d.results)
                    if (d.results && d.results.length > 0) {
                        for (var i = 0; i < d.results.length; i++) {
                            var fields = d.results[i].fields;
                            if (fields.playing_status == "1") {  //* case : 正在 playing
                                $(".videolist .watchlive[vid='" + fields.pid + "']").addClass('live').attr("vid", fields.stream_id.toString());
                            } else if (fields.playing_status == "3") { //* case : 未开始倒计时状态
                                $(".videolist .watchlive[vid='" + fields.pid + "']").addClass('live').attr("vid", fields.stream_id.toString()).attr('start_time', fields.start_time).attr('title', fields.title);
                            } else { //* case : 已经结束
                                $(".videolist .watchlive[vid='" + fields.pid + "']").addClass('vod').attr("vid", fields.live_vid);
                            }
                        }
                        _this.setAllVideos(0);
                    }
                }
            });
        } else { //case : “直播” or “点播”
            console.debug('none of 看直播')
            _this.setAllVideos(0);
        }
    },

    /**
     * setAllVideos(li-index) - 根据 li 属性执行对应操作：
     *  - “看直播类型，status 为正在直播Playing” or “直播类型-All Status”
     *  - “看直播类型，status 为未开始倒计时”   
     *  - “看直播类型，status 为直播已经下架” or “点播类型-All Status”  
     */
    setAllVideos: function (idx) {
        var _this = this;
        var start_time, end_time, playing_status;
        var li = $(".videolist li").eq(idx);
        $(".videolist li").removeClass("on").eq(idx).addClass("on");
        $(".videolist li b").html("");
        li.find("b").html("当前播放");

        var id = li.attr("vid"); // 直播流ID 或者 点播VID , 用于 txplayer 进行直播或点播
        var pic = li.attr("pic");
        var live_pid = li.attr("live_pid");
        var live_trailerid = li.attr("live_trailerid");

        var watch_start_time = li.attr("start_time");
        var watch_trailerid = li.attr("watch_trailerid");
        var watch_title = li.attr("title");

        if (live_pid != '' && live_pid != undefined && live_pid != 'false') {
            console.debug('Case : “直播 - all status” 直接使用直播播放器')
            $.ajax({
                type: 'GET',
                url: '//data.v.qq.com/live/v2/api/live/info',
                data: {
                    pid: live_pid,
                    reqsrc: 'news_h5',
                    scope: 'core'
                },
                dataType: 'jsonp',
                success: function (data) {
                    var data = data.data.live;
                    start_time = data.start_time;
                    var time = new Date(start_time.replace(/-/g, '/')).getTime();
                    //
                    if (live_trailerid == '') {//没有预告片
                        if (new Date().getTime() >= time) {
                            console.debug('视频播放器使用直播 playing')
                            nowTimeBig();
                        } else {
                            $("#trailer_wrap").show();
                            $("#trailer_wrap h2").html(data.title);
                            $("#trailer_wrap p").html('<span>' + start_time + '</span>');
                            $("#trailer_wrap h3").html("暂无预告片");
                            if (pic != '') {
                                $("#trailer_wrap").css({ 'background-image': 'url(' + pic + ')' });
                            }
                            startTimeBig(time, id, pic);
                            if (myplayer.pause) {
                                myplayer.pause();
                            }
                            myplayer.create({
                                autoplay: false
                            });
                        }
                    } else {//有预告片
                        if (new Date().getTime() >= time) {
                            nowTimeBig();
                        } else {
                            $("#trailer_wrap").hide();
                            _this.nolive(live_trailerid, pic);
                            startTimeBig(time, id, pic);
                        }
                    }
                }
            });
        } else if (live_pid == 'false' && watch_start_time != '' && watch_start_time != undefined) {
            console.debug('Case :“看直播” 当前为直播倒计时状态，生成直播倒计时')
            var watch_time = new Date(watch_start_time.replace(/-/g, '/')).getTime();
            if (watch_trailerid != '' && watch_trailerid != undefined) {//看直播有预告
                if (new Date().getTime() >= watch_time) {
                    nowTimeBig();
                } else {
                    $("#trailer_wrap").hide();
                    _this.nolive(watch_trailerid, pic);
                    startTimeBig(watch_time, id, pic);
                }
            } else {//看直播没有预告
                if (new Date().getTime() >= watch_time) {
                    nowTimeBig();
                } else {
                    $("#trailer_wrap").show();
                    $("#trailer_wrap h2").html(watch_title);
                    $("#trailer_wrap p").html('<span>' + watch_start_time + '</span>');
                    $("#trailer_wrap h3").html("暂无预告片");
                    if (pic != '') {
                        $("#trailer_wrap").css({ 'background-image': 'url(' + pic + ')' });
                    }
                    startTimeBig(watch_time, id, pic);
                    if (myplayer.pause) {
                        myplayer.pause();
                    }
                    myplayer.create({
                        autoplay: false
                    });
                }
            }
        } else {
            console.debug('Case : “看直播 - status of playing” or  “看直播 - status of ended” or “点播” 直接使用点播播放器')
            clearInterval(_this.traTimer);
            $("#trailer_wrap").hide();
            if (li.hasClass("live")) { //case: “看直播 - status of playing”
                console.debug('Case : “看直播 - status of playing”')
                _this.live(id, pic);
            } else {                   //case: “点播” 
                console.debug('Case : “点播”')
                _this.nolive(id, pic);
            }
        }

        //* 视频播放器使用直播
        function nowTimeBig () {
            $("#trailer_wrap").hide();
            _this.live(id, pic);
            clearInterval(_this.traTimer);
        }

        //* 倒计时动画
        function startTimeBig (time, id, pic) {
            _this.getLiveTime(time, id, pic);
            clearInterval(_this.traTimer);
            _this.traTimer = setInterval(function () {
                _this.getLiveTime(time, id, pic);
            }, 1000);
        }

    },

    getLiveTime: function (time, id, pic) {
        var _this = this;
        var disTime = new Date(time - new Date().getTime());
        var day = Math.floor(disTime / (1000 * 60 * 60 * 24));
        var hour = Math.floor(disTime / (1000 * 60 * 60) % 24);
        var min = Math.floor(disTime / (1000 * 60) % 60);
        var sen = Math.floor(disTime / 1000 % 60);
        if (new Date().getTime() >= time) {
            _this.live(id, pic);
            $("#trailer_wrap").hide();
            clearInterval(_this.traTimer);
        } else {
            $("#trailer_wrap h4").html("距直播开始还有<h5><span><strong>" + _this.addZero(day) + "</strong>天</span><span><strong>" + _this.addZero(hour) + "</strong>时</span><span><strong>" + _this.addZero(min) + "</strong>分</span><span><strong>" + _this.addZero(sen) + "</strong>秒</span></h5>");
        }
    },

    addZero: function (num) {
        var result;
        if (num < 10) {
            result = "0" + num;
        } else {
            result = num;
        }
        return result;
    },
    resize: function () { //自适应屏幕
        var _this = this;
        _this._w = $(".layout").width();
        _this._h = $(window).height();
        _this.videoW = _this._w;
        _this.videoH = parseInt(_this._w * 9 / 16); //此处修改直播比例，默认16：9
        $("#trailer_wrap,#mod_player").width(_this._w).height(_this.videoH);
    },

    /** 视频播放器-直播 */
    live: function (id, pic) { //直播代码
        console.debug('use live - 流 id:', id)
        var _this = this;
        video = new tvp.VideoInfo();
        myplayer = new tvp.Player();
        video.setChannelId(id);
        video.setH5BulletId(1472);
        myplayer.create({
            width: _this.videoW,
            height: _this.videoH,
            type: 1,
            video: video,
            modId: "mod_player",
            pic: pic,
            autoplay: false
        });
    },
    /** 视频播放器-点播 */
    nolive: function (id, pic) {
        console.debug('nolive:', id)
        var _this = this;
        var useHtml5 = false;
        video = new tvp.VideoInfo();
        myplayer = new tvp.Player();
        video.setVid(id);

        var video_playType = "auto";
        var ua = navigator.userAgent.toLowerCase();
        /* if (ua.indexOf("android") >= 0) {
            var a = parseFloat(ua.slice(ua.indexOf("android") + 8));
            if (a > 3) {
                video_playType = "html5";
            }
            useHtml5 = true;
        } */
        myplayer.create({
            width: _this.videoW,
            height: _this.videoH,
            isHtml5UseUI: useHtml5,
            video: video,
            modId: "mod_player",
            pic: pic,
            playerType: video_playType,
            autoplay: false,
            isiPhoneShowPlaysinline: true,
            html5ForbiddenUIFeature: (tvp.$.os.iphone && !tvp.$.browser.WeChat) ? ["controlbar", "title", "definition"] : ["title", "definition"],
            isHtml5UseFakeFullScreen: true,
            appid: 10001
        });
    },

    /** 点击列表按钮，切换视频 */
    active: function () {
        var _this = this;
        $(".videolist li").each(function (idx) {
            $(this).off().on("click", function () {
                console.debug('CLICK:', idx)
                _this.setAllVideos(idx);
                if (myplayer.play) {
                    myplayer.play();
                } else {
                    console.debug('none of myplayer')
                }
            });
        });
    }
};

//
var bundle = {
    live: live,
    watchline: watchline,
    line: line
};
//
(function () {
    var _getScript = function (url, callback) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', url);
        head.appendChild(js);
        var callbackFn = function () {
            if (typeof callback === 'function') {
                callback()
            }
        };
        if (document.all) {
            js.onreadystatechange = function () {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn()
                }
            }
        } else {
            js.onload = function () {
                callbackFn()
            }
        }
    };
    if (Zepto) {
        $.getScript = _getScript
    }
})();

define("view/_video/liveVideo", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.bundle;
    };
}(this)));

/*
 * @Author: v_mmmzzhang
 * @Date:   2016-06-17 11:40:07
 * @description: QQnews comments based danmaku component
 * @Last Modified time: 2016-07-13 16:51:54
 */



/**
 * JSONP
 * @param  {Object} [options for jsonp]
 */

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

function _jsonp () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (!options.url || !options.success) throw new Error('缺少url参数或者success回调函数');

  var callbackName = options.callbackname || 'jsonp_' + new Date().getTime(),
    head = document.getElementsByTagName('head')[0],
    script = document.createElement('script'),
    url = encodeURI(options.url + (options.url.indexOf('?') === -1 ? '?callback=' : '&callback=') + callbackName);

  head.appendChild(script);

  // declare callback funcion
  window[callbackName] = function (data) {
    head.removeChild(script);
    clearTimeout(script.timer);
    window[callbackName] = null;
    options.success(data);
  };

  // pull request
  script.src = url;

  // timeout setting
  if (options.time) script.timer = setTimeout(function () {
    head.removeChild(script);
    window[callbackName] = null;
    throw new Error('请求超时');
  }, options.time);
}

/**
 * Danmaku Structor Function
 * @param {[type]} stage  selector string of danmaku stage
 * @param {[type]} config  the config of danmaku stage
 */
function Danmaku (stage, config) {
  this.stage = document.querySelector(stage);
  this.store = [];
  this.runline = [];
  this.lasttime = 0;
  var _default = {
    width: this.stage.offsetWidth || window.innerWidth,
    classname: 'dmk',
    maxline: 4,
    cmmax: 0,
    runtime: 5000,
    fontsize: '1.2rem',
    color: '#fff',
    opacity: 1,
    older: 15,
    hashead: true
  };
  var _config = _extends(_default, config);

  for (var item in _config) {
    this[item] = _config[item];
  }
  this.posmark = [];
  for (var i = 0; i < this.maxline; i++) {
    this.posmark[i] = 0;
  }
  this.stage.style.width = this.width + 'px';
}

/**
 * clear the danmaku store
 * @return {[type]} [description]
 */
Danmaku.prototype.clear = function () {
  this.store = [];
  this.lasttime = 0;
};

/**
 * get comments data
 */
Danmaku.prototype.getComments = function () {
  _jsonp({
    url: '//coral.qq.com/article/' + this.commentid + '/comment',
    time: 1200,
    success: this.handleComments.bind(this)
  });
};

/**
 * handle comments data, transfrom it to array and store the comments
 * @param  {json} res [comments data]
 */
Danmaku.prototype.handleComments = function (res) {
  var data = res.data,
    cmlist = data.commentid,
    templist = [];

  if (this.lasttime && this.lasttime < cmlist[0].time) {

    // 更新弹幕列表
    for (var i = 0; i < cmlist.length; i++) {
      if (cmlist[i].time > this.lasttime) templist.push({
        head: cmlist[i].userinfo.head,
        text: cmlist[i].content
      });
      else break;
    }
    this.store = templist.concat(this.store);
    this.lasttime = cmlist[0].time;
  } else if (!this.store.length && !this.lasttime) {

    var len = cmlist.length < this.older ? cmlist.length : this.older;
    // 格式化获取的评论并且储存在弹幕列表中
    this.store = cmlist.slice(0, len).map(function (x) {
      return {
        head: x.userinfo.head,
        text: x.content
      };
    });
    this.lasttime = cmlist[0].time;
  }
};

/**
 * get comments and send it to stage
 */
Danmaku.prototype.send = function (cm) {
  var cmt;
  if (this.store.length == 0 && !cm) return;
  if (this.posmark.indexOf(0) == -1 && !cm) return;

  if (!cm) {
    cm = this.store.pop();
    cmt = new CoreComment(this, cm);
    cmt.init();
  } else if (cm.text) {
    cmt = new CoreComment(this, cm, true);
    cmt.init();
  }
};

Danmaku.prototype.run = function () {
  var _this2 = this;

  this.runtimer = setInterval(function () {
    _this2.getComments();
  }, 5000);
  setInterval(function () {
    _this2.send();
  }, 100);
};

/**
 * Comments core object
 * @param {Danmaku} parent [the danmaku object to inhref]
 * @param {obj} cm     [comments obj]
 */
function CoreComment (parent, cm, isSelf) {
  var text = cm.text

  // limited the character number
  if (text.length > 25) {
    text = text.slice(25);
    text += '...'
  }

  this.text = text;
  this.head = cm.head;
  this.parent = parent;
  this.self = isSelf;
}

/**
 * remove comments obj listener
 */
CoreComment.prototype.remove = function () {
  var _this = this;
  this.dom.addEventListener('webkitTransitionend', function () {
    _this.parent.stage.removeChild(_this.dom);
  }, false);
  this.dom.addEventListener('transitionend', function () {
    _this.parent.stage.removeChild(_this.dom);
  }, false);
  // this.parent.stage.removeChild(this.dom)
};

/**
 * clean runline to set next comments
 * @return null
 */
CoreComment.prototype.cleanRunLine = function () {
  this.parent.posmark[this.index] = 0;
};

/**
 * add animation for danmaku
 */
CoreComment.prototype.animate = function () {
  var _this3 = this;

  var dis = this.width + this.parent.width,
    time = Math.random() * 2000 + this.parent.runtime,
    speed = dis / time * 1000,
    ctime = this.width / speed + 2500;

  this.dom.style.transitionDuration = time + 'ms';
  this.dom.style.WebkitTransitionDuration = time + 'ms';
  this.dom.style.transfrom = 'translate3d(-' + dis + 'px,0,0)';
  this.dom.style.WebkitTransform = 'translate3d(-' + dis + 'px,0,0)';

  setTimeout(function () {
    _this3.cleanRunLine();
  }, ctime);

  this.remove();
};

/**
 * init comments dom
 */
CoreComment.prototype.init = function () {

  this.index = this.parent.posmark.indexOf(0);
  this.dom = document.createElement('div');

  this.dom.appendChild(document.createTextNode(this.text));
  this.dom.textContent = this.text;
  this.innerText = this.text;

  if (this.head && this.parent.hashead) {
    var headDom = document.createElement('img');
    this.dom.insertBefore(headDom, this.dom.firstChild);
    headDom.src = this.head;
  }

  this.dom.className = this.parent.classname;
  if (this.self) this.dom.className += ' my';
  this.dom.setAttribute('data-index', this.index);

  this.dom.style.position = 'absolute';
  if (this.self && this.index == -1) this.dom.style.top = this.parent.maxline * 30 + 'px';
  else this.dom.style.top = this.index * 30 + 'px';
  this.dom.style.left = this.parent.width + 'px';
  this.dom.style.opacity = this.parent.opacity || 1;
  this.dom.style.fontSize = this.parent.fontsize || '14px';
  this.dom.style.color = this.parent.color || '#fff';
  this.dom.style.transform = 'translate3d(0,0,0)';
  this.dom.style.WebkitTransform = 'translate3d(0,0,0)';

  this.parent.stage.appendChild(this.dom);

  this.parent.posmark[this.index] = 1;
  this.width = this.dom.offsetWidth;

  this.animate();
};

define("view/newsDanmaku", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Danmaku;
    };
}(this)));

/*
 * @Author: v_mmmzzhang
 * @Date:   2016-07-14 14:59:56
 * @Last Modified by:   v_mmmzzhang
 * @Last Modified time: 2016-07-18 10:30:49
 */

define('view/_video/init',[
    'template/template',
    'views/util',
    'view/_video/liveVideo',
    'view/newsDanmaku'
], function (html, util, Live, Danmaku) {
    'use strict';

    /**
     * 视图生成函数
     * @param  {object} data 传入的设置参数
     * @param  {jq obj} wrap 所需添加到的位置
     */
    var init = function (data, wrap) {
        var h, opt = util.getOpt(data),
            //是否显示？
            ishide = opt.ishide == "true" ? " hide" : "",
            h = '<div class="modwrapper' + ishide + '"><div class="mod_player"><div id="mod_player"></div><div id="trailer_wrap" style="display:none;"><h2></h2><p></p><h3></h3><h4></h4></div></div></div>';
        wrap.append(h);
        var isListHide = "",
            mode = opt.mode,
            title = opt.title,
            live_traile = opt.live_trailer,
            live_trailerid = opt.live_trailerid,

            watch_traile = opt.watch_trailer,
            watch_trailerid = opt.watch_trailerid;

        // 直播人数统计
        if (opt.content.length > 0) {
            if (opt.content[0].type == "watchlive") {
                h = html.render.line;
                $('.mod_player').append(h)
                Live.watchline.init({
                    pid: opt.content[0].id
                });
            } else if (opt.content[0].type == "live" && opt.content[0].pid != "") {
                h = html.render.line
                $('.mod_player').append(h)
                Live.line.init({
                    "pid": opt.content[0].pid
                });
            }
        }

        //弹幕添加
        if (opt.danmaku.open === 'true') {
            var danmaku
            var id = opt.danmaku.commentid
            console.debug('commentid:', id)
            var preload = document.createElement('img')
            preload.src = 'http://img1.gtimg.com/news/pics/hv1/185/119/2088/135802730.png'
            $('.autoinner #mod_player').after('<div class="danmaku-wrap"></div>')
            $('.autoinner .mod_player').after('<div class="danmaku-input-bar"><input type="text" placeholder="请输入弹幕"><button type="submit">发送</button><div class="open-danmaku" style="bottom:0; display:none;"></div></div>')
            if ($('.js-share.share_s').length) {
                $('.js-share.share_s').before('<div class="open-danmaku"></div>');
            } else {
                if ($(".danmaku-input-bar").children(".open-danmaku")) {
                    $(".danmaku-input-bar .open-danmaku").show();
                } else {
                    $('.danmaku-input-bar').prepend('<div class="open-danmaku" style="bottom:0;display:none;"></div>')
                }
            }
            $.getScript('//mat1.gtimg.com/news/2016/zt/autolive/newsDanmaku.js', function () {
                danmaku = new Danmaku('.danmaku-wrap', {
                    commentid: id,
                    older: 50,
                    runtime: 5000
                })
                danmaku.run()
            })
        }

        // 视频列表输出
        if (opt.content.length > 0) {
            if (mode === 'list') {

                h = '<div class="lists videolist"><ul>';
                for (var j = 0; j < opt.content.length; j++) {
                    isListHide = opt.content[j].isListHide == "true" ? " hide" : "";
                    live_traile = opt.content[j].live_trailer;
                    live_trailerid = opt.content[j].live_trailerid;

                    watch_traile = opt.content[j].watch_trailer;
                    watch_trailerid = opt.content[j].watch_trailerid;
                    if (opt.content[j].type == 'live') {
                        if (live_traile == 'true') {
                            h += '<li class="' + opt.content[j].type + isListHide + '" vid="' + opt.content[j].id + '" pic="' + opt.content[j].videoimg + '" live_trailerid="' + live_trailerid + '" live_pid="' + opt.content[j].pid + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p><b></b></a></li>';
                        } else {
                            h += '<li class="' + opt.content[j].type + isListHide + '" vid="' + opt.content[j].id + '" pic="' + opt.content[j].videoimg + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p><b></b></a></li>';
                        }
                    } else if (opt.content[j].type == 'watchlive') {
                        if (watch_traile == 'true') {
                            h += '<li class="' + opt.content[j].type + isListHide + '" vid="' + opt.content[j].id + '" pic="' + opt.content[j].videoimg + '" watch_trailerid="' + watch_trailerid + '" live_pid="' + opt.content[j].pid + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p><b></b></a></li>';
                        } else {
                            h += '<li class="' + opt.content[j].type + isListHide + '" vid="' + opt.content[j].id + '" pic="' + opt.content[j].videoimg + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p><b></b></a></li>';
                        }
                    } else {
                        h += '<li class="' + opt.content[j].type + isListHide + '" vid="' + opt.content[j].id + '" pic="' + opt.content[j].videoimg + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p><b></b></a></li>';
                    }
                }
                h += '</ul></div>';
                $('.modwrapper').append(h);

            } else {
                if (opt.retext != '') {
                    h = '<div id="album-list"><h3 class="title"><span></span></h3><div class="return-wrap"><div class="return-to-left"><div><span>' + opt.retext + '</span></div></div></div><div class="lists albumlist videolist"><ul>';
                } else {
                    h = '<div id="album-list"><h3 class="title"><span></span></h3><div class="lists albumlist videolist"><ul>';
                }
                for (var j = 0; j < opt.content.length; j++) {
                    isListHide = opt.content[j].isListHide == "true" ? " hide" : "";
                    live_traile = opt.content[j].live_trailer;
                    live_trailerid = opt.content[j].live_trailerid;

                    watch_traile = opt.content[j].watch_trailer;
                    watch_trailerid = opt.content[j].watch_trailerid;
                    var tag = opt.content[j].tag ? '<i>' + opt.content[j].tag + '</i>' : '';
                    var stitle = opt.content[j].stitle ? '<span>' + opt.content[j].stitle + '</span>' : '';

                    if (opt.content[j].type == 'live') {
                        if (live_traile == 'true') {
                            h += '<li class="albumlist-item ' + opt.content[j].type + isListHide + '" vid=' + opt.content[j].id + ' pic="' + opt.content[j].videoimg + '" live_trailerid="' + live_trailerid + '" live_pid="' + opt.content[j].pid + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p>' + tag + stitle + '</a></li>';
                        } else {
                            h += '<li class="albumlist-item ' + opt.content[j].type + isListHide + '" vid=' + opt.content[j].id + ' pic="' + opt.content[j].videoimg + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p>' + tag + stitle + '</a></li>';
                        }
                    } else if (opt.content[j].type == 'watchlive') {
                        if (watch_traile == 'true') {
                            h += '<li class="albumlist-item ' + opt.content[j].type + isListHide + '" vid=' + opt.content[j].id + ' pic="' + opt.content[j].videoimg + '" watch_trailerid="' + watch_trailerid + '" live_pid="' + opt.content[j].pid + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p>' + tag + stitle + '</a></li>';
                        } else {
                            h += '<li class="albumlist-item ' + opt.content[j].type + isListHide + '" vid=' + opt.content[j].id + ' pic="' + opt.content[j].videoimg + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p>' + tag + stitle + '</a></li>';
                        }
                    } else {
                        h += '<li class="albumlist-item ' + opt.content[j].type + isListHide + '" vid=' + opt.content[j].id + ' pic="' + opt.content[j].videoimg + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p>' + tag + stitle + '</a></li>';
                    }
                }

                h += '</ul></div></ul></div>';
                $('.autoinner .modwrapper').append(h);

                $('.autoinner .modwrapper').find("#album-list h3.title span").html(title);
                if (title == '') {
                    $('#album-list h3').hide();
                    $('#album-list').css('margin', '0');
                }

                var number = opt.content.length - $('.albumlist li.albumlist-item.hide').length;
                $('.albumlist ul').css('width', number / 2.5 * 100 + '%');
                $('.albumlist li.albumlist-item').css('width', 1 / number * 100 + '%');

                var itemWidth = $('.albumlist li.albumlist-item:not(.hide) a').width(),
                    btnHeight = itemWidth * 9 / 16 + $('.albumlist li.albumlist-item a p').height(),
                    returnBlock = $('.return-to-left')
                returnBlock.css('height', btnHeight)
            }
        }

        //内容都不显示的时候，ul隐藏（意图去掉ul的padding样式）
        if ($(".videolist li").length == 0 || $(".videolist li").length == $(".videolist li.hide").length) {
            $(".videolist ul").addClass("hide")
        }
        if (mode === 'album') {
            $('#album-list').last().removeClass('settab0 settab1 settab2 setdefault').addClass(opt.tabPos)
        } else {
            $('.videolist').last().removeClass('settab0 settab1 settab2 setdefault').addClass(opt.tabPos)
        }

        //* 视频播放入口
        Live.live.init()


        var danmakuBar = '';
        window.data === undefined ? danmakuBar = "edit" : danmakuBar = "client";
        // 事件绑定
        if (danmakuBar == 'client') {
            // console.debug('user', user)
            $(".danmaku-input-bar input").on("focus", function () {
                if (!user.islogin()) {
                    return user.login();
                } else {
                    return $.get("//coral.qq.com/user/0", {}, function (res) {
                        if (res.errCode === 0) {
                            //登录状态没问题，可正常评论
                        } else {
                            return user.login()
                        }
                    }, "jsonp")
                }
            });

            $('.danmaku-input-bar button').on('click', function (event) {
                event.preventDefault()
                var cm = $('.danmaku-input-bar input').val();
                if (cm === '') return
                // 弹幕发送
                if (user.islogin()) {
                    if (host.brower() === "qqnewslite") {
                        if (user.user_info.open_access_token && user.user_info.open_openid) { // QQ互联登录方式
                            data = {
                                targetid: id,
                                type: 1,
                                format: "SCRIPT",
                                callback: "parent.topCallback",
                                content: cm,
                                _method: "put",
                                logintype: user.login_type,
                                open_appid: user.user_info.open_appid,
                                open_openid: user.user_info.open_openid,
                                open_access_token: user.user_info.open_access_token,
                                g_tk: user.gtk(),
                                source: 1,
                                code: 0,
                                subsource: 0
                            };
                        } else if (user.user_info.access_token && user.user_info.openid) { // 微信登录方式
                            data = {
                                targetid: id,
                                type: 1,
                                format: "SCRIPT",
                                callback: "parent.topCallback",
                                content: cm,
                                _method: "put",
                                logintype: user.login_type,
                                appid: user.user_info.appid,
                                openid: user.user_info.openid,
                                access_token: user.user_info.access_token,
                                g_tk: user.gtk(),
                                source: 1,
                                code: 0,
                                subsource: 0
                            };
                        }
                    } else {
                        data = {
                            targetid: id,
                            type: 1,
                            format: "SCRIPT",
                            callback: "parent.topCallback",
                            content: cm,
                            _method: "put",
                            g_tk: user.gtk(),
                            source: 1,
                            code: 0,
                            subsource: 0
                            //thrdes: ""
                        };
                    }
                    /** Attention : Inner QQnewslite can not use form submit, 如果使用则（会跳转，右上角返回按钮需点击多次） */
                    if (host.brower() === "qqnewslite") {
                        $.post('//w.coral.qq.com/article/comment', data, function (response) { })
                    } else {
                        if (!$('#post_iframe_cm').length) {
                            $("body").append('<iframe id="post_iframe_cm" name="post_iframe_cm" style="display:none"></iframe>');
                        }
                        if (!$("#_messageform_cm").length) {
                            $("body").append('<form action="//w.coral.qq.com/article/comment" method="post" target="post_iframe_cm" id="_messageform_cm" style="display:none;" accept-charset="utf-8"></form>');
                        } else {
                            $('#_messageform_cm').attr('action', "//w.coral.qq.com/article/comment").empty();
                        }
                        var name;
                        for (name in data) {
                            $("#_messageform_cm").append($('<input name="' + name + '" type="hidden" value="' + data[name] + '" />'));
                        }
                        $('#_messageform_cm').submit();
                    }
                } else {
                    return user.login();
                }
                $('.danmaku-input-bar input').val('');
                danmaku.send({
                    text: '我：' + cm
                })
            })
        }

        $('.open-danmaku').each(function (i) {
            $(this).off().on('click', function (event) {
                $('.open-danmaku').eq(i).toggleClass('close');
                $('.danmaku-wrap').toggleClass('hidden')
            });
        });
        $('.albumlist').on('scroll', function (event) {
            var left = $(this).scrollLeft()
            if (left > itemWidth) {
                $('.return-to-left').addClass('show')
            } else {
                $('.return-to-left').removeClass('show')
            }
        })
        $('.albumlist').on('click', '.albumlist-item', function (event) {
            if ($(this).index() == 0) {
                $('.return-to-left span').css('color', '#f13f3f')
            } else {
                $('.return-to-left span').css('color', '#333')
            }
        });
        $('.return-to-left').on('click', function (event) {
            $('.albumlist').scrollLeft(0)
            $('.return-to-left span').css('color', '#f13f3f')
            Live.live.setAllVideos(0)
        })
    }
    return init
})
;

var videoInfo = new tvp.VideoInfo();
var myplayerInfo = new tvp.Player();
var videoList = {
    _w: document.documentElement.clientWidth,
    _h: document.documentElement.clientHeight,
    init: function () {
        if (/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod/i.test(navigator.userAgent.toLowerCase())) {
            this.videoW = this._w;
            this.cH = this._h;
            $(".video_list_shadow").css({ 'width': this._w, 'height': this._h, 'position': 'fixed' });
        } else {
            this.videoW = $(".layout").width();
            this.cH = $(".layout").height();
            $(".video_list_shadow").css({ 'position': 'absolute' });
        }
        this.videoH = this.videoW / (16 / 9);
        $(".mod_player_list").css({ 'height': this.videoH, 'margin-top': -this.videoH / 2 });
        $("#mod_player_list").css({ 'height': this.videoH });
        $(".vl_closed").css({ 'top': this.cH / 2 + this.videoH / 2 + 10 });
        this.active();
    },
    setAllVideos: function (idx) {
        var _this = this;
        var li = $(".video_warp_list ul li").eq(idx);
        li.parent().parents().next('.video_list_shadow').show();
        var id = li.attr("vid");
        var pic = li.attr("pic");
        var modId = li.parent().parents().next('.video_list_shadow').find('div div').attr('id');
        var pid = li.attr("pid");
        if (pid) {
            $.ajax({
                url: "//data.video.qq.com/fcgi-bin/data?tid=506&appid=10001009&otype=json&appkey=c5a3e1529a7ba805&idlist=" + pid,
                dataType: "jsonp",
                success: function (d) {
                    if (d.results && d.results.length > 0) {
                        for (var i = 0; i < d.results.length; i++) {
                            var fields = d.results[i].fields;
                            if (fields.playing_status == "1" || fields.playing_status == "3") {
                                _this.liveList(fields.stream_id.toString(), pic, modId);
                            } else {
                                _this.noliveList(fields.live_vid, pic, modId);
                            }
                        }
                    }
                }
            });
        } else {
            if (li.hasClass("live")) {
                _this.liveList(id, pic, modId);
            } else {
                _this.noliveList(id, pic, modId);
            }
        }
    },
    noliveList: function (id, pic, modId) {
        var _this = this;
        videoInfo = new tvp.VideoInfo();
        myplayerInfo = new tvp.Player();
        videoInfo.setVid(id);
        myplayerInfo.create({
            width: _this.videoW,
            height: _this.videoH,
            video: videoInfo,
            modId: modId,
            pic: pic,
            autoplay: false,
            appid: 10001
        });
    },
    liveList: function (id, pic, modId) {
        var _this = this;
        videoInfo = new tvp.VideoInfo();
        myplayerInfo = new tvp.Player();
        videoInfo.setChannelId(id);
        videoInfo.setH5BulletId(1472);
        myplayerInfo.create({
            width: _this.videoW,
            height: _this.videoH,
            type: 1,
            video: videoInfo,
            modId: modId,
            pic: pic,
            autoplay: false
        });
    },
    active: function () {
        var _this = this;
        $(".video_warp_list ul li").each(function (idx) {
            $(this).off().on("click", function () {
                _this.setAllVideos(idx);
                if (myplayerInfo.pause) {
                    myplayerInfo.pause();
                }
                if (myplayer.pause) {
                    myplayer.pause();
                }
            });
        });

        $(".vl_closed").on('click', function () {
            $(this).parent().hide();
            if (myplayerInfo.pause) {
                myplayerInfo.pause();
            }
            if (myplayer.pause) {
                myplayer.pause();
            }
            myplayerInfo.create({
                autoplay: false
            });
            myplayer.create({
                autoplay: false
            });
        });
    }
};

define("view/_videoList/videoList", function(){});

define('view/_videoList/init',[
    'views/util',
    'view/_videoList/videoList'
], function (util) {
    'use strict';
    /**
     * 视图生成函数
     * @param  {object} data 传入的设置参数
     * @param  {jq obj} wrap 所需添加到的位置
     */

    var init = function (data, wrap) {

        var h = '', li = '', opt = util.getOpt(data);
        var isListHide = "",
            mode = opt.mode,
            title = opt.title;

        var number = 0;
        for (var i = 0; i < opt.content.length; i++) {
            if (opt.content[i].isListHide == 'false') {
                number++;
            }
        }
        var ulWidth, liWidth, listClass;
        if (mode == 'list') {
            listClass = 'warp_list_content';
            ulWidth = 'auto';
            liWidth = '50%';
        } else {
            listClass = 'warp_album_content';
            ulWidth = number / 2.5 * 100 + '%';
            liWidth = 1 / number * 100 + '%';
        }

        h = '<div class="video_warp_list set' + data.tab + '"><h3><span>' + title + '</span></h3><div class="' + listClass + '"><ul style="width:' + ulWidth + ';">';
        if (opt.content.length > 0) {
            for (var j = 0; j < opt.content.length; j++) {
                isListHide = opt.content[j].isListHide == "true" ? " hide" : "";
                if (opt.content[j].type == 'vodList') {
                    h += '<li class="nolive' + isListHide + '" vid="' + opt.content[j].id + '" pic="' + opt.content[j].videoimg + '" style="width:' + liWidth + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p><i>' + opt.content[j].tag + '</i><span>' + opt.content[j].stitle + '</span></a></li>';
                }
                if (opt.content[j].type == 'liveList') {
                    h += '<li class="live' + isListHide + '" vid="' + opt.content[j].id + '" pic="' + opt.content[j].videoimg + '" style="width:' + liWidth + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p><i>' + opt.content[j].tag + '</i><span>' + opt.content[j].stitle + '</span></a></li>';
                }
                if (opt.content[j].type == 'watchliveList') {
                    h += '<li class="wllvideo' + isListHide + '" vid="' + opt.content[j].id + '" pid="' + opt.content[j].id + '" pic="' + opt.content[j].videoimg + '" style="width:' + liWidth + '"><a><img src="' + opt.content[j].img + '"><p>' + opt.content[j].title + '</p><i>' + opt.content[j].tag + '</i><span>' + opt.content[j].stitle + '</span></a></li>';
                }
            }
        }
        h += '</ul></div><div class="video_list_shadow"><div class="mod_player_list"><div id=""></div></div><div class="vl_closed"></div></div></div>';
        wrap.append(h);


        var video_warp_list = $(".video_warp_list");
        for (var i = 0; i < video_warp_list.length; i++) {
            if (video_warp_list.eq(i).find('h3 span').html() == '') {
                video_warp_list.eq(i).find('h3').hide();
                video_warp_list.eq(i).css('margin', '0');
            }
            $(".video_list_shadow").eq(i).find('div div').attr('id', 'mod_player_list_' + i);
        }

        videoList.init();


    };
    return init;
});





/**
 * 全局属性：
 * - host : 返回系统运行环境
 * - trace : 调试面板
 * - user : 用户登陆信息，用于发送弹幕与评论到珊瑚系统
 */

(function () {
  var $, user;
  $ = Zepto;
  this.tracePanel = null;
  this.host = {
    brower: function () {
      var brower, patternBrower, resultBrower, ua;
      ua = navigator.userAgent;
      patternBrower = /MicroMessenger|QQLiveBrowser|qqvideobrower|QQ\/|qqnewslite|qqnews/gi;
      resultBrower = patternBrower.exec(ua);
      if (resultBrower != null) {
        switch (resultBrower[0].toLowerCase()) {
          case 'micromessenger':
            brower = 'wx';
            break;
          case 'qqlivebrowser':
          case 'qqvideobrower':
            brower = 'videoapp';
            break;
          case 'qq/':
            brower = 'qq';
            break;
          case 'qqnewslite':
            brower = 'qqnewslite';
            break;
          case 'qqnews':
            brower = 'newsapp';
            break;
          default:
            brower = 'html5';
        }
      } else {
        brower = 'html5';
      }
      this.brower = function () {
        return brower;
      };
      // console.debug('brower:', brower)
      return brower;
    },
    system: function () {
      var patternSystem, resultSystem, system, ua;
      ua = navigator.userAgent;
      patternSystem = /iPhone|Android/gi;
      resultSystem = patternSystem.exec(ua);
      if (resultSystem != null) {
        switch (resultSystem[0].toLowerCase()) {
          case 'iphone':
            system = 'ios';
            break;
          case 'android':
            system = 'android';
            break;
          default:
            system = 'html5';
        }
      } else {
        system = 'html5';
      }
      this.system = function () {
        return system;
      };
      return system;
    }
  };

  this.trace = function (msg) {
    var log;
    return null;
    log = $("#trace-log");
    if (!log.length) {
      log = $('<div id="trace-log" style="position: fixed; top: 50px; left: 0; right: 0; bottom: 0; z-index: 9999; line-height:1.0; width: 100%; height: 100px; color: #FFFFFF !important; padding: 5px; background-color: rgba(255, 255, 255, 0.5);"></div>');
      log.appendTo('body');
    }
    this.tracePanel = log;
    return log.html(log.html() + '<br />' + msg);
  };

  user = {
    user_info: null,
    login_type: 0,
    islogin: function () { },
    login: function () { }
  };

  this.user = {
    islogin: function () {
      var brower, e, lskey, luin, skey, system, uin, uinTemp;
      brower = host.brower();
      system = host.system();
      //* carol-comment : logintype=11 QQ 互联登陆方式，必传的参数如下
      if (brower === 'qqnewslite') {
        //QQ 互联登录
        var open_appid = $.fn.cookie("open_appid");
        var open_openid = $.fn.cookie("open_openid");
        var open_access_token = $.fn.cookie("open_access_token");
        //WX 登录
        var appid = $.fn.cookie("appid");
        var openid = $.fn.cookie("openid");
        var access_token = $.fn.cookie("access_token");
        //
        if (open_access_token && open_openid) {
          this.user_info = {
            open_appid: open_appid,
            open_openid: open_openid,
            open_access_token: open_access_token
          };
          this.login_type = 11;
          return true;
        } else if (access_token && openid) {
          this.user_info = {
            appid: appid,
            openid: openid,
            access_token: access_token
          };
          this.login_type = 1;
          return true;
        } else {
          return false;
        }
      }
      //
      if (brower === 'videoapp') {
        if (system === 'android') {
          try {
            uin = window.Android.getCookieValue('uin');
            skey = window.Android.getCookieValue('skey');
            luin = window.Android.getCookieValue('luin');
            lskey = window.Android.getCookieValue('lskey');
          } catch (_error) {
            e = _error;
            trace("android uin skey §°" + e);
          }
          if (uin.toString().length === 9) {
            uinTemp = "o0" + uin;
          } else if (uin.toString().length === 10) {
            uinTemp = "o" + uin;
          } else if (uin.toString().length === 8) {
            uinTemp = "o00" + uin;
          } else if (uin.toString().length === 7) {
            uinTemp = "o000" + uin;
          } else if (uin.toString().length === 6) {
            uinTemp = "o0000" + uin;
          }
          $.fn.cookie('uin', uinTemp, {
            domain: 'qq.com',
            path: "/",
            expires: 7
          });
          $.fn.cookie('skey', "@" + skey, {
            domain: 'qq.com',
            path: "/",
            expires: 7
          });
          $.fn.cookie('luin', uinTemp, {
            domain: 'qq.com',
            path: "/",
            expires: 7
          });
          $.fn.cookie('lskey', lskey, {
            domain: 'qq.com',
            path: "/",
            expires: 7
          });
          uin = $.fn.cookie('uin');
          skey = $.fn.cookie('skey');
          trace(uin);
          trace(skey);
        } else {
          try {
            window.tb.cookie.set("uin", uinTemp);
            window.tb.cookie.set("skey", skey);
          } catch (_error) {
            e = _error;
            trace("ios uin skey §°" + e);
          }
          uin = $.fn.cookie('uin');
          skey = $.fn.cookie('skey');
        }
        if ((uin != null) && (skey != null)) {
          this.user_info = {
            uin: uin,
            skey: skey
          };
          this.login_type = 1;
          return true;
        } else {
          return false;
        }
      } else {
        this.login_type = 1;
        uin = $.fn.cookie('uin');
        skey = $.fn.cookie('skey');
        if ((uin != null) && (skey != null)) {
          this.user_info = {
            uin: uin,
            skey: skey
          };
          return true;
        } else {
          return false;
        }
      }
    },
    login: function () {
      if (this.islogin()) {
        return null;
      } else {
        return this.dologin();
      }
    },
    dologin: function () {
      var brower, system, web_login;
      brower = host.brower();
      system = host.system();
      //* 常规环境下执行 web_login() 方法后会自动跳转，并自动赋予 uin 、skey 登录value
      // https://mat1.gtimg.com/www/mb/cb/publish/assets/js/cbtb_qq_wx_userlogin_v1.js 更新 appid ，避免权限不足问题：更换后测试失败
      web_login = function () {
        var params, url;
        params = {
          style: 8,
          appid: 1006102,  //cross : 636014201 , ori : 1006102
          daid: 1,
          hln_css: encodeURIComponent("//" + document.location.host + "/css/img/logo_txv.png"),
          s_url: document.location.href
        };
        if (system === 'ios') {
          params.style = 8;
        } else {
          params.style = 9;
        }
        //
        url = "//ui.ptlogin2.qq.com/cgi-bin/login?" + $.param(params);
        //http://ui.ptlogin2.qq.com/cgi-bin/login?hide_title_bar=0&style=9&low_login=0&link_target=blank&appid=636014201&target=self&s_url=https://www.qq.com/cross/20180521/54vZ38tE.html#comment
        return window.location.href = url;
      };
      if (brower === 'wx') {
        return web_login();
      } else if (brower === 'qq') {
        return web_login();
      } else if (brower === 'videoapp') {
        if (system === 'android' && (window.Android.gotoLoginView != null)) {
          return window.Android.gotoLoginView();
        } else {
          return window.location.href = 'tenvideo2://?action=9';
        }
      } else if (brower === 'newsapp' || brower === 'qqnewslite') {
        //* http://newsapi.webdev.com/jsApi#ShowNativeLoginWithType，
        /** 新闻客户端执行 showNativeLoginWithType() 方法后会自动跳转，并自动种植 cookie ，不同登录方式如下:
         *  - 新闻客户端：ptlogin - 赋予 uin 、skey 
         *  - 极速版：
         *    - qq互联：open_access_token、open_appid、open_openid
         *    - 微信登录：access_token、appid、openid
         * */
        if (window.TencentNews && window.TencentNews.showNativeLoginWithType) {
          window.TencentNews.showNativeLoginWithType("qqorweixin", "showNativeLoginWithTypeCallBack", "自定义参数");
        } else {
          return web_login();
        }
      } else {
        return web_login();
      }
    },
    userinfo: function (callback) {
      if (this.islogin) {
        return $.get("//coral.qq.com/user/0", {}, function (res) {
          var e, _tmp;
          if (res.errCode === 0) {
            _tmp = {};
            _tmp.user_id = res.data.userid;
            _tmp.user_name = res.data.nick;
            _tmp.user_head = res.data.head;
            _tmp.user_gender = res.data.gender;
            if (typeof callback === "function") {
              return callback(_tmp);
            } else {
              try {
                return trace("callback is not function,or null");
              } catch (_error) {
                e = _error;
                return null;
              }
            }
          } else {
            //评论特殊定义，其他项目可自行定义 begin
            if (typeof callback === "function") {
              return callback(_tmp);
            } else {
              try {
                return trace("callback is not function,or null");
              } catch (_error) {
                e = _error;
                return null;
              }
            }
            //评论特殊定义，其他项目可自行定义 end
            try {
              return trace("get user info fail");
            } catch (_error) {
              e = _error;
              return null;
            }
          }
        }, "jsonp");
      }
    },
    gtk: function () {
      var brower = host.brower();
      var hash, i, key, temp, _i, _len;
      hash = 2013;
      if (brower === 'qqnewslite') {
        if ($.fn.cookie("open_access_token")) {        // logintype=11 QQ 互联登陆方式，使用参数中的 open_access_token 字段计算
          key = $.fn.cookie("open_access_token");
        } else if ($.fn.cookie("access_token")) {      // logintype=1 微信登陆方式，使用参数中的 access_token 计算
          key = $.fn.cookie("access_token");
        }
      } else {
        key = $.fn.cookie("skey") || $.fn.cookie("lskey");
      }
      //
      if (key) {
        for (i = _i = 0, _len = key.length; _i < _len; i = ++_i) {
          temp = key[i];
          hash += (hash << 5) + key.charCodeAt(i);
        }
      }
      return hash & 0x7fffffff;
    }
  };

  /** 新闻客户端登录后的回调参数 - 不需要理会，定义了就行 */
  window["showNativeLoginWithTypeCallBack"] = function (success, params) {
    // alert('callback - showNativeLoginWithTypeCallBack')
    /* setTimeout(function () {
        alert('CallBack：' + success + '\n' + params);
    }, 5000); */
    if (status == 1) {
      //alert("登录成功:" + params);
    }
    if (status == 0) {
      //alert("登录失败:" + params);
    }
  };

}).call(this);

define("view/global", function(){});

/*
 * @Date:   2016-04-27 09:40:22
 * @Last Modified by:   v_mmmzzhang
 * @Last Modified time: 2016-07-13 14:05:54
 */

var g_wx_appid = "wxb21cb630ef1f157d";
var g_ps_appid = "wxb21cb630ef1f157d";
var commentTime;
function cb (ret) { }
// console.debug('comments.js :: 1.0.1')
var comment = {
    init: function (data) {
        // console.log(host.brower())
        var _this = this;
        _this.data = $.extend({
            title: "大家说",
            durTime: 30000,
            number: 15
        }, data);
        if (!_this.data.title) {
            $(".commentWrap h3").hide();
            $(".commentWrap").css('margin-top', '0');
        }
        $(".commentWrap h3 span").html(_this.data.title);
        _this.getCommentList();
    },
    getCommentList: function () {
        var _this = comment;
        // 评论列表
        $.ajax({
            url: "//coral.qq.com/article/" + _this.data.id + "/comment?",
            dataType: "jsonp",
            jsonpCallback: "cb",
            success: function (res) {
                // console.debug('评论列表：', _this.data)
                var data = res.data;
                var total = _this.data.number;
                data.commentid.length = data.commentid.length > total ? total : data.commentid.length;
                var newComment = data.commentid.reverse();
                var h = '';
                if (user.islogin()) {
                    var id;
                    user.userinfo(function (loginData) {
                        if (loginData && loginData.user_id) {
                            id = loginData.user_id;
                        }
                        comment.returnComments(newComment, id);
                    });
                } else {
                    comment.returnComments(newComment, id);
                }
            }
        });
        commentTime = setTimeout(comment.getCommentList, comment.data.durTime);
    },
    returnComments: function (data, id) {
        var _this = this;
        var h = '';
        if (id) {
            for (var item in data) {
                if (id == data[item].userinfo.userid) {
                    h += '<li class="chat-item chat-item-mine"><div class="content-wrap"><div class="chat-wrap"><div class="chat-title"><span class="name" nick="' + data[item].userinfo.nick + '">我</span><span class="support "></span><span class="time">' + data[item].timeDifference + '</span></div>';
                } else {
                    h += '<li class="chat-item"><div class="u-pic"><img src="' + data[item].userinfo.head + '" alt=""></div><div class="content-wrap"><div class="chat-wrap"><div class="chat-title"><span class="name" nick="' + data[item].userinfo.nick + '">' + data[item].userinfo.nick + '</span><span class="support "></span><span class="time">' + data[item].timeDifference + '</span></div>';
                }
                h += '<p class="chat-body">' + data[item].content + '</p></div></div></li>';
            }
        } else {
            for (var item in data) {
                h += '<li id="" class="chat-item"><div class="u-pic"><img src="' + data[item].userinfo.head + '" alt=""></div><div class="content-wrap"><div class="chat-wrap"><div class="chat-title"><span class="name" nick="' + data[item].userinfo.nick + '">' + data[item].userinfo.nick + '</span><span class="support "></span><span class="time">' + data[item].timeDifference + '</span></div><p class="chat-body">' + data[item].content + '</p></div></div></li>';
            }
        }
        var comWrap = $(".comments_list_wrap");
        comWrap.html('<ul>' + h + '</ul>');
        _this.scrollIntoView();
        _this.active();
    },
    showCurrCommnet: function () {
        var _this = this;
        var input = $(".inp_text");
        var content = input.val();
        var h = '<li class="chat-item chat-item-mine"><div class="content-wrap"><div class="chat-wrap"><div class="chat-title"><span class="name">我</span><span class="support "></span><span class="time">刚刚</span></div><p class="chat-body">' + content + '</p></div></div></li>';
        $(".comments_list_wrap ul").append(h);
        _this.scrollIntoView();
        input.val("");
    },
    commentSubmit: function () {
        var _this = this;
        if (user.islogin()) {
            data = {
                targetid: _this.data.id,
                type: 1,
                format: "SCRIPT",
                callback: "parent.topCallback",
                content: $(".inp_text").val(),
                _method: "put",
                g_tk: user.gtk(),
                source: 1,
                code: 0,
                subsource: 0
                //thrdes: ""
            };
            _this.iframepost("//w.coral.qq.com/article/comment", data, null);
        } else {
            return user.login();
        }
    },
    iframepost: function (url, data) {
        var _this = this;
        if (!$('#post_iframe_cm').length) {
            $("body").append('<iframe id="post_iframe_cm" name="post_iframe_cm" style="display:none"></iframe>');
        }
        if (!$("#_messageform_cm").length) {
            $("body").append('<form action="' + url + '" method="post" target="post_iframe_cm" id="_messageform_cm" style="display:none;" accept-charset="utf-8"></form>');
        } else {
            $('#_messageform_cm').attr('action', url).empty();
        }
        for (name in data) {
            $("#_messageform_cm").append($('<input name="' + name + '" type="hidden" value="' + data[name] + '" />'));
        }
        $('#_messageform_cm').submit();
        _this.showCurrCommnet(); //暂时显示假数据
        //定时更新
        // clearTimeout(commentTime);
        // commentTime = setTimeout(comment.getCommentList,5000);
    },
    scrollIntoView: function (e) {
        var top = $(".comments_list_wrap ul").height();
        $(".comments_list_wrap").scrollTop(top);
    },
    active: function () {
        var _this = this;

        var iptText = '';
        window.data === undefined ? iptText = "edit" : iptText = "client";

        if (iptText == "client") {

            $(".btn_submit").off().on("click", function () {
                _this.commentSubmit();
            });

            $(".inp_text").on("focus", function () {
                if (!user.islogin()) {
                    return user.login();
                } else {
                    return $.get("//coral.qq.com/user/0", {}, function (res) {
                        if (res.errCode === 0) {
                            //登录状态没问题，可正常评论
                        } else {
                            return user.login();
                        }
                    }, "jsonp");
                }
            });
        }


        $(".chat-item").off().on("click", function () {
            var input = $(".inp_text");
            var nick = input.attr("data-nick");
            var newNick = $(this).find(".name").attr("nick");
            input.attr("data-nick", "@" + newNick);
            input.val("@" + newNick + " " + $.trim(input.val().replace(nick, "")));
        });
    }
};
define("view/_comment/comments", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.comment;
    };
}(this)));

/*
 * @Author: v_mmmzzhang
 * @Date:   2016-07-14 15:11:30
 * @Last Modified by:   v_mmmzzhang
 * @Last Modified time: 2016-07-18 10:31:09
 */

define('view/_comment/init',[
  'template/template',
  'views/util',
  'view/global',
  'view/_comment/comments'
], function (html, util, global, comment) {
  'use strict';

  /**
   * 视图生成函数
   * @param  {object} data 传入的设置参数
   * @param  {jq obj} wrap 所需添加到的位置
   */
  var init = function (data, wrap) {
    var h, opt = util.getOpt(data);
    var ishide = opt.ishide == "true" ? " hide" : "";
    if (opt.id && opt.id != "") {
      //h+=html.render.comment;
      var comment_d = data;
      // console.debug('util.ua.qqnews:', util.ua.qqnews, opt)
      if (util.ua.qqnews && opt.isNewsappShow == "false") {
        $(".commentWrap").hide();
      } else {
        wrap.append(html.render.comment);
        $('.commentWrap').addClass(ishide);
        $('.commentWrap').last().removeClass('settab0 settab1 settab2 setdefault').addClass(opt.tabPos);
        $('.commentWrap').css('margin', opt.margin);
        comment.init(comment_d);
      }
    }
  }

  return init
})
;
/*
 * @Author: v_mmmzzhang
 * @Date:   2016-05-25 15:20:22
 * @Last Modified by:   v_mmmzzhang
 * @Last Modified time: 2016-07-22 15:24:04
 */


var mapUI = {
    init: function(data, wrap) {
        var _this = this;
        var ishide = data.ishide == "true" ? " hide" : "";
        var display = data.dis === 'true' ? 'block' : 'none'
        var h = '<div class="map-container' + ishide + '"><div class="text-wrap"><h2>直播位置<span class="get-position waiting" style="display:' + display + '">计算距离</span></h2><p class="depos">北京西城区</p></div><div class="map-wrap"><a href = "javascript:void(0);"><img src="" class="map" /><span class="map-tips">点击打开地图</span></a></div></div>'
        wrap.append(h)
        var bool = data.linkmap == 'true'
        var pos = _this.convertPosition(data.marker, bool)
        var img = data.img

        $('.map').attr('src', img)
        $('.depos').html(data.name)
        if (data.dis === 'true') {
            if (localStorage.getItem('dis')) {
                $('.get-position').html('')
                $('.get-position').removeClass('waiting').addClass('getting');
                _this.getPosition();
            }
            $('.get-position').on('click', function(event) {
                $(this).html('');
                $(this).removeClass('waiting').addClass('getting');
                _this.getPosition();
            });
        }
        $('.map-container').last().removeClass('settab0 settab1 settab2 setdefault').addClass('set'+data.tab)
    },
    convertPosition: function(p, bool) {
        var pos;
        if (p.split(",").length > 1) {
            $('.map-wrap').attr('data-pos', p);
            if (bool) {
                $('.map-wrap a').attr('href', '//apis.map.qq.com/uri/v1/geocoder?coord=' + p + '&referer=myapp ');
                $('.map-wrap').addClass('haslink');
            }
            return p;
        } else {
            var geocoder = new qq.maps.Geocoder();
            geocoder.getLocation(p);
            geocoder.setComplete(function(result) {
                pos = result.detail.location;
                pos = pos.lat + ',' + pos.lng;
                $('.map-wrap').attr('data-pos', pos);
                if (bool) {
                    $('.map-wrap a').attr('href', '//apis.map.qq.com/uri/v1/geocoder?coord=' + pos + '&referer=myapp ');
                    $('.map-wrap').addClass('haslink');
                }
                return pos
            });
            //若服务请求失败，则运行以下函数
            geocoder.setError(function() {
                alert("出错了，请输入正确的地址！！！");
            });
        }
    },
    getPosition: function() {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(_this.showPosition, _this.showError);
        } else {
            alert('抱歉，您的手机不支持定位');
        }
    },
    showPosition: function(p) {
        var lat = p.coords.latitude,
            lng = p.coords.longitude,
            target = $('.map-wrap').attr('data-pos');
        var tlat = target.split(',')[0],
            tlng = target.split(',')[1];
        var latLng = new qq.maps.LatLng(lat, lng);
        var tlatLng = new qq.maps.LatLng(tlat, tlng);
        var d = qq.maps.geometry.spherical.computeDistanceBetween(latLng, tlatLng);

        var dis = new Number(d / 1000).toFixed(2);

        $('.get-position').removeClass('getting').addClass('success');
        $('.get-position').html('距离你:' + dis + '千米');
        localStorage.setItem('dis', dis + '');
    },
    showError: function(error) {
        $('.get-position').removeClass('getting').addClass('error');
        $('.get-position').html('定位失败');
    }
}
var init = function(data, wrap) {
    mapUI.init(data, wrap)
}
;
define("view/_map/liveMap", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.init;
    };
}(this)));

    var clockObj;

    function callback(ret) {}
	function jsoncallback(ret) {}

    var textImgLive = {
        role: ['', '主持人', '直播员', '嘉宾'],
        init: function(data) {
            var _this = this;
            _this.data = $.extend({
                interval: 15
            }, data);
            _this.initData();
            clockObj = setInterval(_this.checkData, _this.data.interval * 1000);
            if (!_this.data.title) {
                $(".autoinner #textImgLive h3").hide();
                $(".autoinner #textImgLive").css('margin-top', '0');
            }
            $(".autoinner #textImgLive .title span").html(_this.data.title);
            _this.active();
        },
        initData: function() {
            var _this = this;
            $.ajax({
                url: "//openapi.inews.qq.com/getRoseMsgByRoseIdOpen?roseid=" + _this.data.id + "&topid=&lastid=&getOrig=0&refer=cmseditor",
                dataType: "jsonp",
                jsonpCallback: "callback",
                success: _this.showData
            });
        },
        showData: function(ret) {
            var _this = textImgLive;
            $('.top-info').remove();
            $(".autoinner #zb_content>ul").html(_this.fillData(ret, true));
            _this.showBigImg();
            if (ret.content.live_room.bnext == 0) {
                $('.more_message').hide();
            }
			
			
			$("#zb_content>ul>li").hide();
			for(var i=0; i<_this.data.number; i++){
				$("#zb_content>ul>li").eq(i).show();
			}
			if($("#zb_content>ul>li").length>_this.data.number){
				$('.more_message').show();
			}else{
				$('.more_message').hide();
			}
			var removeLiDate=[];
			for(var j=$("#zb_content>ul>li").length; j>0; j--){
				if($("#zb_content>ul>li").eq(j).css('display')=='none'){
					removeLiDate.unshift(j);
				}
				for(var i=0; i<removeLiDate.length; i++){
					$("#zb_content>ul>li").eq(removeLiDate[i]).remove();
				}
			}

        },
        addNewData: function(ret) {
            var _this = textImgLive;
            $('.top-info').remove();
            $(".autoinner #zb_content>ul").prepend(_this.fillData(ret, true));
            _this.showBigImg();
        },
        moreData: function(ret) {
            var _this = textImgLive;
            _this.showBigImg();
            if (ret.content.live_room.bnext == 0) {
                $('.more_message').hide();
            }
			
			if(ret.content.live_room.top==undefined&&(ret.content.live_room.new.length==0)){
				$.ajax({
					url: "//openapi.inews.qq.com/getRoseMsgByRoseIdOpen?roseid=" + _this.data.id + "&topid=&lastid=&getOrig=0&refer=cmseditor",
					dataType: "jsonp",
					jsonpCallback: "jsoncallback",
					success: function(ret){
						var infoReverse = ret.content.live_room.new;
						var h='';
						for (var i = 0; i < infoReverse.length; i++) {
							var info = infoReverse[i][0];
							var headImg = info.mb_head_url || info.mb_head_url || "//t0.qlogo.cn/mbloghead/6d3170029a3af2b5f8ae/50";
							//info.rose_data.id为直播单条id
							h += "<li id='" + info.rose_data.id + "' class='normal'>";

							h += "<div class='left'><img src=" + headImg + "></div>";
							h += "<div class='right'><span class='con_arrow'></span><p><span class='author_nick'>" + info.nick + "</span><span class='author_type'>" + _this.role[info.rose_data.role] + "</span></p>";
							h += "<p class='self_time'><span>" + info.province_city + "</span>" + _this.timeToStr(info.pub_time) + "</p>";

							if (info.pic && info.pic.length > 0) {
								h += _this.fillImageData(info.pic[0].origUrl, info.pic[0].url, info.pic[0].desc, info.pic[0].width, info.pic[0].height);
							} else if (info.rose_data && info.rose_data.type == 4) {
								h += _this.fillVideoData(info.reply_content, info.rose_data.attachment.playurl, info.rose_data.attachment.img);
							} else {
								h += _this.fillTextData(info.reply_content);
							}
							h += "</div></li>";
						}
						$("#zb_content>ul").append(h);
					}
				});
			}else{
				$("#zb_content>ul").append(_this.fillData(ret, false));
			}
        },
        fillData: function(ret, bool) {
            var _this = textImgLive;
            if (ret.ret != 0) return;
            var infoTop = ret.content.live_room.top;
            var infoReverse = ret.content.live_room.new;
            var h = '';
            if (bool == true) {
                for (var i = 0; i < infoTop.length; i++) {
                    var info = infoTop[i][0];
                    var headImg = info.mb_head_url || info.mb_head_url || "//t0.qlogo.cn/mbloghead/6d3170029a3af2b5f8ae/50";
                    //info.rose_data.id为直播单条id
                    h += "<li id='" + info.rose_data.id + "' class='top-info'>";

                    h += "<div class='left'><img src=" + headImg + "></div>";
                    h += "<div class='right'><span class='con_arrow'></span><p><span class='author_nick'>" + info.nick + "</span><span class='author_type'>" + _this.role[info.rose_data.role] + "</span></p>";
                    h += "<p class='self_time'><span>" + info.province_city + "</span>" + _this.timeToStr(info.pub_time) + "</p>";

                    if (info.pic && info.pic.length > 0) {
                        h += _this.fillImageData(info.pic[0].origUrl, info.pic[0].url, info.pic[0].desc, info.pic[0].width, info.pic[0].height);
                    } else if (info.rose_data && info.rose_data.type == 4) {
                        h += _this.fillVideoData(info.reply_content, info.rose_data.attachment.playurl, info.rose_data.attachment.img);
                    } else {
                        h += _this.fillTextData(info.reply_content);
                    }
                    h += "</div></li>";
                }
            }
            for (var i = 0; i < infoReverse.length; i++) {
                var info = infoReverse[i][0];
                var headImg = info.mb_head_url || info.mb_head_url || "//t0.qlogo.cn/mbloghead/6d3170029a3af2b5f8ae/50";
                //info.rose_data.id为直播单条id
                h += "<li id='" + info.rose_data.id + "' class='normal'>";

                h += "<div class='left'><img src=" + headImg + "></div>";
                h += "<div class='right'><span class='con_arrow'></span><p><span class='author_nick'>" + info.nick + "</span><span class='author_type'>" + _this.role[info.rose_data.role] + "</span></p>";
                h += "<p class='self_time'><span>" + info.province_city + "</span>" + _this.timeToStr(info.pub_time) + "</p>";

                if (info.pic && info.pic.length > 0) {
                    h += _this.fillImageData(info.pic[0].origUrl, info.pic[0].url, info.pic[0].desc, info.pic[0].width, info.pic[0].height);
                } else if (info.rose_data && info.rose_data.type == 4) {
                    h += _this.fillVideoData(info.reply_content, info.rose_data.attachment.playurl, info.rose_data.attachment.img);
                } else {
                    h += _this.fillTextData(info.reply_content);
                }
                h += "</div></li>";
            }
            return h;
        },
        fillTextData: function(content) {
            var html = "";
            html += ("<div class='type-text'>");
            html += ("<p class='self_text'>" + content + "</p>");
            html += ("</div>");
            return html;
        },
        fillVideoData: function(content, url, img) {
            var html = "";

            html += ("<div class='type-video'>");
            html += ("<p class='self_text'>" + content + "<a href='" + url + "' target='_blank'>【点击查看视频】</a></p>");
            html += ("<a href='" + url + "' target='_blank'>");
            html += ("<img class='lazy img-responsive' src='" + img + "'>");
            html += ("</a>");
            html += ("</div>");

            return html;
        },
        fillImageData: function(imageUrl, smallImageUrl, desc, width, height) {
            var html = "";
            var showHeight = (height * 150.0) / width;
            imageUrl = imageUrl || smallImageUrl;
            html += ("<div class='type-img'>");
            html += ("<div class='zh_img colorGray'>");
            html += ("<p class='self_text'>" + desc + "</p>");
            html += ("<img class='lazy' src='" + smallImageUrl + "' bsrc='"+imageUrl+"'>");
            html += ("</div></div>");

            return html;
        },
        checkData: function() {
            var _this = textImgLive;
            var id = $(".autoinner #zb_content>ul>li.normal").eq(0).attr("id");

            $.ajax({
                url: "//openapi.inews.qq.com/getRoseMsgByRoseIdOpen?roseid=" + _this.data.id + "&topid=" + id + "&lastid=&getOrig=0&refer=cmseditor",
                dataType: "jsonp",
                jsonpCallback: "callback",
                success: _this.checkClock
            });
        },
        checkClock: function(ret) {
            if (ret.content.live_room.new.length > 0) {
                clearInterval(clockObj);
                $(".update_message").addClass("update_message_active");
            }
        },
        refreshData: function() {
            var _this = this;
            var id = $(".autoinner #zb_content>ul>li").eq(0).attr("id");

            $.ajax({
                url: "//openapi.inews.qq.com/getRoseMsgByRoseIdOpen?roseid=" + _this.data.id + "&topid=" + id + "&lastid=&getOrig=0&refer=cmseditor",
                dataType: "jsonp",
                jsonpCallback: "callback",
                success: _this.addNewData
            });
        },
        timeToStr: function(time) {
            var date = new Date;
            date.setTime(time * 1E3);

            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            if (month < 10) {
                month = "0" + month;
            }

            if (day < 10) {
                day = "0" + day;
            }

            if (hour < 10) {
                hour = "0" + hour;
            }

            if (minute < 10) {
                minute = "0" + minute;
            }

            if (second < 10) {
                second = "0" + second;
            }

            return month + "-" + day + " " + hour + ":" + minute; //+ ":" + second;
        },
        showBigImg:function(){
            var _this = this;
            $(".type-img img").click(function(){
                var bigImg = $(this).attr("bsrc");
                if(!$(".textImglayer").length>0){
                    $(".layout").append('<div class="textImglayer"></div>');
                }
                $(".textImglayer")[0].addEventListener('touchmove', function(event) {
                    event.preventDefault();
                }, false);
                $(".textImglayer").html('<div class="loading"><img src="'+bigImg+'"></div>');
                _this.setImgSize(bigImg,$(".textImglayer img"));
                $(".textImglayer").show();
            });
        },
        getImgSize:function(imgUrl,callback){
            var img = new Image();
            img.src = imgUrl;
            img.onload = function(){
                callback(img);
            };
        },
        setImgSize:function(imgUrl,dom,callback){
            var _this = this;
            var n_w = $(".layout").width();
            var n_h = $(".layout").height();
            console.log(n_w);

            callback = callback || function(img){
                var scale = img.height/img.width;
                var w,h,l,t;
                if(n_h/n_w>scale){
                    w = parseInt(n_w);
                    h = parseInt(n_w*scale);
                }else{
                    w = parseInt(n_h/scale);
                    h = parseInt(n_h);
                }
                $('.textImglayer div.loading').addClass("loaded");
                dom.css({"width":w,"height":h,"marginLeft":-w/2,"marginTop":-h/2,"display":"block"});
                $(".textImglayer,.textImglayer img").click(function(){
                    $(this).hide();
                });
                $('.textImglayer div.loading').each(function () {
                   typeof(RTP)!="undefined" && new RTP.PinchZoom($(this), {});
                }); 
            };
            _this.getImgSize(imgUrl,callback);
        },
        active: function() {
            var _this = this;
            $("a.update_message").click(function() {
                clockObj = setInterval(_this.checkData, _this.data.interval * 1000);
                _this.refreshData();
                $(this).removeClass("update_message_active");
                window.parent.window.scrollTo(0, 0);
                document.getElementById('zb_content').scrollTop = 0;
            });

            $("a.more_message").click(function() {
                var id = $(".autoinner #zb_content>ul>li").eq($(".autoinner #zb_content>ul>li").length - 1).attr("id");
                if (!id) {
                    return;
                }
                $.ajax({
                    url: "//openapi.inews.qq.com/getRoseMsgByRoseIdOpen?roseid=" + _this.data.id + "&topid=&lastid=" + id + "&getOrig=0&refer=cmseditor",
                    dataType: "jsonp",
                    jsonpCallback: "callback",
                    success: _this.moreData
                });

                $("a.more_message").blur();
            });
        }
    };

define("view/_textImgLive/textImgLive", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.textImgLive;
    };
}(this)));

/*
* @Author: v_mmmzzhang
* @Date:   2016-07-14 15:19:45
* @Last Modified by:   v_mmmzzhang
* @Last Modified time: 2016-07-22 15:20:31
*/

define('view/_textImgLive/init',[
  'template/template',
  'views/util',
  'view/_textImgLive/textImgLive'
], function(html, util, textImgLive) {
  'use strict';

  /**
   * 视图生成函数
   * @param  {object} data 传入的设置参数
   * @param  {jq obj} wrap 所需添加到的位置
   */
  var init = function(data,wrap) {


    var h,opt = util.getOpt(data)

    if (opt.id && opt.id != "") {
      var ishide = opt.ishide == "true" ? " hide" : "";
      wrap.append(html.render.textImgLive);
      $('.autoinner #textImgLive').removeClass('settab0 settab1 settab2 setdefault').addClass(opt.tabPos);
      $('.autoinner #textImgLive').addClass(ishide);
      wrap.find("#textImgLive").css('margin', opt.margin)
      var textImgLive_d = data;
	  textImgLive.init(textImgLive_d);
     
    }
  }

  return init
})
;
/*
* @Author: v_mmmzzhang
* @Date:   2016-07-06 10:29:10
* @Last Modified by:   v_mmmzzhang
* @Last Modified time: 2016-07-11 10:45:51
*/


var vote = {
  init: function(id,con_id,title) {
    var _this = this;
    _this.voteID = id;
    _this.conID = con_id;
    _this.title = title;
    _this.getVote();
    setInterval(_this.update.bind(_this), 10000);
  },
  update: function() {
    var _this = this
    $.ajax({
      type: "get",
      url: "//panshi.qq.com/v2/vote/" + _this.voteID + "?source=1",
      dataType: 'jsonp',
      success: function(d) {
        var data = d.data;
        var h = "";
        var k = 0;

        $.each(data.subject, function(i, n) {
          $.each(n.option, function(ii, nn) {
            $('#apps_svy_opt_count_' + nn.voteid + '_' + k).html(nn.selected)
            k++;
          });
        });
      }
    });
  },
  getVote: function() {
    var _this = this;
    var conID = this.conID;
    var title = this.title;
    $.ajax({
      type: "get",
      url: "//panshi.qq.com/v2/vote/" + _this.voteID + "?source=1",
      dataType: 'jsonp',
      jsonp:"callback",
      success: function (d) {
        _this.renderVote(d,conID,title);
      }
    });
  },
  renderVote: function(d,f,title) {
	
    var conID = f;
    var data = d.data;
    var optionidArr = [];
    var subjectid;
    var optId = {};
    var h = "";
    var k = 0;
	
    $.each(data.subject, function(i, n) {
      h += '<div class="vote-wrapper"><p>' + n.title + '</p><div class="vote-inner">'
      $.each(n.option, function(ii, nn) {
        optionidArr.push(nn.optionid); //获取的两个选项ID
        subjectid = nn.subjectid; //获取的问题ID
        h += '<div class="vote-btn"><div class="count" id="apps_svy_opt_count_' + nn.voteid + '_' + k + '">' + nn.selected + '</div><div class="digg-bg"><div class="mask mask-r"><div class="mask-i-r"></div></div><div class="mask mask-l"><div class="mask-i-l"></div></div></div><div class="digg" data-percent=' + nn.percent + ' onclick="AppPlatform.Survey.Digg.digg(this, ' + nn.voteid + ', ' + nn.subjectid + ', ' + nn.optionid + ');" id="apps_svy_opt_title_' + nn.voteid + '_' + k + '" donetext="' + nn.title + '">' + nn.title + '</div></div>';
        k++;
      });
      h += '</div></div>'
    });
    if (title == '') {
    $(".vote"+conID).html(h);
    }else{
    $(".vote"+conID).html('<h3><span>' + title + '</span></h3>' + h);
    }

    //环形百分比样式设置
    //解决zepto无法获取隐藏元素的宽度的问题
    $(".vote-container").css('display', 'block');
    var dw = $('.autoinner .digg').width();
    var dbw = $('.autoinner .vote-btn').width() - 20;
    $(".vote-container").css('display', '');

    $('.digg').css({
      'height': dw + 'px',
    });
    $('.digg-bg').css({
      'height': dbw + 'px',
      'width': dbw + 'px'
    });
    $('.mask,.mask-i-l,.mask-i-r').css({
      'height': dbw - 10 + 'px',
      'width': dbw - 10 + 'px'
    });
    $('.mask-l,.mask-i-l').css({
      'clip': 'rect(0,' + Math.ceil((dbw - 10) / 2) + 'px, auto,0)'
    });
    $('.mask-r,.mask-i-r').css({
      'clip': 'rect(0,auto,auto,' + Math.ceil((dbw - 10) / 2) + 'px)'
    });
    vote.listener()
    for (var i = 0; i < optionidArr.length; i++) {
      optId[optionidArr[i]] = i;
    }

    AppPlatform.Survey.Digg.init({
      PrjId: data.voteid,
      /*调查ID*/
      SubjId: subjectid,
      /*问题ID*/
      DiggMode: 0,
      /*0：单选模式 1：多选模式*/
      ShowResult: 0,
      OptIdObject: optId
    });
  },
  listener: function() {
    $('.vote-wrapper').on('click', '.digg', function(event) {
      event.preventDefault();
      $(this).parents('.vote-inner').find('.vote-btn').addClass('over')
      $(this).parents('.vote-inner').find('.digg').attr('onClick', 'void(0)')
      $(this).parent('.vote-btn').addClass('add-vote').on('webkitAnimationEnd animationend', function(event) {
        event.preventDefault();
        $(this).removeClass('add-vote')
      });

      $('.over').each(function(index, el) {
        var per = parseInt($(this).find('.digg').attr('data-percent'));
        var base = 3.6;
        if (per <= 50) {
          $(this).find('.mask-i-r').css({
            '-webkit-transform': 'rotate(' + per * 3.6 + 'deg);',
            'transform': 'rotate(' + per * 3.6 + 'deg);'
          })
        } else if (per > 50) {
          $(this).find('.mask-i-r').css({
            '-webkit-transform': 'rotate(180deg);',
            'transform': 'rotate(180deg);'
          })
          $(this).find('.mask-i-l').css({
            '-webkit-transform': 'rotate(' + (per - 50) * 3.6 + 'deg);',
            'transform': 'rotate(' + (per - 50) * 3.6 + 'deg);'
          })
        }
        $(this).find('.digg').append('<br>' + per + '%')
      });

      $(this).parents('.vote-wrapper').off()
    });
  }
}
;
define("view/_vote/vote", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.vote;
    };
}(this)));

define('view/longTitleVote',[
  
 ], function() {
	
	var longTitleVote={
		init:function(id,con_id,title){
			this.getLongVote(id,con_id,title);
		},
		getLongVote:function(id,con_id,title){
			var _this=this;
			var conID = con_id;
			var title = title
			$.ajax({
				type: "get",
				url: "//panshi.qq.com/v2/vote/"+id+"?source=1",
				dataType: "jsonp",
				jsonp:"callback",
				success:function(d){
					_this.renderVote(d,conID,title);
				}
			});
		},
		renderVote:function(d,f,title){
			var conID = f;
			var data = d.data;
			var subjectid='';
			var optionidArr = [];
			var optId = {};
			var optionHtml = '<div class="vote_title"><span>' + title + '</span></div>';
			var num=0;
			if (title != '') {
			optionHtml = '<div class="vote_title"><span>' + title + '</span></div>';
		}else{
			optionHtml = '';
		}
			for(var j=0; j<data.subject.length; j++){
				subjectid=data.subject[j].subjectid;
				var resulthtml='';
				optionHtml+='<div class="question_list"><h3>'+data.subject[j].title+'</h3><div class="question_main">';
				for (var i = 0; i < data.subject[j].option.length; i++){
					optionidArr.push(data.subject[j].option[i].optionid);
					optionHtml += '<div class="option"><div class="vote_list" onclick="AppPlatform.Survey.Digg.digg(this, ' + data.voteid + ', ' + data.subject[j].subjectid + ', ' + data.subject[j].option[i].optionid + ');" id="apps_svy_opt_title_' + data.voteid + '_' + num + '" doneText="' + data.subject[j].option[i].title + '">' + data.subject[j].option[i].title + '</div></div>';
					resulthtml+='<li class="process"><h5>'+data.subject[j].option[i].title+'</h5><p><strong style="width:'+data.subject[j].option[i].percent/120*$('.autoinner').width()+'px"></strong><span>'+data.subject[j].option[i].percent+'%（'+data.subject[j].option[i].selected+'）</span></p></li>';
					num++;
				}
				optionHtml+='</div><ul class="result" style="display:none;">'+resulthtml+'</ul></div>';
			}
			$(".vote" + conID).html(optionHtml);
			for (var i = 0; i < optionidArr.length; i++) {
				optId[optionidArr[i]] = i;
			}
			AppPlatform.Survey.Digg.init({
				PrjId: data.voteid, /*调查ID*/
				SubjId: subjectid, /*问题ID*/
				DiggMode: 0, /*0：单选模式 1：多选模式*/
				ShowResult: 0,
				OptIdObject: optId
			});
			$(".question_main .vote_list").each(function(i){
				$(this).off().on('click',function(){
					$(".question_main .vote_list").eq(i).addClass('active');
					$(".question_main .vote_list").eq(i).parent().parent().hide().parent().find('.result').fadeIn("fast");
				});
			});
		}
	};
	return longTitleVote;
});
	



/*
 * @Author: v_mmmzzhang
 * @Date:   2016-07-14 14:54:51
 * @Last Modified by:   v_mmmzzhang
 * @Last Modified time: 2016-07-22 16:59:51
 */

define('view/_vote/init',[
  'views/util',
  'view/_vote/vote',
  'view/longTitleVote',
], function(util, vote, longTitleVote) {
  'use strict';

  /**
   * 视图生成函数
   * @param  {object} data 传入的设置参数
   * @param  {jq obj} wrap 所需添加到的位置
   */
   
   
  var init = function(data, wrap) {
    var h, opt = util.getOpt(data);
    var ishide = opt.ishide == "true" ? " hide" : "",
	h = '<div class="vote-container' + ishide + ' vote' + opt.vote_eleid +'" style="margin: ' + opt.margin + '">' + (opt.title ? ('<h3><span>' + opt.title + '</span></h3>') : '') + '</div>';
	 wrap.append(h);
	 $('.vote-container').last().removeClass('settab0 settab1 settab2 setdefault').addClass(opt.tabPos);
	 opt.mode === 'longTitle' ? longTitleVote.init(opt.voteid,opt.vote_eleid,opt.title) : vote.init(opt.voteid,opt.vote_eleid,opt.title)
  }

  return init
})
;
define('view/networkdetect',[],function() {
    var UA = function() {
        var userAgent = navigator.userAgent.toLowerCase();
        return {
            ipad: /ipad/.test(userAgent),
            iphone: /iphone/.test(userAgent),
            android: /android/.test(userAgent),
            qqnews: /qqnews/.test(userAgent),
            weixin: /micromessenger/.test(userAgent),
            qqnews_version: userAgent.match(/qqnews/i) == "qqnews" ? userAgent.split('qqnews/')[1] : ''
        };
    };
    var ua = UA();
    var iosHtml='<div class="mobile_flow" id="ios_flow"><div class="m_f_tips"><h3>【流量使用提示】</h3><p>当前网络无Wi-Fi，继续播放可能会被运营商收取流量费用</p></div><div class="m_f_sure"><span class="video_stop" id="v_p_stop">停止播放</span><span class="video_continue" id="v_p_continue">继续播放</span></div></div><div class="shadow_mobile"></div>';
    var androidHtml='<div class="android_tips" id="android_flow" >您当前处于移动网络！</div>';
    if(ua.qqnews){
        if(ua.iphone || ua.ipad){
            $('body').append(iosHtml);
            /* $.getScript('//qqnews.local/TGJSBridge.js',function(){
                $.getScript('//qqnews.local/TencentNewsScript.js',function(){
                    $.getScript('//qqnews.local/TencentNewsScriptForNative.js',function(){
                        apiIsOK();
                    });
                });
            }); */
			 apiIsOK();
        }else if(ua.android){
            $('body').append(androidHtml);
            apiIsOK();
        }
    }

    window["getNetworkStatusCallBack"] = function(re){
        switch (re) {
            case '0'://无网络
                break;
            case '1'://WIFI
                break;
            case '2'://4G/3G/2G
                if(ua.iphone||ua.ipad){
                    showObj($("#ios_flow"));
                    showObj($(".shadow_mobile"));
                    $("#v_p_stop").on('click',function(){
                        hideObj($("#ios_flow"));
                        hideObj($(".shadow_mobile"));
                        myplayer.pause();
                    });
                    $("#v_p_continue").on('click',function(){
                        hideObj( $("#ios_flow"));
                        hideObj($(".shadow_mobile"));
                        myplayer.play();
                    });
                }else if(ua.android){
                    showObj($("#android_flow"));
                    setTimeout(function(){
                        hideObj($("#android_flow"));
                    },2000);
                }
                break;
        }
    };

    function showObj(obj){
        obj.show();
        obj.addClass('fadeIn');
        setTimeout(function(){
            obj.removeClass('fadeIn');
        },400);
    }
    function hideObj(obj){
        /*obj.addClass('fadeOut');
         setTimeout(function(){
         obj.hide();
         obj.removeClass('fadeOut');
         },400);*/
        obj.hide();
    }
    function apiIsOK() {
        if (ua.android) {
            window.onload = function() {
                (function(window, document) {
                    detectnetwork()
                }(this, this.document));
            }
        } else if (ua.ipad || ua.iphone) {
            (function(window, document) {
                detectnetwork()
            }(this, this.document));
        }
    }
    function detectnetwork() {
        if (window.TencentNews && window.TencentNews.getNetworkStatus) {
            window.TencentNews.getNetworkStatus("getNetworkStatusCallBack");
        }
    }
});
/*
 * @Author: v_mmmzzhang
 * @Date:   2016-07-13 14:00:46
 * @Last Modified by:   v_mmmzzhang
 * @Last Modified time: 2016-07-22 15:20:18
 */

define('views/main',[
    'template/template',
    'views/util',
    'view/image',
    'view/tabbar',
    'view/text',
    'view/textDemo',
    'view/sharebtn',
    'view/download',
    'view/_video/init',
    'view/_videoList/init',
    'view/_comment/init',
    'view/_map/liveMap',
    'view/_textImgLive/init',
    'view/_vote/init',
    'view/networkdetect',
    'view/longTitleVote'
], function (html, util, image, tabs, text, textDemo, sharebtn, download, video, videoList, comment, mapUI, textImgLive, vote) {
    'use strict'
    console.log('main-views :: cross_v9.5');
    var buildFunc = {
        'img': image,
        'imgLogo': image,
        'tabs': tabs,
        'text': text,
        'textDemo': textDemo,
        'videos': video,
        'videoList': videoList,
        'textImgLive': textImgLive,
        'comment': comment,
        'map': mapUI,
        'sharebtn': sharebtn,
        'downLoadNewsapp': download,
        'vote': vote
    };
    var page = {
        init: function (data, callback) {
            var _this = this;
            $(".loadPage").hide();
            $(".layout").show();
            $(".layout").css({
                'transform': '',
                'transform-origin': '',
                '-webkit-transform': '',
                '-webkit-transform-origin': ''
            });
            _this.showContent(data);
            _this.active();
            if (callback) {
                callback();
            }

            if (data.zhiding) {
                var zhiding = data.zhiding;
                var scene = '';
                window.data === undefined ? scene = "edit" : scene = "client";
                if (scene == "edit") {
                    if (zhiding == 'true') {

                        this.zhidingView(data, 'fixedInEdit');

                    } else {
                        $('.autoinner').css({ 'paddingTop': 0 })
                        $('.mod_player').css('top', 'auto');
                        if ($(".mod_player>div:last-child").is(".mod_bar")) {
                            $(".danmaku-input-bar .open-danmaku").hide();
                        } else {
                            $(".danmaku-input-bar .open-danmaku").show();
                        }

                    }
                } else if (scene == "client") {
                    if (zhiding == 'true') {

                        this.zhidingView(data, 'fixed');

                    } else {
                        $('.autoinner').css({ 'paddingTop': 0 });
                        $('.mod_player').css('top', 'auto');
                        $('.danmaku-input-bar').css({ 'top': 'auto' });
                        if ($(".mod_player>div:last-child").is(".mod_bar")) {
                            $(".danmaku-input-bar .open-danmaku").hide();
                        } else {
                            $(".danmaku-input-bar .open-danmaku").show();
                        }
                    }
                }

            }
            typeof (qqnewsDown) != "undefined" && qqnewsDown.init();

        },
        zhidingView: function (data, classNames) {
            var vH = $('.autoinner').width() / (16 / 9);
            var tab = $('.autoinner .tab-bar');
            var pTop = 0;
            $('.mod_player').addClass(classNames).css('top', 0);
            if (data.style == 'style1' || data.style == 'style2') {

                if (data.contents[0].danmaku && data.contents[0].danmaku.open == 'true') {
                    if ($(".mod_player>div:last-child").is(".mod_bar")) {
                        $(".danmaku-input-bar .open-danmaku").hide();
                        $(".danmaku-input-bar").addClass(classNames).css({ 'top': (vH + 40) + 'px' });
                        $(".autoinner").css({ 'paddingTop': (vH + 80) + 'px' });
                        if ($(".danmaku-input-bar").next().is('.tab-bar')) {
                            tab.addClass(classNames).css('top', (vH + 80) + 'px');
                            pTop += tab[0].offsetHeight;
                            pTop += parseInt(tab.css('margin-top')) + parseInt(tab.css('margin-bottom'));
                            $('.autoinner').css({ 'paddingTop': (vH + pTop + 80) + 'px' });
                        }
                    } else {
                        $(".danmaku-input-bar .open-danmaku").show();
                        $(".danmaku-input-bar").addClass(classNames).css({ 'top': (vH - 1) + 'px' });
                        $(".autoinner").css({ 'paddingTop': (vH + 39) + 'px' });
                        if ($(".danmaku-input-bar").next().is('.tab-bar')) {
                            tab.addClass(classNames).css('top', (vH + 39) + 'px');
                            pTop += tab[0].offsetHeight;
                            pTop += parseInt(tab.css('margin-top')) + parseInt(tab.css('margin-bottom'));
                            $('.autoinner').css({ 'paddingTop': (vH + pTop + 39) + 'px' });
                        }
                    }

                } else {
                    $(".danmaku-input-bar .open-danmaku").show();
                    if ($(".mod_player>div:last-child").is(".mod_bar")) {
                        $(".autoinner").css({ 'paddingTop': (vH + 39) + 'px' });
                        if ($(".mod_player").next().is('.tab-bar')) {
                            tab.addClass(classNames).css('top', (vH + 39) + 'px');
                            pTop += tab[0].offsetHeight;
                            pTop += parseInt(tab.css('margin-top')) + parseInt(tab.css('margin-bottom'));
                            $('.autoinner').css({ 'paddingTop': (vH + pTop + 39) + 'px' });
                        }
                    } else {
                        $(".autoinner").css({ 'paddingTop': (vH - 1) + 'px' });
                        if ($(".mod_player").next().is('.tab-bar')) {
                            tab.addClass(classNames).css('top', (vH - 1) + 'px');
                            pTop += tab[0].offsetHeight;
                            pTop += parseInt(tab.css('margin-top')) + parseInt(tab.css('margin-bottom'));
                            $('.autoinner').css({ 'paddingTop': (vH + pTop - 1) + 'px' });
                        }
                    }

                }
            } else {
                $(".danmaku-input-bar .open-danmaku").show();
                if (data.contents[0].danmaku && data.contents[0].danmaku.open == 'true') {

                    $('.danmaku-input-bar').addClass(classNames).css({ 'top': vH - 1 });
                    $(".autoinner").css({ 'paddingTop': (vH + 39) + "px" });
                    if ($(".danmaku-input-bar").next().is('.tab-bar')) {
                        tab.addClass(classNames).css('top', (vH + 39) + 'px');
                        pTop += tab[0].offsetHeight;
                        pTop += parseInt(tab.css('margin-top')) + parseInt(tab.css('margin-bottom'));
                        $('.autoinner').css({ 'paddingTop': (vH + pTop + 39) + 'px' });
                    }
                } else {

                    $(".autoinner").css({ 'paddingTop': (vH - 1) + "px" });
                    if ($(".mod_player").next().is('.tab-bar')) {
                        tab.addClass(classNames).css('top', (vH - 1) + 'px');
                        pTop += tab[0].offsetHeight;
                        pTop += parseInt(tab.css('margin-top')) + parseInt(tab.css('margin-bottom'));
                        $('.autoinner').css({ 'paddingTop': (vH + pTop - 1) + 'px' });
                    }
                }

            }
        },
        showContent: function (data) {
            var _this = this;
            var h = '';
            var $wrap = $(".layout .autoinner");
            $wrap.html("");
            $(".layout").css({
                "background-color": data.background_color,
                "background-image": data.background_image != "none" ? "url(" + data.background_image + ")" : "none",
                "background-size": "100%"
            });
            //控制样式

            $(".layout").attr("class", "layout " + data.style);
            var c = data.contents;
            for (var k = 0; k < c.length; k++) {
                buildFunc[c[k].type](c[k], $wrap)
            };
        },
        active: function () {
            var _this = this;
            $(".js-share").off().on("click", function () {
                shareQQNews();
            });
        }
    }
    return page
})
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('view/_qqnewslite/anghost-jsb.umd',['exports'], factory) :
  (global = global || self, factory(global.anghost_jsb = {}));
}(this, function (exports) { 'use strict';

  /**
   * 判断是否是Function
   *
   * @example
   *  isFunction(function () {})    // true
   *
   * @export
   * @param {any} val 变量
   * @returns {boolean} true为是函数，否则不是函数
   */
  function isFunction(val) {
    return {}.toString.call(val) === '[object Function]';
  }
  /**
   * 判断是否是Object
   *
   * @example
   *  isObject({})    // true
   *
   * @export
   * @param {any} val 变量
   * @returns {boolean}
   */

  function isObject(val) {
    return {}.toString.call(val) === '[object Object]';
  }
  /**
   * 判断是否是数组
   *
   * @example
   *  isArray([])     // true
   *
   * @export
   * @param {any} val 变量
   * @returns {boolean}
   */

  function isArray(val) {
    return {}.toString.call(val) === '[object Array]';
  }

  /**
   * 管理事件的注册和触发
   *
   * @class EventEmitter 管理事件的注册和触发
   * @example
   *  var ee = new EventEmitter()
   *  function log (arg) {
   *    console.log(arg)
   *  }
   *  ee.on('log', log, window)
   *  ee.emit('log', 'i am a log') // i am a log
   *  ee.off('log')
   *  ee.emit('log', 'i am a log too') // undefined
   */

  var EventEmitter =
  /*#__PURE__*/
  function () {
    function EventEmitter() {
      /** @type {object} */
      this.events = {};
    }
    /**
     * 给指定的事件添加监听器函数
     * 不会重复添加已经存在的事件
     *
     * @param {string} type 要添加到监听器中的事件名称
     * @param {function} fn 监听的时间函数
     * @param {object} context 事件所处的上下文环境
     * @return {object} 当前EventEmitter实例对象链
     */


    var _proto = EventEmitter.prototype;

    _proto.on = function on(type, fn, context) {
      if (typeof fn !== 'function') throw new TypeError('The listener must be a function');
      var item = [context, fn];

      if (isArray(this.events[type])) {
        this.events[type].push(item);
      } else {
        this.events[type] = [item];
      }

      return this;
    }
    /**
     * 从监听器中删除指定的监听事件
     *
     * @param {string} type 要从监听器中删除的事件名称
     * @param {object} context 事件所处的上下文环境
     * @return {object} 当前EventEmitter实例对象链
     */
    ;

    _proto.off = function off(type, context) {
      var evts = this.events[type];

      if (isArray(evts)) {
        delete this.events[type];
      }

      return this;
    }
    /**
     * 从监听器中删除所有的监听事件
     *
     * @return {object} 当前EventEmitter实例对象链
     */
    ;

    _proto.offAll = function offAll() {
      this.events = {};
      return this;
    }
    /**
     * 触发事件
     *
     * @param {string} type 监听器要触发的的事件名称
     * @param  {...any} args 给要触发的事件函数传递的参数
     * @return {object} 当前EventEmitter实例对象链
     */
    ;

    _proto.emit = function emit(type) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var evts = this.events[type];

      if (isArray(evts)) {
        evts.forEach(function (item) {
          item[1].apply(item[0], args);
        });
      }

      return this;
    }
    /**
     * 给指定的事件添加一次监听函数
     *
     * @param {string} type 要添加到监听器中的事件名称
     * @param {function} fn 监听的时间函数
     * @param {object} context 事件所处的上下文环境
     * @return {object} 当前EventEmitter实例对象链
     */
    ;

    _proto.once = function once(type, fn, context) {
      this.on(type, function handler() {
        this.off(type, context);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        fn.apply(context, args);
      }.bind(this), context);
      return this;
    };

    return EventEmitter;
  }();

  var ENGINE_REG = {
    EdgeHTML: /windows.+\sedge\/([\w\.]+)/i,
    Blink: /webkit\/537\.36.+chrome\/(?!27)/i,
    Presto: /(presto)\/([\w\.]+)/i,
    Webkit: /(webkit)\/([\w\.]+)/i,
    Trident: /(trident)\/([\w\.]+)/i,
    Khtml: /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
    Gecko: /rv\:([\w\.]{1,9}).+gecko/i
  };
  var OS_REG = {
    Android: /(android)\s([\d\.]+)/i,
    iOS: /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
    Windows: /(Windows\s+\w+)?\s+?(\d+\.\d+)/i,
    MacOS: /(mac\sos\sx)\s?([\w\s\.]*)/i
  };
  var BROWSER_REG = {
    QQ: /(QQ)\/([\d\.]+)/i,
    WeChat: /micromessenger\/([\w\.]+)/i,
    qqnews: /(qqnews)\/([\w\.]+)/i,
    qqnewslite: /(qqnewslite)\/([\w\.]+)/i,
    QQVideo: /(qqlivebrowser)\/([\w\.]+)/i,
    QQMusic: /(qqmusic)\/([\w\.]+)/i,
    QNReading: /(qnreading)\/([\w\.]+)/i,
    kameng: /(kameng)\/([\w\.]+)/i,
    BaiduBrowser: /baidubrowser[\/\s]?([\w\.]+)/i,
    QQBrowser: /m?(qqbrowser)[\/\s]?([\w\.]+)/i,
    UCBrowser: /(?:ucbrowser)\/([\d\.]+)/i,
    Safari: /version\/([\d\.]+).*safari/i,
    Edge: /(edge|edgios|edga)\/(\d+?[\w\.]+)/i,
    Maxthon: /(maxthon)[\/\s]?([\w\.]*)/i,
    IE11: /trident.+rv[:\s]([\w\.]+).+like\sgecko/i,
    IE: /msie\s([\d\.]+)/i,
    Chrome: /chrome\/([\d\.]+)/i,
    Firefox: /(firefox)\/([\w\.-]+)$/i,
    Opera: /(?:opera|opr|opios).([\d\.]+)/i
    /**
     * userAgent解析
     * @class UAParser
     *
     * @example
     *  var uaparser = new UAParser()
     *  uaparser.getUA()
     *  var ua = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36'
     *  uaparser.setUA(ua).isIOS() // false
     */

  };

  var UAParser =
  /*#__PURE__*/
  function () {
    function UAParser(params) {
      /** @type {string} */
      this.uagent = window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : '';
    }
    /**
     * 获取userAgent
     * @return {string}
     */


    var _proto = UAParser.prototype;

    _proto.getUA = function getUA() {
      return this.uagent;
    }
    /**
     * 设置userAgent
     * @param {string} ua userAgent
     */
    ;

    _proto.setUA = function setUA(ua) {
      this.uagent = ua;
      return this;
    }
    /**
     * 通过客户端注入的webview的useragent来判断是否是在对应App中
     * @param {RegExp} reg 判断的正则表达式
     * @return {boolean} true在app内，false不在
     */
    ;

    _proto.isTheApp = function isTheApp(reg) {
      return reg.test(this.uagent);
    }
    /**
     * 判断是否是移动端
     * @return {boolean} true - mobile; false - pc
     */
    ;

    _proto.isMobile = function isMobile() {
      return /(AppleWebKit.*Mobile.*|mobile|android|iphone|ipad|blackberry|hp-tablet|symbian|phone|windows\sphone)/i.test(this.uagent);
    }
    /**
     * 是否是iOS系统
     */
    ;

    _proto.isIOS = function isIOS() {
      return !!this.getOS().iOS;
    }
    /**
     * 是否是Android系统
     */
    ;

    _proto.isAndroid = function isAndroid() {
      return !!this.getOS().Android;
    }
    /**
     * 获取映射关系
     * @param {object} regs 正则表达式
     */
    ;

    _proto.mapper = function mapper(regs) {
      var info = {
        name: undefined,
        version: undefined,
        alias: undefined
      };

      if (isObject(regs)) {
        for (var key in regs) {
          var matches = this.uagent.match(regs[key]);

          if (matches) {
            info[key] = true;

            if (isArray(matches) && matches.length > 0) {
              info.alias = key;

              if (matches.length === 2) {
                info.name = key;
                info.version = matches[1] ? matches[1].replace(/_/g, '.') : undefined;
              } else if (matches.length === 3) {
                info.name = matches[1] ? matches[1] : undefined;
                info.version = matches[2] ? matches[2].replace(/_/g, '.') : undefined;
              }
            } else {
              info.version = undefined;
            }

            break;
          }
        }
      }

      return info;
    }
    /**
     * 获取浏览器版本
     *
     * @return {object}
     */
    ;

    _proto.getBrowser = function getBrowser() {
      return this.mapper(BROWSER_REG);
    }
    /**
     * 获取系统信息
     *
     * @return {object}
     */
    ;

    _proto.getOS = function getOS() {
      return this.mapper(OS_REG);
    }
    /**
     * 获取浏览器渲染引擎信息
     *
     * @return {object}
     */
    ;

    _proto.getEngine = function getEngine() {
      return this.mapper(ENGINE_REG);
    }
    /**
     * 获取浏览器信息
     *
     * @return {object}
     */
    ;

    _proto.getResult = function getResult() {
      return {
        ua: this.uagent,
        browser: this.getBrowser(),
        os: this.getOS(),
        engine: this.getEngine()
      };
    };

    return UAParser;
  }();

  /**
   * 获取当前请求的链接对应的参数值
   *
   * @export
   * @param {string} name 参数名
   * @param {string} url 要匹配的URL链接 [可选]
   * @returns {string|null}
   */
  /**
   * 加载脚本文件
   *
   * @export
   * @param {string} url 请求的url
   * @param {function} cb 加载完成之后的成功的回调函数
   * @param {function} fail 加载完成之后失败的回调函数
   * @param {string} [charset='utf-8'] 加载的文件的字符编码，默认值为‘utf-8’
   */

  function loadScript(url, cb, fail, charset) {
    if (charset === void 0) {
      charset = 'utf-8';
    }

    var head = document.getElementsByTagName('body')[0];
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);
    js.setAttribute('charset', charset);
    head.appendChild(js);

    if (document.all) {
      js.onreadystatechange = function () {
        if (js.readyState === 'load' || js.readyState === 'complete') {
          if (typeof cb === 'function') {
            cb(js);
          }
        }
      };
    } else {
      js.onload = function () {
        if (typeof cb === 'function') {
          cb(js);
        }
      };
    }

    js.onerror = function () {
      if (typeof fail === 'function') {
        fail(js);
      }
    };
  }

  var $uaparser = new UAParser();
  var QQNEWS_JSSDK = '//mat1.gtimg.com/www/js/newsapp/jsapi/news.js?_tsid=1';
  window.__newsCallbackArr = []; // 存储回调函数数组

  /**
   * 腾讯新闻JSAPI文档
   * iOS：http://newsapi.webdev.com/jsApi
   * Android：http://newsapi.webdev.com/jsApi?type=asyncall#
   * window.TencentNews.injectionComplete = true 表示已经可以使用jsapi中的方法了
   *
   * sdk就绪函数
   * @param {function} callback 回调函数
   */

  var SDKReady = function SDKReady(callback) {
    if (window.TencentNews && window.TencentNews.injectionComplete) {
      if (isFunction(callback)) callback();
      return;
    }

    var check = function check() {
      console.info('tencentnews: sdk ready');
      if (window.TencentNews) window.TencentNews.injectionComplete = true;

      window.__newsCallbackArr.forEach(function (cb) {
        if (isFunction(cb)) cb();
      });

      window.__newsCallbackArr = [];
    }; // 防止多次请求


    if (window.__newsCallbackArr.length > 0) {
      window.__newsCallbackArr.push(callback);

      return;
    }

    window.__newsCallbackArr.push(callback);

    if ($uaparser.isIOS()) {
      window.document.addEventListener('TencentNewsJSInjectionComplete', function () {
        check();
      });
    } else if ($uaparser.isAndroid()) {
      if (!window.TencentNews) {
        loadScript(QQNEWS_JSSDK, function () {
          check();
        });
      }
    }
  };
  /**
   * 统一调用的方法
   * @param {string} fnName jsapi中的方法名
   * @param {function} callback 回调函数
   */


  var comLaunch = function comLaunch(fnName, callback) {
    SDKReady(function () {
      if (window.TencentNews && window.TencentNews[fnName]) {
        if (isFunction(callback)) callback();
      } else {
        console.error('tencentnews: do not register the api，', fnName);
      }
    });
  };
  /**
   * 在webview中跳转到任意一个文章类型
   * @param {object} newsInfo 文章信息
   * @param {string} newsInfo.id 文章ID
   * @param {string} newsInfo.from 来源
   * @param {string} newsInfo.iscomment 是否跳转到评论页面（'1'跳转，'0'不跳转）
   */

  var showNews = function showNews(newsInfo) {
    comLaunch('showNews', function () {
      if ($uaparser.isAndroid()) {
        window.TencentNews.showNews(newsInfo.id, newsInfo.from || '');
      } else {
        window.TencentNews.showNews(newsInfo);
      }
    });
  };
  /**
   * 客户端POST请求
   *
   * @param {string} url 请求链接
   * @param {object} data 请求参数
   */

  window.__t__request__counter = 0;

  /**
   * QQ: http://mqq.oa.com/api.html#js-mqq-app-isAppInstalled
   * 腾讯新闻
   *    iOS：http://newsapi.webdev.com/jsApi
   *    Android：http://newsapi.webdev.com/jsApi?type=asyncall#
   * QQMusic: http://y.qq.com/m/api/api.html
   * 微信：http://km.oa.com/group/700/articles/show/172714
   */
  var $uaparser$1 = new UAParser(); // 判断是不是WKWebView，如果不是就按照UIWebView处理

  var isWKWebView = /Core\/WKWebView/i.test($uaparser$1.getUA()); // 根据内核不同，需要引入不同的JS SDK
  // 文档里没有说明，对接人@yussicahe
  // QQ JSSdk 链接

  var QQ_JSSDK = isWKWebView ? '//open.mobile.qq.com/sdk/qqapi.wk.js' : '//open.mobile.qq.com/sdk/qqapi.js?_bid=152';
  var READING_JSSDK = '//mat1.gtimg.com/www/reading/android/js/jsapi/jsapi.js'; // 下载状态 - QQ/Wechat Android客户端才有

  var DOWNLOAD_STATE = {
    start: 'downloadStart',
    // 安装开始方法
    process: 'downloadProcess',
    // 按照进度方法
    succss: 'downloadSuccess',
    // 安装成功方法
    fail: 'downloadFail' // 安装失败方法

  };
  var INSTALL_STATE = {
    start: 'installStart',
    // 开始安装
    finish: 'installFinish' // 完成安装

    /**
      * 和当前版本比较版本号大小
      * @param {string} ver2 版本号 - 当前版本
      * @param {string} ver1 版本号 - 要比较的版本号
     */

  };
  function compareVer(ver1, ver2) {
    ver1 = ver1.split('.');
    ver2 = ver2.split('.');
    var a = parseInt(ver1.shift());
    var b = parseInt(ver2.shift());

    if (a < b) {
      return false;
    } else if (a === b) {
      if (ver1.length > 0 && ver2.length > 0) {
        return compareVer(ver1.join('.'), ver2.join('.'));
      } else if (ver1.length > 0 && ver2.length === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } // 是否是新版本的微信

  function isNewWeixin(version) {
    var ua = navigator.userAgent.toLowerCase();
    var flag = false;

    if ($uaparser$1.getBrowser().WeChat) {
      /* eslint-disable */
      var verStr = ua.match(/micromessenger\/([\d\.]+)/)[1];
      if (compareVer(verStr, version)) flag = true;
    }

    return flag;
  }
  /**
   * 下载或打开应用
   */


  var AppDownloadOrOpen =
  /*#__PURE__*/
  function () {
    /**
     * @param {object} params 初始化参数
     * @param {string} params.qqAppId 应用中心使用开平appid
     * @param {string} params.wxopenAppId 要拉起的移动应用的 appid，注册在 open.weixin.qq.com 网站上
     * @param {string} params.packageName APP的包名
     * @param {string} params.appName APP名称
     * @param {string} params.openUrl 打开APP的链接，schema
     * @param {string} params.downloadUrl android应用下载链接
     * @param {string} params.downloadLogo android应用下载时显示的logo
     * @param {string} params.md5 微信里下载android应用的MD5
     * @param {string} params.appleStoreId iOS系统里跳转到app store的ID
     * @param {string} params.appleUrl 苹果应用初始链接，默认：http://itunes.apple.com/cn/app/id
     */
    function AppDownloadOrOpen(params) {
      this.config = Object.assign({}, params);
      this.config.appleUrl = this.config.appleUrl || 'http://itunes.apple.com/cn/app/id';
      this.config.ituneUrl = this.config.appleUrl + this.config.appleStoreId;
      this.event = new EventEmitter();
      this.browser = $uaparser$1.getBrowser();
    }

    var _proto = AppDownloadOrOpen.prototype;

    _proto.on = function on(type, callback) {
      this.event.on(type, callback, this);
      return this;
    } // 在新闻客户端内打开文章
    ;

    _proto.openArticleInNews = function openArticleInNews() {
      var newsid = this.config.openUrl.match(/nm=(.*?)(&|$)/);

      if (newsid && newsid[1]) {
        showNews({
          id: newsid[1],
          from: '',
          iscomment: ''
        });
      } else {
        this.openUrl();
      }
    };

    _proto.handleInNews = function handleInNews() {
      var _this = this;

      if (this.browser.qqnews && this.config.openUrl.startsWith('qqnews://') || this.browser.qqnewslite && this.config.openUrl.startsWith('qqnewslite://') || this.config.openUrl.startsWith('http://') || this.config.openUrl.startsWith('https://')) {
        this.openArticleInNews();
        return;
      }

      window['checkCanOpenNativeUrlCallBack'] = function (res) {
        if (res) {
          // 已下载
          window.TencentNews.openApp(_this.config.openUrl, _this.config.packageName);
        } else {
          // 没有下载
          window.TencentNews.downloadApp(_this.config.downloadUrl, _this.config.packageName, _this.config.appName);
        }
      };

      comLaunch('checkCanOpenNativeUrl', function () {
        if ($uaparser$1.isAndroid()) {
          // android
          window.TencentNews.checkCanOpenNativeUrl(_this.config.packageName, 'checkCanOpenNativeUrlCallBack');
        } else if ($uaparser$1.isIOS()) {
          // ios
          window.TencentNews.checkCanOpenNativeUrl(_this.config.openUrl, function (url, result, userinfo) {
            if (result) {
              // 已下载
              window.TencentNews.openNativeUrl(_this.config.openUrl, function (url, success, userInfo) {}, null);
            } else {
              // 没有下载
              window.TencentNews.downloadAppInNative(_this.config.appleStoreId, _this.config.downloadUrl, function (durl, dresult, duserInfo) {}, null);
            }
          }, null);
        }
      });
    };

    _proto.checkInQQ = function checkInQQ(callback) {
      var _this2 = this;

      var check = function check() {
        var identifier = $uaparser$1.isAndroid() ? _this2.config.packageName : _this2.config.openUrl;
        window.mqq.app.isAppInstalled(identifier, function (res) {
          var status = false;
          if (res) status = true;
          if (isFunction(callback)) callback(status);
        });
      };

      if (window.mqq && window.mqq.app) {
        check();
      } else {
        loadScript(QQ_JSSDK, function () {
          check();
        });
      }
    };

    _proto.handleInQQ = function handleInQQ() {
      var _this3 = this;

      var check = function check() {
        _this3.checkInQQ(function (status) {
          try {
            if (status) {
              // 已下载
              _this3.openUrl();
            } else {
              // 未下载
              if ($uaparser$1.isIOS()) {
                window.location.href = _this3.config.ituneUrl;
                return;
              }

              _this3.event.emit(DOWNLOAD_STATE.start);

              var downloadConfig = {
                appid: _this3.config.qqAppId,
                // 应用中心使用开平appid
                url: _this3.config.downloadUrl,
                // 下载地址
                packageName: _this3.config.packageName,
                // 包名
                actionCode: 2,
                // 2下载
                via: 'ANDROIDQQ.TXNEWS',
                // 用于上报罗盘
                appName: _this3.config.appName
              };

              _this3.qqDownloadApp(downloadConfig);
            }
          } catch (error) {
            console.error(error);
          }
        });
      };

      if (window.mqq && window.mqq.app) {
        check();
      } else {
        loadScript(QQ_JSSDK, function () {
          check();
        });
      }
    };

    _proto.qqDownloadApp = function qqDownloadApp(config) {
      var _this4 = this;

      window.mqq.app.downloadApp(config, function (data) {
        try {
          if (data.state === 4) {
            data.pro = 100;

            _this4.event.emit(DOWNLOAD_STATE.success);

            config.actionCode = 5;

            _this4.event.emit(INSTALL_STATE.start);

            _this4.qqDownloadApp(config);
          }

          if (data.state === 6) {
            _this4.event.emit(INSTALL_STATE.finish);
          } else if (data.state <= 4) {
            _this4.event.emit(DOWNLOAD_STATE.process, data.pro);
          }
        } catch (error) {
          console.error(error);
        }
      });
    };

    _proto.checkInWx = function checkInWx(callback) {
      var _this5 = this;

      var check = function check() {
        // 判断app是否已经安装，在 iOS 9 及以上系统中无效
        WeixinJSBridge.invoke('getInstallState', {
          packageName: _this5.config.packageName,
          // android 必填
          packageUrl: _this5.config.openUrl // ios 必填

        }, function (res) {
          var status = false;

          if (res.err_msg.indexOf('yes') > -1) {
            status = true;
          }

          if (isFunction(callback)) callback(status);
        });
        WeixinJSBridge.on('wxdownload:state_change', function (res) {
          console.log('wxdownload:state_change ', res);
          if (res.state === 'downloading') _this5.event.emit(DOWNLOAD_STATE.process);
          if (res.state === 'download_fail') _this5.event.emit(DOWNLOAD_STATE.fail);
          if (res.state === 'download_succ') _this5.event.emit(DOWNLOAD_STATE.succss);
        });
      };

      if (!window.WeixinJSBridge) {
        document.addEventListener('WeixinJSBridgeReady', function () {
          check();
        });
      } else {
        check();
      }
    };

    _proto.openInWx = function openInWx() {
      var _this6 = this;

      if (isNewWeixin('6.5.16')) {
        setTimeout(function () {
          var param = _this6.config.openUrl.split('://')[1] ? _this6.config.openUrl.split('://')[1] : '';
          var launchConfig = {
            // 要拉起的移动应用的 appid，注册在 open.weixin.qq.com 网站上
            'appID': _this6.config.wxopenAppId,
            // iOS使用此参数拉起第三方APP
            'parameter': param,
            // 自定义 scheme URL 中的 path 部分
            // 该参数仅 Android 使用，对应 Android 微信 opensdk 中的 extInfo
            'extInfo': _this6.config.openUrl
          };
          console.log('-----  launch config -----');
          console.log(launchConfig); // 微信内 H5 唤起外部客户端 ；只有大于6.5.16版本的微信才能调用launchApplication

          WeixinJSBridge.invoke('launchApplication', launchConfig, function (res) {
            console.log('launchApplication: ', res);

            if (res.err_msg === 'launchApplication:fail') {
              if ($uaparser$1.isAndroid()) window.location.href = _this6.config.downloadUrl;else window.location.href = _this6.config.ituneUrl;
            }
          });
        }, 100);
      } else {
        this.openUrl();
      }
    }
    /**
     * 微信里
     */
    ;

    _proto.handleInWX = function handleInWX() {
      var _this7 = this;

      var installOrOpen = function installOrOpen(status) {
        if (status) {
          _this7.openInWx();
        } else {
          WeixinJSBridge.invoke('addDownloadTask', {
            task_name: _this7.config.appName,
            // 下载任务的名称
            thumb_url: _this7.config.downloadLogo,
            task_url: _this7.config.downloadUrl,
            // 下载APP的URL
            file_md5: _this7.config.md5 // 下载APP的MD5

          }, function (res) {});
        }
      };

      if (!window.WeixinJSBridge) {
        document.addEventListener('WeixinJSBridgeReady', function () {
          if ($uaparser$1.isIOS()) {
            _this7.openInWx();

            return;
          }

          _this7.checkInWx(installOrOpen);
        });
      } else {
        if ($uaparser$1.isIOS()) {
          this.openInWx();
          return;
        }

        this.checkInWx(installOrOpen);
      }
    };

    _proto.handleInQQMusic = function handleInQQMusic() {
      if ($uaparser$1.isIOS()) {
        this.openUrl();
      } else {
        window.location.href = "qqmusic://qq.com/app/downloadApp?p={\n        \"appid\":" + this.config.qqAppId + ",\n        \"url\":\"" + this.config.downloadUrl + "\",\n        \"packageName\":" + this.config.packageName + ",\n        \"icon\":\"" + this.config.downloadLogo + "\",\n        \"multiTask\":\"1\",\n        \"actionCode\":\"3\",\n        \"appName\":" + this.config.appName + "}";
      }
    };

    _proto.checkInReading = function checkInReading() {
      window['checkCanOpenNativeUrlCallBack'] = function (re) {
        if (!re) {
          if (window.TencentReading && window.TencentReading.downloadApp) {
            window.TencentReading.downloadApp(this.config.downloadUrl, this.config.packageName, this.config.appName);
          }
        } else {
          if (window.TencentReading && window.TencentReading.openApp) {
            window.TencentReading.openApp(this.config.openUrl, this.config.packageName);
          }
        }
      }; // 检查是否安装应用


      if (window.TencentReading && window.TencentReading.checkCanOpenNativeUrl) {
        window.TencentReading.checkCanOpenNativeUrl(this.config.packageName, 'checkCanOpenNativeUrlCallBack');
      }
    } // 天天快报
    ;

    _proto.handleInReading = function handleInReading() {
      if ($uaparser$1.isIOS()) {
        if (window.TencentReading && window.TencentReading.openNativeUrl) {
          window.TencentReading.openNativeUrl(this.config.openUrl, function (url, res, userInfo) {
            if (!res) this.openUrl();
          }, null);
        }
      } else {
        if (window.TencentReading && window.TencentReading.checkCanOpenNativeUrl) {
          checkInReading();
          return;
        }

        loadScript(READING_JSSDK, function () {
          checkInReading();
        });
      }
    };

    _proto.openUrl = function openUrl() {
      window.location.href = this.config.openUrl;
    }
    /**
     * 打开或安装第三方APP
     * @param {string} openUrl 打开第三方APP的schema
     */
    ;

    _proto.handleDOpen = function handleDOpen(openUrl) {
      if (openUrl) this.config.openUrl = openUrl;
      if (this.browser.qqnews || this.browser.qqnewslite) this.handleInNews();else if (this.browser.WeChat) this.handleInWX();else if (this.browser.QQ) this.handleInQQ();else if (this.browser.QQMusic) this.handleInQQMusic();else if (this.browser.QNReading) this.handleInReading();else {
        if ($uaparser$1.isAndroid()) window.location.href = this.config.downloadUrl;else this.openUrl();
      }
    }
    /**
     * 检查第三方app是否已经安装 - 只有微信和QQ
     * @param {function} callback 回调函数
     */
    ;

    _proto.checkAppInstalled = function checkAppInstalled(callback) {
      if (this.browser.QQ) this.checkInQQ(callback);else if (this.browser.WeChat) this.checkInWx(callback);else {
        if (isFunction(callback)) callback();
      }
    };

    return AppDownloadOrOpen;
  }();

  exports.compareVer = compareVer;
  exports.default = AppDownloadOrOpen;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

define('view/_qqnewslite/qqnewslite',['./anghost-jsb.umd'], function (AppDownloadOrOpen) {
  const version = 'Version 1.0.4.2';

  /** 拉起/拉新 Scheme*/
  const qqnewslite = {
    name: 'qqnewslite : ',
    isQQNews: !!navigator.userAgent.match(/qqnews\/([\d.]+)/),
    isQQNewsLite: !!navigator.userAgent.match(/qqnewslite\/([\d.]+)/),
    isWeiXin: !!navigator.userAgent.match(/MicroMessenger\/([\d.]+)/),
    isQQNLInstalled: false,
    init: function () {
      console.debug(version + ', isQQNewsLite:' + this.isQQNewsLite)
      /**
       * special to run inner :  qqnewslite or qqnews
       * hide : comment input 
       */
      if (this.isQQNewsLite || this.isQQNews) {
        // this.testCase()
        this.hideCommentInput()
        return false
      }
      //
      if (!this.isContinue()) { return false }
      /** 
       * special to not run inner :  qqnewslite or qqnews
       * show : button of scheme open qqnewslite in top of site
       **/
      this.renderHtml()
      this.bindEvent()
    },

    /** hide : comment input */
    hideCommentInput: function () {
      // trace(' addComment : ' + $('#addComment').length)
      if ($('#addComment').length === 1) {
        // console.log('hide comment input');
        var commentInputWrapper = $('#addComment').parent()
        commentInputWrapper.empty()
      }
    },

    testCase: function () {
      console.debug(version)
      // 线上测试 url : https://news.qq.com/cross/20191015/Ob2m9D22.html?app=newslite&cmsid=EHH2019101500342600&
      if (!testcaseObj.isMatchTestUrl('Ob2m9D22')) { return false }
      //
      const self = this
      window["winIsQQLoginCallback"] = function (isLogin) {
        alert(isLogin)
      }
      if (host.system() === 'ios') {
        trace(version + ': ios')
        /* if (window.TencentNews && window.TencentNews.isQQLogin) {
          window.TencentNews.isQQLogin(self.callbackIsLogin);
        } else {
        } */
        if (window.TencentNews && window.TencentNews.isWeixinLogin) {
          window.TencentNews.isWeixinLogin("winIsQQLoginCallback");
        } else {
          alert('none of window.TencentNews.isWeixinLogin')
        }
      } else {
        trace(version + ': android')
        if (window.TencentNews && window.TencentNews.isQQLogin) {
          window.TencentNews.isQQLogin("winIsQQLoginCallback");
        } else {
          alert('none of window.TencentNews.isWeixinLogin')
        }
        //
      }
      //
      tracePanel.on('click', function (event) {
        alert('click tracePanel')
        if (window.TencentNews && window.TencentNews.showNativeLoginWithType) {
          // alert('window.TencentNews')
          window.TencentNews.showNativeLoginWithType("qqorweixin", 'showNativeLoginWithTypeCallBack', "自定义参数");
        } else {
          alert('none of showNativeLoginWithType')
        }
      })
    },

    callbackIsLogin: function (isLogin) {
      if (isLogin) {
        // result - msg : access_token : B9ACE1449744A241517F4AEF421307D0  open_openid:A4BF1412C9749C84867D8BAD7B93B622  open_appid:101505099
        var msg = ' qq-access_token : ' + $.fn.cookie("open_access_token") + ' open_openid:' + $.fn.cookie("open_openid") + ' open_appid:' + $.fn.cookie("open_appid")
        trace(version + isLogin + msg);
        var msg = ' wx-access_token : ' + $.fn.cookie("access_token") + ' open_openid:' + $.fn.cookie("openid") + ' open_appid:' + $.fn.cookie("appid")
        trace(version + ' isLogin :' + isLogin + msg);
        //
        var zeptoAjaxPost = function () {
          $('.debug_panel').on('click', function (event) {
            cm = '非常期待啊，非常期待啊！' + version;
            var data = {
              targetid: '4291207328',
              type: 1,
              format: "SCRIPT",
              callback: "parent.topCallback",
              content: cm,
              _method: "put",
              logintype: 11,
              open_appid: $.fn.cookie("open_appid"),
              open_openid: $.fn.cookie("open_openid"),
              open_access_token: $.fn.cookie("open_access_token"),
              g_tk: user.gtk(),
              source: 1,
              code: 0,
              subsource: 0
            };
            //
            tool.setDebugPanelText(version + 'post:' + data.open_access_token);
            $.post('//w.coral.qq.com/article/comment', data, function (response) { })
          })
        }
        zeptoAjaxPost()
      } else {
        alert('用户没有登录')
      }
    },

    renderHtml: function () {
      var htmlTemplate = '';
      htmlTemplate = '<header class="header-bar btn-qqnewslite-scheme">';
      htmlTemplate += '<img src="//mat1.gtimg.com/www/js/news/litelogo_white.png" alt="">';
      htmlTemplate += '<span>使用腾讯新闻极速版，观看更流畅</span>';
      htmlTemplate += '</header >'
      // console.debug(this.name + ':', tool.isQQNewsLite)
      //
      $('body').append(htmlTemplate)
    },

    bindEvent: function () {
      const self = this
      //
      qnlappscheme.init()
      //
      const schemeUrl = self.getSchemeUrl()
      // console.debug(schemeUrl)
      const btnScheme = $('.btn-qqnewslite-scheme')
      btnScheme.click(function (e) {
        // console.debug(schemeUrl, qnlappscheme.dopenApp)
        qnlappscheme.dopenApp.handleDOpen(schemeUrl)
      });
    },

    // Get : QQNewsLite - Scheme
    getSchemeUrl: function () {
      //极速版分享后的 url : https://news.qq.com/cross/20190617/D5I81yO2.html?app=newslite&cmsid=EHH2019061700805100_addparams=%7B%7D&apptype=qqNews?uid=
      var url_string = window.location.href;
      var url = new URL(url_string);
      let cmsid = url.searchParams.get("cmsid");
      // console.debug('cmsid:', cmsid)
      if (cmsid && cmsid != '') {
        const endIndex = cmsid.indexOf('_addparams')
        if (endIndex > 0) {
          cmsid = cmsid.substring(0, endIndex)
        }
      } else {
        cmsid = 'EHH2019062000656600'
      }
      const schemeUrl = "qqnewslite://article_9527?nm=" + cmsid + "&from=NEWSLITE_CROSS&_addLink=1&_addparams=%7B%7D"
      return schemeUrl
    },

    //Check : 当前 URL 是否包含 app=newslite，如果是 true
    isContinue: function () {
      //https://news.qq.com/cross/20190617/D5I81yO2.html?app=newslite&cmsid=EHH2019061700805100#0
      const testUrl = 'https://news.qq.com/cross/20190617/D5I81yO2.html?app=newslite&cmsid=EHH2019061700805100'
      var url_string = window.location.href; //"http://www.example.com/t.html?app=newslite&c=m2-m3-m4-m5"; //window.location.href
      var url = new URL(url_string);
      var c = url.searchParams.get("app");
      // console.debug(c)
      if (c == 'newslite') {
        console.debug('share by ' + this.name + true)
        return true
      } else {
        return false
      }
    }
  }

  const testcaseObj = {
    isMatchTestUrl: function (url) {
      let isMatch = false
      const currUrl = window.location.href
      var nativelink = currUrl.split('/');
      const cutName = nativelink[5].split('.')[0]
      if (cutName === url) {
        isMatch = true
        console.debug('线上测试专题页')
      } else {
        if (nativelink[2] === 'localhost') {
          isMatch = true
        }
      }
      //
      return isMatch
    }
  }

  /** Button 往期回顾 */
  const qnlbtnmore = {
    showBtnMore: function () {
      // 当前 url 没有 isshowbtn=true，直接 return
      if (!this.isContinue()) { return false }
      //https://news.qq.com/cross/20190619/07OI6EI2.html?app=newslite&cmsid=EHH2019061900729200&isshowbtn=true&
      console.debug('show btn more')
      this.renderHtml()
      this.initEvent()
    },

    renderHtml: function () {
      //href="https://view.inews.qq.com/a/EHH2019062000656600?app=newslite"
      const htmlTemplate = `<a class="btn-qqnewslite-more">
          <span class="icon">
              <svg viewBox="0 0 512 512">
                  <path fill="currentColor" d="M491.318,235.318H20.682C9.26,235.318,0,244.577,0,256s9.26,20.682,20.682,20.682h470.636
              c11.423,0,20.682-9.259,20.682-20.682C512,244.578,502.741,235.318,491.318,235.318z" />
                  <path fill="currentColor" d="M491.318,78.439H20.682C9.26,78.439,0,87.699,0,99.121c0,11.422,9.26,20.682,20.682,20.682h470.636
              c11.423,0,20.682-9.26,20.682-20.682C512,87.699,502.741,78.439,491.318,78.439z" />
                  <path fill="currentColor" d="M491.318,392.197H20.682C9.26,392.197,0,401.456,0,412.879s9.26,20.682,20.682,20.682h470.636
        c11.423,0,20.682-9.259,20.682-20.682S502.741,392.197,491.318,392.197z" />
              </svg>
          </span>
          <span class="text">往期回顾</span>
      </a> `
      $('body').append(htmlTemplate)
    },

    initEvent: function () {
      //
      const btnMore = $('.btn-qqnewslite-more')
      btnMore.click(function (e) {
        const schemeUrl = 'qqnewslite://article_9527?nm=EHH2019062000656600&from=NEWSLITE_CROSS&_addLink=1&_addparams=%7B%7D'
        // console.debug(schemeUrl, qnlappscheme.dopenApp)
        qnlappscheme.dopenApp.handleDOpen(schemeUrl)
      });
    },

    isContinue: function () {
      const url_string = window.location.href
      const url = new URL(url_string)
      var c = url.searchParams.get("isshowbtn")
      if (c == 'true') { return true }
      else { return false }
    }
  }

  /** AppScheme */
  const qnlappscheme = {
    dopenApp: null,
    init: function () {
      this.dopenApp = new AppDownloadOrOpen.default({
        qqAppId: '101505099', // 应用中心使用开平appid
        wxopenAppId: 'wxda49abab5a1e0d12', // 要拉起的移动应用的 appid，注册在 open.weixin.qq.com 网站上
        packageName: 'com.tencent.news.lite', // 包名
        appName: '腾讯新闻极速版-摇钱树', // 应用名
        openUrl: 'qqnewslite://', //
        downloadUrl: 'http://dldir1.qq.com/NewsLite_apk/apk/TencentNewsLite_100898.apk', // 微信Android下载包，到时候你们可以重新要一个渠道
        downloadLogo: 'http://dldir1.qq.com/NewsLite_apk/512.png',
        md5: '', // 在微信里面md5值可以设置为空字符串
        appleStoreId: '1449467351' // appstoreID
      })
      //
      // console.debug(this.dopenApp)
    }
  }

  const tool = {
    DebugPanel: null,
    creatDebugPanelHtml: function () {
      const html = '<div class="debug_panel" style="position: fixed; top: 50px; left: 0; right: 0; bottom: 0; z-index: 9999; width: 100%; height: 100px; color: #FFFFFF !important; padding: 5px; background-color: rgba(255, 255, 255, 0.5);"></div>'
      $('body').append(html)
      this.DebugPanel = $('.debug_panel')
    },

    setDebugPanelText: function (msg) {
      if (tool.DebugPanel != null) {
        this.DebugPanel.text(msg)
      }
    }
  }

  return qqnewslite;
});
/**
 * 针对手Q环境，设置分享信息
 */
define('views/sharesetting',[], function () {
  const mqqshare = {
    /** 手Q分享设置
    * 注意：代码不能放在 share_h5.js 内，因为动态引入的 qqapi.js，会导致 `require - MISMATCHED ANONYMOUS DEFINE() MODULES` 错误 
     **/
    shareInMqq: function () {
      var intervalCheckLoadeMQQ = null;
      function loadedMqqScriptCalback () {
        if (mqq) {
          clearInterval(intervalCheckLoadeMQQ);
          // alert('mqq')
          if (shareData) {
            var shareMqqData = {
              "title": shareData.title,
              "desc": shareData.desc,
              "image_url": shareData.img,
              "share_url": window.location.href
            };
            mqq.data.setShareInfo(shareMqqData, function (res) {
              console.debug('setShareInfo:', res)
              // alert(res)
            })
          }
        }
      }
      if (extraObj.UA().qqm_android || extraObj.UA().qqm_ios) {
        var head = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=2538';
        head.appendChild(script);
        //
        intervalCheckLoadeMQQ = window.setInterval(loadedMqqScriptCalback, 500);
      }
      // console.debug('shareInMqq - 1.0.4')
    },
    UA: function () {
      var userAgent = navigator.userAgent.toLowerCase();
      return {
        qqm_android: /mqqbrowser/.test(userAgent),    //手Q Browser-Android
        qqm_ios: /qq\//.test(userAgent)               //手Q Browser-iOS
      };
    }
  }

  return mqqshare;
});
require(['views/main', 'view/_qqnewslite/qqnewslite', 'views/sharesetting'], function (page, qqNewsLite, mqqShareSetting) {
  // $.get("http://123.206.1.175:3000/addlog?title=" + document.title.replace(/\s+/g, "%20") + "&url=" + window.location.href, function (data) {
  //   console.log('data:', data)
  // });
  //* data : html 页面定义 data-global 属性
  page.init(data, function () {
    // console.log('callback')
    mqqShareSetting.shareInMqq();
    //
    extraObj.initQQNewsSpecial(qqNewsLite)
    // extraObj.shareInMqq()
  });
})

/**
 * 拓展功能
*/
var extraObj = {
  /** 极速版定制化 */
  initQQNewsSpecial: function (qqNewsLite) {
    //* 极速版：拉起 Scheme 按钮
    qqNewsLite.init()
  },
  /** 手Q分享设置
   * 注意：代码不能放在 share_h5.js 内，因为动态引入的 qqapi.js，会导致 `require - MISMATCHED ANONYMOUS DEFINE() MODULES` 错误 
   **/
  shareInMqq: function () {
    var intervalCheckLoadeMQQ = null;
    function loadedMqqScriptCalback () {
      if (mqq) {
        clearInterval(intervalCheckLoadeMQQ);
        // alert('mqq')
        if (shareData) {
          var shareMqqData = {
            "title": shareData.title,
            "desc": shareData.desc,
            "image_url": shareData.img,
            "share_url": window.location.href
          };
          mqq.data.setShareInfo(shareMqqData, function (res) {
            console.debug('setShareInfo:', res)
            // alert(res)
          })
        }
      }
    }
    if (extraObj.UA().qqm_android || extraObj.UA().qqm_ios) {
      var head = document.getElementsByTagName('body')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//pub.idqqimg.com/qqmobile/qqapi.js?_bid=2538';
      head.appendChild(script);
      //
      intervalCheckLoadeMQQ = window.setInterval(loadedMqqScriptCalback, 500);
    }
    console.debug('shareInMqq - 1.0.3')
  },
  UA: function () {
    var userAgent = navigator.userAgent.toLowerCase();
    return {
      qqm_android: /mqqbrowser/.test(userAgent),    //手Q Browser-Android
      qqm_ios: /qq\//.test(userAgent)               //手Q Browser-iOS
    };
  }
};
define("views/live", function(){});

/*  |xGv00|2419cfdde3fcb7c58852723364919e38 */