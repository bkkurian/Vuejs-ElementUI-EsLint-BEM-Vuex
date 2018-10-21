<template>
<div  id="app" class="el-row appcontainer">
  <div class="el-col el-col-24">
     <header class="el-header appcontainer__header" >About</header>
     <main class="el-main appcontainer__main"> 
        <todo-list></todo-list>  
    </main> 
    </div>
</div>    
</template>

<script>
import TodoList from './components/TodoList';

export default {
    name: 'App',
    components: {
        TodoList,
  },
};
</script>

<style>

.appcontainer {
  font-family: Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.appcontainer__header {
  height: 30px;
  font-size: 12px;
  color: steelblue;
}
.appcontainer__main {
  background-color: #eff6fc;
  border: 1px solid steelblue;
  color: #333;
}
</style>
