<template>
  <n-card>您所在的碳排放排名：{{ resourceRanking }}</n-card>
  <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
  />
</template>

<script setup>
import {getEnterpriseEmissionRanking, getRankingByEmission} from "../../api/emissionresource.js";
import {NAvatar, NTag} from "naive-ui";
const resourceRanking = ref(0)
const enterpriseName = JSON.parse(localStorage.getItem("user")).nickName
const columns = reactive([
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
        key: 'enterprise_name',
    },
    {
        title: '企业地址',
        key: 'enterprise_address',
        render(row) {
          return h(
              NTag,
              {
                type: 'success',
                bordered: false,
              },
              {
                default: () =>  row.enterprise_address
              }
          );
        }
    },
    {
        title: '积分',
        key: 'enterprise_carbon_credits',
    },
    {
        title: '总需排放量',
        key: 'enterprise_total_emission',
    },
    {
        title: '总排放量',
        key: 'total_emissions',
    }
])
const data = ref([])

getEnterpriseEmissionRanking({enterprise: enterpriseName}).then(res => {
    resourceRanking.value = res.rRanking
})

function getRanking(){
    getRankingByEmission({
        page: 0,
        pageSize: 10
    }).then(res => {
        console.log(res.data)
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
