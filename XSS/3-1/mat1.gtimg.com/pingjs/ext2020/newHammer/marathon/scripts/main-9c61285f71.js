!function(t){var n={};function o(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=n,o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,n){if(1&n&&(t=o(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)o.d(e,r,function(n){return t[n]}.bind(null,r));return e},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="",o(o.s=1)}([function(t,n){function o(t,n){t.onload=function(){this.onerror=this.onload=null,n(null,t)},t.onerror=function(){this.onerror=this.onload=null,n(new Error("Failed to load "+this.src),t)}}function e(t,n){t.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,n(null,t))}}t.exports=function(t,n,r){var i=document.head||document.getElementsByTagName("head")[0],l=document.createElement("script");"function"==typeof n&&(r=n,n={}),n=n||{},r=r||function(){},l.type=n.type||"text/javascript",l.charset=n.charset||"utf8",l.async=!("async"in n)||!!n.async,l.src=t,n.attrs&&function(t,n){for(var o in n)t.setAttribute(o,n[o])}(l,n.attrs),n.text&&(l.text=""+n.text),("onload"in l?o:e)(l,r),l.onload||o(l,r),i.appendChild(l)}},function(t,n,o){"use strict";o.r(n);var e,r=o(0),i=o.n(r);console.log("hello hammer"),i()("//mat1.gtimg.com/pingjs/ext2020/sports/libs/dist/login.js",function(){SportsLogin.init({root:"ct-login",onLogin:function(t){},onLogout:function(){console.log("logout")}})}),$("#gotoTop").click(function(){$("html,body").animate({scrollTop:0},700)}).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}),e=e||600,$(window).scroll(function(){$(window).scrollTop()>e?$("#gotoTop").fadeIn(100):$("#gotoTop").fadeOut(200)})}]);
//# sourceMappingURL=main.js.map/*  |xGv00|84866d5b1d1861c68d2efe268eaa5031 */