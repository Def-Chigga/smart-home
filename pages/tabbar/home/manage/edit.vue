<template>
	<view class="manage">
		<view class="nav-bar">
			<view class="back" @click="back">
				<svg t="1618397653295" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4634" width="28" height="28"><path d="M629.291 840.832l60.331-60.331-268.501-268.501 268.501-268.501-60.331-60.331-328.832 328.832z" p-id="4635"></path></svg>
			</view>
			<view class="title">房间编辑</view>
			<view class="delete" @click="deleteRoom">删除</view>
		</view>
		<view class="manage-header" @click="editRoom">
			<view class="header-left">{{roomVal}}</view>
			<view class="header-right">
				<svg t="1618384803640" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2159" width="16" height="16"><path d="M924.328 961.625H99.672a37.484 37.484 0 0 1 0-74.969h824.656a37.484 37.484 0 0 1 0 74.97zM196.756 828.93a74.969 74.969 0 0 1-71.97-54.727 71.595 71.595 0 0 1 0-41.607l49.855-157.06a37.484 37.484 0 0 1 8.996-14.619L352.69 384.366 618.081 118.6a112.453 112.453 0 0 1 158.934 0l53.227 53.228a112.453 112.453 0 0 1 0 158.934L564.853 595.778l-169.43 176.176a37.484 37.484 0 0 1-17.242 10.121l-161.558 43.857a70.845 70.845 0 0 1-19.867 2.998z m45.731-222.657l-45.73 147.689 151.811-41.608L512 543.299l149.938-151.811-104.582-104.582L407.42 436.844z m125.948 139.442zM610.584 232.18l106.08 106.08 60.35-60.349a37.484 37.484 0 0 0 0-53.228l-52.852-52.853a37.484 37.484 0 0 0-53.228 0z" p-id="2160" fill="#A8A49E"></path></svg>
			</view>
		</view>
		<Dialog :value="roomVal" :showDialog="showDialog" title="请输入房间名" @hiddenDialog="hiddenDialog" @confirmDialog="confirmDialog"></Dialog>
	</view>
</template>

<script>
	import Dialog from '@/components/dialog/index.vue'
	export default {
		components: {
			Dialog
		},
		data() {
			return {
				roomVal: '默认',
				showDialog: false
			}
		},
		onLoad() {

		},
		methods: {
			back() {
				uni.navigateBack({});
			},
			deleteRoom() {
				uni.showModal({
					title: '是否删除此房间？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if(res.confirm){
							console.log('删除' );
						}
					}
				});
			},
			editRoom() {
				this.showDialog = true
			},
			hiddenDialog() {
				this.showDialog = false
			},
			confirmDialog(val) {
				console.log(val );
				this.showDialog = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.manage{
		// padding-top: 20rpx;
		// box-sizing: border-box;
		height: 100%;
		.nav-bar{
			height: 88rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			box-sizing: border-box;
			.title{
				font-size: 32rpx;
				color: #000;
				font-weight: 600;
			}
			.delete{
				width: 80rpx;
				text-align: right;
				line-height: 88rpx;
			}
			.back{
				width: 80rpx;
			}
		}
		.manage-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			background-color: #fff;
			padding: 0 20rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			margin-top: 20rpx;
			.header-right{
				display: flex;
				align-items: center;
				text{
					color: #A9A9A9;
				}
				svg{
					margin-left: 15rpx;
				}
			}
		}
	}
</style>
