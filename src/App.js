import React from 'react';
import { observer } from 'mobx-react';
import './App.css';

@observer
class App extends React.Component {
  filter = (e) => {
    this.props.store.filter = e.target.value;
  }

  clearCompleteTodos = () => {
    this.props.store.clearComplete();
  }

  createNewTodo = (e) => {
    if (e.which === 13) { // 13 is Enter key
      this.props.store.createTodo(e.target.value);
      e.target.value = '';
    }
  }

  toggleComplete = (e) => {
    const { todoId } = e.target.dataset;
    this.props.store.toggleTodoComplete(todoId);
  }

  render() {
    const { filter, filteredTodos, todos } = this.props.store;
    const todoList = filteredTodos.map((todo) => {
      return (
        <li key={todo.id}>
          {todo.value}
          <input
            type="checkbox"
            value={todo.complete}
            checked={todo.complete}
            data-todo-id={todo.id}
            onChange={this.toggleComplete}
          />
        </li>
      );
    });

    return (
      <div className="App">
        <h1>Mobx ToDo</h1>
        <div>
          <input
            className="create"
            onKeyPress={this.createNewTodo}
            placeholder="Buy flowers"
          />
        </div>
        <div>
          <input
            className="filter"
            value={filter}
            onChange={this.filter}
            placeholder="search"
          />
        </div>
        <ul>
          {todoList}
        </ul>
        <button
          type="button"
          onClick={this.clearCompleteTodos}
        >
          Clear Complete
        </button>
      </div>
    );
  }
}

export default App;
