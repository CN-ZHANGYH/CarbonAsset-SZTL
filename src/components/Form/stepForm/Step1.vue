<template>

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


</script>
