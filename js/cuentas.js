import CuentaAhorro from "./CuentaAhorro.js";
import CuentaCorriente from "./CuentaCorriente.js";

// Variables
let cuenta;

const UsuarioId = sessionStorage.getItem('userId');
const tipoCuenta = sessionStorage.getItem('tipoCuenta');
const DatosUsuarios = JSON.parse(localStorage.getItem(UsuarioId));

if (tipoCuenta === 'ahorros') {
    cuenta = new CuentaAhorro(DatosUsuarios.cliente.cuentas[0].numeroCuenta);
} else {
    cuenta = new CuentaCorriente(DatosUsuarios.cliente.cuentas[0].numeroCuenta);
}

// Recuperar el saldo
const saldoGuardado = localStorage.getItem(`saldo_${cuenta.numeroCuenta}`);
if (saldoGuardado !== null) {
    cuenta.saldo = parseFloat(saldoGuardado);
} else {
    localStorage.setItem(`saldo_${cuenta.numeroCuenta}`, cuenta.saldo);
}

let movimientos = JSON.parse(localStorage.getItem(`movimientos_${cuenta.numeroCuenta}`)) || [];

function registrarMovimiento(tipo, monto) {
    const fecha = new Date().toLocaleString();
    movimientos.unshift({ fecha, tipo, monto });
    if (movimientos.length > 10) movimientos.pop();
    localStorage.setItem(`movimientos_${cuenta.numeroCuenta}`, JSON.stringify(movimientos));
}

function mostrarMovimientos() {
    const listaMovimientos = document.getElementById('listaMovimientos');
    listaMovimientos.innerHTML = ''; // Limpiar la lista actual
    movimientos.forEach(movimiento => {
        const li = document.createElement('li');
        li.textContent = `${movimiento.fecha}: ${movimiento.tipo} de $${movimiento.monto}`;
        listaMovimientos.appendChild(li);
    });
    document.getElementById('movimientosContainer').classList.remove('hidden');
}

function actualizarSobregiroDisponible() {
    if (tipoCuenta === 'corriente') {
        const sobregiroDisponible = cuenta.limiteSobregiro + cuenta.saldo;
        document.getElementById('sobregiroDisponible').textContent = `Sobregiro disponible: $${sobregiroDisponible}`;
    }
}

function actualizarSaldo() {
    cuenta.saldo = parseFloat(localStorage.getItem(`saldo_${cuenta.numeroCuenta}`));
    document.getElementById('saldoActual').textContent = `Saldo: $${cuenta.saldo}`;
    actualizarSobregiroDisponible();
}

function guardarSaldo() {
    localStorage.setItem(`saldo_${cuenta.numeroCuenta}`, cuenta.saldo);
}

if (tipoCuenta === 'corriente') {
    actualizarSobregiroDisponible();
}

actualizarSaldo();

document.getElementById('numeroCuenta').textContent = `Número de cuenta: ${cuenta.numeroCuenta}`;
document.getElementById('titularCuenta').textContent = `Titular: ${DatosUsuarios.cliente.nombre} ${DatosUsuarios.cliente.apellido}`;

document.getElementById('consultar').addEventListener('click', () => {
    actualizarSaldo();
    alert(`Su saldo actual es: $${cuenta.saldo}`);
});

document.getElementById('retirar').addEventListener('click', () => {
    const monto = parseFloat(prompt('Ingrese el monto a retirar:'));
    if (cuenta.realizarRetiro(monto)) {
        guardarSaldo();
        alert(`Retiro exitoso. Su nuevo saldo es: $${cuenta.saldo}`);
        registrarMovimiento('Retiro', monto);
        actualizarSaldo();
    } else {
        if (tipoCuenta === 'corriente') {
            const usarSobregiro = confirm("Saldo insuficiente. ¿Desea usar el sobregiro?");
            if (usarSobregiro && cuenta.sobregiro(monto)) {
                guardarSaldo();
                alert(`Retiro con sobregiro exitoso. Su nuevo saldo es: $${cuenta.saldo}`);
                registrarMovimiento('Retiro (Sobregiro)', monto);
                actualizarSaldo();
            } else {
                alert("No se pudo realizar el retiro.");
            }
        } else {
            alert("No se pudo realizar el retiro. Saldo insuficiente.");
        }
    }
});

document.getElementById('deposito').addEventListener('click', () => {
    const monto = parseFloat(prompt('Ingrese el monto a depositar:'));
    if (cuenta.realizarDeposito(monto)) {
        guardarSaldo();
        alert(`Depósito exitoso. Su nuevo saldo es: $${cuenta.saldo}`);
        registrarMovimiento('Depósito', monto);
        actualizarSaldo();
    } else {
        alert("No se pudo realizar el depósito. Verifique el monto.");
    }
});

document.getElementById('transfer').addEventListener('click', () => {
    const identificacionDestino = prompt('Ingrese el número de identificación del destinatario:');
    const monto = parseFloat(prompt('Ingrese el monto a transferir:'));
    realizarTransferencia(identificacionDestino, monto);
});

function realizarTransferencia(identificacionDestino, monto) {
    const cuentaDestinoData = localStorage.getItem(identificacionDestino);

    if (!cuentaDestinoData) {
        alert("No se encontró una cuenta asociada a esa identificación.");
        return;
    }

    const datosDestino = JSON.parse(cuentaDestinoData);
    const numeroCuentaDestino = datosDestino.cliente.cuentas[0].numeroCuenta;
    const saldoDestino = parseFloat(localStorage.getItem(`saldo_${numeroCuentaDestino}`)) || 0;

    if (cuenta.realizarRetiro(monto)) {
        // Actualizar saldo de la cuenta origen
        guardarSaldo();

        // Actualizar saldo de la cuenta destino
        const nuevoSaldoDestino = saldoDestino + monto;
        localStorage.setItem(`saldo_${numeroCuentaDestino}`, nuevoSaldoDestino);

        // Registrar movimientos
        registrarMovimiento('Transferencia enviada', monto);
        const movimientosDestino = JSON.parse(localStorage.getItem(`movimientos_${numeroCuentaDestino}`)) || [];
        movimientosDestino.unshift({
            fecha: new Date().toLocaleString(),
            tipo: 'Transferencia recibida',
            monto: monto
        });
        if (movimientosDestino.length > 10) movimientosDestino.pop();
        localStorage.setItem(`movimientos_${numeroCuentaDestino}`, JSON.stringify(movimientosDestino));

        actualizarSaldo();
        alert(`Transferencia exitosa. Su nuevo saldo es: $${cuenta.saldo}`);
    } else {
        alert("No se pudo realizar la transferencia. Saldo insuficiente.");
    }
}

// Función para mostrar el formulario de actualización de datos
function mostrarFormularioActualizarDatos() {
    document.getElementById('actualizarDatosForm').classList.remove('hidden');
}

// Función para actualizar los datos del usuario
function actualizarDatosUsuario(event) {
    event.preventDefault();
    
    const nuevaDireccion = document.getElementById('direccion').value;
    const nuevoTelefono = document.getElementById('telefono').value;
    const nuevoEmail = document.getElementById('email').value;

    // Actualizar los datos en el objeto DatosUsuarios
    DatosUsuarios.cliente.direccion = nuevaDireccion;
    DatosUsuarios.cliente.telefono = nuevoTelefono;
    DatosUsuarios.cliente.email = nuevoEmail;

    // Guardar los datos actualizados en localStorage
    localStorage.setItem(UsuarioId, JSON.stringify(DatosUsuarios));

    alert('Datos actualizados correctamente');
    document.getElementById('actualizarDatosForm').classList.add('hidden');
}

// Event listeners
document.getElementById('actualizarDatos').addEventListener('click', mostrarFormularioActualizarDatos);
document.getElementById('formActualizarDatos').addEventListener('submit', actualizarDatosUsuario);

// Función para cargar los datos actuales en el formulario
function cargarDatosActuales() {
    document.getElementById('direccion').value = DatosUsuarios.cliente.direccion || '';
    document.getElementById('telefono').value = DatosUsuarios.cliente.telefono || '';
    document.getElementById('email').value = DatosUsuarios.cliente.email || '';
}

// Llamar a esta función cuando se cargue la página
cargarDatosActuales();

document.getElementById('verMovimientos'). addEventListener('click', () => {
    mostrarMovimientos();
});