export class RentNotFound extends Error {
    public readonly name = "RentNotFound"

    constructor() {
        super('Rent Not Found')
    }
}