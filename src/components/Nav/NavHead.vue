<template>
  <div class="HeadNav">
    <div class="logo">
      <img src="../../assets/logo.png" alt="">
    </div>

    <div class="user">
      <n-dropdown
          :options="options"
          placement="bottom-start"
          trigger="click"
          :render-label="renderDropdownLabel"
          :render-icon="renderDropdownIcon"
      >
        <n-button>
          <n-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          企业资料
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { NIcon, NMenu  } from 'naive-ui';
import { h, defineComponent } from 'vue'
import type { VNodeChild } from 'vue'
import type { DropdownOption } from 'naive-ui'
import {LogOutOutline as LogoutIcon} from '@vicons/ionicons5'
import {RouterLink} from "vue-router";


// 下拉菜单
const options = [
  {
    label: '退出账户',
    key: 'logout',
    route: '/login'
  }
]

export default defineComponent({
  components: {
    NMenu
  },
  setup () {
    return {
      options,
      renderDropdownLabel (option: DropdownOption) {
        if (option.type === 'group') {
          return option.label as VNodeChild
        }
        return h(RouterLink, { to: '/login' },
            {
              default: () => option.label as VNodeChild
            }
        )
      },
      renderDropdownIcon () {
        return h(NIcon, null, {
          default: () => h(LogoutIcon)
        })
      }
    }
  }
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
