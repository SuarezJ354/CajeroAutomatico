class Cuenta {
    constructor(numeroCuenta, saldo = 0) {
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldo;
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
        if (monto > 0 && monto <= this.saldo) {
            this.saldo -= monto;
            return true;
        }
        return false;
    }
}
export default Cuenta;