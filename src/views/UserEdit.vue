<template>
  <div class="useredit">
    <div class="mask" v-if="show">
      <van-button type="warning" @click="crop">裁剪</van-button>
      <van-button type="warning" @click="hide">取消</van-button>
      <VueCropper
        ref="cropper"
        :img="img"
        autoCrop
        :fixed="true"
        :fixedNumber="[1,1]"
        :autoCropWidth="150"
        :autoCropHeight="150"
      ></VueCropper>
    </div>
    <van-nav-bar title="编辑资料" left-text="返回" left-arrow @click-left="$router.back()"/>
    <div class="header">
      <img :src="$axios.defaults.baseURL + info.head_img" alt>
      <van-uploader :after-read="afterRead"/>
    </div>
    <news-nav @click="nicknameShow">
      <template>昵称</template>
      <template v-slot:content>{{info.nickname}}</template>
    </news-nav>
    <news-nav @click="pwdShow">
      <template>密码</template>
      <template v-slot:content>******</template>
    </news-nav>
    <news-nav @click="genderShow">
      <template>性别</template>
      <template v-slot:content>{{info.gender?'男':'女'}}</template>
    </news-nav>

    <!-- 修改弹框 -->
    <van-dialog v-model="Nshow" title="昵称修改" show-cancel-button @confirm="Nedit" @cancel="cancel">
      <van-field v-model="nickname" placeholder="请输入修改昵称"/>
    </van-dialog>
    <van-dialog v-model="Pshow" title="密码修改" show-cancel-button @confirm="Pedit" @cancel="cancel">
      <van-field v-model="password" placeholder="请输入修改密码"/>
    </van-dialog>
    <van-dialog v-model="Gshow" title="性别修改" show-cancel-button @confirm="Gedit" @cancel="cancel">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1"/>
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      info: {},
      Nshow: false,
      Pshow: false,
      Gshow: false,
      nickname: '',
      password: '',
      gender: 1,
      show: false,
      img: ''
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    cancel() {
      this.$toast('取消')
    },
    async getdata() {
      const res = await this.$axios.get(`/user/${localStorage.getItem('id')}`)
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    async editdata(user) {
      const res = await this.$axios.post(
        `/user_update/${localStorage.getItem('id')}`,
        user
      )
      console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success('修改成功')
        this.getdata()
      }
    },
    // 修改框显示
    nicknameShow() {
      this.Nshow = true
      this.nickname = this.info.nickname
    },
    pwdShow() {
      this.Pshow = true
      this.password = this.info.password
    },
    genderShow() {
      this.Gshow = true
      this.gender = this.info.gender
    },
    // 修改功能
    Nedit() {
      this.editdata({
        nickname: this.nickname
      })
    },
    Pedit() {
      this.editdata({
        password: this.password
      })
    },
    Gedit() {
      this.editdata({
        gender: this.gender
      })
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      this.show = true
      this.img = file.content
    },
    hide() {
      this.show = false
      this.$toast('取消')
    },
    crop() {
      this.$refs.cropper.getCropBlob(async blob => {
        console.log(blob)
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editdata({ head_img: data.url })
          this.show = false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.useredit {
  .van-uploader {
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
  .header {
    position: relative;
    height: 120px;
    text-align: center;
    padding-top: 25px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .mask {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .van-button {
      position: absolute;
      z-index: 9999;
    }
    .van-button:nth-child(1) {
      left: 0;
    }
    .van-button:nth-child(2) {
      right: 0;
    }
  }
}
</style>
