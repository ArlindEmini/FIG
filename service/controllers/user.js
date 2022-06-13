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
  getPtoByUserId
} from "../database/queries.js";
import { database } from "../database/connection.js";

export default class UserService {
  static get = async (id) => {
    console.log("111111111")
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
    console.log("22222222")
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
    const { full_name, username, email, password, contact } = body;
    console.log("333333333")
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
      //qitu
      await database.query(insertUserQuery, {
        replacements: {
          full_name,
          username,
          email,
          password: hashedPassword,
          contact,
        },
        type: QueryTypes.INSERT,
      });
    }

    return await UserService.getByUsername(username);
  };

  static update = async (id, body, existingUser) => {
    let password = existingUser.password;
    console.log("4444444")
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
    console.log("55555555")
    let customQuery = fetchAllQuery;
    console.log("fetch all")
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
    //qitu
   
    return await database.query(insertPtoQuery, {
      replacements: {
        user_id : user_id,
        type : body.type,
        comment : body.comment,
		start_date: body.start_date,
		end_date : body.end_date,
		is_approved : 0
      },
      type: QueryTypes.INSERT,
    });
  };

  static getPtoByUserId = async (user_id) => {
	
	const ptos =  await database.query(getPtoByUserId, {
		replacements:{
			user_id : user_id
		},
		type: QueryTypes.SELECT
	})
	return ptos
  }
}
