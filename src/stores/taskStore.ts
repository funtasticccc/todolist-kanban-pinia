import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { v4 as uuidv4 } from 'uuid'

interface Task {
  id: string
  title: string
  description: string
  types: string[]
}

interface Column<T> {
  title: string
  id: string
  tasks: T
}

const initialData: Column<Task[]>[] = [
    {
      title: "To Do",
      id: "TO-DO",
      tasks: [
        {
          id: "todo-001",
          title: "Grocery Shopping",
          description: "Buy groceries for the week. Remember to get fresh produce, dairy, and snacks. Don't forget the bread and eggs.",
          types: ["SHOPPING", "ERRAND"],
        },
        {
          id: "todo-002",
          title: "Laundry",
          description: "Wash, dry, and fold clothes. Separate whites from colors and make sure to dry the delicate items on low heat.",
          types: ["HOUSEHOLD", "ERRAND"],
        }
      ]
    },
    {
      title: "Doing",
      id: "DOING",
      tasks: [
        {
          id: "doing-001",
          title: "Vacuum Living Room",
          description: "Vacuum the living room floor, including under the couch and around the furniture. Make sure to get the rug clean as well.",
          types: ["HOUSEHOLD", "ERRAND"],
        }
      ]
    },
    {
      title: "Done",
      id: "DONE",
      tasks: [
        {
          id: "done-001",
          title: "Walk the Dog",
          description: "Took the dog for a 30-minute walk around the neighborhood. He loved the sunshine today!",
          types: ["TRAVEL", "ERRAND"],
        }
      ]
    }
  ]

export const useTaskStore = defineStore('taskStore', () => {
  const loadData = () => {
    const savedData = localStorage.getItem('taskColumns')
    if (savedData) {
      return JSON.parse(savedData)
    } else {
      return initialData
    }
  }

  const columns = ref<Column<Task[]>[]>(loadData())

  watchEffect(() => {
    localStorage.setItem('taskColumns', JSON.stringify(columns.value))
  })

  const addTask = (columnId: string, task: Task) => {
    const column = columns.value.find(col => col.id === columnId)
    if (column) {
      column.tasks.push({
        ...task,
        id: uuidv4()
      })
    }
  }

  const deleteTask = (columnId: string, taskId: string) => {
    const column = columns.value.find(col => col.id === columnId)
    if (column) {
      column.tasks = column.tasks.filter(task => task.id !== taskId)
    }
  }

  const updateTask = (taskId: string, updatedTask: Task, oldColumnId: string, newColumnId: string) => {
    let oldColumn: Column<Task[]> | undefined
    let taskToUpdate: Task | undefined
    let oldIndex = -1

    for (const column of columns.value) {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        oldColumn = column
        taskToUpdate = column.tasks[taskIndex]
        oldIndex = taskIndex
        break
      }
    }

    if (!taskToUpdate) {
      throw new Error("Task not found")
    }

    taskToUpdate.title = updatedTask.title
    taskToUpdate.description = updatedTask.description
    taskToUpdate.types = updatedTask.types

    if (oldColumnId !== newColumnId) {
      oldColumn?.tasks.splice(oldIndex, 1)

      const newColumn = columns.value.find(col => col.id === newColumnId)
      if (newColumn) {
        newColumn.tasks.push(taskToUpdate)
      } else {
        throw new Error("Target column not found")
      }
    }
  }

  return { columns, addTask, deleteTask, updateTask }
})
