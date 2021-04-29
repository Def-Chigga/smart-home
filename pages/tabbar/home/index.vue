<template>
	<view class="home">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<view class="home-header">
			<view class="header-left">
				<view class="left-top" @click="toHomeManage">
					<text>{{defaultHomeList && defaultHomeList.name}}</text>
					<image src="../../../static/images/icon-arrow-right-white.png" mode="scaleToFill"></image>
				</view>
				<view class="left-bottom">
					<!-- <text>Hi， 早上好！</text> -->
					<text v-if="isRandomNum >= 5">开心快乐度过每一天！</text>
					<text v-else>活力满满的一天，给自己一个大大的赞！</text>
				</view>
			</view>
			<view class="header-right" @click="toEquipList">
				<image src="../../../static/images/icon-add-circle.png" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="home-view">
			<h3>默认场景</h3>
			<scroll-view class="view-scroll" scroll-y="true" >
				<ul class="view-list">
					<li :class="['view-item',item.enable ? 'active' : '']" v-for="(item,index) in viewList" :key="index" @click="selectView(item)">
						<image :src="item.enable ? item.imgActiveUrl :item.imgUrl" mode="scaleToFill"></image>
						<text>{{item.title}}</text>
					</li>
				</ul>
			</scroll-view>
		</view>
		<view class="home-equip">
			<h3>默认设备</h3>
			<ul class="equip-list" v-if="equipList.length > 0">
				<li :class="['equip-item', item.state ? '' : 'active']" v-for="(item,index) in equipList" :key="index" @click="toEquipDetail(item)">
					<view class="item-left">
						<view class="title">{{item.name}}</view>
						<view class="comment active" v-if="item.state">使用中</view>
						<view class="comment" v-else>停用</view>
					</view>
					<view v-if="item.state" class="icon" @click.stop="nouseEquip(item)">
						<image src="../../../static/images/icon-close-dianyuan.png" mode="scaleToFill"></image>
					</view>
					<view class="item-right">
						<image :src="item.imgUrl" mode="scaleToFill"></image>
					</view>
				</li>
				</ul>
			<view v-else class="equip-add" @click="toEquipList">
				<image src="../../../static/images/view/view-icon-add.png" mode="scaleToFill"></image>
				<text>添加设备</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: [],
				viewList: [],
				equipList: [],
				enableEquipList: [],
				smSceneId: uni.getStorageSync('smSceneId') | '' ,
				defaultHomeList: null,
				flag: false
			}
		},
		onShow() {
			if(!uni.getStorageSync('userInfo')){
				this.getUserInfo();
			}else{
				this.userInfo = uni.getStorageSync('userInfo')
				if(!uni.getStorageSync('defaultHomeList')){
					this.getDefaultHome(false)
				}else{
					this.getDefaultHome(true)
				}
				if(!uni.getStorageSync('smSceneId')){
					this.equipList = []
				}
				if(uni.getStorageSync('equipList')){
					this.enableEquipList = uni.getStorageSync('equipList')
				}
			}
		},
		computed: {
			isRandomNum() {
				return Math.floor(Math.random() * 10)
			}
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				this.$http({
					url: '/user/getCurrentUser'
				}).then(res=>{
					this.userInfo = res.data
					uni.setStorageSync('userInfo', res.data)
					if(!uni.getStorageSync('defaultHomeList')){
						this.getDefaultHome(false)
					}else{
						this.getDefaultHome(true)
					}
					if(!uni.getStorageSync('smSceneId')){
						this.equipList = []
					}
					if(uni.getStorageSync('equipList')){
						this.enableEquipList = uni.getStorageSync('equipList')
					}
				})
			},
			// 获取默认家庭
			getDefaultHome(flag) {
				this.$http({
					url: '/admin/smarthome/smRoom/baseSelectByPage',
					data: {
						sysCreateUserId: this.userInfo.userId,
						smRoomId: flag ? uni.getStorageSync('defaultHomeList').smRoomId : ''
					}
				}).then(res=>{
					this.defaultHomeList = res.data.list[0]
					uni.setStorageSync('defaultHomeList', this.defaultHomeList)
					this.getViewList()
				})
			},
			// 获取场景列表
			getViewList() {
				this.$http({
					url: '/admin/smarthome/smScene/baseSelectByPage',
					data: {
						sysCreateUserId: this.userInfo.userId,
						smRoomId: this.defaultHomeList.smRoomId
					}
				}).then(res=>{
					this.viewList = res.data.list
					for(let i =0; i<res.data.list.length; i++){
						if(res.data.list[i].enable){
							this.smSceneId = res.data.list[i].smSceneId
							uni.setStorageSync('smSceneId',this.smSceneId)
							this.getViewEquipList()
							break
						}
					}
				})
			},
			// 选择场景
			selectView(item) {
				// 如果点击同一个场景 存在就清空
				// if(item.smSceneId === smSceneId){
					if(item.enable){
						this.$http({
							url: '/admin/smarthome/smScene/baseInsertOrUpdate',
							data: {
								// smSceneId: smSceneId,
								smSceneId: item.smSceneId,
								// enable: this.flag,
								enable: false,
								smRoomId: this.defaultHomeList.smRoomId
							}
						}).then(res=>{
							this.getViewList()
							// this.smSceneId = ''
							this.equipList = []
							uni.removeStorageSync('smSceneId',this.smSceneId)
							// uni.removeStorageSync('smSceneId')
						})
						return
					}
				// }			
				// 如果我的设备列表为空
				if(this.enableEquipList.length === 0) {
					return uni.showToast({
						title: '设备列表为空，请先添加设备！',
						icon: 'none'
					});
				}
				this.smSceneId = item.smSceneId;
				this.handleIsShowEuipList()
			},
			// 处理添加设备是否包含场景所需设备
			handleIsShowEuipList() {
				this.$http({
					url: `/admin/smarthome/smSceneEquip/loadSceneEquips?sceneId=${this.smSceneId}`
				}).then(res=>{
					let arr1 = []
					let arr2 = []
					let count = 0
					this.enableEquipList.forEach(item=>{
						arr1.push(item.smEquipId)
					})
					res.data.forEach(item=>{
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
						// 	this.equipList = []
						// }
						this.updateViewEnable()
					}
				})
				
			},
			// 获取对应场景的设备列表
			getViewEquipList() {
				this.$http({
					url: `/admin/smarthome/smSceneEquip/loadSceneEquips?sceneId=${this.smSceneId}`
				}).then(res=>{
					this.equipList = res.data
					this.smSceneId = res.data.smSceneId
				})
			},
			// 更新对应场景的状态值
			updateViewEnable() {
				this.$http({
					url: '/admin/smarthome/smScene/baseInsertOrUpdate',
					data: {
						smSceneId: this.smSceneId,
						enable: true,
						smRoomId: this.defaultHomeList.smRoomId
					}
				}).then(res=>{
					// 更新场景列表
					this.getViewList()
				})
			},
			toEquipDetail(item) {
				const res = JSON.stringify(item);
				uni.navigateTo({
					url: `../equip/detail/index?equipDetail=${res}`
				});
			},
			toHomeManage() {
				uni.navigateTo({
					url: `./manage/index?homeName=${this.defaultHomeList.name}`
				})
			},
			toEquipList() {
				uni.navigateTo({
					url: '../equip/list/index'
				});
			},
			nouseEquip(item) {
				uni.showModal({
					title: '是否停用该设备？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '停用',
					success: res => {
						if(res.confirm){
							this.$http({
								url: '/admin/smarthome/smSceneEquip/baseInsertOrUpdate',
								data: {
									smSceneEquipId: item.nldExt.values.smSceneEquipId,
									state: false
								}
							}).then(res=>{
								this.getViewList()
								uni.hideLoading()
								setTimeout(()=>{
									uni.showToast({
										title: '设备已停用！',
										icon: 'none'
									})
								},500)
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		width: 100%;
		height: 100%;
		background-image: url(../../../static/images/home/home-bg.png);
		/* #ifdef APP-PLUS */
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		.status_bar {
		    height: var(--status-bar-height);
		    width: 100%;
		}
		/* #endif */
		.home-header {
			width: 100%;
			// height: 200rpx;
			display: flex;
			justify-content: space-between;
			padding: 40rpx 40rpx 0;
			box-sizing: border-box;
			border: 1rpx solid #ccc;

			.header-left {
				/* #ifdef APP-PLUS */
				width: 80%;
				/* #endif */
				display: flex;
				flex-direction: column;

				.left-top {
					display: flex;
					align-items: center;

					text {
						font-size: 36rpx;
						color: #fff;
					}

					image {
						margin-left: 10rpx;
						width: 32rpx;
						height: 32rpx;
						margin-top: 5rpx;
					}
				}

				.left-bottom {
					margin-top: 20rpx;
					/* #ifdef APP-PLUS */
					font-size: 24rpx;
					/* #endif */
				}
			}
			.header-right{
				/* #ifdef APP-PLUS */
				width: 20%;
				display: flex;
				justify-content: flex-end;
				// align-items: center;
				/* #endif */
				image{
					width: 64rpx;
					height: 64rpx;
				}
			}
		}

		.home-view {
			width: 100%;
			// height: 326rpx;
			padding: 40rpx;
			box-sizing: border-box;
			border: 1px solid #ccc;

			h3 {
				font-size: 32rpx;
				color: #3a3a3a;
			}
			.view-scroll{
				height: 200rpx;
				.view-list {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.view-item {
						display: flex;
						align-items: center;
						width: 300rpx;
						height: 80rpx;
						padding: 0 20rpx;
						box-sizing: border-box;
						border-radius: 20rpx;
						margin-top: 20rpx;
						background: rgba(255,255,255,0.2);
						&.active{
							background-color: #fff;
						}
						image {
							width: 48rpx;
							height: 48rpx;
							margin-right: 20rpx;
						}
						text{
							font-size: 24rpx;
						}
					}
				}
			}	
		}

		.home-equip {
			/* #ifdef APP-PLUS */
			// position: relative;
			// top: calc(var(--status-bar-height));
			// right: 0;
			// bottom: 50rpx;
			// left: 0;
			/* #endif */
			width: 100%;
			// height: 746rpx;
			padding: 40rpx;
			box-sizing: border-box;
			// border: 1px solid #ccc;
			h3 {
				font-size: 32rpx;
				color: #3a3a3a;
				margin-bottom: 20rpx;
			}

			.equip-list {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				height: 600rpx;
				/* #ifdef APP-PLUS */
				height: calc(100% - var(--status-bar-height)- 200rpx - 326rpx);
				/* #endif */
				overflow-x: hidden;
				overflow-y: auto;
				.equip-item {
					display: flex;
					justify-content: space-between;
					width: 320rpx;
					height: 240rpx;
					background-color: #fff;
					padding: 0 20rpx;
					box-sizing: border-box;
					border-radius: 20rpx;
					margin-bottom: 20rpx;
					position: relative;
					background: rgb(255,255,255);
					&.active{
						background: rgb(255,255,255);
					}
					.item-left{
						padding-top: 20rpx;
						box-sizing: border-box;
						.title{
							font-size: 28rpx;
							font-weight: bold;
						}
						.comment{
							color: #ccc;
							margin-top: 10rpx;
							font-size: 24rpx;
							&.active{
								color: $pdc-app-color;
							}
						}
					}
					.icon{
						image{
							width: 56rpx;
							height: 56rpx;
							position: absolute;
							left: 20rpx;
							bottom: 20rpx;
						}
					}
					.item-right{
						position: absolute;
						right: 20rpx;
						bottom: 20rpx;
						image{
							height: 120rpx;
							width: 100rpx;
						}
					}
				}
			}
			.equip-add{
				width: 280rpx;
				height: 160rpx;
				background-color: #fff;
				border-radius: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 30rpx;
				box-shadow: 0px 0px 5px #ccc;
				image{
					width: 48rpx;
					height: 48rpx;
					margin-right: 20rpx;
				}
				text{
					font-size: 26rpx;
					color: #292929;
				}
			}
		}
	}
</style>
