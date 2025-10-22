// --- 1. CONFIGURACIÓN INICIAL ---

// Esta variable nos dirá qué cálculo estamos haciendo
let tipoCalculoActual = 'aguinaldo'; // 'aguinaldo' es el default

// --- 2. REFERENCIAS A ELEMENTOS DEL HTML ---
// (Guardamos los elementos en variables para usarlos fácil)

// Pestañas
const btnAguinaldo = document.getElementById('btnAguinaldo');
const btnVacaciones = document.getElementById('btnVacaciones');
const btnFiniquito = document.getElementById('btnFiniquito');

// Entradas (Inputs)
const inputSalario = document.getElementById('salarioMensual');
const inputDiasTrabajados = document.getElementById('diasTrabajados');
const inputDiasVacaciones = document.getElementById('diasVacaciones');

// Contenedores (los 'divs' que ocultamos y mostramos)
const grupoDiasVacaciones = document.getElementById('groupDiasVacaciones');
const zonaResultados = document.getElementById('calcResult');
const textoResultado = document.getElementById('resultText');

// Botón de Acción
const btnCalcular = document.getElementById('btnCalcular');


// --- 3. LÓGICA DE PESTAÑAS ---

// Función para cambiar de pestaña
function cambiarPestana(tipo) {
    // 1. Actualizamos nuestra variable principal
    tipoCalculoActual = tipo;

    // 2. Quitamos la clase 'active' de TODOS los botones
    btnAguinaldo.classList.remove('active');
    btnVacaciones.classList.remove('active');
    btnFiniquito.classList.remove('active');

    // 3. Ocultamos el campo extra de "días de vacaciones"
    grupoDiasVacaciones.style.display = 'none';

    // 4. Ocultamos los resultados anteriores
    zonaResultados.style.display = 'none';

    // 5. Activamos la pestaña correcta y mostramos campos si es necesario
    if (tipo === 'aguinaldo') {
        btnAguinaldo.classList.add('active');
    } 
    else if (tipo === 'vacaciones') {
        btnVacaciones.classList.add('active');
        grupoDiasVacaciones.style.display = 'block'; // ¡Mostramos el campo extra!
    } 
    else if (tipo === 'finiquito') {
        btnFiniquito.classList.add('active');
        grupoDiasVacaciones.style.display = 'block'; // ¡También lo mostramos aquí!
    }
}

// "Escuchamos" los clics en los botones de pestaña
btnAguinaldo.addEventListener('click', () => cambiarPestana('aguinaldo'));
btnVacaciones.addEventListener('click', () => cambiarPestana('vacaciones'));
btnFiniquito.addEventListener('click', () => cambiarPestana('finiquito'));


// --- 4. LÓGICA DE CÁLCULO ---

// "Escuchamos" el clic en el botón de "Calcular"
btnCalcular.addEventListener('click', () => {
    
    // 1. Obtenemos los valores de los inputs
    const salarioMensual = parseFloat(inputSalario.value);
    const diasTrabajados = parseFloat(inputDiasTrabajados.value);
    const diasVacaciones = parseFloat(inputDiasVacaciones.value); // Puede ser 0 o NaN si está oculto

    // 2. Validación básica
    if (!salarioMensual || !diasTrabajados) {
        alert('Por favor, ingresa el Salario Mensual y los Días Trabajados.');
        return; // Detiene la función
    }

    // 3. Cálculo base (Salario Diario)
    const salarioDiario = salarioMensual / 30; // Usamos 30 como estándar

    let resultadoFinal = 0;

    // 4. Decidimos qué fórmula usar
    if (tipoCalculoActual === 'aguinaldo') {
        // Fórmula de Aguinaldo
        resultadoFinal = (diasTrabajados / 365) * 15 * salarioDiario;
    } 
    else if (tipoCalculoActual === 'vacaciones') {
        if (!diasVacaciones || diasVacaciones <= 0) {
            alert('Por favor, ingresa los días de vacaciones por año.');
            return;
        }
        // Fórmulas de Vacaciones
        const pagoVacaciones = salarioDiario * diasVacaciones;
        const primaVacacional = pagoVacaciones * 0.25;
        resultadoFinal = pagoVacaciones + primaVacacional;
    } 
    else if (tipoCalculoActual === 'finiquito') {
        if (!diasVacaciones || diasVacaciones <= 0) {
            alert('Por favor, ingresa los días de vacaciones por año.');
            return;
        }
        // Fórmulas de Finiquito
        const aguinaldoProp = (diasTrabajados / 365) * 15 * salarioDiario;
        const vacacionesProp = (diasTrabajados / 365) * diasVacaciones * salarioDiario;
        const primaVacProp = vacacionesProp * 0.25;
        resultadoFinal = aguinaldoProp + vacacionesProp + primaVacProp;
    }

    // 5. Mostramos el resultado
    
    // Damos formato de moneda (ej: 12345.6 -> 12,345.60)
    // ¡LA LÍNEA DEL ERROR ESTABA AQUÍ (o cerca)!
    textoResultado.textContent = `$${resultadoFinal.toLocaleString('es-MX', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    })}`;
    
    // Hacemos visible el 'div' de resultados
    zonaResultados.style.display = 'block';
});