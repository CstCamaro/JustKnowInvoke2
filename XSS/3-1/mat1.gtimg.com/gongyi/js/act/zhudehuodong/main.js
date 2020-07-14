jQuery(document).ready(function($) {



    // $(".zhude_2014_people_detail").hover(function() {
    //     $(this).stop(true,false).find(".hoverWord").animate({
    //         top: 0,
    //         opacity: 1
    //     },500, function() {
    //         /* stuff to do after animation is complete */
    //     });
    // }, function() {
    //     $(this).stop(true,false).find(".hoverWord").animate({
    //         top: "100%",
    //         opacity: 0
    //     },100, function() {
    //         /* stuff to do after animation is complete */
    //     });
    // });
    $('.slide').slick({
        // lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows:true,
        prevArrow:".slide_last",
        nextArrow:".slide_next"
    });
    $(document).scroll(function(event) {
        if($("body").scrollTop()>=0){
            $(".activityIntroduce").addClass('animateBlur');
        }
    });


    var video = new tvp.VideoInfo();
    video.setChannelId("121004300");
    var player = new tvp.Player();
    player.create({
        width:649,
        height:472,
        video:video,
        type:1,
        modId:"mod_player"
    });





    $('.zhude2014_middle_people > li').each( function() { 
        $(this).hoverdir({
        }); 
    });
});/*  |xGv00|29efa362f9267b638fedd1a3b47c4446 */