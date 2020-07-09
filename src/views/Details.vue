<template>
  <div class="details">
    <div class="height">
      <div class="header">
        <div class="back" @click="$router.go(-1)">
          <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="right">
          <span class="follow" v-show="!post.has_follow" @click="follow">关注</span>
          <span class="unfollow" v-show="post.has_follow" @click="unfollow">已关注</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="tltle">{{post.title}}</div>
      <div class="name">
        <span>{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
      <video :src="post.content" v-if="post.type === 2" controls loop muted preload></video>
      <div class="content" v-html="post.content" v-else></div>
      <div class="call">
        <div @click="like">
          <span class="iconfont icondianzan"></span>
          <span>{{post.like_length}}</span>
        </div>
        <div>
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      post: {
        user: ''
      }
    }
  },
  created() {
    console.log(this.$route.params)
    this.getPost()
  },
  methods: {
    async getPost() {
      const res = await this.$axios.get(`/post/${this.$route.params.id}`)
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.post = data
      }
    },
    async login() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '请先登录'
        })
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
      } catch {
        this.$toast('取消')
      }
    },
    async follow() {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
        console.log(res)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.getPost()
          this.$toast.success(message)
        }
      } else {
        this.login()
      }
    },
    async unfollow() {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getPost()
        this.$toast.success(message)
      }
    },
    async like() {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await this.$axios.get(`/post_like/${this.post.user.id}`)
        console.log(res)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.getPost()
          this.$toast(message)
        }
      } else {
        this.login()
      }
    }
  }
}
</script>
<style lang='less' scoped>
.details {
  background-color: #f3f3f3;
  .height {
    height: 50px;
    width: 100%;
  }
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    border-bottom: 1px solid #999;
    .back {
      span {
        font-size: 20px;
      }
    }
    .logo {
      flex: 1;
      padding-left: 5px;
      span {
        font-size: 60px;
      }
    }
    .right {
      span {
        font-size: 14px;
        height: 26px;
        width: 60px;
        display: inline-block;
        border-radius: 13px;
        text-align: center;
        line-height: 26px;
      }
      .follow {
        background-color: red;
        color: #fff;
      }
      .unfollow {
        border: 1px solid #999;
        color: #000;
      }
    }
  }
  .main {
    padding: 20px;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
    .name {
      padding: 10px 0;
      span {
        font-size: 15px;
        color: #999;
        margin-right: 20px;
      }
    }
    video {
      width: 100%;
    }
    .content {
      margin-top: 10px;
      font-size: 14px;
      line-height: 2;
      /deep/ img {
        width: 100%;
      }
    }
    .call {
      display: flex;
      padding: 0 40px;
      justify-content: space-around;
      div {
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        border: 1px solid #000;
        font-size: 13px;
        text-align: center;
        span {
          margin-right: 5px;
        }
        .icondianzan {
          color: red;
        }
      }
    }
  }
}
</style>
