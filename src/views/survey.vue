<template>
  <div class="box">
    <header class="head">兜宝小哥外卖封签满意度调研</header>
    <section>
      <form action>
        <div class="oneItem" v-for="(item,index) of list" :key="index">
          <template v-if="item.type==1">
            <p class="titleTxt">
              {{item.problem_title}}
              <span>*</span>
            </p>
            <mt-radio v-model="item.answer_id" :options="item.problem_option"></mt-radio>
            <mt-field
              v-if="item.answer_id>1"
              v-model="item.answer_title"
              placeholder="请输入"
              type="text"
            ></mt-field>
          </template>
          <!-- 多行文本 -->
          <template v-if="item.type == 4">
            <p class="titleTxt">
              {{item.problem_title}}
              <span v-if="item.is_required == 1">*</span>
            </p> 
            <mt-field v-model="item.answer_title" placeholder="请填写" type="textarea" rows="4"></mt-field>
          </template>
          <!-- 单行文本 -->
          <template v-if="item.type == 3">
            <p class="titleTxt">
              {{item.problem_title}}1
              <span>*</span>
            </p>
            <mt-field class="test" v-model="item.answer_title" placeholder="请输入" type="text"></mt-field>
          </template>
        </div>
      </form>
      <div class="setBtn">
        <mt-button type="primary" size="large" @click="onSubmit()">提交</mt-button>
      </div>
    </section>
    <footer>兜宝小哥提供技术支持</footer>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import { get, post, getQueryString } from "@/axios/http.js";
import { Radio, Field, Button, Toast } from 'mint-ui';
import { log } from 'util';
export default {
  data() {
    return {
      list: [], //商品详情
      /**问卷id */
      research_volume_id: '',
    };
  },
  components: {
    NavBar,
    'mt-radio': Radio,
    'mt-field': Field,
    'mt-button': Button
  },
  created() {
    this.getList();
  },
  mounted() { },
  methods: {
    getList() {
      get("/mini", {
        method: "/Common/researchVolumeInfo",
        type: 1,
      }).then(data => {
        this.research_volume_id = data.data.research_volume_id
        this.list = data.data.problem_list;
        for (let item of this.list) {
          for (let i of item.problem_option) {
            i.isChecked = false
            i['label'] = i['answer_title']
            i['value'] = i['id'].toString()
          }
        }
      });
    },

    onSubmit() {
      let research_volume_data = []
      for (let i in this.list) {
        research_volume_data[i] = {}
        // obj.problem_id = this.list[i].id
        // obj.answer_id = this.list[i].answer_id|| ''
        // obj.answer_title = this.list[i].answer_title || ''
        // research_volume_data.push(obj)
        research_volume_data[i].problem_id = this.list[i].id
        research_volume_data[i].answer_id = this.list[i].answer_id || ''
        research_volume_data[i].answer_title = this.list[i].answer_title || ''
      }
      let isPast = false
      for (let item of research_volume_data) {
        if (item.answer_id == '' && item.answer_title == '') {
          isPast = true
        }
      }

      // if (isPast) {
      //   Toast({ message: '请填写完整', duration: 2000 });
      // } else {
      post("/mini", {
        method: "/Common/researchVolumePost",
        research_volume_id: this.research_volume_id,
        research_volume_data: JSON.stringify(research_volume_data)
      }).then(data => {
        Toast({ message: '提交成功', iconClass: 'icon icon-success' });
      });
      // }
    },
  }
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  header {
    height: 100px;
    line-height: 100px;
    background: #fdc806;
    font-size: 32px;
  }
  section {
    background: #fff;
    text-align: left;
    .oneItem {
      margin-top: 30px;
      .titleTxt {
        font-size: 30px;
        color: #000;
        padding-left: 20px;
        span {
          color: red;
        }
      }
    }

    .setBtn {
      padding: 50px 30px;
    }
  }
  footer {
    margin: 30px 0;
  }
}
</style>
<style lang="scss">
.box {
  .mint-radiolist-title {
    font-size: 30px;
    color: #000;
  }
  .mint-radio-label {
    font-size: 28px;
  }
  .mint-button--primary {
    font-family: "微软雅黑";
    // font-weight: bold;
    color: #000;
    background-color: #fdc806;
  }
  .mint-field-core {
    background: #eee;
    padding: 10px 10px;
    margin-top: 4px;
    border-radius: 8px;
  }
}
</style>