import { QueryTypes } from "sequelize";

import { insertNotificationQuery, getAllNotifications } from "../database/queries.js";
import { database } from "../database/connection.js";

export default class NotificationsService {
  static getallNotifications = async () => {
    const notifications = await database.query(getAllNotifications, {
      type: QueryTypes.SELECT,
    });
    return notifications;
  };

  static createAffairNotification = async (created_date, message,affair_id) => {

    const notification = await database.query(insertNotificationQuery, {
      replacements: {
        affair_id: affair_id,
        time_off_id: null,
        created_date: created_date,
        message: message
      },
      type: QueryTypes.INSERT,
    });
    return notification;
  };

  static createTimeOffNotification = async (created_date, message,time_off_id) => {

    const notification = await database.query(insertNotificationQuery, {
      replacements: {
        affair_id: null,
        time_off_id: time_off_id,
        created_date: created_date,
        message: message
      },
      type: QueryTypes.INSERT,
    });
    return notification;
  };
}
