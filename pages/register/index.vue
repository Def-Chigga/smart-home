<template>
	<view class="register-box">
		<image src="../../static/images/register.png" mode='aspectFit' class="register-logo"></image>
		<view class="register-title">智能家居</view>
		<view class="register-form">
			<input v-model="registerData.account" class="register-input" placeholder="请输入用户名" />
			<input v-model="registerData.password" class="register-input" password placeholder="请输入密码"/>
			<input v-model="registerData.name" class="register-input" placeholder="请输入昵称,有助于找回密码!"/>
			<button class="register-btn" @click="doRegister">立即注册</button>
			<navigator url="../login/index" open-type='navigateBack' hover-class="none" class="register-label">已有账号，点此去登录.</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registerData: {
					account: '',
					password: '',
					name: ''
				}
			}
		},
		methods: {
			doRegister() {
				if(!this.registerData.account || !this.registerData.password || !this.registerData.name){
					return uni.showToast({
						title: '请正确填写数据!',
						icon: 'none'
					});
				}
				this.$http({
					url: '/user/reg.do',
					data: this.registerData
				}).then(res=>{
					setTimeout(()=>{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					},500)
					setTimeout(()=>{
						uni.redirectTo({
							url: '../login/index'
						})
					},500)
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register-box{
		padding: 0 100upx;
		position: relative;
		background-color: #fff;
	}
	.register-logo{
		width: 100%;
		width: 100%;
		height: 310upx;
	}
	.register-title{
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}
	.register-form{
		margin-top: 300upx;
	}
	.register-input{
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}
	.input-placeholder, .register-input{
		color: #94afce;
	}
	.register-label{
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.register-btn{
		/* background: #ff65a3; */
		background-color: #5796DD;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		margin-top: 60upx;
	}
	.register-btn:after{
		border: 0;
	}
	/*按钮点击效果*/
	.register-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
</style>
