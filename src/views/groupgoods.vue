<!--
 * @Author: your name
 * @Date: 2019-10-30 17:27:06
 * @LastEditTime: 2019-11-14 18:40:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xiaoge2_share_web\src\views\buyingdetails.vue
 -->
<template>
  <div class="groupgoods">
    <NavBar />
    <div class="top">
      <img :src="list.goods_image" />
      <div class="price">
        <span style="font-size:14px;">￥</span>
        <span style="font-size:34px;">{{list.pink_price}}</span>
        <p>
          <span>单买价</span>
          <span class="dan">￥{{list.market_price}}</span>
        </p>
        <div class="yiping">已拼{{promotion_pink.pink_sale_amount}}件</div>
        <!-- <div class="jindu">
          <span class="time">距结束 22:08:13</span>
          <div class="progress">
            <div class="pro"></div>
            <i class="qiang">已抢5%件</i>
          </div>
        </div>-->
        <!-- <img src="../assets/shangdian.png" alt /> -->
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
    <!-- <div class="size">
      <span style="color:#666;margin-right:13px;">规格</span>
      <span>选择 颜色,尺码</span>
    </div>-->
    <!-- 玩法 -->
    <div class="play">
      <span style="color:#666;margin-right:13px;">玩法</span>
      <span>开团/参团-邀请好友-满员发货（不满自动退款）</span>
    </div>
    <!-- team -->
    <div class="team">
      <h3 class="t_title">直接参团 立即拼成</h3>
      <!-- <li v-for="item in  list.promotion_pink.pink_list" :key="item">
        <p class="userinfo">
          <img :src="item.avatar" />
          <span>{{item.nick_name}}</span>
        </p>
        <p class="time">
          <span>
            还差
            <i style="color:#E11A1A;">{{item.surplus}}人</i> 成团
          </span>
          <span>剩余时间12:34:12</span>
        </p>
        <p class="btn">去参团</p>
      </li>-->
      <li v-for="(item,i) in promotion_pink.pink_list" :key="i">
        <p class="userinfo">
          <img :src="item.avatar" alt />
          <span>{{item.nick_name}}</span>
        </p>
        <p class="time">
          <span>
            还差
            <i style="color:#E11A1A;">{{item.surplus}}人</i> 成团
          </span>
          <span>剩余时间{{item.times}}</span>
        </p>
        <p class="btn">去参团</p>
      </li>
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
        <img :src="user.user_avatar?user.user_avatar:''" alt />
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
      promotion_pink: {},
      goods_shop_info: {}
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    transTime(timestamp) {
      var result = "";
      var $days = "";
      var $hours = "";
      var $minutes = "";
      var $secend = "";
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
      // this.daojishi = result;
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
        goods_id: getQueryString("id") || 297
      }).then(data => {
        this.list = data.data;
        this.evaluate = data.data.goods_comment.goods_comment_type;
        if (data.data.goods_comment.goods_comment_data.length > 0) {
          this.user = data.data.goods_comment.goods_comment_data[0];
        }
        this.goods_shop_info = data.data.goods_shop_info;

        data.data.promotion_pink.pink_list.forEach(item => {
          item.t = item.create_time + 86400 * 1 - new Date().getTime() / 1000;
          // item.create_time + 86400*1 - new Date().getTime() / 1000
          item.times = this.leftTimer(item.t);
        });
        this.couponsList = this.list.takeout_shop_coupons;
        if (data.data.promotion_pink) {
          this.promotion_pink = data.data.promotion_pink;
        }

        console.log(data.data.promotion_pink);
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
      span {
        &:nth-child(1) {
          //   text-decoration: line-through;
          color: #e89595;
          font-size: 20px;
        }
      }
      .dan {
        margin-top: 8px;
        width: 106px;
        height: 38px;
        background: rgba(28, 21, 21, 1);
        opacity: 0.14;
        border-radius: 4px;
        font-size: 24px;
        line-height: 38px;
        color: rgba(241, 234, 234, 1);
      }
    }
    .yiping {
      margin-left: 160px;
      font-size: 24px;
      color: rgba(243, 198, 107, 1);
      position: absolute;
      right: 20px;
    }
  }
}
.title {
  padding: 20px 32px;
  // width: 686px;
  // height: 140px;
  background: #ffffff;
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
.play {
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
.team {
  // height: 100%;
  // width: 750px;
  min-height: 50px;
  background: #ffffff;

  border-bottom: 8px solid #f8f8f8;
  padding: 20px 0;
  h3 {
    padding-left: 32px;
    width: fit-content;
    text-align: left;
    color: #333333;
    font-size: 24px;
  }
  li {
    height: 106px;
    padding: 0 32px;
    // width: 686px;
    display: flex;
    align-items: center;
    .userinfo {
      display: flex;
      align-items: center;
      span {
        font-size: 24px;
        color: rgba(102, 102, 102, 1);
        margin-left: 12px;
      }
      img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: #ccc;
      }
    }
    .time {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 76px 0 200px;
      span {
        color: #333333;
        font-size: 20px;
        margin: 2px 0;
      }
    }
    .btn {
      width: 108px;
      height: 44px;
      background: rgba(225, 26, 26, 1);
      border-radius: 26px;
      text-align: center;
      line-height: 44px;
      font-size: 24px;
      color: #ffffff;
    }
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
