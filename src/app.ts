import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'
import bcrypt from 'bcrypt'

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
        let hash:string = bcrypt.hash(user.password,13)
        user.password = hash.toString()
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
    
    rentBike(bikeId:string,email:string,startDate:Date,endDate:Date):void{
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
        let newRent = Rent.create(rentArr,bike,user,startDate,endDate);
        //adicionar a reserva ao array de reservas
        this.rents.push(newRent)
    }
    
    returnBike(bikeId:string,email:string):string{
        let bike = this.findBike(bikeId)
        let user = this.findBike(email)
        let k = this.rents.find(rent => (rent.bike.id == bikeId && rent.user.email == email))
        k.dateReturned = new Date();
        return bike.id
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

    userAuthentication(userId:string,password:string):boolean{
        let user:User = this.users.find(u => u.id == userId && bcrypt.compare(password, u.password));
        if(user!=null) return true  //user authenticated?
        return false
    }
}

