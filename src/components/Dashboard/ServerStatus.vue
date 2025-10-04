<!-- 实例监控 v2（美化版，保持结构不变） -->
<template>
  <card title="实例监控" style="height:390px;max-height:390px">
    <div class="kpi">
      <div class="kpi-item">
        <div class="kpi-head"><span>CPU占用率</span><span class="pct">{{ cpu }}%</span></div>
        <a-progress :percent="cpu" :show-info="false" :stroke-width="12" :stroke-color="gradBlue"/>
        <div class="hint">{{ cores }} Cores</div>
      </div>
      <div class="kpi-item">
        <div class="kpi-head"><span>内存占用率</span><span class="pct">{{ mem }}%</span></div>
        <a-progress :percent="mem" :show-info="false" :stroke-width="12" :stroke-color="gradAmber"/>
        <div class="hint">{{ memMB }}MB</div>
      </div>
    </div>

    <div class="charts">
      <div class="chart">
        <div class="chart-head">
          <span>网络 (Mbps)</span>
          <div class="legend">
            <span class="chip up">↑ {{ up }}Mbps</span>
            <span class="chip down">↓ {{ down }}Mbps</span>
          </div>
        </div>
        <svg :width="W" :height="H" class="svg">
          <g class="grid"><line v-for="i in 4" :key="i" :x1="0" :x2="W" :y1="H - i*(H/4)" :y2="H - i*(H/4)"/></g>
          <path :d="area(netA)" class="area a"/><path :d="line(netA)" class="line a"/>
          <path :d="area(netB)" class="area b"/><path :d="line(netB)" class="line b"/>
        </svg>
      </div>

      <div class="chart">
        <div class="chart-head">
          <span>IO占用率 (TOPs)</span>
          <div class="legend mute">200K(写) · 300K(读)</div>
        </div>
        <svg :width="W" :height="H" class="svg">
          <g class="grid"><line v-for="i in 4" :key="i" :x1="0" :x2="W" :y1="H - i*(H/4)" :y2="H - i*(H/4)"/></g>
          <path :d="area(ioA)" class="area c"/><path :d="line(ioA)" class="line c"/>
        </svg>
      </div>
    </div>
  </card>
</template>

<script setup>
import Card from '@/components/public/Card.vue'
const props=defineProps({
  cpu:{type:Number,default:32}, cores:{type:Number,default:8},
  mem:{type:Number,default:80}, memMB:{type:Number,default:8192},
  up:{type:Number,default:20}, down:{type:Number,default:12},
  netA:{type:Array,default:()=>[18,22,20,16,14,17,15]},
  netB:{type:Array,default:()=>[15,28,12,10,18,22,30]},
  ioA:{type:Array,default:()=>[15,22,12,38,22,46,30]}
})
const W=220,H=110,pad=6
const x=(i,n)=>i*(W-2*pad)/(n-1)+pad
const y=(v,max)=>H-(v/max)*(H-2*pad)-pad
const path=arr=>arr.map((v,i,a)=>`${i?'L':'M'}${x(i,a.length)},${y(v,Math.max(...a,1))}`).join('')
const line=arr=>path(arr)
const area=arr=>`${path(arr)}L${W-pad},${H-pad}L${pad},${H-pad}Z`
const gradBlue={from:'#60a5fa',to:'#2563eb'}
const gradAmber={from:'#fcd34d',to:'#f59e0b'}
</script>

<style scoped>
/* 主题微调 */
:root{--card-bg:#fff;--soft:#f6f8fb;--border:#eef2f6;--text:#0f172a;--muted:#94a3b8}
.title{font-weight:700;font-size:16px;margin-bottom:8px}

/* KPI */
.kpi{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:12px}
.kpi-item{background:linear-gradient(180deg,#fff,rgba(255,255,255,.9)) padding-box;border:1px solid var(--border);border-radius:14px;padding:12px 14px;box-shadow:0 1px 2px rgba(15,23,42,.04)}
.kpi-item:hover{box-shadow:0 6px 18px rgba(2,6,23,.06);transform:translateY(-1px);transition:all .25s ease}
.kpi-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;color:var(--text);font-weight:600}
.pct{color:var(--muted);font-family:ui-monospace,Menlo,Consolas,monospace}
.hint{color:#9aa4b2;margin-top:6px;font-size:12px}

/* 图表容器 */
.charts{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.chart{background:var(--card-bg);border:1px solid var(--border);border-radius:14px;padding:12px 14px;box-shadow:0 1px 2px rgba(15,23,42,.04)}
.chart-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-weight:700;color:var(--text)}
.legend{display:flex;gap:8px;align-items:center}
.chip{padding:2px 8px;border-radius:999px;font-size:12px;border:1px solid transparent;background:#f8fafc}
.legend .up{color:#16a34a}.legend .down{color:#f59e0b}.legend.mute{color:#9aa4b2;font-weight:400}

/* SVG */
.svg{width:100%;height:auto;display:block}
.grid line{stroke:#e9eef5;stroke-width:1;shape-rendering:crispEdges;stroke-dasharray:4 6}
.line{fill:none;stroke-width:2.2;filter:drop-shadow(0 1px 0 rgba(0,0,0,.04))}
.area{opacity:.16}
.line.a{stroke:#10b981}.area.a{fill:#10b981}
.line.b{stroke:#f59e0b}.area.b{fill:#f59e0b}
.line.c{stroke:#6366f1}.area.c{fill:#6366f1}

/* 进度条细节 */
:deep(.ant-progress-inner){background:#f3f6fb;border-radius:999px}
:deep(.ant-progress-bg){border-radius:999px;filter:drop-shadow(0 1px 1px rgba(2,6,23,.04))}
</style>
