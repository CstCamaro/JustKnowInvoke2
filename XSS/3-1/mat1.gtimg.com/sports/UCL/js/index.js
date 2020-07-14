$(function() {
    if (document.location.href.split('?')[1]) {
        var s = document.location.href.split('?')[1];
        s = s.split('=')[1];
        $('.info').perfectScrollbar();
        $('.c').hide();
        $('.c').eq(s).show();
        $('.left .item div').removeClass('selected');
        $('.left .item div').eq(s).addClass('selected');
        $('.left .item div').click(function() {
            if ($(this).hasClass('selected')) {
                return;
            }
            $('.left .item div').removeClass('selected');
            $(this).addClass('selected');
            $('.c').hide();
            $('.c').eq($(this).parent().index()).show();
        })
    } else {
        $('.info').perfectScrollbar();
        $('.c').hide();
        $('.c').eq(0).show();
        $('.left .item div').removeClass('selected');
        $('.left .item div').eq(0).addClass('selected');
        $('.left .item div').click(function() {
            if ($(this).hasClass('selected')) {
                return;
            }
            $('.left .item div').removeClass('selected');
            $(this).addClass('selected');
            $('.c').hide();
            $('.c').eq($(this).parent().index()).show();
        })
    }


})/*  |xGv00|fc32f859d4e6b92f2127061aadaa4dc2 */