const express = require("express");

const setup = (
  house_details,
  mqtt_broker_client,
  mqtt_broker_config,
  show_house_updates,
  read_database
) => {
  const router = express.Router();

  router.patch("/devices-details", (req, res) => {
    const { Device, Status } = req.body;
    house_details.devicesDetails[Device] = Status;
    mqtt_broker_client.publish(
      mqtt_broker_config.topics_publish[0],
      JSON.stringify(house_details.devicesDetails),
      { qos: 0, retain: false },
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );
    show_house_updates(house_details, req.body);
    res.send('{"message" : "Done !!"}');
  });

  router.patch("/rooms-details", (req, res) => {
    const { Feature, Room, Status } = req.body;
    if (
      Status === true &&
      (Feature === "isAir ConditionerActive" ||
        Feature === "isTemperatureActive")
    ) {
      house_details.roomsDetails[Room]["isAir ConditionerActive"] = false;
      house_details.roomsDetails[Room]["isTemperatureActive"] = false;
    }
    house_details.roomsDetails[Room][Feature] = Status;

    mqtt_broker_client.publish(
      mqtt_broker_config.topics_publish[1] + "/" + Room,
      JSON.stringify(house_details.roomsDetails[Room]),
      { qos: 0, retain: false },
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );

    show_house_updates(house_details, req.body);
    res.send('{"message" : "Done !!"}');
  });

  router.patch("/rooms-details/temperature", (req, res) => {
    const { Room } = req.body;
    house_details.roomsDetails[Room]["Device Temperature"] =
      req.body["Device Temperature"];

    mqtt_broker_client.publish(
      mqtt_broker_config.topics_publish[1] + "/" + Room,
      JSON.stringify(house_details.roomsDetails[Room]),
      { qos: 0, retain: false },
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );

    show_house_updates(house_details, req.body);
    res.send('{"message" : "Done !!"}');
  });

  router.get("/house-details", (req, res) => {
    res.json(house_details);
  });

  router.get("/measured-values", (req, res) => {
    read_database().then((data) => {
      res.json(data);
    });
  });
  return router;
};

module.exports = setup;
