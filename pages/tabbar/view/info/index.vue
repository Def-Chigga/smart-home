<template>
	<view class="view-info">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<view class="nav-bar">
			<view class="back" @click="back">
				<image src="../../../../static/images/icon-arrow-left.png" mode="scaleToFill"></image>
			</view>
			<view class="title">{{title}}</view>
			<view class="save" v-if="enable === 'true'" @click="closeView">停用</view>
			<view class="save" v-else @click="openView">启用</view>
		</view>

		<view class="view-content">{{content}}</view>
		<scroll-view class="equip-list" scroll-y="true">
			<h3>场景名称</h3>
			<view class="view-name">
				<view class="name">
					{{title}}
				</view>
			</view>
			<h3>场景执行任务</h3>
			<ul>
				<li v-for="(item,index) in equipList" :key="index">
					<view class="left">
						<image :src="'../' + item.imgUrl" mode="scaleToFill"></image>
						<view class="container">
							<view class="title">{{item.name}}</view>
							<view v-if="item.state" class="state active">开启</view>
							<view v-else class="state">关闭</view>
						</view>
					</view>
					<view class="right">设备运行正常</view>
				</li>
			</ul>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: '',
				smSceneId: '',
				equipList: [],
				enable: '',
				enableEquipList: []
			}
		},
		onLoad(options) {
			if (options) {
				this.title = options.title
				if(options.content.length !== 4){
					this.content = options.content
				}else{
					this.content = '快开启属于自己的智能场景吧！'
				}
				this.smSceneId = options.smSceneId
				this.enable = options.enable
				this.getViewEquipList()
			}
		},
		onShow() {
			if(uni.getStorageSync('equipList')){
				this.enableEquipList = uni.getStorageSync('equipList')
			}
		},
		methods: {
			// 获取对应场景设备列表
			getViewEquipList() {
				this.$http({
					url: `/admin/smarthome/smSceneEquip/loadSceneEquips?sceneId=${this.smSceneId}`
				}).then(res=>{
					this.equipList = res.data
				})
			},
			openView() {
				this.handleView(true)
			},
			closeView() {
				uni.showModal({
					title: '是否停用此场景？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.handleView(false)
						}
					}
				});
			},
			handleView(flag) {
				if(flag){
					// 如果我的设备列表为空
					if(this.enableEquipList.length === 0) {
						return uni.showToast({
							title: '设备列表为空，请先添加设备！',
							icon: 'none'
						});
					}
					this.handleIsShowEuipList(flag)
				}else{
					this.handleEquipState(flag)
				}
			},
			// 处理添加设备是否包含场景所需设备
			handleIsShowEuipList(flag) {
				let arr1 = []
					let arr2 = []
					let count = 0
					this.enableEquipList.forEach(item=>{
						arr1.push(item.smEquipId)
					})
					this.equipList.forEach(item=>{
						arr2.push(item.smEquipId)
					})
					arr2.forEach(item=>{
						if(arr1.includes(item)){
							count++
						}
					})
					if(arr2.length !== count){
						uni.showToast({
							title: '该场景需要的设备不足，请先添加设备！',
							icon: 'none'
						});
					}else{
						// if(this.equipList.length > 1){
						// 	uni.showToast({
						// 		title: '请先关闭其它场景！',
						// 		icon: 'none'
						// 	});
						// }
						this.handleEquipState(flag)
					}
			},
			handleEquipState(flag) {
				this.$http({
					url: '/admin/smarthome/smScene/baseInsertOrUpdate',
					data: {
						smSceneId: this.smSceneId,
						enable: flag,
						smRoomId: uni.getStorageSync('defaultHomeList').smRoomId,
					}
				}).then(res=>{
					if(!flag){
						uni.removeStorageSync('smSceneId')
					}else{
						uni.setStorageSync('smSceneId',this.smSceneId)
					}
					this.enable = this.enable === 'true' ? 'false' : 'true'
				})
			},
			back() {
				uni.navigateBack({})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.view-info {
		width: 100%;
		height: 100%;
		.status_bar {
		    height: var(--status-bar-height);
		    width: 100%;
			/* #ifdef APP-PLUS */
			position: fixed;
			top: 0;
			z-index: 999;
			background-color: #fff;
			/* #endif */
		}
		.nav-bar {
			/* #ifdef APP-PLUS */
			position: fixed;
			top:var(--status-bar-height);
			z-index: 999;
			background-color: #fff;
			/* #endif */
			width: 100%;
			height: 88rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			box-sizing: border-box;

			.title {
				font-size: 32rpx;
				color: #000;
				font-weight: 600;
			}

			.save {
				width: 80rpx;
				height: 60rpx;
				line-height: 60rpx;
				background-color: $pdc-app-color;
				text-align: center;
				color: #fff;
				border-radius: 30rpx;
				font-size: 24rpx;
			}

			.back {
				width: 80rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 56rpx;
					height: 56rpx;
				}
			}
		}

		.view-content {
			/* #ifdef APP-PLUS */
			position: fixed;
			top: calc(var(--status-bar-height) + 88rpx);
			z-index: 999;
			background-color: #fff;
			/* #endif */
			height: 220rpx;
			background-color: #fff;
			font-size: 36rpx;
			padding: 0 80rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			text-align: center;
		}

		.equip-list {
			/* #ifdef APP-PLUS */
			position: fixed;
			top: calc(var(--status-bar-height) + 308rpx);
			z-index: 999;
			background-color: #fff;
			/* #endif */
			height: calc(100% - 308rpx);

			h3 {
				height: 60rpx;
				line-height: 60rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
				color: #D4D4D4;
				font-size: 26rpx;
			}

			.view-name {
				height: 110rpx;
				background-color: #fff;
				padding: 20rpx 60rpx 25rpx 30rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
				margin: 0 20rpx;

				.name {
					height: 100%;
					// padding: 20rpx;
					// box-sizing: border-box;
					font-size: 30rpx;
					display: flex;
					align-items: center;
					border-bottom: 2rpx solid #ccc;
				}
			}

			ul {
				margin: 0 20rpx;
				border-radius: 10rpx;
				background-color: #fff;
					/* #ifdef APP-PLUS */
					padding-bottom: 70rpx;
					/* #endif */
				li {
					height: 160rpx;
					padding: 20rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #ccc;

					.left {
						display: flex;
						align-items: center;

						image {
							width: 100rpx;
							height: 100rpx;
						}

						.container {
							margin-left: 20rpx;

							.title {
								font-size: 28rpx;
								margin-bottom: 10rpx;
							}

							.state {
								font-size: 24rpx;
								color: #999;

								&.active {
									color: $pdc-app-color;
								}
							}
						}
					}

					.right {
						color: $pdc-app-color;
						font-size: 24rpx;
					}

					&:last-of-type {
						border: none;
					}
				}
			}
		}
	}
</style>
