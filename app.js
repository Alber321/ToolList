//PWA offline
navigator.serviceWorker.register('./ServiceWorker.js');

const firebaseConfig = {
   apiKey: "AIzaSyCAi8GpdDRLeKydYwUht-jQjSiscv-R-rQ",
   authDomain: "pwaa-5c38e.firebaseapp.com",
   projectId: "pwaa-5c38e",
   storageBucket: "pwaa-5c38e.appspot.com",
  messagingSenderId: "394769300175",
   appId: "1:394769300175:web:dc4cda25a08a84536855ba",
   measurementId: "G-FDW99XW073"
 };
 //ASDASsadsa
// Initialize Firebase
 
const app = initializeApp(firebaseConfig);  

 const db = firebase.firestore();

// Varaibles
const formulario = document.querySelector("#formulario");
const tareas = document.querySelector("#tareas");
const total = document.querySelector("#total");
const completadas = document.querySelector("#completadas");
let task = [];

// Eventos
(() => {
  formulario.addEventListener("submit", Validar);
  tareas.addEventListener("click", Eliminar);
  tareas.addEventListener("click", Completar);

  document.addEventListener("DOMContentLoaded", () => {
    let datosLS = JSON.parse(localStorage.getItem("tareas")) || [];
    task = datosLS;
    Mostrar();
})
})();

// Funciones
function Validar(e) {
  e.preventDefault();
  // Validar
  const tarea = document.querySelector("#tarea").value;
  if(tarea.trim().length === 0){
    console.log("vacio");
    return
  }
  // Crear Objeto
  
  let objtTarea = input.value;
  db.collection("Usuario").add({

    id: Date.now(),
    tarea: tarea,
    estado: false,
    Fecha: firebase.firestore.Timestamp.fromDate(new Date())
  })

  .then((docRef) => {
    console.log("Tarea agregada con exito a DB con ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });

  task = [...task, objtTarea];
  formulario.reset();

  //Agregar HTML
  Mostrar();
}

function Mostrar() {

  while(tareas.firstChild){
    tareas.removeChild(tareas.firstChild)
  }
  if(task.length > 0){
  task.forEach(item => {
    const itemTarea = document.createElement('div');
    itemTarea.classList.add('item-tarea');
    itemTarea.innerHTML = `
    <p>${item.estado ? (
      `<span class='completa'> ${item.tarea} </span>`
    ) : (
      `<span> ${item.tarea} </span>`
    )}</p>

    <div class="botones">
        <button class="eliminar" data-id="${item.id}" >X</button>
        <button class="completada" data-id="${item.id}">✔</button>
    </div>
    `
    tareas.appendChild(itemTarea)
  });
}else{
  const mensaje = document.createElement("h5");
        mensaje.textContent = "~SIN TAREAS~"
        tareas.appendChild(mensaje)
}
  // Mostrar Dato de total y completadas

  let totalTareas = task.length;
  let totalCompletas = task.filter(item => item.estado === true).length;

  total.textContent = `Total Tareas: ${totalTareas}`;
  completadas.textContent = `Completadas: ${totalCompletas}`;

   //persistir los datos con localStorage
   localStorage.setItem("tareas", JSON.stringify(task))

}

function Eliminar(e){
    if(e.target.classList.contains("eliminar")) {
        const IdTarea = Number(e.target.getAttribute("data-id"));
        // Eliminar Tarea
        const NewTask = task.filter( (item) => item.id !== IdTarea);
        task = NewTask;
        Mostrar();
    }
}
//  Completar Tarea

  function Completar(e){
    if(e.target.classList.contains("completada")) {
        const IdTarea = Number(e.target.getAttribute("data-id"));
        // Completar
        const NewTask = task.map( item => {
          if( item.id === IdTarea){
            item.estado = !item.estado;
            return item;
          }else{
            return item;
          }
        })
        task = NewTask;
        Mostrar();
    }
  }