import { Schema, model } from "mongoose";
import { IFunds, IFundsModel } from "./funds.interface";

export const FundSchema = new Schema(
  {
    Scheme_Code: { type: Number, required: true },
    ISIN_Div_Payout_ISIN_Growth: { type: String, required: true },
    ISIN_Div_Reinvestment: { type: String, required: true },
    Scheme_Name: { type: String, required: true },
    Net_Asset_Value: { type: Number, required: true },
    Date: { type: Date, required: true },
    Scheme_Type: { type: String, required: true },
    Scheme_Category: { type: String, required: true },
    Mutual_Fund_Family: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);
FundSchema.index({ Scheme_Code: 1 });
FundSchema.statics = {
  addFunds: async (funds) => {
    try {
      const fundsDoc = await Funds.insertMany(funds);
      return fundsDoc;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getTotalFundCount: async function (matchQuery: {}) {
    const response = await this.countDocuments(matchQuery);
    return response;
  },
  getFundDataByPagination: async function (pageNum, limit, sort) {
    try {
      const paginatedData = await this.find({})
        .sort({ _id: sort })
        .skip(pageNum * limit)
        .limit(limit);
      return paginatedData;
    } catch (error) {
      throw error;
    }
  },
};
const Funds = model<IFunds, IFundsModel>("Funds", FundSchema);
export default Funds;
