import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import {Crypt} from "./crypt";
import {Location} from './location'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { UserNotFoundError } from "./errors/user-not-found-error";
import { DuplicateUserError } from "./errors/duplicate-user-error";
import { BikeNotFoundError } from "./errors/bike-not-found-error";
import { UnavailableBikeError } from "./errors/unavailable-bike-error";
import { RentNotFound } from "./errors/rent-not-found";

//var crypto = require('crypto')
export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt:Crypt = new Crypt()

    findUser(email: string): User {
        let user =  this.users.find(user => user.email === email)
        if(user == null){
            throw new UserNotFoundError()
        }
        return user
    }

    async registerUser(user: User): Promise<string> {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new DuplicateUserError()
            }
        }
        user.id = crypto.randomUUID()
        user.password = await this.crypt.encrypt(user.password)
        this.users.push(user)
        return user.id
    }

    findBike(bikeId: string): Bike {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) throw new BikeNotFoundError()
        return bike
    }

    registerBike(bike:Bike):string{
       bike.id = crypto.randomUUID()
       this.bikes.push(bike)
       return bike.id
    }
    removeBike(bikeId:string): void{
        const index:number = this.bikes.indexOf(this.findBike(bikeId))
        if(index>-1) this.bikes.splice(index,1) 
        else throw new BikeNotFoundError()
    }
    
    rentBike(bikeId:string,email:string,startDate:Date):void{
        const bike = this.findBike(bikeId)
        if (!bike.available) {
            throw new UnavailableBikeError()
        }
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
        this.rents.push(newRent)
        bike.available = false
    }
    
    returnBike(bikeId:string, email:string):number{
        let bike = this.findBike(bikeId)
        let user = this.findUser(email)
        let k = this.rents.find(rent => (rent.bike.id == bikeId && rent.user.email == email))
        if(k == null) throw new RentNotFound()
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
        if (!user) throw new UserNotFoundError()
            return await this.crypt.compare(password, user.password)
        }
        
    moveBikeTo(bikeId: string, location: Location):void {
            const bike = this.findBike(bikeId)
            bike.location.latitude = location.latitude
            bike.location.longitude = location.longitude
    }
}
