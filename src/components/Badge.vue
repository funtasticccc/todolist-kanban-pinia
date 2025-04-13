<template>
    <div
      :style="{ backgroundColor: bgColor, color: textColor }"
      class="flex items-center justify-center box-border px-2 py-1.5 rounded-md not-italic font-semibold text-[13px] leading-4 capitalize">
      {{ text }}
    </div>
  </template>
  
<script setup lang="ts">
  defineProps<{
    text: string
    bgColor: string
    textColor: string
  }>()
</script>
  