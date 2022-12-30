export interface ICompany {
  _id: string,
  name: string
  direction: string
  nit: string
  phone: number
  usersIds: string[]
  posts?: string[]
}
