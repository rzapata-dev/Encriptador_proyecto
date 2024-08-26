const ingresoTexto = document.getElementById("ingresoTexto");
const botonEncriptar = document.getElementById("botonEncriptar");
const botonDesencriptar = document.getElementById("botonDesencriptar");
const botonCopiar = document.getElementById("botonCopiar");
const mensajeFinal = document.getElementById("mensajeFinal");
const munheco = document.getElementById("munheco");
const mensajeInfo = document.getElementById("mensajeInfo");
const derecha = document.getElementById("derecha");

//e - enter
//o - ober
//i - imes
//a - ai
//u - ufat

function validarTexto(texto) {
  // Expresión regular para permitir solo letras (a-z, A-Z), números (0-9), y espacios.
  const regex = /^[a-z0-9\s]+$/i;

  // Verificar si el texto cumple con la expresión regular
  return regex.test(texto);
}

// Validación en tiempo real mientras el usuario ingresa texto
ingresoTexto.addEventListener("input", () => {
  const texto = ingresoTexto.value;

  if (!validarTexto(texto)) {
    // Si se encuentra un carácter especial, elimina el último carácter ingresado
    ingresoTexto.value = texto.slice(0, -1);
    
    //alert("Por favor, ingresa solo letras y números, sin caracteres especiales.");
    showToast("Por favor, ingresa solo letras y números, sin caracteres especiales.");
  }
});

let reemplazar = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];
ingresoTexto.focus();

const remplace = (nuevoValor) => {
  mensajeFinal.innerHTML = nuevoValor;
  munheco.classList.add("oculto");
  ingresoTexto.value="";
  mensajeInfo.style.display = "none";
  botonCopiar.style.display = "block";
  derecha.classList.add("ajustar");
  mensajeFinal.classList.add("ajustar");
};

const reset = () =>{

    mensajeFinal.innerHTML = "";

    munheco.classList.remove("oculto");
    mensajeInfo.style.display = "block";
    botonCopiar.style.display = "none";

    derecha.classList.remove("ajustar");
    mensajeFinal.classList.remove("ajustar");
    ingresoTexto.focus();

}

botonEncriptar.addEventListener("click", () => {
  const texto = ingresoTexto.value.toLowerCase();

  if (!validarTexto(texto)) {
    //alert("El texto contiene caracteres especiales no permitidos. Por favor, corrige el texto.");
    showToast("El texto contiene caracteres especiales no permitidos. Por favor, corrige el texto.");
    ingresoTexto.value= "";
    return; // Evita que el proceso de encriptación continúe
   
  }

if (texto != "") {
   
  function encriptar(newText) {
    for (let i = 0; i < reemplazar.length; i++) {
      if (newText.includes(reemplazar[i][0])) {
        newText = newText.replaceAll(reemplazar[i][0], reemplazar[i][1]);
      };
    };
    return newText;
  };
} else{
    alert("ingrese texto!!");
    reset();
};
    //aqui sustimos las demas lineas por la funcion de arriba de nombre remplace
    remplace(encriptar(texto));
});

///botondesenmcriptar

botonDesencriptar.addEventListener("click", () => {
  const texto = ingresoTexto.value.toLowerCase();

  if (texto != "") {

  function desencriptar(newText) {
    for (let i = 0; i < reemplazar.length; i++) {
      if (newText.includes(reemplazar[i][1])) {
        newText = newText.replaceAll(reemplazar[i][1], reemplazar[i][0]);
      };
    };
    return newText;
  };
} else {
    //alert("ingrese texto!!");
    showToast("Por favor, ingresa texto.");
    reset();
};
remplace(desencriptar(texto));
});

//boton copiar

botonCopiar.addEventListener("click", ()=> {

    let texto = mensajeFinal;
    //navigator.clipboard.writeText(texto.value);
    texto.select();
    document.execCommand('copy');
    //alert("texto copiado");
    showToast("Texto copiado");

   reset();
})

//toasto
// Función para mostrar una notificación
function showToast(message, duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 500); // Esperar a que la animación termine
  }, duration);
}