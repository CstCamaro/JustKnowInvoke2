define('automall.qq.com_h5:static/comp/ad-float/ad-float.vue', function(require, exports, module) {

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
  
  var _vueTemplateString = "<div class=\"ad-float\">\n    <a :href=\"item.url\" bosszone=\"adFloat\">\n    <img :src=\"item.img_url1\" class=\"img\" onerror=\"this.src='http://mat1.gtimg.com/auto/css/platform_img/car_default.png'\">\n    </a>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports["default"] && (exports["default"].template = _vueTemplateString);

});
