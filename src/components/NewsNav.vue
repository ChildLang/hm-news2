<template>
  <div class="newsnav" @click="$emit('click')">
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
.newsnav {
  display: flex;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  margin-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #999;
  .content {
    flex: 1;
    text-align: right;
    color: #999;
    padding-right: 5px;
  }
}
</style>
