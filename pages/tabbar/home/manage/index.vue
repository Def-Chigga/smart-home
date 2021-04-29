<template>
	<view class="manage">
		<view class="manage-header">
			<view class="header-left">家庭名</view>
			<view class="header-right" @click="editHomeName">
				<text>{{defaultHomeList.name}}</text>
				<image src="../../../../static/images/icon-edit.png" mode="scaleToFill"></image>
			</view>
		</view>
		<h3>家庭列表</h3>
		<scroll-view class="manage-room" scroll-y="true">
			<ul class="room-list">
				<uni-swipe-action v-for="item in homeList" :key="item.smRoomId">
					<!-- 基础用法 -->
					<uni-swipe-action-item :right-options="options" @click="onClick" @change="getCurrentHome(item)">
						<li class="room-item">
							<view class="left">{{item.name}}</view>
							<view class="right" @click="toEquipList">
								<text>{{equipTotal}}个设备</text>
								<image src="../../../../static/images/icon-arrow-right-black.png" mode="scaleToFill"></image>
							</view>
						</li>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</ul>
		</scroll-view>
		<button class="btn-logout" @click="addHome">新增家庭</button>
		<Dialog :value="roomName" :title="title" :showDialog="showDialog" @hiddenDialog="hiddenDialog"
			@confirmDialog="confirmDialog"></Dialog>
	</view>
</template>

<script>
	import Dialog from '@/components/dialog/index.vue'
	import uniSwipeAction from '@/components/uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			Dialog,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				homeName: '',
				roomName: '',
				homeList: [],
				defaultHomeList: null,
				title: '',
				showDialog: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '进入',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				addOrEdit: false,
				currentHome: null,
				equipTotal: 0,
				lastClick: 0,
				delay: 40
			}
		},
		onLoad(options) {
			if(options){
				this.homeName = options.homeName
				this.defaultHomeList = uni.getStorageSync('defaultHomeList')
			}
			this.getHomeList()
		},
		onShow() {
			this.equipTotal = uni.getStorageSync('equipList').length
		},
		computed: {
			userInfo() {
				return uni.getStorageSync('userInfo')
			}
		},
		methods: {
			onClick(e) {
				// 解决组件点击事件会执行两次
				if (this.lastClick >= (Date.now() - this.delay)){
					return
				}
				this.lastClick = Date.now(); 
				if(e.index === 0){
					uni.showModal({
						title: '是否要删除家庭？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确认',
						success: res => {
							if(res.confirm){
								if(this.homeList.length === 1){
									uni.showToast({
										title: '最少保留一个家庭！',
										icon: 'none'
									});
								}else{
									// 删除家庭
									if(this.defaultHomeList.smRoomId === this.currentHome.smRoomId){
										setTimeout(()=>{
											uni.showToast({
												title: '不能删除正在开启的房间！',
												icon: 'none'
											})
										},500)
									}else{
										this.$http({
											url: '/admin/smarthome/smRoom/baseDeleteById',
											data: {
												smRoomId: this.currentHome.smRoomId
											}
										}).then(res=>{
											this.getHomeList()
											setTimeout(()=>{
												uni.showToast({
													title: res.msg,
													icon: 'none'
												})
											},500)
										})
									}
								}
								
							}
						}
					});
				}else if(e.index === 1){
					if(uni.getStorageSync('smSceneId')){
						return uni.showToast({
							title: '进入新家前必须关闭所有场景！',
							icon: 'none'
						});
					}
					// 进入家庭
					this.$http({
						url: '/admin/smarthome/smRoom/baseGetById',
						data: {
							smRoomId: this.currentHome.smRoomId
						}
					}).then(res=>{
						this.defaultHomeList = res.data
						uni.setStorageSync('defaultHomeList', this.defaultHomeList)
						setTimeout(()=>{
							uni.switchTab({
								url: '../index'
							})
						},500)
					})
				}
			},
			getCurrentHome(item) {
				this.currentHome = item
			},
			// 获取家庭列表
			getHomeList() {
				this.$http({
					url: '/admin/smarthome/smRoom/baseSelectByPage',
					data: {
						sysCreateUserId: this.userInfo.userId
					}
				}).then(res=>{
					this.homeList = res.data.list
				})
			},
			hiddenDialog() {
				this.showDialog = false
			},
			confirmDialog(val) {
				if(this.addOrEdit){
					// 新增家庭
					this.handleHome(val, false)
				}else{
					// 编辑家庭
					this.handleHome(val, true)
				}
				this.showDialog = false
			},
			handleHome(val,flag) {
				this.$http({
					url: '/admin/smarthome/smRoom/baseInsertOrUpdate',
					data: {
						name: val,
						smRoomId: flag ? this.defaultHomeList.smRoomId : ''
					}
				}).then(res=>{
					if(flag){
						this.defaultHomeList.name = val
					}
					this.getHomeList()
				})
			},
			addHome() {
				this.title = '输入新家庭名'
				this.roomName = ''
				this.addOrEdit = true
				this.showDialog = true
			},
			editHomeName() {
				this.title = '修改家庭名'
				this.roomName = this.homeName
				this.addOrEdit = false
				this.showDialog = true
			},
			toEquipList() {
				uni.showLoading({
					title: '加载设备列表...',
					mask: true
				});
				setTimeout(()=>{
					uni.hideLoading()
					uni.switchTab({
						url: '../../equip/index'
					});
				},500)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.manage {
		padding-top: 20rpx;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		position: relative;
		/* #ifdef APP-PLUS */
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		/* #endif */
		background-color: #f8f8f8;
		.manage-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			padding: 0 20rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			.header-left{
				/* #ifdef APP-PLUS */
				width: 50%;
				/* #endif */
			}
			.header-right {
				display: flex;
				align-items: center;
				/* #ifdef APP-PLUS */
				width: 50%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				/* #endif */
				text {
					color: #A9A9A9;
				}
				image {
					width: 32rpx;
					height: 32rpx;
					margin-left: 15rpx;
				}
			}
		}

		h3 {
			height: 60rpx;
			line-height: 60rpx;
			padding-left: 20rpx;
			box-sizing: border-box;
			color: #D4D4D4;
			font-size: 26rpx;
		}

		.manage-room {
			height: calc(100% - 528rpx);
			/* #ifdef APP-PLUS */
			height: 806rpx;
			// position: relative;
			// top: 0;
			// right: 0;
			// bottom: 500rpx;
			// left: 0;
			// z-index: 999;
			// background-color: #fff;
			/* #endif */
			.room-list {
				padding: 0 20rpx;
				box-sizing: border-box;
				background-color: #fff;
				.room-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 100rpx;
					background-color: #fff;
					font-size: 28rpx;
					border-bottom: 2rpx solid #f8f8f8;
					.left{
						/* #ifdef APP-PLUS */
						width: 50%;
						/* #endif */
					}
					.right {
						display: flex;
						align-items: center;
						/* #ifdef APP-PLUS */
							width: 50%;
							display: flex;
							justify-content: flex-end;
							align-items: center;
						/* #endif */
						text {
							color: #A9A9A9;
							font-weight: 400;
						}

						image {
							width: 32rpx;
							height: 32rpx;
							margin-left: 15rpx;
						}
					}
				}
			}
		}

		.btn-logout {
			position: absolute;
			left: 50%;
			bottom: 150rpx;
			transform: translateX(-50%);
			width: 80%;
			border-radius: 50rpx;
			font-size: 16px;
			color: #fff;
			/* background: linear-gradient(to right, #365fff, #36bbff); */
			background-color: $pdc-app-color;
		}
	}
</style>
