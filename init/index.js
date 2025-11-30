const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  // FIXED: correct arrow function + store result in a variable
  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: "692477604b7f23319caec926",
  }));

  await Listing.insertMany(updatedData);

  console.log("data was initialized");
};

initDB();
