import moment from "moment";
import React from "react";
import {
  Calendar as CalendarNative,
  CalendarList,
  Agenda,
} from "react-native-calendars";
import { reserved, vacation, worked } from "./styles";

// use CalendarList to display calendar horizontally
// use Agenda to display details of appointments when a date is clicked
// docs: https://github.com/wix/react-native-calendars#readme
function Calendar() {
  // const text = "TeST";

  return (
    <>
      <CalendarNative
        onDayPress={(day = "") => {
          const format = moment(day).format("lll");
          alert(format);
        }}
        firstDay={1}
        enableSwipeMonths={true}
        markingType={"multi-dot"}
        markedDates={{
          "2022-03-16": {
            dots: [vacation, reserved, worked],
            selected: true,
            // selectedColor: "red",
          },
        }}
      />
      <CalendarNative
        firstDay={1}
        enableSwipeMonths={true}
        markingType={"multi-period"}
        markedDates={{
          "2022-03-15": {
            periods: [
              { startingDay: false, endingDay: true, color: "#5f9ea0" },
              { startingDay: false, endingDay: true, color: "#ffa500" },
              { startingDay: true, endingDay: false, color: "#f0e68c" },
            ],
          },
          "2022-03-16": {
            periods: [
              { startingDay: true, endingDay: false, color: "#ffa500" },
              { color: "transparent" },
              { startingDay: false, endingDay: false, color: "#f0e68c" },
            ],
          },
        }}
      />
    </>
  );
}

export default Calendar;
