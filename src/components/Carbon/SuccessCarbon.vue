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
import { NTag, NButton, useMessage, useDialog } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

type RowData = {
  key: number
  name: string
  time: string
  tags: string[]
  details: any // 添加 details 字段
}

const createColumns = ({
                         sendMail,
                         handleViewDetails
                       }: {
  sendMail: (rowData: RowData) => void
  handleViewDetails: (rowData: RowData) => void // 添加 handleViewDetails 函数类型定义
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
      title: 'Tags',
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
    },
    /* 添加操作列 */
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
            NButton,
            {
              type: 'primary',
              size: 'small',
              onClick: () => handleViewDetails(row)
            },
            '查看详情'
        )
      }
    }
  ]
}

const createData = (): RowData[] => [
  {
    key: 0,
    name: '电冰箱碳排放申请表',
    time: '2023-7-19',
    tags: ['成功'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 1,
    name: '电风扇碳排放申请表',
    time: '2023-7-20',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 2,
    name: '电热水器碳排放申请表',
    time: '2023-7-23',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 3,
    name: '电视机碳排放申请表',
    time: '2023-7-22',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 4,
    name: '洗衣机碳排放申请表',
    time: '2023-7-25',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 5,
    name: '电脑碳排放申请表',
    time: '2023-7-24',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  }
]

export default defineComponent({
  setup() {
    const message = useMessage()

    const handleViewDetails = (rowData: RowData) => {
      const details = rowData.details
      Dialog.info({
        title: '详细信息',
        content: JSON.stringify(details),
        size: 'small'
      })
    }

    return {
      data: createData(),
      columns: createColumns({
        sendMail(rowData) {
          message.info('send mail to ' + rowData.name)
        },
        handleViewDetails
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
