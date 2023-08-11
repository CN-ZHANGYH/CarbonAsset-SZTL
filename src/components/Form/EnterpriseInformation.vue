<template>
  <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      size="medium"
      label-placement="top"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="8" label="企业名称" path="qualificationName">
        <n-input v-model:value="form.qualificationName" placeholder="请输入企业名称" disabled/>
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="社会信用代码" path="qualificationContent">
        <n-input placeholder="请输入企业的社会信用代码" v-model:value="form.qualificationContent" />
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="法定代表人" path="qualificationLeader">
        <n-input v-model:value="form.qualificationLeader"  placeholder="请输入法定代表人" />
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="注册地址" path="qualificationAddress">
        <n-input v-model:value="form.qualificationAddress" placeholder="请输入公司注册地址" />
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="所属行业" path="qualificationIndustry">
          <n-select :options="options" v-model:value="form.qualificationIndustry" placeholder="请选择所属行业"></n-select>
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="联系人姓名" path="qualificationUserName">
        <n-input v-model:value="form.qualificationUserName" placeholder="请输入联系人姓名" />
      </n-form-item-gi>

      <n-form-item-gi :span="8" label="联系人邮箱" path="qualificationUserEmail">
        <n-input v-model:value="form.qualificationUserEmail" placeholder="请输入联系人邮箱" />
      </n-form-item-gi>
<!--  上传    -->
        <n-form-item-gi :span="24" label="资质图片" path="qualificationUrl">
            <n-upload class="avatar-uploader"
                      style="width: 150px;height: 150px;border: dashed 2px gray;border-radius: 10px"
                      action=""
                      :custom-request="upload"
                      @before-upload="beforeUpload"
                      :show-file-list="false">
                <img v-if="imageUrl" :src="form.qualificationUrl" style="width: 150px;height: 150px" />
                <n-icon v-else class="avatar-uploader-icon" style="width: 100%;height: 100%">
                    <CloudUpload style="width: 75px;height: 75px;margin-top: 50%;margin-left: 50%"/>
                </n-icon>
            </n-upload>
        </n-form-item-gi>

      <n-gi :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button round type="primary" size="large" @click="handleValidateButtonClick">
            验证
          </n-button>
        </div>
      </n-gi>
    </n-grid>
  </n-form>
</template>

<script setup>


import {CloudUpload} from "@vicons/ionicons5";
import {getIndustryList, uploadQualification, uploadQualificationInfo} from "../../api/qualification.js";
const imageUrl = ref("")
const data = reactive({
    form: {},
    options: []
})
const {form,options} = toRefs(data)
const rules = reactive(
    {
        qualificationName: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入企业的名称"
    },
        qualificationContent: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入社会信用代码"
    },
        qualificationLeader: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入法定代表人"
    },
        qualificationAddress: {
            required: true,
            trigger: ["blur","input"],
            message: "请输入公司注册地址"
        },
        qualificationIndustry: {
            required: true,
            trigger: ["blur","input"],
            message: "请选择所属的行业"
        },
        qualificationUserName: {
            required: true,
            trigger: ["blur","input"],
            message: "请输入联系人名称"
        },
        qualificationUserEmail: {
            required: true,
            trigger: ["blur","input"],
            message: "请输入联系人邮箱"
        },
        qualificationUrl: {
            required: true,
            trigger: ["blur","change"],
            message: "请上传资质"
        }
  }
)

function upload(file){
    uploadQualification(file.file).then(res => {
        imageUrl.value = res.imgUrl
        form.value.qualificationUrl = imageUrl.value
        window.$message.success(res.msg)
    })

}

function setEnterpriseName(){
    form.value.qualificationName  = JSON.parse(localStorage.getItem("user")).nickName
}

const getIndustry = () => {
    getIndustryList().then(res => {
        options.value = res.data
    })
}


function handleValidateButtonClick(){
    uploadQualificationInfo(form.value).then(res => {
        window.$message.success(res.msg)
    })
}
getIndustry()
setEnterpriseName()

</script>
