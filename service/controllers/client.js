import bcrypt from 'bcrypt';
import { QueryTypes } from 'sequelize';

import {
	insertUserQuery, getUserByUsername, getUserById, updatePasswordQuery,
} from '../database/queries.js';
import { database } from '../database/connection.js';

export default class ClientService {
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
		try {
			const hashedPassword = await bcrypt.hash(plainPassword, 10);

			await database.query(
				insertUserQuery,
				{
					replacements: {
						username,
						password: hashedPassword,
						QueryTestId: QueryTestId.CreateUser,
					},
					type: QueryTypes.INSERT,
				},
			);

			const createdUser = await UserService.getByUsername(username);

			if (createdUser) {
				return createdUser;
			}

			return {
				error: ERROR.UserCreationFailed,
			};
		} catch (err) {
			return {
				error: ERROR.UserCreationFailed,
			};
		}
	};

	static update = async (
		id,
		body,
        existingUser
	) => {
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await database.query(
			updatePasswordQuery,
			{
				replacements: {
					id,
					password: hashedPassword,
				},
				type: QueryTypes.UPDATE,
			},
		);
	};
}
