import '../../../utils/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props.mjs';

const cardProps = buildProps({
  header: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  shadow: {
    type: String,
    default: "always"
  }
});

export { cardProps };
//# sourceMappingURL=card.mjs.map
