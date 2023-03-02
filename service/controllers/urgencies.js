import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";

import {fetchAllUrgencies,
        insertUrgencyQuery,
        getUrgencyById,
        updateUrgencyQuery,
        deleteUrgency,
		passCheckInUregency      
    }
         from "../database/queries.js";
import { database } from "../database/connection.js";

export default class UrgencyService {

    static get = async (
		id,
	) => {
		const urgencies = await database.query(
			getUrgencyById,
			{
				replacements: {
					id
				},
				type: QueryTypes.SELECT,
				raw: true,
			},
		);

		return urgencies.length ? urgencies[0] : null;
	};

    static fetchAll = async (query) => {
		const { start_date, end_date } = query;
		let customQuery = fetchAllUrgencies;

		if (start_date) {
			customQuery += ` WHERE start_date >= '${start_date}'`
		}
		if (start_date && end_date) {
			customQuery = fetchAllUrgencies
			customQuery += ` WHERE end_date BETWEEN '${start_date}' AND '${end_date}' `
		}
    
        return await database.query(customQuery, {
          type: QueryTypes.SELECT,
        });
      };

      static createUrgency = async (body) => {
        const { urgency_description, address, price, employee_type } = body;
        console.log("employee_type",employee_type)
          return await database.query(insertUrgencyQuery, {
            replacements: {
                urgency_description,
                address,
                price,
				employee_type
            },
            type: QueryTypes.INSERT,
          });
      };

      static update = async (
		    id,
		    body,
        existingUrgency
	) => {
		await database.query(
			updateUrgencyQuery,
			{
				replacements: {
					id,
					urgency_description: body.urgency_description || existingUrgency.urgency_description,
					address: body.address || existingUrgency.address,
					price: body.price || existingUrgency.price
				},
				type: QueryTypes.UPDATE,
			},
		);
	};

  static delete = async (
		id
	) => {
		return await database.query(
			deleteUrgency,
			{
				replacements: {
					id
				},
				type: QueryTypes.DELETE
			}
		)
	};

	static checkIn = async (urgencyId) => {
        await database.query(
            passCheckInUregency,
            {
                replacements: {
                    urgencyId: urgencyId,
                },
                type: QueryTypes.INSERT,
            },
        );
	};
}