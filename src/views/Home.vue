<template>
  <div class="home">
    <div class="setBg">
      <img alt src="../assets/content.png" />
      <img alt src="../assets/btn.png" @click="toLiu" />
    </div>
    <div class="layer" v-if="isShowLayer">
      <img src="../assets/jianzui.png" alt />
    </div>
  </div>
</template>

<script>
import { get, post, getQueryString } from "@/axios/http.js";
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'home',
  components: {
  },

  data() {
    return {
      isShowLayer: false,
      url: '',
      isiOS: ''
    }
  },
  created() {
    let u = navigator.userAgent;
    let num;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (this.isiOS) {
      console.log('ios')
      get("/mini", {
        method: "/Common/updateCheck",
        app_type: 1,
        devicetype: 1
      }).then(data => {
        this.url = data.data.app_url;
        window.location.href = this.url;
      })
    } else {
      console.log('android')
      get("/mini", {
        method: "/Common/updateCheck",
        app_type: 1,
        devicetype: 2
      }).then(data => {
        this.url = data.data.app_url;
        if (/MicroMessenger/gi.test(navigator.userAgent)) {
          this.isShowLayer = true
          // 是微信浏览器，引导用户在浏览器中打开
        } else {
          if (this.url) {
            window.location.href = this.url;
          } else {
            Toast({ message: '无下载地址,请到应用市场下载', position: 'bottom' })
          }
        }
      });
    }

  },
  mounted() {

  },
  methods: {
    toLiu() {
      if (this.isiOS) {
        if (this.url) {
          window.location.href = this.url;
        } else {
          Toast({ message: '无法自动跳转,请到App Store下载', position: 'bottom' })
        }
      } else {
        if (this.url) {
          window.location.href = this.url;
        } else {
          Toast({ message: '无下载地址,请到应用市场下载', position: 'bottom' })
        }
      }

    },
  }
};
</script>
<style lang="scss" scoped>
.layer {
  width: 100%;
  height: 100%;
  background-color: rgba(43, 38, 38, 0.7);
  position: fixed;
  top: 0;
  img {
    width: 80%;
    margin: 10px 0 0 90px;
  }
}
.setBg {
  height: 100%;
  background: url("../assets/jianbian.png") #fff bottom no-repeat;
  img {
    width: 100%;
    padding: 64px 88px 0 88px;
    box-sizing: border-box;
  }
}
</style>
