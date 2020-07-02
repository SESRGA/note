import Vue from 'vue'
import Router from 'vue-router'
import NoteUpdate from "@/views/NoteUpdate";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('./views/Notes.vue'),
            props: true
        },
        {
            path: '/update/:id',
            component: NoteUpdate,
            name: 'NoteUpdate',
            props: true
        }
    ]
})