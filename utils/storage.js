const path = require("path");
const fs = require("fs");

/**
 * Stores weather data to a JSON file.
 * @param {Object} dataToStore - The weather data to store.
 * @param {string} dataToStore.city.name - The name of the city for which the weather data is being stored.
 */
const storeData = (dataToStore) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const parentDir = path.dirname(__dirname);
  const historicWeatherDataPath = path.join(parentDir, "historic-weather-data");
  const fileName = `${formattedDate}_${dataToStore.city.name}.json`;
  const filePath = path.join(historicWeatherDataPath, fileName);

  if (fs.existsSync(filePath)) {
    return;
  }

  fs.writeFileSync(filePath, JSON.stringify(dataToStore, null, 2), "utf-8");
};

module.exports = { storeData };
