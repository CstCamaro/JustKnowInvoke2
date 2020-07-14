$(function(){
    var item = $("#item").html()
    var item_tpl = Handlebars.compile(item)
    Handlebars.registerHelper("getGallery",function (n) {
        return 'gallery'+parseInt(n/perNum)
    })
    var item_str = item_tpl(jsonData);
    $("#content").html(item_str)

    var wookmark = new Wookmark('#content',{
        offset: 24,
        itemWidth: 230
    })
    var imgs = $("#content img");
    for(var i=0,len=imgs.length;i<len;i++){
        imgs[i].onload = function(){
            wookmark.updateOptions();
        }
    }
    $("div.holder").jPages({
        containerID: "content",
        perPage:perNum,
        previous:"",
        next:"",
        minHeight:false,
        callback:function () {
            wookmark.updateOptions()
        }
    });

    $('.item').fancybox({
        padding:0,
        prevEffect : 'fade',
        nextEffect : 'fade',
        arrows : true,
        minWidth:300,
        helpers : {
            title : {
                type : 'inside'
            }
        }
    });
})/*  |xGv00|6b7d59899725038f201cf9e6418b7cdd */