const path = require("path");
const fs = require("fs");

const storeData = (dataToStore) => {
  const today = new Date();
  const parentDir = path.dirname(__dirname);
  const historicWeatherDataPath = path.join(parentDir, "historic-weather-data");
  const filePath = path.join(
    historicWeatherDataPath,
    `${today}_${dataToTest.city.name}.json`
  );

  if (fs.existsSync(filePath)) {
    return;
  }

  fs.writeFileSync(filePath, JSON.stringify(dataToTest, null, 2), "utf-8");
};

module.exports = { storeData };
