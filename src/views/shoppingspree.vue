<!--
 * @Author: your name
 * @Date: 2019-10-30 17:27:06
 * @LastEditTime: 2019-11-06 16:24:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xiaoge2_share_web\src\views\buyingdetails.vue
 -->
<template>
  <div class="shoppingspree">
    <NavBar />
    <div class="top">
      <img :src="list.goods_image" />
      <div class="price">
        <span style="font-size:14px;">￥</span>
        <span style="font-size:34px;">{{list.sale_price}}</span>
        <p>
          <span class="line">￥{{list.market_price}}</span>
          <span class="foreshow">秒杀预告</span>
        </p>
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
    <!-- 优惠券 -->
    <div class="quan">
      <span>领劵</span>
      <p v-for="(item,i) in list.goods_shop_coupon" :key="i">{{item.coupon_title}}</p>
      <!-- <p>满100减10劵</p>
      <p>满100减10劵</p>-->
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
      <div class="user">
        <img :src="user.user_avatar" alt />
        <div>
          <h3>{{user.user_nick_name}}</h3>
          <span>评分 {{user.composite_evaluate_score}}</span>
        </div>
      </div>
      <div class="time">{{user.comment_time}} 颜色:{{user.goods_sku_title}} 尺码:M</div>
      <div class="txt">{{user.comment_content}}</div>
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
      list: "", //店铺详情
      proList: "", //商品总列表，左侧列表
      couponsList: "", //优惠券列表
      prolistone: "", //第一个(下标为1)类型的商品列表
      evaluate: {},
      user: [],
      goods_shop_info:{}
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      get("/mini", {
        method: "/MallShop/goodsDetail",
        goods_id: getQueryString("id") || 297
      }).then(data => {
        this.list = data.data;
        // this.evaluate = data.data.goods_comment;
        // this.user = data.data.goods_comment.goods_comment_data;
        // this.couponsList = this.list.takeout_shop_coupons
        this.goods_shop_info = data.data.goods_shop_info;
        this.evaluate = data.data.goods_comment.goods_comment_type;
        // this.user = data.data.goods_comment.goods_comment_data[0];
        if (data.data.goods_comment.goods_comment_data) {
          this.user = data.data.goods_comment.goods_comment_data[0];
        }
        console.log(this.list);
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
  width: 750px;
  height: 402px;
  position: relative;
  img {
    width: 750px;
    height: 402px;
    // background: #ccc;
  }
  .price {
    width: 100%;
    height: 104px;
    padding: 0 20px 0 32px;
    position: absolute;
    bottom: 0;
    background: #c91d1d;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      color: #ffffff;
    }
    p {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      // display: inline-block;
      .line {
        text-decoration: line-through;
        color: #e89595;
        font-size: 20px;
      }
      .foreshow {
        color: #e5d9d9;
        //   font-size: 24px;
        width: 132px;
        height: 44px;
        border: 2px solid rgba(225, 225, 225, 1);
        border-radius: 26px;
        font-size: 24px;
        line-height: 44px;
      }
    }
  }
}
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
    background: #ffffff;
    // border-bottom: 8px solid #f8f8f8;

    // height: 32px;
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
    width: 144px;
    height: 32px;
    background: url("../assets/youhuikuan.png") no-repeat;
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    color: rgba(95, 189, 252, 1);
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
  background: #ffffff;

  border-bottom: 2px solid #f8f8f8;
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
