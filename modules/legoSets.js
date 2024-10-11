const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      sets = setData.map((set) => {
        const theme = themeData.find((theme) => theme.id === set.theme_id);
        return {
          ...set,
          theme: theme ? theme.name : "Unknown",
        };
      });
      resolve();
    } catch (error) {
      reject("Failed to initialize sets.");
    }
  });
}

function getAllSets() {
  return new Promise((resolve, reject) => {
    if (sets) {
      resolve(sets);
    } else {
      reject("Processed data not available");
    }
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    let set = sets.find((sub) => sub.set_num === setNum);
    if (set) {
      resolve(set);
    } else {
      reject("not able to fetch the Sets by the setNum");
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    const filteredData = sets.filter((s) =>
      s.theme.toLowerCase().includes(theme.toLowerCase())
    );
    if (filteredData.length > 0) {
      resolve(filteredData);
    } else {
      reject("Unable to find requested sets.");
    }
  });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
