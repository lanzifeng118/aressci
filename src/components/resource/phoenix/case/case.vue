<template>
  <div class="resource-case">
    <div class="resource-position position">
      <span class="icon-location_fill icon"></span>
      <router-link to="/">Home</router-link>
      <span class="icon-right"></span>
      <router-link to="/resource">Resource</router-link>
      <span class="icon-right"></span>
      <router-link to="/resource/phoenix">Phoenix</router-link>
      <span class="icon-right"></span>
      <span>Case Study</span>
    </div>
    <div class="resource-case-form">
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

</style>
