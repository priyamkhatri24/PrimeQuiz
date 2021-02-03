import * as model from "./model.js";
import Sports from "./View/Sports.js";

const loadDataControl = function () {
  Sports.loadData(model.sports);
};
const controlStartQuiz = function () {
  Sports.displayQuestions();
};

const controlNextQuestions = function () {
  Sports.renderNextQuestion();
};

const init = function () {
  loadDataControl();
  Sports.startQuiz(controlStartQuiz);
  Sports.quizFlowHandler(controlNextQuestions);
};
init();
