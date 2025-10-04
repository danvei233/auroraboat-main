<script setup lang="ts">
import {PieChartOutlined, SwapOutlined,AppstoreFilled,AppstoreOutlined } from '@ant-design/icons-vue'
import Card from '@/components/public/Card.vue'
</script>

<template>
  <card title="电源管理" style="min-height: 296px;

height: 296px;
">

    <a-descriptions
      :column="1"
      size="small"
      class="desc"
      :label-style="{ width: '96px', color: 'rgba(0,0,0,.45)' }"
    >
      <a-descriptions-item label="实例名称">
        <a-space>


          <span>ECS-114514</span>


        </a-space>
      </a-descriptions-item>
      <a-descriptions-item label="实例状态">
        <a-space>
          <a-badge status="success" text="运行中"/>
          </a-space>
      </a-descriptions-item>

    </a-descriptions>

    <div class="blank"></div>
    <div class="nutton-wrapper">
      <a-button type="primary" >启动</a-button>
      <a-button   color="yellow" style="border-color: #faad14 ; color: #faad14">重启</a-button>
      <a-button  danger>关机</a-button>




    </div>
    <img class="mark1" src="/PowerPlug.svg" />
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
  top: 0%;
  right: -15%;
}
.nutton-wrapper{
  padding: 0 4px;
  width: 100%;
  display: flex;
  justify-content: space-between;

}
:deep(button){
  border-radius: 0 !important;
  padding: 7px 32px !important;
}
</style>
