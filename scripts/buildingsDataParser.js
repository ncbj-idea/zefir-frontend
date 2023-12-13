/* eslint-disable */
const proj4 = require('proj4');
const Papa = require('papaparse');
const fs = require('fs');

(function () {
  const config = {
    sourceFilePath: './data/rawBuildingsData.csv',
    targetPointsFilePath: './public/static/buildingsPointsFeatures.geojson',
    targetPolygonsFilePath: './public/static/buildingsPolygonsFeatures.geojson',
  };

  const loadProjections = () => {
    const epsg2180 =
      '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs';
    const epsg4326 = '+proj=longlat +datum=WGS84 +no_defs';

    proj4.defs('EPSG:2180', epsg2180);
    proj4.defs('EPSG:4326', epsg4326);
  };

  function loadBuildingsData(filePath) {
    const file = fs.createReadStream(filePath);

    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        delimiter: ';',
        complete(results, _) {
          resolve(results.data);
        },
        error(err, _) {
          reject(err);
        },
      });
    });
  }

  const toFloatNumber = (str) => parseFloat(str.replace(',', '.'));

  const getPolygonCoordinates = (building) => {
    const coordinatesPart = building.geom_wkt.match(/\(\((.*?)\)\)/)[1];
    const polygonStrings = coordinatesPart.split('),(');
    const polygons = [];

    for (const polygonString of polygonStrings) {
      const coordinateStrings = polygonString.split(',');

      const coordinates = coordinateStrings.map((coordString) => {
        const [x, y] = coordString.trim().replace('(', '').split(' ').map(Number);

        return proj4('EPSG:2180', 'EPSG:4326', [x, y]);
      });

      polygons.push(coordinates);
    }

    return polygons;
  };

  const getPointCoordinates = (building) => {
    return [toFloatNumber(building.longitude_centroid), toFloatNumber(building.latitude_centroid)];
  };

  const adjustValuesToLabelsInApp = (value) => {
    return value
      .replace('Budynek jednorodzinny', 'Jednorodzinne')
      .replace('Budynek wielorodzinny', 'Wielorodzinne')
      .replace('Biuro', 'Biurowe')
      .replace('Handlowo-usługowy', 'Handlowo-usługowe')
      .replace('Pozostały', 'Pozostałe')
      .replace('Kocioł gazowy', 'Kotły gazowe')
      .replace('Ogrzewanie elektryczne', 'Grzejniki elektryczne')
      .replace('Miejska sieć ciepłownicza', 'Przyłączenie do sieci ciepłowniczej')
      .replace('Kocioł węglowy', 'Kotły węglowe')
      .replace('Kocioł węglowy (wysokoemisyjny)', 'Kotły węglowe (wysokoemisyjne)')
      .replace('Kocioł olejowy', 'Kotły olejowe')
      .replace('Pompa ciepła', 'Pompy ciepła');
  };

  const getBuildingProperties = (building, index, isPolygon) => {
    const { CO2, CO, SOx, NOx, Benzoapiren, PM10 } = building;

    if (isPolygon) {
      return {
        // Id is needed for backend
        id: index + 1,
        buildingType: adjustValuesToLabelsInApp(building.funkcja_szczegolowa_budynku),
        heatType: adjustValuesToLabelsInApp(building['Zainstalowane_źródło_ciepła']),
      };
    }

    return {
      buildingType: adjustValuesToLabelsInApp(building.funkcja_szczegolowa_budynku),
      heatType: adjustValuesToLabelsInApp(building['Zainstalowane_źródło_ciepła']),
      boilerEmission: building['Klasa_kotłów_na_paliwo_stałe'],
      // Convert t to kg
      CO2: toFloatNumber(CO2) * 1000,
      CO: toFloatNumber(CO),
      SOX: toFloatNumber(SOx),
      NOX: toFloatNumber(NOx),
      'Benzo(a)piren': toFloatNumber(Benzoapiren),
      PM10: toFloatNumber(PM10),
      'PM2,5': toFloatNumber(building['PM2.5']),
    };
  };

  const generatePointsFeatures = (buildings) => {
    return buildings.map((building, index) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: getPointCoordinates(building),
        },
        properties: getBuildingProperties(building, index),
      };
    });
  };

  const generatePolygonsFeatures = (buildings) => {
    return buildings.map((building, index) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: getPolygonCoordinates(building),
        },
        properties: getBuildingProperties(building, index, true),
      };
    });
  };

  const saveGeoJSONFile = (path, content) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        console.error(`Error writing ${path}:`, err);
      } else {
        console.log(`${path} successfully saved.`);
      }
    });
  };

  const init = async () => {
    loadProjections();
    const buildingsData = await loadBuildingsData(config.sourceFilePath);

    console.log(`File loaded: ${buildingsData.length} buildings`);

    const pointsFeatures = generatePointsFeatures(buildingsData);
    console.log('Example point feature:', pointsFeatures?.[0]);
    saveGeoJSONFile(config.targetPointsFilePath, JSON.stringify(pointsFeatures));

    const polygonsFeatures = generatePolygonsFeatures(buildingsData);
    console.log('Example polygon feature:', polygonsFeatures?.[0]);
    saveGeoJSONFile(config.targetPolygonsFilePath, JSON.stringify(polygonsFeatures));
  };

  init();
})();
