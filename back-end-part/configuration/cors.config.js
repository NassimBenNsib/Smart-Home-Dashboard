const whitelist = ["http://localhost:3000", "https://smarti-board.netlify.app"];
const cors_options = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = cors_options;
