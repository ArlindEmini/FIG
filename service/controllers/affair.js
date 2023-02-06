import { QueryTypes } from 'sequelize';

import {
	insertAffairQuery, 
	getAffairById,
	updateAffairQuery,
	fetchAllAffairs,
	deleteAffair,
	checkAffairExistence,
	getAffairByQrCode,
	insertNotificationQuery,
	fetchAllUrgencies,
	passCountQuery
} from '../database/queries.js';
import { database } from '../database/connection.js';

import NotificationsController from "../controllers/notifications.js";

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

	static getByQrCode = async (
		qrCode,
	) => {
		const affairs = await database.query(
			getAffairByQrCode,
			{
				replacements: {
					qr_code: qrCode
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
            affair_description,
			is_urgency
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
			
		console.log("responseiaffairssss", response[0].created_date, response[0].affair_description, response[0].id)
		if(is_urgency == 1){
			console.log("responseiaffairssss", response[0].created_date, response[0].affair_description, response[0].id)
			const notificationResponse = NotificationsController.createAffairNotification(response[0].created_date, response[0].affair_description, response[0].id)
		}

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
                    status: body.status || existingAffair.status,
					price: body.price || existingAffair.price,
					pass_type: body.pass_type || existingAffair.pass_type,
					qr_code: body.qr_code || existingAffair.qr_code
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
		console.log("queryyyyy",query)
		if (client_id) {
			customQuery += ` WHERE client_id = '${client_id}'`
		}

        if (contract_id) {
            customQuery += ` AND contract_id = '${contract_id}'`;
        }

		let affairs = await database.query(
			customQuery,
			{
				type: QueryTypes.SELECT
			}
		);

		if (affairs && affairs.length) {
			affairs = await Promise.all(affairs.map(async affair => {
				affair.passes = await this.getAffairPassCount(affair.id);
				return affair;
			}))
		}
		return affairs;
	};

	static getAffairPassCount = async (id) => {
		const response = await database.query(
			passCountQuery,
			{
				replacements: {
					id
				},
				type: QueryTypes.SELECT
			}
		);

		console.log("Response", response);
		if (response && response.length) {
			return response[0].count;
		}
	}

	static fetchAllUrgencies = async (
		query
	) => {
		const { start_date, end_date } = query;
		let customQuery = fetchAllUrgencies;

		if (start_date) {
			customQuery += ` WHERE created_date >= '${start_date}'`
		}
		if (start_date && end_date) {
			customQuery = fetchAllUrgencies
			customQuery += ` WHERE created_date BETWEEN '${start_date}' AND '${end_date}' `
		}
		
		console.log("queryyyy", customQuery)

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
