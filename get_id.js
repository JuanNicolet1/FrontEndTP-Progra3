let get_id = document.getElementById("lista-getId");
let get_producto = document.getElementById("getProduct-form");

get_producto.addEventListener("submit", async(event) => {
    event.preventDefault(); // Evitamos envio por defecto

    try {
       let formData = new FormData(event.target);
       console.log(formData);

       // Transformamos el objeto fromData en un objeto JS normal
       let data = Object.fromEntries(formData.entries());
       console.log(data);

       let idProd = data.idProd;
       console.log(idProd);

       let response = await fetch(`http://localhost:3000/producto/${idProd}`);

       let datos = await response.json();
       console.log(datos);

       let producto = datos.payload;

       let getProductHtml = `
       <li class="listado_mostrar">
                <img src="${producto.Imagen}" alt="">
                <p>Nombre: ${producto.Nombre} Precio: ${producto.Precio}</p>
            </li>
            `
       get_id.innerHTML = getProductHtml;     
    } catch (error){
        console.log("Error al obtener el producto: ", error);
    }     
})