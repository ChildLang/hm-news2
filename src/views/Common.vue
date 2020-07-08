<template>
  <div class="common">
    <div class="height">
      <van-nav-bar title="我的跟帖" left-text="返回" left-arrow @click-left="$router.back()"/>
    </div>
    <ul>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
        :immediate-check="false"
      >
        <li v-for="item in info" :key="item.id">
          <p class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</p>
          <div class="parent" v-if="item.parent">
            <p>回复：{{item.parent.user.nickname}}</p>
            <div>{{item.parent.content}}</div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="acticle">
            <p>原文：{{item.post.title}}</p>
            <p>
              <span class="iconfont iconjiantou1"></span>
            </p>
          </div>
        </li>
      </van-list>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    async getdata() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.info = [...this.info, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      console.log('加载中...')
      ++this.pageIndex
      setTimeout(() => {
        this.getdata()
      }, 2000)
    }
  }
}
</script>
<style lang='less' scoped>
.common {
  background-color: #f3f3f3;
  .height {
    height: 50px;
  }
  ul {
    li {
      padding: 20px;
      border-bottom: 1px solid #999;
      .time {
        color: #999;
        font-size: 16px;
      }
      .parent {
        padding: 20px 10px;
        margin-top: 20px;
        font-size: 14px;
        color: #999;
        background-color: #e4e4e4;
        div {
          font-size: 17px;
          padding-top: 10px;
        }
      }
      .content {
        font-size: 17px;
        padding: 20px 0;
        overflow: hidden;
        word-wrap: break-word;
      }
      .acticle {
        color: #999;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        p:nth-child(1) {
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
