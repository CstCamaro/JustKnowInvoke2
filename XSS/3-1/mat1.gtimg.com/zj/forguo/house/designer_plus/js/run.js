(function($) {
    var allPointHtml = ''; //储存所有红点的HTML
    var allContentHtml = ''; //储存所有显示内容的HTML
    for (var i = 0; i < points.length; i++) {
        var pointHtml = '<div class="abs point" data-src="p-' + points[i].num + '" style="width:80px;height:80px;left:' +
            points[i].left +
            'px;top:' +
            points[i].top +
            'px;"></div>';
        var contentHtml = '<div class="abs content-' + points[i].num + ' floor-plan-content" style="right:' + points[i].contentRight + 'px;top:' + points[i].contentTop + 'px;">' +
            '<div class="content-wrap">' + points[i].content + '</div></div>'

        allPointHtml += pointHtml;
        allContentHtml += contentHtml;
    }
    $('.floor_plan_show').append(allPointHtml);
    $('.floor_plan_show').append(allContentHtml);
    $('.point').hover(function() {
        var dataSrc = $(this).attr('data-src');
        var num = dataSrc.substr(2, 1);
        $('.floor-plan-content.content-' + num).show();
    }, function() {
        var dataSrc = $(this).attr('data-src');
        var num = dataSrc.substr(2, 1);
        $('.floor-plan-content.content-' + num).hide();
    });
})(jQuery)/*  |xGv00|6b73add45c3df0e58d8b39122c077518 */