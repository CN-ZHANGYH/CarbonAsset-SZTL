<template>
  <div class="container" :class="{ 'sign-up-mode': isSignUpMode }">
    <div class="forms-container">
      <div class="sign-in-signup">
        <n-form class="sign-in-form" :model="form">
          <h2 class="title">登录</h2>
          <div class="input-field">
            <svg class="fas fa-username" aria-hidden="true">
              <use xlink:href="#v-icon-yonghu"></use>
            </svg>
            <input type="text" placeholder="用户名" v-model="form.username">
          </div>
          <div class="input-field">
            <svg class="fas fa-password" aria-hidden="true">
              <use xlink:href="#v-icon-mima"></use>
            </svg>
            <input placeholder="密码" v-model="form.password" :type="showPassword ? 'text' : 'password'">
            <img src="../../assets/img/show.png" class="eyes" v-if="!showPassword" @click="toggleShowPassword">
            <img src="../../assets/img/hide.png" class="eyes" v-else @click="toggleShowPassword">
          </div>
          <div class="input-field code" style="background: #fff">
            <div class="box left_box">
              <input type="text" placeholder="验证码" style="height: 55px;padding-left: 30px" v-model="form.code">
            </div>
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img"/>
            </div>
          </div>
          <input type="submit" value="登录" class="btn solid" @click="handleLoginSubmit">
        </n-form>

<!--    注册    -->
        <form action="" class="sign-up-form">
          <h2 class="title">注册</h2>

          <div class="input-field">
            <svg class="fas fa-username" aria-hidden="true">
              <use xlink:href="#v-icon-yonghu"></use>
            </svg>
            <input type="text" placeholder="公司" v-model="company">
          </div>

          <div class="input-field">
            <svg class="fas fa-password" aria-hidden="true">
              <use xlink:href="#v-icon-yonghu"></use>
            </svg>
            <input type="text" placeholder="用户" v-model="username">
          </div>

          <div class="input-field">
            <svg class="fas fa-email" aria-hidden="true">
              <use xlink:href="#v-icon-mail"></use>
            </svg>
            <input type="text" placeholder="邮箱" v-model="email">
          </div>

          <div class="input-field">
            <svg class="fas fa-password" aria-hidden="true">
              <use xlink:href="#v-icon-mima"></use>
            </svg>
            <input type="password" placeholder="密码" v-model="password">
          </div>

          <div class="input-field code" style="background: #fff">
            <div class="box left_box">
              <input type="text" placeholder="验证码" style="height: 55px;padding-left: 30px">
            </div>
            <div class="box right_box"></div>
          </div>
          <input type="submit" value="注册" class="btn solid" @click="handleRegisterSubmit">
        </form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>前往注册</h3>
          <p>如果您之前没有注册过，请直接前往注册界面进行注册</p>
          <button class="btn transparent" id="sign-up-btn" @click="toggleSignUpMode">
            注册
          </button>
        </div>
      </div>

      <div class="panel right-panel">
        <div class="content">
          <h3>前往登录</h3>
          <p>如果您已经拥有账号地址，请直接前往登陆界面进行登录</p>
          <button class="btn transparent" id="sign-in-btn" @click="toggleSignUpMode">
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from "../../router/router.js";
import { useMessage } from 'naive-ui';
import {getCodeImg} from "/src/api/login";
import useUserStore from "/src/store/modules/user";
const userStore = useUserStore()

const isSignUpMode = ref(false);
const message = useMessage();

const codeUrl = ref(null)
const formRef = ref(null);
const captchaEnabled = ref(true)
const form = ref({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: ""
});


const toggleSignUpMode = () => {
  isSignUpMode.value = !isSignUpMode.value;
};

const success =  () => {
  message.success(
      "'登录成功"
  )
}

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
    message.success("登录成功")
    router.push("/MasterConsole")
  }).catch(err => {
    console.log(err)
    // 重新获取验证码
    if (captchaEnabled.value) {
      getCode();
    }
  });
}

getCode()

</script>

<style lang="less" scoped>
@import "../../assets/css/login.less";

.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.input-field {
  position: relative;
  .eyes {
    height: 30px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    height: 30px;
  }
}
</style>
