export enum IAuthMode {
  LOGIN,
  REGISTER
}

export interface ILoginForm {
  email: string;
  password: string;
}

export enum EUserType {
  HELPER,
  AFFECTED,
  AUTHORITIES,
  THIRD_PARTY
}

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  position: any;
  type: EUserType;
  firstAddress: string;
  secondAddress?: string;
  country: string;
  placeId?: string;
  postcode: number;
  city: string;
  phone: number;
  is_available: boolean;
  crisis: string;
  abilities: any;
}
