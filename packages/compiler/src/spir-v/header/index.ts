import { enumMap } from "../utils/map";

const spirv = require("./spirv.json");
const enums = spirv.spv.enum;
export const spirvHeaders = enums.reduce((acc, cv) => {
  cv.Values = enumMap(cv.Values);
  acc[cv.Name] = cv;
  return acc;
}, {});

export default spirvHeaders;
