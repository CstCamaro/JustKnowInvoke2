(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if(typeof exports==="object"){a(require("jquery"))}else{a(jQuery)}}}(function(b){var a={wheelSpeed:10,wheelPropagation:false,minScrollbarLength:null,useBothWheelAxes:false,useKeyboard:true,suppressScrollX:false,suppressScrollY:false,scrollXMarginOffset:0,scrollYMarginOffset:0,includePadding:false};var c=(function(){var d=0;return function(){var e=d;d+=1;return".perfect-scrollbar-"+e}}());b.fn.perfectScrollbar=function(d,e){return this.each(function(){var Q=b.extend(true,{},a),o=b(this);if(typeof d==="object"){b.extend(true,Q,d)}else{e=d}if(e==="update"){if(o.data("perfect-scrollbar-update")){o.data("perfect-scrollbar-update")()}return o}else{if(e==="destroy"){if(o.data("perfect-scrollbar-destroy")){o.data("perfect-scrollbar-destroy")()}return o}}if(o.data("perfect-scrollbar")){return o.data("perfect-scrollbar")}o.addClass("ps-container");var w=b("<div class='ps-scrollbar-x-rail'></div>").appendTo(o),i=b("<div class='ps-scrollbar-y-rail'></div>").appendTo(o),g=b("<div class='ps-scrollbar-x'></div>").appendTo(w),f=b("<div class='ps-scrollbar-y'></div>").appendTo(i),D,C,s,N,O,L,F,p,H=parseInt(w.css("bottom"),10),y=H===H,x=y?null:parseInt(w.css("top"),10),I,K,R=parseInt(i.css("right"),10),P=R===R,T=P?null:parseInt(i.css("left"),10),S=o.css("direction")==="rtl",l=c();var k=function(W,U){var V=W+U,Y=N-I;if(V<0){K=0}else{if(V>Y){K=Y}else{K=V}}var X=parseInt(K*(L-N)/(N-I),10);o.scrollTop(X);if(y){w.css({bottom:H-X})}else{w.css({top:x+X})}};var A=function(X,U){var W=X+U,V=s-F;if(W<0){p=0}else{if(W>V){p=V}else{p=W}}var Y=parseInt(p*(O-s)/(s-F),10);o.scrollLeft(Y);if(P){i.css({right:R-Y})}else{i.css({left:T+Y})}};var B=function(U){if(Q.minScrollbarLength){U=Math.max(U,Q.minScrollbarLength)}return U};var v=function(){var V={width:s,display:D?"inherit":"none"};if(S){V.left=o.scrollLeft()+s-O}else{V.left=o.scrollLeft()}if(y){V.bottom=H-o.scrollTop()}else{V.top=x+o.scrollTop()}w.css(V);var U={top:o.scrollTop(),height:N,display:C?"inherit":"none"};if(P){if(S){U.right=O-o.scrollLeft()-R-f.outerWidth()}else{U.right=R-o.scrollLeft()}}else{if(S){U.left=o.scrollLeft()+s*2-O-T-f.outerWidth()}else{U.left=T+o.scrollLeft()}}i.css(U);g.css({left:p,width:F});f.css({top:K,height:I})};var E=function(){s=Q.includePadding?o.innerWidth():o.width();N=Q.includePadding?o.innerHeight():o.height();O=o.prop("scrollWidth");L=o.prop("scrollHeight");if(!Q.suppressScrollX&&s+Q.scrollXMarginOffset<O){D=true;F=B(parseInt(s*s/O,10));p=parseInt(o.scrollLeft()*(s-F)/(O-s),10)}else{D=false;F=0;p=0;o.scrollLeft(0)}if(!Q.suppressScrollY&&N+Q.scrollYMarginOffset<L){C=true;I=B(parseInt(N*N/L,10));K=parseInt(o.scrollTop()*(N-I)/(L-N),10)}else{C=false;I=0;K=0;o.scrollTop(0)}if(K>=N-I){K=N-I}if(p>=s-F){p=s-F}v()};var m=function(){var V,U;g.bind("mousedown"+l,function(W){U=W.pageX;V=g.position().left;w.addClass("in-scrolling");W.stopPropagation();W.preventDefault()});b(document).bind("mousemove"+l,function(W){if(w.hasClass("in-scrolling")){A(V,W.pageX-U);W.stopPropagation();W.preventDefault()}});b(document).bind("mouseup"+l,function(W){if(w.hasClass("in-scrolling")){w.removeClass("in-scrolling")}});V=U=null};var t=function(){var V,U;f.bind("mousedown"+l,function(W){U=W.pageY;V=f.position().top;i.addClass("in-scrolling");W.stopPropagation();W.preventDefault()});b(document).bind("mousemove"+l,function(W){if(i.hasClass("in-scrolling")){k(V,W.pageY-U);W.stopPropagation();W.preventDefault()}});b(document).bind("mouseup"+l,function(W){if(i.hasClass("in-scrolling")){i.removeClass("in-scrolling")}});V=U=null};var u=function(V,U){var W=o.scrollTop();if(V===0){if(!C){return false}if((W===0&&U>0)||(W>=L-N&&U<0)){return !Q.wheelPropagation}}var X=o.scrollLeft();if(U===0){if(!D){return false}if((X===0&&V<0)||(X>=O-s&&V>0)){return !Q.wheelPropagation}}return true};var z=function(){Q.wheelSpeed/=10;var U=false;o.bind("mousewheel"+l,function(aa,Z,Y,X){var W=aa.deltaX*aa.deltaFactor||Y,V=aa.deltaY*aa.deltaFactor||X;U=false;if(!Q.useBothWheelAxes){o.scrollTop(o.scrollTop()-(V*Q.wheelSpeed));o.scrollLeft(o.scrollLeft()+(W*Q.wheelSpeed))}else{if(C&&!D){if(V){o.scrollTop(o.scrollTop()-(V*Q.wheelSpeed))}else{o.scrollTop(o.scrollTop()+(W*Q.wheelSpeed))}U=true}else{if(D&&!C){if(W){o.scrollLeft(o.scrollLeft()+(W*Q.wheelSpeed))}else{o.scrollLeft(o.scrollLeft()-(V*Q.wheelSpeed))}U=true}}}E();U=(U||u(W,V));if(U){aa.stopPropagation();aa.preventDefault()}});o.bind("MozMousePixelScroll"+l,function(V){if(U){V.preventDefault()}})};var h=function(){var V=false;o.bind("mouseenter"+l,function(W){V=true});o.bind("mouseleave"+l,function(W){V=false});var U=false;b(document).bind("keydown"+l,function(Y){if(!V||b(document.activeElement).is(":input,[contenteditable]")){return}var X=0,W=0;switch(Y.which){case 37:X=-30;break;case 38:W=30;break;case 39:X=30;break;case 40:W=-30;break;case 33:W=90;break;case 32:case 34:W=-90;break;case 35:W=-N;break;case 36:W=N;break;default:return}o.scrollTop(o.scrollTop()-W);o.scrollLeft(o.scrollLeft()+X);U=u(X,W);if(U){Y.preventDefault()}})};var n=function(){var U=function(V){V.stopPropagation()};f.bind("click"+l,U);i.bind("click"+l,function(Z){var V=parseInt(I/2,10),X=Z.pageY-i.offset().top-V,Y=N-I,W=X/Y;if(W<0){W=0}else{if(W>1){W=1}}o.scrollTop((L-N)*W)});g.bind("click"+l,U);w.bind("click"+l,function(Z){var V=parseInt(F/2,10),W=Z.pageX-w.offset().left-V,Y=s-F,X=W/Y;if(X<0){X=0}else{if(X>1){X=1}}o.scrollLeft((O-s)*X)})};var G=function(){var Z=function(ab,aa){o.scrollTop(o.scrollTop()-aa);o.scrollLeft(o.scrollLeft()-ab);E()};var Y={},V=0,X={},W=null,U=false;b(window).bind("touchstart"+l,function(aa){U=true});b(window).bind("touchend"+l,function(aa){U=false});o.bind("touchstart"+l,function(aa){var ab=aa.originalEvent.targetTouches[0];Y.pageX=ab.pageX;Y.pageY=ab.pageY;V=(new Date()).getTime();if(W!==null){clearInterval(W)}aa.stopPropagation()});o.bind("touchmove"+l,function(ae){if(!U&&ae.originalEvent.targetTouches.length===1){var ag=ae.originalEvent.targetTouches[0];var ac={};ac.pageX=ag.pageX;ac.pageY=ag.pageY;var ab=ac.pageX-Y.pageX,aa=ac.pageY-Y.pageY;Z(ab,aa);Y=ac;var ad=(new Date()).getTime();var af=ad-V;if(af>0){X.x=ab/af;X.y=aa/af;V=ad}ae.preventDefault()}});o.bind("touchend"+l,function(aa){clearInterval(W);W=setInterval(function(){if(Math.abs(X.x)<0.01&&Math.abs(X.y)<0.01){clearInterval(W);return}Z(X.x*30,X.y*30);X.x*=0.8;X.y*=0.8},10)})};var J=function(){o.bind("scroll"+l,function(U){E()})};var M=function(){o.unbind(l);b(window).unbind(l);b(document).unbind(l);o.data("perfect-scrollbar",null);o.data("perfect-scrollbar-update",null);o.data("perfect-scrollbar-destroy",null);g.remove();f.remove();w.remove();i.remove();w=i=g=f=D=C=s=N=O=L=F=p=H=y=x=I=K=R=P=T=S=l=null};var r=function(V){o.addClass("ie").addClass("ie"+V);var U=function(){var Y=function(){b(this).addClass("hover")};var X=function(){b(this).removeClass("hover")};o.bind("mouseenter"+l,Y).bind("mouseleave"+l,X);w.bind("mouseenter"+l,Y).bind("mouseleave"+l,X);i.bind("mouseenter"+l,Y).bind("mouseleave"+l,X);g.bind("mouseenter"+l,Y).bind("mouseleave"+l,X);f.bind("mouseenter"+l,Y).bind("mouseleave"+l,X)};var W=function(){v=function(){var Y={left:p+o.scrollLeft(),width:F};if(y){Y.bottom=H}else{Y.top=x}g.css(Y);var X={top:K+o.scrollTop(),height:I};if(P){X.right=R}else{X.left=T}f.css(X);g.hide().show();f.hide().show()}};if(V===6){U();W()}};var q=(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch);var j=function(){var U=navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);if(U&&U[1]==="msie"){r(parseInt(U[2],10))}E();J();m();t();n();if(q){G()}if(o.mousewheel){z()}if(Q.useKeyboard){h()}o.data("perfect-scrollbar",o);o.data("perfect-scrollbar-update",E);o.data("perfect-scrollbar-destroy",M)};j();return o})}}));/*  |xGv00|0445a7d683338d9dacb51876008fcf1f */