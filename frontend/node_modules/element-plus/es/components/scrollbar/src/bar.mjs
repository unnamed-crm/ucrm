import '../../../utils/index.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';

const barProps = buildProps({
  always: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: ""
  },
  height: {
    type: String,
    default: ""
  },
  ratioX: {
    type: Number,
    default: 1
  },
  ratioY: {
    type: Number,
    default: 1
  }
});

export { barProps };
//# sourceMappingURL=bar.mjs.map
