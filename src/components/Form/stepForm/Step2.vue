<template>
  <n-descriptions label-placement="left" column="1" size="large" style="margin-top: 5%">
    <n-descriptions-item label="账户地址">
      <h3>{{emissionresource.enterpriseAddress}}</h3>
    </n-descriptions-item>
    <n-descriptions-item label="资源分类">
      <h3>{{emissionresource.resourceType}}</h3>
    </n-descriptions-item>
    <n-descriptions-item label="排放方式" :span="2">
      <h3>{{emissionresource.emissionWay}}</h3>
    </n-descriptions-item>
    <n-descriptions-item label="申请描述">
      <h3>{{emissionresource.description}}</h3>
    </n-descriptions-item>
    <n-descriptions-item label="排放数量">
      <h3>{{emissionresource.emissionEmission}}</h3>
    </n-descriptions-item>
  </n-descriptions>
</template>

<script  setup>
  const props = defineProps({
    emissionresource: Object
  })

  const {emissionresource} = toRefs(props)

</script>
