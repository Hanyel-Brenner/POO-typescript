import { Bike } from "./bike";
import { User } from "./user";


export class Rent {
    public end:Date = undefined
    private constructor(
        public bike: Bike,
        public user: User,
        public start:Date,
    ) {}

    static create(rents: Rent[], bike: Bike, user: User, startDate: Date): Rent {

        const canCreate = Rent.canRent(bike)
        if (canCreate) return new Rent(bike, user, startDate)
        else return null
    }

    static canRent(bike:Bike): boolean {
        if(bike == null) return false
        if(bike.available) return true
        else return false
    }
}
