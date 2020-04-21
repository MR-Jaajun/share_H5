<template>
  <section class="login">
    <div class="top">您好，请登录</div>
    <div class="list userNameBox">
      <i></i>
      <input type="text" placeholder="账号" v-model="username" autocomplete="off" />
      <span @click="getCode" :class="ishui?'huitxt':''">获取验证码</span>
      <!-- <button @click="getCode">获取验证码</button> -->
    </div>
    <div class="list passwordBox">
      <i></i>
      <input type="text" placeholder="验证码" v-model="password" autocomplete="off" />
    </div>
    <div class="btnBox">
      <button class="loginBtn" @click="logBtn">登录</button>
    </div>
  </section>
</template>

<script>
import {
  Toast
} from 'mint-ui';
import { get, post, getQueryString } from '@/axios/http.js'
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',//验证码
      new_custom: 1,//1新用户，0旧用户
      code: '',//邀请码,
      ishui: false
    };
  },
  components: {},
  created() {
    this.code = localStorage.getItem('code')
    if (!this.code) Toast({ message: '没有邀请码', duration: 2000 });
    console.log('登录页获取到的code', this.code)
  },
  mounted() { },
  methods: {
    // 绑定上级
    logBtn() {
      // if (this.new_custom == 1) {
      post('/mini', {
        method: "/Login/loginSms",
        mobile: this.username,
        verify: this.password,
        is_merchant: 0//客户端类型（0用户端1商户端2骑手端）
      }).then(data => {
        localStorage.setItem("token", data.data.token)
        return post('/mini', {
          method: "/Login/bindSuperior",
          superior_code: this.code//邀请码
        })
      }).then(data => {
        // if (!data.code) {//成功绑定或者已绑定上级
        //1上级不存在，2已绑定上级,3绑定成功,4验证码不正确
        this.$router.push({ path: "./download" });
        // } 
        // else {//邀请码不存在
        // }
      }).catch(data => {
        if (data.data.msg == '对不起，你已经绑定上级了') {
          this.$router.push({ path: "./download" });
        }
      })
      // } 
      // else {
      //   Toast({ message: '您是老用户了' });
      //   this.$router.push({ path: "./download" });
      // }
    },
    // 手机验证码注册登录，获取token
    getCode() {
      if (this.username === '') {
        Toast({ message: '请输入手机号', duration: 2000 })
      } else {
        if (!this.ishui) {
          post('/mini', {
            method: "/Common/sendSms",
            mobile: this.username,
            send_id: 10001
          }).then(data => {
            this.ishui = true
            //   // this.password = data.data.verify
            Toast({ message: data.msg, duration: 2000 });
            //   return post('/mini', {
            //     method: "/Login/loginSms",
            //     mobile: data.data.mobile,
            //     verify: this.password,
            //     is_merchant: 0
            //   })
            // }).then(data => {//短信登录后，返回token和是否新用户
            //   this.new_custom = data.data.new_custom
            //   localStorage.setItem("token", data.data.token)

            //   console.log("拿到：", data.data.token)
          })
        }

      }
    }
  }
};
</script>
<style scoped lang="scss">
.login {
  .top {
    @include line-height(345px, 345px);
    font-size: 60px;
    padding-left: 45px;
    text-align: left;
  }
  .list {
    height: 100px;
    margin: 0 45px 2px 45px;
    border-bottom: 1px solid #dcdcdc;
    position: relative;
    input {
      width: 100%;
      display: block;
      box-sizing: border-box;
      height: 100px;
      @include line-height(100px, 50px);
      font-size: 28px;
      border: none;
      padding-left: 50px;
    }
    i {
      position: absolute;
      display: block;
    }
  }
  .userNameBox {
    display: flex;
    button {
      font-size: 16px;
    }
    i {
      width: 24px;
      top: 34px;
      height: 36px;
      background: url("~assets/phone_ico.png") no-repeat left center;
      background-size: contain;
    }
  }
  .passwordBox {
    i {
      width: 24px;
      top: 34px;
      height: 36px;
      background: url("~assets/pwd_ico.png") no-repeat left center;
      background-size: contain;
    }
  }
  .btnBox {
    margin: 180px 45px 0 45px;
    .loginBtn {
      @include line-height(90px, 90px);
      font-size: 32px;
      border-radius: 90px;
      background: linear-gradient(to right, #f9d191, #f9b490);
      border: none;
      display: block;
      width: 100%;
      color: #fff;
    }
  }

  .userNameBox {
    font-size: 28px;
    > span {
      width: 200px;
      display: flex;
      align-items: center;
    }
    .huitxt {
      color: #ccc;
    }
  }
}
</style>
