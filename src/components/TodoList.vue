<template>
  <div class="todolist">
   <div  class="el-row todolist__mainContent" > 
      <div class="el-row">
        <div class="el-col el-col-20">
          <el-input placeholder="Create task" name="addTodoItem"  v-model="newTodo" @keyup.enter.native="addTodo()"></el-input> 
        </div>
        <div class="el-col el-col-1">&nbsp;
        </div>
        <div class="el-col el-col-3">
              <el-button type="button" name="AddButton"  size="medium" class="el-button--primary" @click="addTodo()"><span>Add</span></el-button>
        </div>
      </div>
    </div>
    <transition-group>
      <div v-for="(todo) in todosFiltered" :key="todo.id" class="transitiongroup__todoItem">
        <div class="transitiongroup__todoItem__left">
          <el-checkbox  type="checkbox" name="completedCheckbox" v-model="todo.completed" @change="completeTodo(todo)"></el-checkbox>
          <div class="transitiongroup__todoItem__left__label" :class="{ completed : todo.completed }">{{ todo.title }}</div>
        </div>
        <div class="transitiongroup__todoItem__removeItem" @click="removeTodo(todo._id)">
          &times;
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'todo-list',
  data() {
    return this.$store.state.list;
  },
  computed: mapGetters(['todosFiltered']),
  methods: mapActions(['addTodo', 'removeTodo', 'completeTodo', 'loadTodo']),
  mounted() {
    this.$store.dispatch('loadTodo');
  },
};
</script>

<style lang="scss">
.todolist {
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid lightgray;
  background: white;
  border-radius: 3px;
}
.todolist__mainContent {
  border-bottom: 1px solid lightgray;
  padding: 1em;
}
.transitiongroup__todoItem {
  padding-left: 1em;
  padding-right: 1em;
  border-bottom: 1px solid #eff6fc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
  font-size: 12px !important;
  &:hover {
    background: #eff6fc;
  }
}


.transitiongroup__todoItem__removeItem {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.transitiongroup__todoItem__left {
  display: flex;
  align-items: center;
}

.transitiongroup__todoItem__left__label {
  padding: 10px;
  margin-left: 12px;
}

.completed {
  text-decoration: bold;
  color: black;
}
</style>
