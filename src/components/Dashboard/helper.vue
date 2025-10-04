<!-- 了解更多组件 -->
<script setup lang="ts">
import { RightOutlined } from '@ant-design/icons-vue'

const list = [
  { title: '如何用轻舟云Vps创建《我的世界》游戏服务端', link: '#' },
  { title: '如何用轻舟云Vps创建《我的世界》游戏服务端', link: '#' },
  { title: '如何用轻舟云Vps创建《我的世界》游戏服务端', link: '#' },
  { title: '如何用轻舟云Vps创建《我的世界》游戏服务端', link: '#' },
]
</script>

<template>
  <card  title="了解更多" :bordered="false" class="more-card" style="height: 300px">
    <div class="head">
      <a-typography-link>查看其他教程</a-typography-link>
    </div>

    <div class="list">
      <div v-for="(item,i) in list" :key="i" class="row" @click="$emit('open',item)">
        <span class="text">{{ item.title }}</span>
        <right-outlined class="arrow"/>
      </div>
    </div>
  </card>
</template>

<style scoped>
.more-card{border-radius:12px;overflow:hidden}
.head{
  position:absolute;
  top:20px;
  right:32px;
  text-align:right;margin-top:8px
}
.ttl{font-weight:600;font-size:15px}
.list{display:flex;flex-direction:column;height:calc(300px - 96px);justify-content:space-between}
.row{display:flex;justify-content:space-between;align-items:center;
  padding:8px 0;cursor:pointer;border-bottom:1px solid #f5f5f5}
.row:last-child{border-bottom:none}
.text{color:#333;white-space:nowrap;overflow:hidden;font-size: 16px; text-overflow:ellipsis;flex:1}
.arrow{color:#999;font-size:12px;margin-left:8px}
.row:hover .text{color:#1677ff}
</style>
