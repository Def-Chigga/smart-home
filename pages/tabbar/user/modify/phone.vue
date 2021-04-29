<template>
	<view class="name">
		<view class="ip">
			<input type="text" v-model="value" maxlength="11" :focus="focus" ref='input' @blur="focus === !focus">
		</view>
		<view v-show="value" class="close" @click="clearValue">x</view>
		<button :class="value ? 'active' : ''" @click="savePhone">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				focus: true,
				userId: null,
				user: null
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
			savePhone() {
				if(!this.value){
					return
				}
				this.userId = uni.getStorageSync('userId')
				this.user = uni.getStorageSync(`user${this.userId}`)
				this.$http({
					url:"/api-admin/user/baseInsertOrUpdate",
					data:{
						userId: this.user.userId,
						name:this.value
					}
				})
				.then((res)=>{
					console.log(res);
					if(res.status === 1){
						uni.showToast({
							title:res.msg,
							icon:'none'
						}),
						console.log(this.value)
						// let storage = uni.getStorageSync('userInfo')
						// storage.name = this.value
						// uni.setStorageSync('userInfo',storage)
						this.user.userInfo.name = this.value
						uni.setStorageSync(`user${this.userId}`, this.user)
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
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 14px;
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
