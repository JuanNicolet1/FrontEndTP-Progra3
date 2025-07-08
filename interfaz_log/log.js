boton = document.getElementById("form").addEventListener("submit", function(formulario) {
    formulario.preventDefault();
    let nombre_usuario = document.getElementById("nombre").value;

    localStorage.setItem("nombre", nombre_usuario);
    window.location.href = "../interfaz_principal/index.html";
});