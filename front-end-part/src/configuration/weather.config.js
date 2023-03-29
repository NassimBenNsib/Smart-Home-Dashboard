const configuration = {
  API_KEY: "0166572f755be18fbb97b76bd78c8afc",
  lat: "36.8613747",
  lon: "10.1889085",
  units: "metric",
  city_id: "2467920",
  part: "",
};

const current = `https://api.openweathermap.org/data/2.5/weather?id=${configuration.city_id}&units=${configuration.units}&appid=${configuration.API_KEY}`;
const statistics = `https://api.open-meteo.com/v1/forecast?latitude=${configuration.lat}&longitude=${configuration.lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,rain,cloudcover`;

const apis = { current, statistics };

export default apis;
