const BASE_URL = 'http://smart.ynbwsj.com:81'
export const http = (options) => {
	// 加载中
	uni.showLoading({
		title: "加载中"
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'POST',
			data: options.data || {page:1,pageSize:30},
			header:options.header || 
				{
					'Content-Type':'application/json',
					// 切割使用token 不要|与时间差
					'nld_login_token': uni.getStorageSync('nld_login_token') !== undefined ? uni.getStorageSync('nld_login_token').split('|')[0] : '',
				},
			// 允许跨域 让ajax携带cookie
			withCredentials: true,
			success: (res) => {
				if (res.data.status !== 1) {
					if (res.data.status === 10001){
						uni.showToast({
							title: '需要登录',
							icon: 'none'
						})
					}else{
						uni.showToast({
								title: '获取数据失败',
								icon: 'none'
						})
					}
			}
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败',
					icon: 'none'
				})
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}