<!-- 远程登录选项组件 -->
<template>
  <card title="远程登录" style="height: 326px">
    <a-row :gutter="16">
      <a-col :span="8" v-for="item in list" :key="item.title">
        <div class="login-box">
          <div class="login-head">
            <component :is="item.icon" class="ic"/>
            <span class="title">{{ item.title }}</span>
            <a-tooltip title="说明"><info-circle-outlined class="info"/></a-tooltip>
          </div>
          <div class="desc">{{ item.desc }}</div>
          <a-button type="primary" v-if="item.type==='web'">进入</a-button>
          <a-button v-else>进入</a-button>
        </div>
      </a-col>
    </a-row>
    <div class="more"><a-typography-link>查看其他方式</a-typography-link></div>


    <img  class="wd" src="/remote.png" height="300" width="300" /></card>
</template>

<script setup lang="ts">
import { DesktopOutlined, HomeOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'

const list = [
  {
    title: '网页登录',
    icon: DesktopOutlined,
    desc: '通过 Mritle 远程直接从浏览器访问服务器后台，无需输入密码，方便快捷',
    type: 'web'
  },
  {
    title: '本地登录',
    icon: HomeOutlined,
    desc: '下载 Rdp 文件并打开以直接登录，密码将复制到您的粘贴板，只需 Ctrl+V 即可。',
    type: 'local'
  },
  {
    title: 'VNC连接',
    icon: HomeOutlined,
    desc: '使用 Web VNC 登录服务器，当系统无法正常登录时可用此方式进行救援。',
    type: 'vnc'
  }
]



</script>

<style scoped>
.wd{
  position: absolute;
  left: 577px;
  top: -115px;
  opacity: 0.05000000074505806;
  pointer-events: none;
}

.login-box {
  background:#fff;
  gap: 24px;

  border-radius:8px;
  padding:16px;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}
.login-head {
  display:flex;
  align-items:center;
  gap:2px;
  margin-bottom:0px;
}
.ic { font-size:18px; }
.info { color:#aaa;font-size:14px }
.title { font-weight:600;font-size:15px }
.desc {
  flex:1;
  font-size:15px;
  color:#666;
  line-height:1.5;
  margin-bottom:12px;
}



.more {
  position:absolute;
  top:20px;
  right:32px;
  text-align:right;margin-top:8px }
</style>
