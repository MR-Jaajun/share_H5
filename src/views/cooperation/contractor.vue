<!--
 * @Author: your name
 * @Date: 2019-11-06 17:11:44
 * @LastEditTime: 2019-11-08 16:35:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xiaoge2_share_web\src\views\cooperation\agent.vue
 -->
<template>
  <!-- 骑手承包商 -->
  <div class="contractor">
    <div class="imgs">
      <img src="../../assets/banner3.png" />
    </div>
    <div class="content">
      <h3>平台特色</h3>
      <div class="equity">
        <p>
          以区域为单位承包。
          <br />平台骑手分为专职与兼职两种，有外送与跑腿服务。
          <br />成为骑手承包人的好处：
        </p>
        <ul style="margin-bottom:14px">
          <li>1、您将享有区域骑手所送订单收益</li>
          <li>2、引荐商家、分享会员，享有收益</li>
          <li>3、跟着平台一起成长，享受平台各种收益</li>
        </ul>
      </div>
      <!-- concats -->
      <div class="concats">联系我们</div>
      <!-- 表单 -->
      <div class="forms">
        <p>
          <span>姓名</span>
          <input v-model="name" @focus="changes" @blur="changes2" placeholder="请输入姓名" />
        </p>
        <p>
          <span>手机号</span>
          <input v-model="mobile" @focus="changes" @blur="changes2" placeholder="请输入手机号" />
        </p>
        <p>
          <span>省份</span>
          <input v-model="pro" @focus="changes" @blur="changes2" placeholder="请输入省份" />
        </p>
        <p>
          <span>代理区域</span>
          <input v-model="area" @focus="changes" @blur="changes2" placeholder="请输入代理区域" />
        </p>
      </div>
    </div>
    <!-- btn -->
    <div class="btn" @click="submit" :style="{position:posi?'static':'fixed'}">立即提交，成为合伙人</div>
  </div>
</template>

<script>
import { get, post, getQueryString } from "@/axios/http.js";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      name: "",
      mobile: "",
      pro: "",
      area: "",
      posi: false,
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight //实时屏幕高度
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.posi = true;
      } else {
        this.posi = false;
      }
    }
  },
  methods: {
    //失去焦点
    changes2() {
      this.posi = false;
    },
    //聚焦
    changes() {
      this.posi = true;
    },
    //提交 /api/Common/cooperationPost
    submit() {
      if (this.name && this.mobile && this.pro && this.area) {
        MessageBox.confirm("您确定提交资料?").then(action => {
          post("/mini", {
            method: "/Common/cooperationPost",
            cooperation_type: 4,
            contacts: this.name,
            contact_information: this.mobile,
            province: this.pro,
            area: this.area
          }).then(res => {
            console.log(res);
            if (res.status == 1) {
              Toast(res.msg);
            } else {
              Toast(res.msg);
            }
          });
        });
      } else {
        Toast("您还有资料为填写");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-style: normal;
}
.contractor {
  background: #fafafa;
  padding: 16px 20px;
  text-align: left;

  .imgs {
    width: 710;
    height: 240px;
    img {
      width: 710;
      height: 240px;
    }
  }
  .content {
    margin-top: 20px;
    width: 710px;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 76px;
    // height: 100%;
    background: #fff;
    border-radius: 8px;

    h2 {
      font-weight: bold;
      line-height: 34px;
      color: #333333;
      font-size: 24px;
      letter-spacing: 1px;
    }
    h3 {
      font-size: 32px;
      font-weight: bold;
      //   line-height: 21px;
      color: rgba(51, 51, 51, 1);
      margin: 0 0 12px 0;
      letter-spacing: 1px;
    }
    .equity {
      p {
        font-size: 28px;
        font-weight: bold;
        color: #666;
        line-height: 40px;
        margin-bottom: 20px;
        letter-spacing: 1px;
      }
      li {
        font-size: 26px;
        line-height: 42px;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 1px;
        font-weight: bold;
      }
      span {
        font-size: 22px;
        line-height: 34px;
        color: #666;
        letter-spacing: 1px;
        i {
          color: #ff0404;
          letter-spacing: 1px;
        }
      }
    }
    .concats {
      text-align: center;
      margin: 40px auto 40px auto;
      color: #fff;
      font-size: 28px;
      line-height: 64px;
      width: 414px;
      height: 64px;
      background: linear-gradient(
        94deg,
        rgba(63, 73, 80, 1) 0%,
        rgba(44, 52, 56, 1) 100%
      );
      box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.05);
      border-radius: 66px;
    }
    .forms {
      //   width: 710px;
      //   padding: 20px;
      //   box-sizing: border-box;
      p {
        padding: 0 5px;
        height: 80px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        span {
          font-size: 28px;
          color: rgba(51, 51, 51, 1);
        }
        input {
          font-size: 26px;
          width: 520px;
          padding-left: 20px;
          height: 78px;
          //   outline: none;
          border-bottom: 2px solid #f1ebeb;
          border-top: 0;
          border-left: 0;
          border-right: 0;
        }
      }
    }
  }
  .btn {
    width: 100%;
    height: 76px;
    // margin-bottom: 76px;
    font-size: 28px;
    text-align: center;
    line-height: 76px;
    background: linear-gradient(
      243deg,
      rgba(44, 52, 57, 1) 0%,
      rgba(63, 73, 80, 1) 100%
    );
    color: #fff;
    // position: fixed;
    bottom: 0;
    left: 0;
    letter-spacing: 1px;
    // opacity: 1;
  }
}
</style>