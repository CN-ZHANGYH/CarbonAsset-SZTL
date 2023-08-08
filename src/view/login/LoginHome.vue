<template>
  <n-space vertical>
    <n-layout>

      <n-layout-header :shadow="true">
        <div class="header-content">
          <img src="../../assets/logo.png" alt="">
          <div class="button-container">
            <router-link to="/Login">
              <n-button type="success">
                前往登录/注册
              </n-button>
            </router-link>
          </div>
        </div>
      </n-layout-header>

      <n-layout-content>
        <n-row gutter="100">
          <n-col :span="12" class="yuan-col">
            <div class="yuan-container">
              <div class="yuan">
                <div class="title">
                  <h1>
                    数字碳链管理平台<br>
                    Digital Carbon Chain
                  </h1>
                  <p>
                    数字碳链管理平台是一个用户交互管理分析调查的平台，
                    碳资源排放管理、交易管理、资质管理等等...
                  </p>
                </div>
              </div>
            </div>
          </n-col>
          <n-col :span="12" class="carousel-col">
            <div class="text">
              <h1>链上排放 公开可信</h1>
              <p>分析观察管理碳排放资源与交易</p>
            </div>

            <div class="carousel">
              <n-carousel autoplay>
                <img
                    class="carousel-img"
                    src="../../assets/img/img.png"
                >
                <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
                >
                <img
                    class="carousel-img"
                    src="../../assets/img/img.png"
                >
                <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
                >
              </n-carousel>
            </div>

            <div class="number">
              <n-row>
                <n-col :span="4">
                  <n-statistic label="注册人数">
                    <span>1 K+</span>
                  </n-statistic>
                </n-col>
                <n-col :span="5">
                  <n-statistic label="加入企业数">
                    <span>10 K+</span>
                  </n-statistic>
                </n-col>
                <n-col :span="5">
                  <n-statistic label="交易数">
                    <span>10 K+</span>
                  </n-statistic>
                </n-col>
                <n-col :span="5">
                  <n-statistic label="排放量">
                    <span>10 K+</span>
                  </n-statistic>
                </n-col>
              </n-row>
            </div>
          </n-col>
        </n-row>
      </n-layout-content>

    </n-layout>
  </n-space>
</template>

<style scoped lang="less">
.n-layout-header {
  position: relative;
  z-index: 2;
  background: #fff;
  height: 70px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  img {
    margin-left: 30px;
  }
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button-container {
      margin-right: 20px;
    }
  }
  .n-button {
    width: 200px;
    height: 50px;
    font-size: 20px;
    border-radius: 20px;
    margin-top: 10px;
  }
}

.n-layout-content {
  position: relative;
  z-index: 1;
  height: 750px;
  // 半圆
  .yuan-col {
    height: 750px;
    overflow: hidden;
    .yuan-container {
      width: 200px;
      height: 300px;
      overflow: hidden;
      .yuan:before {
        content: "";
        position: absolute;
        top: -35%;
        left: -45%;
        width: 140%;
        height: 180%;
        background-color: #25a140;
        border-radius: 50%;
        box-shadow: 4px 2px 10px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .yuan {
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      position: absolute;
      z-index: 2;
      top: 28%;
      left: 15%;
      h1 {
        font-size: 50px;
        font-weight: 800;
        color: #fff;
      }
      p {
        width: 500px;
        //background: pink;
        margin-top: 30px;
        color: #fff;
        font-size: 20px;
      }
    }
  }

  .carousel-col {
    .text {
      padding-top: 10%;
      padding-right: 5%;
      text-align: right;
      color: #25a140;
      h1 {
        font-size: 30px;
      }
      p {
        color: #000;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .carousel {
      padding-top: 20px;
      .carousel-img {
        width: 95%;
        height: 400px;
        object-fit: cover;
      }
    }
  }

  .number {
    margin-top: 6%;
    .n-col {
      border-right: 1px solid #ccc;
      margin-left: 3%;
      margin-right: 2%;
    }
    .n-col:last-child {
      border: 0;
      margin-right: 0;
    }
    span {
      color: #25a140;
      font-weight: 800;
      font-size: 28px;
      text-align: left;
    }
  }
}
</style>
