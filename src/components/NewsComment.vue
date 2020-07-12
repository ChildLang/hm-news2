<template>
  <div class="comment">
    <div class="title">
      <div class="pic">
        <img :src="$url(comment.user.head_img)" alt>
      </div>
      <div class="name">
        <p>{{comment.user.nickname}}</p>
        <p class="time">{{comment.create_date | fromNow}}</p>
      </div>
      <div class="reply" @click="$bus.$emit('reply',comment.user.nickname,comment.id)">回复</div>
    </div>
    <NewsFloor v-if="comment.parent" :comment="comment.parent" :num="getCount(0,comment)"></NewsFloor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>
<script>
import NewsFloor from './NewsFloor'
export default {
  data() {
    return {}
  },
  props: {
    comment: Object
  },
  components: {
    NewsFloor
  },
  methods: {
    getCount(num, obj) {
      if (obj.parent) {
        return this.getCount(++num, obj.parent)
      } else {
        return num
      }
    }
  }
}
</script>
<style lang='less' scoped>
.comment {
  padding: 20px;
  border-bottom: 1px solid #999;
  .title {
    display: flex;
    margin-bottom: 10px;
    .pic {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
    .name {
      padding-left: 10px;
      font-size: 17px;
      flex: 1;
      .time {
        font-size: 14px;
        color: #999;
      }
    }
    .reply {
      font-size: 14px;
      color: #999;
    }
  }
  .content {
    font-size: 16px;
    padding-top: 20px;
  }
}
</style>
