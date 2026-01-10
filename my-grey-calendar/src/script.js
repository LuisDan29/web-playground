
const YEAR = 2026;
const DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const MONTHS = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", 
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];
const MAIN_SECTION = document.getElementById('main');

// localStorage.clear();
const KEY_NAME = 'greycalendar-data';
const CALENDAR_DATA = getCalendarData();

let CURRENT_DAY = { yearmonth: '', day: 0 };
const EDITOR = document.getElementById('editor');
const TEXT_INPUT = document.getElementsByClassName('text-input')[0];


function openNote(yearmonth, day) {
    // mostra a div do editor
    EDITOR.style.display = 'flex';
    // salva as infos do dia sendo editado
    CURRENT_DAY["yearmonth"] = yearmonth;
    CURRENT_DAY["day"] = day;
    // carrega texto existente da div
    loadNoteText(yearmonth, day);   
}


function loadNoteText(yearmonth, day) {
    const data = CALENDAR_DATA[yearmonth][day];
    TEXT_INPUT.textContent = data;
    if (!data) {
        TEXT_INPUT.textContent = '';
    }
}


function closeNote() {
    EDITOR.style.display = 'none';
    console.log(getCalendarData());
}


function saveNote() {
    const yearmonth = CURRENT_DAY["yearmonth"];
    const day = CURRENT_DAY["day"];
    const text = TEXT_INPUT.textContent;
    
    // Garante que o mês existe no objeto
    if (!CALENDAR_DATA[yearmonth]) {
        CALENDAR_DATA[yearmonth] = {};
    }
    
    CALENDAR_DATA[yearmonth][day] = text;
    
    // Envia alterações pro localStorage
    setCalendarData();
    closeNote();
}


function deleteNote() {
    const yearmonth = CURRENT_DAY["yearmonth"];
    const day = CURRENT_DAY["day"];
    
    delete CALENDAR_DATA[yearmonth][day];
    
    setCalendarData();
    closeNote();
}



function getCalendarData() {
    // procura dados no localStorage
    const data = JSON.parse(localStorage.getItem(KEY_NAME)) || {};
    // cria configuração inicial se nao existir
    if (Object.keys(data).length === 0) {
        for (let month = 0; month < 12; month++) {
            let yearmonth = `${ YEAR }-${ month.toString().padStart(2, "0") }`;
            data[yearmonth] = {};
        }
    }
    return data;
}


function setCalendarData() {
    // envia a constante CALENDAR_DATA para localStorage
    const data = JSON.stringify(CALENDAR_DATA);
    localStorage.setItem(KEY_NAME, data);
}


createCalendar();


function createCalendar() {
    // incializa div's para cada mes
    for (let month = 0; month < 12; month++) {
        const monthElement = createMonth(YEAR, month);
        MAIN_SECTION.appendChild(monthElement);
    }
}


function createMonth(year, month) {
    // configurações da div 'month'
    const monthDiv = document.createElement('div');
    monthDiv.classList.add('month');
    monthDiv.dataset.month = month;
    monthDiv.dataset.year = year;
    
    // configurações do h1 'title'
    const title = document.createElement('h1');
    title.textContent = MONTHS[month];
    title.classList.add('title');
    
    // cria os dias da semana e o grid
    const weekdays = createWeekdays();
    const grid = createGrid(year, month);
    
    // monta a div 'month'
    monthDiv.appendChild(title);
    monthDiv.appendChild(weekdays);
    monthDiv.appendChild(grid);
    return monthDiv;
}


function createGrid(year, month) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    
    // pega [dia da semana 0-6, qntd de dias]
    const [startDay, totalDays] = getDaysInMonth(year, month);
    
    // cria div's vazias no inicio do grid
    for (let i = 0; i < startDay; i++) {
        grid.appendChild(createEmptyDiv()); 
    }
    // cria os dias do mes
    for (let day = 1; day <= totalDays; day++) {
        const dayElement = createDay(year, month, day);
        grid.appendChild(dayElement);
    }
    return grid;
}


function createDay(year, month, day) {
    const yearmonth = `${ YEAR }-${ month.toString().padStart(2, "0") }`;
    
    const div = document.createElement('div');
    div.classList.add('day', yearmonth, day);
    
    // ao clicar, abre o editor de nota
    div.addEventListener('click', () => { 
        openNote(yearmonth, day); 
    });
    
    div.innerHTML = `<p>${day}</p>`;
    
    // calcula grau de inclinação aleatório para day::before
    let degree = (Math.random() * 6 - 3).toFixed(2);
    div.style.setProperty('--note-degree', `${degree}deg`);
    
    return div;
}


function createEmptyDiv() {
    // cria div's vazias
    const div = document.createElement('div');
    div.classList.add('empty');
    return div;
}


function createWeekdays() {
    const weekday = document.createElement('div');
    weekday.classList.add('weekdays');
    // div's com dias da semana
    DAYS.forEach(day => {
        const div = document.createElement('div');
        div.innerHTML = `<p>${day}</p>`;
        weekday.appendChild(div);
    })
    return weekday;
}


function getDaysInMonth(year, month) {
    // new Date(ano, mês, dia, hora, ...)
    let startDay = new Date(year, month, 1);
    let totalDays = new Date(year, month + 1, 0);
    // [dia da semana 0-6, qntd de dias]
    return [startDay.getDay(), totalDays.getDate()];
}