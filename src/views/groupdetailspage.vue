<!--
 * @Author: your name
 * @Date: 2019-10-30 17:27:06
 * @LastEditTime: 2019-11-14 18:46:51
 * @LastEditors: duo
 * @Description: In User Settings Edit
 * @FilePath: \xiaoge2_share_web\src\views\packagedetails.vue
 -->
<template>
  <div class="packagedetails">
    <!-- 引入底部栏和遮罩层 -->
    <NavBar />
    <div class="top">
      <div class="title">
        <p>
          <span class="biao">{{obj.goods_title}}</span>
          <span>随时退、过期自动退</span>
        </p>
        <span class="sale">总销量{{obj.goods_sale_amount}}份</span>
      </div>
      <div class="imgs">
        <img :src="item" v-for="(item,i) in goods_detail_image" :key="i" />
      </div>
    </div>

    <section class="center_div" v-show="obj.goods_pink_status == 1">
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
      </p>
      <div class="merchant_item">
        <img :src="obj.shop_cover_image" />
        <div class="right_div">
          <div class="van-ellipsis">{{obj.shop_title}}</div>
          <div class="smalltxt_line">
            <span class="blue_txt">评分{{obj.shop_evaluate_score}}</span>
          </div>
          <div class="smalltxt_line">
            <span class="blue_txt">{{obj.shop_avg_cost}}/人</span>
            <span class="toright" space="nbsp"></span>
          </div>
          <div class="smalltxt_line txt_marg">
            <span space="nbsp">{{obj.shop_address}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 套餐 -->
    <div class="detail">
      <div class="detail_t">
        <img src="../assets/icon_taocan.png" />
        <span>套餐详情</span>
      </div>
      <div class="dlist" v-for="(item,i) in goods_detail" :key="i">
        <h3>
          <img src="../assets/icon_shuruzhanghao.png" />
          <span>{{item.category_title}}</span>
        </h3>
        <li v-for="(items,idx) in item.data" :key="idx">
          <span>{{items.title}}({{items.num}}{{items.unit}})</span>
          <span class="jiage">¥{{items.price}}</span>
        </li>
      </div>
    </div>
    <!-- 使用规则 -->
    <div class="roule">
      <div class="r_t">
        <h3>使用规则</h3>
        <li>使用期限：{{obj.goods_start_time}}~{{obj.goods_end_time}}</li>
        <li>{{obj.goods_unavailable_time}}</li>
        <li>使用时间：{{obj.goods_available_time}}</li>
        <li>预约情况：{{obj.goods_booking}}</li>
      </div>
      <div class="r_t" v-show="obj.goods_desc">
        <h3>其他规则</h3>
        <li>{{obj.goods_desc}}</li>
      </div>
    </div>
    <!-- 评价 -->
    <div class="rate">
      <h3>套餐评价</h3>
      <div style="text-align:left;margin-top:14px" v-show="goods_comment_data.length==0">暂无用户评价</div>
      <div v-for="(item,i) in goods_comment_data" :key="i" v-show="goods_comment_data.length>0">
        <div class="user">
          <img :src="item.user_avatar" />
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
    <div class="zhanwei"></div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { get, post, getQueryString } from "@/axios/http.js";
// Vue.component(CountDown.name, CountDown);
export default {
  data() {
    return {
      obj: {},
      goods_detail_image: [],
      goods_detail: [],
      goods_comment_data: [],
      pink_list: []
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
        method: "/GroupShop/goodsDetail",
        goods_id: getQueryString("id")
      }).then(res => {
        this.goods_detail = res.data.goods_detail;
        this.goods_detail_image = res.data.goods_detail_image;
        this.obj = res.data;
        this.goods_comment_data = res.data.goods_comment.goods_comment_data;
        this.pink_list = this.obj.goods_pink.pink_list;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
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
  height: 304px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  padding: 20px;
  margin-top: 20px;
  p {
    display: flex;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40px;
    color: rgba(51, 51, 51, 1);
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
    right: 14px;
    top: -20px;
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
.packagedetails {
  padding: 20px;
  width: 710px;
  height: 100%;
  background: #f8f8f8;
  font-size: 32px;
}
.top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 670px;
  padding: 20px;
  height: 272px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
  .title {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      display: flex;
      flex-direction: column;
      text-align: left;
      .biao {
        font-size: 30px;
        line-height: 50px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      span {
        color: #666;
        font-size: 24px;
      }
    }
    .sale {
      font-size: 22px;
      color: #999;
    }
  }
  .imgs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 670px;
    height: 210px;
    img {
      background: #ccc;
      border-radius: 8px;
      width: 200px;
      height: 144px;
      margin-right: 20px;
    }
  }
}
.detail {
  margin-top: 16px;
  width: 670px;
  padding: 20px;
  //   height: 272px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
  .detail_t {
    text-align: left;
    margin-bottom: 26px;
    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    span {
      vertical-align: middle;
      font-size: 30px;
      font-weight: bold;
      color: rgba(48, 146, 249, 1);
    }
  }
  .dlist {
    margin-bottom: 30px;
    h3 {
      display: flex;
      align-items: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 12px;
      color: rgba(51, 51, 51, 1);
      img {
        width: 28px;
        height: 28px;
        margin-right: 8px;
      }
    }
    li {
      height: 54px;
      padding: 0 20px 0 36px;
      //   width: 710px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 28px;
        color: rgba(51, 51, 51, 1);
      }
      .jiage {
        font-size: 28px;
        color: rgba(225, 26, 26, 1);
      }
    }
  }
}
.roule {
  margin-top: 16px;
  padding: 24px 10px 10px 20px;
  width: 710px;
  //   height: 606px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  .r_t {
    text-align: left;
    margin-bottom: 30px;
    h3 {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 12px;
      color: rgba(51, 51, 51, 1);
    }
    li {
      line-height: 40px;
      text-align: left;
      font-size: 24px;
      color: rgba(51, 51, 51, 1);
    }
  }
}
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
.zhanwei {
  height: 130px;
}
</style>
