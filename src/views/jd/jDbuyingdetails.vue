<!--
 * @Author: your name
 * @Date: 2019-10-30 17:27:06
 * @LastEditTime: 2019-11-14 18:15:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xiaoge2_share_web\src\views\buyingdetails.vue
 -->
<template>
  <div class="jDbuyingdetails">
    <NavBar />
    <div class="top">
      <img :src="cover_image[0]" />
      <div class="price">
        <div>
          <span>
            <i style="font-size:14px;">￥</i>
            <i style="font-size:20px;">{{list.sale_price}}</i>
          </span>
          <span class="dan">活动价</span>
        </div>
        <p>
          <span style="text-decoration: line-through;">￥{{list.market_price}}</span>
          <span style="width: fit-content;">已抢{{promotion_seckill.seckill_sale_amount}}件</span>
        </p>
        <div class="jindu">
          <span class="time">距结束 {{daojishi}}</span>
          <div class="progress">
            <div class="pro" :style="{width:widths + 'px'}"></div>
            <i class="qiang">已抢 {{pre}}%</i>
          </div>
        </div>
        <img class="aaa" style="width:21px;height:37px" src="../../assets/shangdian.png" alt />
      </div>
    </div>
    <!-- title -->
    <div class="title">
      <div class="t_top">{{list.goods_title}}...</div>
      <div class="num">
        <span>快递: {{list.express_price}}</span>
        <span>月销{{list.month_sale_amount}}</span>
      </div>
    </div>

    <!-- size -->
    <div class="size">
      <span style="color:#999;margin-right:13px;">规格</span>
      <span>已选择 {{sku_info_title}}</span>
    </div>
    <!-- 优惠券 -->
    <div class="quan">
      <span>参数</span>
      <p>这是产品参数</p>
      <!-- <p v-for="(item,i) in list.goods_shop_coupon" :key="i">{{item.coupon_title}}</p>
      <p>满100减10劵</p>
      <p>满100减10劵</p>-->
    </div>
    <!-- 优惠券 -->
    <div class="quan">
      <span>服务</span>
      <p>支持7天无理由退货</p>
    </div>
    <!-- 评价 -->
    <div class="evaluate">
      <p class="e_num">商家评价{{evaluate.evaluate_one_amount==0?'':evaluate.evaluate_one_amount}}</p>
      <div class="con">
        <p>有图{{evaluate.image_amount}}</p>
        <p>好评{{evaluate.evaluate_one_amount}}</p>
        <p>好评{{evaluate.evaluate_two_amount}}</p>
        <p>差评{{evaluate.evaluate_three_amount}}</p>
      </div>
      <div class="user" v-show="user.length>0">
        <img :src="user.user_avatar?user.user_avatar:''" alt />
        <div>
          <h3>{{user.user_nick_name}}</h3>
          <span>评分 {{user.composite_evaluate_score}}</span>
        </div>
      </div>
      <div class="time" v-show="user.length>0">{{user.comment_time}} 颜色:{{user.goods_sku_title}}</div>
      <div class="txt" v-show="user.length>0">{{user.comment_content}}</div>
    </div>
    <div class="titles">
      <p>继续拖懂，查看图文详情</p>
    </div>
    <!-- 图文 -->
    <div class="detailImg">
      <p>图文详情</p>
      <div v-html="goods_detail"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/jdNavBar.vue";
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
      evaluate: {},
      user: [],
      cover_image: [],
      goods_shop_info: {},
      sku_info_title: "",
      daojishi: "",
      now: ""
    };
  },
  created() {
    this.getList();
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
        // console.log(timestamp);
        timestamp = timestamp - 1;
      }, 1000);
    },
    getList() {
      get("/mini", {
        method: "/JdShop/goodsDetail",
        goods_id: getQueryString("id") || 515
      }).then(res => {
        console.log(res.data, "商品详情");
        this.list = res.data;
        this.goods_detail = res.data.goods_detail;
        this.sku_info_title =
          res.data.goods_sku_key[0].attr_list[0].sku_info_title;
        this.cover_image = res.data.cover_image;
        this.goods_shop_info = res.data.goods_shop_info;
        this.evaluate = res.data.goods_comment.goods_comment_type;
        // this.user = data.data.goods_comment.goods_comment_data[0];
        if (res.data.goods_comment.goods_comment_data.length > 0) {
          this.user = res.data.goods_comment.goods_comment_data[0];
        } else {
          this.user = [];
        }
        if (this.now - res.data.promotion_seckill.seckill_time <= 0) {
          this.daojishi = "00:00:00";
        } else {
          this.leftTimer(this.now - res.data.promotion_seckill.seckill_time);
        }
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
        // this.couponsList = this.list.takeout_shop_coupons
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
  // box-sizing: border-box;
}
.top {
  width: 750px;
  height: 500px;
  position: relative;
  overflow: hidden;
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
    justify-content: flex-start;
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .dan {
        // margin-top: 8px;
        width: 106px;
        height: 38px;
        font-size: 24px;
        line-height: 38px;
        color: #fff;
        text-align: left;
        margin-left: 30px;
      }
    }
    span {
      color: #ffffff;
    }
    p {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      span {
        color: #fff;
        font-size: 24px;
      }
    }
    .yiping {
      margin-left: 290px;
      font-size: 24px;
      color: rgba(243, 198, 107, 1);
    }
  }
  .aaa {
    width: 42px;
    height: 74px;
  }
  .jindu {
    //   img {
    //   width: 42px;
    //   height: 74px;
    // }
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
.title {
  padding: 20px 32px;
  background: #ffffff;
  // width: 686px;
  // height: 140px;
  border-bottom: 8px solid #f8f8f8;
  .t_top {
    text-align: left;
    font-size: 32px;
    font-weight: bold;
    width: 616px;
    height: 78px;
    line-height: 40px;
    color: rgba(51, 51, 51, 1);
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .num {
    margin-top: 20px;
    // width: 686px;
    // height: 32px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 22px;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.quan {
  padding: 20px 32px;
  // width: 686px;
  // height: 66px;
  background: #ffffff;
  border-bottom: 8px solid #f8f8f8;
  display: flex;
  align-items: center;
  span {
    font-size: 24px;
    color: #999;
    margin-right: 20px;
  }
  p {
    // width: 144px;
    height: 32px;
    // background: url("../../assets/youhuikuan.png") no-repeat;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    color: #333;
    margin: 0 20px;
  }
}
.size {
  padding: 20px 32px;
  // width: 686px;
  // height: 66px;
  background: #ffffff;
  border-bottom: 8px solid #f8f8f8;
  //   line-height: 66px;
  display: flex;
  align-items: center;
  span {
    font-size: 24px;
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
    font-size: 18px;
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
.titles {
  height: 70px;
  color: #666666;
  font-size: 22px;
  line-height: 70px;
  background: #fff;
}
.detailImg {
  p {
    color: #999;
    height: 60px;
    font-size: 22px;
    line-height: 60px;
  }
  /deep/ img {
    // background-size: cover !important;
    width: 750px !important;
    min-height: 300px !important;
    max-height: 900px !important;
  }
  /deep/ .ssd-module-mobile-wrap {
    width: 750px !important;
    /deep/ .ssd-module {
      // background-size: cover !important;
      min-height: 300px !important;
      max-height: 880px !important;
    }
  }
}
</style>

