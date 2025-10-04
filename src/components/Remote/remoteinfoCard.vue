
<template>
  <card title="远程信息" style="height: 342px">
<div class="body">
    <a-descriptions :column="1" :labelStyle="{color:'#8c8c8c',width:'96px'}">
      <a-descriptions-item label="系统类型">
        <div class="val">
          <svg width="18" height="18" viewBox="0 0 48 48"><path d="M2 7l19-3v19H2V7zm25-4l19-3v22H27V3zM2 25h19v19L2 41V25zm25 0h19v22l-19-3V25z" fill="#0078D6"/></svg>
          <span>{{ os }}</span>
        </div>
      </a-descriptions-item>

      <a-descriptions-item label="远程地址" span="2">
        <div class="val">
          <span class="mono">{{ addr }}</span>
          <a-tooltip title="公网地址:端口"><QuestionCircleOutlined class="ico"/></a-tooltip>
          <CopyOutlined class="ico" @click="copy(addr)"/>
        </div>
      </a-descriptions-item>

      <a-descriptions-item label="系统用户">
        <div class="val">
          <span class="mono">{{ user }}</span>
          <CopyOutlined class="ico" @click="copy(user)"/>
        </div>
      </a-descriptions-item>

      <a-descriptions-item label="系统密码">
        <div class="val">
          <template v-if="isEdit">
            <a-input v-model:value="pwd" :type="isShow?'text':'password'" size="small" style="width:240px"/>
          </template>
          <template v-else>
            <span class="mono">{{ isShow ? pwd : mask }}</span>
          </template>
          <component :is="isShow?EyeInvisibleOutlined:EyeOutlined" class="ico" @click="isShow=!isShow"/>
          <EditOutlined class="ico" @click="isEdit=!isEdit"/>
          <CopyOutlined class="ico" @click="copy(pwd)"/>
        </div>
      </a-descriptions-item>
    </a-descriptions>
</div>
  </card>

</template>

<script setup>
import { ref, computed } from 'vue'
import { QuestionCircleOutlined, EyeOutlined, EyeInvisibleOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons-vue'
import Card from '@/components/public/Card.vue'

const props=defineProps({
  os:{type:String,default:'Windows'},
  addr:{type:String,default:'netmc.icu:32201'},
  user:{type:String,default:'Administrator'},
  pass:{type:String,default:'P@ssw0rd!'}
})
const os=ref(props.os), addr=ref(props.addr), user=ref(props.user)
const pwd=ref(props.pass), isShow=ref(false), isEdit=ref(false)
const mask=computed(()=> '•'.repeat(Math.max(12, String(pwd.value||'').length)))
const copy=s=>navigator.clipboard?.writeText(String(s||''))
</script>

<style scoped>
.body{
  padding: 20px 0 0 0;
}
:deep(.ant-descriptions-item){
  padding-bottom: 32px!important;
}


.val{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mono{font-family:ui-monospace,Menlo,Consolas,monospace}
.ico{font-size:16px;cursor:pointer;color:#8c8c8c}
.ico:hover{color:#595959}
</style>
