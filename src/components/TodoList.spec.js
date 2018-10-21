import { mount, shallowMount } from '@vue/test-utils'
import TodoList from './TodoList.vue'
import store from '../store'
import Vue from 'vue'
import ElementUI from 'element-ui';
Vue.config.productionTip = false
Vue.use(ElementUI);
const state = {
  list: {
    newTodo: '',
    idForTodo: 1,
    beforeEditCache: '',
    todos: []
  }
}
const getters = {
  todosFiltered: state => state.list.todos
}
// We can write tests using describe and it
describe('TodoList.vue', () => {
  test('Renders Element UI', () => {
    const wrapper = shallowMount(TodoList, { store })
    expect(wrapper.contains('elinput-stub')).toBe(true)
  })
})
it('TodoList snapshot should match with default snapshot', () => {
  const wrapper = shallowMount(TodoList, { store })
  expect(wrapper.element).toBeDefined();
  expect(wrapper.element).toMatchSnapshot();
});

it('TodoList should render ADD Button ', () => {
  const wrapper = shallowMount(TodoList, { store })
  expect(wrapper.find('span').text()).toBe('Add');
});
