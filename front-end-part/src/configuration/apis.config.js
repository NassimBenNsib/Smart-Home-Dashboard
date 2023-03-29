const configuration = {
  protocol: "http",
  host: "localhost",
  port: 5000,
  hosted: "https://iot-project-ing-2022-2023.onrender.com",
};
const apis_base_url = `${configuration.protocol}://${configuration.host}:${configuration.port}`; //"https://iot-project-ing-2022-2023.onrender.com"; //;
export default apis_base_url;
