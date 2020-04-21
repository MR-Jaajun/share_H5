<!--
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 10:16:19
 * @LastEditors: Roc
 * @LastEditTime: 2019-11-06 10:03:51
 -->
<template>
  <!-- 引入底部栏和遮罩层 -->
  <div class="jDgroupzone">
    <!-- <NavBar /> -->

    <ul class="top_lan">
      <!-- <li>全部</li> -->
      <li
        :class="{ 'active': item.category_id==cid }"
        v-for="(item,i) in categoryList"
        :key="i"
      >{{item.category_title}}</li>
    </ul>
    <div class="content">
      <div class="con">
        <div class="goods">
          <div class="goodsList" v-for="(item,i) in list" :key="i">
            <img :src="item.goods_cover_image" />
            <div class="goodinfo">
              <h2>{{item.goods_title}}</h2>
              <p class="info">已拼{{item.goods_pink_sale_amount}}件</p>
              <p class="discount">
                <span>{{item.pink_people_limit}}人团</span>￥
                <span class="span1">{{item.goods_pink_price}}</span>
              </p>
              <p class="price">
                <span>单买价</span>￥
                <span class="span1">{{item.goods_sale_price}}</span>
              </p>
              <div class="btn">立即抢 ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="main_div" v-for="item in list" :key="item.goods_id">
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
        <span>{{item.shop_distance}}</span>
      </li>
      <li>
        <img class="li_img" v-for="(item,i) in item.goods_cover_image " :src="item" :key="i" />
      </li>

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
      cid: "",
      list: "", //店铺详情
      proList: "", //商品总列表，左侧列表
      couponsList: "", //优惠券列表
      prolistone: "", //第一个(下标为1)类型的商品列表
      img_item: [],
      categoryList: []
    };
  },
  created() {
    this.getList();
    this.category();
    this.cid = getQueryString("id") || 0;
  },
  mounted() {},
  methods: {
    //一级分类 /JdIndex/Category_1
    category() {
      get("/mini", {
        method: "/JdIndex/Category_1",
        category_id: getQueryString("id")
      }).then(res => {
        // console.log(res.data, "一级分类");
        let obj = { category_title: "全部", category_id: 0 };
        res.data.splice(0, 0, obj);
        this.categoryList = res.data;
      });
    },
    getList() {
      get("/mini", {
        method: "/JdIndex/pinkGoodsList",
        category_id: getQueryString("id")
      }).then(res => {
        console.log(res.data, "拼团");
        this.list = res.data;
        // this.img_item = data.data.goods_cover_image;
        // this.list.map(item => {
        //  return item.goods_cover_image
        // });
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
.jDgroupzone {
  box-sizing: border-box;
  background: #f8f8f8;
  .top_lan {
    background: #fff;
    padding: 0 34px;
    border-bottom: 1px solid #ccc;
    width: 50000px;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 22px rgba(41, 63, 100, 0.09);
    li {
      width: fit-content;
      float: left;
      padding: 0 10px;
      height: 60px;
      font-size: 0.3rem;
      line-height: 60px;
      color: #333;
      margin-right: 62px;
    }
    .active {
      border-bottom: 3px solid #f95d5d;
      color: #f95d5d;
      font-weight: bold;
    }
  }
  .content {
    // z-index: 2;
    position: relative;
    width: 750px;
    background: rgba(243, 243, 243, 1);
    .con {
      box-sizing: border-box;
      background: #fff;
      width: 750px;
      .goodsList {
        height: 308px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 20px 20px 20px;
        // margin-bottom: 32px;
        border-bottom: 1px solid #f1ecec;
        img {
          width: 232px;
          height: 232px;
          border-radius: 12px;
          background: #ccc;
          margin-right: 25px;
        }
        .goodinfo {
          position: relative;
          width: 460px;
          height: 204px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          h2 {
            width: 408px;
            text-align: left;
            font-size: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 18px;
          }
          .info {
            // width: 200px;
            text-align: left;
            height: 28px;
            font-size: 28px;
            line-height: 28px;
            color: #666;
            margin-bottom: 25px;
          }
          .discount {
            text-align: left;
            font-size: 20px;
            color: #e11a1a;
            margin-bottom: 25px;
            span {
              &:nth-child(1) {
                color: #333;
                font-size: 24px;
                margin-right: 18px;
              }
              &:nth-child(2) {
                color: #e11a1a;
                font-size: 36px;
              }
            }
          }
          .price {
            text-align: left;
            font-size: 20px;
            color: #333;
            span {
              &:nth-child(1) {
                color: #666666;
                font-size: 22px;
                margin-right: 18px;
              }
              &:nth-child(2) {
                color: #333;
                font-size: 36px;
              }
            }
          }
          .btn {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 24px;
            color: #fff;
            text-align: center;
            border-radius: 20px;
            font-family: PingFang SC;
            line-height: 52px;
            width: 128px;
            height: 52px;
            background: rgba(255, 54, 54, 1);
            border-radius: 26px;
          }
        }
      }
    }
  }
  // .main_div {
  //   margin-top: 2px;
  //   // width: 710px;
  //   padding: 0 20px;
  //   // height: 400px;
  //   background: rgba(255, 255, 255, 1);
  //   box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
  //   .li_title {
  //     height: 42px;
  //     display: flex;
  //     justify-content: space-between;
  //     padding: 20px;
  //     margin-bottom: 25px;
  //     span:nth-child(1) {
  //       text-align: left;
  //       display: inline-block;
  //       width: 408px;
  //       height: 42px;
  //       font-size: 30px;
  //       font-family: PingFang SC;
  //       font-weight: bold;
  //       line-height: 42px;
  //       color: rgba(51, 51, 51, 1);
  //     }
  //     span:nth-child(2) {
  //       width: 96px;
  //       height: 34px;
  //       font-size: 16px;
  //       font-family: PingFang SC;
  //       font-weight: 400;
  //       line-height: 34px;
  //       border-radius: 20px;
  //       background: rgba(241, 70, 70, 1);
  //       color: #fff;
  //     }
  //   }
  //   .li_conter {
  //     display: flex;
  //     height: 40px;
  //     padding: 20px;
  //     justify-content: flex-start;
  //     align-items: center;
  //     p {
  //       flex: 1;
  //       display: flex;
  //       justify-content: flex-start;
  //       align-items: center;
  //       span:nth-child(1) {
  //         width: 100px;
  //         height: 40px;
  //         font-size: 28px;
  //         font-family: PingFang SC;
  //         font-weight: 400;
  //         line-height: 40px;
  //         color: rgba(225, 26, 26, 1);
  //       }
  //       span:nth-child(2) {
  //         width: 80px;
  //         height: 40px;
  //         font-size: 28px;
  //         font-family: PingFang SC;
  //         font-weight: 400;
  //         line-height: 40px;
  //         color: rgba(225, 26, 26, 1);
  //       }
  //     }
  //     li {
  //       flex: 1;
  //       display: flex;
  //       justify-content: space-between;
  //       span:nth-child(1) {
  //         height: 20px;
  //         font-size: 14px;
  //         font-family: PingFang SC;
  //         font-weight: 400;
  //         line-height: 20px;
  //         color: rgba(225, 26, 26, 1);
  //       }
  //       span:nth-child(2) {
  //         width: 19px;
  //         height: 22px;
  //         font-size: 16px;
  //         font-family: PingFang SC;
  //         font-weight: 400;
  //         line-height: 22px;
  //         color: rgba(225, 26, 26, 1);
  //       }
  //     }
  //     span:nth-child(3) {
  //       margin-left: 90px;
  //       width: 58px;
  //       height: 28px;
  //       font-size: 20px;
  //       font-family: PingFang SC;
  //       font-weight: 400;
  //       line-height: 28px;
  //       color: rgba(102, 102, 102, 1);
  //     }
  //   }
  //   .li_img {
  //     width: 202px;
  //     height: 202px;
  //     margin: 10px;
  //   }
  // }
}
</style>
