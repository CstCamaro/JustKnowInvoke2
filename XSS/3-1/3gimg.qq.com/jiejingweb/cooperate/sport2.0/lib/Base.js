/**
 * Created by qiangliu on 2014/12/9.
 */
    var Util = {
        isUndefined: function (property) {
            return Object.prototype.toString.call(undefined) === 'object Undefined';
        },
        mix: function (dest, src) {
            for (var k in src) {
                if (src.hasOwnProperty(k)) {
                    dest[k] = src[k];
                }
            }
            return dest;
        },
        box: function (el) {
           var el = $(el);
           return {
               w: el.width(),
               h: el.height()
           };
        },
        createNode: function (tagName, obj, parent) {
            var node = document.createElement(tagName || "div");
            if (obj) {
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        if (attr == "children" ||
                            typeof obj[attr] === "function") {
                            continue;
                        }
                        switch (attr) {
                            case "style":
                                node.style.cssText = obj[attr];
                                break;
                            default:
                                node[attr] = obj[attr];
                        }
                    }
                }
            }
            if (parent) {
                parent.appendChild(node);
            }
            return node;
        },
        enableDrag: function (el, op) {
            function onTouchStart(evt) {
//                evt.stopPropagation();
                evt.preventDefault();
                op.dragStart && op.dragStart(evt);
                window.addDebug && window.addDebug('touchstart');
                el.addEventListener('touchmove', onTouchMove, true);
            };

            function onTouchMove (evt) {
//                evt.stopPropagation();
                evt.preventDefault();
                window.addDebug && window.addDebug('onTouchMove');
                op.dragging && op.dragging(evt);
            };

            function onTouchEnd (evt) {
//                evt.stopPropagation();
                evt.preventDefault();
                window.addDebug && window.addDebug('onTouchEnd');
                el.removeEventListener('touchmove', onTouchMove, true);
                op.dragEnd && op.dragEnd(evt);
            };

            $(el).listener = [
                {
                    name: 'touchstart',
                    fn: onTouchStart
                },
                {
                    name: 'touchend',
                    fn: onTouchEnd
                }
            ];
            $(el).bind('touchstart', onTouchStart);
            $(el).bind('touchend', onTouchEnd);
//            el.addEventListener('touchstart', onTouchStart, true);
//            el.addEventListener('touchend', onTouchEnd, true);
        },
        disableDrag: function (el) {
            var listens = $(el).listener;
            $(el).listener = null;
            if (listens) {
                for (var i=0;i<listens.length; i++){
                    var listener = listens[i];
                    el.removeEventListener(listener.name, listener.fn, true);
                }
                listens = undefined;
            }
        },
        click: function (ele, cb) {
            var startTime = 0,
                pageX = 0,
                pageY = 0;
            function start(e) {
               pageX = e.touches[0].pageX;
               pageY = e.touches[0].pageY;
               startTime = new Date().getTime();
            }
            function end(e) {
               var touches = e.touches[0] || e.changedTouches[0];
               var epageX = touches.pageX
               var epageY = touches.pageY
               if(Math.abs(epageX - pageX) > 3 || Math.abs(epageY - pageY) > 3) {
                   return;
               }
               var endTime = new Date().getTime();
               if(endTime - startTime > 200) {
                   return;
               } else {
                   cb & cb(e);
               }
            }
            ele.addEventListener('touchstart',start);
            ele.addEventListener('touchend', end)
        }
    };