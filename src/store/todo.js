import axios from 'axios'
export const todo =
{
    state: {
        todos: [],
        myTodos: []
    },
    getters: {
        // getTodos(state, todos)
        // {
        //     return state.todos=todos
        // }
    },
    mutations: {
        SET_TASKS(state, todos) {
            state.todos = todos
            window.localStorage.JSON.stringify(todos)
        },
        NEW_TASK(state, todo) {
            let todos = state.todos.concat(todo)
            state.todos = todos
            console.log(todo)
        },
        EDIT_TASK(state, taskId) {
            state.todos = state.todos.filter((todo => todo.id !== taskId))
            let todos = state.todos.concat(todo)
            state.todos = todos
        },
        removeTodo: (state, id) => state.todos = state.todos.pop((todo) => todo.id !== id),
        newTask: (state, todo) => state.myTodos.unshift(todo)
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
        deleteTodos({commit}, id) {
            return axios.delete('https://tychak.github.io/${id}')
                .then(response => {
                    commit('removeTodo', response.data)
                })
        },
        editTodos({
            commit
        }, id) {
            commit('EDIT_TASK', taskId)
        }
    }
}