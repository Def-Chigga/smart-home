<template>
  <view class="user">
	  <!-- 这里是状态栏 -->
	<view class="status_bar"></view>
    <view class="person-head" @click="fnInfoWin">
      <cmd-avatar :src="this.avatar ? this.avatar : '../../../static/images/user/user-avatar.png'" size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
      <view class="person-head-box">
        <view class="person-head-nickname">{{userInfo.name}}</view>
        <view class="person-head-username">{{userInfo.description || '查看并修改个人资料'}}</view>
      </view>
	  <view class="arrow-icon">
		  <image src="../../../static/images/home/icon-arrow-right.png" mode="scaleToFill"></image>
	  </view>
    </view>
    <view class="person-list">
      <cmd-cell-item title="我的设备" slot-left arrow @click="toEquipList">
        <cmd-icon type="bullet-list" size="24" color="#d5bb97"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="消息通知" slot-left arrow @click="showToast">
        <cmd-icon type="message" size="24" color="#d5bb97"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="系统设置" slot-left arrow @click="showToast">
        <cmd-icon type="settings" size="24" color="#d5bb97"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="检查版本" addon="v1.0" slot-left>
        <cmd-icon type="alert-circle" size="24" color="#d5bb97"></cmd-icon>
      </cmd-cell-item>
    </view>
  </view>
</template>

<script>
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
  import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
  import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"

  export default {
    components: {
      cmdAvatar,
      cmdCellItem,
      cmdIcon
    },
    data() {
      return {
		  userInfo: null,
		  avatar: null
	  };
    },
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo')
		const userId = this.userInfo.userId
		const avatar = uni.getStorageSync(`userAvatar${userId}`)
		if(avatar){
			this.avatar = avatar
		}
	},
    methods: {
      /**
       * 打开用户信息页
       */
      fnInfoWin() {
        uni.navigateTo({
          url: '/pages/tabbar/user/info/index'
        })
      },
	  toEquipList() {
		  uni.showLoading({
			  title: '加载设备列表...',
			  mask: true
		  });
		  setTimeout(()=>{
		  	uni.hideLoading()
		  	uni.switchTab({
		  		url: '../equip/index'
		  	});
		  },500)
	  },
	  showToast() {
		  uni.showToast({
		  	title: '暂未开放此功能',
			icon: 'none'
		  });
	  }
    }
  }
</script>

<style lang="scss" scoped>
	.user{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #F8F8F8;
		.status_bar {
		    height: var(--status-bar-height);
		    width: 100%;
		}
		.person-list{
			.cmd-cell-item{
				background-color: #fff;
			}
		}
	}
  .person-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    padding-left: 20px;
    // background: linear-gradient(to right, #365fff, #36bbff);
	position: relative;
	.arrow-icon{
		position: absolute;
		right: 8rpx;
		top: 120rpx;
		image{
			width: 56rpx;
			height: 56rpx;
		}
	}
  }

  .person-head-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
  }

  .person-head-nickname {
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }

  .person-head-username {
    font-size: 14px;
    font-weight: 500;
    color: #aaa;
  }

  .person-list {
    line-height: 0;
	background-color: #fff;
  }
</style>
