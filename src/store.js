import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const storeData = {
    newTodo: '',
    idForTodo: 1,
    beforeEditCache: '',
    todos: [],
};
const getters = {
    todosFiltered: (state) => {
        return state.list.todos;
    },
};
const mutations = {
    addTodo(state) {
        const newTodo = {
            id: state.list.idForTodo,
            title: state.list.newTodo,
            completed: false,
        };
        axios.post('http://localhost:8081/todos/', newTodo)
            .then((res) => {
                console.log('Added', res);
                state.list.todos.push(res.data.createdTodo);
                state.list.newTodo = '';
                state.list.idForTodo = state.list.idForTodo + 1;
                return res;
            });
    },
    removeTodo(state, { index }) {
        // state.list.todos.splice(index, 1);
        console.log(index);
        const todosUpdatedList = [];
        axios.delete(`http://localhost:8081/todos/${index}`)
            .then((res) => {
                state.list.todos.forEach((todo) => {
                    if (todo._id !== index) { todosUpdatedList.push(todo); }
                });
                state.list.todos = todosUpdatedList;
                return res;
            });
    },
    completeTodo(state, { todoSelected }) {
        state.list.todos.forEach((todo) => {
            if (todo.id === todoSelected.id) { todo.completed = todoSelected.completed; }
        });
        axios.patch(`http://localhost:8081/todos/${todoSelected._id}`, todoSelected)
            .then((res) => {
                return res;
            });
    },
    loadTodo(state) {
        axios.get('http://localhost:8081/todos/')
            .then((response) => {
                state.list.todos = response.data;
                state.list.newTodo = '';
                state.list.idForTodo = (response.data[response.data.length - 1].id) + 1;
                console.log(state);
            })
            .catch((e) => {
                console.log('Error Occured', e);
            });
    },
};
const actions = {
    addTodo: ({ commit }) => {
        commit('addTodo');
    },
    removeTodo: ({ commit }, index) => {
        commit('removeTodo', { index });
    },
    completeTodo: ({ commit }, todoSelected) => {
        commit('completeTodo', { todoSelected });
    },
    loadTodo: ({ commit }, todoSelected) => {
        commit('loadTodo', { todoSelected });
    },
};

export const store = new Vuex.Store({
    state: {
        list: storeData,
    },
    getters,
    mutations,
    actions,
});
export default store;
