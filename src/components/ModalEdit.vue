<template>
    <div v-if="isOpen" id="crud-modal" tabindex="-1" aria-hidden="true" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="relative w-[500px] max-h-[544px]">
        <div class="relative mx-4 md:mx-auto bg-white rounded-lg shadow-sm dark:bg-gray-700 overflow-auto max-h-[95vh]">
          <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 class="not-italic font-medium text-xl leading-[120%] text-[#212529] dark:text-white">
              {{ title }}
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="emit('onClose')"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
  
          <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-4 py-4">
              <div class="px-4">
                <label for="title" class="block mb-1 not-italic font-semibold text-xs leading-4 text-[#697386] dark:text-white">
                  Task Title*
                </label>
                <input
                  type="text"
                  id="title"
                  v-model="formData.title"
                  autocomplete="off"
                  class="bg-gray-50 border not-italic font-normal text-sm leading-6 text-[#697386] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  :class="{'border-red-500': errors.title, 'border-gray-300': !errors.title}"
                  placeholder="Task title here.."
                />
                <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
              </div>
  
              <div class="px-4">
                <label for="description" class="block mb-1 not-italic font-semibold text-xs leading-4 text-[#697386] dark:text-white">
                  Description
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="4"
                  class="block p-2.5 w-full not-italic font-normal text-sm leading-6 text-[#697386] bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[88px]"
                  placeholder="Description.."
                ></textarea>
              </div>
  
              <div class="px-4">
                <label class="block mb-1 not-italic font-semibold text-xs leading-4 text-[#697386] dark:text-white">
                  Type of Activity
                </label>
                <div class="relative">
                  <button
                    type="button"
                    @click="toggleDropdown"
                    class="bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full text-left focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <span v-if="formData.types.length === 0" class="not-italic font-normal text-sm leading-6 text-[#697386] dark:text-white dark:placeholder-gray-400">Select Activities</span>
                    <span v-else>
                        <div class="flex gap-2 flex-wrap">
                            <Badge
                                v-for="item of formData.types"
                                :key="item"
                                :text="item"
                                :bgColor="'#afafaf'"
                                :textColor="'#ffffff'"
                                />
                        </div>
                    </span>
                  </button>
                  <div
                    v-if="isDropdownOpen"
                    class="absolute mt-2 bg-white shadow-lg rounded-lg w-full border border-gray-300 dark:bg-gray-700 dark:border-gray-500 z-10 overflow-auto h-32"
                  >
                    <div class="p-2 flex flex-col gap-1 justify-between">
                      <div
                        v-for="activity in typeActivity"
                        :key="activity.value"
                        class="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          :id="activity.value"
                          :value="activity.value"
                          v-model="formData.types"
                          class="form-checkbox h-4 w-4 text-primary-600"
                        />
                        <label :for="activity.value" class="text-sm text-[#697386] dark:text-white">{{ activity.label }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="px-4">
                <label for="status" class="block mb-1 not-italic font-semibold text-xs leading-4 text-[#697386] dark:text-white">
                  Status
                </label>
                <div class="relative">
                  <select
                    v-model="formData.status"
                    id="status"
                    class="bg-gray-50 border border-gray-300 not-italic font-normal text-sm leading-6 text-[#697386] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 appearance-none"
                  >
                    <option v-for="status in statusOptions" :key="status.value" :value="status.value" class="">
                      {{ status.label }}
                    </option>
                  </select>
                  <span class="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
  
            <div class="box-border flex flex-row justify-end items-center gap-2 p-3 border-t-[#DEE2E6] border-t">
              <button
                type="button"
                @click="emit('onClose')"
                class="inline-flex items-center bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
  
              <button
                type="submit"
                class="text-white inline-flex items-center bg-[#4186f4] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Badge from './Badge.vue'
import type { ActivityType, ColumnStatus } from '../stores/taskStore';

const emit = defineEmits(['handleAddTask', 'onClose'])

interface IFormEdit {
  title: string
  description: string
  status: ColumnStatus
  types: ActivityType[]
}

const props = defineProps<{
  isOpen: boolean
  title: string
  task?: IFormEdit | null
}>()

const formData = ref<IFormEdit>({
  title: "",
  description: "",
  status: "TO-DO",
  types: []
})

const errors = ref({
  title: ""
})

const statusOptions = [
  { value: "TO-DO", label: "TO DO" },
  { value: "DOING", label: "DOING" },
  { value: "DONE", label: "DONE" }
]

const typeActivity = [
  { value: 'SHOPPING', label: 'Shopping' },
  { value: 'WORK', label: 'Work' },
  { value: 'SOCIAL', label: 'Social' },
  { value: 'FINANCE', label: 'Finance' },
  { value: 'HEALTH', label: 'Health' },
  { value: 'HOUSEHOLD', label: 'Household' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'TRAVEL', label: 'Travel' },
  { value: 'CREATIVE', label: 'Creative' },
  { value: 'ERRAND', label: 'Errand' },
  { value: 'MISCELLANEOUS', label: 'Miscellaneous' }
]

watch(() => props.task, (newTask) => {
  if (newTask) {
    formData.value = { ...newTask }
  }
})

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}


const handleSubmit = () => {
  if (!formData.value.title.trim()) {
    errors.value.title = "Task title is required"
    return
  }

  errors.value.title = ""

  emit('handleAddTask', formData.value)
  emit('onClose')

  formData.value = {
    title: "",
    description: "",
    status: "TO-DO",
    types: []
  }
}
</script>
