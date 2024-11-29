// se crea una funcion que dentro tiene crada la lista.

function listaDeViajes(lista) {
  const guia = document.querySelector(".guia");

  const li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start"
  );

  const descripcionDiv = document.createElement("div");
  descripcionDiv.innerText = lista.notas;

  const destinoDiv = document.createElement("div");
  destinoDiv.classList.add("ms-2", "me-auto");
  destinoDiv.innerText = lista.destino;

  destinoDiv.appendChild(descripcionDiv);
  li.appendChild(destinoDiv);
  guia.appendChild(li);
}

// esta función se utiliza para guardar datos en LocalStorage
function guardarEnLocalStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

// esta función se utiliza para recuperar datos de LocalStorage
function obtenerDeLocalStorage(clave) {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : [];
}

// esta funcion abarca el modal de boostrtap
function modal() {
  // buscamos por ID en el html los input donde se ingresa la info pedida al usuario
  const nuevodestino = document.getElementById("nuevodestino");
  const notaspersonales = document.getElementById("notaspersonales");
  // aca para cerrar el modal y sacar el fondo transparente
  const exampleModal = document.querySelector("#exampleModal");
  const backdrop = document.querySelector(".modal-backdrop");
  exampleModal.style.display = "none";
  backdrop.style.display = "none";
  // creamos una constante lista que guarda la info ingresada por el usuario value que seria el texto explicado en el ejemplo del ave
  const lista = {
    destino: nuevodestino.value,
    notas: notaspersonales.value,
  };
  // se llama funcion lista de viajes que es donde se armo la lista usando un ejemplo de boostrap.
  listaDeViajes(lista);

  // Guardar el nuevo destino en LocalStorage
  const viajes = obtenerDeLocalStorage("viajes");
  viajes.push(lista);
  guardarEnLocalStorage("viajes", viajes);

  // aca se toma el valor de los campos de texto y se eliminan para que el usuario pueda ingresarlo varias veces sin tener que borrar.
  nuevodestino.value = "";
  notaspersonales.value = "";
}

// se crea una constante que guarda el boton de cargar
const btncargar = document.querySelector("#cargar");
// aca para que llame al modal al escuchar el click, si los datos de los imput tienen texto se activa la funcion modal que a su vez dentro tiene la funcion Lista.
// y si no se cumplen esas condiciones tira un alert pidiendole al usuario que ingrese los datos pedidos
btncargar.addEventListener("click", () => {
  const nuevodestino = document.getElementById("nuevodestino");
  const notaspersonales = document.getElementById("notaspersonales");
  if (nuevodestino.value && notaspersonales.value) {
    modal();
  } else {
    alert("Por favor completa todos los campos solicitados");
  }
});

// Recuperar y mostrar los viajes almacenados al cargar la página
window.addEventListener("load", () => {
  const viajesGuardados = obtenerDeLocalStorage("viajes");
  viajesGuardados.forEach(listaDeViajes);
});

/////////////////////////ACA TERMINA LA LISTA/////////////////////////

////////////////////////// ACA EMPIEZA EL FORMULARIO ///////////////////////////////

// creo constantes para guardar nombre, apellido, mail y el boton
// despues llamo al boton de confirmar y le digo que si nombre, apellido y mail tienen texto me modifique el contenido del H2 y oculte el boton y el formulario.

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const mail = document.getElementById("mail");
const btnConfirmar = document.querySelector("#confirmar");
const formulario = document.getElementById("formulario");

// Recuperar datos del usuario almacenados y mostrarlos al cargar la página
window.addEventListener("load", () => {
  const datosUsuario = obtenerDeLocalStorage("usuario");
  if (datosUsuario.nombre) {
    nombre.value = datosUsuario.nombre;
    apellido.value = datosUsuario.apellido;
    mail.value = datosUsuario.mail;

    const h2DeDatos = document.getElementById("h2DeDatos");
    h2DeDatos.innerText =
      "Bienvenido " + datosUsuario.nombre + " " + datosUsuario.apellido;

    btnConfirmar.style.display = "none";
    formulario.style.display = "none";
  }
});

btnConfirmar.addEventListener("click", () => {
  if (nombre.value && apellido.value && mail.value) {
    const h2DeDatos = document.getElementById("h2DeDatos");
    h2DeDatos.innerText = "Bienvenido " + nombre.value + " " + apellido.value;

    guardarEnLocalStorage("usuario", {
      nombre: nombre.value,
      apellido: apellido.value,
      mail: mail.value,
    });

    btnConfirmar.style.display = "none";
    formulario.style.display = "none";
  } else {
    alert("Por favor completa todos los campos solicitados");
  }
});

////////////////////////// ACA TERMINA EL fomulario ///////////////////////////////

////////////////////////// ACA EMPIEZA EL AGENDAR FECHAS ///////////////////////////////

// llamo al boton del modal con el id botoncalendario
const botoncalendario = document.querySelector("#botoncalendario");

botoncalendario.addEventListener("click", () => {
  const textoFechaDelViaje = document.getElementById("textoFechaDelViaje");
  const textoHora = document.getElementById("textoHora");
  const textoDestino = document.getElementById("textoDestino");
  const textoAerolinea = document.getElementById("textoAerolinea");

  if (
    textoDestino.value &&
    textoAerolinea.value &&
    textoHora.value &&
    textoFechaDelViaje.value
  ) {
    const modalCalendario = document.querySelector("#modalCalendario");
    const backdrops = document.querySelector(".modal-backdrop");
    modalCalendario.style.display = "none";
    backdrops.style.display = "none";

    const lista = {
      destino: textoDestino.value,
      fecha: textoFechaDelViaje.value,
      hora: textoHora.value,
      aerolinea: textoAerolinea.value,
    };

    function calendarioListas() {
      const calendarioLista = document.querySelector("#calendarioLista");

      const tr = document.createElement("tr");
      calendarioLista.appendChild(tr);

      const destinoLi = document.createElement("td");
      destinoLi.innerText = lista.destino;
      tr.appendChild(destinoLi);

      const fechaLi = document.createElement("td");
      fechaLi.innerText = lista.fecha;
      tr.appendChild(fechaLi);

      const horaLi = document.createElement("td");
      horaLi.innerText = lista.hora;
      tr.appendChild(horaLi);

      const aerolineaLi = document.createElement("td");
      aerolineaLi.innerText = lista.aerolinea;
      tr.appendChild(aerolineaLi);
    }

    calendarioListas();

    const fechas = obtenerDeLocalStorage("fechas");
    fechas.push(lista);
    guardarEnLocalStorage("fechas", fechas);

    textoDestino.value = "";
    textoAerolinea.value = "";
    textoHora.value = "";
    textoFechaDelViaje.value = "";
  } else {
    alert("Por favor completa todos los campos solicitados");
  }
});

// Recuperar y mostrar las fechas almacenadas al cargar la página
window.addEventListener("load", () => {
  const fechasGuardadas = obtenerDeLocalStorage("fechas");
  fechasGuardadas.forEach((lista) => {
    const calendarioLista = document.querySelector("#calendarioLista");

    const tr = document.createElement("tr");
    calendarioLista.appendChild(tr);

    const destinoLi = document.createElement("td");
    destinoLi.innerText = lista.destino;
    tr.appendChild(destinoLi);

    const fechaLi = document.createElement("td");
    fechaLi.innerText = lista.fecha;
    tr.appendChild(fechaLi);

    const horaLi = document.createElement("td");
    horaLi.innerText = lista.hora;
    tr.appendChild(horaLi);

    const aerolineaLi = document.createElement("td");
    aerolineaLi.innerText = lista.aerolinea;
    tr.appendChild(aerolineaLi);
  });
});

////////////////////////// ACA TERMINA EL AGENDAR FECHAS ///////////////////////////////

//Consultas, como hacer para que la lista a medida que se cargan destinos cambie el numero?
//Como hacer para separar el bienvenido del nombre y el apellido.
//Como hacer para cambiar el alert al pedirle al usuario que complete los campos pedidos del formulario?
// Se puede cambiar el boton de crear por un mas?
// al cargar la lista como puedo hacer para que el destino quede en bold?
