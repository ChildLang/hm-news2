<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box" @click="$router.push('/search')">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- 标签栏 -->
    <van-sticky :offset-top="-50">
      <div class="column" @click="$router.push('/column')">
        <span class="iconfont iconjiantou"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <!-- 文章列表 -->
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- 上拉加载 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :offset="10"
            :immediate-check="false"
            @load="onLoad"
          >
            <news-post v-for="post in postList" :key="post.id" :post="post"></news-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      tabList: [],
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const addList = localStorage.getItem('addList')
      if (addList) {
        this.tabList = JSON.parse(addList)
        this.getPostList(this.active)
        return
      }
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
        this.postList = [...this.postList, ...data]
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
        console.log(this.postList)
      }
    },
    onLoad() {
      console.log('加载中...')
      setTimeout(() => {
        ++this.pageIndex
        this.getPostList(this.active)
      }, 1000)
    },
    onRefresh() {
      console.log('下拉刷新')
      setTimeout(() => {
        this.$toast('刷新成功')
        this.postList = []
        this.finished = false
        this.pageIndex = 1
        this.loading = true
        this.getPostList(this.active)
      }, 1000)
    },
    user() {
      const token = localStorage.getItem('token')
      if (token) {
        this.$router.push('/user')
      } else {
        localStorage.setItem('path', this.$route.path)
        this.$router.push('/login')
      }
    }
  },
  watch: {
    active(value) {
      this.pageIndex = 1
      this.finished = false
      this.postList = []
      this.loading = true
      this.getPostList(value)
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'details') {
      this.$store.commit('remove', { name: 'home' })
    }
    next()
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
  .column {
    height: 43px;
    line-height: 43px;
    text-align: center;
    width: 10%;
    background-color: #ccc;
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 999;
    // text-align: center;
    // height: 36px;
    // width: 43px;
    // background-color: #ccc;
    // transform: rotate(-90deg);
    // position: absolute;
    // right: -3px;
    // top: 53px;
  }
}
/deep/.van-tabs .van-sticky {
  width: 90%;
}
</style>
