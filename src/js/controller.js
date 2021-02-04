import { sports } from "./model/sportsModel.js";
import { mythology } from "./model/mythologyModel.js";
import { polity } from "./model/polityModel.js";
import { bollywood } from "./model/bollywoodModel.js";
import { statsModel } from "./model/statsModel.js";
import Quiz from "./View/QuizView.js";
import Stats from "./View/statsView.js";
import { percentCircle } from "./View/percent.js";

const controlStartQuiz = function (genre) {
  if (genre === mythology.genre) Quiz.loadData(mythology);
  if (genre === sports.genre) Quiz.loadData(sports);
  if (genre === bollywood.genre) Quiz.loadData(bollywood);
  if (genre === polity.genre) Quiz.loadData(polity);
  Quiz.displayQuestions();
};

const controlNextQuestions = function () {
  Quiz.renderNextQuestion();
};

const controlStats = function () {
  Stats.statsDisplay();
  percentCircle();
};

const init = function () {
  Quiz.startQuiz(controlStartQuiz);
  Quiz.quizFlowHandler(controlNextQuestions);
  Stats.statsClickHandler(controlStats);
};
init();

// export const state = {
//   quizPlayed: 0,
//   correctAnswer: 0,
//   wrongAnswer: 0,
// };
