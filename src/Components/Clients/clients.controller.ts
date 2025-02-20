import {
  Body,
  Controller,
  Request,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Get,
  Query,
  Put,
} from "tsoa";
import express from "express";
import { HttpResponseMessage } from "../../common/Constants/httpResponseMessage.enum";
import { HttpException, HttpSuccess } from "../../common/Helper/HttpResponse";
import { IClient, IClientData, IportfolioData } from "./cleints.interface";
import { ClientService } from "./clients.service";

@Tags("clients")
@Route("mfb/client")
export class ClientController extends Controller {
  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post("/sign-up")
  public async createClient(
    @Request() req: express.Request,
    @Body() clientData: IClientData
  ) {
    try {
      const doc = await new ClientService().addClients(clientData, req);
      return new HttpSuccess(HttpResponseMessage.CREATED, doc);
    } catch (error) {
      let err: any = error;
      if (err.message === "Client already signed up with this email ID") {
        throw new HttpException(409, err, err.message);
      } else {
        throw new HttpException(400, err, err?.message);
      }
    }
  }
  @SuccessResponse("200", HttpResponseMessage.FETCHED)
  @Get("auth/check")
  public async validateAuthenticationCheck(@Request() req: any) {
    try {
      if (req.user) {
        return new HttpSuccess(HttpResponseMessage.FETCHED, {
          userInfo: {
            _id: req.user._id,
            email: req.user.email,
          },
        });
      } else {
        return new HttpSuccess(HttpResponseMessage.FETCHED, null);
      }
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post("/auth")
  public async authenticateUser(
    @Request() req: express.Request,
    @Body() userData
  ) {
    try {
      const userInfo = await new ClientService().authenticateUser(
        userData,
        req
      );
      return new HttpSuccess(HttpResponseMessage.CREATED, userInfo);
    } catch (error: any) {
      console.log(error);
      throw new HttpException(400, error, error?.message);
    }
  }
  @SuccessResponse(200, HttpResponseMessage.FETCHED)
  @Post("/logout")
  public async logoutUser(@Request() req: express.Request) {
    try {
      const cookieOptions = {
        httpOnly: true,
        expires: new Date(0),
      };

      req.res.cookie("authToken", "", cookieOptions);
      req.res.clearCookie("authToken");

      return new HttpSuccess(HttpResponseMessage.FETCHED, {
        message: "Logged out successfully",
      });
    } catch (error: any) {
      console.log(error);
      throw new HttpException(400, error, error?.message);
    }
  }
  @SuccessResponse(201, HttpResponseMessage.CREATED)
  @Post("/add-scheme-portfolio")
  public async addSchemePortfolio(
    @Request() req: express.Request,
    @Body() data
  ) {
    try {
      const userInfo = await new ClientService().addPortfolio(data);
      return new HttpSuccess(HttpResponseMessage.CREATED, userInfo);
    } catch (error: any) {
      console.log(error);
      throw new HttpException(400, error, error?.message);
    }
  }
  @Get("/get-portfolio")
  public async getPortfolio(@Query() clientId) {
    try {
      const data = await new ClientService().getClientPortfolio(clientId);
      return new HttpSuccess(HttpResponseMessage.FETCHED, data);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
}
