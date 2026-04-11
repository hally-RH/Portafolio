// 1. Referencia a la pantalla (el input de HTML)
const pantalla = document.getElementById("pantalla");

// 2. Función para añadir números y operadores
function agregar(valor) {
    // Si hay un error en pantalla, lo limpiamos antes de escribir
    if (pantalla.value === "Error") {
        limpiar();
    }
    pantalla.value += valor;
}

// 3. Función para borrar todo
function limpiar() {
    pantalla.value = "";
}

// 4. Función para borrar el último carácter (Backspace)
function borrarUno() {
    pantalla.value = pantalla.value.slice(0, -1);
}

// 5. Función para resolver la operación
function calcular() {
    try {
        // eval() toma el texto y lo resuelve matemáticamente
        // Si el resultado es infinito o inválido, manejamos el error
        const resultado = eval(pantalla.value);
        
        if (isNaN(resultado) || !isFinite(resultado)) {
            throw new Error("Operación inválida");
        }
        
        pantalla.value = resultado;
    } catch (error) {
        pantalla.value = "Error";
        // Borramos el mensaje de error automáticamente después de 1.5 segundos
        setTimeout(limpiar, 1500);
    }
}

// 6. EXTRA: Soporte para teclado físico
document.addEventListener("keydown", (event) => {
    const tecla = event.key;

    // Permitir números y operadores
    if ("0123456789+-*/.".includes(tecla)) {
        agregar(tecla);
    }
    // Enter para calcular
    if (tecla === "Enter") {
        event.preventDefault(); // Evita comportamientos raros del navegador
        calcular();
    }
    // Escape para limpiar
    if (tecla === "Escape") {
        limpiar();
    }
    // Backspace para borrar uno
    if (tecla === "Backspace") {
        borrarUno();
    }
});