import Cliente from "../js/Cliente.js"
import Cuenta from "../js/Cuenta.js"
import CuentaAhorro from "../js/CuentaAhorro.js"
import CuentaCorriente from "../js/CuentaCorriente.js"

// Variables
let cuenta;

document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault()

    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const direccion = document.getElementById('direccion').value
    const identificacion = document.getElementById('identificacion').value
    const contraseña = document.getElementById('password').value
    const tipoCuenta = document.getElementById('tipoCuenta').value
    
    const UsuarioExistente = localStorage.getItem(identificacion)
    const datosUsuario = JSON.parse(UsuarioExistente)

    if (UsuarioExistente) {
        if (datosUsuario.tipoCuenta === tipoCuenta) {
            alert('Ya tienes una cuenta de este tipo registrada.')
            return
        } else {
            alert('Ya tienes una cuenta registrada con otra modalidad.')
            return
        }
    }

    const cliente = new Cliente(nombre, apellido, direccion, identificacion)

    function NumeroCuenta(tipoCuenta) {
        const numeroAleatorio = Math.floor(Math.random() * 10000)
        
        if (tipoCuenta === "corriente") {
            return "CC" + numeroAleatorio
        } else {
            return "CA" + numeroAleatorio
        }
    }

    const numeroCuenta = NumeroCuenta(tipoCuenta);

    if (tipoCuenta === "corriente") {
        cuenta = new CuentaCorriente(numeroCuenta, 0, 500000); // Límite de sobregiro
    } else if (tipoCuenta === "ahorros") {
        cuenta = new CuentaAhorro(numeroCuenta, 0);
    }

    // Agregar la cuenta al cliente
    if (cuenta) {
        cliente.agregarCuenta(cuenta);
        console.log("Cliente registrado:", cliente);
        console.log("Cuenta creada:", cuenta);

        // Guardar en localStorage
        const datosGuardar = {
            cliente: cliente,
            contraseña: contraseña,
            tipoCuenta: tipoCuenta
        }

        localStorage.setItem(identificacion, JSON.stringify(datosGuardar));

        document.getElementById('registro').innerHTML = "Registro exitoso! Este es su numero de cuenta : " + numeroCuenta 
        + " Recuerdelo para tranferencias"
    }
});