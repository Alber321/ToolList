//PWA offline
navigator.serviceWorker.register('./ServiceWorker.js');

// Varaibles
const formulario = document.querySelector("#formulario");
const titulo = document.querySelector("#titulo");
const task = document.querySelector(".tareas");
const total = document.querySelector("#total");
const comp = document.querySelector("#comp");
let tareas = [];

// Eventos
(() => {
  formulario.addEventListener("submit", Validar);
  task.addEventListener("click", Eliminar);
  task.addEventListener("click", Completar);

  document.addEventListener("DOMContentLoaded", () => {
    let datosLS = JSON.parse(localStorage.getItem("task")) || [];
    tareas = datosLS;
    Mostrar();
})
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
    if(tareas.length <= 0 ){
        const mensaje = document.createElement("h5");
        mensaje.textContent = "-Sin Tareas-"
        return;
    }

  tareas.forEach((item) => {
    const itemTarea = document.createElement("div");
    itemTarea.classList.add("item-tarea");
    itemTarea.innerHTML = `
    ${item.estado ? (
      `<p class="completa"> ${item.tarea} </p>`
    ) : (
      `<p> ${item.tarea} </p>`
    ) }

    <div class="botones">
        <button data-id="${item.id}" class="eliminar">X</button>
        <button data-id="${item.id}"class="completada">✔</button>
    </div>`
    task.appendChild(itemTarea)
  })
  // Mostrar Dato de total y completadas

  // const TotalTareas = tareas.length;
  // total.textContent = `Total Tareas: ${TotalTareas}`;
  // const TotalCompletadas = tareas.filter(item => item.estado === true).length;
  // comp.textContent = `Completadas: ${TotalCompletadas}`;

   //persistir los datos con localStorage
   localStorage.setItem("task", JSON.stringify(tareas))

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
//  Completar Tarea

  function Completar(e){
    if(e.target.classList.contains("completada")) {
        const IdTarea = Number(e.target.getAttribute("data-id"));
        // Completar
        const NewTask = tareas.map( (item) => {
          if( item.id === IdTarea){
            item.estado = !item.estado;
            return item;
          }else{
            return item;
          }
        })
        tareas = NewTask;
        Mostrar();
    }
  }