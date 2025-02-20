import { Document, Model } from "mongoose";
interface IFundsSchema extends Document {
  Scheme_Code: number;
  ISIN_Div_Payout_ISIN_Growth: string;
  ISIN_Div_Reinvestment: string;
  Scheme_Name: string;
  Net_Asset_Value: number;
  Date: Date;
  Scheme_Type: string;
  Scheme_Category: string;
  Mutual_Fund_Family: string;
}
//instance methods, virtuals
interface IFundsBase extends IFundsSchema {}
// document with string reference
export interface IFunds extends IFundsBase {}
// document with reference populated
export interface IFundsPopulated extends IFunds {}
export interface IFundsModel extends Model<IFunds> {
  getTotalFundCount(matchQuery);
  getFundDataByPagination(pageNum, sort, limit): Promise<Array<IFunds>>;
}
