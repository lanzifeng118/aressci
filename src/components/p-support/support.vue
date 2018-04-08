<template>
  <div class="service wrap">
    <banner-in page="support"></banner-in>
    <div class="service-content">
      <position page="index"></position>
      <div class="service-text">
        <h2>{{lang === 'cn' ? '技术服务' : 'Technical Services'}}</h2>
        <h4>{{lang === 'cn' ? '感谢您对我们关注，我们希望为您提供优秀的服务!' : 'We appreciate your business and want to provide outstanding and excellent customer service!'}}</h4>
        <h4>{{lang === 'cn' ? '请填写下面的表格，带有*是必填项，我们将尽快回复您。' : 'Please complete the form below. The boxes marked with * are required. We will respond as soon as possible.'}}</h4>
        <div class="form-table-wrap service-table-wrap">
          <table>
            <tbody>
              <!-- message -->
              <tr>
                <td v-if="lang === 'cn'" width="70" class="vertical-top">留言</td>
                <td v-else width="150" class="vertical-top">Your message to us</td>
                <td><textarea name="name" rows="4" v-model.trim="item.message"></textarea></td>
              </tr>
              <!-- classify -->
              <tr>
                <td>{{lang === 'cn' ? '主题' : 'Topic'}}</td>
                <td>
                  <select v-model.trim="item.classify">
                    <option disabled value="">{{lang === 'cn' ? '请选择' : 'Please select'}}</option>
                    <option v-for="item in classifyOption">{{item.name}}</option>
                  </select>
                </td>
              </tr>
              <!-- Salutation -->
              <tr>
                <td>{{lang === 'cn' ? '称呼' : 'Salutation'}}</td>
                <td>
                  <input
                    v-for="(itemS, index) in salutation"
                    type="radio"
                    :id="'salutation' + index"
                    :value="itemS.value"
                    v-model.trim="item.salutation"
                  >
                  <label v-for="(itemS, index) in salutation" :for="'salutation' + index">
                    <span class="icon" :class="[item.salutation == itemS.value ? 'icon-square_check_fill' : 'icon-square']"></span>{{itemS.value}}
                  </label>
                </td>
              </tr>
              <!-- first name -->
              <tr>
                <td><span class="icon-nessisary"></span>{{lang === 'cn' ? '姓名' : 'First Name'}}</td>
                <td><input type="text" v-model.trim="item.firstName"></td>
              </tr>
              <!-- Last name -->
              <tr v-if="lang === 'en'">
                <td><span class="icon-nessisary"></span>Last name</td>
                <td><input type="text" v-model.trim="item.lastName"></td>
              </tr>
              <!-- Email -->
              <tr>
                <td><span class="icon-nessisary"></span>{{lang === 'cn' ? '邮箱' : 'Email'}}</td>
                <td><input type="text" v-model.trim="item.email"></td>
              </tr>
              <!-- tel -->
              <tr>
                <td>{{lang === 'cn' ? '电话' : 'Tel/Phone'}}</td>
                <td><input type="text" v-model.trim.number="item.tel"></td>
              </tr>
              <!-- Company -->
              <tr>
                <td>{{lang === 'cn' ? '公司' : 'Company'}}</td>
                <td><input type="text" v-model.trim="item.company"></td>
              </tr>
              <!-- Country -->
              <tr>
                <td>{{lang === 'cn' ? '国家' : 'Country'}}</td>
                <td>
                  <select v-model.trim="item.country">
                    <option disabled value="">{{lang === 'cn' ? '请选择' : 'Please select'}}</option>
                    <option v-for="item in country">{{item[1]}}</option>
                  </select>
                </td>
              </tr>
              <!-- Address -->
              <tr>
                <td class="vertical-top">{{lang === 'cn' ? '地址' : 'Address'}}</td>
                <td><textarea name="name" rows="3" v-model.trim="item.address"></textarea></td>
              </tr>
              <!-- submit -->
              <tr>
                <td></td>
                <td>
                  <p class="service-warn">{{warnText}}</p>
                  <button type="button" class="button" @click="submit">{{lang === 'cn' ? '提交' : 'Submit'}}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <toast
      v-show="toast.show"
      :text="toast.text"
      :icon="toast.icon"
    >
    </toast>
  </div>
</template>

<script>
import util from 'components/tools/util'
import toast from 'components/toast/toast'
import global from 'components/tools/global'
import bannerIn from 'components/c-banner-in/banner-in'
import position from 'components/p-support/position/position'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      item: {
        classify: '',
        salutation: '',
        country: '',
        message: '',
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        tel: '',
        email: ''
      },
      classifyOption: [],
      warnText: '',
      // toast
      toast: {
        show: false,
        text: '',
        icon: ''
      }
    }
  },
  computed: {
    country() {
      return this.lang === 'cn' ? global.country : global.countryEn
    },
    salutation() {
      let salutation = [
        {value: '先生'},
        {value: '女士'}
      ]
      let salutationEn = [
        {value: 'DR'},
        {value: 'MR'},
        {value: 'MRS'},
        {value: 'MS'}
      ]
      return this.lang === 'cn' ? salutation : salutationEn
    },
    ...mapGetters(['lang', 'api'])
  },
  created() {
    this.item.country = this.lang === 'cn' ? '中国' : 'China'
    this.item.classify = util.parseUrl(this.$route.fullPath).topic || ''
    this.getClassify()
  },
  methods: {
    getClassify() {
      this.axios(this.api.supportClassify.query()).then((res) => {
        let data = res.data
        if (data.code === '200') {
          this.classifyOption = data.data.list
        }
      })
    },
    submit() {
      if (!this.verify()) {
        return
      }
      this.axios(this.api.support.insert(this.item)).then((res) => {
        let data = res.data
        if (data.code === '200') {
          let text = this.lang === 'cn' ? '提交成功!' : 'Success!'
          util.toast.fade(this.toast, text, 'appreciate')
          this.item = {
            classify: '',
            salutation: '',
            country: this.lang === 'cn' ? '中国' : 'China',
            message: '',
            firstName: '',
            lastName: '',
            company: '',
            address: '',
            tel: '',
            email: ''
          }
        } else {
          util.req.changeError(this.toast)
        }
      })
    },
    verify() {
      let item = this.item
      if (!item.firstName) {
        this.warnText = this.lang === 'cn' ? '姓名不能为空' : 'First name can\'t be empty.'
        return false
      }
      if (this.lang === 'en' && !item.lastName.trim()) {
        this.warnText = `Last name can't be empty.`
        return false
      }
      if (!item.email) {
        this.warnText = this.lang === 'cn' ? '邮箱不能为空' : 'Email can\'t be empty.'
        return false
      }
      this.warnText = ``
      return true
    }
  },
  components: {
    bannerIn,
    toast,
    position
  }
}
</script>

<style>
.service {
  margin-top: 10px;
}
.service-banner {
  margin-bottom: 12px;
}
.service-content {
  position: relative;
  margin-bottom: 20px;
}
.service-text {
  padding: 20px;
  margin: 15px 0;
}
.service-text h2 {
  font-size: 16px;
  text-align: center;
  color: #0d93b8;
  margin-bottom: 15px;
}
.service-text h4 {
  text-align: center;
  color: #666;
  margin-bottom: 10px;
}
.service-table-wrap {
  width: 700px;
  padding: 10px 20px;
  margin: 15px auto 0 auto;
}
.service-warn {
  color: #FF0C07;
  margin-bottom: 10px;
}
</style>
