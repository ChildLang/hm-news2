<template>
  <div class="newspost">
    <div class="video" v-if="post.content.startsWith('http')">
      <div class="title">
        <p>{{post.title}}</p>
      </div>
      <div class="pic">
        <img :src="$url(post.cover[0].url)" alt>
        <span class="iconfont iconshipin"></span>
      </div>
      <div class="name">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length }}跟帖</span>
      </div>
    </div>
    <div class="oneImg" v-else-if="post.cover.length < 3">
      <div class="title">
        <p>{{post.title}}</p>
        <p class="name">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </p>
      </div>
      <div class="pic">
        <img :src="$url(post.cover[0].url)" alt>
      </div>
    </div>
    <div class="manyImg" v-else>
      <div class="title">
        <p>{{post.title}}</p>
      </div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt>
        <img :src="$url(post.cover[1].url)" alt>
        <img :src="$url(post.cover[2].url)" alt>
      </div>
      <div class="name">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
  <!-- || post.comments.length -->
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang='less' scoped>
.name {
  font-size: 15px;
  color: #999;
  span {
    margin-right: 10px;
  }
}
.oneImg {
  padding: 20px 10px;
  display: flex;
  border-bottom: 1px solid #999;
  .title {
    font-size: 17px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    padding-right: 10px;
  }
  .pic {
    img {
      width: 121px;
      height: 74px;
      object-fit: cover;
    }
  }
}
.manyImg {
  padding: 20px 10px;
  border-bottom: 1px solid #999;
  .title {
    font-size: 17px;
  }
  .imgs {
    padding: 10px 2px;
    display: flex;
    justify-content: space-between;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
}
.video {
  padding: 20px 10px;
  border-bottom: 1px solid #999;
  .title {
    font-size: 17px;
  }
  .pic {
    position: relative;
    height: 170px;
    padding-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
      padding: 10px 0;
      object-fit: cover;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }
  }
}
</style>
