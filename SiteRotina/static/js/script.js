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

const width = 400;
const height = 400;
const radius = 150;

// Cria o SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Grupo centralizado
const g = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Cria um arco inicial
const arc = d3.arc()
    .innerRadius(radius - 40)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(Math.PI / 4); // 45 graus como exemplo

// Adiciona o arco ao SVG
const path = g.append("path")
    .attr("d", arc)
    .attr("fill", "orange");

// Adiciona puxadores
const handle = g.append("circle")
    .attr("cx", radius * Math.cos(Math.PI / 4)) // Coordenada X
    .attr("cy", -radius * Math.sin(Math.PI / 4)) // Coordenada Y
    .attr("r", 8)
    .attr("fill", "red")
    .call(d3.drag()
        .on("drag", function (event) {
            const angle = Math.atan2(event.y, event.x);
            arc.endAngle(angle); // Atualiza o ângulo final do arco
            path.attr("d", arc); // Redesenha o arco
            d3.select(this)
                .attr("cx", radius * Math.cos(angle))
                .attr("cy", -radius * Math.sin(angle));
        })
    );
