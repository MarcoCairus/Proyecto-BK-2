export class UserDTO {
    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.age = user.age;
        this.email = user.email;
        this.role = user.role
    }
}
