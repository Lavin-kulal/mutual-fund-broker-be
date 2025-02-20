import { Document, Model, Types } from "mongoose";
export interface ISchemeUnits {
  schemeId: Types.ObjectId;
  units: number;
}

export interface IInvestmentHistory {
  timestamp: Date;
  investmentValue: number;
  schemeDetails: Array<{
    schemeId: Types.ObjectId;
    schemeName: string;
    nav: number;
    units: number;
    currentValue: number;
  }>;
}
interface IClientSchema extends Document {
  email: string;
  password: string;
  schemes: string[];
  schemeUnits: Map<string, number>;
  investmentHistory: IInvestmentHistory[];
}
//instance methods, virtuals
interface IClientBase extends IClientSchema {}

// document with string reference
export interface IClient extends IClientBase {}

// document with reference populated
export interface IClientPopulated extends IClient {}
export interface IClientModel extends Model<IClient> {
  addClient(clientData);
  getOneClientInfo(matchQuery: object, selectQuery: object);
  generateAuthToken(userData);
  updateClient(matchQuery, modifiedData);
}

export interface IClientData {
  email: string;
  password: string;
}
export interface IportfolioData {
  schemeId: string;
}
