carrito_container = document.getElementById("carrito-container");
boton_eliminar = document.getElementById("boton-eliminar");
let total = 0;

function mostrarCarrito() {
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    let htmlProductos = "";
    if(listaProductos.length >= 1){
        listaProductos.forEach(producto => {
            htmlProductos += `
            <li class="listado_mostrar" type="none">
                <img src="${producto.image}" alt="">
                <p>Nombre: ${producto.name}</p>
                <p class="precio">Precio: ${producto.price}</p>
                <button class="boton-carrito" onclick="borrarCarrito(${producto.id_producto})">Eliminar del carrito</button>
            </li>
            <li class="listado_cantidad" type="none">
                <p>Cantidad: ${producto.cantidad}</p>
                <button class="boton-carrito" onclick="sumarCantidad(${producto.id_producto})">+</button>
                <button class="boton-carrito" onclick="borrarCantidad(${producto.id_producto})">-</button>
            </li>
            `;
        });
    } else {
        htmlProductos= `<p>No hay productos en el carrito</p>`
    }
    carrito_container.innerHTML = htmlProductos;
}

function borrarCarrito(idProd) {
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    listaProductos = listaProductos.filter(producto => producto.id_producto !== idProd); // Filtra los productos que no tengan el mismo id del producto a eliminar. Esto evita que se muestre
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    mostrarTotal();
    mostrarCarrito();
}

function mostrarTotal() {
    total = 0;
    sumarTotal();
    let htmlBoton = ` <p>Total: ${total}</p>
    <button class="boton-carrito" onclick="eliminarCarrito()">Eliminar todo</button>`;
    boton_eliminar.innerHTML = htmlBoton;
}

function sumarTotal(){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    listaProductos.forEach(costo =>{ // Con forEach: por cada costo (fruta) que haya multiplicamos el precio por la cantidad
        total += costo.price * costo.cantidad;
    })
}

function sumarCantidad(idProd){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    let juego = listaProductos.find(producto => producto.id_producto == idProd);
    juego.cantidad += 1; // La suma
    total += juego.price;
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    mostrarTotal();
    mostrarCarrito();
}

function borrarCantidad(idProd){
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    let juego = listaProductos.find(producto => producto.id_producto == idProd);
    juego.cantidad -= 1; // La resta
    
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    mostrarTotal();
    mostrarCarrito();
}

function eliminarCarrito() {
    let listaProducts = localStorage.getItem("carrito");
    let listaProductos = JSON.parse(listaProducts) || [];
    listaProductos = [];
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    mostrarCarrito();
    mostrarTotal();
}

mostrarCarrito();
mostrarTotal();