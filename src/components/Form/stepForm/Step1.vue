<template>
  <n-form
    :label-width="90"
    :model="formValue"
    :rules="rules"
    label-placement="left"
    ref="form1Ref"
    style="max-width: 500px; margin: 40px auto 0 80px"
  >
    <n-form-item label="企业名称" path="myAccount">
      <n-select
        placeholder="请选择付款账户"
        :options="myAccountList"
        v-model:value="formValue.myAccount"
      />
    </n-form-item>
    <n-form-item label="地址" path="name">
      <n-input placeholder="请输入地址id" v-model:value="formValue.name" />
    </n-form-item>
    <n-form-item label="申请碳排放额度" path="money">
      <n-input placeholder="请输入申请碳排放额度" v-model:value="formValue.money">
        <template #prefix>
          <span class="text-gray-400">￥</span>
        </template>
      </n-input>
    </n-form-item>
    <div style="margin-left: 80px">
      <n-space>
        <n-button type="primary" @click="formSubmit">下一步</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script setup>
  import { ref, defineEmits } from 'vue';

  const myAccountList = reactive(
      [
          {
              label: '珠海市区块链有限公司',
              value: 1,
          },
          {
              label: '珠海市区块链有限公司分区',
              value: 2,
          },
      ]
  )

  const accountTypeList = reactive(
      [
          {
              label: '微信',
              value: 1,
          },
          {
              label: '支付宝',
              value: 2,
          },
      ]
  )

  const emit = defineEmits(['nextStep']);

  const form1Ref = ref(null);

  const formValue = ref({
    accountType: 1,
    myAccount: null,
    money: '98',
    name: '0x7cf53f4db904ef5b8b21c940af7b5a335a134892',
  });

  const rules = {
    name: {
      required: true,
      message: '请输入收款人姓名',
      trigger: 'blur',
    },
    account: {
      required: true,
      message: '请输入收款账户',
      trigger: 'blur',
    },
    money: {
      required: true,
      message: '请输入转账金额',
      trigger: 'blur',
    },
    myAccount: {
      required: true,
      type: 'number',
      message: '请选择付款账户',
      trigger: 'change',
    },
  };

  function formSubmit() {
    form1Ref.value.validate((errors) => {
      if (!errors) {
        emit('nextStep');
      } else {
      }
    });
  }
</script>
