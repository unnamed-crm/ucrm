import '../../../utils/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props.mjs';
import { isObject } from '@vue/shared';

const dateTableProps = buildProps({
  selectedDay: {
    type: definePropType(Object)
  },
  range: {
    type: definePropType(Array)
  },
  date: {
    type: definePropType(Object),
    required: true
  },
  hideHeader: {
    type: Boolean
  }
});
const dateTableEmits = {
  pick: (value) => isObject(value)
};

export { dateTableEmits, dateTableProps };
//# sourceMappingURL=date-table.mjs.map
