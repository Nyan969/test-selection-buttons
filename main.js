const AnswerList = [{text: '5 + x = 11', correct: true},
    {text: '16 - x = 12', correct: false},
    {text: 'x + 5 = 11', correct: true},
    {text: 'x - 16 = 12', correct: false}];

const btnDone = document.querySelector('.done');

class Answer {

    constructor(value) {
        this.select = this.select.bind(this);
        this.incorrectly = this.incorrectly.bind(this);
        this.correctly = this.correctly.bind(this);
        this.correct = value.correct;
        this.selected = false;
        this.create(value.text);
    }

    create(text) {
        const answerTemplate = document.querySelector('.answer-template');
        const answer = answerTemplate.content.querySelector('.answer');
        answer.textContent = text;
        this.domElement = document.importNode(answerTemplate.content, true);
        this.answer = this.domElement.querySelector('.answer');
        this.answer.addEventListener('click', this.select);
        const container = document.querySelector('.answer-options');
        container.appendChild(this.domElement);
    }

    select(event) {
        event.target.classList.toggle('answer_selected');
        this.selected = !this.selected;
    }

    incorrectly() {
        this.answer.classList.add('answer_wrong');
    }

    correctly() {
        this.answer.classList.add('answer_correct');
    }
}

const answer = AnswerList.map(item => {
    return new Answer(item);
});


function validation() {
    let correctAnswers = [];
    let incorrectAnswers = [];
    //окрашивание кнопок
    answer.forEach(item => {
        item.selected === true && item.correct === true ? item.correctly() : '';
        item.selected === true && item.correct === false ? item.incorrectly() : '';
        item.correct === true ? correctAnswers.push(item.correct === true && item.selected === true) : '';
        item.correct === false ? incorrectAnswers.push(item.correct === false && item.selected === false) : '';
    });
    //проверка ответов
    correctAnswers = correctAnswers.some(item => {
        return item === false;
    });
    incorrectAnswers = incorrectAnswers.some(item => {
        return item === false;
    });
    if (correctAnswers === false && incorrectAnswers === false) {
        btnDone.classList.add('done_correct');
    } else if (correctAnswers === true && incorrectAnswers === false) {
        btnDone.classList.add('done_wrong');
    } else {
        btnDone.classList.add('done_wrong');
    }
}

btnDone.addEventListener('click', validation);