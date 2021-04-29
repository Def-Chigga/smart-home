<template>
	<view class="login-box">
		<image src="../../static/images/login.png" mode='aspectFit' class="login-logo"></image>
		<view class="login-title">智能家居</view>
		<view class="login-form">
			<input class="login-input" v-model="loginData.account" placeholder="请输入用户名" />
			<input class="login-input" v-model="loginData.password" password placeholder="请输入密码"/>
			<navigator url="../checking/index" hover-class="none" class="login-label">忘记密码？</navigator>
			<button class="login-btn" @click="toHome">立即登录</button>
			<navigator url="../register/index" hover-class="none" class="login-label">还没有账号？点此注册.</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginData: {
					account: '',
					password: '',
				}
			}
		},
		onLoad() {

		},
		methods: {
			// 点击跳转到主页
			toHome() {
				if (!this.loginData.account || !this.loginData.password) {
					return uni.showToast({
						title: '请正确填写数据!',
						icon: 'none'
					})
				} else {
					this.$http({
						url: '/user/doLogin.do',
						data: this.loginData
					}).then((res) => {
						if (res.status === 1) {
							this.$storage('nld_login_token',res.msg)
							setTimeout(() => {
								uni.showToast({
									title: '登录成功',
									duration: 1000
								})
							}, 200)
							uni.switchTab({
								url: '../tabbar/home/index'
							})
						} else {
							uni.showToast({
								title: res.msg,
								duration: 1000,
								icon: "none"
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-box{
		padding: 0 100upx;
		height: 100%;
		position: relative;
		background-color: #fff;
	}
	.login-logo{
		width: 100%;
		width: 100%;
		height: 310upx;
	}
	.login-title{
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}
	.login-form{
		margin-top: 300upx;
	}
	.login-input{
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}
	.input-placeholder, .login-input{
		color: #94afce;
	}
	.login-label{
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.login-btn{
		// background: #ff65a3;
		background: #5796DD;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
	}
	.login-btn:after{
		border: 0;
	}
	/*按钮点击效果*/
	.login-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
</style>
