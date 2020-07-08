<template>
  <div class="follow">
    <van-nav-bar title="我的关注" left-text="返回" left-arrow @click-left="$router.go(-1)"/>
    <ul>
      <li v-for="item in info" :key="item.id">
        <div class="pic">
          <img :src="$url(item.head_img)" alt>
        </div>
        <div class="name">
          <p>{{item.nickname}}</p>
          <p class="time">{{item.create_date | time}}</p>
        </div>
        <div class="cancel" @click="cancel(item.id)">
          <van-button round type="info">取消关注</van-button>
        </div>
      </li>
    </ul>
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
      const res = await this.$axios.get('/user_follows')
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },

    async cancel(id) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确认取关？'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        console.log(res)
        if (res.data.statusCode === 200) {
          this.$toast('取关成功')
          this.getdata()
        }
      } catch {
        this.$toast('取消')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.follow {
  background-color: #f3f3f3;
  ul {
    li {
      height: 100px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #999;
      .pic {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .name {
        flex: 1;
        padding-left: 20px;
        font-size: 17px;
        .time {
          color: #999;
          font-size: 17px;
        }
      }
      .van-button {
        width: 90px;
        height: 30px;
        font-size: 14px;
        background-color: #e0e0e0;
        border-color: #e0e0e0;
        color: #000;
      }
    }
  }
}
</style>
