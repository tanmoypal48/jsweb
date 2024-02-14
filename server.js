const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");

const app = express();

// Firebase configuration (replace with your own service account key)
const serviceAccount = require("./dht11-2bb8a-firebase-adminsdk-v2lgh-c1f950b3f2.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dht11-2bb8a-default-rtdb.firebaseio.com",
});

// Enable CORS for all routes
app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({ extended: false }));

// API endpoint to fetch DHT11 data from Firebase
app.get("/api/data", async (req, res) => {
  try {
    const db = admin.database();
    const ref = db.ref("/"); // replace with your Firebase database collection path

    ref.once("value", (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      res.json(data);
    });
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 8889;
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
