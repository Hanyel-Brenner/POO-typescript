import {Bike} from "./bike"
import { Cliente } from "./cliente";
import { Reserva } from "./reserva";


let bike:Bike = new Bike(10);
let cliente:Cliente = new Cliente("Hanyel");
let reserva = new Reserva();
reserva.Reservar(cliente,bike,new Date(2023,12,12), new Date(2023,12,14));
let dias:number = reserva.CalcularCusto();
console.log(typeof(dias));
console.log(reserva.bike.valorAluguel);