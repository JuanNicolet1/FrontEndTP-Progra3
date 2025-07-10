// --- Manejo del carrito y bienvenida ---
let productoContainer = document.querySelector(".container-productos");
carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const nombre = localStorage.getItem("nombre");
let bienvenida = document.getElementById("texto-bienvenida");
let lista_productos = [];

// --- Elementos de filtrado ---
let filtroCategoria = document.getElementById("filtro-categoria");
let filtroPrecioMin = document.getElementById("filtro-precio-min");
let filtroPrecioMax = document.getElementById("filtro-precio-max");
let barraBusqueda = document.getElementById("barra-busqueda");
let botonLimpiarFiltros = document.getElementById("limpiar-filtros");

// Si el usuario está logueado, mostrar bienvenida. Si no, redirigir al login
if(nombre){
    bienvenida.textContent = `Bienvenido ${nombre}`;
} else{
    window.location.href = "../interfaz_log/log.html";
}

// --- Obtener productos desde el backend ---
async function obtenerDatasProductos() {
    try {
        const respuesta = await fetch("http://localhost:3000/products"); // Cambia 3000 por 3002 si es necesario
        const datos = await respuesta.json();
        lista_productos = datos.payload;
        mostrarProductos(lista_productos);
        cargarCategorias();
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

// --- Cargar categorías únicas en el filtro de categorías ---
function cargarCategorias() {
    const categorias = [...new Set(lista_productos.map(producto => producto.category))];
    filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filtroCategoria.appendChild(option);
    });
}

// --- Aplicar filtros de categoría y precio ---
function aplicarFiltros() {
    let productosFiltrados = [...lista_productos];
    // Filtrar por categoría
    const categoriaSeleccionada = filtroCategoria.value;
    if (categoriaSeleccionada) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.category === categoriaSeleccionada
        );
    }
    // Filtrar por precio mínimo
    const precioMin = parseFloat(filtroPrecioMin.value);
    if (!isNaN(precioMin) && precioMin > 0) {
        productosFiltrados = productosFiltrados.filter(producto => 
            parseFloat(producto.price) >= precioMin
        );
    }
    // Filtrar por precio máximo
    const precioMax = parseFloat(filtroPrecioMax.value);
    if (!isNaN(precioMax) && precioMax > 0) {
        productosFiltrados = productosFiltrados.filter(producto => 
            parseFloat(producto.price) <= precioMax
        );
    }
    mostrarProductos(productosFiltrados);
}

// --- Limpiar todos los filtros y mostrar todos los productos ---
function limpiarFiltros() {
    filtroCategoria.value = "";
    filtroPrecioMin.value = "";
    filtroPrecioMax.value = "";
    mostrarProductos(lista_productos);
}

// --- Mostrar productos en el HTML ---
function mostrarProductos(listaProductos) {
    let htmlProductos = "";
    if (listaProductos.length === 0) {
        htmlProductos = '<p style="text-align: center; color: white; font-size: 18px; grid-column: 1 / -1;">No se encontraron productos con los filtros aplicados.</p>';
    } else {
        listaProductos.forEach(producto => {
            htmlProductos += `
            <li class="listado_mostrar" type="none">
                <img src="${producto.image}" alt="">
                <p>Nombre: ${producto.name}</p>
                <p>Precio: ${producto.price}</p>
                <p>Categoría: ${producto.category}</p>
                <button class="boton-carrito" onclick="agregarCarrito(${producto.id_producto})">Agregar a carrito</button>
            </li>
            `;
        });
    }
    productoContainer.innerHTML = htmlProductos;
}

barraBusqueda.addEventListener("keyup", function(){ // addEventListener escucha el click
    let valorInput = barraBusqueda.value.toLowerCase(); // Se obtiene lo que el usuario escribe y los transforma a minusculas
    console.log(valorInput);
    let juegosFiltradas = lista_productos.filter(producto => producto.name.toLowerCase().includes(valorInput));
    mostrarProductos(juegosFiltradas);
});

// --- Agregar producto al carrito y guardar en localStorage ---
function agregarCarrito(id_productos){
    let nuevoProducto = lista_productos.find(producto => producto.id_producto === id_productos);
    let chequeo = carrito.find(producto2 => producto2.id_producto === id_productos);
    if(chequeo) {
        chequeo.cantidad += 1;
    } else {
        nuevoProducto.cantidad = 1;
        carrito.push(nuevoProducto);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// --- Eventos para filtros (se aplican automáticamente) ---
botonLimpiarFiltros.addEventListener('click', limpiarFiltros);
filtroCategoria.addEventListener('change', aplicarFiltros);
filtroPrecioMin.addEventListener('input', aplicarFiltros);
filtroPrecioMax.addEventListener('input', aplicarFiltros);

// --- Inicialización: obtener productos al cargar la página ---
obtenerDatasProductos();    