<template>
  <form @submit.prevent="onSubmit" style="text-align: center; margin-right: auto; margin-left: auto;">
    <i-button variant="light" style="width: 150px" type="submit" v-show=disabled>Редактировать</i-button>
    <i-button variant="success" style="width: 150px" @click="saveChanges" v-show=!disabled>Сохранить</i-button>
    <div>
      <span v-show=disabled style="width: 60%">
        <h2>{{ note.title }}</h2>
      </span>
      <i-input v-model="note.title" v-show=!disabled style="width: 60%; margin-left: 20%; padding-top: 1rem" />
    </div>
    <div style="margin-bottom: 50px">
      <span v-show=disabled style="width: 60%; height: 400px">
        {{ note.description }}
      </span>
      <i-textarea v-model="note.description" v-show=!disabled style="width: 60%; height: 700px; margin-left: 20%; padding-top: 1rem"/>
    </div>
    <span :key="time">
      Дата и время последнего изменения: {{ time }}
    </span>
    <span>
    </span>
  </form>
</template>

<script>
import db from "@/firebase"
export default {
  data() {
    return {
      disabled: true,
      time: this.note.changedAt
    }
  },
  props: {
    note: {
      type: [],
      default: ''
    }
  },
  methods: {
    disable() {
      this.disabled = !this.disabled
    },
    onSubmit() {
      this.disable()
    },
    saveChanges() {
      db.collection('notes').doc(this.note.id).update({
        title: this.note.title,
        description: this.note.description,
        changedAt: new Date().toLocaleString()
      })
      this.time = new Date().toLocaleString()
    },
  }
}
</script>






