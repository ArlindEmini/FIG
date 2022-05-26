import bcrypt from 'bcrypt';
import { QueryTypes } from 'sequelize';

import {
	insertUserQuery, getUserByUsername, getUserById, updateUserQuery, fetchAllQuery, deleteUserQuery, checkUserExistenceQuery
} from '../database/queries.js';
import { database } from '../database/connection.js';

export default class UserService {
	static get = async (
		id,
	) => {
		const users = await database.query(
			getUserById,
			{
				replacements: {
					id
				},
				type: QueryTypes.SELECT,
				raw: true,
			},
		);

		return users.length ? users[0] : null;
	};

	static getByUsername = async (
		username,
	) => {
		const users = await database.query(
			getUserByUsername,
			{
				replacements: {
					username
				},
				type: QueryTypes.SELECT,
				raw: true,
			},
		);

		return users.length ? users[0] : null;
	};

	static create = async (
        body
	) => {
		const {
			full_name,
			username,
			email,
			password,
			contact
		} = body;

		const user = await database.query(
			checkUserExistenceQuery,
			{
				replacements: {
					username,
					email
				},
				type: QueryTypes.SELECT,
			},
		);

		if (user && user.length) {
			await UserService.update(user[0].id, body, user[0]);
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			await database.query(
				insertUserQuery,
				{
					replacements: {
						full_name,
						username,
						email,
						password: hashedPassword,
						contact
					},
					type: QueryTypes.INSERT,
				},
			);
		}

		return await UserService.getByUsername(username);
	};

	static update = async (
		id,
		body,
        existingUser
	) => {

		let password = existingUser.password;
		if (body.password) {
			password = await bcrypt.hash(body.password, 10);
		}

		await database.query(
			updateUserQuery,
			{
				replacements: {
					full_name: body.full_name || existingUser.full_name,
					username: body.username || existingUser.username,
					email: body.email || existingUser.email,
					contact: body.contact || existingUser.contact,
					password,
					id
				},
				type: QueryTypes.UPDATE,
			},
		);
	};
	
	static fetchAll = async (
		query
	) => {
		const { username, email } = query;
		let customQuery = fetchAllQuery;

		if (username) {
			customQuery += ` AND username = '${username}'`
		}

		if (email) {
			customQuery += ` AND email = '${email}'`;
		}

		return await database.query(
			customQuery,
			{
				type: QueryTypes.SELECT
			}
		)
	};

	static delete = async (
		id
	) => {
		return await database.query(
			deleteUserQuery,
			{
				replacements: {
					id
				},
				type: QueryTypes.UPDATE
			}
		)
	};

	static requestPto = async (body) => {
		
	}
}
