<script setup lang="ts">

import { auroraBoatTheme } from '@/assets/theme.ts'
import {ReloadOutlined,WindowsFilled} from '@ant-design/icons-vue'
import DashBoard from '@/components/DashBoard.vue'
import PortForward from '@/components/PortReward/PortForward.vue'
import Boot from '@/components/Bootset/boot.vue'
import Monitor from '@/components/Monitor/monitor.vue'
import RemotePage from '@/components/Remote/RemotePage.vue'
import FireWall from '@/components/FireWall/FireWall.vue'
import WebProxy from '@/components/BuidWeb/WebProxy.vue'
import SnapShot from '@/components/SnapShot.vue'
import Backup from '@/components/Backup.vue'
</script>

<template>
  <a-config-provider
    :theme="auroraBoatTheme"
  />
  <main>
    <div class="topbar">

      <div class="bar-info">
        <img src="/windows.svg">

        <h2>SERBERNAME</h2>
        <a-tag color="blue" style="margin:0px;border-radius: 4px">山西</a-tag>
        <a-badge status="success" text="运行中" />
<!--        <a-tag color="blue">新加坡</a-tag>-->
        <a-typography-text copyable>
          Ipv4 | 43.134.34.163
        </a-typography-text>

      </div>

      <div class="blank"></div>

      <div class="tools">
        <a-button type="primary">一键远程</a-button>
        <a-badge dot>   <a-button>设置密码</a-button></a-badge>
        <a-button  danger >重启</a-button>
        <a-button  >端口映射</a-button>
        <a-button>重装系统</a-button>
        <a-button >  <ReloadOutlined /></a-button>
      </div>

    </div>

    <a-tabs default-active-key="1" >
      <a-tab-pane key="1" tab="概要"><DashBoard  /> </a-tab-pane>
      <a-tab-pane key="2" tab="端口映射"><PortForward /> </a-tab-pane>
      <a-tab-pane key="3" tab="启动项"> <Boot /> </a-tab-pane>
      <a-tab-pane key="4" tab="备份点"> <Backup /> </a-tab-pane>
      <a-tab-pane key="5" tab="防火墙"> <FireWall /> </a-tab-pane>
      <a-tab-pane key="6" tab="远程"> <RemotePage /> </a-tab-pane>
      <a-tab-pane key="7" tab="快照"> <SnapShot /></a-tab-pane>
      <a-tab-pane key="8" tab="监控"> <Monitor /> </a-tab-pane>
      <a-tab-pane key="9" tab="建站"> <WebProxy /> </a-tab-pane>
    </a-tabs>



  </main>
</template>

<style scoped>
:deep(.ant-tabs-nav){
  margin-bottom: 0;
}
h2{
  margin: 0;
}
.bar-info{
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.tools{
  display: flex;

  gap: 4px;
}
.blank{
  flex: 1 1 auto;

}
.topbar {
 padding: 12px 16px;
  gap: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

:deep(.ant-tabs-nav-list){
  padding-left: 16px;
}
:deep(.ant-tabs-tabpane) > * > .ant-row{
  padding:16px 0;
  background:#f5f5f5;
}
main{

  background-color: white;
}
</style>