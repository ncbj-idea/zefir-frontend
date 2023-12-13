/* eslint-disable */

// These are helper functions for parsing data from xlsx to series directly to apexcharts. You may still find them useful

const toFloatNumber = (str) => parseFloat(str.replace(',', '.'));
const roundTo1Dec = (val) => Math.round(val * 10) / 10;
const toTWh = (val) => val / 1000000;
const categories = ['jednorodzinny', 'wielorodzinny', 'biuro', 'handlowy', 'inny'];

// Zuzycie ciepła w budynkach
var exampleData = [
  {
    Termomodenizacja: 'AB',
    Rodzaj_budynku: 'jednorodzinny',
    na_ciepło: '2592014.465',
    bytowe: '17110406.33',
    całkowite: '19702420.79',
  },
];

var getHeatConsumptionInBuildingsSeries = (data) => {
  const formatNumber = (val) => roundTo1Dec(toFloatNumber(val));

  const series = categories.reduce(
    (prev, buildType) => {
      const ab = data.find((d) => d.Rodzaj_budynku === buildType && d.Termomodenizacja === 'AB');
      const c = data.find((d) => d.Rodzaj_budynku === buildType && d.Termomodenizacja === 'C');
      const d = data.find((d) => d.Rodzaj_budynku === buildType && d.Termomodenizacja === 'D');
      const ef = data.find((d) => d.Rodzaj_budynku === buildType && d.Termomodenizacja === 'EF');

      prev[0].data.push(formatNumber(ef.na_ciepło));
      prev[1].data.push(formatNumber(d.na_ciepło));
      prev[2].data.push(formatNumber(c.na_ciepło));
      prev[3].data.push(formatNumber(ab.na_ciepło));

      return prev;
    },
    [
      { name: '200-240 kWh/m²/rok', data: [] },
      { name: '160-200 kWh/m²/rok', data: [] },
      { name: '110-160 kWh/m²/rok', data: [] },
      { name: '20-110 kWh/m²/rok', data: [] },
    ],
  );

  return series;
};

// Powierzchnia ogrzewana źródłami ciepła
var exampleData = [
  {
    CO: 'Kocioł ekoprojekt',
    Rodzaj_budynku: 'jednorodzinny',
    Powierzchnia: '87134.00384',
  },
];

var getBuildingsHeatSourcesSeries = (data) => {
  const formatNumber = (val) => roundTo1Dec(toFloatNumber(val));
  const rowsDesc = data.sort((a, b) => b.Powierzchnia - a.Powierzchnia);
  const uniqueTechs = [...new Set(rowsDesc.map((row) => row.CO))];

  const series = uniqueTechs.reduce((prev, currTech) => {
    const serie = {
      name: currTech,
      data: categories.map((buildType) =>
        formatNumber(data.find((row) => row.Rodzaj_budynku === buildType && row.CO === currTech).Powierzchnia),
      ),
    };
    prev.push(serie);

    return prev;
  }, []);

  return series;
};

// Przyłącza do sieci ciepłowniczej i gazowej
var exampleData = [
  {
    Rodzaj_budynku: 'jednorodzinny',
    Rodzaj_przylacza: 'sieć ciepłownicza',
    Potencjał: 'w zasięgu',
    Powierzchnia: '988465',
  },
];
var getHeatingNetConnectionsSeries = (data, dataType) => {
  const formatNumber = (val) => roundTo1Dec(toFloatNumber(val));
  const parsedData = data
    .map((d) => {
      d.Rodzaj_przylacza = d.Rodzaj_przylacza.replace('gas', 'sieć gazowa').replace('heat', 'sieć ciepłownicza');
      return d;
    })
    .filter((d) => d.Rodzaj_przylacza === dataType)
    .filter((d) => d.Potencjał !== 'poza');

  const series = categories.reduce(
    (prev, curr) => {
      const heat = parsedData.find((d) => d.Rodzaj_budynku === curr && d.Potencjał === 'ogrzewanie');
      const heatInRange = parsedData.find((d) => d.Rodzaj_budynku === curr && d.Potencjał === 'w zasięgu');
      prev[0].data.push(formatNumber(heat.Powierzchnia));
      prev[1].data.push(formatNumber(heatInRange.Powierzchnia));

      return prev;
    },
    [
      { name: 'Odbiorcy przyłączeni', data: [] },
      { name: 'Odbiorcy w zasięgu', data: [] },
    ],
  );

  return series;
};

// Roczny pobór prądu z sieci
var exampleData = [
  {
    Termomodenizacja: 'EF',
    Rodzaj_budynku: 'inny',
    na_ciepło: '6335189.809',
    bytowe: '132327110.5',
    całkowite: '138662300.3',
  },
];

var getAnnualPowerConsGridSeries = (data) => {
  const formatNumber = (val) => roundTo1Dec(toTWh(val));

  const sumData = data.reduce((prev, { Rodzaj_budynku, na_ciepło, bytowe }) => {
    const dataWithSameBuildType = prev.find((row) => row.Rodzaj_budynku === Rodzaj_budynku);
    if (dataWithSameBuildType) {
      dataWithSameBuildType.na_ciepło += toFloatNumber(na_ciepło);
      dataWithSameBuildType.bytowe += toFloatNumber(bytowe);
    } else {
      prev.push({ Rodzaj_budynku, na_ciepło: toFloatNumber(na_ciepło), bytowe: toFloatNumber(bytowe) });
    }

    return prev;
  }, []);

  const series = categories.reduce(
    (prev, curr) => {
      prev[0].data.push(formatNumber(sumData.find((s) => s.Rodzaj_budynku === curr).na_ciepło));
      prev[1].data.push(formatNumber(sumData.find((s) => s.Rodzaj_budynku === curr).bytowe));

      return prev;
    },
    [
      { name: 'Ogrzewanie', data: [] },
      { name: 'Zapotrzebowanie w budynkach', data: [] },
    ],
  );

  return series;
};
