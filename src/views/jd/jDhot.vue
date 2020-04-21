
<template>
  <!-- 24小时最热榜单  -->
  <div class="jDhot">
    <NavBar />
    <div class="top">
      <img :src="cover_img" />
    </div>
    <div class="content">
      <div class="con">
        <div class="title">
          <span>排序根据销量、搜索热度、好评等综合计算得出</span>
        </div>
        <div class="goods">
          <div class="goodsList" v-for="(item,i) in goodsList" :key="i">
            <img :src="item.goods_image" />
            <div class="goodinfo">
              <h2>{{item.goods_title}}</h2>
              <p class="info" v-show="item.goods_subtitle">{{item.goods_subtitle}}</p>
              <p class="discount" v-show="item.discount">{{item.discount}}折</p>
              <p class="price">
                <span class="span1">￥{{item.discount_price}}</span>
                <span>￥{{item.sale_price}}</span>
              </p>
              <!-- <p class="pay">1230人付款</p> -->
              <div class="btn">立即抢 ></div>
            </div>
          </div>
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
      cover_img: "",
      goodsList: []
    };
  },
  created() {
    this.getjDhot();
  },
  methods: {
    getjDhot() {
      get("/mini", {
        method: "/JdIndex/hotGoodsRank",
        page: 1,
        size: 8
      }).then(res => {
        this.cover_img = res.data.cover_img;
        this.goodsList = res.data.list;
        res.data.list.map(item => {
          if (item.discount) {
            item.discount = (item.discount * 10).toFixed(1);
          } else {
            item.discount = "";
          }
        });
        console.log(res.data, "热销");
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.jDhot {
  .top {
    width: 750px;
    height: 244px;
    img {
      width: 750px;
      height: 244px;
    }
  }
  .content {
    // z-index: 2;
    position: relative;
    width: 750px;
    background: rgba(243, 243, 243, 1);
    .con {
      padding: 0 36px 30px 36px;
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: -60px;
      transform: translateX(-50%);
      width: 694px;
      // min-height: 800px;
      background: #fff;
      border-radius: 20px;
      .title {
        height: 94px;
        // width: 694px;
        color: #333;
        display: flex;
        align-items: center;
        h2 {
          font-size: 32px;
          margin-right: 68px;
        }
        span {
          font-size: 28px;
        }
      }
      .goodsList {
        height: 228px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        img {
          width: 228px;
          height: 212px;
          border-radius: 12px;
          background: #ccc;
          margin-right: 14px;
        }
        .goodinfo {
          position: relative;
          width: 400px;
          height: 204px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          h2 {
            width: 334px;
            height: 42px;
            font-size: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 18px;
          }
          .info {
            width: 200px;
            height: 28px;
            background: rgba(238, 238, 238, 1);
            border: 0px solid rgba(204, 204, 204, 1);
            border-radius: 3px;
            font-size: 20px;
            line-height: 28px;
            color: #999999;
            margin-bottom: 25px;
          }
          .discount {
            width: 100px;
            height: 32px;
            border: 2px solid rgba(255, 54, 54, 1);
            border-radius: 20px;
            color: rgba(255, 54, 54, 1);
            line-height: 32px;
            font-size: 24px;
            text-align: center;
            margin-bottom: 25px;
            margin-left: 10px;
          }
          .price {
            text-align: left;
            margin-bottom: 25px;
            span {
              &:nth-child(1) {
                color: #e11a1a;
                font-size: 32px;
                margin-right: 10px;
              }
              &:nth-child(2) {
                color: #666666;
                font-size: 26px;
                text-decoration: line-through; //删除线
              }
            }
          }
          .pay {
            text-align: left;
            font-size: 24px;
            color: rgba(102, 102, 102, 1);
          }
          .btn {
            position: absolute;
            right: -20px;
            bottom: 18px;
            width: 134px;
            height: 40px;
            background: rgba(251, 201, 8, 1);
            font-size: 24px;
            color: #333;
            text-align: center;
            border-radius: 20px;
            font-family: PingFang SC;
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>