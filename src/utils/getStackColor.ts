const stackColors = ['#28629B', '#CF6AAA', '#AAB2B9', '#EEBD69', '#70AAB9', '#B3CE84', '#B48557'];

const getStackColor = (index: number): string => {
  return stackColors[index % stackColors.length] || '#28629B';
};

export { getStackColor };
