const BYTES_PB = 10e14;
const BYTES_TB_LIMIT = 9999995e8;
const BYTES_TB = 10e11;
const BYTES_GB_LIMIT = 9999995e5;
const BYTES_GB = 10e8;
const BYTES_MB_LIMIT = 9995e5;
const BYTES_MB = 10e5;
const BYTES_KB_LIMIT = 999500;
const BYTES_KB = 1000;

const formatFileSize = (value: number = 0): string => {  
  switch(true) {
    case value >= BYTES_TB_LIMIT:
      return `${(value / BYTES_PB).toFixed(2)} PB`;
    case value >= BYTES_GB_LIMIT:
      return `${(value / BYTES_TB).toFixed(2)} TB`;
    case value >= BYTES_MB_LIMIT:
      return `${(value / BYTES_GB).toFixed(2)} GB`;
    case value >= BYTES_KB_LIMIT:
      return `${(value / BYTES_MB).toFixed(0)} MB`;
    case value >= BYTES_KB:
      return `${(value / BYTES_KB).toFixed(0)} KB`;
    default:
      return `${value} B`;
  }
};
  
export default formatFileSize;