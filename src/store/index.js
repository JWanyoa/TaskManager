import {
    createStore
} from 'vuex';
import axios from 'axios'

export default createStore({
    state: {
        todos: JSON.parse(localStorage.getItem("TASKS"))
        ? JSON.parse(localStorage.getItem("TASKS"))
        : [],
        myTodos: []
    },
    getters: {
        incompleteTodos(state) {
            return state.todos.filter(todo => todo.completed == false)
        },
        completeTodos(state) {
            return state.todos.filter(todo => todo.completed == true)
        }
    },
    mutations: {    
        SET_TASKS(state, todos)
        {
            // state.todos = todos
            let mytodos = state.todos
            localStorage.setItem("TASKS", JSON.stringify(mytodos));
            state.todos = JSON.parse(localStorage.getItem("TASKS"));
        },
        NEW_TASK(state, todo)
        {
            let todos = state.todos.concat(todo)
            localStorage.setItem("TASKS", JSON.stringify(todos))
            state.todos = JSON.parse(localStorage.getItem(todos))
        },
        EDIT_TASK(state, {id}) {
            var myTodo = JSON.parse(localStorage.getItem('TASKS'))
            for (var i = 0; i < myTodo.length; i++) {
                if(myTodo[i].id == id)
                {
                    myTodo = state.todos
                }
            }
            localStorage.setItem('TASKS', JSON.stringify(myTodo));
        },
        DELETE_TODO(state, {id})
        {
            let tasks = state.todos.filter(t => t.id != id)
            state.todos = tasks
            var myTodo = JSON.parse(localStorage.getItem('TASKS'))
            for (var i = 0; i < myTodo.length; i++) {
                if(myTodo[i].id == id)
                {
                    myTodo = state.todos
                }
            }
            localStorage.setItem('TASKS', JSON.stringify(myTodo));
        },
        TOGGLE_TODO(state, { id, completed }) {
            //mark tasks as completed
            state.todos.find(todo => todo.id == id).completed = completed
            var myTodo = JSON.parse(localStorage.getItem('TASKS'))
            for (var i = 0; i < myTodo.length; i++) {
                if(myTodo[i].id == id)
                {
                    myTodo[i].completed = completed;
                }
            }
            localStorage.setItem('TASKS', JSON.stringify(myTodo)); 
        }
    },
    actions: {
        
        fetchTodos({commit}) {
            return axios.get('https://tychak.github.io/')
                .then(response => {
                    commit('SET_TASKS', response.data)
                })
        },
        addTodo({commit}, todo) {
            commit('NEW_TASK', todo)
        },
        deleteTodos(context, {id}) {
            context.commit("DELETE_TODO", {id})
        },
        editTodos(context, {id}) {
            context.commit('EDIT_TASK', {id})
        },
        toggleTodo(context, { id, completed }) {
            //Call to toggle completed tasks
            context.commit('TOGGLE_TODO', { id, completed })
        }
    }
})