const AnswerList = [{text: '5 + x = 11', correct: true},
    {text: '16 - x = 12', correct: false},
    {text: 'x + 5 = 11', correct: true},
    {text: 'x - 16 = 12', correct: false}];
const hint = {
    list: ['Это не все правильные ответы', 'Вычисли x'],
    create: function createHint(text) {
        const hintTemplate = document.querySelector('.hint-template');
        const hint = hintTemplate.content.querySelector('.hint');
        hint.textContent = text;
        const domElement = document.importNode(hintTemplate.content, true);
        const container = document.querySelector('.hint-container');
        container.appendChild(domElement);
    },

    remove: function removeHint() {
        const container = document.querySelector('.hint-container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
};
const btnDone = document.querySelector('.done');

class Answer {

    constructor(value) {
        this.bind();
        this.correct = value.correct;
        this.selected = false;
        this.create(value.text);
    }

    bind() {
        this.select = this.select.bind(this);
        this.incorrectly = this.incorrectly.bind(this);
        this.correctly = this.correctly.bind(this);
        this.disable = this.disable.bind(this);
        this.enable = this.enable.bind(this);
        this.clear = this.clear.bind(this);
    }

    create(text) {
        const answerTemplate = document.querySelector('.answer-template');
        const answer = answerTemplate.content.querySelector('.answer');
        answer.textContent = text;
        this.domElement = document.importNode(answerTemplate.content, true);
        this.answer = this.domElement.querySelector('.answer');
        this.answer.addEventListener('click', this.select);
        this.answer.addEventListener('click', checkBtnDisabled);
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

    disable() {
        this.answer.setAttribute('style', 'pointer-events: none');
    }

    enable() {
        this.answer.removeAttribute('style');
    }

    clear() {
        this.selected = false;
        this.answer.classList.remove('answer_selected');
        this.answer.classList.remove('answer_wrong');
        this.answer.classList.remove('answer_correct');
        this.enable();
    }

}

const answer = AnswerList.map(item => {
    return new Answer(item);
});

function checkBtnDisabled() {
    answer.some(item => {
        return item.selected === true
    }) ? btnDone.classList.remove('done_disable') : btnDone.classList.add('done_disable');
}

function clear() {
    btnDone.removeAttribute('style');
    answer.forEach(item => {
        item.clear();
    });
    btnDone.classList.remove('done_wrong');
    btnDone.classList.add('done_disable');
}

function remove() {
    const container = document.querySelector('.root__section');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

}

function validation() {
    hint.remove();
    btnDone.setAttribute('style', 'pointer-events: none');
    let correctAnswers = [];
    let incorrectAnswers = [];
    //окрашивание кнопок
    answer.forEach(item => {
        item.disable();
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
        setTimeout(remove, 1500);
    } else if (correctAnswers === true && incorrectAnswers === false) {
        hint.create(hint.list[0]);
        btnDone.classList.add('done_wrong');
        setTimeout(clear, 1000);
    } else {
        hint.create(hint.list[1]);
        btnDone.classList.add('done_wrong');
        setTimeout(clear, 1000);
    }
}

btnDone.addEventListener('click', validation);