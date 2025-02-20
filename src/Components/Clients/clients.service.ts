import { IClientData } from "./cleints.interface";
import Client from "./cleints.model";
import bcrypt from "bcrypt";
import {
  encryptPayload,
  decryptPayload,
} from "../../common/Helper/cryptoHelper";
import Funds from "../Funds/funds.model";

export class ClientService {
  async addClients(clientData: IClientData, req) {
    // Check if the client already exists
    const existingClient = await Client.findOne({ email: clientData.email });
    if (existingClient) {
      throw new Error("Client already signed up with this email ID");
    }
    const hashedPassword = await bcrypt.hash(clientData.password, 10);
    clientData.password = hashedPassword;
    const client = await Client.addClient(clientData);
    const jwtToken = await Client.generateAuthToken(client);
    const encryptedToken = encryptPayload(jwtToken);
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    req.res.cookie("authToken", encryptedToken, cookieOptions);
    return client;
  }

  async getOneClientInfo(matchQuery, selectQuery = {}) {
    return await Client.getOneClientInfo(matchQuery, selectQuery);
  }

  async authenticateUser(userData, req) {
    const matchQuery = { email: userData.email };
    const selectQuery = { password: 1, email: 1, schemeId: 1 };
    const userInfo = await this.getOneClientInfo(matchQuery, selectQuery);
    if (!userInfo) {
      throw new Error("Invalid email or password");
    }
    const match = await bcrypt.compare(userData.password, userInfo.password);
    if (!match) {
      throw new Error("Invalid email or password");
    }
    const jwtToken = await Client.generateAuthToken(userInfo);
    const encryptedToken = encryptPayload(jwtToken);
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    if (!userInfo?.schemeId) {
      userInfo.schemeId = null;
    }
    req.res.cookie("authToken", encryptedToken, cookieOptions);
    return {
      _id: userInfo._id,
      email: userInfo.email,
    };
  }
  async addPortfolio(schemeData: { schemeId: string; clientId: string }) {
    try {
      const client = await Client.findById(schemeData.clientId);
      if (!client) {
        throw new Error("Client not found");
      }
      if (!client.schemes.includes(schemeData.schemeId)) {
        client.schemes.push(schemeData.schemeId);
      }
      const currentUnits = client.schemeUnits.get(schemeData.schemeId) || 0;
      client.schemeUnits.set(schemeData.schemeId, currentUnits + 1);
      await client.save();
      return client;
    } catch (error) {
      throw error;
    }
  }
  async updateAllPortfolios() {
    try {
      const clients = await Client.find({});

      for (const client of clients) {
        if (!client.schemes || client.schemes.length === 0) continue;

        const funds = await Funds.find({
          _id: { $in: client.schemes },
        });
        let totalValue = 0;
        const schemeDetails = [];
        for (const fund of funds) {
          const units = client.schemeUnits.get(fund._id.toString()) || 0;
          if (units <= 0) continue;
          const currentValue = fund.Net_Asset_Value * units;
          totalValue += currentValue;
          schemeDetails.push({
            schemeId: fund._id,
            schemeName: fund.Scheme_Name,
            nav: fund.Net_Asset_Value,
            units,
            currentValue,
          });
        }
        if (schemeDetails.length > 0) {
          client.investmentHistory.push({
            timestamp: new Date(),
            investmentValue: totalValue,
            schemeDetails,
          });
          await client.save();
        }
      }
      console.log(`Updated portfolio values at ${new Date().toISOString()}`);
    } catch (error) {
      console.error("Error updating portfolios:", error);
      throw error;
    }
  }

  async getClientPortfolio(clientId) {
    try {
      const client = await Client.findById(clientId);
      if (!client) throw new Error("Client not found");
      const funds = await Funds.find({
        _id: { $in: client.schemes },
      });
      let totalValue = 0;
      const holdings = [];
      for (const fund of funds) {
        const units = client.schemeUnits.get(fund._id.toString()) || 0;
        if (units <= 0) continue;
        const currentValue = fund.Net_Asset_Value * units;
        totalValue += currentValue;
        holdings.push({
          schemeId: fund._id,
          schemeName: fund.Scheme_Name,
          schemeCategory: fund.Scheme_Category,
          fundFamily: fund.Mutual_Fund_Family,
          nav: fund.Net_Asset_Value,
          units,
          currentValue,
        });
      }
      return {
        totalValue,
        lastUpdated: new Date(),
        holdings,
      };
    } catch (error) {
      console.error("Error getting client portfolio:", error);
      throw error;
    }
  }
}
