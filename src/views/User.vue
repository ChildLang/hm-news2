<template>
  <div class="user">
    <div class="header" @click="$router.push('/useredit')">
      <div class="pic">
        <img :src="$axios.defaults.baseURL+info.head_img" alt>
        <!-- <img :src="$url(info.head_img)" alt> -->
      </div>
      <div class="name">
        <p>
          <span class="iconfont iconxingbienan" v-if="info.gender"></span>
          <span class="iconfont iconxingbienv" v-else></span>
          <span>{{info.nickname}}</span>
        </p>
        <p class="time">{{info.create_date | time}}</p>
      </div>
      <div class="jump">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <news-nav @click="$router.push('/follow')">
      <template>我的关注</template>
      <template v-slot:content>关注的用户</template>
    </news-nav>
    <news-nav @click="$router.push('/common')">
      <template>我的跟帖</template>
      <template v-slot:content>跟帖/回复</template>
    </news-nav>
    <news-nav @click="$router.push('/star')">
      <template>我的收藏</template>
      <template v-slot:content>文章/视频</template>
    </news-nav>
    <news-nav @click="$router.push('/useredit')">设置</news-nav>
    <news-nav @click="outFn">退出</news-nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    async getdata() {
      const res = await this.$axios.get(`/user/${localStorage.getItem('id')}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
        console.log(typeof this.info.head_img)
      }
    },
    async outFn() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确定退出'
        })
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        this.$toast.success('退出成功')
        this.$router.push('/login')
      } catch {
        this.$toast('取消')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.user {
  background-color: #f3f3f3;
  .header {
    height: 120px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 5px solid #e4e4e4;
    .pic {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .name {
      font-size: 16px;
      padding-left: 10px;
      flex: 1;
      .iconxingbienan {
        color: cadetblue;
      }
      .iconxingbienv {
        color: rgb(223, 130, 138);
      }
      span {
        margin-right: 5px;
      }
      .time {
        margin-top: 10px;
        color: #999;
      }
    }
  }
}
</style>
