import '../../../utils/index.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';

const timelineItemProps = buildProps({
  timestamp: {
    type: String,
    default: ""
  },
  hideTimestamp: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    default: "bottom"
  },
  type: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    default: "normal"
  },
  icon: {
    type: iconPropType,
    default: ""
  },
  hollow: {
    type: Boolean,
    default: false
  }
});

export { timelineItemProps };
//# sourceMappingURL=timeline-item.mjs.map
