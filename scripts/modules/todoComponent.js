export default class TodoComponent {
  #id;
  #text;
  #checked;

  constructor(id, text) {
    this.id = id;
    this.#text = text;
    this.checked = false;
  }

  get id() {
    return this.#id;
  }
  get text() {
    return this.#text;
  }
  get checked() {
    return this.#checked;
  }

  set id(id) {
    this.#id = id;
  }
  set checked(isChecked) {
    this.#checked = isChecked;
  }

  toHTML() {
    return `
      <input class="form-check-input" type="checkbox" id="todo-${this.id}"${
      this.checked ? " checked" : ""
    }>
      <label class="form-check-label" for="todo-${this.id}">
        ${this.#text}
      </label>
    `;
  }
}
