<!-- 精简美化版 -->
<script setup lang="ts">
import Card from '@/components/public/Card.vue'
import { ref } from 'vue'
import { ReloadOutlined, EyeOutlined, EyeInvisibleOutlined, EditOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      name: 'ECS-114514',
      status: { text: '运行中', color: 'success' },
      region: '晋中', line: 'R620-BGP', virtual: 'Hyper-V',
      os: 'Windows2022', password: 'P@ssw0rd!', expireAt: '2025-9-23',
      cpu: '2 核', memory: '4GB', systemDisk: '60GB', uplink: '200Mbps',
      img: 'seelen-ui_1ZqrpFQOKK.png'
    })
  }
})
const isShowPwd = ref(false)
</script>

<template>
  <card class="box" title="" style="height: 390px">
    <div class="head">
      <div class="t">
        <span class="dot" :data-s="data.status.color"></span>
        <span class="name">{{ data.name }}</span>
        <a-tag class="tagv">{{ data.virtual }}</a-tag>
      </div>
      <a-space>
        <a-tooltip title="刷新"><reload-outlined class="ic" @click="$emit('refresh')"/></a-tooltip>
      </a-space>
    </div>

    <div class="grid">
      <div class="left">
        <a-descriptions :column="1" size="small" :label-style="{width:'86px',color:'var(--l)'}" class="desc">
          <a-descriptions-item label="实例状态">
            <a-badge :status="data.status.color" :text="data.status.text"/>
          </a-descriptions-item>
          <a-descriptions-item label="区域线路">{{ data.region }}｜{{ data.line }}</a-descriptions-item>
          <a-descriptions-item label="操作系统">
            <a-space>
              {{ data.os }} <a-typography-link @click="$emit('reinstall')">重装</a-typography-link>
            </a-space>
          </a-descriptions-item>
          <a-descriptions-item label="系统密码">
            <a-space>
              <span>{{ isShowPwd ? data.password : '******' }}</span>
              <component :is="isShowPwd?EyeInvisibleOutlined:EyeOutlined" class="ic" @click="isShowPwd=!isShowPwd"/>
              <a-tooltip title="修改"><edit-outlined class="ic" @click="$emit('editPassword')"/></a-tooltip>
            </a-space>
          </a-descriptions-item>
          <a-descriptions-item label="到期时间">{{ data.expireAt }}</a-descriptions-item>
          <a-descriptions-item label="实例配置">
            <div class="tags">
              <a-tag>{{ `CPU - ${data.cpu}` }}</a-tag>
              <a-tag>{{ `内存 - ${data.memory}` }}</a-tag>
              <a-tag>{{ `系统盘 - ${data.systemDisk}` }}</a-tag>
              <a-tag>{{ `上行带宽 - ${data.uplink}` }}</a-tag>
            </div>
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <div class="right">
        <div class="shot">
          <span class="corner tl"></span><span class="corner tr"></span>
          <span class="corner bl"></span><span class="corner br"></span>
          <a-image :src="data.img" :preview="{mask:'预览',movable:true}" class="img"/>
        </div>
        <div class="cap">实例截图</div>
      </div>
    </div>

    <img src="/blocks.svg" class="wm"/>
  </card>
</template>

<style scoped>
:root{--l:rgba(0,0,0,.45)}
.box{position:relative;overflow:hidden;border-radius:14px;padding:14px 16px;background:linear-gradient(180deg,#fff, #fafcff)}
.head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;margin-right:16px}
.t{display:flex;align-items:center;gap:10px}
.dot{width:10px;height:10px;border-radius:50%;display:inline-block;box-shadow:0 0 0 2px #fff}
.dot[data-s="success"]{background:#52c41a}.dot[data-s="processing"]{background:#1677ff}.dot[data-s="error"]{background:#ff4d4f}.dot[data-s="warning"]{background:#faad14}
.name{font-weight:700;font-size:16px}
.tagv{border-radius:999px;background:#f5f7ff;border-color:#e8edff;color:#5c6cff}
.ic{cursor:pointer;color:#98a2b3}
.grid{display:grid;grid-template-columns:1.15fr .85fr;gap:16px}
.left{background:#fff;border-radius:12px;padding:12px}
.right{z-index: 1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 10px}
.desc :deep(.ant-descriptions-item-label){font-weight:500}
.tags{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-width:360px}
.tags :deep(.ant-tag){border-radius:8px}
.shot{position:relative;background:#fff;border:1px dashed #e5e7eb;border-radius:12px;padding:10px;box-shadow:0 6px 20px rgba(18,29,51,.06)}
.img{max-width:100%;border-radius:8px}
.cap{margin-top:8px;color:#98a2b3}
.corner{position:absolute;width:14px;height:14px;border:2px solid #cfd6ff}
.tl{top:6px;left:6px;border-right:none;border-bottom:none;border-radius:6px 0 0 0}
.tr{top:6px;right:6px;border-left:none;border-bottom:none;border-radius:0 6px 0 0}
.bl{bottom:6px;left:6px;border-right:none;border-top:none;border-radius:0 0 0 6px}
.br{bottom:6px;right:6px;border-left:none;border-top:none;border-radius:0 0 6px 0}
.wm{position:absolute;right:-40px;bottom:-48px;width:230px;opacity:.10;transform:rotate(-11deg);pointer-events:none;z-index: 0}
@media (max-width: 992px){.grid{grid-template-columns:1fr}}

:deep(.ant-descriptions-item){
  padding-bottom:12px!important;
}

</style>
