<script setup lang="ts">
import {PieChartOutlined, SwapOutlined,AppstoreFilled,AppstoreOutlined } from '@ant-design/icons-vue'
import Card from '@/components/public/Card.vue'
</script>

<template>
<card title="启动项管理" style="min-height: 296px;

height: 296px;
">

  <a-descriptions
    :column="1"
    size="small"
    class="desc"
    :label-style="{ width: '96px', color: 'rgba(0,0,0,.45)' }"
  >
    <a-descriptions-item label="启动方式">
      <a-space>
        <PieChartOutlined  style="color: #000000; font-size: 16px"  />

        <span>Disk</span>

        <a-button type="link" >
          <template #icon>
            <SwapOutlined></SwapOutlined>
          </template>
          </a-button>

      </a-space>
    </a-descriptions-item>
    <a-descriptions-item label="操作系统">
      <a-space>
        <AppstoreFilled style="color: #000000; font-size: 16px"  />

        <span>Windows 2022</span>
        <a-typography-link @click="$emit('reinstall')">重装</a-typography-link>
      </a-space>
    </a-descriptions-item>

  </a-descriptions>

  <div class="blank"></div>
<div class="nutton-wrapper">
  <a-button type="primary"   style="padding:7px 32px">

    切换启动项
  </a-button>
</div>
  <img class="mark1" src="/chilun.svg" />
</card>






</template>

<style scoped>
.blank{
  flex: 1 1 auto;
}
:deep(.ant-card-body){
  min-height: 100%;
  display: flex;
  flex-direction: column;

}
.mark1{
  position: absolute;
  pointer-events: none;
  opacity: 0.59;
  top: -20%;
  right: -5%;
}
.nutton-wrapper{



  bottom: 0%;
  left: 0%;
  width: 100%;
  display: flex;
  justify-content: right;
}
</style>
