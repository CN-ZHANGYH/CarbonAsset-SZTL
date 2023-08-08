<template>
  <h3 style="margin-bottom: 20px">登录信息</h3>
  <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      size="medium"
      label-placement="left"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="24" label="用户名登录:" path="name">
        <span>珠海市区块链有限公司</span>
      </n-form-item-gi>

      <n-form-item-gi :span="24">
        <n-button>忘记密码</n-button>
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="输入您的新密码" path="address">
        <n-input type="password" autosize style="min-width: 50%"/>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="再次输入新密码" path="datetimeValue">
        <n-input type="password" autosize style="min-width: 50%"/>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'


export default defineComponent({
  setup () {

    return {

    }
  }
})
</script>
