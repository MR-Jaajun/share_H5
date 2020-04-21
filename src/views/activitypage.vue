<!--
 * @Description: 
 * @Author: jun
 * @Date: 2019-10-30 17:27:06
 * @LastEditors: Roc
 * @LastEditTime: 2019-11-04 17:10:53
 -->
<template>
  <div class="activitypage_box">
    <!-- 引入底部栏和遮罩层 -->
    <NavBar />

    <div class="top">
      <img :src="info.activity_cover_image" alt />
    </div>

    <div v-for="item of list" :key="item.id" class="merchant_item">
      <img src="../assets/logo.png" />
      <div class="right_div">
        <div class="van-ellipsis">{{item.shop_title}}</div>
        <div class="smalltxt_line">
          <span class="blue_txt">{{item.composite_evaluate_score}}</span>
          <span>月销{{item.month_sale_amount}}</span>
          <span class="toright" space="nbsp">{{item.delivery_estimated_time}}分 2.0km</span>
        </div>
        <div class="smalltxt_line txt_marg">
          <span space="nbsp">起送¥{{item.delivery_order_amount}}免配送费 人均¥{{item.perperson_consumption}}</span>
        </div>
        <div class="smalltxt_line">
          <div v-for="i of item.takeout_shop_coupons" :key="i.id" class="bg_tag">{{i.coupon_title}}</div>
        </div>
      </div>
    </div>

    <div class="hui">点击加载更多</div>
    <div class="bottom">
      <div style="text-align:center">{{info.activity_title}}</div>
      <!-- <div>1, 活动时间: {{info.time1}} - {{info.time2}}</div> -->
      <!-- <div>1, 活动时间:2019年11月1日-2019年11月30日</div>
      <div>2, 活动范围: {{info.activity_type}}</div>
      <div>3, 活动内容: {{info.activity_content}}</div>-->
      <div v-html="info.activity_content"></div>
    </div>
    <div class="chengg"></div>
    <!-- <div class="merchant_item" data-id="{{id}}" bindtap="toshop">
    <image src="{{shop_cover_image}}"></image>
    <div class="right_div">
      <div class="van-ellipsis">{{shop_title}}</div>
      <div class="smalltxt_line">
        <text class="blue_txt">{{composite_evaluate_score}}</text>
        <text>月销{{month_sale_amount}}</text>
        <text class="toright" space="nbsp">{{delivery_estimated_time}}分  {{foo.bar(distance)}}km</text>
      </div>
      <div class="smalltxt_line txt_marg">
        <text space="nbsp">起送¥{{delivery_order_amount}}  免配送费  人均¥{{perperson_consumption}}</text>
      </div>
      <div class="smalltxt_line">
        <block wx:for="{{shop_tags}}" wx:key="id">
          <van-tag custom-class="bg_tag" color="#76B3F5" plain>{{item.tag_title}}</van-tag>
        </block>
      </div>
    </div>
    </div>-->
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { get, post, getQueryString } from "@/axios/http.js";
import { formatTimer } from "@/filters/index.js";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      list: "", //店铺列表
      info: "" //活动详情
    };
  },
  created() {
    this.getList();
    this.getProList();
  },
  mounted() {},
  methods: {
    getList() {
      get("/mini", {
        method: "/TakeoutIndex/activityDetail", //活动详情
        activity_id: getQueryString("id") || 21
      }).then(data => {
        this.info = data.data;
      });
    },
    getProList() {
      get("/mini", {
        method: "/TakeoutIndex/activityDetailShops",
        activity_id: getQueryString("id") || 24
      }).then(data => {
        this.list = data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.activitypage_box {
  font-size: 24px;
  /* 店铺列表 */
  .merchant_list {
    margin-top: 32px;
  }
  .merchant_item {
    box-sizing: border-box;
    padding: 0 40px;
    display: flex;
    width: 100%;
    margin-bottom: 50px;
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
      padding: 8px 8px;
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

  .top {
    padding: 0 20px;
    margin: 30px 0 60px;
    img {
      height: 224px;
    }
  }
  .hui {
    color: #999;
  }

  .bottom {
    padding: 0 80px;
    margin: 52px 0 18px;
    > div {
      text-align: left;
      margin: 22px 0;
    }
  }

  .chengg {
    width: 100%;
    height: 130px;
  }
}
</style>
