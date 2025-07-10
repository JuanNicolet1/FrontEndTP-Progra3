let productoContainer = document.querySelector(".container-productos");

async function obtenerDatasProductos() {
        try {
            const respuesta = await fetch("http://localhost:3002/products"); // Cambia 3000 por 3002
            const datos = await respuesta.json();
            mostrarProductos(datos);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }

    function mostrarProductos(array) {
        const listaProductos = array.payload;
        let htmlProductos = "";

        listaProductos.forEach(producto => {
            htmlProductos += `
            <li class="listado_mostrar" type="none">
                <img src="${producto.image}" alt="">
                <p>Nombre: ${producto.name}</p>
                <p>Precio: ${producto.price}</p>
                <button class="boton-carrito" onclick="agregarCarrito()">Agregar a carrito</button>
            </li>
            `;
        });
        productoContainer.innerHTML = htmlProductos;
    }

    // Llamar a la función al cargar la página
    obtenerDatasProductos();

init();    