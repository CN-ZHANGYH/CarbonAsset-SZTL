<template>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :columns="columns"
        :data="data"
    />
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NTag, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

type RowData = {
  key: number
  name: string
  time: string
  tags: string[]
}

const createColumns = ({
                         sendMail
                       }: {
  sendMail: (rowData: RowData) => void
}): DataTableColumns<RowData> => {
  return [
    {
      title: '名称',
      key: 'name'
    },
    {
      title: '时间',
      key: 'time'
    },
    {
      title: '状态',
      key: 'tags',
      render(row) {
        const tags = row.tags.map((tagKey) => {
          let tagType = ''
          if (tagKey === '成功') {
            tagType = 'success'
          } else if (tagKey === '失败') {
            tagType = 'error'
          } else if (tagKey === '审核中') {
            tagType = 'warning'
          }
          return h(
              NTag,
              {
                style: {
                  marginRight: '6px'
                },
                type: tagType,
                bordered: false
              },
              {
                default: () => tagKey
              }
          )
        })
        return tags
      }
    }
  ]
}

const createData = (): RowData[] => [
  {
    key: 0,
    name: '电冰箱碳排放申请表',
    time: '2023-7-19',
    tags: ['成功']
  },
  {
    key: 1,
    name: '电风扇碳排放申请表',
    time: '2023-7-20',
    tags: ['失败']
  },
  {
    key: 2,
    name: '电热水器碳排放申请表',
    time: '2023-7-23',
    tags: ['失败']
  },
  {
    key: 3,
    name: '电视机碳排放申请表',
    time: '2023-7-22',
    tags: ['审核中']
  },
  {
    key: 4,
    name: '洗衣机碳排放申请表',
    time: '2023-7-25',
    tags: ['审核中']
  },
  {
    key: 5,
    name: '电脑碳排放申请表',
    time: '2023-7-24',
    tags: ['失败']
  },
  {
    key: 6,
    name: '笔记本碳排放申请表',
    time: '2023-7-24',
    tags: ['失败']
  }
]

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      data: createData(),
      columns: createColumns({
        sendMail(rowData) {
          message.info('send mail to ' + rowData.name)
        }
      })
    }
  }
})
</script>

<style lang="less" scoped>
.n-space {
  height: 460px;
}
</style>
