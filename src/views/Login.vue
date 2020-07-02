<template>
  <div class="login">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #title>登录</template>
    </van-nav-bar>
    <news-logo></news-logo>
    <van-form @submit="onSubmit">
      <van-field v-model="user.username" label="用户名" placeholder="用户名" :rules="rules.username"/>
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <div class="tip">
      没有账号？去
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '内容不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '内容不正确',
            trggier: 'onChange'
          }
        ],
        password: [
          { required: true, message: '内容不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{3,11}$/,
            message: '内容不正确',
            trggier: 'onChange'
          }
        ]
      }
    }
  },
  created() {
    // console.log(this.$route.params)
    const { username, password } = this.$route.params
    this.user.username = username
    this.user.password = password
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/login', this.user)
      console.log(res)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        localStorage.setItem('token', data.token)
        this.$router.push('/')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.tip {
  text-align: right;
  font-size: 16px;
  padding-right: 20px;
  a {
    color: orange;
  }
}
</style>
