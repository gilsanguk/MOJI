<template>
<div>
  <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif">
  <h1 class="error-text">Whoops, We can't seem to find the resource you're looking for.</h1>
<p class="text">Please check that the Web site address is spelled correctly.Or,</p>
<div class="btn1">
<a class="error" @click.prevent="goToHome">Go to Homepage</a>
</div>

</div>
</template>

<script>
export default {
  name: 'PageNotFound',
  methods: {
    goToHome () {
      this.$router.push({ name: 'MoviesView' })
    }
  }
}
</script>

<style scoped>
*{padding:0;margin:0;background:#000000;}
img{display: block;
  margin-left: auto;
  margin-right: auto;}
.btn1{text-align:center;}
.text{text-align:center;font-size:20px;margin-bottom:40px;}
.error-text{text-align:center;padding:20px;  font-family: Cursive;}
.error{font-family: 'Roboto', sans-serif;font-size:1.5rem;text-decoration:none;padding:15px;background:#6200ee;color:#fff;border-radius:10px;}
</style>