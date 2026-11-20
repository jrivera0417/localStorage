function guardarNombre() {

    let nombre = document.getElementById("nombreGuardar").value.trim();

    if (nombre==="") {
        alert("Por favor ingrese el nombre");
        return;
    }else{

        let listaNombres = JSON.parse(localStorage.getItem("Nombre")) || [];
        listaNombres.push(nombre);

        localStorage.setItem("Nombre", JSON.stringify(listaNombres));

        document.getElementById("nombreGuardar").value="";
        document.getElementById("resultadoGuardar").innerText=
        `Nombre guardado: ${nombre} - Total Nombres: ${listaNombres.length}`;

    }
}

function mostrarNombre() {
    let listaNombres = JSON.parse(localStorage.getItem("Nombre")) || [];
    let resultado = document.getElementById("resultadoMostrar");

    if (listaNombres.length === 0) {
        resultado.innerText = "No hay nombres guardados";
        return;
    }
    resultado.innerHTML = listaNombres
        .map((nombre, posicion) => `<li>${posicion + 1}. ${nombre}</li>`)
        .join("");
}

function editarNombre() {
    let posicion = document.getElementById("posicionEditar").value;
    let nuevoNombre = document.getElementById("nuevoNombre").value.trim();
    let listaNombres = JSON.parse(localStorage.getItem("Nombre")) || [];

    if (posicion === "" || nuevoNombre === "") {
        alert("Complete todos los campos");
        return;
    }

    posicion = Number(posicion) - 1;

    if (posicion < 0 || posicion >= listaNombres.length) {
        alert("La posición no existe");
        return;
    }

    listaNombres[posicion] = nuevoNombre;

    localStorage.setItem("Nombre", JSON.stringify(listaNombres));

    document.getElementById("resultadoEditar").innerText =
        "Nombre actualizado correctamente";

    document.getElementById("posicionEditar").value="";
    document.getElementById("nuevoNombre").value="";
}

function eliminarNombre(eliminarTodos = false) {
    const resultado = document.getElementById("resultadoEliminar");

    if (eliminarTodos) {
        localStorage.removeItem("Nombre");
        resultado.innerText = "Se eliminaron todos los nombres";
        document.getElementById("posicionEliminar").value = "";
        return;
    }

    const posicionInput = document.getElementById("posicionEliminar");
    const posicion = Number(posicionInput.value);
    const listaNombres = JSON.parse(localStorage.getItem("Nombre")) || [];

    if (posicionInput.value === "" || !Number.isInteger(posicion) || posicion < 1) {
        alert("Ingrese una posición válida (desde 1)");
        return;
    }

    if (posicion > listaNombres.length) {
        alert("La posición no existe");
        return;
    }

    const [nombreEliminado] = listaNombres.splice(posicion - 1, 1);
    if (listaNombres.length === 0) {
        localStorage.removeItem("Nombre");
    } else {
        localStorage.setItem("Nombre", JSON.stringify(listaNombres));
    }

    resultado.innerText = `Se eliminó el nombre ${nombreEliminado} de la posición ${posicion}`;
    posicionInput.value = "";
}

function guardarMascota() {
    const nombre = document.getElementById("mascota").value.trim();
    const raza = document.getElementById("raza").value.trim();
    const edadInput = document.getElementById("edad");
    const edad = Number(edadInput.value);

    if (nombre === "" || raza === "" || edadInput.value === "") {
        alert("Por favor llene todos los campos");
        return;
    }

    if (!Number.isFinite(edad) || edad < 0) {
        alert("La edad debe ser igual o mayor a 0");
        edadInput.value = "";
        edadInput.focus();
        return;
    }

    const mascota = {
        nombre,
        raza,
        edad
    };

    localStorage.setItem("mascota", JSON.stringify(mascota));

    document.getElementById("resultadoMascota").textContent =
        "Mascota guardada correctamente.";

    document.getElementById("mascota").value="";
    document.getElementById("raza").value="";
    document.getElementById("edad").value="";

}

function mostrarMascota() {
    const mascotaGuardada = JSON.parse(localStorage.getItem("mascota"));
    const resultado = document.getElementById("resultadoMostrarMascota");

    if (!mascotaGuardada) {
        resultado.textContent = "No hay mascotas guardadas";
        return;
    }

    resultado.innerHTML =
        `<li>Nombre: ${mascotaGuardada.nombre}</li>` +
        `<li>Raza: ${mascotaGuardada.raza}</li>` +
        `<li>Edad: ${mascotaGuardada.edad}</li>`;
}