import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

//register bike*
//remove bike*
//rent bike
//return bike

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    registerBike(bike:Bike):string{
       bike.id = crypto.randomUUID()
       this.bikes.push(bike)
       return bike.id
    }

    findBike(bikeId:string):Bike{
        return this.bikes.find(bike => bike.id == bikeId)
    }
    removeBike(bikeId:string): void{
        const index:number = this.bikes.indexOf(this.findBike(bikeId))
        if(index>-1) this.bikes.splice(index,1) 
        else throw new Error('Bike not found')
    }
    
    rentBike(bikeId:string,Email:string,startDate:Date,endDate:Date){
        //recuperar a bike
        //recuperar o usuario
        //array somente com as reservas para a bike
        //tentar criar a rent com o array e as informaçoes de reserva
        //adicioar a reserva ao array de reservas
    }
    
}


