<!--
 * @Author: your name
 * @Date: 2019-10-30 17:27:06
 * @LastEditTime: 2019-11-14 18:30:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xiaoge2_share_web\src\views\buyingdetails.vue
 -->
<template>
  <!-- jd -->
  <div class="buyingdetails">
    <NavBar />
    <div class="top">
      <img :src="src_img" />
      <div class="price">
        <!-- <span style="font-size:14px;">￥</span> -->
        <span style="font-size:30px;display:flex;align-items:flex-end">
          <i style="font-size:16px;margin-bottom:3px">￥</i>
          {{promotion_seckill.seckill_price}}
        </span>
        <p>
          <span>￥{{list.market_price}}</span>
          <span style="width: fit-content;">已抢{{promotion_seckill.seckill_sale_amount}}件</span>
        </p>
        <div class="jindu">
          <span class="time">距结束 {{daojishi}}</span>
          <div class="progress">
            <div class="pro" :style="{width:widths + 'px'}"></div>
            <i class="qiang">已抢 {{pre}}%</i>
          </div>
        </div>
        <img  src="../assets/shangdian.png" alt />
      </div>
    </div>
    <!-- title -->
    <div class="title">
      <div class="t_top">{{list.goods_title}}</div>
      <div class="num">
        <span>快递: {{list.express_price}}</span>
        <span>月销{{list.month_sale_amount}}</span>
      </div>
    </div>
    <!-- size -->
    <div class="size">
      <span style="color:#666;margin-right:13px;">规格</span>
      <span>选择 颜色,尺码</span>
    </div>
    <!-- 评价 -->
    <div class="evaluate">
      <p class="e_num">商家评价{{evaluate.evaluate_one_amount}}</p>
      <div class="con">
        <p>有图{{evaluate.image_amount}}</p>
        <p>好评{{evaluate.evaluate_one_amount}}</p>
        <p>差评{{evaluate.evaluate_three_amount}}</p>
      </div>
      <div class="user" v-show="user.length>0">
        <img :src="user.user_avatar?user.user_avatar:''" alt />
        <div>
          <h3>{{user.user_nick_name}}</h3>
          <span>评分 {{user.composite_evaluate_score}}</span>
        </div>
      </div>
      <div class="time" v-show="user.length>0">{{user.comment_time}} 颜色:{{user.goods_sku_title}} 尺码:</div>
      <div class="txt" v-show="user.length>0">{{user.comment_content}}</div>
    </div>
    <!-- 店铺 -->
    <div class="shops">
      <div class="shop">
        <img :src="goods_shop_info.shop_cover_image" alt />
        <div class="left">
          <p>{{goods_shop_info.shop_title}}</p>
          <p class="rate">
            综合评分:{{goods_shop_info.composite_evaluate_score}}
            <span
              style="color:#666;margin-left:30px;"
            >粉丝数{{goods_shop_info.follow_amount}}</span>
          </p>
        </div>
        <div class="right">
          <p>进店逛逛</p>
        </div>
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
      list: {}, //店铺详情
      proList: "", //商品总列表，左侧列表
      couponsList: "", //优惠券列表
      prolistone: "", //第一个(下标为1)类型的商品列表
      src_img: "",
      evaluate: {},
      promotion_seckill: {},
      user: [],
      pre: "",
      widths: "",
      goods_shop_info: {},
      goods_comment: {},
      daojishi: "",
      now: ""
    };
  },
  created() {
    this.getList();
    // this.leftTimer(154590326);
    // this.transTime(154590326);
    this.now = new Date().getTime() / 1000;
  },
  mounted() {},
  methods: {
    transTime(timestamp) {
      var result = "";
      var $days = "";
      var $hours = "";
      var $minutes = "";
      var $secend = "";
      // if (timestamp >= 86400) {
      //   $days = Math.floor(timestamp / 86400);
      //   timestamp = timestamp % 86400;
      //   result = $days + "天 ";
      //   if (timestamp > 0) {
      //     result += " ";
      //   }
      // }
      if (timestamp >= 3600) {
        $hours = Math.floor(timestamp / 3600);
        timestamp = timestamp % 3600;
        if ($hours < 10) {
          $hours = "0" + $hours;
        }
        result += $hours + ":";
      }
      if (timestamp >= 60) {
        $minutes = Math.floor(timestamp / 60);
        timestamp = timestamp % 60;
        if ($minutes < 10) {
          $minutes = "0" + $minutes;
        }
        result += $minutes + ":";
      }
      $secend = Math.floor(timestamp);
      if ($secend < 10) {
        $secend = "0" + $secend;
      }
      result += $secend; //console.log(result)
      // console.log(result);
      this.daojishi = result;
      return result;
    },

    leftTimer(timestamp) {
      var that = this;
      setInterval(function() {
        // document.getElementById("timer").innerText = this.transTime(timestamp);
        that.transTime(timestamp);
        console.log(timestamp);
        timestamp = timestamp - 1;
      }, 1000);
    },
    getList() {
      get("/mini", {
        method: "/MallShop/goodsDetail",
        goods_id: getQueryString("id") || 318
      }).then(res => {
        console.log(res.data);
        this.list = res.data;
        this.src_img = res.data.detail_image[0];
        this.evaluate = res.data.goods_comment.goods_comment_type;

        //时间戳转换
        // data.data.promotion_seckill.seckill_time
        if (this.now - res.data.promotion_seckill.seckill_time <= 0) {
          this.daojishi = "00:00:00";
        } else {
          this.leftTimer(this.now - res.data.promotion_seckill.seckill_time);
        }

        this.goods_shop_info = res.data.goods_shop_info;
        // this.goods_comment_data = res.data.goods_comment_data;
        // this.goods_comment = res.data.goods_comment.goods_comment_type;
        if (res.data.goods_comment.goods_comment_data.length > 0) {
          this.user = res.data.goods_comment.goods_comment_data[0];
        }

        // this.couponsList = this.list.takeout_shop_coupons
        if (res.data.promotion_seckill.seckill_sale_stock == 0) {
          this.pre = 0;
          this.widths = 0;
        } else {
          this.pre = (
            res.data.promotion_seckill.seckill_sale_amount /
            res.data.promotion_seckill.seckill_sale_stock
          ).toFixed(0);
          this.widths =
            (
              res.data.promotion_seckill.seckill_sale_amount /
              res.data.promotion_seckill.seckill_sale_stock
            ).toFixed(0) * 170;
        }
        if (res.data.promotion_seckill) {
          this.promotion_seckill = res.data.promotion_seckill;
        }
        // console.log(this.list);
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
  font-style: normal;
}
.top {
  width: 750px;
  height: 402px;
  position: relative;
  img {
    width: 750px;
    height: 500px;
    // background: #ccc;
  }
  .price {
    width: 100%;
    height: 104px;
    padding: 0 20px 0 32px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #c91d1d;
    display: flex;
    align-items: center;
    justify-content: space-around;
    span {
      color: #ffffff;
    }
    p {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      span {
        display: inline-block;
        &:nth-child(1) {
          text-decoration: line-through;
          color: #e89595;
          font-size: 20px;
        }
        &:nth-child(2) {
          color: #e5d9d9;
          font-size: 24px;
        }
      }
    }
    img {
      width: 42px;
      height: 74px;
    }
    .jindu {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 60px;
      margin-right: 40px;

      .time {
        width: fit-content;
        font-size: 22px;
        color: rgba(243, 198, 107, 1);
      }
      .progress {
        margin-top: 5px;
        width: fit-content;
        position: relative;
        width: 170px;
        height: 24px;
        background: #f3b945;
        border-radius: 14px;
        .pro {
          // width: 100px;
          height: 24px;
          background: #df9008;
          border-radius: 14px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
        .qiang {
          font-style: normal;
          position: absolute;
          width: fit-content;
          top: 50%;
          left: 50%;
          font-size: 14px;
          //   transform: translateX(-50%);
          transform: translateY(-50%) translateX(-50%);
          z-index: 3;
          color: #c91d1d;
        }
      }
    }
  }
}
// .top {
//   width: 750px;
//   height: 402px;
//   position: relative;
//   img {
//     width: 750px;
//     height: 402px;
//     // background: #ccc;
//   }
//   .price {
//     width: 698px;
//     height: 104px;
//     padding: 0 20px 0 32px;
//     position: absolute;
//     bottom: 0;
//     background: #c91d1d;
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     span {
//       color: #ffffff;
//     }
//     p {
//       margin-left: 30px;
//       display: flex;
//       flex-direction: column;
//       // display: inline-block;
//       .line {
//         text-decoration: line-through;
//         color: #e89595;
//         font-size: 20px;
//       }
//       .foreshow {
//         color: #e5d9d9;
//         //   font-size: 24px;
//         width: 132px;
//         height: 44px;
//         border: 2px solid rgba(225, 225, 225, 1);
//         border-radius: 26px;
//         font-size: 24px;
//         line-height: 44px;
//       }
//     }
//     // img {
//     //   width: 42px;
//     //   height: 74px;
//     // }
//     // .jindu {
//     //   display: flex;
//     //   flex-direction: column;
//     //   align-items: center;
//     //   margin-left: 150px;
//     //   margin-right: 30px;
//     //   .time {
//     //     width: fit-content;
//     //     font-size: 22px;
//     //     color: rgba(243, 198, 107, 1);
//     //   }
//     //   .progress {
//     //     margin-top: 5px;
//     //     width: fit-content;
//     //     position: relative;
//     //     width: 170px;
//     //     height: 24px;
//     //     background: #f3b945;
//     //     border-radius: 14px;
//     //     .pro {
//     //       width: 100px;
//     //       height: 24px;
//     //       background: #df9008;
//     //       border-radius: 14px;
//     //       position: absolute;
//     //       top: 0;
//     //       left: 0;
//     //       z-index: 2;
//     //     }
//     //     .qiang {
//     //       position: absolute;
//     //       width: fit-content;
//     //       top: 50%;
//     //       left: 50%;
//     //       font-size: 14px;
//     //       //   transform: translateX(-50%);
//     //       transform: translateY(-50%) translateX(-50%);
//     //       z-index: 3;
//     //       color: #c91d1d;
//     //     }
//     //   }
//     // }
//   }
// }
.title {
  padding: 20px 32px;
  // width: 686px;
  background: #ffffff;
  // height: 140px;
  border-bottom: 8px solid #f8f8f8;
  .t_top {
    text-align: left;
    font-size: 32px;
    font-weight: bold;
    width: 616px;
    height: 88px;
    line-height: 40px;
    color: rgba(51, 51, 51, 1);
  }
  .num {
    margin-top: 20px;
    // width: 686px;
    height: 32px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 22px;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.size {
  padding: 20px 32px;
  // width: 686px;
  background: #ffffff;
  height: 66px;
  border-bottom: 8px solid #f8f8f8;
  //   line-height: 66px;
  display: flex;
  align-items: center;
  span {
    font-size: 26px;
    color: rgba(51, 51, 51, 1);
  }
}
.evaluate {
  padding: 20px 32px;
  // width: 686px;
  background: #ffffff;

  //   height: 324px;
  border-bottom: 8px solid #f8f8f8;
  .e_num {
    height: 40px;
    font-size: 14px;
    color: #666;
    text-align: left;
  }
  .con {
    height: 44px;
    width: 100%;
    display: flex;
    margin-bottom: 30px;
    p {
      margin-right: 28px;
      height: 44px;
      padding: 0px 26px;
      text-align: center;
      width: fit-content;
      line-height: 45px;
      border-radius: 26px;
      background: rgba(238, 237, 236, 1);
      color: #898787;
      font-size: 20px;
    }
  }
  .user {
    display: flex;
    // flex-direction: column;
    justify-content: flex-start;
    h3 {
      font-size: 24px;
      margin-bottom: 4px;
    }
    div {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
    }
    span {
      font-size: 20px;
      color: rgba(153, 153, 153, 1);
      text-align: left;
    }
    img {
      width: 52px;
      height: 52px;
      background: rgba(0, 0, 0, 0);
      border-radius: 50%;
      //   opacity: 1;
    }
  }
  .time {
    margin-top: 25px;
    text-align: left;
    height: 14px;
    font-size: 20px;
    color: rgba(153, 153, 153, 1);
  }
  .txt {
    width: 680px;
    text-align: left;
    margin-top: 30px;
    height: 70px;
    font-size: 24px;
    color: rgba(51, 51, 51, 1);
  }
}
.shops {
  border-bottom: 2px solid #f8f8f8;
  background: #ffffff;
  .shop {
    padding: 0 32px;
    height: 200px;
    width: 686px;
    top: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 96px;
      height: 96px;
      border-radius: 8px;
      background: #ccc;
      margin-right: 24px;
    }
    .left {
      width: 500px;
      height: 96px;
      text-align: left;
      padding-top: 20px;
      // height: 94px;
      p {
        font-size: 36px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }
      .rate {
        font-size: 24px;
        font-weight: 400;
        color: #666;
      }
    }
    .right {
      p {
        border: 2px solid rgba(190, 188, 188, 1);
        border-radius: 26px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 126px;
        height: 46px;
        color: #ffffff;
        background: linear-gradient(
          272deg,
          rgba(59, 70, 77, 1) 0%,
          rgba(84, 95, 103, 1) 100%
        );
      }
    }
  }
}
</style>
