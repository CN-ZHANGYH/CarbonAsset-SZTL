<template>
  <n-grid x-gap="12" :cols="4">
    <n-gi>
        <div class="box_container">
            <div class="box_title">
                <h1 style="color: #121212">Featured NFTs</h1>
                <h4 style="color:#848484;">View all</h4>
            </div>
            <div class="box">
                <div class="image-container">
                    <img src="../../assets/img.png" class="img">
                    <div class="image-overlay"></div>
                </div>
                <div class="box_text text_back">
                    <h4>Meka #3139</h4>
                    <h4>10 ETH</h4>
                </div>
            </div>
            <div class="box_button">
                <n-button :bordered="false" type="success" class="back">Place Bid</n-button>
                <n-button class="heart" :bordered="false" type="info">
                    <img src="../../assets/aixing.png" alt="">
                </n-button>
            </div>
        </div>
    </n-gi>
  </n-grid>
</template>

<script setup>

</script>

<style scoped lang="less">
.box_container {
  position: relative;
  width: 250px;
  height: 320px;
  background: #fff;
  padding: 25px;
  border-radius: 30px;
  transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}

.box_title {
  display: flex;
  justify-content: space-between;
  align-items:flex-end;
  margin-bottom: 20px;
}

.box {
  display: flex;
  justify-content: center;
  height: 240px;
  width: 200px;
  margin-left: 10%;
  border-radius: 23px;
  background: #E9E9E9;
  transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}

.box_text {
  position:absolute;
  top: 50%;
  display: flex;
  justify-content: space-between;
}

.text_back {
  top: 76%;
  h4 {
    color:#121212;
  }
  h4:first-child {
    margin-right: 40px;
  }
}

.box_button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  .back {
    width: 90px;
    height: 40px;
    border-radius: 18px;
    border:0px;
    background-color: #000;
    color: #fff;
    margin-right: 10px;
  }

  .heart {
    position: relative;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 15px;
    background: #0DB7B7;
    img {
      position: absolute;
      left: 50%;
      transform: translate(-50%,0%);
      height: 15px;
      width: 15px;
      transition: box-shadow 0.1s ease; /* 添加过渡效果 */

    }
    img:hover {
      height: 16px;
      width: 16px;
    }
  }
}


.image-container {
  position: relative;
  width: 200px; /* 调整为实际大小 */
  height: 180px; /* 调整为实际大小 */
  overflow: hidden;
  border-radius: 20px; /* 添加圆角 */

}
.box:hover {
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3); /* 鼠标经过时的阴影效果 */
}

.box_container:hover {
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3); /* 鼠标经过时的阴影效果 */
}

.image-container img {
  width: 200px;
  height: 180px;
  border-bottom: 1px solid;
  border-radius: inherit; /* 继承圆角 */
  transition: transform 0.3s ease;

}

.image-container img:hover {
  transform: scale(1.2);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* 这里可以添加动画样式 */
  animation: your-animation 1s infinite;

}
</style>
