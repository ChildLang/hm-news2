<template>
  <div class="login">
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.back()"/>
    <news-logo></news-logo>
    <van-form @submit="onSubmit">
      <van-field v-model="user.username" label="用户名" placeholder="用户名" :rules="rules.username"/>
      <van-field v-model="user.password" type="password" label="密码" placeholder="密码"/>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <p>
      还没有账号?去
      <router-link to="/register">注册</router-link>
    </p>
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
          { required: true, message: '用户名不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{3,11}$/,
            message: '用户名格式不正确',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          {
            pattern: /^\w{3,11}$/,
            message: '密码格式不正确',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  created() {
    console.log(this.$route.params)
    const { username, password } = this.$route.params
    this.user.username = username
    this.user.password = password
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('login', this.user)
      console.log(res)
      const { statusCode, data, message } = res.data
      if (statusCode === 200) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.user.id)
        this.$toast.success('登录成功')
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.van-button {
  background-color: #e22500;
  border-color: #e22500;
}
p {
  text-align: right;
  padding-right: 20px;
  font-size: 16px;
  a {
    color: orange;
  }
}
</style>
