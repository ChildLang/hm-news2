<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <news-post v-for="post in postList" :key="post.id" :post="post">{{post.title}}</news-post>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [],
      postList: [],
      pageIndex: 1,
      pageSize: 5
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        this.getPostList(this.active)
      }
    },
    async getPostList(index) {
      const res = await this.$axios.get('/post', {
        params: {
          category: this.tabList[index].id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.postList = data
      }
    }
  },
  watch: {
    active(value) {
      this.getPostList(value)
    }
  }
}
</script>
<style lang='less' scoped>
.home {
  .header {
    height: 50px;
    line-height: 50px;
    display: flex;
    padding: 0 20px;
    color: #fff;
    background-color: #ff0000;
    .logo {
      span {
        font-size: 60px;
      }
    }
    .search {
      flex: 1;
      padding: 0 20px;
      font-size: 18px;
      text-align: center;
      .search-box {
        height: 34px;
        line-height: 34px;
        margin-top: 8px;
        border-radius: 17px;
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
    .user {
      span {
        font-size: 25px;
      }
    }
  }
}
</style>
