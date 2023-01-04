import { IUser } from './';
export interface ICompany {
  _id?: string,
  user?: IUser | string;
  name: string
  direction: string
  nit: string
  phone: number
}
