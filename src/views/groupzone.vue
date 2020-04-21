<!--
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 10:16:19
 * @LastEditors: Roc
 * @LastEditTime: 2019-11-06 10:03:51
 -->
<template>
  <!-- 引入底部栏和遮罩层 -->
  <div class="groupdetailspage">
    <NavBar />
    <!-- <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">综合排序</mt-tab-item>
      <mt-tab-item id="3">距离</mt-tab-item>
      <mt-tab-item id="4">销量</mt-tab-item>
    </mt-navbar>-->
    <ul class="top_lan">
      <li>全部</li>
      <li>综合排序</li>
      <li>距离</li>
      <li>销量</li>
    </ul>
    <div class="main_div" v-for="item in list" :key="item.goods_id">
      <li class="li_title">
        <span>{{item.goods_title}}</span>
        <span style>立即抢购</span>
      </li>
      <li class="li_conter">
        <p>
          <span>{{item.goods_pink_amount}}人团</span>
          <span>￥{{item.goods_sale_price}}</span>
        </p>
        <p>
          <span>单买价</span>
          <span>￥{{item.goods_pink_price}}</span>
        </p>
        <span>{{item.shop_distance.toFixed(2)}}</span>
      </li>
      <li>
         <img class="li_img" v-for="(item,i) in item.goods_cover_image " :src="item" :key='i'/> 
      </li>

      <!-- <li class="li_img">{{item.goods_cover_image}}</li> -->
    </div>
    <!-- <div class="merchant_item">
      <img src="../assets/logo.png" />
      <div class="right_div">
        <div class="van-ellipsis">正宗重庆麻辣烫（文冲店）</div>
        <div class="smalltxt_line">
          <span class="blue_txt">4.2</span>
          <span>月销2344</span>
          <span class="toright" space="nbsp">24分 2.0km</span>
        </div>
        <div class="smalltxt_line txt_marg">
          <span space="nbsp">距您4.8km,天河区珠村东河路38号大街7号</span>
        </div>
         <div class="smalltxt_line">
            <div class="bg_tag">支持自取</div>
            <div class="bg_tag">支持自取</div>
            <div class="bg_tag">支持自取</div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { get, post, getQueryString } from "@/axios/http.js";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      list: "", //店铺详情
      proList: "", //商品总列表，左侧列表
      couponsList: "", //优惠券列表
      prolistone: "", //第一个(下标为1)类型的商品列表
      img_item: []
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      get("/mini", {
        method: "/GroupPromotion/goodsList",
        category_id: getQueryString("id")
      }).then(data => {
        this.list = data.data;
        // this.img_item = data.data.goods_cover_image;
        this.list.map(item=>{
        //  return item.goods_cover_image
             console.log(item.goods_cover_image); 
        })
   
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.groupdetailspage {
  box-sizing: border-box;
  padding: 20px;
  background: #f8f8f8;
  .top_lan {
    background: #fff;
    margin-top: 14px;
    display: flex;
    // padding: 0 40px;
    border-bottom: 1px solid #ccc;
    li {
      width: 150px;
      height: 100px;
      line-height: 100px;
      font-size: 0.3rem;
      &:first-child {
        border-bottom: 3px solid #f95d5d;
      }
    }
  }
  .main_div {
    margin-top: 30px;
    width: 710px;
    // height: 400px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
    .li_title {
      height: 42px;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      margin-bottom: 25px;
      span:nth-child(1) {
        text-align: left;
        display: inline-block;
        width: 408px;
        height: 42px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 42px;
        color: rgba(51, 51, 51, 1);
      }
      span:nth-child(2) {
        width: 96px;
        height: 34px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 34px;
        border-radius: 20px;
        background: rgba(241, 70, 70, 1);
        color: #fff;
      }
    }
    .li_conter {
      display: flex;
      height: 40px;
      padding: 20px;
      justify-content: flex-start;
      align-items: center;
      p {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span:nth-child(1) {
          width: 100px;
          height: 40px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40px;
          color: rgba(225, 26, 26, 1);
        }
        span:nth-child(2) {
          width: 80px;
          height: 40px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40px;
          color: rgba(225, 26, 26, 1);
        }
      }
      li {
        flex: 1;
        display: flex;
        justify-content: space-between;
        span:nth-child(1) {
          height: 20px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 20px;
          color: rgba(225, 26, 26, 1);
        }
        span:nth-child(2) {
          width: 19px;
          height: 22px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 22px;
          color: rgba(225, 26, 26, 1);
        }
      }
      span:nth-child(3) {
        margin-left: 90px;
        width: 58px;
        height: 28px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 28px;
        color: rgba(102, 102, 102, 1);
      }
    }
    .li_img {
      width: 202px;
      height: 202px;
      margin: 10px;
    }
  }
  .merchant_item {
    margin-top: 30px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    width: 100%;
    // margin-bottom: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 16px rgba(180, 180, 180, 0.09);
  }
  .merchant_item:last-child {
    margin-bottom: 0;
  }
  .merchant_item img {
    width: 188px;
    height: 160px;
    background: #999;
    border-radius: 8px;
    margin-right: 12px;
  }
  .right_div {
    text-align: left;
    flex: 1;
    min-width: 0;
    .van-ellipsis {
      font-size: 30px;
      margin-bottom: 20px;
    }
  }
  .right_div .smalltxt_line {
    font-size: 22px;
    position: relative;
    color: #999;
    margin: 12px 0;
    display: flex;
    flex-wrap: wrap;
    .bg_tag {
      border: 1px solid #67affb;
      color: #67affb;
      padding: 2px 4px;
      border-radius: 6px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .right_div .txt_marg {
    margin-bottom: 24px;
  }
  .right_div .blue_txt {
    color: #67affb;
    margin-right: 12px;
  }
  .right_div .toright {
    position: absolute;
    right: 0;
  }
}
</style>
