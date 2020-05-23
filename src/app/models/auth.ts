export enum IAuthMode {
  LOGIN,
  REGISTER,
}

export interface ILoginForm {
  email: string;
  password: string;
}

export enum EUserType {
  HELPER,
  AFFECTED,
  AUTHORITIES,
  THIRD_PARTY,
}
