<!-- 半圆仪表盘（稳定尺寸） -->
<template><div ref="el" :style="{width:'100%',height:height+'px'}"/></template>

<script setup>
import { onMounted, onBeforeUnmount, onActivated, ref, watch, nextTick } from 'vue'
import { Gauge } from '@antv/g2plot'

const props = defineProps({
  percent:{type:Number,default:0.75},
  colors:{type:Array,default:()=>['#f4664a','#faad14','#30bf78']},
  title:{type:String,default:'优'},
  subtitle:{type:String,default:'系统表现'},
  height:{type:Number,default:180},
  thickness:{type:Number,default:18},
})
const el=ref(), plot=ref(), ro=ref()

const build=()=>new Gauge(el.value,{
  autoFit:false, width:el.value?.getBoundingClientRect().width||300, height:props.height,
  percent:Math.max(0,Math.min(1,props.percent)),
  startAngle:Math.PI, endAngle:2*Math.PI, radius:0.9, innerRadius:1-(props.thickness/100),
  indicator:{ pointer:{ style:{stroke:'#bbb',lineWidth:6}}, pin:{style:{r:9,fill:'#fff',stroke:'#bbb',lineWidth:6}} },
  axis:{ label:null, subTickLine:null, tickLine:null},
  range:{ color:props.colors, ticks:[0,1/3,2/3,1]},
  statistic:{
    title:{ formatter:()=>props.title, style:{fontSize:24,fill:props.colors[2]}, offsetY:30 },
    content:{ formatter:()=>props.subtitle, style:{fontSize:16,fill:'#8c8c8c'}, offsetY:60 },
  },
  animation:true,
})

const fit=()=>{ if(!el.value||!plot.value) return; const w=el.value.getBoundingClientRect().width||300; if(w>0) plot.value.changeSize(w,props.height) }

onMounted(async()=>{ await nextTick(); plot.value=build(); plot.value.render(); ro.value=new ResizeObserver(()=>{ if(el.value?.offsetParent) fit() }); ro.value.observe(el.value) })
onActivated(()=>setTimeout(fit,0))
onBeforeUnmount(()=>{ ro.value?.disconnect(); plot.value?.destroy() })

watch(()=>[props.percent,props.colors,props.title,props.subtitle,props.thickness,props.height],()=>{
  if(!plot.value) return
  plot.value.update({
    percent:Math.max(0,Math.min(1,props.percent)),
    range:{ color:props.colors, ticks:[0,1/3,2/3,1]},
    innerRadius:1-(props.thickness/100),
    statistic:{
      title:{ formatter:()=>props.title, style:{fontSize:24,fill:props.colors[2]}, offsetY:-10 },
      content:{ formatter:()=>props.subtitle, style:{fontSize:16,fill:'#8c8c8c'}, offsetY:18 },
    },
  })
  fit()
})
</script>
