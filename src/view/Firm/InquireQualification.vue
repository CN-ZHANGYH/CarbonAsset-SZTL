<template>
  <n-card title="企业基本信息" :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <n-form
        ref="formRef"
        :model="enterprise"
        size="medium"
        label-placement=left
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="24" label="用户头像">
          <n-upload class="avatar-uploader"
                    style="width: 100px;height: 100px;border: dashed 2px gray;border-radius: 10px"
                    action="#"
                    :custom-request="upload"
                    @before-upload="beforeUpload"
                    :show-file-list="false">
            <img v-if="imageUrl" :src="enterprise.avatar" class="avatar" />
            <n-icon v-else class="avatar-uploader-icon">
              <Add style="width: 100px;height: 100px"/>
            </n-icon>
          </n-upload>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="企业名称" path="name">
          <span>{{enterprise.enterprise_name}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="企业地址" path="address">
          <n-tag strong type="success">
              <span>{{enterprise.enterprise_address}}</span>
          </n-tag>
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="注册时间" path="datetimeValue">
          <span>{{enterprise.create_time}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="手机号码" path="PeoplePhone">
          <span>{{enterprise.phonenumber}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="邮箱" path="PeopleEmail">
          <span>{{enterprise.email}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="8" label="企业认证状态" path="PeopleEmail">
          <n-tag type="success" v-if="enterprise.enterprise_verified == 1">已认证</n-tag>
          <n-tag type="error" v-else>未认证</n-tag>
        </n-form-item-gi>
      </n-grid>

        <n-button  type="info" @click="showModal = true">
            更新信息
        </n-button>
        <n-modal
                v-model:show="showModal"
                class="custom-card"
                preset="card"
                style="width: 600px"
                title="更新信息"
                size="huge"
                :bordered="false"
                :segmented="segmented"
        >
            <n-form :model="enterprise" label-placement="left" label-width="80px" :rules="rules">
                <n-form-item label="企业名称">
                    <n-input v-model:value="enterprise.enterprise_name" disabled/>
                </n-form-item>
                <n-form-item label="企业地址">
                    <n-input v-model:value="enterprise.enterprise_address" disabled/>
                </n-form-item>
                <n-form-item label="手机号" path="phonenumber">
                    <n-input v-model:value="enterprise.phonenumber" placeholder="请输入手机号"/>
                </n-form-item>
                <n-form-item label="邮箱" path="email">
                    <n-input v-model:value="enterprise.email" placeholder="请输入邮箱"/>
                </n-form-item>
                <div style="text-align: center;">
                    <n-button type="error" strong secondary size="large" style="margin-right: 20px" @click="showModal = false">取消</n-button>
                    <n-button type="success" strong secondary size="large" @click="updateUserProfile">更新</n-button>
                </div>
            </n-form>
        </n-modal>
    </n-form>
    <n-divider/>
    <ResetPassword :enterprise="enterprise"/>
  </n-card>
</template>


<script setup>
import {Add} from "@vicons/ionicons5"
import ResetPassword from "../../components/Form/ResetPassword.vue"
import {ref} from "vue";
import {getEnterpriseInfo, updateAvatar, updateEnterpriseInfo, uploadAvatar} from "../../api/enterprise.js";
const imageUrl = ref("")
const showModal = ref(false)
const enterpriseName = ref(JSON.parse(localStorage.getItem("user")).nickName)
const enterprise = ref({})
getEnterpriseInfo({enterprise: enterpriseName.value}).then(res => {
    enterprise.value = res.enterprise
    imageUrl.value = enterprise.value.avatar
})

const rules = reactive({
    phonenumber: {
        min: 11,
        max: 11,
        trigger: ["blur", "input"],
        message: "请输入正确的手机号"
    }
})
const segmented = reactive({
    content: "soft",
    footer: "soft"
})

function beforeUpload(data){
    // 允许的图片格式
    // const allowedFormats = ['jpeg', 'jpg', 'png', 'gif'];
    //
    // const isLt2M = data.file.file.size / 1024 / 1024 < 2;
    // const fileExtension = data.file.file.name.split('.').pop().toLowerCase();
    //
    // if (!isLt2M) {
    //     return window.$message.error('上传头像图片大小不能超过 2MB!');
    // }
    //
    // if (!allowedFormats.includes(fileExtension)) {
    //     return window.$message.error('上传头像图片格式不支持!');
    // }
}

function upload(file){
    uploadAvatar(file.file).then(res => {
        imageUrl.value = res.imgUrl
        enterprise.value.avatar = imageUrl.value

        updateAvatar({
            enterprise: enterprise.value.enterprise_name,
            avatar: imageUrl.value
        }).then(res => {
            window.$message.success(res.msg)
        })
    })
}


function updateUserProfile(){
    console.log(enterprise.value)
    updateEnterpriseInfo(enterprise.value).then(res => {
        window.$message.success(res.msg)
    })
}

</script>

<style scoped lang='less'>
.template {
  height: 100%;
}

.n-card {
  height: auto;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>
