<!--
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 21:19:43
 * @LastEditors: duo
 * @LastEditTime: 2019-11-14 16:59:20
 -->


<template>
  <div>
    <!-- 遮罩层跳转到登录页 -->
    <div class="layer" @click="toLoginOfVue"></div>
    <!-- 下面引导下载栏 -->
    <div class="fixBg" @click="toLoginOfVue">
      <img src="../assets/logo.png" alt />
      <div>
        <div class="top">立即下载APP</div>
        <div class="bottom">
          开启吃喝玩乐体验
          <span class="down">下载</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {
    //优化：如果已经绑定则直接跳转到download，问产品只能绑定一个上家？
    // console.log(localStorage.getItem('token'))
  },
  mounted() {},
  methods: {
    toLoginOfVue() {
      // if() 优化：如果已经绑定则直接跳转到download
      // this.$router.push({ path: "./download" })
      this.$router.push({ path: "./login" });
    }
  }
};
</script>
<style scoped lang="scss">
.layer {
//   width: 100%;
//   height: 100%;
  background: rgba(43, 38, 38, 0);
  position: absolute;
  z-index: 9999999999;
}
.fixBg {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 130px;
  background: #fff;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999999;
  img {
    width: 84px;
    height: 84px;
    margin-right: 20px;
  }
  .top {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .bottom {
    font-size: 28px;
  }
  .down {
    font-size: 28px;
    color: #fff;
    background: #333;
    border-radius: 4px;
    padding: 4px 8px;
    margin-left: 20px;
  }
}
</style>
