<template>
	<view class="view-info">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<view class="nav-bar">
			<view class="back" @click="back">
				<image src="../../../../static/images/icon-arrow-left.png" mode="scaleToFill"></image>
			</view>
			<view class="title">{{title}}</view>
			<view class="save" @click="saveView">保存</view>
		</view>

		<view class="view-content">{{content}}</view>
		<scroll-view class="equip-list" scroll-y="true">
			<h3>场景名称</h3>
			<view class="view-name">
				<view class="name">
					<input ref="input" type="text" v-model="value" placeholder="请输入场景名称" />
					<view class="close" v-if="value" @click="clearValue">
						<image src="../../../../static/images/icon-input-delete.png" mode="scaleToFill"></image>
					</view>

				</view>
			</view>
			<h3>设置执行设备</h3>
			<view class="bg-null" v-if="equipList.length === 0"></view>
			<ul v-else>
				<li v-for="(item,index) in equipList" :key="index">
					<view class="left">
						<switch style="transform:scale(0.7)" color="#d5bb97"  :disabled="!item.enable" checked="true" @change="changeState"/>
						<image :src="'../' + item.imgUrl" mode="scaleToFill"></image>
						<view class="container">
							<view class="title">{{item.name}}</view>
							<view class="state">设备运行正常</view>
						</view>
					</view>
					<button v-if="item.enable" class="right" @click="addEquip(item)">添加</button>
					<button v-else class="right active">已添加</button>
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
				value: '',
				equipList: [],
				idxList: [],
				smRoomId: null,
				state: true,
				equips: []
			}
		},
		onLoad(options) {
			this.title = options.title
			this.content = options.content
			this.smRoomId = uni.getStorageSync('defaultHomeList').smRoomId
		},
		onShow() {
			this.smRoomId = uni.getStorageSync('defaultHomeList').smRoomId
			this.getEquipList()
		},
		methods: {
			getEquipList() {
				this.$http({
					url: '/admin/smarthome/smEquip/baseSelectByPage',
					data: {
						enable: true
					}
				}).then(res => {
					this.equipList = res.data.list;
				})
			},
			back() {
				uni.navigateBack({})
			},
			saveView() {
				uni.showModal({
					title: '是否保存此场景？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							if(!this.value){
								return uni.showToast({
									title: '请先输入场景名称!',
									icon: 'none'
								});
							}
							if(this.equips.length === 0){
								return uni.showToast({
									title: '请先添加设备!',
									icon: 'none'
								});
							}
							this.$http({
								url: '/admin/smarthome/smScene/initScene',
								data: {
									smRoomId: this.smRoomId,
									title: this.value,
									nldExt:{
										values: {
											equips: this.equips
										}
									}
								}
							}).then(res=>{
								setTimeout(()=>{
									uni.navigateBack({})
								},500)
							})
						}
					}
				});
			},
			clearValue() {
				this.value = ''
				this.$refs.input.$el.focus()
			},
			changeState(e){
				this.state = e.detail.value
			},
			addEquip(item) {
				item.enable = !item.enable
				let obj = {
					id: item.smEquipId,
					state: this.state,
				}
				this.equips.push(obj)
				this.state = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-info {
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
				margin: 0 20rpx;
				height: 110rpx;
				background-color: #fff;
				padding: 20rpx 60rpx 25rpx 30rpx;
				box-sizing: border-box;
				border-radius: 10rpx;

				.name {
					width: 100%;
					height: 100%;
					font-size: 30rpx;
					display: flex;
					align-items: center;
					border-bottom: 2rpx solid #ccc;
					position: relative;

					.close {
						position: absolute;
						right: 20rpx;
						image{
							width: 32rpx;
							height: 32rpx;
						}
					}
					uni-input{
						width: 100%;
					}
				}
			}
			.bg-null{
				height: calc(100% - 230rpx);
				background: url(../../../../static/images/view/view-bg-null.png);
				background-size: cover;
				background-position: 0 50%;
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
							width: 110rpx;
							height: 110rpx;
						}

						.container {
							margin-left: 20rpx;

							.title {
								font-size: 28rpx;
								margin-bottom: 10rpx;
							}

							.state {
								font-size: 24rpx;
								color: $pdc-app-color;
							}
						}
					}

					.right {
						height: 60rpx;
						line-height: 60rpx;
						font-size: 28rpx;
						margin: 0;
						color: #fff;
						background-color: $pdc-app-color;

						&.active {
							color: $pdc-app-color;
							background-color: #f8f8f8;
						}
					}

					&:last-of-type {
						border: none;
					}
				}
			}
		}
	}
</style>
