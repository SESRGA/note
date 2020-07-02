<template>
  <form @submit.prevent="onSubmit">
    <table>
      <td>
        <i-input type="text" v-model="title" placeholder="Новая заметка"/>
      </td>
      <td>
        <i-button variant="primary" type="submit">Создать заметку</i-button>
      </td>
    </table>
  </form>
</template>

<script>
import db from "@/firebase"
export default {
  data() {
    return{
      title: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.title.trim()){
        db.collection('notes').add({
          title: this.title,
          description: '',
          changedAt: new Date().toLocaleString(),
          id: null,
          tag: '',
        })
            .then(function(docRef) {
              db.collection('notes').doc(docRef.id).update({
                id: docRef.id
              })
            })
        this.title = ''
        this.$emit('add-note', db.collection('notes').doc(this.id))

      }
    }
  }
}

</script>
