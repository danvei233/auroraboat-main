<script setup lang="ts">
import { ref, computed } from 'vue'
import { auroraBoatTheme } from '@/assets/theme.ts'
import { ReloadOutlined } from '@ant-design/icons-vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
const cols = [
  { title:'服务名称', dataIndex:'name', key:'name', width:'20%' },
  { title:'外网端口', dataIndex:'pub_port', key:'pubPort', width:'15%' },
  { title:'外网IP',   dataIndex:'pub_ip',   key:'pubIp', width:'15%' },
  { title:'内网端口', dataIndex:'pri_port', key:'priPort', width:'15%' },
  { title:'类型',     dataIndex:'kind', key:'kind', width:'15%' },
  { title:'操作', key:'actions', width:'15%'},
]

const editingId = ref(null)
const edit = rec => { editingId.value = rec.id }
const save = rec => { console.log("保存", rec); editingId.value = null }
const cancel = () => editingId.value = null

const rows = ref([
  {id:1,name:'Web-80',pub_port:32201,pub_ip:'1.2.3.4',pri_port:80,kind:'系统创建'},
  {id:2,name:'DB-5432',pub_port:30002,pub_ip:'1.2.3.4',pri_port:5432,kind:'自定义'},
])

const selectedRowKeys = ref([])
const rowSel = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (k)=>selectedRowKeys.value=k
}
   const expandedRowKeys = ref<Array<number|string>>([])                // keep if需要手动控制
   const rowCls = (record:any)=> record.id===editingId.value ? 'is-editing' : ''
   const expKeys = computed(() => editingId.value ? [editingId.value] : []) // CHANGED


     const focusKey = ref<'name'|'pubPort'|'priPort'|'pubIp'|'kind'|''>('')
  const tips = { // CHANGED
    name:{title:'服务名称',text:'用于标识该映射规则，建议简短、可读、含端口/用途信息。'}, // CHANGED
  pubPort:{title:'外网端口',text:'公网访问所用端口，应避开占用冲突；范围1-65535，常用80/443/30000+。'},
  priPort:{title:'内网端口',text:'内网服务实际监听端口，通常与程序配置一致；确保服务在目标主机已监听。'}, // CHANGED
  pubIp:{title:'外网IP',text:'出口IP，由平台分配或绑定，通常不可编辑；变更将影响外部访问入口。'}, // CHANGED
  kind:{title:'类型',text:'规则来源或类型：系统创建/自定义等，用于审计与策略区分。'} // CHANGED
} // CHANGED
const curTip = computed(()=> tips[focusKey.value||'name']) // CHANGED




</script>

<template>
  <main>
    <a-config-provider
      :theme="auroraBoatTheme"
    />

    <a-row :gutter="[16,16]" >
      <a-col span="24">
        <a-alert
          message="端口映射是一种网络地址转换（NAT）技术，通过在网关设备上建立端口与内网主机端口之间的对应关系，将来自公网特定端口的访问请求转发至内网指定主机和端口，从而实现外部用户对内网服务的安全、可控访问。"

          type="info"
          show-icon
          closable
          style="border-radius: 2px;padding: 12px"
        >
        </a-alert>
      </a-col>
      <a-col span="24">
        <div class="control">
        <div class="tools">
        <a-button type="primary">添加映射</a-button>
        <a-button type="primary" danger>删除</a-button>
        <a-button ><ReloadOutlined /></a-button>
        <a-typography-text type="secondary">总可映射端口数目：20000，已映射端口数：322</a-typography-text>
        </div>
          <div class="blank"></div>
          <a-input
            placeholder="请输入关键词"
            style="max-width: 352px"
          />
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
          class="nat-table"
          :expandedRowKeys="expKeys"
          :expandIconColumnIndex="-1"
        :rowClassName="rowCls"
        tableLayout="fixed"
        >

          <template #expandedRowRender="{ record }">
            <transition name="fade-slide">
            <div v-if="record.id===editingId" class="row-note">
                            <div class="note-title">{{ curTip.title }}</div>
                            <div class="note-text">{{ curTip.text }}</div>
                          </div>
            </transition>
          </template>

          <template #headerCell="{ column }">



            <span v-if="column.key==='pubPort'">外网端口 <a-tooltip title="公网映射端口"><InfoCircleOutlined style="color:#8c8c8c"  /></a-tooltip></span>
            <span v-else-if="column.key==='kind'">类型 <a-tooltip title="系统创建或用户创建"><InfoCircleOutlined style="color:#8c8c8c" /></a-tooltip></span>
            <span v-else>{{column.title}}</span>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key==='name'">


              <a-input  v-if="editingId===record.id" v-model:value="record.name"  @focus="focusKey='name'" />



              <span v-else>{{ record.name }}</span>
            </template>
            <template v-else-if="column.key==='pubPort'">
              <div   v-if="editingId===record.id" class="port">
              <a-input-number  controls :max="65535" :min="1" v-model:value="record.pub_port" style="width: 100%" @focus="focusKey='pubPort'"/>
                <a-button
                  v-if="editingId===record.id"
                  type="link"
                  class="dice-btn"

                  @click="record.pub_port = Math.floor(Math.random()*65535)+1"
                >
                  <img src="/dice.svg">
                </a-button>


              </div>
              <span v-else>{{ record.pub_port }}</span>
            </template>


            <template v-else-if="column.key==='priPort'">



              <a-input-number controls :max="65535" :min="1" v-if="editingId===record.id" v-model:value="record.pri_port" style="width: 100%"  @focus="focusKey='priPort'"/>





              <span v-else>{{ record.pri_port}}</span>
            </template>

            <template  v-else-if="column.key==='pubIp'" >
              <a-input disabled v-if="editingId===record.id" v-model:value="record.pub_ip" @focus="focusKey='pubIp'" />
              <span v-else>{{ record.pub_ip}}</span>
            </template>


            <template v-else-if="column.key==='kind'">

              <a-tag :color="record.kind==='系统创建'?'red':'blue'">{{ record.kind }}</a-tag>

            </template>



      <span v-else-if="column.key==='actions'">

        <span v-if="editingId===record.id">
      <a-button type="primary" size="small" @click="save(record)" style="border-radius: 2px">保存</a-button>
      <a-divider type="vertical"/>
      <a-button  size="small"  style="border-radius: 2px"  @click="cancel">取消</a-button>
    </span>
<span v-else>


        <a-button @click="edit(record)" type="link"  size="small" :disabled="record.kind==='系统创建'">编辑</a-button>
        <a-divider type="vertical"/>
        <a-popconfirm title="确认删除？" :disabled="record.kind==='系统创建'" @confirm="$emit('del',record.id)">
         <a-button type="link" danger  size="small" :disabled="record.kind==='系统创建'">
  删除
</a-button>
        </a-popconfirm>

 </span>


      </span>
            <span v-else>{{ record[column.dataIndex] }}</span>
          </template>

        </a-table>




      </a-col>

      <a-col span="24">
        <div class="pag">
        <a-pagination
          :current="5"
          :total="100"
          :pageSize="10"
          show-less-items
        />
        </div>
      </a-col>



    </a-row>

  </main>


</template>

<style scoped>
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

.dice-btn {
  position: absolute;
  right: 20%;

  padding: 0 6px;
  font-size: 16px;
  line-height: 1;
}



:deep(.ant-input-number-handler-wrap) {
  opacity: 1 !important;
  pointer-events: auto;
}
.blank{
  flex: 1 1 auto;
}
.control{
display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: stretch;
}
.tools{
 display: flex;
  align-items: center;
gap: 16px;
}

main{
  padding-top: 10px;
  background-color: #f3f3f3;
}

</style>
