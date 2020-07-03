<template>
  <div class="user">
    <div class="header" @click="$router.push('/useredit')">
      <div class="pic">
        <img :src="$axios.defaults.baseURL+info.head_img" alt>
      </div>
      <div class="nickname">
        <p>
          <span class="iconfont iconxingbienan" v-if="info.gender"></span>
          <span class="iconfont iconxingbienv" v-else></span>
          {{info.nickname}}
        </p>
        <p class="time">{{info.create_date |time}}</p>
      </div>
      <div class="jump">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <news-nav>
      <template>我的关注</template>
      <template v-slot:content>关注的用户</template>
    </news-nav>
    <news-nav>
      <template>我的回帖</template>
      <template v-slot:content>回帖/评论</template>
    </news-nav>
    <news-nav>
      <template>我的收藏</template>
      <template v-slot:content>文章/视频</template>
    </news-nav>
    <news-nav @click="$router.push('/useredit')">设置</news-nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    const res = await this.$axios.get(`/user/${localStorage.getItem('id')}`)
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
    }
  }
}
</script>
<style lang='less' scoped>
.user {
  background-color: rgb(243, 243, 243);
  .header {
    height: 120px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    .pic {
      width: 70px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .nickname {
      flex: 1;
      margin-left: 10px;
      font-size: 16px;
      .time {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
      .iconxingbienan {
        color: aqua;
      }
      .iconxingbienv {
        color: chocolate;
      }
    }
  }
}
</style>
