<script setup lang="ts">
import { ref, computed } from 'vue'
import { auroraBoatTheme } from '@/assets/theme.ts'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue'

const cols = [
  { title:'域名', dataIndex:'domain', key:'domain', width:'65%'  },
  { title:'操作', key:'actions', width:'30%'  },
]

type Row = { id:string|number; domain:string }

const rows = ref<Row[]>([
  { id: 1, domain: 'cheater.netmc.icu' },
  { id: 2, domain: 'cheater.netmc.icu' },
])

const selectedRowKeys = ref<(string|number)[]>([])
const onSelectChange = (k:(string|number)[]) => selectedRowKeys.value = k

const editingId = ref<string|number|null>(null)
const isNew = ref<Record<string|number, boolean>>({})
const rowCls = (r:Row)=> r.id===editingId.value ? 'is-editing' : ''
const expKeys = computed(()=> editingId.value ? [editingId.value] : [])

const addDomain = () => {
  if (editingId.value) return
  const id = `new_${Date.now()}`
  rows.value.unshift({ id, domain: '' })
  isNew.value[id] = true
  editingId.value = id
}

const save = (rec:Row) => { if(!rec.domain) return; editingId.value=null }
const cancel = (rec:Row) => {
  if (isNew.value[rec.id]) {
    rows.value = rows.value.filter(x=>x.id!==rec.id)
    delete isNew.value[rec.id]
  }
  editingId.value = null
}

const search = ref('')
</script>

<template>
  <main>
    <a-config-provider :theme="auroraBoatTheme"/>

    <a-row :gutter="[16,16]">
      <a-col span="24">
        <a-alert
          message="建站是指将域名绑定到指定主机，并通过反向代理程序将访问请求转发至对应的服务，从而实现用户可通过域名访问网站资源的过程。"
          type="info" show-icon closable style="border-radius:2px;padding:12px"
        />
      </a-col>

      <a-col span="24">
        <div class="control">
          <div class="tools">
            <a-button type="primary" @click="addDomain">绑定域名</a-button>
            <a-button type="primary" danger :disabled="!selectedRowKeys.length">删除</a-button>
            <a-button><ReloadOutlined /></a-button>
            <a-typography-text type="secondary">总可绑定域名数目：20000，已绑定域名数：322</a-typography-text>
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
          :row-selection="{ selectedRowKeys:selectedRowKeys, onChange:onSelectChange }"
          rowKey="id"
          size="middle"
          :pagination="false"
          class="site-table"
          tableLayout="fixed"
          :expandedRowKeys="expKeys"
          :expandIconColumnIndex="-1"
          :rowClassName="rowCls"
        >
          <template #expandedRowRender="{ record }">
            <transition name="fade-slide">
              <div v-if="record.id===editingId" class="row-note">
                <div class="note-title">建站域名</div>
                <div class="note-text">您网站的域名，请输入到此地。</div>
              </div>
            </transition>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key==='domain'">
              <a-input
                v-if="editingId===record.id"
                v-model:value="record.domain"
                placeholder="请输入"
              />
              <span v-else>{{ record.domain }}</span>
            </template>

            <span v-else-if="column.key==='actions'">
              <template v-if="editingId===record.id">
                <a-button type="primary" size="small" @click="save(record)" style="border-radius:2px">保存</a-button>
                <a-divider type="vertical"/>
                <a-button size="small" style="border-radius:2px" @click="cancel(record)">取消</a-button>
              </template>
              <template v-else>
                <a-popconfirm title="确认删除？">
                  <a-button type="link" size="small">删除</a-button>
                </a-popconfirm>
              </template>
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

.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from,
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }


:deep(.ant-table-expanded-row){ transition: all linear .2s; background-color:#f0f2ff }
:deep(.ant-table .is-editing > td){ transition: all linear .2s; background-color:#f0f2ff !important }
:deep(tr.ant-table-expanded-row > td.ant-table-cell){ transition: all linear .2s; background-color:transparent !important }


.row-note{ background:#f0f2ff; margin:0; padding:2px 80px 24px 5%; border-radius:2px }
.note-title{ font-weight:600; font-size:20px; margin-bottom:6px }
.note-text{ color:#595959; line-height:1.7; font-size:14px }


main{ padding-top:10px; background:#f3f3f3 }
.control{ display:flex; align-items:center }
.tools{ display:flex; align-items:center; gap:16px }
.blank{ flex:1 1 auto }


.pag{ display:flex; justify-content:flex-end; align-items:center }
:deep(.ant-pagination-item),
:deep(.ant-pagination-prev .ant-pagination-item-link),
:deep(.ant-pagination-next .ant-pagination-item-link){ border-radius:8px !important }
</style>
