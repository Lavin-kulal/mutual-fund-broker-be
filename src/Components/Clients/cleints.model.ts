import { Schema, model } from "mongoose";
import { IClient, IClientModel } from "./cleints.interface";
import jwt from "jsonwebtoken";

export const ClientSchema = new Schema(
  {
    email: {
      type: String,
      required: "Email is required",
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 255,
    },
    schemes: [{ type: Schema.Types.ObjectId, ref: "Fund" }],
    schemeUnits: {
      type: Map,
      of: Number,
      default: {},
    },
    investmentHistory: [
      {
        timestamp: { type: Date, default: Date.now },
        investmentValue: Number,
        schemeDetails: [
          {
            schemeId: { type: Schema.Types.ObjectId, ref: "Fund" },
            schemeName: String,
            nav: Number,
            units: Number,
            currentValue: Number,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
);
ClientSchema.index(
  { email: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);
ClientSchema.statics = {
  generateAuthToken: async function (userData) {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const jwtToken = await jwt.sign(
      {
        _id: userData._id,
        email: userData.email,
        schemeId: userData.schemeId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION || "24h",
        algorithm: "HS256",
      }
    );
    return jwtToken;
  },
  addClient: async (userData) => {
    try {
      const clientDoc = new Client(userData);
      const doc = await clientDoc.save();
      return doc;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getClientsByQuery: async function (matchQuery) {
    try {
      const assignedClients = await this.find(matchQuery);
      return assignedClients;
    } catch (err) {
      throw err;
    }
  },
  getClientInfoById: async function (clientId) {
    try {
      const clientDoc = await this.findById(clientId).select("-password");
      return clientDoc;
    } catch (err) {
      throw err;
    }
  },
  getOneClientInfo: async function (matchQuery = {}, selectQuery = {}) {
    try {
      const clientDoc = await this.findOne(matchQuery).select(selectQuery);

      return clientDoc;
    } catch (err) {
      throw err;
    }
  },
  updateClient: async function (matchQuery, modifiedData) {
    try {
      const updatedDoc = await this.findByIdAndUpdate(
        matchQuery,
        { $set: modifiedData },
        {
          new: true,
        }
      );
      return updatedDoc;
    } catch (error) {
      throw error;
    }
  },
};

const Client = model<IClient, IClientModel>("Client", ClientSchema);
export default Client;
