<template>
  <n-form
    :label-width="90"
    :model="formValue"
    :rules="rules"
    label-placement="left"
    ref="form2Ref"
    style="max-width: 500px; margin: 40px auto 0 80px"
  >
    <n-form-item label="企业名称" path="myAccount">
      <span>珠海市区块链有限公司</span>
    </n-form-item>
    <n-form-item label="地址id" path="name">
      <span>0x7cf53f4db904ef5b8b21c940af7b5a335a134892</span>
    </n-form-item>
    <n-form-item label="申请碳排放额度" path="money">
      <span>98</span>
    </n-form-item>
    <n-divider />
    <n-form-item label="支付密码" path="password">
      <n-input type="password" v-model:value="formValue.password" />
    </n-form-item>
    <div style="margin-left: 80px">
      <n-space>
        <n-button type="primary" :loading="loading" @click="formSubmit">提交</n-button>
        <n-button @click="prevStep">上一步</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script  setup>
  import { ref, defineEmits } from 'vue';
  const form2Ref = ref(null);
  const loading = ref(false);

  const formValue = ref({
    password: '086611',
  });

  const rules = {
    password: {
      required: true,
      message: '请输入支付密码',
      trigger: 'blur',
    },
  };

  const emit = defineEmits(['prevStep', 'nextStep']);

  function prevStep() {
    emit('prevStep');
  }

  function formSubmit() {
    loading.value = true;
    form2Ref.value.validate((errors) => {
      if (!errors) {
        setTimeout(() => {
          emit('nextStep');
        }, 1500);
      } else {
        window.$message.error('验证失败，请填写完整信息');
      }
    });
  }
</script>
