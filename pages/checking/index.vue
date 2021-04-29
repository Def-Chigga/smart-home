<template>
	<view class="check-box">
		<image src="../../static/images/register.png" mode='aspectFit' class="check-logo"></image>
		<view class="check-title">智能家居</view>
		<view class="check-form">
			<view class="check-input-btn">
				<input v-model="checkingData.name" class="check-input" placeholder="请输入正确昵称"/>
				<input v-model="checkingData.account" class="check-input" placeholder="请输入用户名" />
				<input v-model="checkingData.password" class="check-input" password placeholder="请输入密码"/>
			</view>
			<button class="check-btn" @click="doChecking">立即修改</button>
			<navigator url="../login/index" open-type='navigateBack' hover-class="none" class="check-label">已有账号，点此去登录.</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkingData: {
					account: '',
					password: '',
					name: ''
				}
			}
		},
		onLoad() {
	
		},
		methods: {
			doChecking() {
				if(!this.checkingData.account.trim() || !this.checkingData.password.trim() || !this.checkingData.name.trim()){
					return uni.showToast({
						title: '请正确填写数据!',
						icon: 'none'
					});
				}
				this.$http({
					url: '/user/modifyPassword.do',
					data: this.checkingData
				}).then(res=>{
					console.log(res);
					setTimeout(()=>{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					},200)
					setTimeout(()=>{
						if(res.status === 1){
							uni.redirectTo({
								url: '../login/index'
							})
						}
					},500)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.check-box{
		padding: 0 100upx;
		position: relative;
		background-color: #fff;
	}
	.check-logo{
		width: 100%;
		width: 100%;
		height: 310upx;
	}
	.check-title{
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}
	.check-form{
		margin-top: 300upx;
	}
	.check-input{
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}
	.input-placeholder, .check-input{
		color: #94afce;
	}
	.check-label{
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.check-btn{
		// background: #ff65a3;
		background-color: #5796DD;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		margin-top: 60upx;
	}
	.check-btn:after{
		border: 0;
	}
	
	/*验证码输入框*/
	.check-input-btn{
		position: relative;
	}
	.check-input-btn .check-input{
		padding-right: 260upx;
	}
	.check-checking{
		position: absolute;
		right: 0;
		top: 0;
		// background: #ff65a3;
		background-color: #5796DD;
		color: #fff;
		border: 0;
		border-radius: 110upx;
		font-size: 36upx;
		margin-left: auto;
		margin-right: auto;
		padding-left: 28upx;
		padding-right: 28upx;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
		line-height: 2.55555556;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		padding-top: 2upx;
		padding-bottom: 2upx;
	}
	.check-checking.check-time{
		background: #a7b6d0;
	}
	
	/*按钮点击效果*/
	.check-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
</style>
