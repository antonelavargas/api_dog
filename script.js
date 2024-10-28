// elementos del DOM
const btnBuscar = document.getElementById('btnBuscar');
const btnAleatorio = document.getElementById('btnAleatorio');
const imagenPerro = document.getElementById('imagenPerro');
const selectorRaza = document.getElementById('selectorRaza');

// obtener la lista de razas y llenar el selector
async function cargarRazas() {
    try {
        const respuesta = await fetch('https://api.thedogapi.com/v1/breeds');
        const razas = await respuesta.json();

        // Llenar el selector con las razas
        razas.forEach(raza => {
            const opcion = document.createElement('option');
            opcion.value = raza.id;
            opcion.textContent = raza.name;
            selectorRaza.appendChild(opcion);
        });
    } catch (error) {
        console.error('Error al cargar las razas:', error);
    }
}

// obtener una imagen aleatoria de perrito
async function obtenerImagenAleatoria() {
    try {
        const respuesta = await fetch('https://api.thedogapi.com/v1/images/search');
        const datos = await respuesta.json();
        imagenPerro.src = datos[0].url;
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
    }
}

// buscar una imagen por raza seleccionada
async function buscarImagenPorRaza() {
    const razaId = selectorRaza.value;
    if (!razaId) {
        alert('Por favor, selecciona una raza.');
        return;
    }

    try {
        // Obtener la imagen de un perro de la raza especificada
        const respuestaImagen = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${razaId}`);
        const datosImagen = await respuestaImagen.json();
        imagenPerro.src = datosImagen[0].url;
    } catch (error) {
        console.error('Error al buscar la imagen:', error);
    }
}

// Agregar eventos a los botones
btnBuscar.addEventListener('click', buscarImagenPorRaza);
btnAleatorio.addEventListener('click', obtenerImagenAleatoria);

// Cargar una imagen aleatoria al iniciar la página y llenar el selector de razas
obtenerImagenAleatoria();
cargarRazas();
