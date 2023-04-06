import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";

import {
  insertUserQuery,
  getUserByUsername,
  getUserById,
  updateUserQuery,
  fetchAllQuery,
  deleteUserQuery,
  checkUserExistenceQuery,
  insertPtoQuery,
  getPtoByUserId,
  getUserAndTimeOff,
  getAvailableTimeOff,
  updatePtoStatus,
  getAllPtos,
  userCheckIn,
  getAllCurrentPtos,
  getPtoById,
  updatePto,
  cleanerCheckIn,
  fetchAllCheckinReports,
  fetchCheckinReportsClients,
  userCheckOut,
  cleanerCheckOut,
  getCleanerCheckInDetails,
  getCheckinDetails,
  disableUser,
} from "../database/queries.js";
import { database } from "../database/connection.js";

export default class UserService {
  static get = async (id) => {
    const users = await database.query(getUserById, {
      replacements: {
        id,
      },
      type: QueryTypes.SELECT,
      raw: true,
    });

    return users.length ? users[0] : null;
  };

  static getByUsername = async (username) => {
    const users = await database.query(getUserByUsername, {
      replacements: {
        username,
      },
      type: QueryTypes.SELECT,
      raw: true,
    });

    return users.length ? users[0] : null;
  };

  static create = async (body) => {
    const {
      full_name,
      username,
      email,
      password,
      contact,
      user_type,
      timeoff_available,
    } = body;

    const user = await database.query(checkUserExistenceQuery, {
      replacements: {
        username,
        email,
      },
      type: QueryTypes.SELECT,
    });

    if (user && user.length) {
      await UserService.update(user[0].id, body, user[0]);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await database.query(insertUserQuery, {
        replacements: {
          full_name,
          username,
          email,
          password: hashedPassword,
          contact,
          user_type,
          timeoff_available,
        },
        type: QueryTypes.INSERT,
      });
    }

    return await UserService.getByUsername(username);
  };

  static update = async (id, body, existingUser) => {
    let password = existingUser.password;
    if (body.password) {
      password = await bcrypt.hash(body.password, 10);
    }

    await database.query(updateUserQuery, {
      replacements: {
        full_name: body.full_name || existingUser.full_name,
        username: body.username || existingUser.username,
        email: body.email || existingUser.email,
        contact: body.contact || existingUser.contact,
        timeoff_available:
          body.timeoff_available || existingUser.timeoff_available,
        password,
        id,
      },
      type: QueryTypes.UPDATE,
    });
  };
  static disableUser = async (id) => {
    console.log("id", id);
    await database.query(disableUser, {
      replacements: {
        id,
      },
      type: QueryTypes.UPDATE,
    });
  };

  static fetchAll = async (query) => {
    const { username, email } = query;
    let customQuery = fetchAllQuery;

    if (username) {
      customQuery += ` AND username = '${username}'`;
    }

    if (email) {
      customQuery += ` AND email = '${email}'`;
    }

    return await database.query(customQuery, {
      type: QueryTypes.SELECT,
    });
  };

  static delete = async (id) => {
    return await database.query(deleteUserQuery, {
      replacements: {
        id,
      },
      type: QueryTypes.UPDATE,
    });
  };
  static fetchAllCheckinReports = async (query) => {
    const { start_date, end_date } = query;

    return await database.query(fetchAllCheckinReports, {
      replacements: {
        start_date,
        end_date,
      },
      type: QueryTypes.SELECT,
    });
  };

  static fetchCheckInReportsForClient = async (query, clientId) => {
    const { start_date, end_date } = query;

    return await database.query(fetchCheckinReportsClients, {
      replacements: {
        start_date,
        end_date,
        id: clientId,
      },
      type: QueryTypes.SELECT,
    });
  };

  static checkInCleaners = async (user_id, client_id) => {
    return await database.query(cleanerCheckIn, {
      replacements: {
        id: user_id,
        type: 0, //0 is enum for checkin
        client_id,
      },
      type: QueryTypes.INSERT,
    });
  };

  static cleanerCheckIn = async (user_id, client_id) => {
    const checkInDetails = await database.query(getCleanerCheckInDetails, {
      replacements: {
        id: user_id,
        client_id,
      },
      type: QueryTypes.SELECT,
    });

    if (checkInDetails && checkInDetails.length) {
      await database.query(cleanerCheckOut, {
        replacements: {
          id: checkInDetails[0].id,
        },
        type: QueryTypes.UPDATE,
      });
    } else {
      await database.query(cleanerCheckIn, {
        replacements: {
          id: user_id,
          client_id,
        },
        type: QueryTypes.INSERT,
      });
    }
  };

  static checkOutCleaners = (user_id, client_id) => {
    return database.query(cleanerCheckIn, {
      replacements: {
        id: user_id,
        type: 1, //1 is enum for checkout
        client_id,
      },
      type: QueryTypes.INSERT,
    });
  };

  static userCheckIn = async (id) => {
    const checkInDetails = await database.query(getCheckinDetails, {
      replacements: {
        id: id,
      },
      type: QueryTypes.SELECT,
    });

    if (checkInDetails && checkInDetails.length) {
      await database.query(userCheckOut, {
        replacements: {
          id: checkInDetails[0].id,
        },
        type: QueryTypes.UPDATE,
      });
    } else {
      await database.query(userCheckIn, {
        replacements: {
          id: id,
        },
        type: QueryTypes.INSERT,
      });
    }
  };

  static checkOut = async (id) => {
    return await database.query(userCheckIn, {
      replacements: {
        id,
        type: 1, //1 is enum for checkout
      },
      type: QueryTypes.INSERT,
    });
  };

  static requestPto = async (body, user_id) => {
    return await database.query(insertPtoQuery, {
      replacements: {
        user_id: user_id,
        type: body.type,
        comment: body.comment,
        start_date: body.start_date,
        end_date: body.end_date,
        is_approved: 0,
        days_requested: body.number_of_days,
      },
      type: QueryTypes.INSERT,
    });
  };

  static getPtoByUserId = async (user_id) => {
    const ptos = await database.query(getPtoByUserId, {
      replacements: {
        user_id: user_id,
      },
      type: QueryTypes.SELECT,
    });
    return ptos;
  };

  static getAvailableTimeoff = async (id) => {
    const response = await database.query(getAvailableTimeOff, {
      replacements: {
        id,
      },
      type: QueryTypes.SELECT,
    });

    if (response && response.length) {
      return response[0]["timeoff_available"];
    }

    return 0;
  };

  static getAllPtos = async () => {
    const response = await database.query(getAllPtos, {
      type: QueryTypes.SELECT,
    });

    console.log("response", response);

    return response;
  };

  // static getPtoById = async (id) => {
  //   let date = new Date();

  //   const response = await database.query(getPtoById, {
  //     replacements: {
  //       id,
  //     },
  //     type: QueryTypes.SELECT,
  //   });

  //   console.log("response", response);

  //   return response;
  // };
  static getAllCurrentPtos = async () => {
    let date = new Date();

    const response = await database.query(getAllCurrentPtos, {
      replacements: {
        date,
      },
      type: QueryTypes.SELECT,
    });

    return response;
  };

  static updateTimeOffStatus = async (tid, is_approved) => {
    const timeOff = await database.query(getPtoById, {
      replacements: {
        id: tid,
      },
      type: QueryTypes.SELECT,
    });

    const timeOffAvailable =
      timeOff[0].timeoff_available - timeOff[0].days_requested;

    const timeOffAvailableStr = timeOffAvailable.toString();

    const updatedTimeOffApprove = await database.query(updatePtoStatus, {
      replacements: {
        id: tid,
        is_approved: is_approved,
      },
      type: QueryTypes.UPDATE,
    });

    if (is_approved == 1) {
      const updatedTimeOff = await database.query(updatePto, {
        replacements: {
          uid: timeOff[0].user_id,
          timeOffAvailableStr,
        },
        type: QueryTypes.UPDATE,
      });
    }

    return updatedTimeOffApprove;
  };
}
