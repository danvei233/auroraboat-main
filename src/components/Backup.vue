<!-- 备份列表 -->
<script setup lang="ts">
import { ref } from 'vue'
import { auroraBoatTheme } from '@/assets/theme.ts'
import { ReloadOutlined, SearchOutlined, LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'

type Row = { id:number|string; name:string; ts:string; status:'creating'|'ready'|'failed' }

const cols = [
  { title:'备份名称', dataIndex:'name', key:'name', width:'32%' },
  { title:'备份时间', dataIndex:'ts',   key:'ts',   width:'22%' },
  { title:'备份状态', dataIndex:'status', key:'status', width:'22%' },
  { title:'操作', key:'actions', width:'20%' },
]

const rows = ref<Row[]>([
  { id:1, name:'bak202583092311', ts:'2025-08-30 17:55:06', status:'creating' },
  { id:2, name:'bak202583023232', ts:'2025-08-30 16:25:36', status:'ready' },
  { id:3, name:'bak202583065757', ts:'2025-07-21 03:31:27', status:'ready' },
  { id:4, name:'bak202582023563', ts:'2025-06-20 16:00:36', status:'failed' },
  { id:5, name:'bak202483023232', ts:'2024-04-12 12:51:18', status:'ready' },
])

const selectedRowKeys = ref<(number|string)[]>([])
const onSelectChange = (k:(number|string)[]) => selectedRowKeys.value = k

const search = ref('')
const onReload = () => {}
const onCreate = () => {}
const onRestore = (r:Row) => {}
const onDelete = (r:Row) => {}
</script>

<template>
  <main>
    <a-config-provider :theme="auroraBoatTheme"/>

    <a-row :gutter="[16,16]">
      <a-col span="24">
        <a-alert
          message="备份是指通过定期或实时拷贝并保存系统、应用或数据的副本，以防止因硬件故障、误操作、病毒攻击或突发事件导致的数据丢失或服务中断，从而保障业务连续性与数据安全。"
          type="info" show-icon closable style="border-radius:2px;padding:12px"
        />
      </a-col>

      <a-col span="24">
        <div class="control">
          <div class="tools">
            <a-button type="primary" @click="onCreate">添加备份</a-button>
            <a-button type="primary" danger :disabled="!selectedRowKeys.length">删除</a-button>
            <a-button @click="onReload"><ReloadOutlined/></a-button>
            <a-typography-text type="secondary">总可创建备份数目：20000，已创建备份数：322</a-typography-text>
          </div>
          <div class="blank"></div>
          <a-input v-model:value="search" placeholder="请输入你需要搜索的内容" style="max-width:352px">
            <template #suffix><SearchOutlined/></template>
          </a-input>
        </div>
      </a-col>

      <a-col span="24">
        <a-table
          :columns="cols"
          :data-source="rows"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          rowKey="id"
          size="middle"
          :pagination="false"
          class="bk-table"
          tableLayout="fixed"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key==='status'">
              <a-tag v-if="record.status==='creating'" class="tag tag-warn"><LoadingOutlined class="ico" spin/>创建中</a-tag>
              <a-tag v-else-if="record.status==='ready'" class="tag tag-ok"><CheckCircleOutlined class="ico"/>待恢复</a-tag>
              <a-tag v-else class="tag tag-bad"><CloseCircleOutlined class="ico"/>创建失败</a-tag>
            </template>

            <span v-else-if="column.key==='actions'">
              <a-button type="link" size="small" @click="onRestore(record)" :disabled="record.status!=='ready'">恢复</a-button>
              <a-divider type="vertical"/>
              <a-popconfirm title="确认删除？" @confirm="onDelete(record)">
                <a-button type="link" danger size="small">删除</a-button>
              </a-popconfirm>
            </span>

            <span v-else>{{ record[column.dataIndex] }}</span>
          </template>
        </a-table>
      </a-col>

      <a-col span="24">
        <div class="pag">
          <a-pagination :current="5" :total="100" :pageSize="10" show-less-items/>
        </div>
      </a-col>
    </a-row>
  </main>
</template>

<style scoped>
main{padding-top:10px;background:#f3f3f3}
.control{display:flex;align-items:center}
.tools{display:flex;align-items:center;gap:16px}
.blank{flex:1 1 auto}



.tag{border:1px solid transparent}
.tag-ok{color:#52c41a;background:#f6ffed;border-color:#b7eb8f}
.tag-warn{color:#faad14;background:#fffbe6;border-color:#ffe58f}
.tag-bad{color:#ff4d4f;background:#fff1f0;border-color:#ffa39e}
.ico{margin-right:4px}

.pag{display:flex;justify-content:flex-end;align-items:center}
:deep(.ant-pagination-item),
:deep(.ant-pagination-prev .ant-pagination-item-link),
:deep(.ant-pagination-next .ant-pagination-item-link){border-radius:8px!important}
</style>
