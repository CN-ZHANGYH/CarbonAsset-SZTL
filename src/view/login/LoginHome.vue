<template>
   <div class="LoginHome">
      <div class="topBox">
        <div class="bg"></div>
        <div class="box">
          <img src="../../assets/font.png" class="font">
          <div class="driver"></div>
          <div class="loginButton">
            <a href="#" class="btn" @click="goToLogin">
              LOGIN IN
              <span>
                  <n-icon>
                    <arrow-icon />
                  </n-icon>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div class="rightBottom">
        <div class="bg"></div>
        <div class="object"></div>
     </div>

     <div class="leftBottom">
       <div class="carousel">
         <n-carousel
             prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
             next-slide-style="transform: translateX(50%) translateZ(-800px);"
             autoplay>
           <img
               class="carousel-img"
               src="../../assets/img/img.png"
           >
           <img
               class="carousel-img"
               src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
           >
         </n-carousel>
       </div>
     </div>

     <div class="topTitle">
       <h2>
         数字碳链 Digital Carbon Chain
       </h2>
       <h3>
         致力于构建可靠、安全、高效的数字碳链平台，提供企业碳排放数据的准确性和可信度。平台支持碳核算、积分奖励和交易等内容，帮助企业和个人减少碳排放，
         促进数字碳资产等流通并推动数字交易的新玩法。平台适用于各类企业和监督机构，能够实现碳排放数据的自动化记录、碳核算、积分奖励和交易等功能，推动绿色低碳发展
       </h3>
     </div>

   </div>
</template>

<script lang="ts">
import { ArrowForward as ArrowIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ArrowIcon
  },
  methods:{
    goToLogin(){
      this.$router.push('/Login')
    }
  }
})
</script>

<style scoped lang="less">
@import "../../assets/css/btn";

.LoginHome {
  position: relative;
  height: 100vh;
}

.topBox {
  .bg {
    width: 1000px;
    height: 1000px;
    background-image: url("../../assets/shape.png");
    background-repeat: no-repeat;
    position: absolute;
    top: -25%;
    left: -6%;
    animation-name: slideDown;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
  .box {
    .font {
      position: absolute;
      top: 70px;
      left: 50px;
    }
    .driver {
      position: absolute;
      left:6%;
      top: 24%;
      width: 250px;
      height: 4px;
      opacity: 0.5;
      background: #FFFFFF;
    }
    .button {
      position: absolute;
      left:6%;
      top: 28%;
      font-size: 64px;
      opacity: 0.5;
      color: #FFFFFF;
      font-weight: 600;
      letter-spacing: 0px;
      .n-icon {
        font-size: 64px;
        margin-left: 40px;
      }
    }
  }
}

.rightBottom {
  width: 680px;
  height: 450px;
  position: absolute;
  //background: pink;
  right: 0;
  bottom: 0;
  .bg {
    width: 690px;
    height: 280px;
    background-image: url("../../assets/shapebottom.png");
    background-repeat: no-repeat;
    position: absolute;
    overflow: hidden;
    right: 0;
    bottom: 0;
  }
  .object {
    background-image: url("../../assets/object.png");
    background-repeat: no-repeat;
    position: absolute;
    width: 460px;
    height: 380px;
    right: 0;
    top: 12%;
  }
}

.leftBottom{
  position:absolute;
  bottom: 4%;
  left: 10%;
  width: 54%;
  height: 54%;
  border-radius: 20px;
  .carousel {
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 20px;
    .carousel-img {
      border-radius: 20px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.topTitle {
  position: absolute;
  top: 10%;
  right: 2%;
  width: 900px;
  height: 200px;
  text-align: center;
  h2 {
    font-size: 40px;
    margin-bottom: 2%;
  }
}


.btn {
  animation-name: btnDown;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes btnDown {
  0% { top: 150%; }
  100% { top: 0%; }
}

@keyframes slideDown {
  0% { top: -100%; }
}

.leftBottom {
  animation-name: leftBottom;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes leftBottom {
  from { left: -100%; }
  to { left: 10%; }
}
</style>
