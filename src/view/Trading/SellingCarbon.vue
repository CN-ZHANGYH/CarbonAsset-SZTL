<template>
  <n-card title="出售碳资产">
    <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
    />
  </n-card>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

type Song = {
  id: number
  name: string
  Fname: string
  address: string
  num: string
}

const createColumns = ({
                         play
                       }: {
  play: (row: Song) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: '资质id',
      key: 'id'
    },
    {
      title: '资质名称',
      key: 'name'
    },
    {
      title: '企业名称',
      key: 'Fname'
    },
    {
      title: '企业地址',
      key: 'address'
    },
    {
      title: '出售量',
      key: 'num'
    },
    {
      title: '操作',
      key: '操作',
      render (row) {
        return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => play(row)
            },
            { default: () => '出售' }
        )
      }
    }
  ]
}

const data: Song[] = [
  { id: 1, name: '王老吉',Fname:'王老吉有限公司',address:'1213asdasdada',num: '10' },
  { id: 2, name: '王老吉',Fname:'王老吉有限公司',address:'1213asdasdada',num: '10' },
  { id: 4, name: '王老吉',Fname:'王老吉有限公司',address:'1213asdasdada',num: '10' }

]

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      data,
      columns: createColumns({
        play (row: Song) {
          message.success('出售成功')
        }
      }),
      pagination: false as const
    }
  }
})
</script>

<style lang="less" scoped>
.n-card {
  height: 100vh;
  margin-bottom: 80px;
}
</style>
