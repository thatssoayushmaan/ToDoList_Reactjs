import React from "react";
import "./styles.css";
import shortid from "shortid";
export default class App extends React.Component {
  state = {
    item: "",
    todos: [],
    selectedItem: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    //console.log(this.state.item);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.todos) {
      this.addItems({
        item: this.state.item,
        complete: false,
        id: shortid.generate()
      });
    } else if (
      this.state.todos.findIndex(
        (todo) => todo.item === this.state.selectedItem
      ) === -1
    ) {
      this.addItems({
        item: this.state.item,
        complete: false,
        id: shortid.generate()
      });
    } else {
      this.updatePosts({
        item: this.state.item,
        complete: false,
        id: shortid.generate()
      });
    }
  };

  addItems = (todo) => {
    let todos = [todo, ...this.state.todos];
    this.setState({ todos, item: "", selectedItem: "" });
  };

  deleteItem = (itemId) => {
    let todos = [...this.state.todos];
    const updatedList = todos.filter((todo) => todo.id !== itemId);
    this.setState({ todos: updatedList });
    console.log(todos);
  };

  selectPosts = (todo) => {
    this.setState({ item: todo.item, selectedItem: todo.item });
  };

  updatePosts = (todo) => {
    const todos = [...this.state.todos];
    const index = todos.findIndex(
      (item) => item.item === this.state.selectedItem
    );
    todos[index] = todo;
    this.setState({ todos, item: "", selectedItem: "" });
  };
  render() {
    return (
      <div className="App">
        <header>
          <h1>To Do List</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="...add item"
              type="text"
              name="item"
              value={this.state.item}
              onChange={this.handleChange}
              required
            />
            <button className="addBtn" onSubmit={this.handleSubmit}>
              Add Item
            </button>
          </form>
        </header>
        <br />
        <br />
        {this.state.todos.map((todo) => {
          return (
            <div key={todo.id}>
              <table className="table">
                <tbody>
                  <tr>
                    <td>{todo.item}</td>
                    <td>
                      {" "}
                      <button onClick={() => this.selectPosts(todo)}>
                        Update
                      </button>
                      <button
                        className="far"
                        onClick={() => this.deleteItem(todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  }
}
