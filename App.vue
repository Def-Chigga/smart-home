<script>
	export default {
		globalData: {
			// imgHttp: 'http://192.168.0.142:8888/api-admin/file/upload',
			// imgUrl: 'http://192.168.0.142:81/',
			// imgHttp: 'http://pdc.yn.cn:8899/api-admin/file/upload',
			// imgUrl: 'http://pdc.yn.cn:80/',
			// wsHttp: 'ws://192.168.0.142:8889/ws',
			// wsHttp: 'ws://pdc.yn.cn:8889/ws'
			equipList: [{
					name: '智能插座', // 设备名
					tag: '智能 | 小身材 | 多用处', // 设备标签
					description: '智能一键开关，为您省心省电', // 设备描述
					imgUrl: '../../../static/images/equip/equip-chazuo.jpg', // 设备图片
					state: false, // 设备状态
				},
				{
					name: '智能空调',
					tag: '智能 | 远程集中控制',
					description: '智能控制，打造休闲舒适环境',
					imgUrl: '../../../static/images/equip/equip-kongtiao1.jpg',
					state: true
				},
				{
					name: '智能扫地机器人',
					tag: '智能 | 拖扫一体 | 自动集尘',
					description: '智能路径规划，解放你的双手',
					imgUrl: '../../../static/images/equip/equip-clean.jpg',
					state: true
				},
				{
					name: '智能门锁',
					tag: '智能开关 | 防猫眼电子锁',
					description: '智能操控，更多安全防护',
					imgUrl: '../../../static/images/equip/equip-lock.jpg',
					state: true
				},
				{
					name: '智能存储',
					tag: '智能开关 | 远程控制',
					description: '智能存储硬盘，数据守护者',
					imgUrl: '../../../static/images/equip/equip-data.jpg',
					state: true
				},
				{
					name: '智能摄像头',
					tag: '智能开关 | 防盗监控',
					description: '1080P云台高清智能网络摄像头',
					imgUrl: '../../../static/images/equip/equip-camera.jpg',
					state: true
				},
				{
					name: '智能窗帘',
					tag: '联动场景 | 开启慵懒生活',
					description: '一键开关，开启智能生活',
					imgUrl: '../../../static/images/equip/equip-chuanglian-close.png',
					state: true
				}
			],
			inHomeList: [{
					name: '智能插座', // 设备名
					tag: '智能 | 小身材 | 多用处', // 设备标签
					description: '智能一键开关，为您省心省电', // 设备描述
					imgUrl: '../../../static/images/equip/equip-chazuo.jpg', // 设备图片
					state: true, // 设备状态
				},
				{
					name: '智能空调',
					tag: '智能 | 远程集中控制',
					description: '智能控制，打造休闲舒适环境',
					imgUrl: '../../../static/images/equip/equip-kongtiao1.jpg',
					state: true
				},
				{
					name: '智能门锁',
					tag: '智能开关 | 防猫眼电子锁',
					description: '智能操控，更多安全防护',
					imgUrl: '../../../static/images/equip/equip-lock.jpg',
					state: true
				},
				{
					name: '智能摄像头',
					tag: '智能开关 | 防盗监控',
					description: '1080P云台高清智能网络摄像头',
					imgUrl: '../../../static/images/equip/equip-camera.jpg',
					state: false
				},
				{
					name: '智能窗帘',
					tag: '联动场景 | 开启慵懒生活',
					description: '一键开关，开启智能生活',
					imgUrl: '../../../static/images/equip/equip-chuanglian-close.png',
					state: true
				}
			],
			outHomeList: [{
					name: '智能插座', // 设备名
					tag: '智能 | 小身材 | 多用处', // 设备标签
					description: '智能一键开关，为您省心省电', // 设备描述
					imgUrl: '../../../static/images/equip/equip-chazuo.jpg', // 设备图片
					state: false, // 设备状态
				},
				{
					name: '智能空调',
					tag: '智能 | 远程集中控制',
					description: '智能控制，打造休闲舒适环境',
					imgUrl: '../../../static/images/equip/equip-kongtiao1.jpg',
					state: false
				},
				{
					name: '智能扫地机器人',
					tag: '智能 | 拖扫一体 | 自动集尘',
					description: '智能路径规划，解放你的双手',
					imgUrl: '../../../static/images/equip/equip-clean.jpg',
					state: true
				},
				{
					name: '智能门锁',
					tag: '智能开关 | 防猫眼电子锁',
					description: '智能操控，更多安全防护',
					imgUrl: '../../../static/images/equip/equip-lock.jpg',
					state: false
				},
				{
					name: '智能摄像头',
					tag: '智能开关 | 防盗监控',
					description: '1080P云台高清智能网络摄像头',
					imgUrl: '../../../static/images/equip/equip-camera.jpg',
					state: true
				},
				{
					name: '智能窗帘',
					tag: '联动场景 | 开启慵懒生活',
					description: '一键开关，开启智能生活',
					imgUrl: '../../../static/images/equip/equip-chuanglian-close.png',
					state: false
				}
			],
			sleepList: [{
					name: '智能插座', // 设备名
					tag: '智能 | 小身材 | 多用处', // 设备标签
					description: '智能一键开关，为您省心省电', // 设备描述
					imgUrl: '../../../static/images/equip/equip-chazuo.jpg', // 设备图片
					state: false, // 设备状态
				},
				{
					name: '智能空调',
					tag: '智能 | 远程集中控制',
					description: '智能控制，打造休闲舒适环境',
					imgUrl: '../../../static/images/equip/equip-kongtiao1.jpg',
					state: false
				},
				{
					name: '智能门锁',
					tag: '智能开关 | 防猫眼电子锁',
					description: '智能操控，更多安全防护',
					imgUrl: '../../../static/images/equip/equip-lock.jpg',
					state: true
				},
				{
					name: '智能摄像头',
					tag: '智能开关 | 防盗监控',
					description: '1080P云台高清智能网络摄像头',
					imgUrl: '../../../static/images/equip/equip-camera.jpg',
					state: true
				},
				{
					name: '智能窗帘',
					tag: '联动场景 | 开启慵懒生活',
					description: '一键开关，开启智能生活',
					imgUrl: '../../../static/images/equip/equip-chuanglian-close.png',
					state: false
				}
			],
			closeList: [{
				name: '智能插座', // 设备名
				tag: '智能 | 小身材 | 多用处', // 设备标签
				description: '智能一键开关，为您省心省电', // 设备描述
				imgUrl: '../../../static/images/equip/equip-chazuo.jpg', // 设备图片
				state: false, // 设备状态
			}],
			viewDefaultList: [
				{
					title: '回家',
					imgUrl: '../../../static/images/home/view-inhome.png',
					imgActiveUrl: '../../../static/images/home/view-inhome-active.png',
				},
				{
					title: '离家',
					imgUrl: '../../../static/images/home/view-outhome.png',
					imgActiveUrl: '../../../static/images/home/view-outhome-active.png',
				},
				{
					title: '睡眠模式',
					imgUrl: '../../../static/images/home/view-sleep.png',
					imgActiveUrl: '../../../static/images/home/view-sleep-active.png',
				},
				{
					title: '一键关闭所有插座',
					imgUrl: '../../../static/images/home/view-close.png',
					imgActiveUrl: '../../../static/images/home/view-close-active.png',
				},
			],
		},
		onLaunch: function() {
			// #ifdef APP-PLUS
			//设置2.4秒后主动关闭，最多设置6秒
			setTimeout(() => {
				plus.navigator.closeSplashscreen();
			}, 2400);
			// #endif
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			// 每次APP启动看token是否过期
			// this.$storage('nld_login_token',null)
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	uni-page {
		font-size: 20rpx;
		font-family: Microsoft YaHei;
		color: #3B3B3B;
		font-weight: 400;
	}

	uni-page-body {
		// width: 750rpx;
		// height: calc(1334rpx - 50px - env(safe-area-inset-bottom) );为
		width: 100%;
		height: 100%;
		background-color: #f8f8f8;
		font-size: 24rpx;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
	}

	/*轮播图样式填充 */
	uni-swiper {
		width: 100%;
		height: 100%;

		swiper-item {
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	/* 轮播图指示器样式 */
	.uni-swiper-dots {
		.uni-swiper-dot {
			width: 8rpx;
			height: 8rpx;
			margin-right: 8rpx !important;
		}

		.uni-swiper-dot-active {
			width: 28rpx;
			height: 8rpx;
			border-radius: 4rpx;
		}
	}
</style>
