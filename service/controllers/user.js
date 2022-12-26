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

    console.log("userss", users[0].username);

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
    const { full_name, username, email, password, contact, user_type } = body;
    
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
        password,
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

  static requestPto = async (body, user_id) => {
    console.log("userIdController", user_id);

    const userAndTime = await database.query(getUserAndTimeOff, {
      replacements: {
        user_id: user_id,
      },
      type: QueryTypes.SELECT,
    });

    if (userAndTime[0].req_date_off > userAndTime[0].timeoff_available) {
    }

    return await database.query(insertPtoQuery, {
      replacements: {
        user_id: user_id,
        type: body.type,
        comment: body.comment,
        start_date: body.start_date,
        end_date: body.end_date,
        status: 0,
      },
      type: QueryTypes.INSERT,
    });
  };

  static getPtoByUserId = async (user_id) => {
    console.log("idFromtoken", user_id);
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

  static updateTimeOffStatus = async (tid, status) => {
    const updatedTimeOff = await database.query(updatePtoStatus, {
      replacements: {
        id: tid,
        status: status,
      },
      type: QueryTypes.UPDATE,
    });
    console.log("responseupdatedTimeOff", updatedTimeOff);

    return updatedTimeOff;
  };
}
