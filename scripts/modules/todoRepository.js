import TodoComponent from "./todoComponent.js";

export default class TodoRepository {
  #storage;
  #repository;

  constructor() {
    this.#storage = localStorage;
    this.#repository = [];
    this.getTodosFromStorage();
  }

  get todos() {
    return this.#repository;
  }

  get uncheckedTodos() {
    return this.#repository.filter((todo) => !todo.checked);
  }

  get checkedTodos() {
    return this.#repository.filter((todo) => todo.checked);
  }

  removeCompletedTodos() {
    this.#repository = this.#repository.filter((todo) => !todo.checked);
    this.setTodosInStorage();
  }

  removeTodo(deleteTodo) {
    this.#repository = this.#repository.filter((todo) => todo != deleteTodo);
    this.setTodosInStorage();
  }

  addTodo(todoText) {
    const todo = new TodoComponent(
      this.#repository.length > 0
        ? this.#repository[this.#repository.length - 1].id + 1
        : 0,
      todoText
    );
    console.log(todo);
    this.#repository.push(todo);
    this.setTodosInStorage();
  }

  setTodosInStorage() {
    try {
      const myJSON = JSON.stringify(
        this.#repository.map((todo) => ({
          id: todo.id,
          text: todo.text,
          checked: todo.checked,
        }))
      );
      this.#storage.setItem("todos", myJSON);
    } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) alert("Quota exceeded!");
    }
  }

  getTodosFromStorage() {
    if (
      this.#storage.getItem("todos") &&
      this.#storage.getItem("todos").length > 0
    ) {
      this.#repository = JSON.parse(this.#storage.getItem("todos")).map(
        (todo) => {
          const todoComp = new TodoComponent(todo.id, todo.text);
          todoComp.checked = todo.checked;
          return todoComp;
        }
      );
    }
  }
}
