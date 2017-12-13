<template>
  <div class="resource-ask">
    <div class="resource-position position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">Home</router-link>
      <span class="icon-right"></span>
      <router-link to="/resource">Resource</router-link>
      <span class="icon-right"></span>
      <span>Ask The Expert</span>
    </div>
    <div class="resource-ask-form">
      <h2>For questions on Phoenix Controls products or systems just fill out the following form and one of our experts will get back to you with an answer!</h2>
      <div class="form-table-wrap resource-table-wrap">
        <table>
          <tbody>
            <!-- First name -->
            <tr>
              <td><span class="icon-nessisary"></span>First name</td>
              <td><input type="text" name="" v-model="form.fisrtName"></td>
            </tr>
            <!-- Last name -->
            <tr>
              <td>Last name</td>
              <td><input type="text" name="" v-model="form.lastName"></td>
            </tr>
            <!-- Job Title -->
            <tr>
              <td><span class="icon-nessisary"></span>Job Title</td>
              <td>
                <select v-model="form.job">
                  <option disabled value="">Please select</option>
                  <option>Architect</option>
                  <option>Builder</option>
                  <option>Consulting Engineer</option>
                  <option>Other</option>
                </select>
              </td>
            </tr>
            <!-- Company -->
            <tr>
              <td>Company</td>
              <td><input type="text" name="" v-model="form.company"></td>
            </tr>
            <!-- Industry -->
            <tr>
              <td><span class="icon-nessisary"></span>Industry</td>
              <td>
                <select v-model="form.industry">
                  <option disabled value="">Please select</option>
                  <option>Academic (University/College)</option>
                  <option>Government</option>
                  <option>Healthcare</option>
                  <option>Petrochemical</option>
                </select>
              </td>
            </tr>
            <!-- Email -->
            <tr>
              <td><span class="icon-nessisary"></span>E-Mail</td>
              <td><input type="text" name="" v-model="form.email"></td>
            </tr>
            <!-- Questions -->
            <tr>
              <td width="150" class="vertical-top">Questions</td>
              <td><textarea name="name" rows="4" v-model="form.questions"></textarea></td>
            </tr>
            <tr>
              <td></td>
              <td><button type="button" class="button">SUBMIT</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        topic: '',
        salutation: '',
        job: '',
        questions: '',
        firstName: '',
        lastName: '',
        company: '',
        industry: '',
        tel: '',
        email: ''
      }
    }
  }
}
</script>

<style>
.resource-ask-form {
  width: 800px;
  margin: 0 auto 20px auto;
}
.resource-ask-form h2 {
  color: #999;
  background: #f9f9f9;
  line-height: 1.5em;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
