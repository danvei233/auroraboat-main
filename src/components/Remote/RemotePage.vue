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
import RemoteInfo from '@/components/Remote/RemoteInfo.vue'
import MonitorCharts from '@/components/Monitor/MonitorCharts.vue'
import OtherLinkCard from '@/components/Remote/OtherLinkCard.vue'
import BaseLinkCard from '@/components/Remote/BaseLinkCard.vue'
import RemoteinfoCard from '@/components/Remote/remoteinfoCard.vue'

</script>

<template>

  <main>
    <a-config-provider
      :theme="auroraBoatTheme"
    />

    <a-row :gutter="[16,16]" >
      <a-col span="24">
        <a-alert
          message="快照是一种数据保护技术，通过在某一特定时间点记录系统或存储卷的完整状态，实现对数据的即时冻结与保存，可用于快速恢复、版本回溯或测试环境创建，而不会影响业务的正常运行。"

          type="info"
          show-icon
          closable
          style="border-radius: 2px;padding: 12px"
        >
        </a-alert>
      </a-col>
      <a-col span="8">
        <RemoteinfoCard></RemoteinfoCard>
      </a-col>
      <a-col span="16">
        <BaseLinkCard></BaseLinkCard>
      </a-col>
      <a-col span="24">
        <other-link-card></other-link-card>
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
