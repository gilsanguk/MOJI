<template>
<div id="bgdiv">
  <div id="notfounddiv">
    <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" id="imgdiv" alt="">
    <div id="updiv">
      <h1 class="error-text">잘모....ㅅ된 ㅍㅔ...ㅇ...ㅈㅣ....</h1>
      <span class="text">요청하신 페이지를 찾을 수 없습니다.</span>
      <br>
      <span class="text">This is not the web page you are looking for</span>
      <div class="btn1">
        <a class="error" @click.prevent="goToHome">홈페이지로 돌아가기</a>
      </div>
    </div>
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
#bgdiv {
  background-color: rgba(240, 240, 240);
  height: 1000px;
  opacity: 0.8;
}

#notfounddiv {
  position: relative; 
  display: flex;
  align-items: center;
  justify-content: center;
}

#imgdiv {
  width: 100%;  
  height: 100%;
  left: 0;  
  right: 0;  
  top: 0;  
  bottom: 0;  
  margin: auto;  
  overflow: auto;
}

#updiv {
  position: absolute;
}

.btn1{
  margin-top: 1rem;
  text-align:center;
  cursor: pointer;
}

.error-text{
  text-align:center;
  font-size:60px;
  font-weight: bolder;
  margin-bottom: 1rem;
  font-family: 'Black And White Picture', sans-serif;
  color: rgb(206, 202, 202);
}

.text{
  text-align:center;
  font-size:20px;
  font-family: 'Black And White Picture', sans-serif;
  color: rgb(206, 202, 202);
}


.error{
  background-color: rgba(255, 255, 255, 0.274);
  font-family: 'Roboto', sans-serif;
  font-size:1.5rem;
  text-decoration:none;
  background:#ff8223;
  color:#FFFFFF;
  font-size: 30px;
  padding: 1rem 2rem;
  border-radius:10px;
  font-family: 'Nanum Pen Script', cursive;
}
</style>