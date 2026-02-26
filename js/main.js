/**
 * @description Dentro  de una funcion llamada todos: itera el array facturas e  imprime en consola cada uno de los objetos que se encuentran dentro del array. 
 */
    function todos() {
        facturas.forEach(function (factura) {
            console.log(factura);
        });
    }
/**
* @description Dentro  de una funcion llamada pendientes: itera el array facturas e  imprime en consola cada uno de los objetos cuyo estado sea igual a pendiente 
*/
    function pendientes() {
        facturas.forEach(function (factura) {
            if (factura.estado === "pendiente") {
                console.log(factura);
            }
        });
    }

/**
* @description Dentro  de una funcion llamada pagadas: itera el array facturas e  imprime en consola cada uno de los objetos cuyo estado sea igual a pagadas 
*/
    function pagadas() {
        facturas.forEach(function (factura) {
            if (factura.estado === "pagada") {
                console.log(factura);
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
    


