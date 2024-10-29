import Cuenta from "../js/Cuenta.js";

class CuentaAhorro extends Cuenta {
    constructor(numerodecuenta, saldo = 0) {
        super(numerodecuenta, saldo);
    }

    consultarSaldo() {
        return this.saldo;
    }

    realizarDeposito(monto) {
        if (monto > 0) {
            this.saldo += monto;
            return true;
        }
        return false;
    }

    realizarRetiro(monto) {
        if (monto > 0 && this.saldo >= monto) {
            this.saldo -= monto;
            return true;
        }
        return false;
    }

    consultarMovimientos() {
        return `Los últimos movimientos de la cuenta ${this.numerodecuenta} son: depositos y retiros`;
    }
}
export default CuentaAhorro;