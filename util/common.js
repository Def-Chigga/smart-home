export default {
  // 注意点: 如果要将一个组件封装成一个插件, 那么必须提供一个install方法
  //         那么必须在install方法中注册当前的这个组件
  install: function(Vue, Options) {
    // 获取屏幕宽高 兼容性处理
    Vue.prototype.$getScreen = function() {
      let width, height;
      if (window.innerWidth) {
        width = window.innerWidth;
        height = window.innerHeight;
      } else if (document.compatMode === 'BackCompat') {
        width = document.body.clientWidth;
        height = document.body.clientHeight;
      } else {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
      }
      return {
        width: width,
        height: height
      };
    };

    // 获取元素样式 兼容性处理
    Vue.prototype.$getStyleAttr = function(obj, name) {
      if (obj.currentStyle) {
        return obj.currentStyle[name];
      } else {
        return getComputedStyle(obj)[name];
      }
    };

    // 获取页面滚动坐标值 兼容性处理
    Vue.prototype.$getPageScroll = function() {
      let x, y;
      if (window.pageXOffset) {
        x = window.pageXOffset;
        y = window.pageYOffset;
      } else if (document.compatMode === 'BackCompat') {
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
      } else {
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop;
      }
      return {
        x: x,
        y: y
      };
    };

    // 函数防抖
    Vue.prototype.$debounce = function(fn, delay) { // fn = test
      let timerId = null;
      return function() {
        const self = this;
        const args = arguments;
        timerId && clearTimeout(timerId);
        timerId = setTimeout(function() {
          fn.apply(self, args);
        }, delay || 1000);
      };
    };

    // 函数节流
    Vue.prototype.$throttle = function(fn, delay) { // fn = test
      let timerId = null;
      let flag = true;
      return function() {
        if (!flag) return;
        flag = false;
        const self = this;
        const args = arguments;
        timerId && clearTimeout(timerId);
        timerId = setTimeout(function() {
          flag = true;
          fn.apply(self, args);
        }, delay || 1000);
      };
    };
  }
};