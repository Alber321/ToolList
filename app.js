// Varaibles
const formulario = document.querySelector("#formulario");
const titulo = document.querySelector("#titulo");
const task = document.querySelector(".tareas");
let tareas = [];

// Eventos
(() => {
  formulario.addEventListener("submit", Validar);
  task.addEventListener("click", Eliminar);
})();

// Funciones
function Validar(ev) {
  ev.preventDefault();
  // Validar
  const tarea = document.querySelector("#tarea").value;
  if (!tarea.trim()) {
    titulo.textContent = "Formulario Vacio";
    setTimeout(() => {
      titulo.textContent = "Formulario";
    }, 1000);
    return;
  }
  // Crear Objeto
  const objtTarea = {
    id: Date.now(),
    tarea: tarea,
    estado: false,
  };
  tareas = [...tareas, objtTarea];
  formulario.reset();
  Mostrar();
}

function Mostrar() {

    task. innerHTML = "";
    if(tareas.length < 1 ){
        const mensaje = document.createElement("h5");
        mensaje.textContent = "-Sin Tareas-"
        return;
    }

  tareas.forEach((item) => {
    const itemTarea = document.createElement("div");
    itemTarea.classList.add("item-tarea");
    itemTarea.innerHTML = `
    <p>${item.tarea}</p>
    <div class="botones">
        <button data-id="${item.id}" class="eliminar">X</button>
        <button data-id="${item.id}"class="completada">✔</button>
    </div>`
    task.appendChild(itemTarea)
  });
}

function Eliminar(e){
    if(e.target.classList.contains("eliminar")) {
        const IdTarea = Number(e.target.getAttribute("data-id"));
        // Eliminar Tarea
        const NewTask = tareas.filter( (item) => item.id !== IdTarea);
        tareas = NewTask;
        Mostrar();
    }
}