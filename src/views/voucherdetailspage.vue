<!--
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 10:16:19
 * @LastEditors: Roc
 * @LastEditTime: 2019-11-04 15:54:03
 -->
<template>
  <div class="voucherdetailspage">
    <NavBar />
    <div class="top_div">
      <li>{{list.goods_subtitle}}</li>
      <li>
        <span>{{list.goods_title}}</span>
        <span>月销量{{list.goods_sale_amount}}</span>
      </li>
      <li>{{list.goods_end_time}}</li>
    </div>

    <section class="center_div" v-show="list.goods_pink_status == 1">
      <li>玩法 开团/参团-邀请好友-满员发货（不满自动退款）</li>
      <li>直接参团 立即拼成</li>
      <div class="ul_div" v-for="(item,index) in pink_list" :key="index">
        <p>
          <img :src="item.avatar" />
          {{item.nick_name}}
        </p>
        <li>
          <span>
            还差{{item.surplus}}人
            成团
          </span>
          <!-- <span>剩余时间12:34:12</span> -->
          <yd-countdown :time="( item.create_time+86400)" timetype="timestamp">
            <span style="color:gray;">
              {%h}
              <i>时</i>
            </span>
            <span style="color:gray;">
              {%m}
              <i>分</i>
            </span>
            <span style="color:gray;">
              {%s}
              <i>秒</i>
            </span>
          </yd-countdown>
        </li>
        <li>去参团</li>
      </div>
    </section>
    <section class="shop_div">
      <p>
        <span>餐厅介绍</span>
        <span>></span>
      </p>
      <div class="merchant_item">
        <img :src="list.shop_cover_image" />
        <div class="right_div">
          <div class="van-ellipsis">{{list.shop_title}}</div>
          <div class="smalltxt_line">
            <span class="blue_txt">{{list.shop_evaluate_score}}分</span>
            <span class="toright" space="nbsp">{{list.shop_distance.toFixed(2)}}km</span>
          </div>
           <div class="smalltxt_line">
            <span style="color:#E11A1A">{{list.shop_avg_cost}}/人</span>
          </div>
          <div class="smalltxt_line txt_marg">
            <span space="nbsp">{{list.shop_address}}</span>
          </div>
        </div>
      </div>
    </section>
    <div class="gz_div">
      <h1>使用规则</h1>
      <h2>使用期限：{{list.goods_start_time}} ~ {{list.goods_end_time}}</h2>
      <h2>不可用日期：{{list.goods_unavailable_time}}</h2>
      <h2>使用时间：{{list.goods_unavailable_time}}</h2>
      <h2>预约情况：{{list.goods_booking}}</h2>
      <h1>其它规则</h1>
      <!-- <textarea name="rrrrrrr" rows="2" cols="10"></textarea> -->
      <h2>{{list.goods_desc}}</h2>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import { get, post, getQueryString } from "@/axios/http.js";
export default {
  data() {
    return {
      list: "", //商品详情
      commentList: "" //评价列表
    };
  },
  components: {
    NavBar
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      get("/mini", {
        method: "/GroupShop/goodsDetail",
        goods_id: getQueryString("id")||301
      }).then(data => {
        this.list = data.data;
        console.log(data);
        this.pink_list = this.list.goods_pink.pink_list;
      });
    }
  }
};
</script>
<style lang="scss" >
.voucherdetailspage {
  box-sizing: border-box;
  padding: 20px;
  background: #f8f8f8;
  .top_div {
    text-align: left;
    color: #fff;
    width: 710px;
    height: 214px;
    background: linear-gradient(
      122deg,
      rgba(255, 153, 102, 1) 0%,
      rgba(255, 94, 98, 1) 100%
    );
    padding: 10px 10px 10px 30px;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
    box-sizing: border-box;
    border-radius: 12px;
    li:nth-child(1) {
      width: 310px;
      height: 40px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40px;
      // color: rgba(255, 255, 255, 1);
    }
    li:nth-child(2) {
      display: flex;
      justify-content: space-between;
      span:nth-child(1) {
        width: 308px;
        height: 56px;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 56px;
        // color: rgba(255, 255, 255, 1);
      }
      span:nth-child(2) {
        width: 116px;
        height: 34px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 34px;
        // color: rgba(255, 255, 255, 1);
      }
    }
    li:nth-child(3) {
      height: 34px;
      font-size: 24px;
      font-weight: 400;
      line-height: 34px;
      margin-top: 36px;
    }
  }
  .center_div {
    margin-top: 20px;
    width: 710px;
    // height: 338px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
    box-sizing: border-box;
    padding: 20px;
    li:nth-child(1) {
      height: 52px;
      line-height: 52px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: bold;
      border-bottom: 1px solid rgba(241, 236, 236, 1);
      text-align: left;
      color: rgba(102, 102, 102, 1);
    }
    li:nth-child(2) {
      width: 236px;
      height: 52px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 52px;
      color: rgba(51, 51, 51, 1);
    }
    .ul_div {
      height: 104px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(241, 236, 236, 1);
      p:nth-child(1) {
        display: flex;
        justify-content: center;
        align-content: center;
        line-height: 52px;
        img {
          display: inline-block;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      li:nth-child(2) {
        width: 200px;
        height: 104px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 28px;
        color: rgba(51, 51, 51, 1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      li:nth-child(3) {
        width: 108px;
        height: 44px;
        background: rgba(225, 26, 26, 1);
        opacity: 1;
        border-radius: 26px;
        line-height: 44px;
        color: #f8f8f8;
      }
    }
  }
  .shop_div {
    width: 710px;
    // height: 304px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
    p {
      display: flex;
      font-size: 28px;
      height: 40px;
      justify-content: space-between;
    }
    .merchant_item {
      box-sizing: border-box;
      padding: 0px;
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
      display: flex;
      flex-direction: column;
      justify-content: space-around;
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
  }
  .gz_div {
    width: 710px;
    // height: 606px;
    margin-top: 30px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
    border-radius: 12px;
    padding: 20px;
    box-sizing: border-box;
    h1 {
      width: 112px;
      height: 40px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 40px;
      color: rgba(51, 51, 51, 1);
    }
    h2 {
      // width: 216px;
      height: 34px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 34px;
      color: rgba(51, 51, 51, 1);
      text-align: left;
    }
    textarea {
      width: 640px;
      height: 50px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
    }
  }
}
</style>
