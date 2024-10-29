import Cuenta from "./Cuenta.js";

class CuentaCorriente extends Cuenta {
    constructor(numerodecuenta, saldo = 0, limiteSobregiro = 500000) {
        super(numerodecuenta, saldo);
        this.limiteSobregiro = limiteSobregiro;
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

    sobregiro(monto) {
        if (monto > 0 && (this.saldo - monto) >= -this.limiteSobregiro) {
            this.saldo -= monto;
            return true;
        }
        return false;
    }

    consultarMovimientos() {
        return `Los últimos movimientos de la cuenta ${this.numerodecuenta} son: depositos y retiros`;
    }
}

export default CuentaCorriente;