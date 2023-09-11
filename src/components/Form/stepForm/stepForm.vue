<template>
  <div>
    <n-grid x-gap="12" cols="12">
      <n-grid-item :span="4" :offset="0">
        <div class="hello">
          <div class="box">
            <div class="tou">
              <img :src="avatar ? avatar : defaultAvatar">
            </div>
            <div class="box_content">
              <div class="name">
                <h2 style="color:#5752ED;">
                  <template v-if="qualification.qualificationName">
                    <span>{{ qualification.qualificationName }}</span>
                    <h4 style="color: #8B93A1;font-size: 15px">{{qualification.qualificationVerifiedRegulator}}</h4>
                    <h4 style="color: #000;font-size: 15px">可排放数量：{{qualification.qualificationEmissionLimit}}</h4>
                  </template>
                  <template v-else>
                    <h3>请尽快填写企业资质信息
                        <br/>进行碳排放申请
                    </h3>
                  </template>
                </h2>
<!--                <div class="box_img" style="margin-top: 15px">-->
<!--                  <img :src="qualification.qualificationUrl || defaultImage" class="img">-->
<!--                  <div class="image-overlay"></div>-->
<!--                </div>-->
                <n-popover trigger="hover">
                  <template #trigger>
                    <div class="box_img" style="margin-top: 15px">
                      <img :src="qualification.qualificationUrl || defaultImage" class="img">
                      <div class="image-overlay"></div>
                    </div>
                  </template>
                  <span>这是您的上传的营业执照</span>
                </n-popover>
              </div>
            </div>
          </div>
        </div>
      </n-grid-item>
      <n-grid-item :span="8" :offset="0">
        <n-card :bordered="false" class="mt-4 proCard">
          <n-space vertical class="steps" justify="center">
            <n-steps :current="currentTab" :status="currentStatus">
              <n-step title="填写申请信息" description="确保填写正确" />
              <n-step title="确认申请信息" description="确认信息正确" />
              <n-step title="提交申请信息" description="等待机构审核，申请上链" />
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
              </n-form>
            </div>

            <step2 :emissionresource="form" v-if="currentTab === 2"/>
            <step3 :enterprise="enterprise" :enterpriseAddress="enterpriseAddress" v-if="currentTab == 3"/>
          </n-space>

          <div style="margin-left: 30%">
            <n-space>
              <n-button type="primary" v-if="currentTab == 1" @click="formSubmit">下一步</n-button>
              <n-spin :show="show">
                <n-button type="info" v-if="currentTab == 2" @click="uploadEmission">提交</n-button>
              </n-spin>
              <n-button type="warning" v-if="currentTab == 2" @click="currentTab--">上一步</n-button>
            </n-space>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
  import { defineComponent, ref } from 'vue';
  import Flash16Regular from "@vicons/fluent/Flash16Regular";
  import FlashCheckmark16Regular from "@vicons/fluent/FlashCheckmark16Regular";
  import {applyEmissionResource, getEmissionMethods, getTypes} from "../../../api/emissionresource.js";
  import {getEnterpriseInfo} from "../../../api/enterprise.js";
  import {getQualificationInfo} from "../../../api/qualification.js";

  const formRef = ref(null);
  const currentTab = ref(1);
  const currentStatus = ref('process');
  const form = ref({})
  const avatar = JSON.parse(localStorage.getItem("user")).avatar
  const enterprise = JSON.parse(localStorage.getItem("user")).nickName
  const enterpriseAddress = ref("")
  const show1 = ref(false)
  const show2 = ref(false)
  const methodsOpt = ref([])
  const typesOpt = ref([])
  const qualification = ref({})
  const show = ref(false)
  // 默认图片
  const defaultImage = 'https://blog-1304715799.cos.ap-nanjing.myqcloud.com/imgs/96741691601422758.jpg';
  // 默认头像
  const defaultAvatar = "/src/assets/avatar.png";

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

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
         nextStep()
      } else {
        window.$message.error("请填写内容")
      }
    });
  }

  function uploadEmission(){
    applyEmissionResource(form.value).then(res => {
      window.$message.success(res.msg)
    })
    nextStep()
  }

  getEnterpriseInfo({enterprise: JSON.parse(localStorage.getItem("user")).nickName}).then(res => {
    form.value.enterpriseAddress = res.enterprise.enterprise_address
    enterpriseAddress.value = res.enterprise.enterprise_address
  })
  getEmissionMethods().then(res => {
    methodsOpt.value = res.data
  })
  getTypes().then(res =>{
    typesOpt.value = res.data
  })
  getQualificationInfo({enterprise: JSON.parse(localStorage.getItem("user")).nickName}).then(res => {
    qualification.value = res.data
    console.log(qualification.value)
  })

  function truncatedString(val){
    return val.substring(0, 15) + '...';
  }
</script>

<style lang="less" scoped>
@import "../../../assets/css/personage.less";
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

  .image-container {
    position: relative;
    width: 300px; /* 调整为实际大小 */
    height: 300px; /* 调整为实际大小 */
    overflow: hidden;
    border-radius: 20px; /* 添加圆角 */
  }

  .image-container img {
    width: 300px;
    height: 300px;
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
