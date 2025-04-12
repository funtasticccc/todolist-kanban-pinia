<template>
  <div class="relative cursor-move box-border bg-white p-5 shadow-[0px_0.5px_2px_rgba(16,24,40,0.3)] rounded-lg">
    <div class="flex items-start gap-2">
      <h3 class="flex-1 not-italic font-bold text-lg leading-[150%] text-[#1D2939] line-clamp-2 break-words">{{ title }}</h3>
      
      <div class="flex gap-2 items-center">
        <button class="cursor-pointer" @click="openModalEdit">
          <EditIcon />
        </button>
        
        <button class="cursor-pointer" @click="isModalConfirmationOpen = true">
          <DeleteIcon />
        </button>
      </div>
    </div>

    <div class="mt-0.5 flex flex-col gap-5">
      <p :class="{'line-through': status === 'DONE'}" class="not-italic font-medium text-sm leading-[150%] text-[#1D2939] opacity-60 mt-4">
        {{ description }}
      </p>

      <div class="flex justify-start gap-2">
        <Badge
          v-for="(tag, index) in computedTypes"
          :key="index"
          :text="tag.text"
          :bgColor="tag.bgColor"
          :textColor="tag.textColor"
        />
      </div>
    </div>

    <ModalConfirmation
      :isOpen="isModalConfirmationOpen"
      title="Confirm Action"
      description="Are you sure you want to delete this task?"
      @cancel="isModalConfirmationOpen = false"
      @confirm="handleConfirm"
    />

    <ModalEdit
      :isOpen="isModalEditOpen"
      title="Edit Task"
      :task="taskToEdit"
      @handleAddTask="updateTask"
      @onClose="closeModalEdit"
    />

  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import Badge from './Badge.vue'
  import EditIcon from '../assets/icons/EditIcon.vue'
  import DeleteIcon from '../assets/icons/DeleteIcon.vue'
  import ModalConfirmation from './ModalConfirmation.vue'
  import ModalEdit from './ModalEdit.vue'
  import { useTaskStore } from '../stores/taskStore'

  const props = defineProps({
    status: {
      type: String,
      required: true
    },
    taskId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      default: () => []
    },
    types: {
      type: Array,
      default: () => []
    }
  })

  const taskStore = useTaskStore()

  const isModalConfirmationOpen = ref<boolean>(false)
  const handleConfirm = () => {
    taskStore.deleteTask(props.status, props.taskId)
    isModalConfirmationOpen.value = false
  }

  const typeActivity = {
    SHOPPING: { bgColor: '#FF5733', textColor: '#FFFFFF' },
    WORK: { bgColor: '#4CAF50', textColor: '#FFFFFF' },
    SOCIAL: { bgColor: '#2196F3', textColor: '#FFFFFF' },
    FINANCE: { bgColor: '#FF9800', textColor: '#FFFFFF' },
    HEALTH: { bgColor: '#FF5722', textColor: '#FFFFFF' },
    HOUSEHOLD: { bgColor: '#9C27B0', textColor: '#FFFFFF' },
    EDUCATION: { bgColor: '#3F51B5', textColor: '#FFFFFF' },
    TRAVEL: { bgColor: '#00BCD4', textColor: '#FFFFFF' },
    CREATIVE: { bgColor: '#E91E63', textColor: '#FFFFFF' },
    ERRAND: { bgColor: '#FFC107', textColor: '#000000' },
    MISCELLANEOUS: { bgColor: '#795548', textColor: '#FFFFFF' }
  }

  const computedTypes = computed(() => {
    return props.types.map((type) => {
      const { bgColor, textColor } = typeActivity[type] || { bgColor: '#adadad', textColor: '#FFFFFF' }
      return {
        text: type,
        bgColor,
        textColor
      }
    })
  })

  const isModalEditOpen = ref(false)
  const taskToEdit = ref({
    title: "",
    description: "",
    status: "",
    types: []
  })

  const openModalEdit = () => {
    isModalEditOpen.value = true
    taskToEdit.value = {
      title: props.title,
      description: props.description,
      status: props.status,
      types: props.types
    }
  }

  const closeModalEdit = () => {
    isModalEditOpen.value = false
  }

  const updateTask = (payload) => {
    taskStore.updateTask(props.taskId, payload, props.status, payload.status)
  }
</script>
