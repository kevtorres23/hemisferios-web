class ContactMessage {
    // Defining the class initializers.
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    message: string;

    // Defining the constructor.
    constructor(name: string, lastName: string, phoneNumber: string, email: string, message: string) {
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.message = message;
    }

    displayVideogame() {
        console.log(this.name, this.lastName, this.phoneNumber, this.email, this.message);
    }
}

export {ContactMessage};