import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    private constructor(
        public bike: Bike,
        public user: User,
        public dateFrom: Date,
        public dateTo: Date,
        public dateReturned?: Date
    ) {}

    static create(rents: Rent[], bike: Bike, user: User, 
                  startDate: Date, endDate: Date): Rent {
        const canCreate = Rent.canRent(rents, startDate, endDate)
        if (canCreate) return new Rent(bike, user, startDate, endDate)
        //throw new Error('Overlapping dates.')
    }

    static canRent(rents: Rent[], startDate: Date, endDate: Date): boolean {

        if(rents ==  undefined) { return true}

        let j:number = 0;
        for(let i:Rent = rents[j]; i!=undefined && i!= null; i = rents[j++]){
            if(startDate <= i.dateTo && endDate >= i.dateFrom){
                return false
            }   
                return true
    }
}
}
