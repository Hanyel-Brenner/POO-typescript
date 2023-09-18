import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import {Crypt} from "./crypt";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import axios from 'axios'
//register bike*
//remove bike*
//rent bike
//return bike

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt:Crypt = new Crypt()

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    async registerUser(user: User): Promise<string> {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        user.password = await this.crypt.encrypt(user.password)
        this.users.push(user)
        return user.id
    }

    findBike(bikeId:string):Bike{
        return this.bikes.find(bike => bike.id == bikeId)
    }

    registerBike(bike:Bike):string{
       bike.id = crypto.randomUUID()
       this.bikes.push(bike)
       return bike.id
    }
    removeBike(bikeId:string): void{
        const index:number = this.bikes.indexOf(this.findBike(bikeId))
        if(index>-1) this.bikes.splice(index,1) 
        else throw new Error('Bike not found')
    }
    
    rentBike(bikeId:string,email:string,startDate:Date):void{
        //recuperar a bike
        let bike = this.findBike(bikeId); 
        //recuperar o usuario
        let user = this.findUser(email);
        //array somente com as reservas para a bike
        let rentArr:Rent[]
        for(let j:number=0; j<this.rents.length; j++){
            if(this.rents[j].bike.id ==bikeId){
                rentArr.push(this.rents[j])
            }
        }
        //tentar criar a rent com o array e as informaçoes de reserva
        let newRent = Rent.create(rentArr,bike,user,startDate);
        //adicionar a reserva ao array de reservas
        
        if(newRent != null) {
            this.rents.push(newRent)
            bike.available = false
        }
        else throw new Error('Impossible to rent this bike')
    }
    
    returnBike(bikeId:string, email:string):number{
        let bike = this.findBike(bikeId)
        let user = this.findUser(email)
        let k = this.rents.find(rent => (rent.bike.id == bikeId && rent.user.email == email))
        k.end = new Date();
        k.bike.available = true
        let rentTime = k.end.getTime() - k.start.getTime()  //difference in milliseconds between each date
        let hours = Math.abs(rentTime/(1000*60*60))
        return hours*k.bike.rate
    }

     listUsers():void{
        for(let i:number =0; i<this.users.length; i++){
            if(this.users[i] != null)
            console.log(this.users[i]);
        }
    }

     listRents(){
        for(let i:number =0; i<this.rents.length; i++){
            if(this.rents[i] != null)
            console.log(this.rents[i]);
        }
    }
    listBikes(){
        for(let i:number =0; i<this.bikes.length; i++){
            if(this.bikes[i] != null)
            console.log(this.bikes[i]);
        }
    }

    
    async authenticate(userEmail: string, password: string): Promise<boolean> {
        const user = this.findUser(userEmail)
        if (!user) throw new Error('User not found.')
            return await this.crypt.compare(password, user.password)
        }
    
}
