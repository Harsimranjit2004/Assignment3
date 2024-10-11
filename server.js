/********************************************************************************
 * WEB322 – Assignment 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Harsimranjit Singh Student ID: 155452220 Date: 11-Oct-2024
 *
 * Published URL: ___________________________________________________________
 *
 ********************************************************************************/
const express = require("express");
require("dotenv").config();
const legoData = require("./modules/legoSets");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3500;
legoData
  .initialize()
  .then(() => {
    app.use(express.static(path.join(__dirname, "/public")));
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "/views/home.html"));
    });
    app.get("/about", (req, res) => {
      res.sendFile(path.join(__dirname, "/views/about.html"));
    });
    app.get("/lego/sets", (req, res) => {
      const { theme } = req.query;
      if (theme) {
        legoData
          .getSetsByTheme(theme)
          .then((sets) => res.json(sets))
          .catch((err) => res.status(404).send(err));
      } else {
        legoData
          .getAllSets()
          .then((sets) => res.json(sets))
          .catch((err) => res.status(404).send(err));
      }
    });

    app.get("/lego/sets/:numId", (req, res) => {
      const { numId } = req.params;
      legoData
        .getSetByNum(numId)
        .then((set) => res.json(set))
        .catch((err) => res.status(404).send(err));
    });

    app.use((req, res, next) => {
      res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
    });

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(`failed due to ${err}`));
