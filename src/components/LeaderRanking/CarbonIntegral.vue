<template>
  <n-card>您所在的碳积分排名：{{creditRanking}}</n-card>
  <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
  />
</template>

<script setup>
import {getEnterpriseRanking, getRankingByCredit} from "../../api/credit.js";
import {NAvatar, NTag} from "naive-ui";
const creditRanking = ref(0)
const data = ref([])
const  columns = reactive([
    {
        title: '头像',
        key: 'avatar',
        render(row){
            return h(
                NAvatar,
                {
                    bordered: true,
                    round: true,
                    src: row.avatar
                }
            )
        }
    },
    {
        title: '企业名称',
        key: 'enterprise_name'
    },
    {
        title: '账户地址',
        key: 'enterprise_address',
        render(row) {
          return h(
              NTag,
              {
                type: 'info',
                bordered: false,
              },
              {
                default: () =>  row.enterprise_address
              }
          );
        }
    },
    {
        title: '认证状态',
        key: 'enterprise_verified',
        render(row){
            return h(
                NTag,
                {
                    type: row.enterprise_verified == 0 ? 'error' : 'success',
                    bordered: true,
                    round: true
                },
                {
                    default: () => row.enterprise_verified == 0 ? '未认证' : '已认证'
                }
            )
        }
    },
    {
        title: '积分总量',
        key: 'enterprise_carbon_credits'
    }
])
const enterpriseName = JSON.parse(localStorage.getItem("user")).nickName
getEnterpriseRanking({enterprise: enterpriseName}).then(res => {
    creditRanking.value = res.cRanking
})

function getRanking(){
    getRankingByCredit({
        page: 0,
        pageSize: 10
    }).then(res => {
        data.value = res.data
    })
}

getRanking()
</script>

<style lang="less" scoped>
.n-card {
  margin-bottom: 10px;
}
</style>
