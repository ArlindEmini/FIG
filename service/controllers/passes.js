import { QueryTypes } from "sequelize";

import {
  passCheckIn,
  passCheckOut,
  passConfirm,
  getPassById,
  fetchAllPasses,
  deletePass,
  passCheckInBAU,
  fetchAllReportsPasses,
} from "../database/queries.js";
import { database } from "../database/connection.js";
import { getDate } from "../utils/utils.js";

export default class PassService {
  static get = async (id) => {
    const passes = await database.query(getPassById, {
      replacements: {
        id,
      },
      type: QueryTypes.SELECT,
      raw: true,
    });

    return passes.length ? passes[0] : null;
  };

  static checkIn = async (affairId, userId) => {
    const date = getDate();
    await database.query(passCheckIn, {
      replacements: {
        affair_id: affairId,
        user_id: userId,
        date,
      },
      type: QueryTypes.INSERT,
    });
  };

  static checkInBAU = async (affairId, userId) => {
    const date = getDate();
    await database.query(passCheckInBAU, {
      replacements: {
        affair_id: affairId,
        user_id: userId,
        date,
      },
      type: QueryTypes.INSERT,
    });
  };

  static checkOut = async (id) => {
    await database.query(passCheckOut, {
      replacements: {
        id,
      },
      type: QueryTypes.UPDATE,
    });
  };

  static passConfirm = async (id) => {
    await database.query(passConfirm, {
      replacements: {
        id,
      },
      type: QueryTypes.UPDATE,
    });
  };

  static fetchAll = async (query) => {
    const { user_id, affair_id } = query;
    let customQuery = fetchAllPasses;

    if (user_id) {
      customQuery += ` WHERE user_id = '${user_id}'`;
    }

    if (affair_id) {
      customQuery += ` ${user_id ? "AND" : "WHERE"} affair_id = '${affair_id}'`;
    }

    return await database.query(customQuery, {
      type: QueryTypes.SELECT,
    });
  };

  static delete = async (id) => {
    return await database.query(deletePass, {
      replacements: {
        id,
      },
      type: QueryTypes.DELETE,
    });
  };

  static fetchAllReportsPasses = async (query) => {
    const { start_date, end_date } = query;
    let date = new Date();
    let customQuery = fetchAllReportsPasses;

    // if (start_date) {
    //   customQuery += ` WHERE check_in >= '${start_date}'`;
    // }
    // if (start_date && end_date) {
    //   customQuery = fetchAllReportsPasses;
    //   customQuery += ` WHERE check_in BETWEEN '${start_date}' AND '${end_date}' `;
    // }

    return await database.query(fetchAllReportsPasses, {
      replacements: {
        start_date,
        end_date,
      },
      type: QueryTypes.SELECT,
    });
  };
}
