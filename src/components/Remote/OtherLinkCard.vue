<!-- 其他链接方式（完整还原） -->
<template>
  <card title="其他链接方式" style="height: 365px">

    <div class="grid">
      <div v-for="it in items" :key="it.key" class="cell">
        <div class="head">
          <component :is="it.icon" class="ic"/>
          <span class="name">{{it.name}}</span>
          <a-tooltip title="第三方远程工具"><InfoCircleOutlined class="q"/></a-tooltip>
          <span :class="['tag',it.enabled?'ok':'bad']">{{it.enabled?'可用':'不可用'}}</span>
        </div>
        <div class="desc">通过{{it.name.replace(/远程$/,'远程')}}桌面连接服务器，方便快捷高效。<br/>远程信息：</div>

        <div class="kv">
          <div class="k">识别码</div>
          <div class="v">
            <span class="mono">{{it.id}}</span>
            <CopyOutlined class="act" @click="copy(it.id)"/>
          </div>
        </div>

        <div class="kv">
          <div class="k">验证码</div>
          <div class="v">
            <span class="mono">{{ show[it.key] ? it.code : mask(it.code) }}</span>
            <component :is="show[it.key]?EyeInvisibleOutlined:EyeOutlined" class="act" @click="show[it.key]=!show[it.key]"/>
            <CopyOutlined class="act" @click="copy(it.code)"/>
          </div>
        </div>

        <div class="ops">
          <a-button type="primary" :disabled="!it.enabled" @click="emit('login',it.key)">登入</a-button>
          <a-button  :disabled="!it.enabled" @click="emit('download',it.key)">下载客户端</a-button>
        </div>
      </div>
    </div>
  </card>
</template>

<script setup>
import { reactive } from 'vue'
import { BulbOutlined, DesktopOutlined, InfoCircleOutlined, CopyOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue'
import Card from '@/components/public/Card.vue'
const emit = defineEmits(['login','download'])
const props = defineProps({
  items:{type:Array,default:()=>[
      {key:'sunlogin', name:'向日葵远程', icon:BulbOutlined,   enabled:true,  id:'302 123 4461', code:'872663'},
      {key:'todesk',   name:'Todesk远程', icon:DesktopOutlined, enabled:true,  id:'542 031 332', code:'615204'},
      {key:'llk',      name:'连连控远程', icon:BulbOutlined,   enabled:true,  id:'542 031 332', code:'615204'},
      {key:'anydesk',  name:'AnyDesk远程',icon:BulbOutlined,   enabled:false, id:'— — — —',   code:'********'}
    ]}
})
const items = props.items
const show = reactive(Object.fromEntries(items.map(i=>[i.key,false])))
const copy = s => navigator.clipboard?.writeText(String(s||''))
const mask = s => '•'.repeat(Math.max(8,String(s||'').length))
</script>

<style scoped>
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.cell{background:#fff;padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;


}
.head{display:flex;align-items:center;gap:8px}
.ic{font-size:18px}
.name{font-weight:600}
.q{color:#bfbfbf}
.tag{margin-left:6px;font-size:12px;border-radius:12px;border:1px solid;padding:0 8px;line-height:20px}
.ok{color:#52c41a;background:#f6ffed;border-color:#b7eb8f}
.bad{color:#ff4d4f;background:#fff1f0;border-color:#ffa39e}
.desc{color:#8c8c8c;line-height:1.7;margin:8px 0 10px}
.kv{display:grid;grid-template-columns:64px 1fr;align-items:center;margin:6px 0}
.k{color:#8c8c8c}
.v{display:flex;align-items:center;gap:8px}
.mono{font-family:ui-monospace,Menlo,Consolas,monospace}
.act{cursor:pointer;color:#8c8c8c}
.act:hover{color:#595959}
.ops{display:flex;gap:12px;margin-top:10px}
@media (max-width:1200px){.grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:640px){.grid{grid-template-columns:1fr}}
</style>
