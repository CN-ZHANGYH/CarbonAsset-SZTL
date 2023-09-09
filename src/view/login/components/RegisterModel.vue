<template>
  <div>
    <div class="sign-in-signup">
      <n-form  class="sign-in-form" :model="registerForm">
        <h2 class="title">注册</h2>

        <div class="input-field">
          <svg class="fas fa-username" aria-hidden="true">
            <use xlink:href="#v-icon-yonghu"></use>
          </svg>
          <input type="text" placeholder="公司" v-model="registerForm.company">
        </div>

        <div class="input-field">
          <svg class="fas fa-password" aria-hidden="true">
            <use xlink:href="#v-icon-yonghu"></use>
          </svg>
          <input type="text" placeholder="用户" v-model="registerForm.username">
        </div>

        <div class="input-field">
          <svg class="fas fa-email" aria-hidden="true">
            <use xlink:href="#v-icon-mail"></use>
          </svg>
          <input type="text" placeholder="邮箱" v-model="registerForm.email">
        </div>

        <div class="input-field">
          <svg class="fas fa-password" aria-hidden="true">
            <use xlink:href="#v-icon-mima"></use>
          </svg>
          <input type="password" placeholder="密码" v-model="registerForm.password">
        </div>

        <div class="input-field code" style="background: #fff">
          <div class="box left_box">
            <input type="text" placeholder="验证码" style="height: 55px;padding-left: 30px" v-model="registerForm.code">
          </div>
          <n-button style="margin-top: 3px;height: 50px" round type="success" strong  @click="sendCode" size="large"  :disabled="closeBtn">{{ buttonText }}</n-button>
        </div>
        <div>
          <n-button class="btn solid custom-animation" strong @click="handleRegisterSubmit"><h3>注册</h3></n-button>
          <n-button class="btn solid custom-animation" strong @click="this.$emit('returnLoginHandle')"><h3>返回</h3></n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import router from "../../../router/router.js";
import {getCodeImg, sendEmailCode,register} from "/src/api/login";
import useUserStore from "/src/store/modules/user";
import {getEnterpriseInfoToLogin} from "../../../api/enterprise.js";
const userStore = useUserStore()
const buttonText = ref('发送验证码');
const countdown = ref(60);
const isSignUpMode = ref(false);

const codeUrl = ref(null)
const closeBtn = ref(false)
const captchaEnabled = ref(true)
const form = ref({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: ""
});


const registerForm = ref({
  username: "",
  company: "",
  password: "",
  email: "",
  code: ""
})


const toggleSignUpMode = () => {
  isSignUpMode.value = !isSignUpMode.value;
};

// 显示隐藏
const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
  const passwordInput = document.querySelector('input[type="password"]');
  if (passwordInput) {
    if (showPassword.value) {
      passwordInput.setAttribute('type', 'text');
    } else {
      passwordInput.setAttribute('type', 'password');
    }
  }
};

function getCode() {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = res.img;  // "data:image/gif;base64," +
      form.value.uuid = res.uuid;
    }
  });
}
function handleLoginSubmit() {
  // 调用action的登录方法
  userStore.login(form.value).then(res => {
    getEnterpriseInfoToLogin({username: form.value.username}).then(res => {
      localStorage.setItem("user",JSON.stringify(res.data))
      router.push("/PersonalHome/MasterConsole")
      window.$message.success("登录成功")
    })
  }).catch(err => {
    // 重新获取验证码
    if (captchaEnabled.value) {
      getCode();
    }
  });
}

function sendCode(){
  if (registerForm.value.email == ""){
    return window.$message.error("邮箱不能为空")
  }
  sendEmailCode({email: registerForm.value.email}).then(res => {
    window.$message.success(res.msg)
  }).catch(() => {
    window.$message.error("发送验证码失败")
  })
  // 开始倒计时
  let timer = setInterval(() => {
    closeBtn.value = true
    countdown.value--;

    // 更新按钮显示的文本
    buttonText.value = `${countdown.value}s`;

    // 倒计时结束时恢复按钮状态
    if (countdown.value === 0) {
      clearInterval(timer);
      buttonText.value = '发送验证码';
      countdown.value = 60;
      closeBtn.value = false
    }
  }, 1000);
}

function handleRegisterSubmit(){
  register(registerForm.value).then(() => {
    window.$message.success("注册成功")
    router.push("/PersonalHome/MasterConsole")
  }).catch(() => {
    window.$message.error("注册失败")
  })
}

function handleBack(){
  this.$emit('back');
}

getCode()
</script>

<style scoped lang='less'>
@import "../../../assets/css/login.less";

.sign-in-signup {
  animation-name: btnDown;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes btnDown {
  0% {
    transform: translateX(100%);
  }
}
</style>
