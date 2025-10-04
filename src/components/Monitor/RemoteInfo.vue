<script setup lang="ts">
import Card from '@/components/public/Card.vue'
import {
  AppstoreFilled,
  PieChartOutlined,
  ReloadOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue'
import Gauge from '@/components/Monitor/gauge.vue'

</script>

<template>
  <card title="远程信息" style="min-height: 304px">
    <a-descriptions
      :column="1"
      size="small"
      class="desc"
      :label-style="{ width: '96px', color: 'rgba(0,0,0,.45)' }"
    >
      <a-descriptions-item label="实例状态">
        <a-space>
          <a-badge status="success" text="运行中" />

          <a-tooltip title="刷新"
            ><reload-outlined class="ic" @click="$emit('refresh')"
          /></a-tooltip>

        </a-space>
      </a-descriptions-item>

      <a-descriptions-item label="虚拟方案">
        <a-space>
          <span>Hyper-V</span>
        </a-space>
      </a-descriptions-item>

      <a-descriptions-item label="到期时间">
        <a-space>
          <span>2024-01-04</span>
        </a-space>
      </a-descriptions-item>
    </a-descriptions>


    <div class="mark">
<Gauge height="130"></Gauge>
    </div>

  </card>
</template>

<style scoped>
:deep(.ant-card-body){
  overflow: visible;
}
.mark{
  position: absolute;
  top: 55px;
  right: 30px;
}

:deep(.ant-descriptions-item){
  padding-bottom:24px!important;
}

</style>
