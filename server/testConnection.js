const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load .env file
dotenv.config({ path: "./.env" });

console.log("MONGO_URI =", process.env.MONGO_URI);

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Atlas Connected Successfully");
    process.exit(0);
  } catch (err) {
    console.log("❌ Connection Failed");
    console.log(err.message);
    process.exit(1);
  }
}

test();