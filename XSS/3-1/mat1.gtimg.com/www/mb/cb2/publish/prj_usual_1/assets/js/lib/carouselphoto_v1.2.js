/* CarouselPicture and PhotoSwipe */ 
define(['global-tools/cb.carousel.1.2',  'global-tools/cb.photoswipe-core.min', 'global-tools/cb.photoswipe-ui.min'], function($null, PhotoSwipe, PhotoSwipeUI_Default) {
    /* Carousel */
    var carousel = {
        hasCreatePhotoSwipeDom : false,
        init : function($domElement, $isShowLarge, $isQQNews, $callbackDisableTNGesture, $callbackEnableTNGesture){
            var cbCarouselObj = new cbCarousel();
            cbCarouselObj.init($domElement, $isQQNews);

            //* Func : PhotoSwipe To View Large
            if(!cbTools.isPC){
                if($isShowLarge){
                    if(!carousel.hasCreatePhotoSwipeDom){
                        photoSwipeObj.createPhotoSwipeDom();
                        carousel.hasCreatePhotoSwipeDom = true;
                    }
                    carousel.initBtnThumb($domElement, $callbackDisableTNGesture, $callbackEnableTNGesture);
                }
            }
        },

        initBtnThumb : function($domElement, $callbackDisableTNGesture, $callbackEnableTNGesture){
            var domParent = $domElement.find('.owl-carousel');
            var domListThumb = domParent.find('.item');
            var items = photoSwipeObj.parseThumbnailElements(domListThumb);
            domListThumb.each(function(index, el) {
                var btnThumb = $(el);
                btnThumb.click(function(event) {
                    photoSwipeObj.init(items, index, $callbackDisableTNGesture, $callbackEnableTNGesture);
                });
            });
        }
    }

    /* PhotoSwipe */ 
    var photoSwipeObj = {
        init : function($items, $index, $callbackDisableTNGesture, $callbackEnableTNGesture){
            photoSwipeObj.openPhotoSwipe($index, $items, $callbackDisableTNGesture, $callbackEnableTNGesture);
        },

        parseThumbnailElements : function($domListThumb){
            var items = [];
            $domListThumb.each(function(index, el) {
                var largeSrc = $(this).attr('data-large');
                var size = $(this).attr('data-size').split('x');
                var title = $(this).attr('data-title');
                
                // create slide object
                var item = {
                    src: largeSrc,   //* 大图  src
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    title : title
                };

                //
                items.push(item);
            });

            return items;
        },

        openPhotoSwipe : function($index, $items, $callbackDisableTNGesture, $callbackEnableTNGesture){
            if($callbackDisableTNGesture){console.log('open photoswipe');  $callbackDisableTNGesture()}
            //
            var pswpElement = document.querySelectorAll('.pswp')[0];

            // define options (if needed)
            var options = {
                index: $index,
                history: false,
                focus: false,
                showAnimationDuration: 0,
                hideAnimationDuration: 0,
                loop : false,
                shareEl : false,                
                fullscreenEl : false,          
                counterEl : false           //* page count
                // tapToClose : true
            };
            
            //
            var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, $items, options);
            gallery.listen('close', function() { console.log('close photoswipe'); if($callbackEnableTNGesture){$callbackEnableTNGesture()} });
            gallery.init();
        },

        createPhotoSwipeDom : function(){
            var html = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> <div class="pswp__bg"></div> <div class="pswp__scroll-wrap"> <div class="pswp__container"> <div class="pswp__item"></div> <div class="pswp__item"></div> <div class="pswp__item"></div> </div> <div class="pswp__ui pswp__ui--hidden"> <div class="pswp__top-bar"> <div class="pswp__counter"></div> <button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> <div class="pswp__preloader"> <div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div> </div> </div> </div> </div> <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div> </div> <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"> </button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"> </button> <div class="pswp__caption"> <div class="pswp__caption__center"></div> </div> </div> </div> </div>';
            $('body').append(html)
        }
    }

    return carousel;
});/*  |xGv00|0133204a7a67722f43048011efd86514 */