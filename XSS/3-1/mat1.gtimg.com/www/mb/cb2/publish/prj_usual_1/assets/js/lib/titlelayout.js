/* 段落标题 新标题 Object : 图标与文字多种排列方式 */ 
define(function () {
    var titlelayout = {
        CONTAINER_PADDING : 40,
        SCREEN_WIDTH : 0,
        ONE_W : 20,       //* 常量 ：单个字的宽度
        init : function(){
            titlelayout.SCREEN_WIDTH = $('.pbt_container').width() - titlelayout.CONTAINER_PADDING;
            titlelayout.setNewTitleOverlap();
        },

        setNewTitleOverlap : function(){            
            var domModule = $('.pbt_box_module_newTitle');
            domModule.each(function(index, el) {
                var domParent = $(el);
                var alignType = parseInt(domParent.attr('data-align'));
                var overlapType = parseInt(domParent.attr('data-overlap'));
                var domImage = domParent.find('.box_img');
                var domTitle = domParent.find('.box_title');
                //
                var domImageImg = domImage.find('img');
                if(domImageImg.length == 0){return;}
                //
                var size = domImageImg.attr('data-size').split('x');
                var w = parseInt(size[0], 10);
                var h = parseInt(size[1], 10);
                //
                if( (!w) && (!h) ){     //* none of image, just set text-title align
                    if(alignType == 1){
                        console.log('Outter-Align : Center' )
                        domParent.css({'margin': '0 auto', 'white-space' : 'nowrap'});
                    }else if(alignType == 2){
                        console.log('Outter-Align : Right' );
                        domParent.css({'margin': '0 auto', 'white-space' : 'nowrap', 'float':'right'});
                    }
                    domParent.css('width', domTitle.width() + 'px');
                    return;
                }
                //
                var imageValidWH = titlelayout.getImageValidWidth(w, h);
                domImage.attr('style', 'width:' + imageValidWH.width + 'px!important;' + 'height:'+ imageValidWH.height + 'px!important;');
                //
                var imageObj = {dom : domImage, width: domImage.width(), height: domImage.height() };
                var titleObj = {dom : domTitle, width: domTitle.width(), height: domTitle.height() };
                var totalWidth = parseInt(imageObj.width + titleObj.width);
                
                //Set :: Outter-Align
                if(alignType == 0){
                    // console.log('Outter-Align : Left' )
                }else if(alignType == 1){
                    // console.log('Outter-Align : Center' )
                    domParent.css({'margin': '0 auto', 'white-space' : 'nowrap'});
                }else if(alignType == 2){
                    // console.log('Outter-Align : Right' );
                    domParent.css({'margin': '0 auto', 'white-space' : 'nowrap', 'float':'right'});
                }

                if(alignType == 1 || alignType == 2){
                    if(titleObj.width > imageObj.width){
                        domParent.css('width', titleObj.width + 'px');
                    }else{
                        domParent.css('width', imageObj.width + 'px');
                    }
                }

                // Set :: Overlap Type To Layout
                if(overlapType == 0){   //* 左叠加
                    if((totalWidth - titlelayout.ONE_W*2) >= titlelayout.SCREEN_WIDTH){
                        titleObj.dom.css('margin-left', -(imageObj.width) + 'px');
                    }else{
                        if(alignType == 1 || alignType == 2){
                            var newWidth = totalWidth - (titlelayout.ONE_W*2);
                            domParent.css('width', newWidth + 'px');
                        }
                        titleObj.dom.css('margin-left', -(titlelayout.ONE_W*2) +'px');                        
                    }                    
                }else if(overlapType == 1){     //* 右叠加                    
                    imageObj.dom.before(titleObj.dom);  //* 兄弟调位
                    titleObj.dom.css('z-index', '2');
                    if((totalWidth - titlelayout.ONE_W*2) >= titlelayout.SCREEN_WIDTH){
                        imageObj.dom.css('margin-left', -(imageObj.width) + 'px');
                    }else{
                        if(alignType == 1 || alignType == 2){
                            var newWidth = totalWidth - (titlelayout.ONE_W*2);
                            domParent.css('width', newWidth + 'px');
                        }
                        imageObj.dom.css('margin-left', -(titlelayout.ONE_W*2) +'px');
                    }                    
                }else if(overlapType == 2) {    //* 左对齐
                    titleObj.dom.css('margin-left', -(imageObj.width) + 'px');
                }else if(overlapType == 3) {    //* 居中对齐
                    if(titleObj.width > imageObj.width){
                        imageObj.dom.before(titleObj.dom); 
                        titleObj.dom.css('z-index', '2');
                        imageObj.dom.css('margin-left', -(titleObj.width/2 + imageObj.width/2) + 'px');
                    }else{
                        titleObj.dom.css('margin-left', -(imageObj.width/2 + titleObj.width/2) + 'px');
                    }
                }else if(overlapType == 4) {    //* 右对齐
                    if(titleObj.width > imageObj.width){
                        imageObj.dom.before(titleObj.dom);  //* 兄弟调位
                        titleObj.dom.css('z-index', '2');
                        imageObj.dom.css('margin-left', -(imageObj.width) + 'px');
                    }else{
                        titleObj.dom.css('margin-left', -(titleObj.width) + 'px');
                    }
                }

                //* Set : Horizontal Center - Image And Title 水平居中
                if(titleObj.height > imageObj.height){
                    var offsetY = Math.floor((titleObj.height - imageObj.height)/2);
                    imageObj.dom.css('margin-top', offsetY + 'px');
                }else{
                    var offsetY = Math.floor((imageObj.height - titleObj.height)/2);
                    titleObj.dom.css('margin-top', offsetY + 'px');
                }

            });
        },

        getImageValidWidth : function($width, $height){
            var validWH = {width:$width, height:$height};
            if($width > titlelayout.SCREEN_WIDTH){
                validWH.width = titlelayout.SCREEN_WIDTH;
                validWH.height = Math.floor((validWH.width/ $width) * $height);
            }
            return validWH;
        }
    }

    return titlelayout;
});/*  |xGv00|17dd3e078a9d56544edfd2c8a9721967 */