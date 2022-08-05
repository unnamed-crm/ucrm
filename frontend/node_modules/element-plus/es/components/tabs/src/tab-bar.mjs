import '../../../utils/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props.mjs';
import { mutable } from '../../../utils/typescript.mjs';

const tabBar = buildProps({
  tabs: {
    type: definePropType(Array),
    default: () => mutable([])
  }
});

export { tabBar };
//# sourceMappingURL=tab-bar.mjs.map
