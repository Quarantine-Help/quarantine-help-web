export enum IAuthMode {
  LOGIN,
  REGISTER,
}

export interface ILoginForm {
  email: string;
  password: string;
}

export enum EUserType {
  HL,
  AF,
}

export interface Participant {
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
  crisis: string;
}
