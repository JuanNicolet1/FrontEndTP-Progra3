// Lógica para consultar producto por ID desde el formulario en get.html

document.addEventListener("DOMContentLoaded", () => {
    const get_id = document.getElementById("lista-getId");
    const get_producto = document.getElementById("getProduct-form");

    if(get_producto) {
        get_producto.addEventListener("submit", async(event) => {
            event.preventDefault(); // Evitamos envio por defecto

            try {
                let formData = new FormData(event.target);
                let data = Object.fromEntries(formData.entries());
                let idProd = data.idProd.trim(); // Se sacan posibles espacios

                // Validación básica
                if(!idProd) {
                    throw new Error("Ingrese un id de producto correcto");
                }
                let response = await fetch(`http://localhost:3002/products/${idProd}`);

                // Manejamos el error en una posible respuesta no exitosa
                if(!response.ok){
                    throw new Error("Ingrese un id de producto correcto");
                }
                let datos = await response.json();
                let producto = datos.payload;

                let getProductHtml = `
                    <li class="listado_mostrar">
                        <img src="${producto.image}" alt="">
                        <p>Nombre: ${producto.name} Precio: ${producto.price}</p>
                    </li>
                `;
                get_id.innerHTML = getProductHtml;
            } catch (error){
                console.log("Error al obtener el producto: ", error);
                get_id.innerHTML = `${error.message}`;
            }
        });
    }
});
