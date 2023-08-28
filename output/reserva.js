"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
class Reserva {
    Reservar(cliente, bike, dataInicio, dataFim) {
        this.cliente = cliente;
        this.bike = bike;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }
    CalcularCusto() {
        let fim = this.dataFim.getTime();
        let inicio = this.dataInicio.getTime();
        let dias = ((fim - inicio) / (3600 * 24 * 1000));
        let valor = this.bike.valorAluguel;
        let result = valor * dias;
        return result; //retorna o preco que o cliente deve pagar para o aluguel da bike
    }
}
exports.Reserva = Reserva;
/*O objetivo é transformar a data final no valor de milisegundos desde a primeira data (em 1970)
        e subtrair dela a data inicial. O resultado em milisegundos deve ser convertido para dias, e então a partir dos dias,
        temos que calcular o custo final da bike
        */ 
