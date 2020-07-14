define('automall.qq.com_web:static/comp/ad-float/ad-float.vue', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports["default"] = {
      data: function data() {
          return {
              show: false,
              item: Object
          };
      },
  
      methods: {
          enter: function enter() {
              this.show = true;
              console.log(this.show);
          },
          leave: function leave() {
              this.show = false;
          }
      },
      props: {
          data: String
      },
      mounted: function mounted() {
          this.item = JSON.parse(this.data);
      }
  };
  
  var _vueTemplateString = "<div class=\"ad-float\">\n    <div class=\"ad-float-top\">\n        <transition name=\"bounce\">\n        <div v-show=\"show\" class=\"ad-float-top-showbox\">\n            <img :src=\"item.img_url2\" style=\"width: 100%;height: 100% ; object-fit: cover;border-radius: 6px\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n        </div>\n        </transition>\n    </div>\n    <div @mouseenter=\"enter\" @mouseleave=\"leave\" class=\"ad-float-bottom\">\n        <a :href=\"item.url\" bosszone=\"adFloat\">\n        <img :src=\"item.img_url1\" style=\"width: 100%;height: 100% ; object-fit: cover;border-radius: 6px\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n        </a>\n    </div>\n</div>\n<!--<div class=\"ad-float\">-->\n    <!--<transition name=\"bounce\">-->\n    <!--<div  @mouseenter=\"enter\"  class=\"ad-float-bottom\" style=\"position: relative\" v-show=\"!show\">-->\n        <!--<a :href=\"item.url\" bossZone=\"adFloat\">-->\n            <!--<img :src=\"item.img_url1\" style=\"width: 100%;height: 100% ; object-fit: cover;border-radius: 6px\"-->\n                 <!--onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\"-->\n            <!--/>-->\n        <!--</a>-->\n    <!--</div>-->\n    <!--</transition>-->\n    <!--<transition name=\"bounce\">-->\n            <!--<div   style=\"position: absolute;width: 71px;height: 92px;display: flex;justify-content: center;align-items: center\" @mouseleave=\"leave\" v-show=\"show\" >-->\n                <!--<img :src=\"item.img_url2\" style=\"width: 58px;height: 58px ; object-fit: cover;border-radius: 6px\"-->\n                     <!--onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\"-->\n                <!--/>-->\n            <!--</div>-->\n    <!--</transition>-->\n<!--</div>-->";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports["default"] && (exports["default"].template = _vueTemplateString);

});
