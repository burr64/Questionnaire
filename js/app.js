App = {};
App.constants = {
    blockPattern: 'block', // шаблон названия блока
    blocks: [1, 2, 3, 4, 5] // список блоков
};
App.runtime = {
    currentBlock: 1 // текущий блок
};

let grade = 10;

const question = ['<span class="question">Сколько тебе лет?</span>',
                    '<select class="answer" id="you"> <option>возраст</option>' +
                        '<option>17</option>' +
                        '<option>18</option>' +
                        '<option>19</option>' +
                        '<option>20</option>' +
                        '<option>21</option>' +
                    '</select>',
                '<span class="question">Творческие или IT-направления?</span>',
                    '<div class=answer id="you">' +
                        '<input class=answer type="radio" name=spec value="Творчество">Творчество' +
                        '<input class=answer type="radio" name=spec value="IT">IT' +
                    '</div>',
                '<span class="question">Сколько языков программирования знаешь?</span>',
                    '<div class="answer" id="you">' +
                        '<input type="radio" name="programming" value="Не знаю">Не знаю' +
                        '<input type="radio" name="programming" value="1-2">1-2' +
                        '<input type="radio" name="programming" value="3-4">3-4' +
                        '<input type="radio" name="programming" value="5+">5+' +
                    '</div>',
                '<span class="question">Ты гуманитарий или технарь?</span>',
                    '<div class=answer id="you">' +
                        '<input type="radio" name=napr value="Гуманитарий">Я гуманитарий' +
                        '<input type="radio" name=napr value="Технарь">Я технарь' +
                    '</div>',
                '<span class="question">Какие предмет собираешься сдавать?</span>',
                    '<div class=answer id="you">' +
                        '<input type="radio" name=predm value="Обществознание и/или История">Обществознание и/или История' +
                        '<input type="radio" name=predm value="Физика и/или Информатика">Физика и/или Информатика' +
                    '</div>',
                '<span class="question">На какие баллы расчитываешь?</span>',
                    '<div class=answer id="you">' +
                        '<input type="radio" name=ball value="180+">180+' +
                        '<input type="radio" name=ball value="200+">200+' +
                        '<input type="radio" name=ball value="220+">220+' +
                        '<input type="radio" name=ball value="240+">240+' +
                    '</div>',
                '<span class="question">Вы готовы учиться на коммерческой основе?</span>',
                    '<div class="answer" id="you">' +
                        '<input type="radio" name="finance" value="Да">Да, я могу себе позволить' +
                        '<input type="radio" name="finance" value="Нет">Нет, я не могу себе позволить' +
                    '</div>',
                '<span class="question">Какой формат обучения вас устраивает?</span>',
                    '<div class="answer" id="you">' +
                    '<input type="radio" name="form" value="Очный">Очный' +
                    '<input type="radio" name="form" value="Заочный">Заочный' +
                '</div>']

function introDialogue(){
    const dialogue = ['<span class="cloudBlock1">Привет!</span>',
                '<span class="cloudBlock1">Пора бы уже выбрать специальность...</span>',
                '<span class="cloudBlock1">А ты знаешь на кого будешь поступать?</span>',
                '<span class="cloudBlock1">Я помогу тебе!</span>',
                '<button class="cloudBlock1 buttonPhrase" id=toQuestionnaire> Погнали! </button>'];
    const intervalId = setInterval(() => {
        document.getElementById('dialogue').innerHTML += dialogue[0];
        dialogue.shift();
        if (dialogue.length == 0) {
          clearInterval(intervalId);
        }
    }, 1200);
}

const textContainer = document.getElementById('questionnaire');

function questionnaire() {
    if(question.length===0){
        scrollToBlock(3);
        result();
    }
    else {
        let i = 2;
        const intervalId = setInterval(elementId => {
            document.getElementById('questionnaire').innerHTML += question[0];
            question.shift();
            i--;
            if (i == 0) {
                clearInterval(intervalId);
                check();
                textContainer.scrollTop = textContainer.scrollHeight - textContainer.clientHeight;
            }
        }, 1200)
    }
}

function check() {
    document.querySelectorAll("input, select").forEach((radio) => {
        radio.addEventListener('change', () => {
            if (radio.value !== 'возраст'){
            }
            if (radio.value === "Не знаю") {
                grade -= 1;
            }
            if (radio.value === "Гуманитарий") {
                grade -= 5;
            }
            if (radio.value === "180+" || radio.value === "200+") {
                grade-= 1;
            }
            if (radio.value === "Обществознание и/или История") {
                grade-= 3;
            }
            let you = document.getElementById('you')
            you.parentNode.removeChild(you);
            document.getElementById('questionnaire').innerHTML += '<label class="answer">'+radio.value+'</label>';
            questionnaire();
        });
    });
}

function result(){
    if (grade >= 8) document.getElementById('res').innerHTML += '<span>Тебе подойдут: ИФСТ или ПИНФ</span>';
    else if (grade<=7 && grade >= 5) document.getElementById('res') .innerHTML += '<span>Тебе подойдут: ПИНЖ или ИВЧТ</span>';
    else document.getElementById('res').innerHTML += '<span>Тебе подойдут: Реклама, Дизайн или Телевидение</span>';
}

function clickListener(){
    document.addEventListener('click', function(event){
        switch (event.target.id){
            case 'toQuestionnaire':
                scrollToBlock(2);
                questionnaire();
                break;
            case 'toRes':
                scrollToBlock(4);
                break;
        }
    })
}

function scrollToBlock(blockId) {
    const block = '#' + App.constants.blockPattern + blockId; // формируем строку с HTML ID блока
    const el = document.querySelector(block); // находим элемент по ID
    if (el) { // если элемент существует - плавно скроллимся к нему
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

introDialogue();
clickListener();
check();