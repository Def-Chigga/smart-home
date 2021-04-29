<template>
	<view class="equip">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<view class="nav-tab">
			<view class="title">我的设备</view>
			<view class="btn-add" @click="toEquipList">
				<image src="../../../static/images/view/view-icon-add.png" mode="scaleToFill"></image>
			</view>
		</view>
		<scroll-view v-if="equipList.length > 0" class="equip-container" scroll-y="true">
			<ul class="equip-list">
				<li class="equip-item" v-for="(item,index) in equipList" :key="index" @click="toGoodsList">
					<view class="item-top">
						<image :src="item.imgUrl" mode="scaleToFill"></image>
					</view>
					<view class="item-bottom">
						<view class="title">{{item.name}}</view>
						<view class="comment">{{item.description}}</view>
					</view>
				</li>
			</ul>
		</scroll-view>
		<view class="null" v-else></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				equipList: []
			};
		},
		onShow() {
			this.equipList = uni.getStorageSync('equipList')
		},
		methods: {
			toEquipList() {
				uni.navigateTo({
					url: './list/index'
				});
			},
			toGoodsList() {
				uni.showLoading({
					title: '正在跳转商城...',
					mask: true
				});
				setTimeout(()=>{
					uni.hideLoading()
					uni.showToast({
						title: '暂未开放商城功能',
						icon: 'none'
					})
				},500)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.equip {
		width: 100%;
		height: 100%;
		background-color: #f8f8f8;
		/* #ifdef APP-PLUS */
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999;
		background-color: #f8f8f8;
		/* #endif */
		.status_bar {
			/* #ifdef APP-PLUS */
			height: var(--status-bar-height);
			width: 100%;
			position: fixed;
			top: 0;
			z-index: 999;
			background-color: #fff;
			/* #endif */
		}
		
		.nav-tab {
			height: 88rpx;
			background-color: #fff;
			border-bottom: 2rpx solid #F2F2F2;
			box-sizing: border-box;
			position: relative;
			/* #ifdef APP-PLUS */
			width: 100%;
			position: fixed;
			top: var(--status-bar-height);
			z-index: 999;
			background-color: #fff;
			/* #endif */

			.title {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 36rpx;
				color: #000;
			}

			.btn-add {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				right: 20rpx;
				top: 18rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.equip-container {
			height: calc(100% - 88rpx);
			/* #ifdef APP-PLUS */
			width: 100%;
			position: relative;
			top: calc(var(--status-bar-height) + 88rpx);
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 666;
			background-color: #f8f8f8;
			/* #endif */
			.equip-list {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					padding: 0 20rpx 20rpx;
					box-sizing: border-box;
			
					.equip-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						width: 345rpx;
						height: 300rpx;
						background-color: #fff;
						padding: 40rpx;
						box-sizing: border-box;
						border-radius: 20rpx;
						margin-top: 20rpx;
						position: relative;
						text-align: center;
			
						.item-top {
							image {
								height: 120rpx;
								width: 100rpx;
							}
						}
			
						.item-bottom {
							padding-top: 20rpx;
							box-sizing: border-box;
			
							.title {
								font-size: 26rpx;
							}
			
							.comment {
								color: #ccc;
								margin-top: 10rpx;
								font-size: 24rpx;
							}
						}
					}
				}
			
		}
		.null{
			height: calc(100% - 88rpx);
			background: url(../../../static/images/view/view-bg-null.png);
			background-size: cover;
			/* #ifdef APP-PLUS */
			width: 100%;
			position: fixed;
			top: calc(var(--status-bar-height) + 88rpx);
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 999;
			background-color: #f8f8f8;
			background-position: 50% 100%;
			/* #endif */
		}
	}
</style>
