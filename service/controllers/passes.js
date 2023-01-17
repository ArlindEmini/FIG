import { QueryTypes } from 'sequelize';

import {
	passCheckIn, passCheckOut, passConfirm, getPassById, fetchAllPasses, deletePass
} from '../database/queries.js';
import { database } from '../database/connection.js';

export default class PassService {
	static get = async (
		id,
	) => {
		const passes = await database.query(
			getPassById,
			{
				replacements: {
					id
				},
				type: QueryTypes.SELECT,
				raw: true,
			},
		);

		return passes.length ? passes[0] : null;
	};

	static checkIn = async (affairId, userId) => {
        await database.query(
            passCheckIn,
            {
                replacements: {
                    affair_id: affairId,
                    user_id: userId
                },
                type: QueryTypes.INSERT,
            },
        );
	};

	static checkOut = async (id) => {
		await database.query(
			passCheckOut,
			{
				replacements: {
                    id
				},
				type: QueryTypes.UPDATE,
			},
		);
	};

    static passConfirm = async (id) => {
        await database.query(
            passConfirm,
            {
                replacements: {
                    id
                },
                type: QueryTypes.UPDATE
            }
        )
    }
	
	static fetchAll = async (
		query
	) => {
		const { user_id, affair_id } = query;
		let customQuery = fetchAllPasses;

		if (user_id) {
			customQuery += ` WHERE user_id = '${user_id}'`
		}

        if (affair_id) {
            customQuery += ` AND affair_id = '${affair_id}'`;
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
			deletePass,
			{
				replacements: {
					id
				},
				type: QueryTypes.DELETE
			}
		)
	};
}
