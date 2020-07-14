define('automall.qq.com_web:static/comp/ad-banner/ad-banner.vue', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports["default"] = {
      props: {
          data: String //组件数据
  
      },
      data: function data() {
          return {
              item: Object
          };
      },
      created: function created() {
          //数据格式转化
          this.item = JSON.parse(this.data);
      }
  };
  
  var _vueTemplateString = "<div class=\"banner-container\">\n    <div class=\"five-banner\" v-if=\"item.fence_type === 5\">\n        <div class=\"item\">\n            <a :href=\"item.url\" target=\"_blank\" bosszone=\"homebanner\">\n            <img :src=\"item.img_url1\" style=\"width: 100%;height: 100% ; object-fit: cover\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n            </a>\n        </div>\n        <div class=\"item ml\">\n            <a :href=\"item.url2\" target=\"_blank\" bosszone=\"homebanner\">\n            <img :src=\"item.img_url2\" style=\"width: 100%;height: 100% ; object-fit: cover\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n            </a>\n        </div>\n        <div class=\"item ml\">\n            <a :href=\"item.url3\" target=\"_blank\" bosszone=\"homebanner\">\n            <img :src=\"item.img_url3\" style=\"width: 100%;height: 100% ; object-fit: cover\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n            </a>\n        </div>\n        <div class=\"item ml\">\n            <a :href=\"item.url4\" target=\"_blank\" bosszone=\"homebanner\">\n            <img :src=\"item.img_url4\" style=\"width: 100%;height: 100% ; object-fit: cover\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n            </a>\n        </div>\n        <div class=\"item ml\">\n            <a :href=\"item.url5\" target=\"_blank\" bosszone=\"homebanner\">\n            <img :src=\"item.img_url5\" style=\"width: 100%;height: 100% ; object-fit: cover\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n            </a>\n        </div>\n    </div>\n    <div class=\"one-banner\" v-if=\"item.fence_type === 1\">\n        <a :href=\"item.url\" target=\"_blank\" bosszone=\"homebanner\">\n        <img :src=\"item.img_url1\" style=\"width: 100%;height: 100% ; object-fit: cover\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n        </a>\n    </div>\n    <div class=\"three-banner\" v-if=\"item.fence_type === 3\">\n            <div class=\"item\">\n                <a :href=\"item.url\" target=\"_blank\" bosszone=\"homebanner\">\n                <img :src=\"item.img_url1\" style=\"width: 100%;height: 100% ; object-fit: cover\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n                </a>\n            </div>\n            <div class=\"item ml\">\n                <a :href=\"item.url2\" target=\"_blank\" bosszone=\"homebanner\">\n                <img :src=\"item.img_url2\" style=\"width: 100%;height: 100% ; object-fit: cover\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n                </a>\n            </div>\n          <div class=\"item ml\">\n              <a :href=\"item.url3\" target=\"_blank\" bosszone=\"homebanner\">\n            <img :src=\"item.img_url3\" style=\"width: 100%;height: 100% ; object-fit: cover\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n              </a>\n          </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports["default"] && (exports["default"].template = _vueTemplateString);

});
