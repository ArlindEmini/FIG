import { QueryTypes } from 'sequelize';

import {
	insertClientQuery, getClientById, updateClientQuery, fetchAllClients, deleteClientQuery, checkClientExistenceQuery
} from '../database/queries.js';
import { database } from '../database/connection.js';

export default class ClientService {
	static get = async (
		id,
	) => {
		const clients = await database.query(
			getClientById,
			{
				replacements: {
					id
				},
				type: QueryTypes.SELECT,
				raw: true,
			},
		);

		return clients.length ? clients[0] : null;
	};

	static create = async (
        body
	) => {
		const {
			full_name,
			email,
			client_type,
			contact,
			address
		} = body;

		console.log('addressssss', address);

		const client = await database.query(
			checkClientExistenceQuery,
			{
				replacements: {
					full_name,
					email
				},
				type: QueryTypes.SELECT,
			},
		);
				
		if (client && client.length) {
			await ClientService.update(client[0].id, body, client[0]);
		} else {
			await database.query(
				insertClientQuery,
				{
					replacements: {
						full_name,
						client_type,
						email,
						contact,
						address
					},
					type: QueryTypes.INSERT,
				},
			);
		}

		const response = await database.query(
			checkClientExistenceQuery,
			{
				replacements: {
					full_name,
					email
				},
				type: QueryTypes.SELECT,
			},
		);

		return response.length ? response[0] : null;
	};

	static update = async (
		id,
		body,
        existingClient
	) => {
		await database.query(
			updateClientQuery,
			{
				replacements: {
					full_name: body.full_name || existingClient.full_name,
					email: body.email || existingClient.email,
					contact: body.contact || existingClient.contact,
					address: body.address || existingClient.address,
					id
				},
				type: QueryTypes.UPDATE,
			},
		);
	};
	
	static fetchAll = async (
		query
	) => {
		const { full_name, email } = query;
		let customQuery = fetchAllClients;

		if (full_name) {
			customQuery += ` AND full_name = '${full_name}'`
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
			deleteClientQuery,
			{
				replacements: {
					id
				},
				type: QueryTypes.UPDATE
			}
		)
	};
}
