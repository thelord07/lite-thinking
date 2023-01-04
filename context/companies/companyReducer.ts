import { CompanyState } from "./";
import { ICompany } from "../../interfaces/companies";

type CompanyActionType =
  | { type: "[Company] - Add-Company"; payload: ICompany }
  | { type: "[Company] - Update-Company"; payload: ICompany }
  | { type: "[Company] - Refresh-Companies"; payload: ICompany[] };

export const CompanyReducer = (
  state: CompanyState,
  action: CompanyActionType
): CompanyState => {
  switch (action.type) {
    case "[Company] - Add-Company":
      return {
        ...state,
        companies:[...state.companies, action.payload]
      };
    case "[Company] - Update-Company":
      return {
        ...state,
        companies: state.companies.map( company => {
          if ( company._id === action.payload._id ) {
             company.name = action.payload.name;
             company.nit = action.payload.nit;
             company.direction = action.payload.direction;
             company.phone = action.payload.phone
          }
          return company;
        })
      };
      case "[Company] - Refresh-Companies":
        return {
            ...state,
            companies:[ action.payload ] 
        }
    default:
      return state;
  }
};
