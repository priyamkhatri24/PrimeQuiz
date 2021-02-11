import "core-js/stable";
import { percentCircle } from "./percent";

class Stats {
  #statsLink = document.querySelector(".stats__link");
  #questionDisplay = document.querySelector(".question-display");
  #afterSubmit = document.querySelector(".after__submit");
  #homeDisplay = document.querySelector(".home-display");
  #parentEl = document.querySelector(".stats-display");

  statsClickHandler(handler) {
    this.#statsLink.addEventListener("click", function () {
      handler();
    });
  }
  #clearAll() {
    this.#afterSubmit.innerHTML = "";
    this.#questionDisplay.innerHTML = "";
    this.#homeDisplay.innerHTML = "";
    this.#parentEl.innerHTML = "";
  }
  statsDisplay(stats) {
    this.#clearAll();
    this.#parentEl.insertAdjacentHTML(
      "afterbegin",
      this.#generateStatsMarkup.call(this, stats)
    );
  }
  #generateStatsMarkup(stats) {
    const percent =
      ((stats?.correctAnswer || 0) * 100) /
      ((stats?.correctAnswer || 0) + (stats?.wrongAnswer || 0));
    return `
    <div class="stats__heading">
        <h3>STATS</h3>
        </div>
        <div class="stats">
            <div class="stats__numerical__column">
            <p>Quizzes Played: <span>${stats?.quizPlayed || 0}</span></p>
            <p>Correct Answers: <span>${stats?.correctAnswer || 0}</span></p>
            <p>Incorrect Answers: <span>${stats?.wrongAnswer || 0}</span></p>
            </div>
            <div class="mid__sep"></div>
            <div class="stats__percentage__column">
            <div class="chart" id="graph" data-percent="${
              percent.toFixed(2) ? percent : 0
            }"></div>
            <p>Success percentage: ${
              isFinite(percent) ? percent.toFixed(2) : 0
            }%</p>
            </div>
        </div>
        <div class="button home__btn">
        <a style="color: white; text-decoration: none" href=""><button>Home</button></a>
        </div>
      `;
  }
}

export default new Stats();
