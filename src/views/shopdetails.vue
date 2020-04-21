<template>
  <div>
    <!-- 引入底部栏和遮罩层 -->
    <NavBar />
    <div
      class="box_bg"
      :style="{background:'rgba(250,250,250,1) url('+info.cover_image+') top no-repeat'}"
    >
      <!-- 头部栏 -->
      <div class="top_box">
        <div class="title">{{info.goods_title}}</div>
        <div class="middleTxt">
          <!-- <span>配送约{{info.goods_shop.delivery_estimated_time}}分钟</span> -->
          <span>评分:{{info.composite_evaluate_score}}</span>
          <span>月售:{{info.month_sale_amount}}</span>
        </div>
        <div class="bottomTxt">
          <span class="redPrice">￥{{info.sale_price}}</span>
          <del class="huaPrice">￥{{info.market_price}}</del>
          <span class="zhe">6.5折</span>
          <span class="flex_txt">限{{goods_info.limit_amount}}份</span>
          <div class="guige">选规格</div>
        </div>

        <div class="protitle">商品详情</div>
        <div class="pro1">{{goods_info.desc}}</div>
        <!-- <div class="pro2">套餐内包含：脆皮鸡+米饭</div> -->
        <div class="pro1">包装费：每份额外在收取￥{{goods_info.packing_price}}</div>
        <div class="fl_cen">
          <div class="guige1">{{goods_shop.delivery_service}}</div>
          <div class="guige2">{{goods_shop.shop_service}}</div>
        </div>

        <!-- <div>公告:各位亲们,有问题请及时联系我们商家</div> -->
        <!-- <ul class="manjian">
          <li v-for="item of couponsList" :key="item.id">{{item.coupon_title}}</li>
        </ul>-->
      </div>

      <div class="bottomView">
        <div class="oneview" v-for="item of goods_likes" :key="item.id">
          <div>
            <img class="toux" src="item.customer_info.avatar" alt />
          </div>
          <div class="right">
            <div class="toptxt">{{item.customer_info.nick_name}}</div>
            <div class="middletxt">
              <img class="zan" src="../assets/icon_sfcsccdf.png" alt />赞了该商品
            </div>
            <div class="middletxt">{{item.like_comment.comment_content}}</div>
            <div class="bottomdiv">
              <img v-for="i of item.like_comment.comment_images" :key="i.id" :src="i.image_path" alt />
            </div>
          </div>
        </div>
        <!-- <div class="oneview">
          <div>
            <img class="toux" src="../assets/icon_sfcsccdf.png" alt />
          </div>
          <div class="right">
            <div class="toptxt">匿名评价/昵称</div>
            <div class="middletxt">
              <img class="zan" src="../assets/icon_sfcsccdf.png" alt />赞了该商品
            </div>
            <div class="middletxt">好吃味道好极了</div>
            <div class="bottomdiv">
              <img src alt />
              <img src alt />
              <img src alt />
            </div>
          </div>
        </div>-->
      </div>

      <!-- <ul class="top_lan">
        <li>点餐</li>
        <li>评价</li>
        <li>商家</li>
      </ul>-->

      <!-- <div class="middle_box">
        <ul class="left_box">
          <li v-for="item of proList" :key="item.id">{{item.title}}</li>
        </ul>
        <ul class="right_box">
          <li class="title">热销</li> 
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
      </div>-->
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
      info: '',//店铺详情
      commentList: '',
      goods_info: '',
      goods_shop: ''
    }
  },
  created() {
    this.getList()
    // this.getComment()
  },
  mounted() {
  },
  methods: {
    getList() {
      get('/mini', {
        method: "/TakeoutShop/getGoodsDetail",
        goods_id: getQueryString('id') || 281
      }).then(data => {
        this.info = data.data
        this.goods_shop = this.info.goods_shop
        this.goods_info = this.info.goods_info
        this.goods_likes = this.info.goods_likes
        console.log(11,this.goods_likes)
      })
    },
    // getComment() {
    //   get('/mini', {
    //     method: "/TakeoutShop/shopComment",
    //     shop_id: getQueryString('id') || 10078,
    //     image_type: 1,
    //     comment_type: 0,
    //   }).then(data => {
    //     this.commentList = data.data
    //   })
    // },
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
  padding-top: 264px;
  .top_box {
    min-height: 212px;
    background: #fff;
    // border-radius: 0.1rem;
    // margin: 0px 20px 0 20px;
    padding: 20px;
    text-align: left;
    div,
    ul {
      // padding: 8px 0;
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
    .middleTxt {
      margin-top: 26px;
    }
    .bottomTxt {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .redPrice {
        font-size: 32px;
        color: #f95d5d;
      }
      .zhe {
        margin: 0 30px;
      }
      .flex_txt {
        flex: 1;
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
    .protitle {
      margin-top: 24px;
      font-size: 28px;
      font-weight: bold;
    }
    .pro1 {
      margin-top: 18px;
    }
    .pro2 {
      margin-top: 28px;
    }
  }
  .top_lan {
    background: #fff;
    // margin-top: 14px;
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
  .guige1 {
    padding: 0 10px;
    margin: 20px 20px 0 0;
    border: 1px solid #999;
    border-radius: 23px;
    text-align: center;
    height: 46px;
    line-height: 46px;
    color: #666;
    width: fit-content;
  }
  .guige2 {
    padding: 0 10px;
    margin: 20px 20px 0 0;
    background: #666;
    border-radius: 23px;
    text-align: center;
    height: 46px;
    line-height: 46px;
    color: #fff;
    width: fit-content;
  }

  .bottomView {
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
            margin-bottom: 15px;
          }
        }
      }
    }
  }
}
</style>
