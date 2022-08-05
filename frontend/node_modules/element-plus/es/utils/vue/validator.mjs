import '../../constants/index.mjs';
import { componentSizes } from '../../constants/size.mjs';
import { datePickTypes } from '../../constants/date-pick.mjs';

const isValidComponentSize = (val) => ["", ...componentSizes].includes(val);
const isValidDatePickType = (val) => [...datePickTypes].includes(val);

export { isValidComponentSize, isValidDatePickType };
//# sourceMappingURL=validator.mjs.map
