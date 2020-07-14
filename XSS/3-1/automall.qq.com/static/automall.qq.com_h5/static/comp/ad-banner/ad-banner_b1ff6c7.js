define('automall.qq.com_h5:static/comp/ad-banner/ad-banner.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _vue = require('automall.qq.com_h5:node_modules/vue/dist/vue');
  
  var _vue2 = _interopRequireDefault(_vue);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    name: 'adBanner',
    props: {
      aspectRatio: Number,
      link: String,
      imageUrl: String,
      height: {
        type: String,
        "default": 'auto'
      }
    },
    data: function data() {
      return {
        xheight: 'auto'
      };
    },
    mounted: function mounted() {
      var _this = this;
  
      this.$nextTick(function () {
        _this.xheight = _this.getHeight();
      });
    },
  
    methods: {
      getHeight: function getHeight() {
        // when list.length > 0, it's better to set height or ratio
        var hasHeight = parseInt(this.height, 10);
        if (hasHeight) return this.height;
  
        console.log('屏幕宽度');
        console.log(this.$el.offsetWidth);
        console.log('屏幕宽度');
        if (!hasHeight) {
          if (this.aspectRatio) {
            return this.$el.offsetWidth * this.aspectRatio + 'px';
          }
          return '200px';
        }
      }
    }
  };
  
  var _vueTemplateString = "<div class=\"ad-banner-container\" :style=\"{height: xheight}\" v-if=\"imageUrl\">\n  <a :href=\"link\" class=\"add-banner-link\" v-if=\"link\" bosszone=\"adbh5\">\n    <div :style=\"{backgroundImage: 'url(' + imageUrl + ')', height: xheight}\" class=\"add-banner-image\"></div>\n  </a>\n  <div :style=\"{backgroundImage: 'url(' + imageUrl + ')', height: xheight}\" class=\"add-banner-image\" v-else=\"\"></div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports["default"] && (exports["default"].template = _vueTemplateString);

});
