carrito_container = document.getElementById("carrito-container");
boton_eliminar = document.getElementById("boton-eliminar");

let listaProducts = localStorage.getItem("carrito");
let listaProductos = JSON.parse(listaProducts) || [];
let total = 0;

function mostrarCarrito() {
    let htmlProductos = "";
    
    listaProductos.forEach(producto => {
        htmlProductos += `
        <li class="listado_mostrar" type="none">
            <img src="${producto.image}" alt="">
            <p>Nombre: ${producto.name}</p>
            <p class="precio">Precio: ${producto.price}</p>
            <button class="boton-carrito" onclick="borrarCarrito(${producto.id_producto})">Eliminar del carrito</button>
        </li>
        `;
    });
    carrito_container.innerHTML = htmlProductos;
}

function borrarCarrito(idProd) {
    listaProductos = listaProductos.filter(producto => producto.id_producto !== idProd); // Filtra los productos que no tengan el mismo id del producto a eliminar. Esto evita que se muestre
    mostrarTotal();
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
}

function mostrarTotal() {
    total = 0;
    sumarTotal();
    let htmlBoton = ` <p>Total: ${total}</p>
    <button class="boton-carrito" onclick="eliminarCarrito()">Eliminar todo</button>`;
    boton_eliminar.innerHTML = htmlBoton;
}

function sumarTotal(){
    listaProductos.forEach(costo =>{ // Con forEach: por cada costo (fruta) que haya multiplicamos el precio por la cantidad
        total += costo.price;
    })
}

function eliminarCarrito() {
    listaProductos = [];
    localStorage.setItem("carrito", JSON.stringify(listaProductos));
    mostrarCarrito();
    mostrarTotal();
}

mostrarCarrito();
mostrarTotal();