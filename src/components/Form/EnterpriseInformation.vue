<template>
  <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      size="medium"
      label-placement="top"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="8" label="企业名称" path="name">
        <n-input v-model:value="model.name" placeholder="企业名称" />
      </n-form-item-gi>

      <n-form-item-gi :span="10" label="企业地址" path="address">
        <n-input placeholder="企业地址" />
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="企业注册时间" path="datetimeValue">
        <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="资质名称" path="QuaName">
        <n-input v-model:value="model.QuaName" placeholder="资质名称" />
      </n-form-item-gi>

      <n-form-item-gi :span="2"></n-form-item-gi>

      <n-form-item-gi :span="8" label="联系人姓名" path="PeopleName">
        <n-input v-model:value="model.PeopleName" placeholder="联系人姓名" />
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="联系方式" path="PeoplePhone">
        <n-input v-model:value="model.PeoplePhone" placeholder="联系方式" />
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="联系人邮箱" path="PeopleEmail">
        <n-input v-model:value="model.PeopleEmail" placeholder="联系人邮箱" />
      </n-form-item-gi>

<!--  上传    -->
      <n-gi :span="24">
        <div>
          <n-upload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :headers="{
              'naive-info': 'hello!'
            }"
                      :data="{
              'naive-data': 'cool! naive!'
            }"
                  >
            <n-button>上传文件</n-button>
          </n-upload>
        </div>
      </n-gi>

      <n-gi :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button round type="primary" @click="handleValidateButtonClick">
            验证
          </n-button>
        </div>
      </n-gi>
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
      handleValidateButtonClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('验证成功')
          } else {
            console.log(errors)
            message.error('验证失败')
          }
        })
      }
    }
  }
})
</script>
