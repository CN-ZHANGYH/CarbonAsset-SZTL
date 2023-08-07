<template>
    <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        size="medium"
        label-placement="left"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="24" label="企业名称" path="name">
          <span>珠海市区块链有限公司</span>
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="企业地址:" path="address">
          <span>0x7cf53f4db904ef5b8b21c940af7b5a335a134892</span>
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="注册时间" path="datetimeValue">
          <span>2023-4-08 23:15:20</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="联系人" path="PeopleName">
          <span>丁总</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="联系人手机号" path="PeoplePhone">
          <span>1378888888</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="邮箱" path="PeopleEmail">
          <span>1378888888@163.com</span>
        </n-form-item-gi>

        <n-form-item-gi :span="8" label="企业认证状态" path="PeopleEmail">
          <n-tag type="success">成功</n-tag>
        </n-form-item-gi>
      </n-grid>
    </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst, FormItemRule, useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    return {
      formRef,
      size: ref('medium'),
      model: ref({
        name: null,
        QuaName: null,
        PeopleName: null,
        PeoplePhone:null,
        PeopleEmail:null,
        datetimeValue: null
      }),
      rules: {
        name: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入企业名称'
        },
        datetimeValue: {
          type: 'number',
          required: true,
          trigger: ['blur', 'change'],
          message: '请输入企业注册时间'
        },
        QuaName: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入资质名称'
        },
        PeopleName: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系人姓名'
        },
        PeoplePhone: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系方式'
        },
        PeopleEmail: {
          required: true,
          trigger: ['blur', 'input'],
          message: '请输入联系人邮箱'
        },
      },
    }
  }
})
</script>
