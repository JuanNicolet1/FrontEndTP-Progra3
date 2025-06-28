/* Metodo con fetch
fetch("http://localhost:3000/producto")
  .then(respuesta => respuesta.json()) // convertimos el dato a JavaScript
  .then(data => {
    console.log(data)
  }) */

// Metodo con async/await
async function obtenerProductos(){
  try {
    // Se espera a la respuesta de la petición fetch
    let respuesta = await fetch("http://localhost:3000/producto");
    console.log(respuesta);

    // Se espera a convertir a objeto JS
    let datos = await respuesta.json();
    console.log(datos);

    mostrarProductos(datos);

    
  } catch(error) {
    console.error("Error", error);
  }
}

function mostrarProductos(array){
  let listaProductos = array.payload; // Aca guardamos directamente el array de productos
  console.log(listaProductos);

  let producto_lista = document.getElementById("lista-productos");
  let htmlProductos = "";

  listaProductos.forEach(producto => {
    htmlProductos += `
    <li class="listado_mostrar">
                <img src="${producto.Imagen}" alt="">
                <p>Nombre: ${producto.Nombre} Precio: ${producto.Precio}</p>
            </li>
            `
  })
  producto_lista.innerHTML =  htmlProductos;
}

obtenerProductos();