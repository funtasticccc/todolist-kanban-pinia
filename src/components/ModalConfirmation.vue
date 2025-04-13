<template>
    <div v-if="isOpen" class="fixed cursor-default inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="relative w-[500px] max-h-[300px]">
        <!-- Modal content -->
        <div class="relative mx-4 md:mx-auto bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 class="not-italic font-medium text-xl leading-[120%] text-[#212529] dark:text-white">
              {{ title }}
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="onCancel"
            >
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
  
          <!-- Modal body -->
          <div class="px-4 py-6">
            <p class="text-sm text-[#697386] dark:text-gray-300">{{ description }}</p>
          </div>
  
          <!-- Modal footer with cancel and confirm buttons -->
          <div class="flex items-center justify-end gap-4 p-4 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              @click="onCancel"
              class="inline-flex items-center bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-blue-800"
            >
              {{ cancelText }}
            </button>
            <button
              type="button"
              @click="onConfirm"
              class="text-white inline-flex items-center bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface ModalConfirmationProps {
    isOpen: boolean
    title: string
    description: string
    cancelText?: string
    confirmText?: string
  }

  const {
    isOpen,
    title,
    description,
    cancelText = 'Cancel',
    confirmText = 'Yes, Delete'
  } = defineProps<ModalConfirmationProps>()
  
  const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'confirm'): void
  }>()
  
  const onCancel = () => {
    emit('cancel')
  }
  
  const onConfirm = () => {
    emit('confirm')
  }
  </script>
  
  <style scoped>
  </style>
  