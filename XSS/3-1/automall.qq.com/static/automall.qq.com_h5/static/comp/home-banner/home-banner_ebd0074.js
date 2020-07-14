define('automall.qq.com_h5:static/comp/home-banner/home-banner.vue', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports["default"] = {
      props: {
          data: String
      },
      data: function data() {
          return {
              item: Object
          };
      },
      mounted: function mounted() {
          this.item = JSON.parse(this.data);
      }
  };
  
  var _vueTemplateString = "<div class=\"home-banner\">\n        <div class=\"one-cloumns\" v-if=\"item.fence_type === 1\">\n            <a :href=\"item.url\" bosszone=\"homebanner\">\n            <img :src=\"item.img_url1\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\" class=\"img\">\n            </a>\n        </div>\n        <div class=\"two-columns\" v-if=\"item.fence_type === 2\">\n            <div class=\"left\">\n                <div class=\"left-item\">\n                    <a :href=\"item.url\" bosszone=\"homebanner\">\n                    <img :src=\"item.img_url1\" class=\"img\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n                    </a>\n                </div>\n            </div>\n            <div class=\"right\">\n                <div class=\"right-item\">\n                    <a :href=\"item.url2\" bosszone=\"homebanner\">\n                    <img :src=\"item.img_url2\" class=\"img\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n                    </a>\n                </div>\n            </div>\n        </div>\n        <div class=\"three-columns\" v-if=\"item.fence_type === 3\">\n            <div class=\"item\">\n                <div class=\"left-item\">\n                    <a :href=\"item.url\" bosszone=\"homebanner\">\n                    <img :src=\"item.img_url1\" class=\"img\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n                    </a>\n                </div>\n            </div>\n            <div class=\"item\">\n                <div class=\"center-item\">\n                    <a :href=\"item.url2\" bosszone=\"homebanner\">\n                    <img :src=\"item.img_url2\" class=\"img\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n                    </a>\n                </div>\n            </div>\n            <div class=\"item\">\n                <div class=\"regiht-item\">\n                    <a :href=\"item.url3\" bosszone=\"homebanner\">\n                    <img :src=\"item.img_url3\" class=\"img\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n                    </a>\n                </div>\n            </div>\n        </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports["default"] && (exports["default"].template = _vueTemplateString);

});
