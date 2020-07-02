<template>
  <div>
    <ul>
      <NoteItem
        v-for="(note, i) of notes" :key="note"
        :note="note"
        :index = i
        @remove-note="removeNote"
      />
    </ul>
  </div>
</template>
<script>
  import NoteItem from "@/components/NoteItem";
  export default {
    props: ['notes'],
    components:{
      NoteItem
    },
    methods: {
      removeNote(id) {
        this.$emit('remove-note', id)
      }
    }
  }
</script>

<style scoped>
  ul{
    list-style: none;
    margin: 0 1rem;
    padding: 0;
  }
</style>