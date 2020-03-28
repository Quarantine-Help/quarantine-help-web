export enum IAuthMode {
    LOGIN,
    REGISTER
}

export interface ILoginForm {
    email: string;
    password: string;
}