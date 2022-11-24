import { QueryTypes } from "sequelize";

import { insertNotificationQuery } from "../database/queries.js";
import { database } from "../database/connection.js";

export default class NotificationsService {
  static getallNotifications = async () => {
    const notifications = await database.query(getAllNotifications, {
      type: QueryTypes.SELECT,
    });
    return notifications;
  };

  static createNotification = async (body, user_id, affair_id) => {
    const {
      created_date,
      next_run,
      notification_type,
      run_all,
    } = body;

    const notification = await database.query(insertNotificationQuery, {
      replacements: {
        affair_id: affair_id,
        time_off_id: null,
        created_by: user_id,
        created_date: created_date,
        next_run: next_run,
		notification_type : notification_type,
        run_all: run_all,
      },
      type: QueryTypes.INSERT,
    });
    return notification;
  };
}
