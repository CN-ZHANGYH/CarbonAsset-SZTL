<template>
  <div class="HeadNav">
    <div class="logo">
      <img src="../../assets/logo.png" alt="" style="width: 150px;height: 60px">
    </div>

    <div class="user">
      <n-dropdown
          :options="options"
          placement="bottom-start"
          trigger="click"
          @select="handleSelect"
      >
        <n-button>
          <n-avatar round size="small" :src="imageUrl || defaultAvatar" />
          企业资料
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<script setup>
import { NIcon, NMenu  } from 'naive-ui';
import { h, defineComponent, ref, onMounted } from 'vue'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from "@vicons/ionicons5";
import router from "../../router/router.js";
import useUserStore from "../../store/modules/user.js";

const defaultAvatar = '/src/assets/avatar.png' // 默认头像的路径

const imageUrl = ref("")

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

// 下拉菜单
const options = [
  {
    label: "用户资料",
    key: "profile",
    icon: renderIcon(UserIcon)
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogoutIcon)
  }
]

function handleSelect(key){
  if (key === 'logout'){
    useUserStore().logOut().then(() => {
      router.push("/Login")
      window.$message.success("退出登录")
    })
  }else if (key === 'profile'){
    router.push("/PersonalHome/InquireQualification")
  }
}

onMounted(() => {
  imageUrl.value = JSON.parse(localStorage.getItem("user")).avatar
})
</script>

<style lang="less" scoped>
.HeadNav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  background: #fff;
  height: 70px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  .logo {
    width: 280px;
    img {
      margin-left: 30px;
    }
  }
  .nav {
    width: 900px;
    .n-menu {
      font-size: 15px;
    }
  }
  .user {
    width: 150px;
    .n-avatar {
      margin-right: 10px;
    }
  }
}
</style>
