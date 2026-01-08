
const YEAR = 2026;
const DAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const MONTHS = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", 
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];
const MAIN_DIV = document.getElementById('main');


function createCalendar() {
    for (let i = 0; i < MONTHS.length; i++) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        
        monthDiv.innerHTML = `<h1 class="title"> ${ MONTHS[i] } </h1>`;
        
        let startDay = getDaysInMonth(i)[0];
        let lastDay = getDaysInMonth(i)[1];
        
        const container = document.createElement('div');
        const header = createHeader();
        const grid = createGrid(startDay, lastDay);
        container.appendChild(header);
        container.appendChild(grid);
        
        monthDiv.appendChild(container);
        MAIN_DIV.appendChild(monthDiv);
    }
}

function createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    // div's com dias da semana
    DAYS.forEach(day => {
        const div = document.createElement('div');
        div.innerHTML = `<p>${day}</p>`;
        header.appendChild(div);
    })
    return header;
}

function createGrid(startDay, lastDay) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    // div's vazias no inicio do grid
    for (let i = 0; i < startDay; i++) {
        const div = document.createElement('div');
        grid.appendChild(div);
    }
    // div's com dias do mês
    let dayCount = 1;
    for (let i = 0; i < lastDay; i++) {
        const div = document.createElement('div');
        div.classList.add('day-div');
        div.innerHTML = `<p>${dayCount}</p>`;
        grid.appendChild(div);
        dayCount++;
    }
    return grid;
}

createCalendar();


function getDaysInMonth(month) {
    // new Date(ano, mês, dia, hora, ...)
    let startDay = new Date(YEAR, month, 1);
    let lastDay = new Date(YEAR, month + 1, 0);
    // [dia da semana 0-6, qntd de dias]
    return [startDay.getDay(), lastDay.getDate()];
}