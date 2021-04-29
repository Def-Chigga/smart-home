<template>
	<view class="name">
		<view class="ip">
			<input type="text" v-model="value" maxlength="16" :focus="focus" ref='input' @blur="focus === !focus">
		</view>
		<view v-show="value" class="close" @click="clearValue">x</view>
		<button :class="value ? 'active' : ''" @click="saveName">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				focus: true,
				userInfo: null
			};
		},
		onLoad(options) {
			if(options.name !== null){
				this.value = options.name
			}
		},
		methods: {
			clearValue() {
				this.value = ''
			},
			saveName() {
				if(!this.value.trim()){
					return uni.showToast({
						title: '昵称不能为空',
						icon: 'none'
					});
				}
				this.userInfo = uni.getStorageSync('userInfo')
				this.$http({
					url:"/user/baseInsertOrUpdate",
					data:{
						userId: this.userInfo.userId,
						name: this.value
					}
				})
				.then((res)=>{
					if(res.status === 1){
						uni.showToast({
							title:'修改成功！',
							icon:'none'
						}),
						this.userInfo.name = this.value
						uni.setStorageSync('userInfo', this.userInfo)
						setTimeout(()=>{
							uni.navigateBack({
							    delta: 1,
							    animationType: 'pop-out',
							    animationDuration: 500
							});
						},500)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.name {
		height: 100%;
		.ip{
			width: 100%;
			background: #fff;
			border: 1rpx solid #f5f5f5;
			input {
				height: 80rpx;
				line-height: 80rpx;
				// background: #fff;
				padding-left: 10px;
				box-sizing: border-box;
			}
		}
		.close {
			width: 30rpx;
			height: 30rpx;
			line-height: 25rpx;
			text-align: center;
			background: #ccc;
			color: #fff;
			border-radius: 50%;
			font-size: 10px;
			position: absolute;
			right: 10px;
			top: 15px;
		}

		button {
			// width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 28rpx;
			letter-spacing: 5rpx;
			border-radius: 8rpx;
			color: #333;
			margin-top: 10px;
			float: right;
			margin-right: 10px;
			&.active{
				background: $pdc-app-color;
				color: #fff;
			}
		}
	}
</style>
