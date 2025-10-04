<script setup lang="ts">

import { Pie } from '@antv/g2plot'
import { auroraBoatTheme } from '@/assets/theme.ts'
import ServerStatus from '@/components/Dashboard/ServerStatus.vue'
import ServerInfo from '@/components/Dashboard/ServerInfo.vue'
import SystemInfo from '@/components/Dashboard/SystemInfo.vue'
import Time from '@/components/Dashboard/time.vue'
import Helper from '@/components/Dashboard/helper.vue'

</script>

<template>
<main>
  <a-config-provider
    :theme="auroraBoatTheme"
  />

  <a-row :gutter="[16,16]" style=" ">
    <a-col span="15">
    <ServerInfo></ServerInfo>
    </a-col>

    <a-col span="9">
      <ServerStatus></ServerStatus>
    </a-col>
    <a-col span="15">
      <Remote></Remote>
    </a-col>

    <a-col span="9">
      <SystemInfo></SystemInfo>
    </a-col>


    <a-col span="15">
      <Time></Time>
    </a-col>

    <a-col span="9">
      <Helper></Helper>
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
