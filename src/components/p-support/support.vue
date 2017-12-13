<template>
  <div class="service wrap">
    <div class="service-banner">
      <img src="/static/images/news-banner.jpg" alt="">
    </div>
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
                <td><textarea name="name" rows="4" v-model="form.message"></textarea></td>
              </tr>
              <!-- topic -->
              <tr>
                <td>Topic</td>
                <td>
                  <select v-model="form.topic">
                    <option disabled value="">Please select</option>
                    <option v-for="item in topicOption">{{item.value}}</option>
                  </select>
                </td>
              </tr>
              <!-- Salutation -->
              <tr>
                <td>Salutation</td>
                <td>
                  <input
                    v-for="(item, index) in salutation"
                    type="radio"
                    :id="'salutation' + index"
                    :value="item.value"
                    v-model="form.salutation"
                  >
                  <label v-for="(item, index) in salutation" :for="'salutation' + index">
                    <span class="icon" :class="[form.salutation == item.value ? 'icon-square_check_fill' : 'icon-square']"></span>{{item.value}}
                  </label>

                </td>
              </tr>
              <!-- First name -->
              <tr>
                <td><span class="icon-nessisary"></span>First name</td>
                <td><input type="text" name="" v-model="form.fisrtName"></td>
              </tr>
              <!-- Last name -->
              <tr>
                <td><span class="icon-nessisary"></span>Last name</td>
                <td><input type="text" name="" v-model="form.lastName"></td>
              </tr>
              <!-- Email -->
              <tr>
                <td><span class="icon-nessisary"></span>E-Mail</td>
                <td><input type="text" name="" v-model="form.email"></td>
              </tr>
              <!-- tel -->
              <tr>
                <td>Tel/Phone</td>
                <td><input type="text" name="" v-model="form.tel"></td>
              </tr>
              <!-- Company -->
              <tr>
                <td>Company</td>
                <td><input type="text" name="" v-model="form.company"></td>
              </tr>
              <!-- Country -->
              <tr>
                <td>Country</td>
                <td>
                  <select v-model="form.country">
                    <option disabled value="">Please select</option>
                    <option v-for="item in country">{{item[1]}}</option>
                  </select>
                </td>
              </tr>
              <!-- Address -->
              <tr>
                <td class="vertical-top">Address</td>
                <td><textarea name="name" rows="3" v-model="form.address"></textarea></td>
              </tr>
              <!-- submit -->
              <tr>
                <td></td>
                <td><button type="button" class="button">SUBMIT</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from 'components/tools/global'
export default {
  data() {
    return {
      form: {
        topic: '',
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
      topicOption: [
        {value: 'Phoenixcontrols Precision Airflow Controls'},
        {value: 'Third Party Purchasing Services'},
        {value: 'Dräger Gas Detectors'},
        {value: 'Aircuity Critical Indoor Environmental Monitoring'}
      ],
      salutation: [
        {value: 'DR'},
        {value: 'MR'},
        {value: 'MRS'},
        {value: 'MS'}
      ],
      country: global.country
    }
  },
  created() {

  },
  components: {
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
</style>
