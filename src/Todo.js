// import cx from 'classnames';
import { Component } from "react";

export default class TodoList extends Component {
  state = {
    todos: [],
    newTodo: "",
    pending: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      this.setState({
        pending: this.state.todos.filter((item) => item.done === false).length,
      });
    }
  }

  addTodo = (e) => {
    e.preventDefault();
    if (this.state.newTodo) {
      this.state.todos.push({ todo: this.state.newTodo, done: false });
      this.setState({ todos: this.state.todos });

      this.setState({ newTodo: "" });
    }
    document.getElementById("todoInput").focus();
  };

  toggleDone = (i) => {
    const todoM = this.state.todos.map((item, index) => {
      if (index === i) {
        item.done = !item.done;
      }
      return item;
    });

    this.setState({ todos: todoM });
  };

  render() {
    return (
      <>
        <div>
          <h2>Todo List</h2>
        </div>
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            id="todoInput"
            value={this.state.newTodo}
            onChange={({ target }) => this.setState({ newTodo: target.value })}
          ></input>
          <button type="submit">Add</button>
        </form>
        <p>
          {this.state.pending} remaining out of {this.state.todos.length} tasks
        </p>
        <ul>
          {this.state.todos.map((item, index) => (
            <li
              className={item.done ? "is-done" : ""}
              style={{ cursor: "pointer" }}
              key={index}
              onClick={() => this.toggleDone(index)}
            >
              {item.todo}
            </li>
          ))}
        </ul>
        <style>{`
            .is-done {
                text-decoration: line-through;
            }
        `}</style>
      </>
    );
  }
}
