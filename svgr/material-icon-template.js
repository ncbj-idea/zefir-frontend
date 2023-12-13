const template = (variables, { tpl }) => {
  const iconName = `${variables.componentName}Icon`;
  return tpl`
    'use client'

    import { createSvgIcon } from '@mui/material/utils'
    ${variables.imports};


    ${variables.interfaces};

    
    export const ${variables.componentName} = createSvgIcon(
      ${variables.jsx},
      "${iconName}"
    );
    
    ${variables.exports};
  `;
};

module.exports = template;
