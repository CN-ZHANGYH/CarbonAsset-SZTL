<template>
  <div class="Loginbox">
    <div class="left">
      <div class="bg"></div>
      <img src="../../assets/font.png" class="font">
      <div class="loginButton">
        <a href="#" class="btn" @click="GoLoginHome">
          BACK UP
          <span>
              <n-icon>
                  <arrow-icon />
              </n-icon>
          </span>
        </a>
      </div>
      <div class="box">
        <div class="square" style="--x: 9;"></div>
        <div class="square" style="--x: 8;"></div>
        <div class="square" style="--x: 6;"></div>
        <div class="square" style="--x: 4;"></div>
        <div class="square" style="--x: 2;"></div>
        <div class="square" style=""></div>
        <div class="square" style="--x: 6;"></div>
        <div class="square" style="--x: 4;"></div>
      </div>
    </div>
    <div class="right">
      <LoginModel v-if="showFlag.loginModel" @goRegisterHandle="goRegisterHandle"/>
      <RegisterModel v-if="showFlag.forgetModel" @returnLoginHandle="returnLoginHandle"/>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowForward as ArrowIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'
import LoginModel from "./components/LoginModel.vue";
import RegisterModel from "./components/RegisterModel.vue"
import { ref } from 'vue'

export default defineComponent({
  components: {
    RegisterModel,
    LoginModel,
    ArrowIcon
  },
  data() {
    return {
      showFlag: {
        loginModel: true,
        forgetModel: false
      }
    }
  },
  methods: {
    GoLoginHome(){
      this.$router.push('/')
    },
    goRegisterHandle() {
      this.showFlag.loginModel = false
      this.showFlag.forgetModel = true
    },
    returnLoginHandle() {
      this.showFlag.loginModel = true
      this.showFlag.forgetModel = false
    }
  }
})
</script>


<style lang="less" scoped>
@import "../../assets/css/btn";
@import "../../assets/css/square";
.Loginbox {
  display: flex;
  justify-content: space-between;
}
.bg {
  width: 1200px;
  height: 1000px;
  background-image: url("../../assets/shape.png");
  background-repeat: no-repeat;
  position: absolute;
  top: -10%;
  left: -5%;
  animation-name: slideDown;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.font {
  position: absolute;
  top: 18%;
  left: 4%;
}

.loginButton {
  position: absolute;
  top: 34%;
  left: 7%;
}

.btn {
  animation-name: btnDown;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes slideDown {
  0% { top: -100%; }
  100% { top: -10%; }
}
@keyframes btnDown {
  0% { top: 100%; }
  100% { top: 0%; }
}
</style>

