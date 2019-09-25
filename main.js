const AnswerList = [{text: '5 + x = 11', correct: true},
    {text: '16 - x = 12', correct: false},
    {text: 'x + 5 = 11', correct: true},
    {text: 'x - 16 = 12', correct: true}];
const hint = ['Это не все правильные ответы', 'Вычисли x'];

class Answer {
    constructor(value) {
        this.correct = value.correct;
        this.selected = false;
        this.create(value.text);
        this.select = this.select.bind(this);
    }

    create(text) {
        const answerTemplate = document.querySelector('.answer-template');
        const answer = answerTemplate.content.querySelector('.answer');
        answer.textContent = text;
        this.domElement = document.importNode(answerTemplate.content, true);
        this.domElement.querySelector('.answer').addEventListener('click', this.select);
        const container = document.querySelector('.answer-options');
        container.appendChild(this.domElement);
    }

    select(event) {
        this.selected = !this.selected;
        event.target.classList.toggle('answer_selected');
    }

    wrongly() {
        this.domElement.querySelector('.answer').classList.add('answer_wrong');
    }

    correctly() {
        this.domElement.querySelector('.answer').classList.add('answer_correct');
    }
}

AnswerList.map(item => {
    new Answer(item)
});