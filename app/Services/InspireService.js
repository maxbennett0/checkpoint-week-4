import { appState } from "../AppState.js"
import { Image } from "../Models/Image.js";
import { Quote } from "../Models/Quote.js";
import { Todo } from "../Models/Todo.js";
import { Weather } from "../Models/Weather.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML, setText } from "../Utils/Writer.js";
import { cwApi } from "./AxiosService.js"

class InspireService {
  async editTodo(id) {
    let found = appState.todos.find(t => t.id == id)
    if (found.completed == false) {
      found.completed = true
      const res = await cwApi.put('https://bcw-sandbox.herokuapp.com/api/maxb/todos/' + id, { completed: true })
      console.log('[EDITING]]', res.data);
      let index = appState.todos.findIndex(t => t.id == id)
      appState.todos.splice(index, 1, new Todo(res.data))
      console.log(appState.todos);
    } else if (found.completed == true) {
      found.completed = false
      const res = await cwApi.put('https://bcw-sandbox.herokuapp.com/api/maxb/todos/' + id, { completed: false })
      console.log('[EDITING]]', res.data);
      let index = appState.todos.findIndex(t => t.id == id)
      appState.todos.splice(index, 1, new Todo(res.data))
      console.log(appState.todos);
    }
  }
  async deleteTodo(id) {
    const res = await cwApi.delete('https://bcw-sandbox.herokuapp.com/api/maxb/todos/' + id)
    console.log('[DELETING]', res.data);
    appState.todos = appState.todos.filter(t => t.id != id)
  }
  async getTodo() {
    const res = await cwApi.get('https://bcw-sandbox.herokuapp.com/api/maxb/todos')
    console.log('got todo', res.data);
    appState.todos = res.data.map(t => new Todo(t))
  }
  async addTodo(todoData) {
    const res = await cwApi.post('https://bcw-sandbox.herokuapp.com/api/maxb/todos', todoData)
    console.log('[ADD TODO]', res.data);
    appState.todos = [...appState.todos, new Todo(res.data)]
  }
  switchWeather() {
    if (appState.weather.bool == true) {
      appState.weather.bool = false
      console.log(appState.weather.bool);
    } else if (appState.weather.bool == false) {
      appState.weather.bool = true
      console.log(appState.weather.bool);
    }
  }

  async getWeather() {
    const res = await cwApi.get('/weather')
    console.log(res.data);
    appState.weather = new Weather(res.data)
    console.log(appState.weather);
  }
  async getImage() {
    const res = await cwApi.get('/images')
    console.log(res.data);
    appState.image = new Image(res.data)
    console.log(appState.image);
  }

  async getQuote() {
    const res = await cwApi.get('/quotes')
    console.log(res.data);
    appState.quote = new Quote(res.data)
    console.log(appState.quote);
  }
}
export const inspireService = new InspireService()