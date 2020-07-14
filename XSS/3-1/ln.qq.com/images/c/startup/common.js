//tab
function resetTabs(obj) {
    $(obj).parent().next("div").find(".news").hide();
    $(obj).parent().parent().find("a").removeClass("current");
}

function loadTab() {
    $(".news-sublist > div").hide();
    $(".news-category").each(function() {
        $(this).find("a:first").addClass("current");
    });
    $(".news-sublist").each(function() {
        $(this).find("div:first").fadeIn();
    });
    $(".news-category a").on("click", function(e) {
        e.preventDefault();
        if ($(this).attr("class") == "current") {
            return;
        } else {
            resetTabs(this);
            $(this).addClass("current");
            $($(this).attr("name")).fadeIn();
        }
    });
}

//killComments<span>
$(function(){
    $("#commentIframe").load(function () {
        console.log("running")
       $("#commentIframe").contents().find("#top_reply h1>span").css("display","none");
    });
});

/*  |xGv00|b20bfb9f892d576299d7ab1647434507 */