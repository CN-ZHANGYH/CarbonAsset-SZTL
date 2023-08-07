<template>
  <n-card title="企业基本信息" :segmented="{
      content: true,
      footer: 'soft'
    }">
    <n-avatar
        round
        :size="48"
        :src="enterprise.avatar"
    />
    <n-form
        ref="formRef"
        :model="enterprise"
        size="medium"
        label-placement="left"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="24" label="企业名称" path="name">
          <span>{{enterprise.enterprise_name}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="企业地址:" path="address">
          <span>{{enterprise.enterprise_address}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="注册时间" path="datetimeValue">
          <span>{{enterprise.create_time}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="联系人" path="PeopleName">
          <span>丁总</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="联系人手机号" path="PeoplePhone">
          <span>{{enterprise.phonenumber}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="邮箱" path="PeopleEmail">
          <span>{{enterprise.email}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="8" label="企业认证状态" path="PeopleEmail">
          <n-tag type="success">成功</n-tag>
        </n-form-item-gi>
      </n-grid>
    </n-form>

    <n-divider />

    <ResetPassword/>

  </n-card>
</template>


<script setup>
import ResetPassword from "../../components/Form/ResetPassword.vue"
import {defineComponent, ref} from "vue";
import {getEnterpriseInfo} from "../../api/enterprise.js";
const inverted = ref(false)

const enterpriseName = ref(JSON.parse(localStorage.getItem("user")).nickName)
const enterprise = ref({})
getEnterpriseInfo({enterprise: enterpriseName.value}).then(res => {
  enterprise.value = res.enterprise
})


</script>

<style scoped lang='less'>
.n-card {
  height: 100vh;
  margin-bottom: 80px;
}
</style>
