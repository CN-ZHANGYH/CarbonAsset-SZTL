<template>
  <n-grid :x-gap="30">
    <n-grid-item :span="16">
      <n-data-table
          :columns="columns"
          :data="data"
          :bordered="false"
      />
    </n-grid-item>
    <n-grid-item :span="7">
      <div ref="resourceType" id="resourceType" style="width: 100%;height: 400px"></div>
    </n-grid-item>
  </n-grid>
</template>

<script  setup>
import {getNewTxList} from "../../../api/transaction.js";
import {getResourceTypeList} from "../../../api/data.js";
import {NTag} from 'naive-ui'
import * as echarts from "echarts";
const data = ref([])
const columns = ref([
  {
    title: "交易名称",
    key: "transactionOrderName"
  },
  {
    title: "交易Hash",
    key: "txHash",
    render(row){
      return h(
          NTag,
          {
            type: 'success',
            bordered: false
          },
          {
            default: () => ellipsisText(row.txHash)
          }
      )
    }
  },
  {
    title: "买家地址",
    key: "buyAddress",
    render(row){
      return h(
          NTag,
          {
            type: 'error',
            bordered: false
          },
          {
            default: () => ellipsisText(row.buyAddress)
          }
      )}
  },
  {
    title: "卖家地址",
    key: "sellerAddress",
    render(row){
      return h(
          NTag,
          {
            type: 'error',
            bordered: false
          },
          {
            default: () => ellipsisText(row.sellerAddress)
          }
      )}  },
  {
    title: "交易数量",
    key: "transactionQuantity"
  },
  {
    title: "交易时间",
    key: "transactionTime"
  }
])
const resourceState = reactive({
  option: {
    title: {
      text: '排放资源占比'
    },
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: []
      }
    ]
  }
})
const {option} = toRefs(resourceState)
const timer = ref([])
getNewTxList().then(res => {
  console.log(res)
  data.value = res.data
})

function ellipsisText(val){
  return val.substring(0,15) + '...'
}

const init = () => {
  // 初始化饼状图
  getResourceTypeList().then(res => {
    option.value.series[0].data = res.data

    var resourceChart = echarts.init(document.getElementById("resourceType"))
    // 指定图表的配置项
    resourceChart.setOption(option.value)
  })
}
onMounted(() => {
  init()
  timer.value.push(setInterval(init,1000))
})

onUnmounted(() => {
  for (const timerElement of timer.value) {
    clearInterval(timerElement)
  }
  timer.value=[]
})

</script>

<style scoped>
</style>

