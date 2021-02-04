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
  }
  statsDisplay() {
    this.#clearAll();
    this.#parentEl.insertAdjacentHTML(
      "afterbegin",
      this.#generateStatsMarkup.call(this)
    );
  }
  #generateStatsMarkup(percentage = 12) {
    return `
    <div class="stats__heading">
        <h3>STATS</h3>
        </div>
        <div class="stats">
            <div class="stats__numerical__column">
            <p>Quizes Played: <span>12</span></p>
            <p>Correct Answers: <span>72</span></p>
            <p>Incorrect Answers: <span>38</span></p>
            </div>
            <div class="mid__sep"></div>
            <div class="stats__percentage__column">
            <div class="chart" id="graph" data-percent="${percentage}"></div>
            <p>Sucess percentage: ${percentage}%</p>
            </div>
        </div>
        <a style="color: white; text-decoration: none" href=""><div class="button home__btn">
            <button>Home</button>
        </div></a>
      `;
  }
}

export default new Stats();
