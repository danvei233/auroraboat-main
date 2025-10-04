<script setup lang="ts">
import { ref, computed } from 'vue'
import { auroraBoatTheme } from '@/assets/theme.ts'
import { ReloadOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons-vue'

const cols = [
  { title:'协议类型', dataIndex:'proto',   key:'proto',    width:'14%' },
  { title:'方向',     dataIndex:'dir',     key:'dir',      width:'12%' },
  { title:'策略',     dataIndex:'policy',  key:'policy',   width:'14%' },
  { title:'端口',     dataIndex:'port',    key:'port',     width:'15%' },
  { title:'IP',       dataIndex:'ip',      key:'ip',       width:'15%' },
  { title:'优先级',   dataIndex:'priority',key:'priority', width:'10%'  },
  { title:'操作',     key:'actions',       width:'15%' },
]

const rows = ref([
  {id:1,proto:'全部',dir:'入',policy:'允许',port:'ANY', ip:'ANY',        priority:1},
  {id:2,proto:'TCP', dir:'出',policy:'允许',port:'3306',ip:'43.22.11.43',priority:1},
  {id:3,proto:'全部',dir:'入',policy:'拒绝',port:'3389',ip:'32.21.68.77',priority:2},
  {id:4,proto:'UDP', dir:'出',policy:'拒绝',port:'ANY', ip:'ANY',        priority:1},
  {id:5,proto:'ICMP',dir:'入',policy:'允许',port:'ANY', ip:'ANY',        priority:1},
])

const selectedRowKeys = ref<(number|string)[]>([])
const rowSel = { selectedRowKeys:selectedRowKeys.value, onChange:(k:(number|string)[])=>selectedRowKeys.value=k }

const editingId = ref<number|string|null>(null)
const isNewMap = ref<Record<string|number,boolean>>({})
const rowCls = (r:any)=> r.id===editingId.value ? 'is-editing' : ''
const expKeys = computed(()=> editingId.value ? [editingId.value] : [])

const addPolicy = () => {
  if (editingId.value!=null) return
  const id = `new_${Date.now()}`
  rows.value.unshift({id,proto:'全部',dir:'入',policy:'允许',port:'ANY',ip:'ANY',priority:1})
  isNewMap.value[id]=true
  editingId.value=id
  focusKey.value='proto'
}
const save = (rec:any) => { editingId.value=null }
const cancel = (rec:any) => {
  const id=rec.id
  if (isNewMap.value[id]) { rows.value = rows.value.filter(x=>x.id!==id); delete isNewMap.value[id] }
  editingId.value=null
}

const dirFilter = ref<string>(); const policyFilter = ref<string>(); const protoFilter = ref<string>()
const okTagStyle  = { color:'#52c41a', background:'#f6ffed', borderColor:'#b7eb8f' }
const badTagStyle = { color:'#ff4d4f', background:'#fff1f0', borderColor:'#ffa39e' }

const focusKey = ref<'proto'|'dir'|'policy'|'port'|'ip'|'priority'|''>('')
const tips:any = {
  proto:{title:'协议类型',text:'选择协议：全部/TCP/UDP/ICMP。与业务实际传输层协议一致。'},
  dir:{title:'方向',text:'入=外部到实例；出=实例到外部。按最小权限配置。'},
  policy:{title:'策略',text:'允许/拒绝。优先匹配高优先级规则，命中即停止。'},
  port:{title:'端口',text:'可填具体端口或 ANY；范围 1-65535。多端口请拆分规则。'},
  ip:{title:'IP',text:'可为具体地址或 ANY；支持公网或内网段，避免过大暴露面。'},
  priority:{title:'优先级',text:'数字越小优先级越高，建议关键规则优先级更高。'}
}
const curTip = computed(()=> tips[focusKey.value||'proto'])
</script>

<template>
  <main>
    <a-config-provider :theme="auroraBoatTheme"/>

    <a-row :gutter="[16,16]">
      <a-col span="24">
        <a-alert
          message="“防火墙”是一种网络安全屏障，用来控制数据的进出规则，通过端口、IP 或协议的过滤，阻止非法访问并保护系统免受攻击。"
          type="info" show-icon closable style="border-radius:2px;padding:12px"
        />
      </a-col>

      <a-col span="24">
        <div class="control">
          <div class="tools">
            <a-button type="primary" @click="addPolicy">添加策略</a-button>
            <a-button type="primary" danger :disabled="!selectedRowKeys.length">删除</a-button>
            <a-button><ReloadOutlined /></a-button>
            <a-typography-text type="secondary">创建策略数：322</a-typography-text>
          </div>
          <div class="blank"></div>
          <a-select v-model:value="dirFilter" placeholder="方向" style="width:100px;margin-right:8px">
            <a-select-option value="入">入</a-select-option>
            <a-select-option value="出">出</a-select-option>
          </a-select>
          <a-select v-model:value="policyFilter" placeholder="策略" style="width:100px;margin-right:8px">
            <a-select-option value="允许">允许</a-select-option>
            <a-select-option value="拒绝">拒绝</a-select-option>
          </a-select>
          <a-select v-model:value="protoFilter" placeholder="类型" style="width:100px;margin-right:8px">
            <a-select-option value="全部">全部</a-select-option>
            <a-select-option value="TCP">TCP</a-select-option>
            <a-select-option value="UDP">UDP</a-select-option>
            <a-select-option value="ICMP">ICMP</a-select-option>
          </a-select>
          <a-input placeholder="请输入你需要搜索的内容" style="max-width:352px">
            <template #suffix><SearchOutlined/></template>
          </a-input>
        </div>
      </a-col>

      <a-col span="24">
        <a-table
          :columns="cols"
          :data-source="rows"
          :row-selection="rowSel"
          rowKey="id"
          size="middle"
          :pagination="false"
          class="fw-table"
          tableLayout="fixed"
          :expandedRowKeys="expKeys"
          :expandIconColumnIndex="-1"
          :rowClassName="rowCls"
        >
          <template #headerCell="{ column }">
            <span v-if="column.key==='dir'">方向 <a-tooltip title="入=进入实例的流量；出=从实例发出的流量"><InfoCircleOutlined style="color:#8c8c8c"/></a-tooltip></span>
            <span v-else-if="column.key==='priority'">优先级 <a-tooltip title="数值越小优先级越高"><InfoCircleOutlined style="color:#8c8c8c"/></a-tooltip></span>
            <span v-else>{{ column.title }}</span>
          </template>

          <template #expandedRowRender="{ record }">
            <transition name="fade-slide">
              <div v-if="record.id===editingId" class="row-note">
                <div class="note-title">{{ curTip.title }}</div>
                <div class="note-text">{{ curTip.text }}</div>
              </div>
            </transition>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="record.id===editingId && column.key==='proto'">
              <a-select v-model:value="record.proto" style="width:100%" @focus="focusKey='proto'">
                <a-select-option value="全部">全部</a-select-option>
                <a-select-option value="TCP">TCP</a-select-option>
                <a-select-option value="UDP">UDP</a-select-option>
                <a-select-option value="ICMP">ICMP</a-select-option>
              </a-select>
            </template>

            <template v-else-if="record.id===editingId && column.key==='dir'">
              <a-select v-model:value="record.dir" style="width:100%" @focus="focusKey='dir'">
                <a-select-option value="入">入</a-select-option>
                <a-select-option value="出">出</a-select-option>
              </a-select>
            </template>

            <template v-else-if="record.id===editingId && column.key==='policy'">
              <a-select v-model:value="record.policy" style="width:100%" @focus="focusKey='policy'">
                <a-select-option value="允许">允许</a-select-option>
                <a-select-option value="拒绝">拒绝</a-select-option>
              </a-select>
            </template>

            <template v-else-if="record.id===editingId && column.key==='port'">
              <a-input v-model:value="record.port" allow-clear @focus="focusKey='port'"/>
            </template>

            <template v-else-if="record.id===editingId && column.key==='ip'">
              <a-input v-model:value="record.ip" allow-clear @focus="focusKey='ip'"/>
            </template>

            <template v-else-if="record.id===editingId && column.key==='priority'">
              <a-input-number v-model:value="record.priority" :min="1" :max="100" style="width:100%" @focus="focusKey='priority'"/>
            </template>

            <template v-else-if="column.key==='policy'">
              <a-tag :style="record.policy==='允许'?okTagStyle:badTagStyle">{{ record.policy }}</a-tag>
            </template>

            <span v-else-if="column.key==='actions'">
              <template v-if="record.id===editingId">
                <a-button type="primary" size="small" @click="save(record)" style="border-radius:2px">保存</a-button>
                <a-divider type="vertical"/>
                <a-button size="small" style="border-radius:2px" @click="cancel(record)">取消</a-button>
              </template>
              <template v-else>
                <a-popconfirm title="确认删除？">
                  <a-button type="link" danger size="small">删除</a-button>
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
main{padding-top:10px;background:#f3f3f3}
.control{display:flex;align-items:center}
.tools{display:flex;align-items:center;gap:16px}
.blank{flex:1 1 auto}




.pag{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}


:deep(.ant-table-expanded-row){
  transition: all linear .2s;
  background-color:  #f0f2ff
}
:deep(.ant-table .is-editing > td) {
  transition: all linear .2s;
  background-color: #f0f2ff !important;
}

:deep(tr.ant-table-expanded-row > td.ant-table-cell) {
  transition: all linear .2s;
  background-color: transparent !important;

}



.row-note {
  background: #f0f2ff;
  margin:0;/* 浅蓝底 */
  padding: 2px 80px 24px 5%;
  border-radius: 2px;
}

.note-title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 6px;
}

.note-text {
  color: #595959;

  line-height: 1.7;
  font-size: 14px;
}


.port {
  display: flex;
  align-items: center;
  gap: 4px;
}


</style>
