type RangeInputs = (
  valueRange: any, // should be a string, but highcharts thinks it's giving a number
  options?: {
    step?: number,
    connector?: string,
  }
) => string;

const formatRange: RangeInputs = (valueRange = '(0,0)', { step = 1, connector = ' to ' } = {}) => {
  const start = valueRange[0];
  const end = valueRange[valueRange.length - 1];
  const range = valueRange.slice(1, -1).split(',');

  return range.length > 1
    ? `${
      start === '[' ? range[0] : Number(range[0]) + step }${
      connector }${
      end === ']' ? range[0] : Number(range[1] - step)
    }`
    : valueRange;
};
  
export default formatRange;