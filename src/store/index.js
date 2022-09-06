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
        // getTodos(state, todos)
        // {
        //     return state.todos=todos
        // }
        incompleteTodos(state) {
            return state.todos.filter(todo => todo.completed == false)
        },
        completeTodos(state) {
            return state.todos.filter(todo => todo.completed == true)
        }
    },
    mutations: {
        // SET_TASKS(state, todos) {
        //     state.todos = todos
        //     window.localStorage.JSON.stringify(todos)
        // },
        // NEW_TASK(state, todo) {
        //     let todos = state.todos.concat(todo)
        //     state.todos = todos
        //     console.log(todo)
        // },
        
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
        EDIT_TASK(state, todo) {
            // let todos = state.todos.concat(todo)
            state.todos.forEach(t => {
            // const index = state.todos.findIndex((todo) =>todo.id === t.id)
            if(t.id == todo.id)
                {
                    // var mytodos = state.todos.splice(index, 1, todo);
                    localStorage.setItem("TASKS", JSON.stringify(mytodos));
                    state.todos = JSON.parse(localStorage.getItem("TASKS"));
                }
            });
            
        },
        DELETE_TODO(state, todoId)
        {
            let todos = state.todos.filter(t => t.id != todoId)
            state.todos = todos
        },
        TOGGLE_TODO(state, { id, completed }) {
            state.todos.find(todo => todo.id == id).completed = completed
        }
    },
    actions: {
        // addTodo(todo) {
        //     this.todos.push(todo);
        // },
        // addTodo({commit},title){
        //     const response = await axios.post(`https://tychak.github.io/`,
        //     {title:title,date_added:false})
        //     commit('addTodo',response.data)
        // },
        fetchTodos({commit}) {
            return axios.get('https://tychak.github.io/')
                .then(response => {
                    commit('SET_TASKS', response.data)
                })
        },
        addTodo({commit}, todo) {
            commit('NEW_TASK', todo)
            // let myData = JSON.stringify(todo)
            // return axios
            // .post('https://tychak.github.io/', {myData})
            // .then(response=>{
            //     localStorage.setItem("myTasks", response.data.myTasks)
            //     commit('newTask', respose.data)
            // })
        },
        deleteTodos({commit}, todo) {
            commit("DELETE_TODO", todo.id)
        },
        editTodos({ commit }, todo) {
            commit('EDIT_TASK', todo)
        },
        toggleTodo(context, { id, completed }) {
            //Api call that will toggle the completed state of the todo in the database 
            context.commit('TOGGLE_TODO', { id, completed })
        }
    }
})