import { InspireController } from "./Controllers/InspireController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();
  inspireController = new InspireController()
}

window["app"] = new App();
