/**
 * @version 0.1 - 页卡
 * @author  jianminlu
 * @update  2013-06-19 15:23
 */
(function ($) {
    /**
     * @name    tabs        
     * @param   {Object}    
     * @type    {Object}   
     */
    $.fn.tabs = function (options) {
        var config = {
            index: 0,
            current:"current",
            type: "mouseover",
            hdItem: ".tab_hd_item",
            bdItem: ".tab_bd_item",
			isPC: true,
			isInit:true,
            isAnimate:true,
            layoutType:"LR"
        },
        obj = $(this),
        opts = $.extend({}, config, options);

        $(opts.hdItem, obj).bind(opts.type, function(){
            if(opts.index != $(opts.hdItem, obj).index($(this))){
                //* Click - Other
                opts.index = $(opts.hdItem, obj).index($(this));
                setCurrent();
            }else{
                //* Click - self : Just For Mobile
                setVisile();
            }
        });

        function setVisile(){
            if(!opts.isPC){
                if(opts.layoutType != "LR"){
                    return;
                }
                //console.log('opts.index:' + opts.index);
                //console.log('mobile');
                var hasOpen = $(opts.hdItem, obj).hasClass(opts.current);
                if(hasOpen){
                    $(opts.hdItem, obj).removeClass(opts.current);
                    $(opts.bdItem, obj).eq(opts.index).slideToggle('fast');
                }else{
                    setCurrent();
                }
            }
        }

        function setCurrent($isInit){
            //$(opts.hdItem, obj).removeClass(opts.current)       
            $(opts.hdItem, obj).removeClass(opts.current).eq(opts.index).addClass(opts.current);      //* 显示 current-index , 隐藏其余
            if(opts.isPC){
				$(opts.bdItem, obj).css({"display":"none"}).eq(opts.index).css({"display":"block"});
                //
                var activebdItem = $(opts.bdItem, obj).eq(opts.index);
                var listLazyImg = activebdItem.find('.lazyTab');
                justSetImgSrc(listLazyImg);
			}else{
				if(!opts.isAnimate){
                    $(opts.bdItem, obj).css({"display":"none"}).eq(opts.index).css({"display":"block"});
                    //
                    if(!$isInit || opts.layoutType == "TB"){
                        var activebdItem = $(opts.bdItem, obj).eq(opts.index);
                        var listLazyImg = activebdItem.find('.lazyTab');
                        justSetImgSrc(listLazyImg);
                    }
                }else{
                    $(opts.bdItem, obj).css({"display":"none"}).eq(opts.index).slideToggle('400', function(){
    					if(opts.isInit){
    						opts.isInit = false;
    					}else{
    						var target = $(opts.bdItem, obj).eq(opts.index).offset().top - $(opts.hdItem, obj).eq(opts.index).outerHeight()-10;
    						var body = $("html, body");
    						body.animate({scrollTop:target}, '200');
    					}
                    })
                    //
                    if(!$isInit || opts.layoutType == "TB"){
                        var activebdItem = $(opts.bdItem, obj).eq(opts.index);
                        var listLazyImg = activebdItem.find('.lazyTab');
                        justSetImgSrc(listLazyImg);
                    }
                }
            }
        }

        function initDisplay(){
            if(opts.layoutType == 'LR'){
                if(!opts.isPC){
                    $(opts.hdItem, obj).removeClass(opts.current);
                    $(opts.bdItem, obj).css({"display":"none"});
                }
            }
        }

        function justSetImgSrc(listLazyImg){
            if(listLazyImg.length>0){
                listLazyImg.each(function(index, el) {
                    var imgSrc = $(el).attr('data-src');
                    if(!$(el).attr('src')){
                        $(el).attr('src', imgSrc);
                    }
                });                    
            }
        }
        //
        setCurrent(true);
        //
        initDisplay();
        return obj;
    };
})(jQuery);/*  |xGv00|1dcd8d427366bd4e5a4b21c06b34c52d */