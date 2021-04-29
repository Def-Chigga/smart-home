<template>
	<view class="room">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<view class="nav-tab">
			<ul class="tab-list">
				<li :class="['tab-item', tabIdx === index ? 'active' : '']" v-for="(item,index) in tabList" :key="index"
					@click="toggleTab(index)">{{item.name}}</li>
			</ul>
			<view v-show="tabIdx === 1" class="btn-add" @click="addView">
				<image src="../../../static/images/view/view-icon-add.png" mode="scaleToFill"></image>
			</view>
		</view>
		<!-- 默认场景 -->
		<view class="recommend" v-if="tabIdx === 0">
			<view class="recommend-list">
				<view class="recommend-item" v-for="(item,index) in viewList.slice(0,4)" :key="index"
					@click="goViewInfo(item)">
					<image :src="item.imgBgUrl" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
		<!-- 自定义场景 -->
		<view class="recommend my" v-if="tabIdx === 1 && viewList.slice(4).length > 0">
			<view class="recommend-list">
				<uni-swipe-action autoClose  v-for="(item,index) in viewList.slice(4)" :key="index">
					<!-- 基础用法 -->
					<uni-swipe-action-item :right-options="options" @click="onClick" @change="getCurrentView(item)">
						<view class="recommend-item" @click="goViewInfo(item)">
							<image src="../../../static/images/view/view-bg-new.png" mode="scaleToFill"></image>
							<view class="title">
								{{item.title}}
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
		<view class="my null" v-if="tabIdx === 1 && viewList.slice(4).length <= 0"></view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				tabList: [{
						name: '推荐'
					},
					{
						name: '我的'
					}
				],
				tabIdx: 0,
				viewList: [],
				title: '创建自动场景',
				content: '例如：在您回家前，让扫地机器人和净化器自动启动。',
				userInfo: uni.getStorageSync('userInfo'),
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#007aff'
					}
				}],
				defaultHomeList: null,
				smSceneId: null,
				lastClick: 0, 
				delay: 40
			}

		},
		onShow() {
			this.defaultHomeList = uni.getStorageSync('defaultHomeList')
			this.getViewList();
		},
		methods: {
			getCurrentView(item){
				this.smSceneId = item.smSceneId
			},
			onClick(e) {
				// 解决组件点击事件会执行两次
				if (this.lastClick >= (Date.now() - this.delay)){
					return
				}
				this.lastClick = Date.now(); 
				if(e.index === 0){
						uni.showModal({
							title: '是否要删除该场景？',
							showCancel: true,
							cancelText: '取消',
							confirmText: '确认',
							success: res => {
								if(res.confirm){
									this.$http({
										url: '/admin/smarthome/smScene/baseDeleteById',
										data: {
											smSceneId: this.smSceneId
										}
									}).then(res => {
										this.getViewList()
										setTimeout(()=>{
											uni.showToast({
												title: '删除场景成功！',
												icon: 'none'
											});
										},500)
										this.smSceneId = null
									})
								}
							}
						});
					}
			},
			// 获取场景列表
			getViewList() {
				this.$http({
					url: '/admin/smarthome/smScene/baseSelectByPage',
					data: {
						sysCreateUserId: this.userInfo.userId,
						smRoomId: this.defaultHomeList.smRoomId,
					}
				}).then(res => {
					this.viewList = res.data.list
				})
			},
			toggleTab(idx) {
				this.tabIdx = idx;
			},
			addView() {
				uni.navigateTo({
					url: `./add/index?title=${this.title}&content=${this.content}`
				})
			},
			goViewInfo(item) {
				uni.navigateTo({
					url: `./info/index?smSceneId=${item.smSceneId}&enable=${item.enable}&title=${item.title}&content=${item.content}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.room {
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
		.nav-tab {
			height: 88rpx;
			background-color: #fff;
			border-bottom: 2rpx solid #F2F2F2;
			box-sizing: border-box;
			width: 100%;
			position: relative;
			/* #ifdef APP-PLUS */
			position: fixed;
			top: var(--status-bar-height);
			z-index: 999;
			/* #endif */

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

			.tab-list {
				display: flex;
				justify-content: center;

				.tab-item {
					color: #747474;
					font-size: 36rpx;
					line-height: 88rpx;
					width: 20%;
					text-align: center;
					height: 80rpx;

					&.active {
						color: $pdc-app-color;
						border-bottom: 5rpx solid $pdc-app-color;
					}
				}
			}
		}

		.recommend {
			// height: calc(100% - 88rpx);
			.recommend-list {
				padding: 20rpx 0;
				/* #ifdef APP-PLUS */
				padding-bottom: 70rpx;
				/* #endif */
				.recommend-item {
					padding: 0 20rpx;
					box-sizing: border-box;
					margin-bottom: 10rpx;
					position: relative;
					.title{
						font-size: 16px;
						color: rgba(255,255,255,0.8);
						position: absolute;
						left: 65rpx;
						bottom: 30rpx;
					}
					&:nth-child(2) {
						margin-bottom: 18rpx;
					}

					&:last-of-type {
						margin-bottom: 0;
					}

					image {
						width: 100%;
						height: 300rpx;
					}
				}
			}
		}

		.recommend,
		.my {
			height: calc(100% - 88rpx);
			overflow-x: hidden;
			overflow-y: auto;
			/* #ifdef APP-PLUS */
			position: relative;
			top: calc(var(--status-bar-height) + 88rpx);
			right: 0;
			bottom: 0;
			left: 0;
			/* #endif */
			&.null {
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
	}
</style>
