<template>
  <card title="普通连接" style="height: 342px">
  <div class="wrap">

    <div class="grid">
      <div v-for="it in list" :key="it.key" class="item">
        <div class="hd">
          <component :is="it.icon" class="ic"/>
          <span class="name">{{it.name}}</span>
          <a-tooltip title="通用登录通道"><InfoCircleOutlined class="info"/></a-tooltip>
          <span class="ok">可用</span>
        </div>
        <div class="desc">{{it.desc}}</div>
        <a-button :type="it.primary?'primary':'default'"  class="btn" @click="emit('login',it.key)">登录</a-button>
      </div>
    </div>
  </div>
  </card>
</template>

<script setup>
import { computed } from 'vue'
import { DesktopOutlined, HomeOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
import Card from '@/components/public/Card.vue'

const emit = defineEmits(['login'])
const props = defineProps({
  items: {
    type: Array,
    default: () => ([
      {key:'web',name:'网页登录',desc:'通过Mritile远程直接从浏览器访问服务器后台，无需输入密码，方便快捷',icon:DesktopOutlined,primary:true},
      {key:'rdp',name:'本地登录',desc:'下载Rdp文件并打开以直接登录，密码将复制到您的粘贴板，您只需按下Ctrl+V即可。',icon:HomeOutlined},
      {key:'vnc',name:'VNC连接',desc:'使用Web VNC登入服务器，当系统无法正常登录时使用此方法可进行救援。',icon:HomeOutlined}
    ])
  }
})
const list = computed(()=>props.items)
</script>

<style scoped>
.wrap{background:#fff;padding:20px 12px}

.grid{display:grid;grid-template-columns:repeat(3,1fr) ;gap:30px;width: 100%}
.item{display:flex;flex-direction:column;gap:44px;max-width: 180px}
.hd{display:flex;align-items:center;gap:8px}
.ic{font-size:20px}
.name{font-weight:600}
.info{color:#bfbfbf}
.ok{font-size:12px;color:#52c41a;background:#f6ffed;border:1px solid #b7eb8f;border-radius:12px;padding:0 8px}
.desc{color:#8c8c8c;line-height:1.7;min-height:64px}
.btn{width:92px}
@media (max-width:960px){.grid{grid-template-columns:1fr}}
</style>
