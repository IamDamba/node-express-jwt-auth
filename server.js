const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const path = require("path");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./back/routes/authRoute");
const PaginatedResult = require("./back/middleware/paginatedResult");
// --------------------------- Model
const Smoothie = require("./back/models/Smoothie");

// --------------------------- MiddleWare
server.use(express.json());
server.use(cors());
server.use(cookieParser());
server.use(express.static("./front/build"));

//Routes
server.use(authRoute);
server.get("/api/smoothies/fetch", PaginatedResult(Smoothie), (req, res) => {
  try {
    res.send(res.paginatedResults);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
server.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "./front/build/index.html"));
});

// --------------------------- Database Connection
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 3001;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) =>
    server.listen(port, () => {
      console.log("connected to mongoose and port !");
    })
  )
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.once("open", async () => {
  if ((await Smoothie.countDocuments().exec()) > 0) return;

  Promise.all([
    Smoothie.create({ id: 1, name: "Smoothie Framboise" }),
    Smoothie.create({ id: 2, name: "Smoothie Banane" }),
    Smoothie.create({ id: 3, name: "Smoothie Ananas" }),
    Smoothie.create({ id: 4, name: "Smoothie Orange" }),
    Smoothie.create({ id: 5, name: "Smoothie Lait de Coco" }),
    Smoothie.create({ id: 6, name: "Smoothie Legume Glacé" }),
    Smoothie.create({ id: 7, name: "Smoothie Citron" }),
    Smoothie.create({ id: 8, name: 'Smoothie Citron Vert"' }),
    Smoothie.create({ id: 9, name: "Smoothie San Francisco" }),
    Smoothie.create({ id: 10, name: "Smoothie Acidulé" }),
    Smoothie.create({ id: 11, name: "Smoothie Lait Miel" }),
    Smoothie.create({ id: 12, name: "Smoothie Pêche" }),
  ])
    .then(() => console.log("Added Smoothies"))
    .catch((err) => {
      console.log(err.message);
    });
});
