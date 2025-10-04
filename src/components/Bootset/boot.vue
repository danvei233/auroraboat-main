<script setup lang="ts">

import { Pie } from '@antv/g2plot'
import { auroraBoatTheme } from '@/assets/theme.ts'
import ServerStatus from '@/components/Dashboard/ServerStatus.vue'
import ServerInfo from '@/components/Dashboard/ServerInfo.vue'
import SystemInfo from '@/components/Dashboard/SystemInfo.vue'
import Time from '@/components/Dashboard/time.vue'
import Helper from '@/components/Dashboard/helper.vue'
import BootSet from '@/components/Bootset/BootSet.vue'
import PowerManger from '@/components/Bootset/PowerManger.vue'

</script>

<template>
  <main>
    <a-config-provider
      :theme="auroraBoatTheme"
    />

    <a-row :gutter="[16,16]" >
      <a-col span="24">
        <a-alert
          message="启动项是指系统或应用在开机或服务启动时自动加载并运行的程序或任务配置，用于确保关键功能、服务或进程能够在系统初始化阶段自动生效并保持可用。"

          type="info"
          show-icon
          closable
          style="border-radius: 2px;padding: 12px"
        >
        </a-alert>
      </a-col>
      <a-col span="15">
        <BootSet></BootSet>
      </a-col>
      <a-col span="9">
        <PowerManger></PowerManger>
      </a-col>
    </a-row>

  </main>


</template>

<style scoped>


main{
  padding-top: 10px;
  background-color: #f3f3f3;
}

</style>
