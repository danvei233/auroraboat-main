<!-- 日期时间信息组件 -->
<script setup lang="ts">
import { ref } from 'vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import Card from '@/components/public/Card.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      createAt: '2025-08-23',
      expireAt: '2025-09-23',
      sync: true
    })
  }
})
</script>

<template>
  <card title="日期时间" class="dt-card" style="height: 300px">
    <a-row>
      <a-col :span="16">

        <a-descriptions :column="1" size="small"
                        :label-style="{width:'96px',color:'rgba(0,0,0,.45)'}">

          <a-descriptions-item label="创建时间">
            {{ data.createAt }}
          </a-descriptions-item>

          <a-descriptions-item label="到期时间">
            <a-space>
              {{ data.expireAt }}
              <a-tooltip title="账单或资源的到期日">
                <question-circle-outlined class="q"/>
              </a-tooltip>
            </a-space>
          </a-descriptions-item>

          <a-descriptions-item label="时间同步">
            <a-space>
              <a-tooltip title="是否已开启系统时间同步">
                <question-circle-outlined class="q"/>
              </a-tooltip>
              <a-badge :status="data.sync ? 'success':'error'" :text="data.sync?'已开启':'已关闭'"/>
              <a-typography-link>切换</a-typography-link>
            </a-space>
          </a-descriptions-item>

        </a-descriptions>
      </a-col>

      <a-col :span="8" style="display:flex;align-items:center;justify-content:center">
        <img src="/coin.svg" class="illus"/>
      </a-col>
    </a-row>
  </card>
</template>

<style scoped>
:deep(.ant-descriptions-item){
  padding-bottom:32px!important;
}
.dt-card{border-radius:12px;overflow:hidden;position:relative}
.q{color:#b4b9c3}
.illus{max-width:100%;opacity:.85}
</style>
