<template>
  <div class="login_bg">
    <section class="login">
      <div class="top"></div>
      <div class="middle"></div>
      <div class="list userNameBox">
        <input
          type="text"
          placeholder="请输入正确的手机号"
          @blur="setScroll"
          v-model="username"
          autocomplete="off"
        />
      </div>

      <div class="list passwordBox">
        <input
          type="text"
          placeholder="请输入验证码"
          @blur="setScroll"
          v-model="password"
          autocomplete="off"
        />

        <span v-if="ishui" class="huitxt">{{second}}秒后重试</span>
        <span @click="getCode" v-else>获取验证码</span>
      </div>
      <div class="btnBox">
        <button class="loginBtn" @click="logBtn">登录</button>
        <div class="btnbg"></div>
      </div>
      <div class="bottomTxt">未注册手机验证后直接登录下载</div>
      <!-- 底部文字 -->
      <div class="bottom"></div>
    </section>

    <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2009;">
      <div class="mint-msgbox" v-show="isShow">
        <div class="mint-msgbox-header">
          <div class="mint-msgbox-title">请输入图形验证码</div>
        </div>
        <div class="mint-msgbox-content">
          <div class="list imgcode">
            <input
              type="text"
              placeholder="请输入"
              @blur="setScroll"
              v-model="img_code_byuser"
              autocomplete="off"
              maxlength="10"
            />
            <img @click="getImgCode" :src="img_code" alt />
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel" @click="isShow=false">取消</button>
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="okGetCode">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let timeSetInterval;
import { Toast, MessageBox } from "mint-ui";
import { get, post, getQueryString } from "@/axios/http.js";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "", //验证码
      new_custom: 1, //1新用户，0旧用户
      code: "", //邀请码,
      ishui: false,

      second: 60,
      img_code: "",
      img_code_byuser: "",
      key: "",
      isShow: false
    };
  },
  components: {},
  created() {
    this.code = localStorage.getItem("code");
    if (!this.code) Toast({ message: "没有邀请码", duration: 2000 });
    console.log("登录页获取到的code", this.code);

    // this.getImgCode()
    // this.getList();
  },
  mounted() {},
  watch: {},
  methods: {
    // getList() {
    //   get("/mini", {
    //     method: "JdShop/goodsDetail",
    //     goods_id: 526
    //   }).then(data => {
    //     console.log(data,'京东商品详情');
    //   });
    // },
    getImgCode() {
      post("/mini", {
        method: "/Common/getVerifcode "
      }).then(res => {
        this.key = res.data.key;
        this.img_code = "data:image/png;base64," + res.data.image;
      });
    },

    setScroll() {
      window.scrollTo(0, 0);
    },

    // 绑定上级
    logBtn() {
      // if (this.new_custom == 1) {
      post("/mini", {
        method: "/Login/loginSms",
        mobile: this.username,
        verify: this.password,
        is_merchant: 0 //客户端类型（0用户端1商户端2骑手端）
      })
        .then(data => {
          localStorage.setItem("token", data.data.token);
          return post("/mini", {
            method: "/Login/bindSuperior",
            superior_code: this.code //邀请码
          });
        })
        .then(data => {
          // if (!data.code) {//成功绑定或者已绑定上级
          //1上级不存在，2已绑定上级,3绑定成功,4验证码不正确
          this.$router.push({ path: "./download" });
          // }
          // else {//邀请码不存在
          // }
        })
        .catch(data => {
          if (data.data.msg == "对不起，你已经绑定上级了") {
            this.$router.push({ path: "./download" });
          }
        });
      // }
      // else {
      //   Toast({ message: '您是老用户了' });
      //   this.$router.push({ path: "./download" });
      // }
    },
    // 手机验证码注册登录，获取token
    getCode() {
      if (this.username === "") {
        Toast({ message: "请输入手机号", duration: 2000 });
      } else {
        this.getImgCode();
        this.isShow = true;
      }
    },
    okGetCode() {
      let strCode = this.img_code_byuser.replace(/\s*/g, "");
      // console.log(strCode);
      if (strCode) {
        post("/mini", {
          method: "/Common/sendSms",
          mobile: this.username,
          send_id: 10001,
          code_key: this.key,
          code: strCode
        }).then(data => {
          this.isShow = false;
          timeSetInterval = setInterval(() => {
            this.second--;
            // console.log(this.second)
            if (!this.second) {
              this.ishui = false;
              this.second = 60;
              clearInterval(timeSetInterval);
            }
          }, 1000);
          this.ishui = true;
          Toast({ message: data.msg, duration: 2000 });
        });
      } else {
        Toast({ message: "图形验证码不能为空", duration: 2000 });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.list {
  margin: 0 auto;
  width: 558px;
  height: 68px;
  display: flex;
  justify-content: space-between;
  input {
    font: normal 24px "微软雅黑";
    border: 0;
    height: 68px;
    background: rgba(248, 248, 248, 1);
    opacity: 1;
    border-radius: 66px;
    text-align: center;
    box-shadow: 4px 8px rgba(222, 243, 255, 0.2);
  }
}
.imgcode {
  margin: 32px auto;
  justify-content: center;
  input {
    width: 50%;
  }
  img {
    background: #999;
    width: 35%;
  }
}
.userNameBox {
  input {
    width: 558px;
  }
}
.passwordBox {
  margin: 32px auto 54px;
  input {
    width: 358px;
  }
  span {
    width: 170px;
    @include line-height(68px, 68px);
    font-size: 24px;
    color: rgba(244, 239, 239, 1);
    background: linear-gradient(
      180deg,
      rgba(82, 184, 247, 1) 0%,
      rgba(112, 131, 249, 1) 31%,
      rgba(178, 13, 252, 1) 100%
    );
    box-shadow: 4px 8px rgba(222, 243, 255, 0.2);
    border-radius: 18px;
    &.huitxt {
      color: #ccc;
    }
  }
}
.login_bg {
  background: #9609cc;
}
.login {
  height: 1406px;
  background: url("~assets/login-bg.png") no-repeat top center;
  background-size: 100%;
  padding-top: 52px;
  .top {
    background: url("~assets/login-top.png") no-repeat top center;
    background-size: 100%;
    width: 400px;
    height: 228px;
    margin-left: 48px;
  }
  .middle {
    background: url("~assets/login-middle.png") no-repeat top center;
    background-size: 100%;
    width: 575px;
    height: 515px;
    margin: 30px auto;
  }
  .bottom {
    background: url("~assets/login-bottom.png") no-repeat top center;
    background-size: 100%;
    width: 320px;
    height: 90px;
    margin: 30px auto 0 auto;
  }

  .loginBtn {
    width: 558px;
    height: 68px;
    background: linear-gradient(
      180deg,
      rgba(82, 184, 247, 1) 0%,
      rgba(178, 13, 252, 1) 100%
    );
    opacity: 1;
    border-radius: 66px;
    font: normal 24px "微软雅黑";
    border: 0;
    color: rgba(244, 239, 239, 1);
    box-shadow: 6px 8px rgba(222, 243, 255, 0.2);
  }
  .bottomTxt {
    font-size: 20px;
    color: rgba(244, 239, 239, 1);
    margin-top: 24px;
  }
}

// offset-x：必需，取值正负都可。offset-x水平阴影的位置。
// offset-y：必需，取值正负都可。offset-y垂直阴影的位置。
// blur:可选，只能取正值。blur-radius阴影模糊半径，0即无模糊效果，值越大阴影边缘越模糊。
// spread：可选，取值正负都可。spread代表阴影的周长向四周扩展的尺寸，正值，阴影扩大，负值阴影缩小。
// color:可选。阴影的颜色。如果不设置，浏览器会取默认颜色，通常是黑色，但各浏览器默认颜色有差异，建议不要省略。可以是rgb(250,0,0)，也可以是有透明值的rgba(250,0,0,0.5)。
// inset:可选。关键字，将外部投影(默认outset)改为内部投影。inset 阴影在背景之上，内容之下。
</style>
<style lang="scss">
.list {
  margin: 0 auto;
  width: 558px;
  height: 68px;
  display: flex;
  justify-content: space-between;
  input {
    font: normal 24px "微软雅黑";
    border: 0;
    height: 68px;
    background: rgba(248, 248, 248, 1);
    opacity: 1;
    border-radius: 66px;
    text-align: center;
    box-shadow: 4px 8px rgba(222, 243, 255, 0.2);
  }
}
.imgcode {
  margin: 32px auto;
  input {
    width: 358px;
  }
  img {
    background: #ccc;
    width: 40%;
  }
}
</style>