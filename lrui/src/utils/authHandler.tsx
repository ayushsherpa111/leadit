import User from "src/interfaces/user";

export class Redditer implements User {
    username: string;
    password: string;
    email: string;
    constructor(_uname: string, _pwd: string, _email: string) {
        this.username = _uname;
        this.password = _pwd;
        this.email = _email;
    }

    public static isLoggedIn(): boolean {
        return false;
    }

    register() {
        // register user
    }

    async login(): Promise<Redditer> {
        // login user
        let user = new Redditer("Ayush", "SomePass", "ayush20100@hotmail.com");
        return user;
    }
}
