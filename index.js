const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

DBUSER = process.env.DB_USER;
DBPASS = process.env.DB_PASS;

//formas de ler JSON / middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rotas da API
const personRoute = require("./routes/personRoute");
app.use("/person", personRoute);
//rota inicial endpoit

//servidor
mongoose
  .connect(
    `mongodb+srv://${DBUSER}:${DBPASS}@cluster0.q6six.mongodb.net/APIBanco?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado com sucesso ao banco de dados!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
