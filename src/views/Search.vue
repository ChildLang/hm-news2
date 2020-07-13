<template>
  <div class="search">
    <div class="header">
      <div class="back" @click="back">
        <span class="iconfont iconjiantou"></span>
      </div>
      <div class="input">
        <input
          ref="input"
          type="text"
          placeholder="通灵兽消失术"
          v-model="keyword"
          @input="query"
          @keyup.enter="getlist"
        >
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="btn" @click="getlist">搜索</div>
    </div>
    <div class="query" v-show="isShow">
      <news-post v-for="post in list" :key="post.id" :post="post"></news-post>
      <news-nav v-for="item in data" :key="item.id" @click="txtKey(item.title)">{{item.title}}</news-nav>
    </div>
    <div class="history">
      <h3>历史记录</h3>
      <span v-for="(item,index) in history" :key="item" @click="hisSearch(item)">
        {{item}}
        <i class="iconfont iconicon-test" @click="del(index)"></i>
      </span>
    </div>
    <div class="hot">
      <h3>热门搜索</h3>
      <span>办公室小野否认解散</span>
      <span>月季如何嫁接</span>
      <span>办公室小野否认解散</span>
      <span>月季如何嫁接</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      timer: '',
      keyword: '',
      data: [],
      history: [],
      list: [],
      recommendList: []
    }
  },
  created() {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    query() {
      clearTimeout(this.timer)
      this.timer = setTimeout(
        async function() {
          const res = await this.$axios.get(
            `/post_search_recommend?keyword=${this.keyword}`
          )
          console.log(res)
          const { data, statusCode } = res.data
          if (statusCode === 200) {
            this.data = data
            this.isShow = true
          }
        }.bind(this),
        500
      )
    },
    back() {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    },
    txtKey(key) {
      this.keyword = key
    },
    async getlist() {
      const res = await this.$axios.get(`/post_search?keyword=${this.keyword}`)
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.isShow = true
        this.list = data
        this.data = []
        this.history = this.history.filter(item => item !== this.keyword)
        this.history.unshift(this.keyword)
      }
    },
    hisSearch(item) {
      this.keyword = item
      this.getlist()
    },
    del(index) {
      console.log(123)
    }
  },
  watch: {
    keyword(value) {
      if (!value) {
        clearTimeout(this.timer)
        this.isShow = false
      } else {
        this.list = []
      }
    },
    history: {
      deep: true,
      handler(value) {
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    }
  }
}
</script>
<style lang='less' scoped>
.search {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  // padding: 0 20px;
  background-color: #f3f3f3;
  .header {
    height: 50px;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    .back {
      span {
        font-size: 20px;
      }
    }
    .input {
      position: relative;
      flex: 1;
      padding: 0 10px;
      input {
        width: 258px;
        height: 38px;
        border: 1px solid #999;
        background-color: #f3f3f3;
        border-radius: 19px;
        padding-left: 40px;
        font-size: 15px;
      }
      span {
        position: absolute;
        top: 50%;
        left: 25px;
        font-size: 18px;
        transform: translateY(-50%);
      }
    }
    .btn {
      font-size: 16px;
      white-space: nowrap;
    }
  }
  .query {
    position: fixed;
    top: 50px;
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
  }
  .history {
    border-bottom: 1px solid #999;
    span {
      display: inline-block;
      line-height: 2;
      border: 1px solid #999;
      border-radius: 16px;
      padding: 0 10px;
      margin-right: 10px;
      // margin-bottom: 5px;
    }
  }
  .hot {
    span {
      display: inline-block;
      width: 50%;
      line-height: 2.5;
    }
  }
  .history,
  .hot {
    padding: 20px;
    h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }
    span {
      font-size: 15px;
      i {
        font-size: 12px;
        padding-left: 3px;
      }
    }
  }
}
</style>
