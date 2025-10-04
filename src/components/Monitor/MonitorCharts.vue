<script setup lang="ts">
/* 任务管家风格曲线图 */
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import Card from '@/components/public/Card.vue'

const props = defineProps<{
  title?: string
  value?: number | null    // 外部喂值；不传则自驱随机
  unit?: string            // 单位：%/MB/s 等
  color?: string           // 线色
  length?: number          // 点数
  max?: number             // 上限
  live?: boolean           // 自驱
  interval?: number        // 自驱间隔ms
}>()

const wrap = ref<HTMLElement|null>(null)
const cvs = ref<HTMLCanvasElement|null>(null)
const dpr = window.devicePixelRatio || 1

const LINE_COLOR = computed(()=> props.color || '#22c55e') // 默认绿
const MAX = computed(()=> props.max ?? 100)
const N = computed(()=> props.length ?? 60)
const T = computed(()=> props.interval ?? 1000)
const AUTO = computed(()=> props.live !== false)

let data:number[] = []
let timer:number|undefined
let ro:ResizeObserver|undefined

const curr = ref(0)

const push = (v:number) => {
  curr.value = Math.max(0, Math.min(v, MAX.value))
  if (data.length<N.value) data.push(curr.value); else { data.push(curr.value); data.shift() }
  draw()
}

const rnd = (base:number)=> {
  let j = base + (Math.random()-0.5)*MAX.value*0.1
  if (j<0) j=0; if (j>MAX.value) j=MAX.value
  return j
}

const fit = () => {
  if (!wrap.value || !cvs.value) return
  const w = wrap.value.clientWidth, h = wrap.value.clientHeight
  cvs.value.width = Math.max(1, Math.floor(w*dpr))
  cvs.value.height = Math.max(1, Math.floor(h*dpr))
  cvs.value.style.width = w+'px'
  cvs.value.style.height = h+'px'
  draw()
}

const draw = () => {
  const c = cvs.value; if (!c) return
  const ctx = c.getContext('2d')!; const w = c.width, h = c.height
  ctx.clearRect(0,0,w,h)

  // 背景
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,w,h)

  // 网格（任务管理器风）
  const rows = 6, cols = 10
  ctx.strokeStyle = '#eaeaea'; ctx.lineWidth = 1
  for (let i=1;i<rows;i++){ const y = Math.round(h*i/rows)+0.5; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }
  for (let i=1;i<cols;i++){ const x = Math.round(w*i/cols)+0.5; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke() }

  // 线
  if (data.length>1){
    ctx.lineWidth = 2*dpr; ctx.strokeStyle = LINE_COLOR.value
    ctx.beginPath()
    const dx = w/(N.value-1 || 1)
    for (let i=0;i<data.length;i++){
      const x = i*dx
      const y = h - (data[i]/MAX.value)*h
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
    }
    ctx.stroke()

    // 填充淡色
    const g = ctx.createLinearGradient(0,0,0,h)
    g.addColorStop(0, LINE_COLOR.value+'22')
    g.addColorStop(1, LINE_COLOR.value+'00')
    ctx.fillStyle = g
    ctx.lineTo((data.length-1)*dx,h); ctx.lineTo(0,h); ctx.closePath(); ctx.fill()
  }

  // 顶部数值
  ctx.fillStyle = '#111'; ctx.font = `${12*dpr}px ui-sans-serif,system-ui`
  const text = props.unit ? `${curr.value}${props.unit}` : `${curr.value}`
  const tw = ctx.measureText(text).width
  ctx.fillText(text, w - tw - 8*dpr, 14*dpr)
}

onMounted(()=>{
  data = new Array(N.value).fill(0)
  fit()
  ro = new ResizeObserver(fit); if (wrap.value) ro.observe(wrap.value)
  if (AUTO.value) timer = window.setInterval(()=>push(rnd(curr.value)), T.value) as unknown as number
})
onBeforeUnmount(()=>{ if (timer) clearInterval(timer); if (ro && wrap.value) ro.unobserve(wrap.value) })

watch(()=>props.value, v=>{ if (typeof v === 'number') push(v) })
watch([N,MAX,LINE_COLOR], ()=>{ data = data.slice(-N.value); fit() })
</script>

<template>
  <card :title="title" style="min-height:266px">
    <div ref="wrap" style="width:100%;height:220px;position:relative">
      <canvas ref="cvs"></canvas>
      <div style="position:absolute;left:8px;top:4px;font-size:12px;color:#8c8c8c">{{ title }}</div>
    </div>
  </card>
</template>

<style scoped>
/* 仅保留必要样式；绘制走 canvas */
</style>
