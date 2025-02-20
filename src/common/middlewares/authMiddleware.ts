import { decryptPayload } from "../../common/Helper/cryptoHelper";
import jwt from "jsonwebtoken"; // Make sure this is imported

export const verifyAuthToken = (req, res, next) => {
  try {
    const encryptedToken = req.cookies["authToken"];
    if (!encryptedToken) {
      req.user = null;
      return next();
    }
    const decrypted = decryptPayload(encryptedToken);
    const userData = jwt.verify(decrypted, process.env.JWT_SECRET);
    req.user = userData;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};
