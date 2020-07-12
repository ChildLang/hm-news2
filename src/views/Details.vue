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
      <div class="title">{{post.title}}</div>
      <div class="name">
        <span>{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
      <video :src="post.content" v-if="post.type === 2" controls loop muted preload></video>
      <div class="content" v-html="post.content" v-else></div>
      <div class="call">
        <div @click="like">
          <span class="iconfont icondianzan" :class="{active :post.has_like}"></span>
          <span>{{post.like_length}}</span>
        </div>
        <div>
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="footer1" v-if="isShow">
      <textarea :placeholder="'回复:'+ name" ref="textarea" v-model="content" @blur="blur"></textarea>
      <div @click="reply">发送</div>
    </div>
    <div class="footer" v-else>
      <input type="text" placeholder="写跟帖" @click="text">
      <span class="iconfont iconpinglun-">
        <span>{{post.comment_length}}</span>
      </span>
      <span class="iconfont iconshoucang" :class="{active:post.has_star}" @click="star"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>

    <div class="list" :class="{text:isShow}">
      <h3>精彩跟帖</h3>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="0"
        v-if="comment.length"
      >
        <news-comment v-for="item in comment" :key="item.id" :comment="item"></news-comment>
      </van-list>
      <p v-else>暂无跟帖，抢占沙发</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      post: {
        user: ''
      },
      comment: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5,
      isShow: false,
      content: '',
      name: '',
      id: ''
    }
  },
  created() {
    console.log(this.$route.params)
    this.getPost()
    this.getComment()
    this.$bus.$on('reply', (name, id) => {
      this.isShow = true
      this.name = '@' + name
      this.id = id
      this.$nextTick().then(() => {
        this.$refs.textarea.focus()
      })
    })
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
    async getComment() {
      const res = await this.$axios.get(
        `/post_comment/${this.$route.params.id}`,
        {
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        }
      )
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.comment = [...this.comment, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    async login() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '请先登录'
        })
        localStorage.setItem('path', this.$route.path)
        this.$router.push('/login')
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
        const res = await this.$axios.get(`/post_like/${this.post.id}`)
        console.log(res)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.getPost()
          this.$toast(message)
        }
      } else {
        this.login()
      }
    },
    async star() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.login()
      } else {
        const res = await this.$axios.get(`/post_star/${this.post.id}`)
        console.log(res)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast(message)
          this.getPost()
        }
      }
    },
    onLoad() {
      console.log('加载中...')
      setTimeout(() => {
        ++this.pageIndex
        this.getComment()
      }, 1000)
    },
    text() {
      this.isShow = true
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
    // 发布评论
    async reply() {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
          content: this.content,
          parent_id: this.id
        })
        console.log(res)
        const { message, statusCode } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          this.comment = []
          this.pageIndex = 1
          this.getComment()
          this.isShow = false
          this.content = ''
          this.name = ''
          this.id = ''
        }
      } else {
        this.login()
      }
    },
    blur() {
      if (!this.content) {
        this.isShow = false
      }
    }
  }
}
</script>
<style lang='less' scoped>
.details {
  background-color: #f3f3f3;
  .active {
    color: red;
  }
  .height {
    height: 50px;
    width: 100%;
    .header {
      position: fixed;
      top: 0;
      width: 100%;
      height: 50px;
      display: flex;
      padding: 0 20px;
      align-items: center;
      background-color: #f3f3f3;
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
  }

  .main {
    padding: 20px;
    border-bottom: 5px solid #e4e4e4;
    .title {
      font-size: 18px;
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
      padding: 20px 40px 0;
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
      }
    }
  }
  .footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 50px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f3f3f3;
    z-index: 9;
    input {
      width: 181px;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      margin-right: 20px;
      border-radius: 15px;
      font-size: 17px;
      background-color: #d7d7d7;
      border: none;
    }
    span {
      font-size: 28px;
    }
    .iconpinglun- {
      position: relative;
      span {
        position: absolute;
        top: -5px;
        left: 15px;
        text-align: left;
        font-size: 12px;
        padding: 1px 3px;
        border-radius: 7px;
        color: #fff;
        background-color: red;
      }
    }
  }
  .footer1 {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid#e4e4e4;
    background-color: #f3f3f3;
    padding: 30px 20px 10px;
    display: flex;
    justify-content: space-between;
    textarea {
      width: 260px;
      height: 90px;
      font-size: 16px;
      color: #6b6b6b;
      background-color: #d7d7d7;
      border: none;
      border-radius: 10px;
      padding: 20px;
    }
    div {
      width: 60px;
      height: 26px;
      line-height: 26px;
      border-radius: 13px;
      background-color: red;
      color: #fff;
      text-align: center;
      font-size: 14px;
      align-self: flex-end;
    }
  }
  .list {
    padding-bottom: 50px;
    h3 {
      font-size: 20px;
      font-weight: normal;
      text-align: center;
      padding-top: 30px;
    }
    p {
      font-size: 14px;
      color: #999;
      padding: 30px;
      text-align: center;
    }
  }
  .text {
    padding-bottom: 120px;
  }
}
</style>
