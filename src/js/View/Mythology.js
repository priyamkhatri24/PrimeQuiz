import "core-js/stable";

class Mythology {
  #iconElement = document.querySelector(".mythology");
  #questionDisplay = document.querySelector(".question-display");
  #homeDisplay = document.querySelector(".home-display");
  #afterSubmit = document.querySelector(".after__submit");
  #index = 0;
  #selectedValues = [];

  startQuiz(handler) {
    this.#iconElement.addEventListener("click", function (e) {
      handler();
    });
  }
  #clearHome() {
    this.#homeDisplay.innerHTML = "";
  }
  #clearQuestion() {
    this.#questionDisplay.innerHTML = "";
  }

  displayQuestions(mythology) {
    this.#homeDisplay.classList.add("hidden");
    this.#questionDisplay.classList.remove("hidden");
    this.#clearHome();
    this.#clearQuestion();
    this.#questionDisplay.insertAdjacentHTML(
      "afterbegin",
      this._generateQuizMarkup.call(this, mythology)
    );
  }

  _generateQuizMarkup(mythology, i = this.#index) {
    return `
        <div class="question__genre-name">
        <h3>Genre: ${mythology.genre}</h4>
        </div>
        <div class="question">
        <p><span>Question ${i + 1}:</span>${mythology.questions[i].question}</p>
        </div>
        <div class="options">
        <ul>
            <button class="ooption"><li>${
              mythology.questions[i].a_option
            }</li></button>
            <button class="ooption"><li>${
              mythology.questions[i].b_option
            }</li></button>
            <button class="ooption"><li>${
              mythology.questions[i].c_option
            }</li></button>
            <button class="ooption"><li>${
              mythology.questions[i].d_option
            }</li></button>
        </ul>
        </div>
        <div class="button next__btn">
        <button class="next__text">Next ></button>
        </div>
    
      `;
  }
  submitQuizHandler(mythology) {
    this.#questionDisplay.querySelector(".next__text").textContent =
      "Submit Quiz";
    if (this.#index === mythology.questions.length - 1) {
      this.#clearQuestion();
      this.#afterSubmit.insertAdjacentHTML(
        "afterbegin",
        this._generateScoreMarkup.call(this, mythology)
      );
    }
  }

  renderNextQuestion(mythology) {
    const optionList = this.#questionDisplay.querySelectorAll(".ooption");
    // prettier-ignore
    const selectedValueNode = [...optionList].find((ele) => ele.classList.contains("selected"));
    if (!selectedValueNode) {
      alert("Please Select one option. There is no negative marking😉");
      return;
    }
    const selectedValue = selectedValueNode.querySelector("li").textContent;
    this.#selectedValues.push(selectedValue);

    if (this.#index === mythology.questions.length - 1) {
      this.submitQuizHandler(sports);
      // this.#index++;
      return;
    }
    this.#index++;
    this.displayQuestions(mythology);
  }

  quizFlowHandler(nextHandler) {
    this.#questionDisplay.addEventListener("click", function (e) {
      const btn = e.target.closest(".next__btn");
      const clicked = e.target.closest(".ooption");
      const optionList = this.querySelectorAll(".ooption");
      if (!btn && !clicked) return;
      if (btn) nextHandler();
      if (clicked) {
        optionList.forEach((ele) => ele.classList.remove("selected"));
        clicked.classList.add("selected");
      }
    });
  }

  _generateScoreMarkup(mythology) {
    const ansArray = this.#selectedValues.map(
      (ele, i) => ele === mythology.questions[i].correct_option
    );
    ansArray.forEach((ele) => {
      if (ele) mythology.score = mythology.score + 2;
    });
    console.log(ansArray);
    return `
    <div class="final__score">
      <h3>YOU SCORED: <span class="score">${mythology.score}</span>/10</h3>
    </div>
   <div class="score__plates">
      ${mythology.questions.map((_, index) => {
        return `
        <div class="score_plate ${ansArray[index] ? "correct" : "wrong"}">
          <p>question ${index + 1} ${ansArray[index] ? "✔" : "❌"} </p>
        </div>
        `;
      })}
    </div>
    <div class="button home__btn">
      <button><a style="color: white; text-decoration: none" href="">Home</a></button>
    </div>
    `;
  }
}

export default new Mythology();
