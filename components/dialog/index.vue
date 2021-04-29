<template>
	<view class="dialog" v-if="showDialog">
		<view class="content">
			<view class="title">{{title}}</view>
			<view class="ip">
				<!-- <input ref="input" type="text" v-model="value"  /> -->
				<input type="text" v-model="value" maxlength="16" :focus="focus" ref='input' @blur="focus === !focus">
				<view v-if="value" @click="clearValue">
					<image src="../../static/images/icon-input-delete.png" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="btn-group">
				<button class="cancel" @click="hiddenDialog">取消</button>
				<button class="confirm" @click="confirmDialog">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				default: () => {},
				required: true
			},
			title: {
				type: String,
				default: ''
			},
			showDialog: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				focus: true,
			}
		},
		methods: {
			hiddenDialog() {
				this.value = ''
				this.$emit("hiddenDialog");
			},
			confirmDialog() {
				this.$emit("confirmDialog", this.value);
				this.value = ''
			},
			clearValue() {
				this.value = ''
				this.$refs.input.$el.focus()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog{
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.5);
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 999;
			.content{
				width: 80%;
				height: 320rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin: 0 auto;
				position: absolute;
				top: 20%;
				left: 50%;
				transform: translateX(-50%);
				.title{
					font-size: 28rpx;
					color: #000;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
				}
				.ip{
					position: relative;
					input{
						width: 80%;
						height: 70rpx;
						line-height: 70rpx;
						border-radius: 70rpx;
						padding-left: 30rpx;
						box-sizing: border-box;
						background-color: #ECEBEA;
						margin: 0 auto;
						margin-bottom: 40rpx;
						margin-top: 10rpx;
						font-size: 26rpx;
					}
					image{
						width: 32rpx;
						height: 32rpx;
						position: absolute;
						right: 80rpx;
						top: 20rpx;
					}
				}
				.btn-group{
					display: flex;
					justify-content: center;
					button{
						width: 230rpx;
						height: 70rpx;
						line-height: 70rpx;
						border-radius: 40rpx;
						border: 1rpx solid #333;
						background-color: #fff;
						font-size: 30rpx;
						margin: 0;
						&.confirm{
							background-color: $pdc-app-color;
							border: none;
							color: #fff;
							margin-left: 20rpx;
						}
					}
				}
			}
		}
</style>
