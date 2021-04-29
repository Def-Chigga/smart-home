<template>
  <view class="user-info">
    <cmd-nav-bar class="nav-bar" back title="信息设置"></cmd-nav-bar>
    <cmd-page-body type="top">
      <cmd-transition name="fade-up">
        <view>
          <cmd-cel-item title="头像" slot-right arrow>
            <cmd-avatar :src="this.avatar ? this.avatar : '../../../../static/images/user/user-avatar.png'"  @click="avatarModify('modify')"></cmd-avatar>
          </cmd-cel-item>
          <cmd-cel-item title="昵称" :addon="userInfo.name" arrow  @click="usernameModify('modify')"></cmd-cel-item>
          <cmd-cel-item title="用户名" :addon="userInfo.account" disabled></cmd-cel-item>
          <cmd-cel-item title="个性签名" :addon="userInfo.description || 'Just do it!'" arrow  @click="signatureModify('modify')"></cmd-cel-item>
          <!-- <cmd-cel-item title="电话号码" addon="15676109501" arrow @click="phoneModify('modify')"></cmd-cel-item> -->
          <button class="btn-logout" @click="handleLogout">退出登录</button>
        </view>
      </cmd-transition>
    </cmd-page-body>
  </view>
</template>

<script>
  import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
  import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
  import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
  import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"

  export default {
    components: {
      cmdNavBar,
      cmdPageBody,
      cmdTransition,
      cmdCelItem,
      cmdAvatar
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
    mounted() {},
    
    methods:{
      /**
       * 点击触发
       * @param {Object} type 跳转页面名或者类型方式
       */
	  avatarModify(type) {
		 if(type == 'modify'){
		   {
		   	uni.chooseImage({
		   		count: 1,
		   		success: (res) => {
					this.avatar = res.tempFilePaths[0]
					const userId = uni.getStorageSync('userInfo').userId
					uni.setStorageSync(`userAvatar${userId}`,res.tempFilePaths[0])
					uni.showToast({
						title: '上传成功!',
						icon: 'none'
					});
		   		}
		   	})
		   }
		 } 
	  },
	  usernameModify(type) {
		 if(type == 'modify'){
		   uni.navigateTo({
		     url:`/pages/tabbar/user/modify/name?name=${this.userInfo.name}`
		   })
		 } 
	  },
	  signatureModify(type) {
		 if(type == 'modify'){
		   uni.navigateTo({
		     url:`/pages/tabbar/user/modify/signature?signature=${this.userInfo.description || 'Just do it!'}`
		   })
		 } 
	  },
	  /* phoneModify(type) {
	  		 if(type == 'modify'){
	  		   uni.navigateTo({
	  		     url:'/pages/tabbar/user/modify/phone'
	  		   })
	  		 } 
	  }, */
	  handleLogout() {
		  this.$http({
			  url: '/user/logout'
		  }).then(res=>{
			  uni.removeStorageSync('defaultHomeList')
			  uni.removeStorageSync('nld_login_token')
			  uni.removeStorageSync('userInfo')
			  setTimeout(()=>{
			  	uni.showToast({
			  		title: res.msg,
			  		icon: 'none'
			  	});
			  },500)
			  setTimeout(()=>{
				  uni.redirectTo({
				  	url: '../../../login/index'
				  })
			  },500)
		  })
	  }
    }
  }
</script>

<style lang="scss" scoped>
	.user-info{
		width: 100%;
		height: 100%;
	}
	::v-deep .cmd-page-body{
		margin-top: 30rpx;
	}
  .btn-logout {
    margin-top: 100upx;
    width: 80%;
    border-radius: 50upx;
    font-size: 16px;
    color: #fff;
    /* background: linear-gradient(to right, #365fff, #36bbff); */
	background-color: $pdc-app-color;
  }

  .btn-logout-hover {
    // background: linear-gradient(to right, #365fdd, #36bbfa);
	background-color: $pdc-app-color;
  }
</style>
