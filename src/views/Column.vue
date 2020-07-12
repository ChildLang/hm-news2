<template>
  <div class="column">
    <van-nav-bar title="栏目管理" left-arrow @click-left="$router.back()"/>
    <div class="addcolumn">点击删除以下频道(至少保留4项)</div>
    <div class="addlist">
      <div
        class="item"
        v-for="(item,index) in addList"
        :key="item.id"
        @click="unColumn(index)"
      >{{item.name}}</div>
    </div>
    <div class="uncolumn">点击添加以下频道</div>
    <div class="unlist">
      <div
        class="item"
        v-for="(item ,index) in unList"
        :key="item.id"
        @click="addColumn(index)"
      >{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addList: [],
      unList: []
    }
  },
  created() {
    this.getColumn()
  },
  methods: {
    async getColumn() {
      const addList = localStorage.getItem('addList')
      const unList = localStorage.getItem('unList')
      if (addList) {
        this.addList = JSON.parse(addList)
        this.unList = JSON.parse(unList)
        return
      }
      const res = await this.$axios.get('/category')
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.addList = data
      }
    },
    unColumn(index) {
      if (this.addList.length <= 4) {
        this.$toast('至少保留4项')
        return
      }
      this.unList.push(this.addList[index])
      this.addList.splice(index, 1)
    },
    addColumn(index) {
      this.addList.push(this.unList[index])
      this.unList.splice(index, 1)
    }
  },
  watch: {
    addList: {
      deep: true,
      handler(value) {
        localStorage.setItem('addList', JSON.stringify(this.addList))
        localStorage.setItem('unList', JSON.stringify(this.unList))
      }
    }
  }
}
</script>
<style lang='less' scoped>
.column {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  .addcolumn,
  .uncolumn {
    padding-left: 20px;
    font-size: 14px;
    line-height: 3;
    color: #999;
  }
  .addlist,
  .unlist {
    display: flex;
    padding: 10px 20px;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      width: 70px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #999;
      font-size: 18px;
      margin-bottom: 10px;
      margin-right: 13px;
    }
  }
}
</style>
