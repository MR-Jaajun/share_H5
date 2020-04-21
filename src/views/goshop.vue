<!--
 * @Description: 
 * @Author: jun
 * @Date: 2019-10-30 17:27:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-14 19:43:25
 -->
<template>
  <div class="goshop">
    <!-- 引入底部栏和遮罩层 -->
    <NavBar />
    <div class="top">
      <div class="top_t" :style="{backgroundImage:'url('+ list.shop_bg_image +')'}">
        <div style="height:94px">
          <div class="left">
            <p>{{list.shop_title}}</p>
            <p class="rate">
              综合评分:{{list.composite_evaluate_score}}
              <span
                style="color:#EEE7E7;margin-left:30px;"
              >粉丝数{{list.follow_amount}}</span>
            </p>
          </div>
          <div class="right">
            <p>
              <img src="../assets/guanzhu.png" />关注
            </p>
          </div>
        </div>
      </div>
      <div class="top_b">
        <!-- 优惠券 -->
        <div v-for="item of list.mall_shop_coupon" :key="item.id">
          <span style="font-size:20px;margin-left: 15px;">￥</span>
          <span style="margin-left: -3px;">{{item.consume_reduce}}</span>
          <p>
            <span style="font-size:10px;">优惠券</span>
            <span class="bg">{{item.coupon_title}}</span>
          </p>
        </div>
        <!-- <div>
          <span style="font-size:20px;margin-left: 15px;">￥</span>
          <span style="margin-left: -3px;">30</span>
          <p>
            <span style="font-size:10px;">优惠券</span>
            <span class="bg">满300可用</span>
          </p>
        </div> -->
      </div>
    </div>
    <!--  -->
    <div class="tab">
      <span style="font-weight:bold;">综合</span>
      <span>销量</span>
      <span>价格</span>
    </div>
    <!--  -->
    <div class="conetnt">
      <div class="list">
        <li v-for="item of categoryList" :key="item.category_id">{{item.category_title}}</li>
      </div>
      <div class="list_con">
        <li v-for="item of proList" :key="item.goods_id">
          <img :src="item.goods_cover_image" alt />
          <div>
            <p>{{item.goods_title}}</p>
            <p class="price">
              <span>￥</span>
              <span style="font-size:24px;margin-bottom:-3px; flex:1">{{item.goods_sale_price}}</span>
              <span style="color:#666;">{{item.goods_sale_amount}}人付款</span>
            </p>
          </div>
        </li>
        <!-- <li>
          <img src alt />
          <div>
            <p>
              韩版潮流百搭学生休闲
              长裤潮牌男士工装裤...
            </p>
            <p class="price">
              <span>￥</span>
              <span style="font-size:24px;margin-bottom:-3px">45</span>
              <span style="color:#666;margin-left:18px;">1230人付款</span>
            </p>
          </div>
        </li>-->
      </div>
    </div>
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
      categoryList: "", //商品总列表，左侧列表
      proList: "" //优惠券列表
    };
  },
  created() {
    this.getList();
    this.getCategoryList();
  },
  mounted() {},
  methods: {
    getList() {
      get("/mini", {
        method: "/MallShop/shopDetail",
        shop_id: getQueryString("id") || 10079
      }).then(data => {
        this.list = data.data;
        // this.couponsList = this.list.takeout_shop_coupons
        // console.log(11,this.list)
      });
    },
    getCategoryList() {
      return get("/mini", {
        method: "/MallShop/shopCategory",
        shop_id: getQueryString("id") || 10078
      })
        .then(data => {
          this.categoryList = data.data;
          // console.log(22,this.categoryList)
        })
        .then(data => {
          get("/mini", {
            method: "/MallShop/categoryGoods",
            shop_id: getQueryString("id") || 10078,
            // category_id: 59
            category_id: this.categoryList[0].category_id || 59
          }).then(data => {
            this.proList = data.data;
            // this.categoryList = data.data
            // console.log(33, this.proList)
            // this.prolistone = this.proList[0].category_goods
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.top {
  height: 417px;
  //   background: #cccccc;
  .top_t {
    height: 317px;
    position: relative;
    & > div {
      padding: 0 32px;
      position: absolute;
      width: 686px;
      top: 80px;
      //   margin-top: 50px;
      //   box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        width: 500px;
        text-align: left;
        // height: 94px;
        p {
          font-size: 36px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          margin-bottom: 20px;
        }
        .rate {
          font-size: 24px;
          font-weight: 400;
          color: #f8f8f8;
        }
      }
      .right {
        p {
          width: 112px;
          height: 46px;
          border: 2px solid rgba(190, 188, 188, 1);
          border-radius: 26px;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            margin-right: 5px;
          }
        }
      }
    }
  }
  .top_b {
    height: 100px;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    & > div {
      margin-top: -60px;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      width: 370px;
      height: 145px;
      background: url("../assets/juxing(2).png") no-repeat center center;
      background-size: 370px 145px;
      span {
        font-size: 48px;
        font-family: DINPro;
        font-weight: 500;
        color: rgba(225, 26, 26, 1);
        text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.16);
      }
      p {
        margin-left: 5px;
        height: 58px;
        width: 126px;
        display: flex;
        text-align: left;
        flex-direction: column;
        background: url("../assets/anniu.png") no-repeat -3px bottom;
        background-size: 126px 28px;

        .bg {
          //   margin-top: 5px;
          line-height: 44px;
          color: rgba(255, 255, 255, 1);
          margin-left: -5px;
          //   width: 126px;
          //   height: 28px;
          transform: scale(0.95);
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
}
.tab {
  border-top: 2px solid #cccccc;
  border-bottom: 2px solid #cccccc;
  padding: 0 60px;
  // width: 630px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 28px;
    color: rgba(51, 51, 51, 1);
  }
}
.conetnt {
  width: 750px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .list {
    width: 200px;
    background: #f5f1f1;
    box-shadow: 26px 6px 30px rgba(103, 115, 119, 0.18);
    // border:1px solid rgba(245,241,241,1);
    li {
      height: 80px;
      z-index: 1;
      text-align: center;
      line-height: 80px;
      font-size: 12px;
      font-family: PingFang SC;
      color: rgba(153, 153, 153, 1);
      &:first-child {
        font-weight: bold;
        color: #333333;
      }
    }
  }
  .list_con {
    background: #f9fafa;
    li {
      width: 550px;
      // height: 206px;
      padding: 32px 32px 32px 10px;
      border-bottom: 1px solid #cccccc;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 204px;
        height: 204px;
        background: #ccc;
        border-radius: 6px;
      }
      div {
        width: 284px;
        height: 204px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 28px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          text-align: left;
        }
        .price {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          span {
            font-size: 24px;
            color: #e11a1a;
          }
        }
      }
    }
  }
}
</style>
