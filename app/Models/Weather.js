export class Weather {
  constructor(data) {
    this.main = 1.8 * (data.main.temp - 273) + 32
    this.bool = true
  }
}