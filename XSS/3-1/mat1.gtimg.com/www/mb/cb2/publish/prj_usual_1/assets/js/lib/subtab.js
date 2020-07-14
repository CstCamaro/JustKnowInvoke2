define(['global-tools/jquery.tabs.v.1.1'], function() {
    var subtab = {
        init_alignLR : function ($pcContainer, $mobileContainer, $isPC){
            $pcContainer.tabs({
                index: 0,
                type: "mouseover",
                current: "current",
                hdItem: ".sub_tab_hd_item",
                bdItem: ".sub_tab_bd_item",
                isPC: $isPC,
                layoutType :'LR'
            });
            
            $mobileContainer.tabs({
                index: 0,
                type: "click",
                current: "current",
                hdItem: ".sub_tab_hd_item",
                bdItem: ".sub_tab_bd_item",
                isPC: $isPC,
                layoutType :'LR'
            });

            //*
            if($isPC){
                var listTabHdItem = $pcContainer.find('.sub_tab_hd_item');
                if(listTabHdItem.length >= 8){
                    listTabHdItem.last().addClass('last');
                }else{
                    listTabHdItem.last().removeClass('last');
                }

                if($pcContainer.find('.box_detail.module-tab').length>0){
                    if(listTabHdItem.length >= 7){
                        $pcContainer.find('.box_detail.module-tab').children('.detail_grid').css('min-height', '385px');
                    }
                    //
                    if(listTabHdItem.length >= 8){
                        listTabHdItem.each(function(index, el) {
                            $(el).css('border-right', '1px solid #d0d0d0');
                        });
                    }
                }
            }

        },

        init_alignTB : function ($container, $isPC){
            $container.tabs({
                index: 0,
                type: "mouseover",
                current: "current",
                hdItem: ".sub_tab_hd_item",
                bdItem: ".sub_tab_bd_item",
                isPC: $isPC,
                isAnimate : false,
                layoutType :'TB'
            });
        }
    }

    return subtab;
});
/*  |xGv00|a4a6afc8b22a0ff249872371ab9d6599 */