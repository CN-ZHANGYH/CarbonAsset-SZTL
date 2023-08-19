<template>
  <div ref="main" style="width: 95%; height: 350px"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";
import {getTotalTxAndEmission} from "../../../api/data.js";
const main = ref() // 使用ref创建虚拟DOM引用，使用时用main.value
const option = reactive({
  txAndEmDataOpt: {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgb(2,2,2)",
        fontSize: "12"
      }
    },
    grid: {
      top: '30',
      left: '10',
      right: '30',
      bottom: '10',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
      axisLabel: {
        textStyle: {
          color: "rgb(2,2,2)",
          fontSize: 12
        }
      },
      // x轴线的颜色为   rgba(255,255,255,.2)
      axisLine: {
        lineStyle: {
          color: "rgb(2,2,2)"
        }
      },
      data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"]
    }],
    yAxis: [{
      type: 'value',
      axisTick: {
        // 不显示刻度线
        show: true
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)"
        }
      },
      axisLabel: {
        textStyle: {
          color: "rgb(2,2,2)",
          fontSize: 12
        }
      },
      // 修改分割线的颜色
      splitLine: {
        lineStyle: {
          color: "rgba(161,161,161,0.54)"
        }
      }
    }],
    series: [{
      name: '交易数量统计',
      type: 'line',
      smooth: true,
      lineStyle: {
        color: "#0184d5",
        width: 2
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [{
              offset: 0,
              color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
            },
              {
                offset: 0.8,
                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
              }
            ],
            false
        ),
        shadowColor: "rgba(0, 0, 0, 0.1)"
      },
      // 拐点设置为小圆点
      symbol: 'circle',
      // 设置拐点大小
      symbolSize: 5,
      // 开始不显示拐点， 鼠标经过显示
      showSymbol: false,
      // 设置拐点颜色以及边框
      itemStyle: {
        color: "#0184d5",
        borderColor: "rgba(221, 220, 107, .1)",
        borderWidth: 12
      },
      data: []
    },
      {
        name: "碳排放数量统计",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [{
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                  {
                    offset: 0.8,
                    color: "rgba(0, 216, 135, 0.1)"
                  }
                ],
                false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        data: []
      },
      {
        name: "企业认证情况",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "#d8003a",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [{
                  offset: 0,
                  color: "rgb(255,88,133)"
                },
                  {
                    offset: 0.8,
                    color: "rgb(245,150,175)"
                  }
                ],
                false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#f1295d",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        data: []
      }
    ]
  }
})
const timer = ref([])

const {txAndEmDataOpt} = toRefs(option)

function init() {
  // 初始化碳足迹
  getTotalTxAndEmission().then(res => {
    txAndEmDataOpt.value.series[0].data = res.txData
    txAndEmDataOpt.value.series[1].data = res.emData
    txAndEmDataOpt.value.series[2].data = res.quData
    var footChart = echarts.init(main.value)
    footChart.setOption(txAndEmDataOpt.value)
  })
}

function loadEcharts(){
  getTotalTxAndEmission().then(res => {
    txAndEmDataOpt.value.series[0].data = res.txData
    txAndEmDataOpt.value.series[1].data = res.emData
    txAndEmDataOpt.value.series[2].data = res.quData
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

