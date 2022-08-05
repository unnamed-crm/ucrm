import '../../../utils/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props.mjs';

const iconProps = buildProps({
  size: {
    type: definePropType([Number, String])
  },
  color: {
    type: String
  }
});

export { iconProps };
//# sourceMappingURL=icon.mjs.map
