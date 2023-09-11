import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import bcrypt from 'bcrypt'
const bike = new Bike('mountain bike', 'mountain', 
    123, 500, 100.5, 'desc', 5, [])
const user = new User('Maria', 'maria@gmail.com', '1234')
const today = new Date()
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const sevenDaysFromToday = new Date()
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)
const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)
const user2 = new User('Maria Clara', 'maria@mail.com', '3123')

const app = new App()
app.registerUser(user)
//let id:string = app.registerBike(bike)
app.rentBike(app.registerBike(bike),"maria@gmail.com",today,sevenDaysFromToday)
console.log(app.findUser('maria@gmail.com'))
console.log(app.rents)
app.returnBike(bike.id,user.email)
console.log(app.rents)
app.listUsers();
app.listRents();
app.listBikes();

console.log("verify user authentication:");

console.log(app.userAuthentication(app.users[0].id, '3123'))
