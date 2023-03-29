const mongoose = require("mongoose");

const setup = (mong_db_uri) => {
  const schema = new mongoose.Schema(
    {
      room: String,
      temperature: Number,
      humidity: Number,
      date: String,
    },
    { timestamps: true }
  );

  const data_model = mongoose.model("room_details", schema);
  let database = null;

  mongoose.connect(mong_db_uri).then((db) => {
    console.log("[Server] : Connected to MongoDB");
  });

  async function add_database(data) {
    try {
      data["date"] = new Date().toLocaleString();
      await data_model.collection.insertOne(data);
    } catch (error) {
      console.error(error);
    }
    // mongoose.connection.close();
  }

  async function read_database() {
    return data_model.find({});
  }

  return { add_database, read_database };
};

module.exports = setup;
