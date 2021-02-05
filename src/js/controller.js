import { sports } from "./model/sportsModel.js";
import { mythology } from "./model/mythologyModel.js";
import { polity } from "./model/polityModel.js";
import { bollywood } from "./model/bollywoodModel.js";
import * as statsModel from "./model/statsModel.js";
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

const controlNextQuestions = function (handler) {
  Quiz.renderNextQuestion(handler, statsModel.state);
};

const controlStats = function () {
  Stats.statsDisplay(statsModel.state);
  percentCircle();
};

const storeStatsControl = function () {
  statsModel.storeData(statsModel.state);
};

const init = function () {
  if (statsModel.getData()) statsModel.state = statsModel.getData();
  Quiz.startQuiz(controlStartQuiz);
  Quiz.quizFlowHandler(controlNextQuestions.bind(this, storeStatsControl));
  Stats.statsClickHandler(controlStats);
};
init();
