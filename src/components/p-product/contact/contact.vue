<template>
  <div class="product-contact">
    <h3>Contact Us</h3>
    <ul>
      <li>
        Our emai is <b>{{item.email}}</b>. You can <a :href="'mailto:?' + item.email + '&subject=Here is a web page you might be interested in seeing&body=Hello'">
          Click Here
        </a> to send an emai to us handily!
      </li>
      <li><h4>Our phone number is <b>{{item.telephone}}</b>. You can call us during work time ({{item.worktime}}).</h4></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    item() {
      return this.$store.state.basicInfo
    }
  }
}
</script>

<style>
/*product-contact*/
.product-contact {
  width: 254px;
  height: 205px;
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #96d8ea;
}
.product-contact h3 {
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}
.product-contact li {
  position: relative;
  display: block;
  color: #666;
  padding: 0 0 3px 12px;
  line-height: 1.5em;
}

.product-contact li::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #ccc;
  top: 7px;
  left: 0px;
}
.product-contact b {
  font-weight: bold;
  color: #0d93b8;
}
.product-contact a {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  display: inline-block;
}
.product-contact a:hover {
  color: #0d93b8;
}
</style>
