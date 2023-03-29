const line_1 =
  "===========================================================================================";
const line_2 =
  "====================================                   ====================================";
const line_3 = "====================================";

const pretty_log = (data, message) => {
  console.log(line_1);
  console.log(line_2);
  console.log(line_3 + message + line_3);
  console.log(line_2);
  console.log(line_1);

  console.table(data);
};

const show_house_updates = (house_details, news) => {
  const new_rooms = Object.keys(house_details.roomsDetails).map((room) => {
    const new_room = { ...house_details.roomsDetails[room] };
    new_room["Measured Humidity"] = new_room["Measured Humidity"] + "%";
    new_room["Measured Temperature"] = new_room["Measured Temperature"] + "°C";
    new_room["Device Temperature"] = new_room["Device Temperature"] + "°C";
    return new_room;
  });
  const new_news = { ...news };
  if (new_news["Measured Temperature"]) {
    new_news["Measured Humidity"] = new_news["Measured Humidity"] + "%";
    new_news["Measured Temperature"] = new_news["Measured Temperature"] + "°C";
  } else if (new_news["Device Temperature"]) {
    new_news["Device Temperature"] = new_news["Device Temperature"] + "°C";
  }

  pretty_log(new_news, "     New update    ");
  pretty_log(house_details.devicesDetails, "  Devices Details  ");
  pretty_log(new_rooms, "   Rooms Details   ");
};

module.exports = { show_house_updates, pretty_log };
