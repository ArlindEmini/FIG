import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";

import { fetchAllQrCodes, insertQrCode } from "../database/queries.js";
import { database } from "../database/connection.js";

export default class ConfigService {
  static fetchAll = async () => {
    const qrCodes = await database.query(fetchAllQrCodes, {
      type: QueryTypes.SELECT,
    });

    const qrCodesArray = qrCodes[0].qr_codes.split(",");

    return qrCodesArray;
  };

  static createQrCodes = async (body) => {
    const { qr_codes } = body;

    return await database.query(insertQrCode, {
      replacements: {
        qr_codes,
      },
      type: QueryTypes.INSERT,
    });
  };
}
