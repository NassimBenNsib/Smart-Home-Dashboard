const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  cors_config,
  mqtt_broker_config,
  database_uri,
} = require("./configuration");
const house_details = require("./structure");
const { mqtt_broker_setup, apis_setups, database_setup } = require("./setups");
const { show_house_updates } = require("./helps");

const app = express();
const port = process.env.PORT || 5000;

// Configuration of database part
console.log("[Server] : Configuration of database part ...");
const { add_database, read_database } = database_setup(database_uri);

// Configuration of MQTT broker part
console.log("[Server] : Configuration of MQTT broker part ...");
const mqtt_broker_client = mqtt_broker_setup(
  mqtt_broker_config,
  show_house_updates,
  house_details,
  add_database
);

// Configuration of APIs part
console.log("[Server] : Configuration of APIs part ...");
const router = apis_setups(
  house_details,
  mqtt_broker_client,
  mqtt_broker_config,
  show_house_updates,
  read_database
);
app.use(cors(cors_config));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(router);

app.listen(port, () => {
  console.log("[Server] : Server started on port " + port);
  show_house_updates(house_details, []);
});
