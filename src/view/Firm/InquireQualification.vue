<template>
  <n-card title="企业基本信息" :segmented="{
      content: true,
      footer: 'soft'
    }">

    <n-form
        ref="formRef"
        :model="enterprise"
        size="medium"
        label-placement="left"
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

        <n-form-item-gi :span="24" label="企业地址:" path="address">
          <span>{{enterprise.enterprise_address}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="24" label="注册时间" path="datetimeValue">
          <span>{{enterprise.create_time}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="联系人" path="PeopleName">
          <span>丁总</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="联系人手机号" path="PeoplePhone">
          <span>{{enterprise.phonenumber}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="6" label="邮箱" path="PeopleEmail">
          <span>{{enterprise.email}}</span>
        </n-form-item-gi>

        <n-form-item-gi :span="8" label="企业认证状态" path="PeopleEmail">
          <n-tag type="success">成功</n-tag>
        </n-form-item-gi>
      </n-grid>
    </n-form>

    <n-divider />

    <ResetPassword/>

  </n-card>
</template>


<script setup>
import {Add} from "@vicons/ionicons5"
import ResetPassword from "../../components/Form/ResetPassword.vue"
import {ref} from "vue";
import {getEnterpriseInfo, updateAvatar, uploadAvatar} from "../../api/enterprise.js";
const inverted = ref(false)
const imageUrl = ref("")

const enterpriseName = ref(JSON.parse(localStorage.getItem("user")).nickName)
const enterprise = ref({})
getEnterpriseInfo({enterprise: enterpriseName.value}).then(res => {
    enterprise.value = res.enterprise
    imageUrl.value = enterprise.value.avatar
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


</script>

<style scoped lang='less'>
.n-card {
  height: 100vh;
  margin-bottom: 80px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>
