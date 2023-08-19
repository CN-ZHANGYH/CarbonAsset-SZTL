<template>
  <div ref="main" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";
import {getOwnerTxAndSellerList} from "../../../api/data.js";
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value

const timer = ref([])
const txDataOption = reactive({
    txOption: {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
            text: '本周碳交易概览'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['购买', '出售']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '购买',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [0,0,0,0,0,0]
            },
            {
                name: '出售',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(0, 221, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(77, 119, 255)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [0,0,0,0,0,0,0]
            },
        ]
    }
})
const enterprise = JSON.parse(localStorage.getItem("user")).nickName
const {txOption} = toRefs(txDataOption)
function init() {
    // 初始化碳足迹
    getOwnerTxAndSellerList({enterprise: enterprise}).then(res => {
        txOption.value.series[1].data = res.tData
        txOption.value.series[0].data = res.sData
        var footChart = echarts.init(main.value)
        footChart.setOption(txOption.value)
    })
}

function loadEcharts(){
    getOwnerTxAndSellerList({enterprise: enterprise}).then(res => {
        txOption.value.series[1].data = res.tData
        txOption.value.series[0].data = res.sData
    })
}

onMounted(
    () => {
        init()
        timer.value.push(setInterval(loadEcharts,1000))
    }
)
onUnmounted(() => {
    for (const timerElement of timer.value) {
        clearInterval(timerElement)
    }
    timer.value=[]
})
</script>

<style scoped>
</style>

