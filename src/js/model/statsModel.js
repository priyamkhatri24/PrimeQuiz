// storing and getting stats data to and from local storage.

export const state = {
  quizPlayed: 0,
  correctAnswer: 0,
  wrongAnswer: 0,
};
export const storeData = function (state) {
  localStorage.setItem("stats", JSON.stringify(state));
};

export const getData = function () {
  return JSON.parse(localStorage.getItem("stats"));
};

export const clearAllStats = function () {
  localStorage.clear();
};
