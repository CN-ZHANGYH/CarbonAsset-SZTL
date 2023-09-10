<template>
  <n-card title="出售碳资产">
      <n-grid :x-gap="12" :y-gap="12" :cols="6">
          <n-grid-item :span="1" :offset="0">
              <n-card style="height: auto;width: auto" hoverable>
                  <n-collapse :default-expanded-names="['0']">
                      <n-collapse-item title="🏆" name="0">
                          <img src="../../assets/img/img_2.png" alt="" style="width: 150px;height: 140px; margin-left: 10px" class="col_img">
                      </n-collapse-item>
                      <n-collapse-item title="积分" name="1">
                          <div><n-tag type="success">✨当前积分: {{enterprise.enterprise_carbon_credits}}</n-tag></div>
                      </n-collapse-item>
                      <n-collapse-item title="碳额度" name="2">
                          <div><n-tag type="success">🚀剩余额度: {{emissionLimit}}</n-tag></div>
                      </n-collapse-item>
                      <n-collapse-item title="出售记录" name="3">
                          <div>
                              <span><strong>记录条数: </strong>{{historyList.length}}</span>
                          </div>
                          <div v-for="item in historyList">
                              <n-tag type="info" style="margin-top: 5px">♾️{{item.time}}</n-tag>
                          </div>
                      </n-collapse-item>
                  </n-collapse>
              </n-card>
          </n-grid-item>
          <n-grid-item :span="5" :offset="0" style="margin-left: 20px">
              <div style="margin-left: 25px">
                  <n-steps :current="currentRef" :status="currentStatus">
                      <n-step
                              title="添加出售订单"
                              description="添加出售的碳额度详细信息、确保有足够的碳额度"
                      />
                      <n-step
                              title="确认订单信息"
                              description="再次确认当前的订单详细信息内容,确认无误下一步"
                      />
                      <n-step
                              disabled
                              title="商品等待上链"
                              description="添加商品成功之后，等待商品上链"
                      />
                  </n-steps>
              </div>
              <div style="margin-top: 5%" v-if="currentRef == 1">
                  <n-form label-placement="left" label-width="100px" :rules="rules" style="width: 600px" :model="form" ref="formRef">
                      <n-form-item label="商品名称" path="title">
                          <n-input  placeholder="请输入商品的名称" v-model:value="form.title"/>
                      </n-form-item>
                      <n-form-item label="商品描述" path="description">
                          <n-input  placeholder="请输入商品的描述" v-model:value="form.description"/>
                      </n-form-item>
                      <n-form-item label="出售商家" path="userAddress">
                          <n-select :options="options" v-model:value="form.userAddress" placeholder="请选择当前的商家"></n-select>
                      </n-form-item>
                      <n-form-item label="数量" path="quality">
                          <n-input-number placeholder="请输入数量" v-model:value="form.quality"/>
                      </n-form-item>
                      <n-form-item label="单价" path="amount">
                          <n-input-number placeholder="请输入单价" v-model:value="form.amount"/>
                      </n-form-item>
                      <n-form-item label="上传封面">
                          <n-upload
                                  directory-dnd
                                  action=""
                                  :max="5"
                                  :custom-request="upload"
                                  show-file-list="false"
                          >
                              <n-upload-dragger>
                                  <div v-if='imageUrl === ""'>
                                      <div style="margin-bottom: 12px">
                                          <n-icon size="48" :depth="3">
                                              <archive-icon />
                                          </n-icon>
                                      </div>
                                      <n-text style="font-size: 16px">
                                          点击或者拖动文件到该区域来上传
                                      </n-text>
                                      <n-p depth="3" style="margin: 8px 0 0 0">
                                          请上传2MB的碳额度商品封面
                                      </n-p>
                                  </div>
                                  <img v-if="imageUrl" :src="form.image" style="width: 150px;height: 150px" />
                              </n-upload-dragger>
                          </n-upload>
                      </n-form-item>
                  </n-form>
              </div>
              <div v-if="currentRef == 2" style="margin-top: 5%">
                  <n-descriptions label-placement="top" bordered >
                      <n-descriptions-item label="商品名称">
                          <h3>{{form.title}}</h3>
                      </n-descriptions-item>
                      <n-descriptions-item label="商品描述">
                          <h3>{{form.description}}</h3>
                      </n-descriptions-item>
                      <n-descriptions-item label="出售商家地址">
                          <n-tag type="info"><h3>{{form.userAddress}}</h3></n-tag>
                      </n-descriptions-item>
                      <n-descriptions-item label="数量" :span="1">
                          <n-tag type="success"><h3>{{form.quality}}</h3></n-tag>
                      </n-descriptions-item>
                      <n-descriptions-item label="单价" :span="2">
                          <n-tag type="success"><h3>{{form.amount}}</h3></n-tag>
                      </n-descriptions-item>
                      <n-descriptions-item label="商品封面">
                          <img :src="form.image" alt="" style="width: 200px;height: 200px">
                      </n-descriptions-item>
                  </n-descriptions>
              </div>
              <div v-if="currentRef == 3" style="margin-top: 10%;text-align: center">
                  <n-result status="success" title="添加商品成功" description="当前商品已经上链，可以进行交易">
                  </n-result>
              </div>
              <div style="text-align: center;">
                  <n-button type="info" size="large" class="form_btn" @click="formCheck" v-if="currentRef != 3">下一步</n-button>
                  <n-button type="info" size="large" class="form_btn" @click="currentRef -= 1" v-if="currentRef != 1 && currentRef != 3">上一步</n-button>
                  <n-button type="success" size="large" style="margin-top: 10%;width: 150px;" @click="addAsset" v-if="currentRef == 2">确认</n-button>
                  <n-button type="success" size="large" style="margin-top: 10%;width: 150px;" @click="reset" v-if="currentRef == 3">完成</n-button>
              </div>
          </n-grid-item>
      </n-grid>
  </n-card>
</template>

<script setup>
import {addCarbonAsset, getEnterpriseNewSellerHistory, uploadProductImage} from "../../api/asset.js";
const currentRef = ref(1);
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import {getEnterpriseInfo} from "../../api/enterprise.js";
import {getQualificationInfo} from "../../api/qualification.js";
const imageUrl = ref("")
const enterprise = ref({})
const emissionLimit = ref(0)
const formRef = ref(null);
const historyList = ref([])
const currentStatus = ref("process")
getQualificationInfo({enterprise: JSON.parse(localStorage.getItem("user")).nickName}).then(res => {
    emissionLimit.value = res.data.qualificationEmissionLimit
})
const data = reactive({
    form: {},
    options: [
        {
            label: "",
            value: ""
        }
    ]
})

const rules = reactive({
    title: {
        required: true,
        trigger: ['blur','input'],
        message: "请输入商品名称"
    },
    description: {
        required: true,
        trigger: ['blur','input'],
        message: "请输入商品描述"
    },
    userAddress: {
        required: true,
        trigger: ['blur','input'],
        message: "请选择商家账户"
    },
    quality: {
        required: true,
        type: "number",
        trigger: ['blur','change'],
        message: "请输入出售数量"
    },
    amount: {
        required: true,
        type: "number",
        trigger: ['blur','change'],
        message: "请输入出售单价"
    }
})

const {form,options} = toRefs(data)
function upload(file){
    uploadProductImage(file.file).then(res => {
        imageUrl.value = res.imageUrl
        form.value.image = imageUrl.value
    })
}

onMounted(() => {
    getEnterpriseInfo({enterprise:JSON.parse(localStorage.getItem("user")).nickName}).then(res => {
        options.value[0].label = res.enterprise.enterprise_address
        options.value[0].value = res.enterprise.enterprise_address
        enterprise.value = res.enterprise
        getEnterpriseNewSellerHistory({address:  res.enterprise.enterprise_address}).then(res => {
            historyList.value = res.data
            console.log(historyList.value)
        })
    })
})


function addAsset(){
    addCarbonAsset(form.value).then(res =>{
        window.$message.success(res.msg)
    })
    currentRef.value += 1
}

function reset(){
    currentRef.value = 1
    form.value.image = ""
    form.value.title = ""
    form.value.userAddress = ""
    form.value.description = ""
    form.value.quality = null
    form.value.amount = null
    imageUrl.value = ""
}

function formCheck(){
    formRef.value?.validate((errors) => {
        if (!errors) {
            currentRef.value += 1
        } else {
            window.$message.error("请填写商品内容")
        }
    });
}
</script>

<style lang="less" scoped>
.n-card {
  height: auto;
  margin-bottom: 80px;
  border-radius: 20px;
}

.light-green {
  height: 500px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 500px;
  background-color: rgba(0, 128, 0, 0.24);
}

.form_btn{
  margin-right: 5%;
  margin-top: 10%;
}

.col_img{
    transition: transform 0.2s ease;
}

.col_img:hover {
    transform: scale(1.1);
}
</style>
