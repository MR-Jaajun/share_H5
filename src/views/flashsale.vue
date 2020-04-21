<!--
 * @Author: your name
 * @Date: 2019-10-30 17:27:06
 * @LastEditTime: 2019-11-06 15:25:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xiaoge2_share_web\src\views\flashsale.vue
 -->
<template>
  <div class="flashsale">
    <NavBar />
    <div class="title">
      <img src="../assets/qiangou.png" />
    </div>
    <!-- tab -->
    <div class="tab">
      <div v-for="item of list" :key="item.id">
        <p>{{item.times}}</p>
        <p style="font-size:11px;">{{item.scene_status|capitalize}}</p>
      </div>
      <!-- <div>
        <p>14:00</p>
        <p style="font-size:11px;">抢购进行中</p>
      </div>-->
    </div>
    <!-- tip -->
    <div class="tip">
      <p>抢购中，先下单先得哦~</p>
      <p>
        距结束
        <img src="../assets/icon_time.png" alt /> {{daojishi}}
      </p>
    </div>
    <!-- content -->
    <div class="content">
      <li v-for="item of proList" :key="item.goods_id">
        <img :src="item.goods_cover_image" />
        <div class="detail">
          <h3>{{item.goods_title}}</h3>
          <span>{{item.goods_subtitle}}</span>
          <div class="progress">
            <!-- <p class="pro"></p> -->
            <p class="pro" :style="{width:item.widths+'px'}"></p>
            <span>已抢{{item.goods_sale_amount}}件</span>
            <span>{{item.pre}}%</span>
          </div>
          <div class="price">
            <span style="font-size:12px">￥</span>
            <span style="font-size:24px;margin:0 11px -3px 0">145</span>
            <span style="text-decoration:line-through;color:#999">￥145</span>
            <p>去抢购</p>
          </div>
        </div>
      </li>
      <!-- <li>
        <img src />
        <div class="detail">
          <h3>韩版潮流百搭学生休闲长裤</h3>
          <span>买1送1 两件145元</span>
          <div class="progress">
            <p class="pro"></p>
            <span>已抢12件</span>
            <span>3%</span>
          </div>
          <div class="price">
            <span style="font-size:12px">￥</span>
            <span style="font-size:24px;margin:0 11px -3px 0">145</span>
            <span style="text-decoration:line-through;color:#999">￥145</span>
            <p>去抢购</p>
          </div>
        </div>
      </li>-->
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
      daojishi: ""
    };
  },
  created() {
    this.getList();
    // this.getProList()
  },
  filters: {
    capitalize: function(value) {
      const scene_status_title = {
        1: "进行中",
        2: "未开始"
      };
      return scene_status_title[value];
    }
    // capitalize2: function(value) {
    //   return value.toFixed(2);
    // }
  },
  mounted() {},
  methods: {
    getList() {
      return get("/mini", {
        method: "/MallPromotion/secKillScene"
      }).then(data => {
        this.list = data.data;
        let str = "";
        data.data.forEach(item => {
          item.times = this.formatTime(item.scene_start_time * 1000, "h:m");
          str = item.scene_end_time - item.scene_start_time;
          this.leftTimer(str);
        });
        console.log(data);
        get("/mini", {
          method: "/MallPromotion/secKillGoods",
          scene_id: this.list[0].scene_id
        }).then(data => {
          this.proList = data.data;

          data.data.forEach(item => {
            if (item.goods_stock_amount != 0) {
              item.pre = (
                item.goods_sale_amount / item.goods_stock_amount
              ).toFixed(0);
              item.widths =
                (item.goods_sale_amount / item.goods_stock_amount).toFixed(0) *
                270;
            } else {
              item.pre = 0;
              item.widths = 0;
            }
          });
          console.log(data);
        });
      });
    },
    // 格式化日期，如月、日、时、分、秒保证为2位数
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
    // 参数number为毫秒时间戳，format为需要转换成的日期格式
    formatTime(number, format) {
      let time = new Date(number);
      let newArr = [];
      let formatArr = ["Y", "M", "D", "h", "m", "s"];
      newArr.push(time.getFullYear());
      newArr.push(this.formatNumber(time.getMonth() + 1));
      newArr.push(this.formatNumber(time.getDate()));

      newArr.push(this.formatNumber(time.getHours()));
      newArr.push(this.formatNumber(time.getMinutes()));
      newArr.push(this.formatNumber(time.getSeconds()));

      for (let i in newArr) {
        format = format.replace(formatArr[i], newArr[i]);
      }
      return format;
    },
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
      var s = setInterval(function() {
        // document.getElementById("timer").innerText = this.transTime(timestamp);
        that.transTime(timestamp);
        console.log(timestamp);
        timestamp = timestamp - 1;
        if(timestamp == 0){
          clearInterval(s)
        }
      }, 1000);
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
.title {
  width: 750px;
  height: 76px;
}
.tab {
  margin-top: 14px;
  width: 750px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(
    267deg,
    rgba(44, 52, 57, 1) 0%,
    rgba(63, 73, 80, 1) 100%
  );

  & > div {
    &:nth-child(1) {
      background: #e11a1a;
    }
    width: 140px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      font-size: 36px;
      color: rgba(255, 255, 255, 1);
      margin: 6px 0;
    }
  }
}
.tip {
  height: 80px;
  width: 686px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(241, 236, 236, 1);

  p {
    &:nth-child(1) {
      color: #666;
    }
    font-size: 22px;
    color: #333333;
    display: flex;
    align-items: center;
    img {
      margin: 0 8px;
    }
  }
}
.content {
  width: 750px;
  height: 100%;
  li {
    // width: 686px;
    // height: 244px;
    padding: 22px 32px;
    // border-top: 1px solid rgba(241, 236, 236, 1);
    border-bottom: 1px solid rgba(241, 236, 236, 1);
    display: flex;
    box-sizing: border-box;
    // align-items: center;
    // justify-content: center;
    // justify-content: flex-start;
    img {
      width: 232px;
      height: 232px;
      background: #ccc;
      border-radius: 6px;
      margin-right: 40px;
    }
    .detail {
      width: 408px;
      height: 232px;
      display: flex;
      flex-direction: column;
      //   align-items: center;
      justify-content: space-between;
      color: rgba(51, 51, 51, 1);
      h3 {
        font-size: 34px;
        font-weight: bold;
        text-align: left;
      }
      span {
        text-align: left;
        font-size: 28px;
      }
      .progress {
        position: relative;
        width: 270px;
        height: 30px;
        background: #f39f9f;
        border-radius: 14px;
        .pro {
          width: 150px;
          height: 30px;
          background: #e11a1a;
          border-radius: 14px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
        span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          z-index: 3;
          color: rgba(255, 255, 255, 1);
          &:nth-child(2) {
            left: 46px;
          }
          &:nth-child(3) {
            right: 4px;
          }
        }
      }
      .price {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        height: 52px;
        color: #e11a1a;
        p {
          width: 128px;
          height: 52px;
          background: rgba(225, 26, 26, 1);
          border-radius: 8px;
          color: #fff;
          text-align: center;
          line-height: 54px;
          font-size: 24px;
          margin-left: 100px;
        }
      }
    }
  }
}
</style>