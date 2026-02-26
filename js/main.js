import { facturas as facturasIniciales } from "./utilties.js";

let facturas = JSON.parse(localStorage.getItem("mis_facturas")) || facturasIniciales;

/**
 * @description Este punto constara de varias partes:
 * 1. Utiliza querySelector para seleccionar el tbody del table en el html;
 * 2. En el html encontraras un table que contiene un thead y un tbody. Copia el primer elemento tr del tbody;
 * 3. En el js crea una funcion llamada fila que reciba un objeto como parametro. Dentro de la funcion crea una variable llamada template_fila y asignale utilizando comillas invertidas el valor copiado en el paso 1.
 * Utiliza ${value} para reemplazar los valores del objeto en el template.
 * 4. Utiliza innerHTML para agregar la fila al tbody del table. Recuerda utilizar += para agregar la fila al final del tbody.
 */

const cuerpoTabla = document.querySelector("#cuerpoTabla");

function fila(factura) {
  // Determinamos la clase de color según el estado
  const colorEstado =
    factura.estado === "pagada" ? "text-[#00ce00]" : "text-red-600";

  const template_fila = `
    <tr class="hover:bg-gray-100 even:bg-[#fefefe]">
        <td class="border border-gray-300 p-2 ">${factura.id}</td>
        <td class="border border-gray-300 p-2">${factura.numeroFactura}</td>
        <td class="border border-gray-300 p-2">${factura.descripcion}</td>
        <td class="border border-gray-300 p-2 ${colorEstado}">${factura.estado}</td>
        <td class="border border-gray-300 p-2">${factura.fecha}</td>
        <td class="border border-gray-300 p-2">
            <button class="action mx-auto block px-1 py-0.5 border rounded hover:bg-gray-100">Del</button>
        </td>
    </tr>
  `;
  const template_fila_sin_boton = `
    <tr class="hover:bg-gray-100 even:bg-[#fefefe]">
        <td class="border border-gray-300 p-2 ">${factura.id}</td>
        <td class="border border-gray-300 p-2">${factura.numeroFactura}</td>
        <td class="border border-gray-300 p-2">${factura.descripcion}</td>
        <td class="border border-gray-300 p-2 ${colorEstado}">${factura.estado}</td>
        <td class="border border-gray-300 p-2">${factura.fecha}</td>
        <td class="border border-gray-300 p-2">
            <!-- Botón de eliminar oculto para facturas pendientes -->
        </td>
    </tr>
  `;

  if (factura.estado === "pagada") {
    cuerpoTabla.innerHTML += template_fila;
  } else {
    cuerpoTabla.innerHTML += template_fila_sin_boton;
  }
}

// Mostrar todas las facturas al cargar la página
facturas.forEach(function (factura) {
  fila(factura);
});

/**
 * @description Dentro  de una funcion llamada todos: itera el array facturas e  imprime en consola cada uno de los objetos que se encuentran dentro del array.
 */
function todos() {
  cuerpoTabla.innerHTML = "";
  facturas.forEach(function (factura) {
    fila(factura);
  });
}

/**
 * @description Dentro  de una funcion llamada pendientes: itera el array facturas e  imprime en consola cada uno de los objetos cuyo estado sea igual a pendiente
 */
function pendientes() {
  cuerpoTabla.innerHTML = "";
  facturas.forEach(function (factura) {
    if (factura.estado === "pendiente") {
      fila(factura);
    }
  });
}

/**
 * @description Dentro  de una funcion llamada pagadas: itera el array facturas e  imprime en consola cada uno de los objetos cuyo estado sea igual a pagadas
 */
function pagadas() {
  cuerpoTabla.innerHTML = "";
  facturas.forEach(function (factura) {
    if (factura.estado === "pagada") {
      fila(factura);
    }
  });
}

/**
 * @description En el html encontraras un  ul que contiene tres li.  A cada uno de esos li agregaras un escuchador de evento click y utilizaras las fuciones creadas en los pasos anteriores.
 *
 */
document.getElementById("todos").addEventListener("click", todos);
document.getElementById("pendientes").addEventListener("click", pendientes);
document.getElementById("pagadas").addEventListener("click", pagadas);

/**
 * @description Este punto constara de varias partes:
 * 1. Utiliza querySelector para seleccionar el boton con id addContactBtn;
 * 2. Utiliza querySelector para seleccionar modal con id modal;
 * 3. Utiliza querySelector para seleccionar el boton con la clase close en el modal;
 * 4. Crea una funcion llamada toggleModal que agregue o quite la clase hidden al modal.
 * 5. Agrega un escuchador de evento click al boton con id addContactBtn que ejecute la funcion toggleModal.
 * 6. Agrega un escuchador de evento click al boton con la clase close que ejecute la funcion toggleModal.
 */

const addContactBtn = document.getElementById("addContactBtn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");

// Función toggle usando classList
function toggleModal() {
  modal.classList.toggle("hidden");
}

addContactBtn.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);

// Cerrar si el usuario hace clic fuera del modal
window.onclick = (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
};
/** 
 * @description Este punto constara de varias partes:
 * 1. Utiliza querySelector para llamar el formulario que se encuentra dentro del modal.
 * 2. Crea una funcion llamada agregarFactura que reciba un evento (e) como parametro.
 * 3. Crea una instancia de FormData y pasale como parametro el formulario.
 * 4. Utiliza el metodo get para obtener el valor de cada uno de los inputs del formulario.
 * 5. Crea un objeto con las propiedades que se encuentran en el formulario
 * 6. Agrega el objeto creado al array facturas
 * 7. Ejecuta la funcion todos que creaste en el paso 1.
 * 8. Cierra el modal.
 * 9. Resetea el formulario.
 * 10. Agrega un escuchador de evento submit al formulario que llamará a la función agregarFactura.
 * Nota: No olvides prevenir el comportamiento por defecto del formulario.
 */
 const form = document.querySelector("#modal form");

function agregarFactura(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const nuevaFactura = {
    id: facturas.length + 1,
    numeroFactura: formData.get("factura"),
    descripcion: formData.get("descripcion"),
    estado: formData.get("estado"),
    fecha: formData.get("fecha"),
  };

  facturas.push(nuevaFactura);
  todos();
  guardarEnLocalStorage();
  toggleModal();
  form.reset();
}

form.addEventListener("submit", agregarFactura);

/**
  * @description: Este punto constara de varias partes:
  * 1. Crea una función llamada eliminar facturas que reciba un parametro llamado id
  * 2. Dentro de la función eliminar facturas, itera el array facturas y elimina el objeto cuyo id sea igual al id que se recibe como parametro.
  * Nota: Para eliminar un objeto de un array puedes utilizar el método filter o splice. Si utilizas el metodo splice, tambien necesitaras utilizar el metodo findIndex.
  */

 function eliminarFactura(id) {
  const index = facturas.findIndex(factura => factura.id === id);
  if (index !== -1) {
    facturas.splice(index, 1);
    todos();
    guardarEnLocalStorage();
  }
}
 addEventListener("click", (e) => {
  if (e.target.classList.contains("action")) {
    const id = parseInt(e.target.closest("tr").querySelector("td").textContent);
    eliminarFactura(id);
  }
});


function guardarEnLocalStorage() {
  // Convertimos el array a String porque localStorage solo guarda texto
  localStorage.setItem("mis_facturas", JSON.stringify(facturas));
}