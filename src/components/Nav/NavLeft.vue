<template>
  <n-menu
      :inverted="inverted"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="transformedMenuOptions"
      accordion
      style="height: 100%"
  />
</template>

<script lang="ts">
import { RouterLink } from "vue-router";
import { h, defineComponent, ref, Component } from 'vue'
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import {
  SpeedometerOutline as SpeedOutline,
  NewspaperOutline as NewspaperIcon,
  ReceiptOutline as ReceiptIcon,
  WalletOutline as WalletIcon,
  SearchOutline as SearchIcon,
  RibbonOutline as RibbonIcon,
  BagHandleOutline as BagHandleIcon
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, () => [h(icon)]);
}

const menuOptions: MenuOption[] =  [
  {
    label: '首页',
    key: 'Dashboard',
    icon: renderIcon(SpeedOutline),
    children: [
      {
        label: '主控台',
        key: 'MasterConsole',
      },
      {
        label: '工作台',
        key: 'WorkConsole',
      }
    ],
  },
  {
    label: '企业资质',
    key: 'Firm',
    icon: renderIcon(NewspaperIcon),
    children: [
      {
        label: '企业上传资质',
        key: 'UploadQualification',
      },
      {
        label: '企业信息',
        key: 'InquireQualification',
      }
    ],
  },
  {
    label: '碳排放',
    key: 'Carbon',
    icon: renderIcon(ReceiptIcon),
    children: [
      {
        label: '申请碳排放额度',
        key: 'ApplicationCarbon',
      },
      {
        label: '碳排放进度',
        key: 'GenerateCarbon',
      },
    ],
  },
  {
    label: '碳交易',
    key: 'Trading',
    icon: renderIcon(WalletIcon),
    children: [
      {
        label: '购买碳排放额度',
        key: 'BuyCarbon',
      },
      {
        label: '出售碳排放额度',
        key: 'SellingCarbon',
      }
    ],
  },
  {
    label: '纪念卡',
    key: 'Card',
    icon: renderIcon(BagHandleIcon),
    children: [
      {
        label: '纪念卡商店',
        key: 'CarbonCertificate',
      },
      {
        label: '个人纪念卡',
        key: 'PersionCard',
      }
    ],
  },
  {
    label: '个人查询',
    key: 'Inquire',
    icon: renderIcon(SearchIcon),
    children: [
      {
        label: '碳排放记录',
        key: 'QueryCarbonHistory',
      },
      {
        label: '交易记录',
        key: 'QueryTransaction',
      },
      {
        label: '出售记录',
        key: 'QuerySellerHistory',
      },
    ],
  },
  {
    label: '排行榜',
    key: 'Leader',
    icon: renderIcon(RibbonIcon)
  },
]

function transformMenuOptions(options) {
  return options.map(option => {
    if (option.children) {
      const transformedChildren = transformMenuOptions(option.children);
      return {
        ...option,
        children: transformedChildren
      };
    } else {
      if (!option.children) {
        return {
          ...option,
          icon: option.icon,
          label: () => h(RouterLink, { to: `/PersonalHome/${option.key}`, onClick: () => console.log(option) }, [
            option.label
          ])
        };
      }
      return {
        label: () => h(RouterLink, { to: `/${option.key}`, onClick: () => console.log(option) }, option.label),
        key: option.key
      };
    }
  });
}

const transformedMenuOptions = transformMenuOptions(menuOptions);

export default defineComponent({
  setup() {
    return {
      inverted: ref(false),
      menuOptions,
      transformedMenuOptions
    }
  }
})
</script>
