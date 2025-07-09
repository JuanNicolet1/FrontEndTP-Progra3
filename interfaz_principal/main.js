let productoContainer = document.querySelector(".container-productos");
carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const nombre = localStorage.getItem("nombre");
let bienvenida = document.getElementById("texto-bienvenida");
let lista_productos = [];

if(nombre){
    bienvenida.textContent = `Bienvenido ${nombre}`;
} else{
    window.location.href = "../interfaz_log/log.html";
}

async function obtenerDatasProductos() {
        try {
            const respuesta = await fetch("http://localhost:3000/products"); // Cambia 3000 por 3002
            const datos = await respuesta.json();
            lista_productos = datos.payload;
            mostrarProductos(lista_productos);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
}

function mostrarProductos(listaProductos) {
    let htmlProductos = "";

    listaProductos.forEach(producto => {
        htmlProductos += `
        <li class="listado_mostrar" type="none">
            <img src="${producto.image}" alt="">
            <p>Nombre: ${producto.name}</p>
            <p>Precio: ${producto.price}</p>
            <button class="boton-carrito" onclick="agregarCarrito(${producto.id_producto})">Agregar a carrito</button>
        </li>
        `;
    });
    productoContainer.innerHTML = htmlProductos;
}

function agregarCarrito(id_productos){
    let nuevoProducto = lista_productos.find(producto => producto.id_producto === id_productos); // Busca la fruta a añadir a traved del id
    console.log(nuevoProducto);
    let chequeo = carrito.find(producto2 => producto2.id_producto === id_productos); // Hace lo mismo que el anterior. Este lo hice para evitar que se dupliquen las frutas
    if(chequeo) {
        chequeo.cantidad += 1;
    } else {
        nuevoProducto.cantidad = 1;
        carrito.push(nuevoProducto);
    }
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

    // Llamar a la función al cargar la página
obtenerDatasProductos();




init();    