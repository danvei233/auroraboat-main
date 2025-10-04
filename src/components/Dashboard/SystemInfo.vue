<!-- 账户信息；最小实现 -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  WindowsFilled,
  EyeOutlined,
  EyeInvisibleOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons-vue'
import Card from '@/components/public/Card.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      os: 'Windows',
      remote: 'netmc.icu:32201',
      sysUser: 'Administrator',
      sysPass: 'P@ssw0rd!',
      panelUser: 'ECS-114514',
      panelPass: 'panel@123',
    }),
  },
})
const showSys = ref(false)
const showPanel = ref(false)
const dot = (n: number) => '•'.repeat(n)
</script>

<template>
  <card title="账号信息"  style="height: 326px">
    <a-descriptions
      :column="1"
      size="small"
      class="desc"
      :label-style="{ width: '96px', color: 'rgba(0,0,0,.45)' }"
      style="padding-top: 10px"
    >
      <a-descriptions-item label="系统类型">
        <a-space>
          <windows-filled style="color: #1677ff; font-size: 18px" />
          <span>{{ data.os }}</span>
        </a-space>
      </a-descriptions-item>

      <a-descriptions-item label="远程地址">
        <a-space>
          <span>{{ data.remote }}</span>
          <a-tooltip title="用于RDP/VNC等连接"><question-circle-outlined class="q" /></a-tooltip>
        </a-space>
      </a-descriptions-item>

      <a-descriptions-item label="系统用户">
        {{ data.sysUser }}
      </a-descriptions-item>

      <a-descriptions-item label="系统密码">
        <a-space>
          <span>{{ showSys ? data.sysPass : dot(12) }}</span>

          <component
            :is="showSys ? EyeInvisibleOutlined : EyeOutlined"
            class="eye"
            @click="showSys = !showSys"
          />
          <a-tooltip title="修改"
            ><edit-outlined class="eye" @click="$emit('editPassword')"
          /></a-tooltip>
        </a-space>
      </a-descriptions-item>

      <a-descriptions-item label="面板用户">
        <a-space>
          <span>{{ data.panelUser }}</span>
          <a-tooltip title="面板后台登录账号"><question-circle-outlined class="q" /></a-tooltip>
        </a-space>
      </a-descriptions-item>

      <a-descriptions-item label="面板密码">
        <a-space>
          <span>{{ showPanel ? data.panelPass : dot(12) }}</span>
          <component
            :is="showPanel ? EyeInvisibleOutlined : EyeOutlined"
            class="eye"
            @click="showPanel = !showPanel"
          />
          <a-tooltip title="修改"><edit-outlined class="eye" @click="$emit('editPassword')"/></a-tooltip>
        </a-space>
      </a-descriptions-item>
    </a-descriptions>

    <img class="wm a" src="/safe.png" alt="" />
    <img class="wm b" src="/head.png" alt="" />
  </card>
</template>

<style scoped>
:deep(.ant-card-body){
  height: 100%;
}
.wrap {
  position: relative;
  overflow: auto;
  border-radius: 12px;
  padding: 12px 16px;
  background: #fff;
}
.ttl {
  margin: 0 0 8px 0;
}
.desc {
  backdrop-filter: saturate(110%) blur(0px);
}
.eye {
  cursor: pointer;
  color: #98a2b3;
}
.q {
  color: #b4b9c3;
}
.wm {
  position: absolute;
  opacity: 0.1;
  pointer-events: none;
}
.wm.a {
  left: -60px;
  top: -40px;
  width: 180px;
  transform: rotate(-12deg);
}
.wm.b {
  right: -45px;
  bottom: -35px;
  width: 150px;
  transform: rotate(0deg);

}

:deep(.ant-descriptions-item){
  padding-bottom:12px!important;
}

</style>
