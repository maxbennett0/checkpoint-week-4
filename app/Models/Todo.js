export class Todo {
  constructor(data) {
    this.id = data.id
    this.completed = data.completed
    this.description = data.description
  }

  get todoTemplate() {
    if (this.completed == true) {
      return `
      <div>
      <input type="checkbox" name="taskCheck" id="taskCheck" onchange="app.inspireController.editTodo('${this.id}')" checked>
      <label for="todo">${this.description}</label>
      <i class="mdi mdi-delete selectable" onclick="app.inspireController.deleteTodo('${this.id}')"></i>
      </div>
      `
    } else if (this.completed == false) {
      return `
      <div>
      <input type="checkbox" name="taskCheck" id="taskCheck" onchange="app.inspireController.editTodo('${this.id}')">
       <label for="todo">${this.description}</label>
       <i class="mdi mdi-delete selectable" onclick="app.inspireController.deleteTodo('${this.id}')"></i>
      </div>
    `
    }
  }
}