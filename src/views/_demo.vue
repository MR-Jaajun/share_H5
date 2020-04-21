<!--
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 21:19:43
 * @LastEditors: Roc
 * @LastEditTime: 2019-11-01 18:13:33
 -->
<template>
  <div>
    <button @click="getList">测</button>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'//弹窗提示用，需要用参考login
import { get, post } from '@/axios/http.js'
export default {
  components: {},
  data() {
    return {
      
    }
  },
  created() {
    // this.getList()
  },
  mounted() { },
  methods: {
    getList() {
      Indicator.open();
      get('/mini', {
        method: "/GroupShop/shopDetail",
        shop_id: 10078
      }).then(data => {
        Indicator.close();
        console.log(data)
      })
    },
    toLogin() {
      this.$router.push({ path: "./login" });
    },
  }
};
</script>
<style lang="scss" scoped>
</style>
