import TodoRepository from "./todoRepository.js";

export default class TodoApplicatie {
  #todoRepository;

  constructor() {
    this.#todoRepository = new TodoRepository();
    this.addFunctionalities();
    this.toHTML();
  }

  addFunctionalities() {
    this.onclickTodosFunctionality();
    this.onclickRemoveCompletedTodosFunctionality();
  }

  onclickTodosFunctionality() {
    document.getElementById("btnAddTodo").onclick = () =>
      this.addTodoFunctionality();
    document.getElementById("addTodo").addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.addTodoFunctionality();
      }
    });
  }

  addTodoFunctionality() {
    const todoInputfield = document.getElementById("addTodo");
    if (todoInputfield.value != null && todoInputfield.value != "") {
      this.#todoRepository.addTodo(todoInputfield.value);
      todoInputfield.value = null;
      this.toHTML();
    }
  }

  convertTodosToHtml(todos) {
    const todosInHtml = [];
    todos.forEach((todo) => {
      const todoHtmlElement = document.createElement("div");
      const remove = document.createElement("span");
      remove.innerHTML = "&#x274C;";
      remove.setAttribute("role", "button");
      remove.onclick = () => this.#todoRepository.removeTodo(todo);
      todoHtmlElement.className = "form-check ";
      todoHtmlElement.onclick = () => this.onclickTodo(todo);
      todoHtmlElement.innerHTML = todo.toHTML();
      todoHtmlElement.insertAdjacentElement("beforeend", remove);
      todosInHtml.push(todoHtmlElement);
    });
    return todosInHtml;
  }

  onclickRemoveCompletedTodosFunctionality() {
    document.getElementById("btnRemoveCompletedTodos").onclick = () => {
      this.#todoRepository.removeCompletedTodos();
      this.toHTML();
    };
  }

  onclickTodo(todo) {
    todo.checked = !todo.checked;
    this.#todoRepository.setTodosInStorage();
    this.toHTML();
  }

  toHTML() {
    const uncheckedTodos = this.convertTodosToHtml(
      this.#todoRepository.uncheckedTodos
    );
    const checkedTodos = this.convertTodosToHtml(
      this.#todoRepository.checkedTodos
    );

    const uncheckedHTMLElement = document.getElementById("uncompleted-todos");
    uncheckedHTMLElement.innerHTML = null;
    uncheckedTodos.forEach((todo) => {
      uncheckedHTMLElement.insertAdjacentElement("beforeend", todo);
    });
    const checkedHTMLElement = document.getElementById("completed-todos");
    checkedHTMLElement.innerHTML = null;
    checkedTodos.forEach((todo) => {
      checkedHTMLElement.insertAdjacentElement("beforeend", todo);
    });
  }
}
