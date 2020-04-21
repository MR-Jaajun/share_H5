<!--
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 10:16:19
 * @LastEditors: Roc
 * @LastEditTime: 2019-11-04 15:53:06
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
    <!-- <div class="bottomView">
      <div class="oneview" v-for="item of commentList" :key="item.id">
        <div>
          <img class="toux" src="item.user_avatar" alt />
        </div>
        <div class="right">
          <div class="toptxt">{{item.user_avatar}}</div>
          <div class="middletxt">{{item.comment_content}}</div>
          <div class="bottomdiv">
            <img v-for="i of item.comment_image" :key="i.id" :src="i" alt />
          </div>
        </div>
      </div>
    </div>-->
    <div class="rate">
      <h3>套餐评价</h3>
      <div style="text-align:left;margin-top:14px" v-show="goods_comment_data.length==0">暂无用户评价</div>
      <div v-for="(item,i) in goods_comment_data" :key="i" v-show="goods_comment_data.length!=0">
        <div class="user">
          <img :src="item.user_avatar" alt />
          <p>
            <span>{{item.user_nick_name}}</span>
            <span style="color:#666;font-size:10px;">评分：{{item.comment_evaluate_score}}</span>
          </p>
        </div>
        <div class="txt">{{item.comment_content}}</div>
        <div class="imgs2">
          <img :src="items" v-for="(items,idx) in item.comment_image" :key="idx" />
        </div>
      </div>
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
      commentList: "", //评价列表
      goods_comment_data:[]
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
        goods_id: getQueryString("id")
      }).then(data => {
        this.list = data.data;
        this.goods_comment_data = data.data.goods_comment.goods_comment_data;
      });
    },
  }
};
</script>
<style lang="scss" >
.voucherdetailspage {
  box-sizing: border-box;
  padding: 20px;
  background: #f8f8f8;
  .rate {
  margin-top: 16px;
  width: 710px;
  //   height: 522px;
  box-sizing: border-box;
  padding: 24px 10px 20px 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  h3 {
    text-align: left;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 12px;
    color: rgba(51, 51, 51, 1);
  }
  .user {
    margin-top: 14px;
    display: flex;
    justify-content: flex-start;
    img {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: #ccc;
      margin-right: 20px;
    }
    p {
      display: flex;
      flex-direction: column;
      height: 88px;
      text-align: left;
      justify-content: space-around;
      span {
        font-size: 24px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .txt {
    //   width: px;
    margin-top: 14px;
    text-align: left;
    height: 80px;
    font-size: 28px;
    line-height: 40px;
    color: rgba(102, 102, 102, 1);
  }
  .imgs2 {
    margin-top: 14px;
    display: flex;
    justify-content: flex-start;
    height: 214px;
    img {
      margin-right: 20px;
      width: 214px;
      height: 214px;
      border-radius: 8px;
    }
  }
}
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
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 34px;
      margin-top: 36px;
    }
  }
  .center_div {
    margin-top: 20px;
    width: 710px;
    height: 338px;
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
      li:nth-child(1) {
        display: inline-block;
        width: 52px;
        height: 52px;
        background: red;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
        line-height: 44px;
        background: rgba(225, 26, 26, 1);
        opacity: 1;
        border-radius: 26px;
        color: #fff;
      }
    }
  }
  .shop_div {
    width: 710px;
    height: 304px;
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
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
    border-radius: 12px;
    padding: 20px;
    box-sizing: border-box;
    h1 {
      width: 112px;
      // height: 40px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 40px;
      color: rgba(51, 51, 51, 1);
    }
    h2 {
      // width: 216px;
      // height: 34px;
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

  .bottomView {
    font-size: 24px;
    padding: 32px;
    background: #fff;
    display: flex;
    flex-direction: column;
    .oneview {
      display: flex;
      margin-bottom: 30px;
      .toptxt {
        height: 80px;
        line-height: 80px;
      }
      .middletxt {
        color: #666;
        margin-bottom: 20px;
      }
      img.toux {
        width: 80px;
        height: 80px;
        display: block;
        background: #999;
        border-radius: 50%;
      }
      img.zan {
        width: 28px;
        height: 28px;
        margin-right: 10px;
      }
      .right {
        margin-left: 15px;
        text-align: left;
        .bottomdiv {
          display: flex;
          flex-wrap: wrap;
          img {
            background: #999;
            width: 166px;
            height: 166px;
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>
