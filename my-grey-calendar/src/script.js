
const YEAR = 2026;
const DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const MONTHS = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", 
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];
const MAIN_SECTION = document.getElementById('main');


function createCalendar() {
    for (let month = 0; month < 12; month++) {
        const monthElement = createMonth(YEAR, month);
        MAIN_SECTION.appendChild(monthElement);
    }
}

createCalendar();


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
    const div = document.createElement('div');
    div.classList.add('day');
    
    div.innerHTML = `<p>${day}</p>`;
    
    return div;
}


function createEmptyDiv() {
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