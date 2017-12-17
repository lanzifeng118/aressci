<template>
  <div class="service wrap">
    <banner-in page="support"></banner-in>
    <div class="service-content">
      <div class="position">
        <span class="icon-location_fill icon"></span>
        <router-link to="/">Home</router-link>
        <span class="icon-right"></span>
        Servive & Support
      </div>
      <div class="service-text">
        <h2>Technical Services</h2>
        <h4>We appreciate your business and want to provide outstanding and excellent customer service!</h4>
        <h4>Please complete the form below. The boxes marked with * are required. We will respond as soon as possible.</h4>
        <div class="form-table-wrap service-table-wrap">
          <table>
            <tbody>
              <!-- message -->
              <tr>
                <td width="150" class="vertical-top">Your message to us</td>
                <td><textarea name="name" rows="4" v-model="item.message"></textarea></td>
              </tr>
              <!-- classify -->
              <tr>
                <td>Topic</td>
                <td>
                  <select v-model="item.classify">
                    <option disabled value="">Please select</option>
                    <option v-for="item in classifyOption">{{item.name}}</option>
                  </select>
                </td>
              </tr>
              <!-- Salutation -->
              <tr>
                <td>Salutation</td>
                <td>
                  <input
                    v-for="(itemS, index) in salutation"
                    type="radio"
                    :id="'salutation' + index"
                    :value="itemS.value"
                    v-model="item.salutation"
                  >
                  <label v-for="(itemS, index) in salutation" :for="'salutation' + index">
                    <span class="icon" :class="[item.salutation == itemS.value ? 'icon-square_check_fill' : 'icon-square']"></span>{{itemS.value}}
                  </label>

                </td>
              </tr>
              <!-- First name -->
              <tr>
                <td><span class="icon-nessisary"></span>First name</td>
                <td><input type="text" v-model="item.firstName"></td>
              </tr>
              <!-- Last name -->
              <tr>
                <td><span class="icon-nessisary"></span>Last name</td>
                <td><input type="text" v-model="item.lastName"></td>
              </tr>
              <!-- Email -->
              <tr>
                <td><span class="icon-nessisary"></span>E-Mail</td>
                <td><input type="text" v-model="item.email"></td>
              </tr>
              <!-- tel -->
              <tr>
                <td>Tel/Phone</td>
                <td><input type="text" v-model="item.tel"></td>
              </tr>
              <!-- Company -->
              <tr>
                <td>Company</td>
                <td><input type="text" v-model="item.company"></td>
              </tr>
              <!-- Country -->
              <tr>
                <td>Country</td>
                <td>
                  <select v-model="item.country">
                    <option disabled value="">Please select</option>
                    <option v-for="item in country">{{item[1]}}</option>
                  </select>
                </td>
              </tr>
              <!-- Address -->
              <tr>
                <td class="vertical-top">Address</td>
                <td><textarea name="name" rows="3" v-model="item.address"></textarea></td>
              </tr>
              <!-- submit -->
              <tr>
                <td></td>
                <td>
                  <p class="service-warn">{{warnText}}</p>
                  <button type="button" class="button" @click="submit">SUBMIT</button>
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
import api from 'components/tools/api'
import util from 'components/tools/util'
import toast from 'components/toast/toast'
import global from 'components/tools/global'
import bannerIn from 'components/c-banner-in/banner-in'

export default {
  data() {
    return {
      item: {
        classify: '',
        salutation: '',
        country: 'China',
        message: '',
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        tel: '',
        email: ''
      },
      classifyOption: [],
      salutation: [
        {value: 'DR'},
        {value: 'MR'},
        {value: 'MRS'},
        {value: 'MS'}
      ],
      country: global.country,
      warnText: '',
      // toast
      toast: {
        show: false,
        text: '',
        icon: ''
      }
    }
  },
  created() {
    this.getClassify()
  },
  methods: {
    getClassify() {
      this.axios(api.supportClassify.query()).then((res) => {
        let data = res.data
        console.log(data)
        if (data.code === '200') {
          this.classifyOption = data.data.list
        }
      })
    },
    submit() {
      if (!this.verify()) {
        return
      }
      this.axios(api.support.insert(this.item)).then((res) => {
        let data = res.data
        if (data.code === '200') {
          util.toast.fade(this.toast, 'Success!', 'appreciate')
          this.item = {
            classify: '',
            salutation: '',
            country: 'China',
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
      if (!item.firstName.trim()) {
        this.warnText = `First name can't be empty.`
        return false
      }
      if (!item.lastName.trim()) {
        this.warnText = `Last name can't be empty.`
        return false
      }
      if (!item.email.trim()) {
        this.warnText = `Email can't be empty.`
        return false
      }
      this.warnText = ``
      return true
    }
  },
  components: {
    bannerIn,
    toast
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
  margin-bottom: 20px;
}
.service-text {
  border-top: 1px solid #efefef;
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
