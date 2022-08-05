import '../../../utils/index.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';

const thumbProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true
  },
  always: Boolean
});

export { thumbProps };
//# sourceMappingURL=thumb.mjs.map
