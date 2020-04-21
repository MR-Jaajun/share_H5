<!--
 * @Author: your name
 * @Date: 2019-11-06 17:12:21
 * @LastEditTime: 2019-11-08 16:29:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xiaoge2_share_web\src\views\cooperation\merchant.vue
 -->
<template>
  <!-- 商家入驻 -->
  <div class="merchant">
    <div class="imgs">
      <img src="../../assets/banner2.png" />
    </div>
    <div class="content">
      <h3>只要您是开店营业的商家，都可以免费入驻小哥商城</h3>
      <div class="equity">
        <p>您将享有以下的收益及好处：</p>
        <ul style="margin-bottom:14px">
          <li>1、引荐其他商家入驻平台，可获利；</li>
          <li>2、分享会员，享有30%的平台分润；</li>
          <li>3、您在平台里不仅是商家，还可以是引荐人，会员以及代理等多重身份。角色随时互换，相当于跨界收益，不再单单依靠买卖进行赚钱；</li>
          <li>4、平台抽点最低为1%，低于同等平台的点数；</li>
          <li>5、小哥商城的所有分润奖励，全部即时结算，不占用现金流，无需担心资金安全；</li>
          <li>6、除了获取收益之外，通过平台可以帮您的店铺做精准引流与推广。</li>
        </ul>
      </div>
      <div class="forms">
        <p>
          <span>联系人</span>
          <input v-model="name" @focus="changes" @blur="changes2" placeholder="请输入您的姓名" />
        </p>
        <p>
          <span>手机号</span>
          <input v-model="mobile" @focus="changes" @blur="changes2" placeholder="请输入您的手机号" />
        </p>
      </div>
    </div>
    <div class="submit">
      <span>
        *填写以上信息，三个工作日内获得反馈，想了解更多
        详细信息请下载小哥骑手APP
      </span>
      <!-- <mt-button type="primary" size="normal" @click="submit">提 交</mt-button> -->
      <p class="btn" @click="submit">提 交</p>
    </div>
    <!-- btn -->
    <div class="download" @click="download" :style="{position:posi?'static':'fixed'}">下载小哥开店宝，立即开店</div>
  </div>
</template>

<script>
import { get, post, getQueryString } from "@/axios/http.js";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { Button } from "mint-ui";
export default {
  data() {
    return {
      name: "",
      mobile: "",
      isShowLayer: false,
      url: "",
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
      if (this.name && this.mobile) {
        MessageBox.confirm("您确定提交资料?").then(action => {
          post("/mini", {
            method: "/Common/cooperationPost",
            cooperation_type: 2,
            contacts: this.name,
            contact_information: this.mobile
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
    },
    //下载开店宝
    download() {
      get("/mini", {
        method: "/Common/updateCheck",
        app_type: 2
      }).then(data => {
        console.log(data.data.url);
        if (data.data.url) {
          this.url = data.data.app_url; // console.log(data);
          if (/MicroMessenger/gi.test(navigator.userAgent)) {
            this.isShowLayer = true; // 是微信浏览器，引导用户在浏览器中打开
          } else {
            window.location.href = this.url;
          }
        } else {
          MessageBox("提示", "请去应用商店下载最新版本");
        }
      });
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
.merchant {
  background: #fafafa;
  padding: 16px 20px;
  text-align: left;
}
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
  // height: 100%;
  background: #fff;
  border-radius: 8px;
  h3 {
    font-size: 28px;
    font-weight: bold;
    //   line-height: 21px;
    line-height: 40px;
    color: rgba(51, 51, 51, 1);
    margin: 0px 0 12px 0;
    letter-spacing: 1px;
  }
  .equity {
    p {
      font-size: 28px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 20px;
      letter-spacing: 1px;
    }
    li {
      font-size: 24px;
      line-height: 42px;
      color: #666;
      letter-spacing: 1px;
    }
    span {
      font-size: 22px;
      line-height: 34px;
      color: #666;
      letter-spacing: 1px;
    }
  }
  .forms {
    //   width: 710px;
    //   padding: 20px;
    //   box-sizing: border-box;
    margin-top: 44px;
    p {
      padding: 0 5px;
      height: 120px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      margin-bottom: 26px;
      span {
        font-family: PingFang SC;
        font-size: 28px;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
      }
      input {
        font-size: 26px;
        width: 100%;
        // padding-left: 20px;
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
.submit {
  height: 62px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 62px;
  span {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34px;
    color: rgba(153, 153, 153, 1);
    letter-spacing: 1px;
  }
  .btn {
    margin-left: 20px;
    width: 200px;
    height: 58px;
    text-align: center;
    line-height: 58px;
    font-size: 28px;
    background: rgba(64, 147, 238, 1);
    color: #fff;
    border-radius: 4px;
  }
}
.download {
  width: 100%;
  height: 76px;
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
  letter-spacing: 2px;
  // opacity: 1;
}
</style>