<template>
  <div>
    <n-grid x-gap="12" cols="12">
      <n-grid-item :span="4" :offset="0">
        <div class="hello">
          <div class="box">
            <div class="image-container">
              <img :src="qualification.qualificationUrl" alt=""  class="img">
              <div class="image-overlay"></div>
            </div>
            <div class="text">
              <div>
                <h3>{{}}</h3>
                <p style="color:#878B96">{{}}</p>
              </div>
            </div>
            <div class="footer" style="display: flex; align-items: center;">
              <img class="tou" style="margin-left: 20px" :src="avatar"/>
              <div class="name" style="margin-left: 10px;">
                <n-popover trigger="hover">
                  <template #trigger>
                    <h4 style="color:#5752ED;">{{  }}</h4>
                  </template>
                  <span><n-button type="error" strong secondary>{{  }}</n-button></span>
                </n-popover>
                <h5 style="color: #8B93A1">{{  }}</h5>
              </div>
            </div>
          </div>
        </div>
      </n-grid-item>
      <n-grid-item :span="8" :offset="0">
        <n-card :bordered="false" class="mt-4 proCard">
          <n-space vertical class="steps" justify="center">
            <n-steps :current="currentTab" :status="currentStatus">
              <n-step title="填写转账信息" description="确保填写正确" />
              <n-step title="确认转账信息" description="确认转账信息" />
              <n-step title="完成转账" description="恭喜您，转账成功" />
            </n-steps>
            <div v-if="currentTab === 1">
              <n-form
                  :label-width="90"
                  :model="form"
                  :rules="rules"
                  label-placement="left"
                  ref="formRef"
                  style="max-width: 500px; margin: 40px auto 0 80px"
              >
                <n-grid :cols="24" :x-gap="24">
                  <n-form-item-gi :span="24" label="账户地址" path="enterpriseAddress">
                    <n-input placeholder="请输入当前的企业账户地址" v-model:value="form.enterpriseAddress" disabled/>
                  </n-form-item-gi>
                  <n-form-item-gi :span="12" label="资源分类" path="resourceType">
                    <n-select placeholder="请选择资源分类" :options="typesOpt" v-model:show="show1" v-model:value="form.resourceType">
                      <template #arrow>
                        <transition name="slide-left">
                          <flash-checkmark16-regular v-if="show1" />
                          <flash16-regular v-else />
                        </transition>
                      </template>
                    </n-select>
                  </n-form-item-gi>
                  <n-form-item-gi :span="12" label="排放方式" path="emissionWay">
                    <n-select placeholder="请选择排放方式" :options="methodsOpt" v-model:show="show2" v-model:value="form.emissionWay">
                      <template #arrow>
                        <transition name="slide-left">
                          <flash-checkmark16-regular v-if="show2" />
                          <flash16-regular v-else />
                        </transition>
                      </template>
                    </n-select>
                  </n-form-item-gi>
                  <n-form-item-gi :span="24" label="申请描述" path="description" >
                    <n-input type="textarea"  placeholder="请输入申请描述" v-model:value="form.description"/>
                  </n-form-item-gi>
                  <n-form-item-gi :span="24" label="排放数量" path="emissionEmission">
                    <n-input-number placeholder="请输入排放数量" v-model:value="form.emissionEmission"/>
                  </n-form-item-gi>
                </n-grid>

                <div style="margin-left: 80px">
                  <n-space>
                    <n-button type="primary" @click="formSubmit">下一步</n-button>
                  </n-space>
                </div>
              </n-form>
            </div>

            <step2 v-if="currentTab === 2" @nextStep="nextStep" @prevStep="prevStep" />
            <step3 v-if="currentTab === 3" @prevStep="prevStep" @finish="finish" />
          </n-space>

        </n-card>
      </n-grid-item>
    </n-grid>


  </div>
</template>

<script setup>
  import { defineComponent, ref } from 'vue';
  import step2 from './Step2.vue';
  import step3 from './Step3.vue';
  import Flash16Regular from "@vicons/fluent/Flash16Regular";
  import FlashCheckmark16Regular from "@vicons/fluent/FlashCheckmark16Regular";
  import {getEmissionMethods, getTypes} from "../../../api/emissionresource.js";
  import {getEnterpriseInfo} from "../../../api/enterprise.js";
  import {getQualificationInfo} from "../../../api/qualification.js";

  const formRef = ref(null);
  const currentTab = ref(1);
  const currentStatus = ref('process');
  const form = ref({})
  const avatar = JSON.parse(localStorage.getItem("user")).avatar

  const show1 = ref(false)
  const show2 = ref(false)
  const methodsOpt = ref([])
  const typesOpt = ref([])
  const qualification = ref({})

  const rules = reactive({
    enterpriseAddress:{
      required: true,
      trigger: ['blur','input'],
      message: "请输入账户地址"
    },
    emissionEmission: {
      required: true,
      type: 'number',
      trigger: ['blur','change'],
      message: "请输入排放数量"
    },
    description: {
      required: true,
      trigger: ['blur','input'],
      message: "请输入申请描述"
    },
    emissionWay: {
      required: true,
      trigger: ['blur','change'],
      message: "请选择排放方式"
    },
    resourceType: {
      required: true,
      trigger: ['blur','change'],
      message: "请选择资源类型"
    },
  })

  function nextStep() {
    if (currentTab.value < 3) {
      currentTab.value += 1;
    }
  }

  function prevStep() {
    if (currentTab.value > 1) {
      currentTab.value -= 1;
    }
  }

  function finish() {
    currentTab.value = 1;
  }

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
         nextStep()
      } else {
        window.$message.error("请填写内容")
      }
    });
  }


  getEnterpriseInfo({enterprise: JSON.parse(localStorage.getItem("user")).nickName}).then(res => {
    form.value.enterpriseAddress = res.enterprise.enterprise_address
  })
  getEmissionMethods().then(res => {
    methodsOpt.value = res.data
  })
  getTypes().then(res =>{
    typesOpt.value = res.data
  })
  getQualificationInfo({enterprise: JSON.parse(localStorage.getItem("user")).nickName}).then(res => {
    qualification.value = res.data
  })

</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }

  :deep(.slide-left-enter-active),
  :deep(.slide-left-leave-active) {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  :deep(.slide-left-enter-from),
  :deep(.slide-left-leave-to) {
    position: absolute;
    opacity: 0;
  }

  :deep(.slide-left-enter-from) {
    transform: translateX(-10px);
  }

  :deep(.slide-left-leave-to) {
    transform: translateX(10px);
  }




  .hello {
    width: auto;
    height: 500px;
    margin-top: 10%;
  }

  .box {
    width: 300px;
    height: 420px;
    border-radius: 23px;
    border: 2px solid #EDEDF0;
    /* 添加其他样式属性 */
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
    background-color: #00DBDE;
    background-image: linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%);

  }
  .text {
    height:150px;
    margin-top: 10px;
    padding: 0 30px;
  }
  .footer {
    height: 5px;
    display: flex;
    //background: #ffffff;
    align-items: center;
  }
  .tou {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid black;
  }

  .box:hover {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3); /* 鼠标经过时的阴影效果 */
  }


  .image-container {
    position: relative;
    width: 300px; /* 调整为实际大小 */
    height: 200px; /* 调整为实际大小 */
    overflow: hidden;
    border-radius: 20px; /* 添加圆角 */
  }

  .image-container img {
    width: 300px;
    height: 200px;
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
  .carousel-img {
    width: 100%;
    height: 100%;
  }
</style>
