// Variáveis globais
let totalHours = 0;
let currentHours = 0;
let colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF3"];
let colorIndex = 0;

// Referências aos elementos do DOM
const hoursForm = document.getElementById("hours-form");
const taskForm = document.getElementById("task-form");
const totalHoursInput = document.getElementById("total-hours");
const taskNameInput = document.getElementById("task-name");
const taskHoursInput = document.getElementById("task-hours");
const canvas = document.getElementById("day-circle");
const ctx = canvas.getContext("2d");

// Desenha o círculo inicial
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 20;
    ctx.stroke();
}

// Adiciona uma nova tarefa ao círculo
function addTaskToCircle(hours) {
    const startAngle = (currentHours / totalHours) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((currentHours + hours) / totalHours) * 2 * Math.PI - Math.PI / 2;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, startAngle, endAngle);
    ctx.strokeStyle = colors[colorIndex % colors.length];
    ctx.lineWidth = 20;
    ctx.stroke();

    currentHours += hours;
    colorIndex++;
}

// Manipula o formulário de horas totais
hoursForm.addEventListener("submit", (e) => {
    e.preventDefault();
    totalHours = parseInt(totalHoursInput.value);

    if (totalHours > 0 && totalHours <= 24) {
        drawCircle();
        taskForm.style.display = "block";
        hoursForm.style.display = "none";
    } else {
        alert("Por favor, insira um valor entre 1 e 24.");
    }
});

// Manipula o formulário de tarefas
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskName = taskNameInput.value.trim();
    const taskHours = parseInt(taskHoursInput.value);

    if (taskName && taskHours > 0 && taskHours <= totalHours - currentHours) {
        addTaskToCircle(taskHours);
        taskNameInput.value = "";
        taskHoursInput.value = "";
    } else {
        alert("Horas inválidas ou excesso de horas. Verifique os valores.");
    }
});

// Desenha o círculo inicial ao carregar a página
drawCircle();