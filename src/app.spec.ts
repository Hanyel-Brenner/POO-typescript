import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { UserNotFoundError } from "./errors/user-not-found-error"
import { BikeNotFoundError } from "./errors/bike-not-found-error"

describe('App', () => {
    it('should throw exception when trying to find  an unregistered user',() => {
        const app = new App()
        expect(() => {app.findUser('innit@mail.com')}).toThrow(UserNotFoundError)
    })
    it('should throw exception when trying to find  an unregistered bike',() => {
        const app = new App()
        expect(() => {app.findBike('123')}).toThrow(BikeNotFoundError)
    })

    it('should throw an exception whent trying to rent an unaveilable bike', async()=> {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id,user.email,new Date())

    })

    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id,user.email,new Date())
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

   /* it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const newYork = new Location(40.753056, -73.983056)
        let t = app.moveBikeTo(bike.id,newYork)
        expect( () => app.moveBikeTo(bike.id,newYork)).toThrow(BikeNotFoundError)
    })*/


})
