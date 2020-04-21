<!--
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 10:16:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-14 18:08:01
 -->
<template>
  <div class="businessdetails">
    <NavBar />
    <div class="shop_bg_image">
      <img :src="obj.shop_bg_image"  v-show="obj.shop_bg_image"/>
    </div>
    <div class="top_div">
      <div class="merchant_item">
        <img :src="obj.shop_cover_image" />
        <div class="right_div">
          <div class="van-ellipsis">
            {{obj.shop_title}}
            <img class="img" src="../assets/r_img/icon-collectionone.png" />
          </div>
          <div class="smalltxt_line">
            <span class="blue_txt">¥{{obj.avg_cost}}/人</span>
            <!-- <span>4.0分</span> -->
            <span class="toright" space="nbsp"></span>
          </div>
          <!-- <div class="smalltxt_line txt_marg">
            <span space="nbsp">起送¥15 免配送费 人均¥14</span>
          </div>-->
        </div>
      </div>
    </div>
    <div class="are_div">
      <span>{{obj.shop_province}}{{obj.shop_city}}{{obj.shop_area}}{{obj.shop_address}}</span>
      <span>店铺资质信息</span>
    </div>
    <ul class="top_lan">
      <li>全部</li>
      <li>评价（520)</li>
      <!-- <li>距离</li>
      <li>销量</li>-->
    </ul>
    <ul class="order_div">
      <li v-for="(item,i) in goods_voucher_list" :key="i">
        <div class="top_title">
          <span>{{item.goods_title}}</span>
          <span class="btns" v-show="item.pink_status==1">去参团</span>
          <span class="btns" v-show="item.pink_status==0">去抢购</span>
        </div>
        <p class="p_size">{{item.goods_subtitle}}</p>
        <p class="p_right" v-show="item.pink_status==1">已拼{{item.pink_sale_amount}}</p>
        <p class="p_right" v-show="item.pink_status==0">月售{{item.sale_amount}}</p>
        <div class="bottom_div">
          <span v-show="item.pink_status==1">2人团 ￥{{item.pink_price}}</span>
          <span>单买价 ￥{{item.sale_price}}</span>
          <span v-show="item.pink_status==0">门市价{{item.market_price}}元</span>
          <!-- <span v-show="item.pink_status==0" style="background:#67AFFB color:#FFFFFF">8.4折</span> -->
        </div>
      </li>
      <!-- <li>
        <div class="top_title">
          <span>120元代金券</span>
          <span>去抢购</span>
        </div>
        <p class="p_size">限购3张、部分商品可用 、单次可使用1张</p>
        <p class="p_right">已拼100</p>
        <div class="bottom_div">
          <span>￥78 门市价120元</span>
          <span style="background:#67AFFB color:#FFFFFF">8.4折</span>
        </div>
      </li>-->
      <p style="text-align: right;padding:5px;" v-show="goods_voucher_list.length>0">查看更多></p>
    </ul>
    <!-- 套餐 -->
    <div class="meau">
      <h3>套餐详情</h3>
      <ul class="order_div">
        <li v-for="(item,i) in goods_package_list" :key="i">
          <img :src="item.cover_image" />
          <div style="height:72px;width:250px;text-align:left;">
            <div class="top_title">
              <span>{{item.goods_title}}</span>
              <span class="btns" v-show="item.pink_status==1">去参团</span>
              <span class="btns" v-show="item.pink_status==0">去抢购</span>
            </div>
            <p class="p_size" style="padding:0">{{item.goods_subtitle}}</p>
            <p class="p_right" v-show="item.pink_status==1">已拼{{item.pink_sale_amount}}</p>
            <p class="p_right" v-show="item.pink_status==0">月售{{item.sale_amount}}</p>
            <div class="bottom_div" style="padding:0">
              <!-- <span style="background:#67AFFB color:#FFFFFF">8.4折</span> -->
              <span v-show="item.pink_status==1">2人团 ￥{{item.pink_price}}</span>
              <span>单买价 ￥{{item.sale_price}}</span>
              <span v-show="item.pink_status==0">门市价{{item.market_price}}元</span>
            </div>
          </div>
        </li>
        <p style="text-align: right;padding:5px;" v-show="goods_voucher_list.length>0">查看更多></p>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { get, post, getQueryString } from "@/axios/http.js";
export default {
  data() {
    return {
      obj: {},
      goods_voucher_list: [],
      disconut: "",
      goods_package_list: []
    };
  },
  components: {
    NavBar
  },
  created() {
    this.goodsDetail();
  },
  methods: {
    goodsDetail() {
      get("/mini", {
        method: "/GroupShop/shopDetail",
        shop_id: getQueryString("id")
      }).then(res => {
        this.goods_detail = res.data.goods_detail;
        this.goods_detail_image = res.data.goods_detail_image;
        console.log(res.data);
        this.obj = res.data;
        this.goods_package_list = res.data.goods_package_list;
        this.goods_voucher_list = res.data.goods_voucher_list;
        // if(data.data.goods_comment.goods_comment_data.length)
        this.goods_comment_data = res.data.goods_comment.goods_comment_data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.businessdetails {
  background: rgba(248, 248, 248, 1);
  box-sizing: border-box;
  padding: 20px;
  .shop_bg_image {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 750px;
    height: 320px;
    img {
      width: 750px;
      height: 320px;
    }
  }
  .top_div {
    margin-top: 320px;
    .merchant_item {
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      width: 100%;
      margin-bottom: 50px;
      background: rgba(255, 255, 255, 1);
    }
    .merchant_item:last-child {
      margin-bottom: 0;
    }
    .merchant_item img {
      width: 100px;
      height: 100px;
      // background: #999;
      border-radius: 8px;
      margin-right: 20px;
    }
    .right_div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: left;
      flex: 1;
      min-width: 0;
      .van-ellipsis {
        position: relative;
        height: 44px;
        font-size: 30px;
        margin-bottom: 20px;
        .img {
          position: absolute;
          top: 0px;
          right: 0px;
          width: 32px;
          height: 32px;
        }
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
      right: 14px;
      top: -5px;
      width: 40px;
      height: 40px;
      background: url(../assets/r_img/icon_dianhua.png) no-repeat;
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
  .are_div {
    width: 100%;
    height: 120px;
    border-top: 1px solid rgba(241, 236, 236, 1);
    text-align: left;
    box-sizing: border-box;
    span {
      padding-left: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: block;
      background: rgba(255, 255, 255, 1);
      height: 34px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 34px;
      height: 48px;
      color: rgba(102, 102, 102, 1);
      // margin-left: 20px;
    }
  }
  .top_lan {
    background: #fff;
    // margin-top: 14px;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    li {
      flex: 1;
      margin-left: 40px;
      width: 200px;
      height: 100px;
      line-height: 100px;
      font-size: 0.3rem;
      &:first-child {
        border-bottom: 3px solid #f95d5d;
      }
    }
  }
  .order_div {
    width: 670px;
    // height: 100%;

    li {
      height: 182px;
      flex: 1;
      // background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
      margin-top: 15px;
      position: relative;
      .top_title {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        span:nth-child(1) {
          width: 176px;
          height: 42px;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: bold;
          line-height: 42px;
          color: rgba(51, 51, 51, 1);
        }
        .btns {
          font-size: 24px;
          width: 108px;
          height: 44px;
          background: rgba(225, 26, 26, 1);
          border-radius: 26px;
          line-height: 44px;
          text-align: center;
          color: rgba(255, 255, 255, 1);
        }
      }
      .p_size {
        padding: 0 10px;
        width: 450px;
        height: 32px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 32px;
        color: rgba(102, 102, 102, 1);
      }
      .p_right {
        position: absolute;
        top: 110px;
        right: 20px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 32px;
        color: rgba(153, 153, 153, 1);
      }
      .bottom_div {
        text-align: left;
        padding: 20px;
        position: absolute;
        top: 70px;
        span {
          height: 34px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 34px;
          color: rgba(225, 26, 26, 1);
          margin-right: 20px;
        }
      }
    }
    p {
      // width: 196px;
      height: 34px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 34px;
      color: rgba(153, 153, 153, 1);
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
    }
  }
  .meau {
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-shadow: 0 0 0 0;
      .top_title {
        padding: 0;
      }
    }
    img {
      width: 144px;
      height: 144px;
      border-radius: 4px;
      background: #ccc;
      margin-right: 20px;
    }
    h3 {
      text-align: left;
      padding: 20px 20px 0 00px;
      box-sizing: border-box;
      font-size: 32px;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
