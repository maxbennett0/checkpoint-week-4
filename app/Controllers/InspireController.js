import { appState } from "../AppState.js";
import { Quote } from "../Models/Quote.js";
import { Todo } from "../Models/Todo.js";
import { inspireService } from "../Services/InspireService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";

function _drawImage() {
  let imageAuthor = appState.image.author
  document.querySelector("body").style.backgroundImage = `url(${appState.image.largeImgUrl})`
  setText('imageAuthor', 'Author: ' + imageAuthor)
}

function _drawQuote() {
  let quoteContent = appState.quote.content
  let quoteAuthor = appState.quote.author
  setText('quote', `"` + quoteContent + `"`)
  setText('authorText', quoteAuthor)
}

function _drawTime() {
  let date = new Date().toLocaleTimeString()
  // console.log(date);
  setText('clock', date)
}

function _drawWeather() {
  if (appState.weather.bool == true) {
    setText('weather', Math.floor(appState.weather.main) + ' F')
  } else {
    setText('weather', Math.floor((appState.weather.main - 32) * .5667) + ' C')
  }
}

function _drawTodos() {
  const todos = appState.todos
  let template = ''
  todos.forEach(t => template += t.todoTemplate)
  setHTML('todoArea', template)
}

export class InspireController {
  constructor() {
    setInterval(_drawTime, 1000)
    setInterval(_drawWeather, 60000)
    _drawTodos()
    this.getImage()
    this.getQuote()
    this.getWeather()
    this.getTodo()
    appState.on('todos', _drawTodos)
    appState.on('weather', _drawWeather)
    appState.on('quote', _drawQuote)
    appState.on('image', _drawImage)
  }

  async getImage() {
    try {
      await inspireService.getImage()
    } catch (error) {
      Pop.error(error.message)
      console.error(error);
    }
  }

  async getQuote() {
    try {
      await inspireService.getQuote()
    } catch (error) {
      Pop.error(error.message)
      console.error(error);
    }
  }

  async getWeather() {
    try {
      await inspireService.getWeather()
    } catch (error) {
      Pop.error(error.message)
      console.error(error);
    }
  }

  switchWeather() {
    inspireService.switchWeather()
    _drawWeather()
  }

  async getTodo() {
    try {
      await inspireService.getTodo()
    } catch (error) {
      Pop.error(error.message)
      console.error(error.response);
    }
  }

  async addTodo() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let todoData = getFormData(form)
      console.log(todoData);
      form.reset()
      await inspireService.addTodo(todoData)
    } catch (error) {
      Pop.error(error.message)
      console.error(error.response);
    }
  }

  async editTodo(id) {
    try {
      await inspireService.editTodo(id)
    } catch (error) {
      Pop.error(error.message)
      console.error(error);
    }
  }

  async deleteTodo(id) {
    try {
      if (await Pop.confirm('delete?', 'kinda rude but its whatever', 'DELETE IT')) {
        await inspireService.deleteTodo(id)
      }
    } catch (error) {
      Pop.error(error.message)
      console.error(error.response);
    }
  }
}