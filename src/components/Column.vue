<template>
    <div class="flex-1 p-0.5 min-w-[300px] max-w-[380px]">
      <h2 class="not-italic font-bold text-xs leading-[15px] text-[#667085] uppercase mb-4">
        {{ title }}
      </h2>
      <div class="">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'Column',
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  })
</script>
  