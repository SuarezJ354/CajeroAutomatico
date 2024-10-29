import Cliente from "../js/Cliente.js";
import Cuenta from "../js/Cuenta.js";
import CuentaAhorro from "../js/CuentaAhorro.js";
import CuentaCorriente from "../js/CuentaCorriente.js";

// Intentos
let Intentos = 0;
const IntentosMaximos = 3;

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const identificacion = document.getElementById('identificacion').value;
    const contraseña = document.getElementById('password').value;
    const tipoCuenta = document.getElementById('accountType').value;

    // Verificar si el usuario existe
    const DatosGuardados = localStorage.getItem(identificacion);
    
    if (Intentos < IntentosMaximos) {
        if (DatosGuardados) {
            const DatosUsuarios = JSON.parse(DatosGuardados);
            if (DatosUsuarios.contraseña === contraseña) {
                // Verificar si el tipo de cuenta coincide con el registrado
                if (DatosUsuarios.tipoCuenta === tipoCuenta) {
                    alert('Inicio de sesión exitoso!');
                    sessionStorage.setItem('tipoCuenta', tipoCuenta);
                    sessionStorage.setItem('userId', identificacion);
                    if (tipoCuenta === 'corriente') {
                        window.location.href = './html/CuentaCorriente.html';
                    } else{
                        window.location.href = './html/CuentaAhorros.html';
                    };
                } else {
                    alert(`No tiene una cuenta ${tipoCuenta} registrada.`);
                }
            } else {
                Intentos++;
                alert(`Contraseña incorrecta. Intentos restantes: ${IntentosMaximos - Intentos}`);
                
                if (Intentos === IntentosMaximos) {
                    alert('Has alcanzado el número máximo de intentos. Tu cuenta está bloqueada temporalmente.');
                    document.getElementById('loginForm').reset();
                    document.getElementById('iniciar-sesion').disabled = true;
                }
            }
        } else {
            alert('Cuenta no encontrada:');
            Intentos++;
            if (Intentos === IntentosMaximos) {
                alert('Has alcanzado el número máximo de intentos.');
                document.getElementById('loginForm').reset();
                document.getElementById('iniciar-sesion').disabled = true;
            }
        }
    } else {
        alert('Tu cuenta está bloqueada. Por favor, intenta más tarde.');
    }
});
