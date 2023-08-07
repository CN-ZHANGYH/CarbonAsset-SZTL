<template>
  <n-grid x-gap="12" :cols="4">
    <n-gi>
      <n-card class="card-container">
        <img src="../../assets/img/city.png" alt="">
        <div class="text">
          <h1>冰箱</h1>
          <h3>出售价格：¥50</h3>
          <p>描述xxxxxxxxxxxx</p>
        </div>
        <div class="button">
          <n-button>购买</n-button>
        </div>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<style scoped lang="less">
.n-grid {
  height: 100vh;
}
.card-container {
  height: 200px;
  img {
    width: 100px;
    height: 100px;
    float: right;
  }
  .text {
    line-height: 40px;
  }
  .n-button {
    margin-right: 10px;
    float: right;
  }
}

</style>
