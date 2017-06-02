export class AuthService{

    token: string;

    setToken(token: string){
        this.token = token;
    }
}