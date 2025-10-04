<script setup lang="ts">
/* 示例：向 MonitorCharts 喂实时指标 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { auroraBoatTheme } from '@/assets/theme.ts'
import RemoteInfo from '@/components/Monitor/RemoteInfo.vue'
import MonitorCharts from '@/components/Monitor/MonitorCharts.vue'

const cpu=ref(0), mem=ref(0), io=ref(0), net=ref(0)
let timer:number|undefined
const jitter=(v:number,max:number,step:number)=>Math.max(0,Math.min(max, v+(Math.random()-0.5)*step))
const tick=()=>{ cpu.value=Math.round(jitter(cpu.value,100,20)); mem.value=Math.round(jitter(mem.value,100,12)); io.value=Math.round(jitter(io.value,500,50)); net.value=Math.round(jitter(net.value,1000,120)) }
onMounted(()=>{ timer=window.setInterval(tick,1000) })
onBeforeUnmount(()=>{ if(timer) clearInterval(timer) })
</script>

<template>
  <main>
    <a-config-provider :theme="auroraBoatTheme" />
    <a-row :gutter="[16,16]">
      <a-col span="24">
        <a-alert message="实时监控：CPU / 内存 / 磁盘IO / 网络吞吐。" type="info" show-icon closable style="border-radius:2px;padding:12px" />
      </a-col>

      <a-col span="16"><RemoteInfo/></a-col>

      <a-col span="8">
        <MonitorCharts title="CPU 使用率" :value="cpu" unit="%" :max="100" :live="false" color="#22c55e" :length="60" />
      </a-col>
      <a-col span="8">
        <MonitorCharts title="内存 使用率" :value="mem" unit="%" :max="100" :live="false" color="#3b82f6" :length="60" />
      </a-col>
      <a-col span="8">
        <MonitorCharts title="磁盘 IO" :value="io" unit="MB/s" :max="500" :live="false" color="#f59e0b" :length="60" />
      </a-col>
      <a-col span="8">
        <MonitorCharts title="网络 吞吐" :value="net" unit="MB/s" :max="1000" :live="false" color="#8b5cf6" :length="60" />
      </a-col>
    </a-row>
  </main>
</template>

<style scoped>
main{padding-top:10px;background:#f3f3f3}
</style>
