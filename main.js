import Vue from 'vue'
import App from './App'

// 引入封装好的请求文件
import { http } from './util/api.js';
// 挂载到vue原型上，通过this.$http调用
Vue.prototype.$http = http;
// 引入工具类
import tools from '@/util/common.js';
Vue.use(tools)


//缓存,默认有效期8小时
Vue.prototype.$storage = function(key, value, seconds) {
	var timestamp = Date.parse(new Date()) / 1000
	// console.log(timestamp + "===" + key)
	if (key && value === null) {
		//删除缓存
		//获取缓存
		var val = uni.getStorageSync(key);
		var tmp = val.split("|")
		// console.log(timestamp);
		// console.log(tmp[1]);
		if (!tmp[1] || timestamp >= tmp[1]) {
			console.log("token已失效")
			uni.removeStorageSync(key)
			setTimeout(()=>{
				uni.reLaunch({
					// 注意路径为相对路径
					url: '../login/login'
				})
			},500)
		} else {
			console.log("token未失效")
			uni.showLoading({})
			setTimeout(()=>{
				uni.hideLoading()
				uni.switchTab({
					// 注意路径为相对路径
					url: '../tabbar/home/index'
				})
			},100)
		}
	} else if (key && value) {
		//设置缓存
		if (!seconds) {
			var expire = timestamp + (3600 * 8)
		} else {
			var expire = timestamp + seconds
		}
		value = value + "|" + expire
		uni.setStorageSync(key, value);
	} else {
		console.log("key不能空")
	}
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
