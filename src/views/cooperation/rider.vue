<!--
 * @Author: your name
 * @Date: 2019-11-06 17:12:21
 * @LastEditTime: 2019-11-12 15:16:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xiaoge2_share_web\src\views\cooperation\merchant.vue
 -->
<template>
  <!-- 骑手 -->
  <div class="rider">
    <div class="riders">
      <div class="imgs">
        <img src="../../assets/banner4.png" />
      </div>
      <div class="content">
        <div class="forms">
          <div>
            <span>意向城市</span>
            <input v-model="city" @focus="changes" @blur="changes2" placeholder="请输入您的意向城市" />
          </div>
          <div>
            <span>意向工作类型</span>
            <!-- <input v-model="city" placeholder="请输入您的意向城市" /> -->
            <div class="type">
              <p @click="choose_type" :class="work_type==1?'active':''">
                <span class="span1" :style="{color:work_type==1?'#fff':''}">专职骑手</span>
                <span class="span2" :style="{color:work_type==1?'#fff':''}">自由结单灵活结算</span>
              </p>
              <p @click="choose_type2" :class="work_type==2?'active':''">
                <span class="span1" :style="{color:work_type==2?'#fff':''}">众包骑手</span>
                <span class="span2" :style="{color:work_type==2?'#fff':''}">自由结单灵活结算</span>
              </p>
            </div>
          </div>
          <div style="margin-top:30px;">
            <span>联系人</span>
            <input v-model="name" @focus="changes" @blur="changes2" placeholder="请输入您的姓名" />
          </div>
          <div>
            <span>手机号</span>
            <input v-model="mobile" @focus="changes" @blur="changes2" placeholder="请输入您的手机号" />
          </div>
        </div>
      </div>
      <div class="submit">
        <span>
          *填写以上信息，三个工作日内获得反馈，想了解更多
          详细信息请下载小哥骑手APP
        </span>
        <p class="btn" @click="submit">提 交</p>
      </div>
    </div>
    <!-- btn -->
    <div class="download" @click="download" :style="{position:posi?'static':'fixed'}">下载小哥骑手，立即成为骑手</div>
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
      city: "",
      // province: '广东',
      // area: "黄埔",
      work_type: 1,
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
      console.log(this.showHeight)
    }
  },
  methods: {
    //失去焦点
    changes2() {
      this.posi = false;
      // window.scrollIntoView()
    },
    //聚焦
    changes() {
      this.posi = true;
      // window.scroll(0,this.docmHeight - this.showHeight);
      // this.$refs.scolls.scroll();
    },

    //提交 /api/Common/cooperationPost
    submit() {
      if (this.name && this.mobile && this.city && this.work_type) {
        MessageBox.confirm("您确定提交资料?").then(action => {
          post("/mini", {
            method: "/Common/cooperationPost",
            cooperation_type: 1,
            contacts: this.name,
            contact_information: this.mobile,
            city: this.city,
            work_type: this.work_type
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
    choose_type() {
      this.work_type = 1;
    },
    choose_type2() {
      this.work_type = 2;
    },
    //下载骑手
    download() {
      get("/mini", {
        method: "/Common/updateCheck",
        app_type: 3
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
.rider {
  background: #fafafa;
  // padding: 16px 20px;
  text-align: left;
}
.riders {
  padding: 16px 20px;
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
    // margin-top: 44px;
    & > div {
      padding: 0 5px;
      min-height: 120px;
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
      .type {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .active {
          background: #52a4fe;
          border: none;
        }
        p {
          width: 240px;
          height: 164px;
          background: rgba(255, 255, 255, 1);
          border: 2px solid rgba(153, 153, 153, 1);
          border-radius: 6px;
          margin-right: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          span {
            font-family: PingFang SC;
            letter-spacing: 1px;
            font-weight: 400;
          }
          .span1 {
            font-size: 28px;
            line-height: 38px;
            color: rgba(51, 51, 51, 1);
          }
          .span2 {
            font-size: 24px;
            line-height: 42px;
            color: rgba(102, 102, 102, 1);
          }
        }
      }

      input {
        width: 100%;
        // padding-left: 20px;
        height: 78px;
        //   outline: none;
        border-bottom: 2px solid #f1ebeb;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        font-size: 26px;
      }
    }
  }
}
.submit {
  height: 62px;
  margin-bottom: 62px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  // position: static;
  bottom: 0;
  left: 0;
  letter-spacing: 2px;
  // opacity: 1;
}
</style>