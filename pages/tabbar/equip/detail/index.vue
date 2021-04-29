<template>
	<view class="cc-detail">
		<!-- 顶部配置 -->
		<view class="top">
			<!-- 智能存储 -->
			<view class="content cc" v-if="showData">
				<view class="img">
					<image :src="equipDetail.imgUrl" mode="scaleToFill"></image>
				</view>
				<view class="text">已用容量</view>
				<view class="container">
					<text class="active">166.66GB/</text>
					<text>500GB</text>
				</view>
			</view>
			<!-- 智能插座 -->
			<view class="content cz" v-if="showCz">
				<view class="img">
					<image :src="equipDetail.imgUrl" mode="scaleToFill"></image>
				</view>
				<view class="text" v-if="equipDetail.state">预计已省用电量</view>
				<view class="container" v-if="equipDetail.state">
					<text class="active">6℃</text>
					<!-- <text>9999℃</text> -->
				</view>
				<view class="text" v-else>{{equipDetail.tag}}</view>
			</view>
			<!-- 智能扫地机器人 -->
			<view class="content robot" v-if="showRobot">
				<view class="img">
					<image :src="equipDetail.imgUrl" mode="scaleToFill"></image>
				</view>
				<view class="text" v-if="equipDetail.state">预计可以为您腾出时间</view>
				<view class="container" v-if="equipDetail.state">
					<text class="active">30min</text>
					<!-- <text>休闲时间</text> -->
				</view>
				<view class="text" v-else>{{equipDetail.tag}}</view>
			</view>
			<!-- 智能门锁 -->
			<view class="content lock" v-if="showLock">
				<view class="img">
					<image :src="equipDetail.imgUrl" mode="scaleToFill"></image>
				</view>
				<view class="text" v-if="equipDetail.state">防盗级别</view>
				<view class="container" v-if="equipDetail.state">
					<text class="active">99.99%/</text>
					<!-- <text>100%</text> -->
				</view>
				<view class="text" v-else>{{equipDetail.tag}}</view>
			</view>
			<!-- 智能摄像头 -->
			<view class="content camera" v-if="showCamera">
				<view class="img">
					<image :src="equipDetail.imgUrl" mode="scaleToFill"></image>
				</view>
				<view class="text" v-if="equipDetail.state">清晰度</view>
				<view class="container" v-if="equipDetail.state">
					<text class="active">99.99%/</text>
					<!-- <text>100%</text> -->
				</view>
				<view class="text" v-else>{{equipDetail.tag}}</view>
			</view>
			<!-- 智能窗帘 -->
			<view class="content cl" v-if="showCl">
				<view class="img">
					<image v-if="clState" :src="equipDetail.imgUrl.replace('close','open')" mode="scaleToFill"></image>
					<image v-else :src="equipDetail.imgUrl" mode="scaleToFill"></image>
				</view>
				<view class="text">状态</view>
				<view class="container" v-if="equipDetail.state">
					<text class="active">打开/</text>
					<text>关闭</text>
				</view>
				<view class="container" v-else>
					<text class="active">关闭/</text>
					<text>打开</text>
				</view>
				<!-- <view class="btn-group">
					<button v-if="clState" @click="toggleCl">关闭</button>
					<button v-else @click="toggleCl">打开</button>
				</view> -->
			</view>
			<!-- 智能空调 -->
			<view class="content kt" v-if="showKt">
				<view class="img">
					<image :src="equipDetail.imgUrl" mode="scaleToFill"></image>
				</view>
				<view class="text" v-if="equipDetail.state">当前温度</view>
				<view class="container" v-if="equipDetail.state">
					<text class="active">{{ktOptions.temp}}℃</text>
					<text v-if="equipDetail.state">{{ktOptions.state = ktOptions.temp < 25 ? '（制冷)' : '（制热)'}}</text>
				</view>
				<view class="text" v-else>{{equipDetail.tag}}</view>
				<view class="btn-group" v-if="equipDetail.state">
					<button @click="decreaseTemp">温度&nbsp;-</button>
					<button @click="increaseTemp">温度&nbsp;+</button>
				</view>
				<view class="control-group" v-if="equipDetail.state">
					<view class="speed">
						<view class="left" @click="toggleSpeed">风速</view>
						<view class="right">{{ktOptions.speed}}</view>
					</view>
					<view class="cloud" v-if="equipDetail.state" @click="toggleCloud">
						<view v-if="ktOptions.cloud" class="left">上下扫风</view>
						<view v-else class="left">左右扫风</view>
					</view>
				</view>
				<ul class="control-group2" v-if="equipDetail.state">
					<li :class="['state', ktOptions.stateIdx === index ? 'active' : '']" v-for="(item,index) in ktOptions.stateList"
						:key="index" @click="toggleState(item,index)">{{item}}</li>
				</ul>
			</view>
		</view>
		<!-- 底部信息 -->
		<view class="bottom">
			<ul>
				<li>
					<view class="left">产品名</view>
					<view class="right">{{equipDetail.name}}</view>
				</li>
				<li>
					<view class="left">产品描述</view>
					<view class="right">{{equipDetail.description}}</view>
				</li>
				<li>
					<view class="left">设备状态</view>
					<view class="right active" v-if="equipDetail.state">在线</view>
					<view class="right" v-else>离线</view>
				</li>
			</ul>
			<button v-if="equipDetail.state" class="btn-use" @click="nouseEquip(equipDetail.name)">停用设备</button>
			<button v-else class="btn-use" @click="useEquip(equipDetail.name)">使用设备</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				equipDetail: null,
				showData: false,
				showLock: false,
				showKt: false,
				ktOptions: {
					temp: (Math.random() * (30 - 15) + 15).toFixed(1),
					speed: '低',
					cloud: true,
					stateList: ['制冷', '制热'],
					state: '（制冷)',
					stateIdx: 0,
				},
				showCz: false,
				showRobot: false,
				showCamera: false,
				showCl: false,
				clState: true
			}
		},
		onLoad(options) {
			if (options) {
				const item = JSON.parse(options.equipDetail);
				item.imgUrl = '../' + item.imgUrl;
				this.equipDetail = item;
				uni.setNavigationBarTitle({
					title: item.name
				})
				if (item.name === '智能存储') {
					this.showData = true;
				}else if(item.name === '智能空调'){
					this.showKt = true;
				}else if(item.name === '智能插座'){
					this.showCz = true;
				}else if(item.name === '智能扫地机器人'){
					this.showRobot = true;
				}else if(item.name === '智能门锁'){
					this.showLock = true;
				}else if(item.name === '智能摄像头'){
					this.showCamera = true;
				}else if(item.name === '智能窗帘'){
					this.showCl = true;
				}
			}
		},
		onShow() {
			this.ktOptions.stateIdx = this.ktOptions.temp < 25 ? 0 : 1
		},
		methods: {
			// 使用设备
			useEquip(name) {
				uni.showLoading({
					title: '正在启用设备...',
					mask: true
				});
				setTimeout(()=>{
					this.$http({
						url: '/admin/smarthome/smSceneEquip/baseInsertOrUpdate',
						data: {
							smSceneEquipId: this.equipDetail.nldExt.values.smSceneEquipId,
							state: true
						}
					}).then(res=>{
						uni.hideLoading()
						setTimeout(()=>{
							uni.showToast({
								title: '设备启用成功',
								icon: 'none'
							})
						},500)
					})
					this.equipDetail.state = true;
					if(name === '智能空调') {
						this.ktOptions.temp = (Math.random() * (30 - 15) + 15).toFixed(1)
					}else if(name === '智能窗帘') {
						this.clState = true;
					}
				},500)
			},
			// 停用设备
			nouseEquip(name) {
				uni.showModal({
					title: '是否停用设备？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.confirm) {
							this.$http({
								url: '/admin/smarthome/smSceneEquip/baseInsertOrUpdate',
								data: {
									smSceneEquipId: this.equipDetail.nldExt.values.smSceneEquipId,
									state: false
								}
							}).then(res=>{
							})
							this.equipDetail.state = false
							// if(name === '智能空调') {
							// 	// this.ktOptions.temp = 0
							// }else if(name === '智能窗帘') {
							// 	this.clState = false
							// }
						}
					},
				});
			},
			
			// 打开关闭窗帘
			toggleCl() {
				let openStr = '正在打开...';
				let closeStr = '正在关闭...';
				if(this.clState){
					uni.showLoading({
						title: closeStr,
						mask: true
					});
				}else{
					uni.showLoading({
						title: openStr,
						mask: true
					});
				}
				setTimeout(()=>{
					uni.hideLoading()
				},500)
				this.clState = !this.clState
			},
			/**
			 * 智能空调相关方法
			 */
			decreaseTemp() {
				uni.showLoading({});
				setTimeout(()=>{
					uni.hideLoading()
				},200)
				this.ktOptions.temp = this.ktOptions.temp - 0 - 1
			},
			increaseTemp() {
				uni.showLoading({});
				setTimeout(()=>{
					uni.hideLoading()
				},200)
				this.ktOptions.temp = this.ktOptions.temp + 0 + 1
			},
			toggleSpeed() {
				uni.showLoading({});
				setTimeout(()=>{
					uni.hideLoading()
				},300)
				if (this.ktOptions.speed === '低') {
					this.ktOptions.speed = '中'
				} else if (this.ktOptions.speed === '中') {
					this.ktOptions.speed = '高'
				} else if (this.ktOptions.speed === '高') {
					this.ktOptions.speed = '低'
				}
			},
			toggleCloud() {
				uni.showLoading({});
				setTimeout(()=>{
					uni.hideLoading()
				},300)
				this.ktOptions.cloud = !this.ktOptions.cloud
			},
			toggleState(item, idx) {
				uni.showLoading({});
				setTimeout(()=>{
					uni.hideLoading()
				},300)
				this.ktOptions.state = '（' + item + ')'
				this.ktOptions.stateIdx = idx
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cc-detail {
		height: 100%;

		.top {
			height: 660rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: #fff;
				width: 480rpx;
				height: 480rpx;
				border-radius: 50%;
				overflow: hidden;
				box-shadow: 0 0 5px #ccc;
				.img{
					width: 360rpx;
					height: 280rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.text {
					color: #B4B4B4;
					font-size: 26rpx;
					margin: 20rpx 0;
				}

				.container {
					text {
						font-size: 24rpx;
					}

					.active {
						font-size: 38rpx;
						font-weight: bold;
						margin-right: 10rpx;
					}
				}

				.btn-group {
					position: absolute;
					bottom: 10rpx;
					display: flex;

					button {
						width: 180rpx;
						border-radius: 64rpx;
						font-size: 26rpx;
						color: $pdc-app-color;
						border: 1rpx solid $pdc-app-color;
						outline: none;
						margin-left: 20rpx;
						margin-right: 20rpx;
					}
				}
				&.cl{
					padding-top: 70rpx;
					box-sizing: border-box;
					.img{
						width: 360rpx;
						height: 220rpx;
						transform: scale(0.9);
					}
					.btn-group {
						right: 20rpx;
						bottom: 20rpx;
						button {
							width: 180rpx;
							border-radius: 64rpx;
							font-size: 26rpx;
							color: $pdc-app-color;
							border: 1rpx solid $pdc-app-color;
							outline: none;
						}
					}
				}
				&.cz{
					.img{
						width: 280rpx;
						height: 240rpx;
						padding-top: 40rpx;
					}
				}
				&.robot{
					.img{
						width: 280rpx;
						height: 260rpx;
					}
				}
				&.kt{
					.img{
						width: 360rpx;
						height: 280rpx;
					}
				}
				&.cc{
					.img{
						width: 380rpx;
						height: 280rpx;
					}
				}

				.control-group {
					position: absolute;
					left: 5rpx;
					top: 50%;
					transform: translateY(-50%);

					.speed,
					.cloud {
						height: 120rpx;
						width: 40rpx;
						border-radius: 64rpx;
						font-size: 26rpx;
						color: $pdc-app-color;
						border: 1rpx solid $pdc-app-color;
						outline: none;
						margin-left: 20rpx;
						margin-right: 20rpx;
						-webkit-writing-mode: vertical-rl;
						writing-mode: vertical-rl;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 20rpx;
					}

					.speed {
						justify-content: space-between;
						margin-bottom: 50rpx;
					}
				}

				.control-group2 {
					position: absolute;
					right: 5rpx;
					top: 50%;
					transform: translateY(-50%);

					.state {
						height: 120rpx;
						width: 40rpx;
						border-radius: 64rpx;
						font-size: 26rpx;
						border: 1rpx solid #ccc;
						outline: none;
						margin-left: 20rpx;
						margin-right: 20rpx;
						-webkit-writing-mode: vertical-rl;
						writing-mode: vertical-rl;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 20rpx;
						margin-bottom: 50rpx;

						&:last-of-type {
							margin-bottom: 0;
						}

						&.active {
							color: $pdc-app-color;
							border: 1rpx solid $pdc-app-color;
						}
					}
				}
			}
		}

		.bottom {
			background-color: #fff;
			height: calc(100% - 660rpx);
			box-shadow: 0 0 10rpx #ccc;
			border-top-left-radius: 64rpx;
			border-top-right-radius: 64rpx;
			padding: 40rpx;
			box-sizing: border-box;

			ul {
				li {
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #F3F3F3;

					.left {
						font-size: 30rpx;
					}

					.right {
						font-size: 26rpx;
						color: #B4B4B4;

						&.active {
							color: $pdc-app-color;
						}
					}

					&:last-of-type {
						border: none;
					}
				}
			}

			.btn-use {
				margin-top: 80rpx;
				width: 90%;
				border-radius: 50upx;
				font-size: 16px;
				color: #fff;
				/* background: linear-gradient(to right, #365fff, #36bbff); */
				background-color: $pdc-app-color;
			}
		}
	}
</style>
