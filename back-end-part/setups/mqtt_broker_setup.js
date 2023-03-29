const mqtt = require("mqtt");

const setup = (
  mqtt_broker_config,
  show_house_updates,
  house_details,
  add_database
) => {
  // Connecting
  console.log("[Server] : Connecting to MQTT broker ...");
  const client = mqtt.connect(
    mqtt_broker_config.connectUrl,
    mqtt_broker_config.options
  );

  // Handle connect event
  client.on("connect", () => {
    console.log("[Server] : Connected to MQTT broker");
    // Subscribe to topics
    client.subscribe(mqtt_broker_config.topics_subscribe, (_, topics) => {
      console.log("[Server] : Subscribe to topics ");
      console.table(topics);
    });
  });

  // Handle message event
  client.on("message", (topic, payload) => {
    let data = null;
    console.log(payload.toString);
    data = JSON.parse(payload.toString());
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    try {
      if (topic === mqtt_broker_config.topics_subscribe[1]) {
        const { message, Room } = data;
        if (message === undefined && Room !== undefined) {
          house_details.roomsDetails[Room]["Measured Temperature"] =
            data["Measured Temperature"].toFixed();
          house_details.roomsDetails[Room]["Measured Humidity"] =
            data["Measured Humidity"].toFixed();

          add_database({
            room: Room,
            temperature:
              house_details.roomsDetails[Room]["Measured Temperature"],
            humidity: house_details.roomsDetails[Room]["Measured Humidity"],
          });
        } else {
          client.publish(
            mqtt_broker_config.topics_publish[1] + "/" + Room,
            JSON.stringify(house_details.roomsDetails[Room]),
            { qos: 0, retain: false },
            (error) => {
              if (error) {
                console.error(error);
              }
            }
          );
        }
        show_house_updates(house_details, data);
      } else if (topic === mqtt_broker_config.topics_subscribe[0]) {
        client.publish(
          mqtt_broker_config.topics_publish[0],
          JSON.stringify(house_details.devicesDetails),
          { qos: 0, retain: false },
          (error) => {
            if (error) {
              console.error(error);
            }
          }
        );
        show_house_updates(house_details, data);
      }
    } catch (error) {
      console.log(error);
      console.error(
        "\n\n========> Wrong message format " +
          payload.toString() +
          " from " +
          topic
      );
    }
  });

  return client;
};

module.exports = setup;
