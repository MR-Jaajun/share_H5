<template>
  <div class="home">
    <!-- <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>
<div @click='test2333()'>
    233333
</div>
        <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- <div class="bg">
      <div class="bg1">
        <img src="../assets/jianzui.png" alt />
      </div>
    </div> -->
    <div class="setBg">
      <img alt="Vue logo" src="../assets/content.png" />
      <img alt="Vue logo" src="../assets/btn.png" @click="toLiu" />
      <!-- <img alt="Vue logo" src="../assets/jianbian.png" /> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { getIndex } from 'api/index';
import { Toast } from 'mint-ui'
export default {
  name: 'home',
  components: {
    HelloWorld
  },

  data() {
    return {

    }
  },

  //   async created() {
  //     try {
  //       await getIndex({ pageSiza: 100, num: 10 });
  //     } catch (err) {
  //       Toast({
  //         message: '这里是home页面的error提示',
  //         position: 'bottom',
  //         duration: 2000
  //       });
  //     }
  //   },
  mounted() {
  },
  methods: {

    toLiu() {
        console.log(111)
      //ios
      //   if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {

      //     var browser = navigator.userAgent.toLowerCase();

      //     if (browser.match(/micromessenger/i)) {
      //       //微信内置浏览器
      //       window.location.href = "hengtaixin://";
      //       window.setTimeout(function () {
      //         window.location.href = "http://www.imooc.com/wenda/detail/422447";
      //       }, 1000)
      //       return
      //     } else {
      //       window.location.href = "hengtaixin://"; //ios app协议，由ios同事提供
      //       window.setTimeout(function () {
      //         window.location.href = "http://www.imooc.com/wenda/detail/422447";
      //       }, 2000)
      //       return
      //     }
      //   }

      //   if (navigator.userAgent.match(/android/i)) {
      //     //Android
      //     window.location.href = "app://city_golf";//安卓协议，由安卓同事提供
      //     window.setTimeout(function () {
      //       window.location.href = "http://www.imooc.com/wenda/detail/422447"
      //     }, 2000)
      //     return
      //   }

      //   var url = {
      //     open: 'app://xxxxx',
      //     down: 'xxxxxxxx'
      //   };
      //   var iframe = document.createElement('iframe');
      //   var body = document.body;
      //   iframe.style.cssText = 'display:none;width=0;height=0';
      //   var timer = null;

      //   // 立即打开的按钮
      //   var openapp = document.getElementById('openapp');
      //   openapp.addEventListener('click', function () {
      if (/MicroMessenger/gi.test(navigator.userAgent)) {
        // 引导用户在浏览器中打开

      } else {
        //   body.appendChild(iframe);
        //   iframe.src = url.open;
        //   timer = setTimeout(function () {
        window.location.href = 'https://www.baidu.com';
        //   }, 500);
      }
      //   }, false)


    },



    // async test2333() {
    //   try {
    //     await getIndex({ pageSiza: 100, num: 10 });
    //   } catch (err) {
    //     Toast({
    //       message: '这里是home页面状态码不为200的error提示',
    //       position: 'bottom',
    //       duration: 7000
    //     });
    //     console.log('err', err);
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.setBg {
  padding-top: 5vh;
  height: 100%;
  background: url("../assets/jianbian.png") #fff bottom no-repeat;
  img {
    width: 100%;
  }
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  .bg1 {
    width: 100%;
    height: 100%;
    background: #ccc;
    opacity: 0.5;
  }
  img {
    width: 80%;
    transform: translate(10%, 0);
  }
}
</style>
