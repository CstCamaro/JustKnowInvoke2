/**
 * Created by leohu on 16/3/7.
 */
$.extend({
    popup: (function(){
        var dialog = null;

        var showDialog = function(context){
            console.log(dialog);

            if(!dialog) {
                dialog = $('<div style="position:absolute;width:50%;border:7px solid #609fa8;padding:15px;background-color:#ffffff">');

                dialog.on('click', '.close', function(){
                    dialog.hide();
                });

                $(document.body).append(dialog);
            }

            dialog.html('').show();
            dialog.append('<a class="close" style="margin:-22px -22px 0 0;float:right"><img src="images/close.png"></a>');
            dialog.append(context);

            var w = document.documentElement.clientWidth;
            var h = document.documentElement.clientHeight;
            var sw = dialog.width();
            var sh = dialog.height();
            var st = $(document).scrollTop();

            dialog.css({
                "top": (h - sh) / 2 + st,
                "left": (w - sw) / 2
            });
        };

        return function(context){
            showDialog(context);
        };

    })()
});
/*  |xGv00|287ce3f9b8b3b077bf17312d81bbc82a */