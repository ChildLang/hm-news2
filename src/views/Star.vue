<template>
  <div class="star">
    <div class="height">
      <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="$router.back()"/>
    </div>
    <ul>
      <news-post v-for="post in info" :key="post.id" :post="post">{{post.title}}</news-post>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: []
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    async getdata() {
      const res = await this.$axios.get('/user_star')
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    }
  }
}
</script>
<style lang='less' scoped>
.star {
  .height {
    height: 50px;
    .van-nav-bar {
      position: fixed;
      top: 0;
      width: 100%;
    }
  }
}
</style>
