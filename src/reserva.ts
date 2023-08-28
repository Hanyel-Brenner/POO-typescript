import  {Bike} from"./bike"
import {Cliente} from "./cliente"

export class Reserva{
    cliente!:Cliente;
    bike!:Bike;
    dataInicio!:Date;
    dataFim!:Date;

    Reservar(cliente:Cliente,bike:Bike,dataInicio:Date,dataFim:Date):boolean{
        if(bike.disponivel == true){
            this.cliente = cliente;
            this.bike = bike;
            this.dataInicio = dataInicio;
            this.dataFim = dataFim;
            this.bike.disponivel = false;
            return true;
        }
        else return false;
    }
    CalcularCusto():number{
        let fim:number = this.dataFim.getTime();
        let inicio:number = this.dataInicio.getTime();
        let dias:number = ((fim - inicio)/(3600*24*1000));
        let valor = this.bike.valorAluguel;
        let result:number = valor*dias;
        return result;  //retorna o preco que o cliente deve pagar para o aluguel da bike
    }
}
