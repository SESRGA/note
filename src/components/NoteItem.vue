<template>
  <li>
    <i-table style="margin-bottom: 0">
      <td>
        <strong>{{index + 1}}</strong>
      </td>
        <td>
        {{ note.title }}
        </td>
      <td>
        <i-button variant="light" router-link :to="{name: 'NoteUpdate', params: {id: note.id, note: note}}"
        >
            Редактировать
        </i-button>
      </td>
      <td style="width: 15%">
        <span>Последнее изменение {{note.changedAt}} </span>
      </td>
      <td style="width: 17%">
        <i-form-label v-show=disabled >{{ note.tag }}</i-form-label>
        <i-input v-show=!disabled v-model="note.tag" />
      </td>
      <td style="width: 12%">
          <i-button @click=disable variant="info" v-show=disabled style="width: 150px">Изменить тэг</i-button>
          <i-button v-show=!disabled @click=saveTag variant="success" style="width: 150px">Сохранить</i-button>
      </td>
      <td>
        <i-button variant="danger" @click="$emit('remove-note', note.id)">Удалить</i-button>
      </td>
    </i-table>
  </li>
</template>

<script>
import db from "@/firebase"
export default {
  data() {
    return{
      disabled: true
    }
  },
  props: {
    note: {
      type: Object,
      required: true
    },
    index: Number
  },
  methods: {
    disable() {
      this.disabled = !this.disabled
    },
    saveTag() {
      db.collection('notes').doc(this.note.id).update({
        tag: this.note.tag
      })
      this.disable()
    }
  }
}
</script>

<style scoped>
  li{
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding: .5rem 2rem;
    margin-bottom: 1rem;
  }
</style>