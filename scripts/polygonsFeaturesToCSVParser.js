/* eslint-disable */
const Papa = require('papaparse');
const fs = require('fs');
const { promisify } = require('util');

(async function () {
  const config = {
    sourcePolygonsFilePath: './public/static/buildingsPolygonsFeatures.geojson',
    targetCSVFilePath: './data/polygonsFeatures.csv',
  };

  const readFileAsync = promisify(fs.readFile);
  const writeFileAsync = promisify(fs.writeFile);

  async function readJSONFile(filePath) {
    try {
      const fileContent = await readFileAsync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);

      console.log(`Loaded ${jsonData.length} items`);

      return jsonData;
    } catch (error) {
      console.error(`Error reading the file: ${error.message}`);
      throw error;
    }
  }

  async function convertAndSaveToCSV(jsonData, csvFilePath) {
    try {
      const flattenedData = jsonData.map((item, index) => ({
        id: index + 1,
        coordinates: JSON.stringify(item.geometry.coordinates),
        buildingType: item.properties.buildingType,
        heatType: item.properties.heatType,
      }));
      const csv = Papa.unparse(flattenedData);

      await writeFileAsync(csvFilePath, csv, 'utf8');

      console.log('CSV file saved successfully:', csvFilePath);
    } catch (error) {
      console.error('Error converting to CSV or saving the file:', error.message);
      throw error;
    }
  }

  const features = await readJSONFile(config.sourcePolygonsFilePath);
  convertAndSaveToCSV(features, config.targetCSVFilePath);
})();
