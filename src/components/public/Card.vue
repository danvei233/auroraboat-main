<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
defineSlots()
</script>

<template>

  <a-card

    style="border-radius: 2px;

    padding: 0px 0px;
"
    :headStyle="{  display:'none' }"
    :bodyStyle="{ backgroundColor: '#fff',

         borderRadius: '2px'}">


    <a-typography-title
      style='
      padding-bottom: 8px;

color: rgba(38, 38, 38, 1);
margin:0;
font-size: 18px;
font-weight: 500;
line-height: 28px;
letter-spacing: 0px;
text-align: left;
'

      :level="4">{{title}}</a-typography-title>



<slot >

</slot>

</a-card>



</template>

<style scoped>

:deep(.ant-card-body){
  padding-left: 32px !important;
  overflow: hidden;
  position: relative;
}
</style>
