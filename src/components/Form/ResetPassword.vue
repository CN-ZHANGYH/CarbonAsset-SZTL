<template>
  <h3 style="margin-bottom: 20px">登录信息</h3>
  <n-form
      ref="formRef"
      :model="forgetPass"
      :rules="rules"
      size="medium"
      label-placement="left"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="24" label="用户名登录:" path="name">
        <span>{{enterprise.user_name}}</span>
      </n-form-item-gi>

      <n-form-item-gi :span="24">
        <n-button type="error" @click="updatePassword">重置密码</n-button>
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="输入您的新密码" path="firstPassword">
        <n-input type="password" autosize style="min-width: 50%" placeholder="请输入新的密码" v-model:value="forgetPass.firstPassword"/>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="再次输入新密码" path="secondPassword" >
        <n-input type="password" autosize style="min-width: 50%" placeholder="请再次输入新的密码"  v-model:value="forgetPass.secondPassword"/>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup>
import {updateUserPassword} from "../../api/enterprise.js";

const props = defineProps({
    enterprise: Object
})
const {enterprise} = toRefs(props)
const forgetPass = ref({})


const rules = reactive({
    firstPassword: {
        required: true,
        trigger: ['blur','input'],
        message: "请输入第一次密码"
    },
    secondPassword: {
        required: true,
        trigger: ['blur','input'],
        message: "请输入第二次确认密码"
    }
})

function updatePassword(){
    forgetPass.value.enterpriseName = enterprise.value.enterprise_name
    updateUserPassword(forgetPass.value).then(res => {
        window.$message.success(res.msg)
    })
}

</script>
