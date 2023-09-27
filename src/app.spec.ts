import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { UserNotFoundError } from "./errors/user-not-found-error"
import { BikeNotFoundError } from "./errors/bike-not-found-error"
import { DuplicateUserError } from "./errors/duplicate-user-error"
import { isReadonlyKeywordOrPlusOrMinusToken } from "typescript"
import { UserDoesNotExistError } from "./errors/user-does-not-exist"

describe('App', () => {
    ///////TODO put local variables that are repeated throught the unit tests in this scope in order to avoid 
    //declaring new variables for each 'it'
    const user3:User = new User('maria','maria@mail.com','341')

    it('should throw exception when trying to find  an unregistered user',() => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        app.users.push(user)
        let foundUser = app.findUser('jose@mail.com')
        expect(foundUser).toEqual(user) 
        expect(() => {app.findUser('innit@mail.com')}).toThrow(UserNotFoundError)
    })
    it('should throw exception when trying to find  an unregistered bike',() => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        let foundBike = app.findBike(bike.id)
        expect(foundBike).toEqual(bike)
        expect(() => {app.findBike('123')}).toThrow(BikeNotFoundError)
    })

    /*it('should throw exception when trying to register user with an already used email(duplicate)',async() => {
        let app2 = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        const user2 = new User('Leandro','jose@mail.com','123')
        await app2.registerUser(user)
        expect(() => {app2.registerUser(user2)}).toThrow(DuplicateUserError) 
    })*/

    it('should throw an exception whent trying to rent an unavailable bike', async()=> {
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

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        const newYork = new Location(40.753056, -73.983056)
        expect( () => app.moveBikeTo(bike.id,newYork)).toThrow(BikeNotFoundError)
    })

    it('should correctly authenticate user',async() => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        let password:string = '1234'
        let authbool = await app.authenticate('jose@mail.com','1234')
        expect(authbool).toEqual(true)
    })

    it('should correctly remove user',async() => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        let foundUser = app.findUser('jose@mail.com')
        expect(foundUser).toEqual(user)
        app.removeUser('jose@mail.com')
        expect(() => {app.findUser('jose@mail.com')}).toThrow(UserNotFoundError)
    })

    it('should correctly remove bike',async() => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
        await app.registerBike(bike)
        let foundBike = app.findBike(bike.id)
        expect(foundBike).toEqual(bike)
        app.removeBike(bike.id)
        expect(() => {app.findBike(bike.id)}).toThrow(BikeNotFoundError)
    })
})
