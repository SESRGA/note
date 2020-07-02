<template>
  <div>
    <table >
      <td>
        <AddNote
            @add-note="AddNote"
        />
      </td>
      <td>
        <select v-model="filter" >
          <option v-for="tag in this.tags" :key="tag" >{{tag}}</option>
        </select>
      </td>
    </table>
    <hr>
    <loader v-if="loading" />
    <NoteList
        v-else-if="selectedTags.length"
        :notes="selectedTags"
        @remove-note="removeNote"
    />
    <p v-else>Заметок нет</p>
  </div>
</template>

<script>
import NoteList from '@/components/NoteList'
import AddNote from '@/components/AddNote'
import Loader from '@/components/Loader'
import db from "@/firebase"
export default {
  name: 'App',
  data() {
    return{
      notes: [],
      tags: [],
      loading: true,
      filter: "Без тэгов"
    }
  },
  mounted() {
    this.fetchNotes()
  },
  computed: {
    selectedTags() {
      if(this.filter === "Без тэгов" ) {
        return this.notes
      }
      else {
        return this.notes.filter(t => t.tag === this.filter)
      }
    }
  },
  methods: {
    removeNote(id) {
      this.notes = this.notes.filter(t => t.id != id)
      db.collection('notes').doc(id).delete().then(function() {
        console.log('Document successfully deleted!');
      }).catch(function(error) {
        console.error('Error removing document: ', error);
      });
    },
    AddNote(note) {
      this.notes.push(note)
    },

    fetchNotes(){
      db.collection('notes').orderBy('changedAt').onSnapshot((querySnapshot)=>{
        let allNotes=[];
        let allTags=[];
        querySnapshot.forEach(doc=>{
          allNotes.push(doc.data())
          allTags.push(doc.data().tag)
        })
        this.tags = this.removeDoubledElements(allTags)
        this.tags.push("Без тэгов")
        this.notes = allNotes
        this.loading = false
      })
    },
    removeDoubledElements(arr) {
      let result = []
      for (let str of arr) {
        if (!result.includes(str)) {
          if (str != "") {
            result.push(str);
          }
        }
      }
      return result;
    }
  },
  components: {
    NoteList,
    AddNote,
    Loader
  }
}
</script>

<style scoped>
table{
  width: 100%;
  height: 100%;
  align: center;
  display: flex;
}
td{
  width: 50%;
  padding: 1rem 3rem;
}
select{
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: lightgray solid 1px;
  padding-left: 5px;
}
</style>