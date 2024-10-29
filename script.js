class Cajero {
    constructor() {
        this.usuario = "1066";
        this.contraseña = "1066";
        this.saldo = 1000;
    }

    iniciarSesion(usuario, contraseña) {
        if (usuario === this.usuario && contraseña === this.contraseña) {
            return true;
        } else {
            return false;
        }
    }

    depositar(monto) {
        this.saldo += monto;
        return true;
    }

    retirar(monto) {
        if (monto > this.saldo) {
            return false;
        } else {
            this.saldo -= monto;
            return true;
        }
    }
}

const cajero = new Cajero();

document.getElementById("iniciar-sesion").addEventListener("click", () => {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    if (cajero.iniciarSesion(usuario, contraseña)) {
        console.log("Sesión iniciada correctamente");
        // Mostrar un mensaje de bienvenida
        document.getElementById("mensaje-bienvenida").innerHTML = "Bienvenido, " + usuario;
        // Mostrar un botón para acceder a la siguiente pantalla
        document.getElementById("boton-siguiente").style.display = "block";
    } else {
        console.log("Usuario o contraseña incorrectos");
        // Mostrar un mensaje de error
        document.getElementById("mensaje-error").innerHTML = "Usuario o contraseña incorrectos";
    }
});

document.getElementById("depositar").addEventListener("click", () => {
    const monto = parseInt(document.getElementById("monto").value);
    if (cajero.depositar(monto)) {
        console.log("Depósito realizado correctamente");
    } else {
        console.log("Error al depositar");
    }
});

document.getElementById("retirar").addEventListener("click", () => {
    const monto = parseInt(document.getElementById("monto").value);
    if (cajero.retirar(monto)) {
        console.log("Retiro realizado correctamente");
    } else {
        console.log("Error al retirar");
    }
});