(function() {
    $(function() {
        triggerBind();
    });
    
    //console.log("running");
function triggerBind() {
    //console.log("running");
        function holdBody(slide) {
            $('html').addClass('holding');
            $('body').addClass('holding');
            if (slide) {
                $('body').addClass('slide-left');
                $('body').addClass('holding-right');
            }
            window.scrollTo(0, 0);
        }

        function releaseBody() {
            $('html').removeClass('holding');
            $('body').removeClass('holding');
            $('body').removeClass('slide-left');
            $('body').removeClass('holding-right');

        }

        $('.J_commonHeaderWrapper .J_searchTrigger').bind('mouseup touchend', function bindSearch(e) {
            e.preventDefault();
            var wrapper = $('.J_commonHeaderWrapper');
            var trigger = $(this);
            holdBody();
            wrapper.addClass('show-search');
            wrapper.find('.searchbar input').trigger('focus');

        });

        $('.J_commonHeaderWrapper .searchbar .close-icon').bind('mouseup touchend', function(e) {
            e.preventDefault();
            setTimeout(function() {
                var wrapper = $('.J_commonHeaderWrapper');
                wrapper.removeClass('show-search');
                releaseBody();
            }, 100);
        });
        //移动端收回菜单

        $('.J_commonHeaderWrapper .J_menuTrigger').bind('mouseup touchend', function bindMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            var wrapper = $('.J_commonHeaderWrapper');
            var trigger = $(this);

            function cancel(e) {
                var cur = $(e.target);

                if (!cur.parents('.J_commonHeaderWrapper').length || cur.parents('.triggers').length) {
                    e.preventDefault && e.preventDefault();
                    $('body').removeClass('slide-left');
                    $('body').unbind('mouseup touchstart', cancel);
                    $('.J_commonHeaderWrapper .J_navList a').unbind('mouseup touchend');
                    setTimeout(function() {
                        trigger.removeClass('active');
                        releaseBody();
                        wrapper.removeClass('show-menu');
                    }, 400);
                }
            }

            if (trigger.hasClass('active')) {
                //cancel(e);
                return;
            }
            trigger.addClass('active');
            holdBody(true);
            wrapper.addClass('show-menu');
            setTimeout(function() {
                $('body').bind('mouseup touchstart', cancel);
                $('.J_commonHeaderWrapper .J_navList a').bind('mouseup touchend', function() {
                    location.href = $(this).attr('href');
                    $('.J_commonHeaderWrapper .J_navList a').unbind('mouseup touchend', arguments.callee);
                    cancel({
                        target: $()
                    });
                });
            }, 100);
        });
    }

})(window.$);/*  |xGv00|fba8afba6edb4a5fd0aeccab1665ab98 */