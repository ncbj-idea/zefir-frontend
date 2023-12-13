const path = require('path');

function indexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath.path, path.extname(filePath.path));
    const formattedName = basename
      .split('-')
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join('');
    const exportName = /^\d/.test(formattedName) ? `Svg${formattedName}` : formattedName;
    return `export { default as ${exportName}Icon } from './${basename}'`;
  });
  return exportEntries.join('\n');
}
module.exports = {
  typescript: true,
  ignoreExisting: true,
  filenameCase: 'pascal',
  indexTemplate: (file) => indexTemplate(file),
  prettier: true,
  replaceAttrValues: {
    '#000': 'currentColor',
    '#fff': 'currentColor',
    '#6b778c': 'currentColor',
    '#7f899b': 'currentColor',
  },
  svgProps: { fill: 'currentColor' },
  svgoConfig: {
    plugins: [
      {
        name: 'removeViewBox',
        active: false,
      },
    ],
  },
};
