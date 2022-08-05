import '../types.mjs';
import { debugWarn } from '../error.mjs';
import { isString } from '@vue/shared';
import { isNumber } from '@vueuse/core';

const SCOPE = "utils/vue/style";
function addUnit(value, defaultUnit = "px") {
  if (!value)
    return "";
  if (isString(value)) {
    return value;
  } else if (isNumber(value)) {
    return `${value}${defaultUnit}`;
  }
  debugWarn(SCOPE, "binding value must be a string or number");
}

export { addUnit };
//# sourceMappingURL=style.mjs.map
