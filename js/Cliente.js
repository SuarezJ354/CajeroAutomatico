import Cuenta from "./Cuenta.js";
class Cliente{
    constructor(nombre, apellido, direccion, identificacion){
            this.nombre = nombre;
            this.apellido = apellido;
            this.direccion = direccion;
            this.numeroidentificacion = identificacion;
            this.cuentas = []; // Para almacenar cuentas
        }
        
    
    agregarCuenta(cuenta) {
        this.cuentas.push(cuenta);
    }
    /* mostrarCuentas() {
        if (this.cuentas.length === 0) {
            console.log("Este cliente no tiene cuentas.");
            return;
        }

        console.log(`Cuentas de ${this.nombre} ${this.apellido}:`);
        this.cuentas.forEach(cuenta => {
            console.log(`- Número de cuenta: ${cuenta.numeroCuenta}, Saldo: ${cuenta.saldo}`);
        });
    } */
    
    consultarSaldo() {
            // Implementar la lógica para consultar el saldo de todas las cuentas
        this.cuentas.forEach
    }
    conultarsaldo(){
        //Implementar la logica para consultar el saldo
        console.log(`El saldo del cliente ${this.nombre} ${this.apellido} es ${this.consultarSaldo} `);
    }
    realizardeposito(){
        //Implementar la logica para realizar un deposito
        console.log(`Se ha realizado un deposito de $500 al cliente ${this.nombre} ${this.apellido}.`);
    }
    realizarRetiro(){
        //Implementar la logica para realizar un retiro
        console.log(`Se ha realizado un retiro de $200 al cliente ${this.nombre} ${this.apellido}.`);
    }
}
export default Cliente;


    

   