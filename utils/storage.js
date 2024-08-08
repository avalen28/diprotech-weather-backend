const path = require("path");
const fs = require("fs");

/**
 * Stores weather data to a JSON file.
 * @param {Object} dataToStore - The weather data to store.
 * @param {string} dataToStore.city - The name of the city for which the weather data is being stored.
 */
const storeData = (dataToStore) => {
  const today = new Date();
  const parentDir = path.dirname(__dirname);
  const historicWeatherDataPath = path.join(parentDir, "historic-weather-data");
  const filePath = path.join(
    historicWeatherDataPath,
    `${today}_${dataToStore.city}.json`
  );

  if (fs.existsSync(filePath)) {
    return;
  }

  fs.writeFileSync(filePath, JSON.stringify(dataToStore, null, 2), "utf-8");
};

module.exports = { storeData };
