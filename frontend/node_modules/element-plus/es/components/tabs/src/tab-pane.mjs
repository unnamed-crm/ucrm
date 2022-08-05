import '../../../utils/index.mjs';
import { buildProps } from '../../../utils/vue/props.mjs';

const tabPaneProps = buildProps({
  label: {
    type: String,
    default: ""
  },
  name: {
    type: [String, Number],
    default: ""
  },
  closable: Boolean,
  disabled: Boolean,
  lazy: Boolean
});

export { tabPaneProps };
//# sourceMappingURL=tab-pane.mjs.map
