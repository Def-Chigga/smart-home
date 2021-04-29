<template>
	<view class="container">
		<!-- 顶部面板 -->
		<view class="top--panel">
			<view style="background-color: #d5bb97;text-align: center;font-size: 28rpx;padding: 10px 0;color: #fff;">
				<view v-if="isAddOrRemove" @click="addOrRemoveAllEquip(false)">点击一键移除设备</view>
				<view v-else @click="addOrRemoveAllEquip(true)">点击一键添加设备</view>
			</view>
		</view>
		
		
		<!-- 滚动区域 -->
		<view class="scroll-panel" id="scroll-panel">
			<view class="list-box">
				<view class="left">
					<scroll-view scroll-y="true" 
						:style="{ 'height':scrollHeight + 'px' }" 
						:scroll-into-view="leftIntoView"
						>
						<view class="item" 
							v-for="(item,index) in leftArray"
							:key="index" 
							:class="{ 'active':index==leftIndex }" 
							:id="'left-'+index"
							:data-index="index"
							@tap="leftTap"
						>{{item}}</view>
			        </scroll-view>
				</view>
				<view class="main">
					<scroll-view  scroll-y="true" :style="{ 'height':scrollHeight + 'px' }" @scroll="mainScroll" :scroll-into-view="scrollInto" scroll-with-animation="true">
						<view class="item main-item" v-for="(item,index) in mainArray" :key="index" :id="'item-'+index">
							<view class="title">
								<view>{{item.title}}</view>
							</view>
							<view class="goods" v-for="subItem in item.list" :key="subItem.smEquipId">
								<image :src="'../' + subItem.imgUrl" mode="scaleToFill"></image>
								<view class="goods-item">
									<view class="goods-title">{{subItem.name}}</view>
									<view class="goods-describe">{{subItem.smEquipId === 3 ? subItem.tag.slice(4) : subItem.tag}}</view>
								</view>
								<button class="active" v-if="subItem.enable" @click="deleteEquip(subItem.smEquipId)">已添加</button>
								<button v-else @click="addEquip(subItem.smEquipId)">添加</button>
							</view>
						</view>
						<view class="fill-last" :style="{ 'height':fillHeight + 'px' }"></view>
					</scroll-view>
				</view>
			</view>
		</view>
		
		<!-- 底部面板 -->
		<!-- <view class="bottom-panel">
			<view style="background-color: #ffaa00;text-align: center;font-size: 28rpx;padding: 10px 0;color: #fff;">
				<view>这里底部内容占位区域，不需要则删除</view>
				<view>可添加需放在页面底部的内容，比如购物车栏目</view>
			</view>
		</view>-->
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight:400,
				scrollTopSize:0,
				fillHeight:0,	// 填充高度，用于最后一项低于滚动区域时使用
				leftArray: [],
				mainArray:[
					{
						title: '节能',
						list: []
					},
					{
						title: '清洁',
						list: []
					},
					{
						title: '安防',
						list: []
					},
					{
						title: '其他',
						list: []
					},	
				],
				topArr:[],
				leftIndex:0,
				scrollInto:'',
				allSmEnable: []
			}
		},
		computed:{
			/* 计算左侧滚动位置定位 */
			leftIntoView(){
				return `left-${this.leftIndex > 3 ? (this.leftIndex-3):0}`;
			},
			isAddOrRemove() {
				return this.allSmEnable.every(item=>{
						return item === true
					})
			}
		},
		mounted(){
			/* 等待DOM挂载完成 */
			this.$nextTick(()=>{
				/* 在非H5平台，nextTick回调后有概率获取到错误的元素高度，则添加200ms的延迟来减少BUG的产生 */
				setTimeout(()=>{
					/* 等待滚动区域初始化完成 */
					this.initScrollView().then(()=>{
						/* 获取列表数据，你的代码从此处开始 */
						this.getListData();
					})
				},200);
			})
		},
		methods: {
			/* 初始化滚动区域 */
			initScrollView(){
				return new Promise((resolve, reject)=>{
					let view = uni.createSelectorQuery().select('#scroll-panel');
					view.boundingClientRect(res => {
						this.scrollTopSize = res.top;
						this.scrollHeight = res.height;
						this.$nextTick(()=>{
							resolve();
						})
					}).exec();
				});
			},
			/* 获取列表数据 */
			getListData(){
				this.allSmEnable = []
				this.$http({
					url: '/admin/smarthome/smEquip/baseSelectByPage'
				}).then(res=>{
						this.leftArray = ['节能','清洁','安防','其他']
						this.mainArray = [
											{
												title: '节能',
												list: []
											},
											{
												title: '清洁',
												list: []
											},
											{
												title: '安防',
												list: []
											},
											{
												title: '其他',
												list: []
											},	
										],
						this.mainArray[0].list = res.data.list.slice(0,2)
						this.mainArray[1].list = res.data.list.slice(2,3)
						res.data.list.forEach(item=>{
							if(item.smEquipId === 4 || item.smEquipId === 6) {
								this.mainArray[2].list.push(item)
							}if(item.smEquipId === 5 || item.smEquipId === 7){
								this.mainArray[3].list.push(item)
							}
							this.allSmEnable.push(item.enable)
						});
						this.getEquipList();
						// DOM 挂载后 再调用 getElementTop 获取高度的方法。
						this.$nextTick(()=>{
							this.getElementTop();
						});
				});
			},
			getEquipList() {
				this.$http({
					url: '/admin/smarthome/smEquip/baseSelectByPage',
					data: {
						enable: true
					}
				}).then(res=>{
					this.equipList = res.data.list;
					uni.setStorageSync('equipList', res.data.list)
				})
			},
			/* 获取元素顶部信息 */
			getElementTop(){
				new Promise((resolve,reject)=>{
					let view = uni.createSelectorQuery().selectAll('.main-item');
					view.boundingClientRect(data => {
						resolve(data);
					}).exec();
				}).then((res)=>{
					let topArr = res.map((item)=>{
						return item.top - this.scrollTopSize;	/* 减去滚动容器距离顶部的距离 */
					});
					this.topArr = topArr;
					
					/* 获取最后一项的高度，设置填充高度。判断和填充时做了 +-20 的操作，是为了滚动时更好的定位 */
					let last = res[res.length-1].height;			
					if(last - 20 < this.scrollHeight){
						this.fillHeight = this.scrollHeight - last + 20;
					}
				});
			},
			/* 主区域滚动监听 */
			mainScroll(e){
				let top =e.detail.scrollTop;
				let index=0;
				/* 查找当前滚动距离 */
				for(let i = (this.topArr.length-1);i>=0;i--){
					/* 在部分安卓设备上，因手机逻辑分辨率与rpx单位计算不是整数，滚动距离与有误差，增加2px来完善该问题 */
					if((top+2)>=this.topArr[i]){
						index = i;
						break;
					}
				}
				this.leftIndex=(index < 0 ? 0: index);
			},
			/* 左侧导航点击 */
			leftTap(e){
				let index=e.currentTarget.dataset.index;
				this.scrollInto=`item-${index}`;
			},
			addEquip(idx) {
				this.$http({
					url: '/admin/smarthome/smEquip/baseInsertOrUpdate',
					data: {
						smEquipId: idx,
						enable: true
					}
				}).then(res=>{
					this.getListData();
					setTimeout(()=>{
						uni.showToast({
							title: '设备添加成功!'
						})
					},200)
				})
			},
			addOrRemoveAllEquip(flag) {
				if(flag){
					this.handleAddOrRemoveAllEquip(flag)
				}else{
					uni.showModal({
						title: '确定移除全部设备？',
						content: '设备不够可能会导致场景不可开启',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if(res.confirm){
								this.handleAddOrRemoveAllEquip(flag)
							}
						},
					});
				}
			},
			handleAddOrRemoveAllEquip(flag) {
				this.$http({
					url: `/admin/smarthome/smEquip/changeAllStatus?enable=${flag}`,
				}).then(res=>{
					this.getListData();
					isAddOrRemove = flag ? false : true
					setTimeout(()=>{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					},200)
				})
			},
			deleteEquip(idx) {
				uni.showModal({
					title: '是否移除设备？',
					content: '设备不完整可能导致场景不可用',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.confirm) {
							this.$http({
								url: '/admin/smarthome/smEquip/baseInsertOrUpdate',
								data: {
									smEquipId: idx,
									enable: false
								}
							}).then(res=>{
								this.getListData();
								setTimeout(()=>{
									uni.showToast({
										title: '设备已移除',
										icon: 'none'
									})
								},200)
							})
						}
					},
				});
			}
		}
	}
</script>

<style lang="scss">
page,.container{
	height: 100%;
}
/* 容器 */
.container{
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
	
	&>view{
		width: 100%;
	}
	
	.scroll-panel{
		flex-grow: 1;
		height: 0;
		overflow: hidden;
	}
	
	.bottom-panel{
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);		
	}
}
	
	
.list-box{
	display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
	font-size: 28rpx;
	
	.left{
		width: 200rpx;
		background-color: #f8f8f8;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		
		.item{
			position: relative;
			text-align: center;
			font-size: 30rpx;
			&:not(:first-child) {
				margin-top: 1px;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 620upx;
					position: absolute;
					top: -1px;
					right: 0;
					transform:scaleY(0.5);	/* 1px像素 */
				}
			}
			
			&.active{
				color: $pdc-app-color;
				background-color: #fff;
				border-right: 5rpx solid $pdc-app-color;
			}
		}
		
		.fill-last{
			height: 0;
			width: 100%;
			background: none;
		}
	}
	.main{
		background-color: #fff;
		padding-left: 20rpx;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		
		
		
		.title{
			line-height: 64rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: #666;
			background-color: #fff;
			position: sticky;
			top: 0;
			z-index: 19;
		}
		
		.item{
			padding-bottom: 10rpx;
			border-bottom: #eee solid 1px;
		}
		
		.goods{
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 10rpx;
			padding: 20rpx 20rpx 20rpx 0rpx;
			box-sizing: border-box;
			&>image{
				width: 90rpx;
				height: 90rpx;
				margin-right: 15rpx;
				margin-left: 2px;
			}
			.goods-item{
				.goods-title{
					font-size: 30rpx;
					margin-bottom: 10rpx;
				}
				.goods-describe{
					font-size: 24rpx;
					color: #999;
				}
			}
			button{
				height: 50rpx;
				line-height: 50rpx;
				font-size: 22rpx;
				background-color: $pdc-app-color;
				color: #fff;
				margin-right: 0;
				&.active{
					color: $pdc-app-color;
					background-color: #f8f8f8;
					border: none;
					outline: none;
				}
			}
		}
	}
}
</style>