export class Employee {
    constructor(public id: number, public name: string, public gender: string, public contactPreference: string,
        public dateOfBirth: Date, public isActive: boolean, public department: string,
        public phoneNumber?: number, public email?: string, public photoPath?: string) {

    }
}
