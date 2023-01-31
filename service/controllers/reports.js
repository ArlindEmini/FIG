import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";
import { database } from "../database/connection.js";

export default class ReportsService {
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
	}
}