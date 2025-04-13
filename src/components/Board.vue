<template>
    <div class="mx-auto max-w-screen-xl p-4 md:p-8">
        <div class="hidden md:flex gap-2.5 items-center">
          <div class="flex-1 not-italic font-semibold text-2xl leading-[150%] text-[#1D2939]">
            Hello, Here's your tasks
          </div>
          <button
            class="cursor-pointer w-28 h-[42px] px-[20px] py-[10.5px] bg-[#4186F4] rounded-lg not-italic font-medium text-sm leading-[150%] text-white"
            @click="openModalAdd = true"
            >
            Add a Task
           </button>

        </div>
        <button
             @click="openModalAdd = true"
             class="fixed z-10 bottom-12 right-4 size-12 rounded-full bg-[#4186F4] text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all"
             :class="isLargeScreen? 'hidden': ''"
             aria-label="Add Task"
         >
             <span class="text-lg">+</span>
         </button>

        <ModalAdd
            :isOpen="openModalAdd"
            title="Create Task"
            @handleAddTask="handleAddTask"
            @onClose="openModalAdd = false"
        />

        <div className="flex gap-5 md:gap-8 overflow-auto h-full mt-8">
            <Column 
                v-for="column in columns"
                :key="column.id"
                :title="column.title">
                <draggable
                    :list="column.tasks"
                    :animation="200"
                    ghost-class="ghost-card"
                    group="tasks"
                    style="min-height:800px"
                    class="flex flex-col gap-4">
                    <Card
                        v-for="card in column.tasks"
                        :status="column.id"
                        :key="card.id"
                        :taskId="card.id"
                        :title="card.title"
                        :description="card.description"
                        :types="card.types"
                    />
                </draggable>
            </Column>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Column from './Column.vue'
import Card from './Card.vue'
import ModalAdd from './ModalAdd.vue'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import { useTaskStore, type FormData, type Task } from '../stores/taskStore'
import { useMediaQuery } from '@vueuse/core'


const isLargeScreen = useMediaQuery('(min-width: 768px)')

const taskStore = useTaskStore()

const columns = taskStore.columns

const openModalAdd = ref<boolean>(false)

const handleAddTask = (payload: FormData) => {
    const updatedPayload: Task = {
        id: '',
        title: payload.title,
        description: payload.description,
        types: payload.types
    }
    taskStore.addTask(payload.status, updatedPayload)
    openModalAdd.value = false
}
</script>

<style scoped>
.ghost-card {
  opacity: 0.4;
  background: #F7FAFC;
}
</style>