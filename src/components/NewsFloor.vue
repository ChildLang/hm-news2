<template>
  <div>
    <floor v-if="comment.parent" :comment="comment.parent" :num="num-1"></floor>
    <div class="floor">
      <div class="title">
        <div class="name">{{num}}楼:{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | fromNow}}</div>
        <div class="reply" @click="$bus.$emit('reply',comment.user.nickname,comment.id)">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'floor',
  props: {
    comment: Object,
    num: Number
  }
}
</script>
<style lang='less' scoped>
.floor {
  padding: 20px 10px;
  border: 1px solid #999;
  margin-top: -1px;
  .title {
    display: flex;
    align-items: center;
    .name {
      font-size: 17px;
    }
    .time {
      font-size: 14px;
      color: #999;
      flex: 1;
      padding-left: 10px;
    }
    .reply {
      font-size: 14px;
      color: #999;
    }
  }
  .content {
    font-size: 17px;
    padding-top: 20px;
  }
}
</style>
