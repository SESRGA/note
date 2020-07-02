<template>
  <div>
    <h1>Редактирование заметки</h1>
    <i-button variant="primary" style="margin-bottom: 1rem; width: 150px" router-link to="/">Назад</i-button>
    <ItemUpdate
        :note=$route.params.note
    />
  </div>
</template>

<script>
import ItemUpdate from '@/components/ItemUpdate'
export default {
  components: {
    ItemUpdate
  },
}
</script>