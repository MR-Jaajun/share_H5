<!--
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 10:16:19
 * @LastEditors: Roc
 * @LastEditTime: 2019-11-01 11:08:32
 -->
<template>
  <div>
    <!-- 引入底部栏和遮罩层 -->
    <NavBar />
    <div
      class="box_bg"
      :style="{background:'rgba(250,250,250,1) url('+list.shop_bg_image+') top no-repeat'}"
    >
      <!-- 头部栏 -->
      <div class="top_box">
        <div class="title">{{list.shop_title}}</div>
        <div>
          <span>配送约{{list.delivery_estimated_time}}分钟</span>
          <span>评分:{{list.composite_evaluate_score}}</span>
          <span>月售:{{list.month_sale_amount}}</span>
        </div>
        <div>公告:各位亲们,有问题请及时联系我们商家</div>
        <ul class="manjian">
          <li v-for="item of couponsList" :key="item.id">{{item.coupon_title}}</li>
        </ul>
      </div>
      <ul class="top_lan">
        <li>点餐</li>
        <li>评价</li>
        <li>商家</li>
      </ul>

      <div class="middle_box">
        <ul class="left_box">
          <li v-for="item of proList" :key="item.id">{{item.title}}</li>
        </ul>
        <ul class="right_box">
          <!-- <li class="title">热销</li>  -->
          <li v-for="item of prolistone" :key="item.id">
            <img :src="item.cover_image" alt />
            <div>
              <div class="toptxt">{{item.goods_title}}</div>
              <div class="middletxt">月销{{item.month_sale_amount}} 赞{{item.like_amount}}</div>
              <div class="fl_cen">
                <span class="price">￥{{item.sale_price}}</span>
                <div class="guige">选规格</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { get, post, getQueryString } from '@/axios/http.js'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      list: '',//店铺详情
      proList: '',//商品总列表，左侧列表
      couponsList: '',//优惠券列表
      prolistone: '',//第一个(下标为1)类型的商品列表
    }
  },
  created() {
    this.getList()
    this.getProList()
  },
  mounted() {
  },
  methods: {
    getList() {
      get('/mini', {
        method: "/TakeoutShop/shopDetail",
        shop_id: getQueryString('id')||10078
      }).then(data => {
        this.list = data.data.shop_info
        this.couponsList = this.list.takeout_shop_coupons
        // console.log(this.list)
      })
    },
    getProList() {
      get('/mini', {
        method: "/TakeoutShop/getGoodsByCate",
        shop_id: getQueryString('id')||10078
      }).then(data => {
        this.proList = data.data
        this.prolistone = this.proList[0].category_goods
      })
    },
  }
};
</script>
<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
}
.box_bg {
  // background: url(../assets/jianbian.png) top no-repeat;
  background-size: contain;
  font-size: 24px;
  width: 100%;
  // height: 100%;
  padding-top: 160px;
  .top_box {
    min-height: 212px;
    background: #fff;
    border-radius: 0.1rem;
    margin: 0px 20px 0 20px;
    padding: 20px;
    text-align: left;
    div,
    ul {
      padding: 8px 0;
      li {
        margin-top: 20px;
        margin-right: 10px;
        border: 1px solid #f95d5d;
        border-radius: 10px;
        color: #f95d5d;
        padding: 4px;
      }
      span {
        margin-right: 20px;
      }
    }
    .title {
      font-weight: bold;
      font-size: 32px;
    }
    .manjian {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
    }
  }
  .top_lan {
    background: #fff;
    margin-top: 14px;
    display: flex;
    // padding: 0 40px;
    border-bottom: 1px solid #ccc;
    li {
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
  .middle_box {
    display: flex;
    height: 100%;
    .left_box {
      width: 178px;
      li {
        height: 74px;
        line-height: 74px;
        &:first-child {
          background: #fff;
        }
      }
    }
    .right_box {
      padding-left: 24px;
      padding-top: 24px;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background: #fff;
      text-align: left;
      .title {
        font-weight: bold;
        height: 74px;
        line-height: 74px;
        margin: 0;
      }

      .toptxt {
        font-size: 28px;
        margin-bottom: 20px;
        font-weight: bold;
      }
      .middletxt {
        margin-bottom: 50px;
        color: #888;
      }
      li {
        display: flex;
        margin-bottom: 40px;
        img {
          width: 186px;
          height: 186px;
          background: #999;
          border-radius: 4px;
          margin-right: 20px;
        }
        .price {
          font-size: 28px;
          color: #f95d5d;
        }
      }

      .guige {
        background: #8dc3fc;
        border-radius: 23px;
        width: 108px;
        text-align: center;
        height: 46px;
        line-height: 46px;
        color: #fff;
        margin-left: 160px;
      }
    }
  }
}
</style>
