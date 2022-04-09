import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import {
  Agenda,
} from "react-native-calendars";

// use CalendarList to display calendar horizontally
// use Agenda to display details of appointments when a date is clicked
// docs: https://github.com/wix/react-native-calendars#readme
const Calendar = () => {
  // const text = "TeST";
  const [items, setItems] = useState({})

  const timeToString = (time) => {
    const date = new Date(time);

    return date.toISOString().split('T')[0];
  }

  const loadItems = (day) => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (!items[strTime]) {
        items[strTime] = [];

        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < numItems; j++) {
          items[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: strTime
          });
        }
      }
    }

    const newItems = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
    setItems(newItems)
  }

  const renderItem = ({ reservation = {}, isFirst }) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (<TouchableOpacity
      onPress={() => alert(reservation.name)}
      style={[{ height: reservation.height || 50 }]}
    >
      <Text style={{ fontSize, color }}>{reservation.name}</Text>
    </TouchableOpacity>)
  }

  const renderEmptyDate = () => {
    return (
      <View>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  return (
    <Agenda
      // testID={testIDs.agenda.CONTAINER}
      items={items}
      loadItemsForMonth={loadItems}
      selected={'2022-04-04'}
      renderItem={(reservation, isFirst) => renderItem({ reservation, isFirst })}
      renderEmptyDate={renderEmptyDate}
      // rowHasChanged={this.rowHasChanged}
      showClosingKnob={true}
      // markingType={'period'}
      markedDates={{
        '2022-04-08': { textColor: '#43515c' },
        '2017-05-09': { textColor: '#43515c' },
        '2017-05-14': { startingDay: true, endingDay: true, color: 'blue' },
        '2017-05-21': { startingDay: true, color: 'blue' },
        '2017-05-22': { endingDay: true, color: 'gray' },
        '2017-05-24': { startingDay: true, color: 'gray' },
        '2017-05-25': { color: 'gray' },
        '2017-05-26': { endingDay: true, color: 'gray' }
      }}
      monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      renderDay={(day) => (<Text>{day ? day.day : 'item'}</Text>)}
      hideExtraDays={false}
      showOnlySelectedDayItems
    />
  );
}

export default Calendar;
