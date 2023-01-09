import { QueryTypes } from 'sequelize';

import {
	insertAffairQuery, getAffairById, updateAffairQuery, fetchAllAffairs, deleteAffair, checkAffairExistence,
} from '../database/queries.js';
import { database } from '../database/connection.js';

export default class AffairService {
	static get = async (
		id,
	) => {
		const affairs = await database.query(
			getAffairById,
			{
				replacements: {
					id
				},
				type: QueryTypes.SELECT,
				raw: true,
			},
		);

		return affairs.length ? affairs[0] : null;
	};

	static create = async (body) => {
		const {
            client_id,
            contract_id,
            affair_type,
            affair_limit,
            affair_description
		} = body;

		const affair = await database.query(
			checkAffairExistence,
			{
				replacements: {
					client_id,
					contract_id,
                    affair_type,
					affair_limit,
					affair_description
				},
				type: QueryTypes.SELECT,
			},
		);

		if (affair && affair.length) {
			throw new Error('An affair with the same details already exists.')
		} else {
			await database.query(
				insertAffairQuery,
				{
					replacements: {
                        ...body
					},
					type: QueryTypes.INSERT,
				},
			);
		}

		const response = await database.query(
			checkAffairExistence,
			{
				replacements: {
					client_id,
					contract_id,
                    affair_type,
					affair_limit,
					affair_description
				},
				type: QueryTypes.SELECT,
			},
		);

		return response.length ? response[0] : null;
	};

	static update = async (
		id,
		body,
        existingAffair
	) => {
		await database.query(
			updateAffairQuery,
			{
				replacements: {
					id,
					affair_type: body.affair_type || existingAffair.affair_type,
					affair_limit: body.affair_limit || existingAffair.affair_limit,
					affair_description: body.affair_description || existingAffair.affair_description,
					start_date: body.start_date || existingAffair.start_date,
                    end_date: body.end_date || existingAffair.end_date,
                    address: body.address || existingAffair.address,
                    status: body.status || existingAffair.status
				},
				type: QueryTypes.UPDATE,
			},
		);
	};
	
	static fetchAll = async (
		query
	) => {
		const { client_id, contract_id } = query;
		let customQuery = fetchAllAffairs;

		if (client_id) {
			customQuery += ` WHERE client_id = '${client_id}'`
		}

        if (contract_id) {
            customQuery += ` AND contract_id = '${contract_id}'`;
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
			deleteAffair,
			{
				replacements: {
					id
				},
				type: QueryTypes.DELETE
			}
		)
	};
}
