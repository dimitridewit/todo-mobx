import { computed, observable } from 'mobx';

class Todo {
  @observable value
  @observable complete
  @observable id

  constructor(value) {
    this.value = value;
    this.id = Date.now().toString();
    this.complete = false;
  }
}

class TodoStore {
  @observable todos = [ new Todo('Pet Motto')] // Now a Observable Arr

  @observable filter = ''
  @computed get filteredTodos() {
    var matchesFilter = new RegExp(this.filter, "i");

    return this.todos.filter((todo) => {
      return !this.filter || matchesFilter.test(todo.value);
    });
  }

  createTodo(value) {
    this.todos.push(new Todo(value));
  }

  toggleTodoComplete(todoId) {
    let todo = this.todos.find(todo => todo.id === todoId);
    todo.complete = !todo.complete;
  }

  deleteTodo(todoId) {
    let todo = this.todos.find(todo => todo.id === todoId);
  }

  clearComplete = () => {
    // Because todos is a observable array
    // you have to use a Mobx given replace method.
    // If you'd just do this.todos = .. you'd mess up the reference.
    const incompleteTodos = this.todos.filter(todo => !todo.complete);
    this.todos.replace(incompleteTodos);
  }
}

var store = window.store = new TodoStore();

export default store;
