import {
  Controller,
  Get,
  Request,
  Route,
  Tags,
  Query,
  SuccessResponse,
} from "tsoa";
import axios from "axios";
import express from "express";
import { HttpException, HttpSuccess } from "../../common/Helper/HttpResponse";
import { HttpResponseMessage } from "../../common/Constants/httpResponseMessage.enum";
import Funds from "./funds.model";
import { FundService } from "./funds.service";

@Tags("mutual-funds")
@Route("mfb/mutual-funds")
export class FundController extends Controller {
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Get("/fetch-funds")
  public async fetchAndStoreFunds(): Promise<HttpSuccess> {
    try {
      const existingFundsCount = await Funds.countDocuments({});
      if (existingFundsCount === 0) {
        const response = await axios.get(
          "https://latest-mutual-fund-nav.p.rapidapi.com/latest?Scheme_Type=Open",
          {
            headers: {
              "x-rapidapi-key": process.env.RAPIDAPI_KEY,
              "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
            },
          }
        );

        const funds = response.data;
        const bulkOps = funds.map((fund) => ({
          updateOne: {
            filter: { Scheme_Code: fund.Scheme_Code },
            update: { $set: fund },
            upsert: true,
          },
        }));
        await Funds.bulkWrite(bulkOps);
        await Funds.insertMany(funds, { ordered: false });
        return new HttpSuccess(
          HttpResponseMessage.FETCHED,
          "Funds fetched and stored successfully."
        );
      }
      return new HttpSuccess(
        HttpResponseMessage.FETCHED,
        `Funds data already exists. Found ${existingFundsCount} records.`
      );
    } catch (error) {
      throw new HttpException(500, error, "Failed to fetch and store funds.");
    }
  }
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Get("/get-paginated-funds")
  public async getPaginatedActionPlansForSupplier(
    @Query() pageNum,
    @Query() sort,
    @Query() limit
  ) {
    try {
      const data = await new FundService().getPaginatedFund(
        pageNum,
        sort,
        limit
      );
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
}
