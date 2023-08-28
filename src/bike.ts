import { Reserva } from "./reserva";

export class Bike{
    valorAluguel:number;  //preco diario
    disponivel:boolean;

    constructor(valor:number){
        this.valorAluguel = valor;
        this.disponivel = true;
    }
}