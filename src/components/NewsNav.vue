<template>
  <div class="nav" @click="$emit('click')">
    <div class="name">
      <slot></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="jump">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>
<script>
</script>
<style lang='less' scoped>
.nav {
  display: flex;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  padding-right: 20px;
  font-size: 17px;
  border-bottom: 1px solid #999;
  .content {
    font-size: 15px;
    color: #999;
    flex: 1;
    text-align: right;
    padding-right: 10px;
  }
}
</style>
