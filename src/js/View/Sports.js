import "core-js/stable";

class Sports {
  #iconElement = document.querySelector(".sports");
  #questionDisplay = document.querySelector(".question-display");
  #homeDisplay = document.querySelector(".home-display");
  #afterSubmit = document.querySelector(".after__submit");
  #index = 0;
  #selectedValues = [];
  #data;
  loadData(data) {
    this.#data = data;
  }
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

  displayQuestions(data = this.#data) {
    this.#homeDisplay.classList.add("hidden");
    this.#questionDisplay.classList.remove("hidden");
    this.#clearHome();
    this.#clearQuestion();
    this.#questionDisplay.insertAdjacentHTML(
      "afterbegin",
      this._generateQuizMarkup.call(this, data)
    );
  }

  _generateQuizMarkup(data = this.#data, i = this.#index) {
    return `
        <div class="question__genre-name">
        <h3>Genre: ${data.genre}</h4>
        </div>
        <div class="question">
        <p><span>Question ${i + 1}:</span>${data.questions[i].question}</p>
        </div>
        <div class="options">
        <ul>
            <button class="ooption"><li>${
              data.questions[i].a_option
            }</li></button>
            <button class="ooption"><li>${
              data.questions[i].b_option
            }</li></button>
            <button class="ooption"><li>${
              data.questions[i].c_option
            }</li></button>
            <button class="ooption"><li>${
              data.questions[i].d_option
            }</li></button>
        </ul>
        </div>
        <div class="button next__btn">
        <button class="next__text">Next ></button>
        </div>
    
      `;
  }
  submitQuizHandler(data = this.#data) {
    this.#questionDisplay.querySelector(".next__text").textContent =
      "Submit Quiz";
    if (this.#index === data.questions.length - 1) {
      this.#clearQuestion();
      this.#afterSubmit.insertAdjacentHTML(
        "afterbegin",
        this._generateScoreMarkup.call(this, data)
      );
    }
  }

  renderNextQuestion(data = this.#data) {
    const optionList = this.#questionDisplay.querySelectorAll(".ooption");
    // prettier-ignore
    const selectedValueNode = [...optionList].find((ele) => ele.classList.contains("selected"));
    if (!selectedValueNode) {
      alert("Please Select one option. There is no negative marking😉");
      return;
    }
    const selectedValue = selectedValueNode.querySelector("li").textContent;
    this.#selectedValues.push(selectedValue);

    if (this.#index === data.questions.length - 1) {
      this.submitQuizHandler(data);
      // this.#index++;
      return;
    }
    this.#index++;
    this.displayQuestions(data);
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

  _generateScoreMarkup(data = this.#data) {
    const ansArray = this.#selectedValues.map(
      (ele, i) => ele === data.questions[i].correct_option
    );
    ansArray.forEach((ele) => {
      if (ele) data.score = data.score + 2;
    });
    console.log(ansArray);
    return `
    <div class="final__score">
      <h3>YOU SCORED: <span class="score">${data.score}</span>/10</h3>
    </div>
   <div class="score__plates">
      ${data.questions.map((_, index) => {
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

export default new Sports();
