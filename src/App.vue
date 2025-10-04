<script lang="ts" setup>
import { ref } from 'vue';

import router from '@/router'
const selectedKeys = ref<string[]>(['2']);


</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" >
        <img alt="logo" src="/logo.svg" />
        QzSystem
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >

      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 32px 50px">



      <router-view />
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Qzsystem & MMUI ©2025 Created by Qz & Danvei
    </a-layout-footer>
  </a-layout>
</template>
<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
.layout {
  min-height: 100%;
}
.logo{
  padding:0 0;
  gap: 12px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  display: flex;
  font-size: 20px;
  align-items: center;
  color: white;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}
[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
