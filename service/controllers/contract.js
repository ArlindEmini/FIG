import { QueryTypes } from 'sequelize';

import {
	insertContractQuery, getContractById, updateContractQuery, fetchAllContracts, deleteContract, checkContractExistence,
} from '../database/queries.js';
import { database } from '../database/connection.js';

export default class ContractService {
	static get = async (
		id,
	) => {
		const contracts = await database.query(
			getContractById,
			{
				replacements: {
					id
				},
				type: QueryTypes.SELECT,
				raw: true,
			},
		);

		return contracts.length ? contracts[0] : null;
	};

	static create = async (
		client_id,
        body,
		created_by
	) => {
		const {
			signed_date,
			end_date,
			contract_details,
			affair_limit
		} = body;

		const contract = await database.query(
			checkContractExistence,
			{
				replacements: {
					client_id,
					signed_date,
					end_date,
					affair_limit
				},
				type: QueryTypes.SELECT,
			},
		);

		if (contract && contract.length) {
			await ContractService.update(contract[0].id, body, contract[0]);
		} else {
			await database.query(
				insertContractQuery,
				{
					replacements: {
						client_id,
						contract_details: JSON.stringify(contract_details),
						created_by,
						affair_limit,
						signed_date,
						end_date
					},
					type: QueryTypes.INSERT,
				},
			);
		}

		const response = await database.query(
			checkContractExistence,
			{
				replacements: {
					client_id,
					signed_date,
					end_date,
					affair_limit
				},
				type: QueryTypes.SELECT,
			},
		);

		return response.length ? response[0] : null;
	};

	static update = async (
		id,
		body,
        existingContract
	) => {
		await database.query(
			updateContractQuery,
			{
				replacements: {
					id,
					client_id: body.client_id || existingContract.client_id,
					contract_details: (body.contract_details && JSON.stringify(body.contract_details)) || existingContract.contract_details,
					affair_limit: body.affair_limit || existingContract.affair_limit,
					signed_date: body.signed_date || existingContract.signed_date,
					end_date: body.end_date || existingContract.end_date
				},
				type: QueryTypes.UPDATE,
			},
		);
	};
	
	static fetchAll = async (
		query
	) => {
		const { client_id } = query;
		let customQuery = fetchAllContracts;

		if (client_id) {
			customQuery += ` WHERE client_id = '${client_id}'`
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
			deleteContract,
			{
				replacements: {
					id
				},
				type: QueryTypes.DELETE
			}
		)
	};
}
